import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { fakeAsync, TestBed, tick } from '@angular/core/testing';
import { SessionStorageService } from '../../app/services';
import { WASupportedJurisdictionsService } from './wa-supported-jurisdiction.service';

describe('WASupportedJurisdictionsService', () => {
  let service: WASupportedJurisdictionsService;
  let httpMock: HttpTestingController;
  let sessionStorageService: jasmine.SpyObj<SessionStorageService>;

  beforeEach(() => {
    sessionStorageService = jasmine.createSpyObj<SessionStorageService>('SessionStorageService', [
      'getItem',
      'setItem',
      'removeItem',
    ]);
    sessionStorageService.getItem.and.returnValue(null);

    TestBed.configureTestingModule({
      providers: [
        WASupportedJurisdictionsService,
        { provide: SessionStorageService, useValue: sessionStorageService },
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting(),
      ],
    });

    service = TestBed.inject(WASupportedJurisdictionsService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should return cached supported jurisdictions asynchronously without making an HTTP request', fakeAsync(() => {
    sessionStorageService.getItem.and.returnValue(JSON.stringify(['CIVIL', 'IA']));
    let result: string[];

    service.getWASupportedJurisdictions().subscribe((jurisdictions) => (result = jurisdictions));

    expect(result).toBeUndefined();
    tick();
    expect(result).toEqual(['CIVIL', 'IA']);
    httpMock.expectNone('/api/wa-supported-jurisdiction/get');
  }));

  it('should store the HTTP response in session storage', () => {
    let result: string[];

    service.getWASupportedJurisdictions().subscribe((jurisdictions) => (result = jurisdictions));
    httpMock.expectOne('/api/wa-supported-jurisdiction/get').flush(['CIVIL', 'IA']);

    expect(result).toEqual(['CIVIL', 'IA']);
    expect(sessionStorageService.setItem).toHaveBeenCalledWith(
      WASupportedJurisdictionsService.jurisdictionStorageKey,
      JSON.stringify(['CIVIL', 'IA'])
    );
  });

  it('should use session storage asynchronously after the initial HTTP request completes', fakeAsync(() => {
    let cachedValue: string;
    sessionStorageService.getItem.and.callFake(() => cachedValue);
    sessionStorageService.setItem.and.callFake((_key, value) => (cachedValue = value));

    service.getWASupportedJurisdictions().subscribe();
    httpMock.expectOne('/api/wa-supported-jurisdiction/get').flush(['CIVIL']);

    let result: string[];
    service.getWASupportedJurisdictions().subscribe((jurisdictions) => (result = jurisdictions));

    expect(result).toBeUndefined();
    tick();
    expect(result).toEqual(['CIVIL']);
    httpMock.expectNone('/api/wa-supported-jurisdiction/get');
  }));

  it('should share the initial HTTP request between concurrent subscribers', () => {
    service.getWASupportedJurisdictions().subscribe();
    service.getWASupportedJurisdictions().subscribe();

    httpMock.expectOne('/api/wa-supported-jurisdiction/get').flush(['CIVIL']);
  });

  it('should remove invalid cached data and replace it from the API', () => {
    sessionStorageService.getItem.and.returnValue('invalid JSON');

    service.getWASupportedJurisdictions().subscribe();
    httpMock.expectOne('/api/wa-supported-jurisdiction/get').flush(['CIVIL']);

    expect(sessionStorageService.removeItem).toHaveBeenCalledWith(WASupportedJurisdictionsService.jurisdictionStorageKey);
  });

  it('should get detailed jurisdictions without using the cache', () => {
    service.getDetailedWASupportedJurisdictions().subscribe();

    httpMock.expectOne('/api/wa-supported-jurisdiction/detail').flush([]);
    expect(sessionStorageService.getItem).not.toHaveBeenCalled();
  });
});
