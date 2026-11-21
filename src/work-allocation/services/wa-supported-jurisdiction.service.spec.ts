import { HttpClient, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { fakeAsync, TestBed, tick } from '@angular/core/testing';
import { SessionStorageService } from '../../app/services';
import { of, throwError } from 'rxjs';
import { LoggerService } from '../../app/services/logger/logger.service';
import { HMCTSServiceDetails } from '../../app/models';
import { WASupportedJurisdictionsService } from './wa-supported-jurisdiction.service';

describe('WASupportedJurisdictionsService', () => {
  let mockHttpService: jasmine.SpyObj<HttpClient>;
  let mockLoggerService: jasmine.SpyObj<LoggerService>;
  let service: WASupportedJurisdictionsService;

  beforeEach(() => {
    mockHttpService = jasmine.createSpyObj('mockHttpService', ['get']);
    mockLoggerService = jasmine.createSpyObj('LoggerService', ['warn']);
    const sessionStorageService = jasmine.createSpyObj<SessionStorageService>('SessionStorageService', ['getItem', 'setItem']);
    sessionStorageService.getItem.and.returnValue(null);
    service = new WASupportedJurisdictionsService(mockHttpService, sessionStorageService, mockLoggerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('getDetailedWASupportedJurisdictions should return data on success', (done) => {
    const response = [{ service: 'IA' }] as unknown as HMCTSServiceDetails[];
    mockHttpService.get.and.returnValue(of(response));

    service.getDetailedWASupportedJurisdictions().subscribe((res) => {
      expect(res).toEqual(response);
      expect(mockHttpService.get).toHaveBeenCalledWith('/api/wa-supported-jurisdiction/detail');
      expect(mockLoggerService.warn).not.toHaveBeenCalled();
      done();
    });
  });

  it('getDetailedWASupportedJurisdictions should log and rethrow on failure', (done) => {
    const downstreamError = { status: 500 };
    mockHttpService.get.and.returnValue(throwError(() => downstreamError));

    service.getDetailedWASupportedJurisdictions().subscribe({
      next: () => done.fail('expected error'),
      error: (error) => {
        expect(error).toEqual(downstreamError);
        expect(mockHttpService.get).toHaveBeenCalledWith('/api/wa-supported-jurisdiction/detail');
        expect(mockLoggerService.warn).toHaveBeenCalledWith(
          'WASupportedJurisdictionsService.getDetailedWASupportedJurisdictions downstream failure; endpoint=/api/wa-supported-jurisdiction/detail; status=500',
          downstreamError
        );
        done();
      },
    });
  });

  it('getWASupportedJurisdictions should log and rethrow on failure', (done) => {
    const downstreamError = { status: 502 };
    mockHttpService.get.and.returnValue(throwError(() => downstreamError));

    service.getWASupportedJurisdictions().subscribe({
      next: () => done.fail('expected error'),
      error: (error) => {
        expect(error).toEqual(downstreamError);
        expect(mockHttpService.get).toHaveBeenCalledWith('/api/wa-supported-jurisdiction/get');
        expect(mockLoggerService.warn).toHaveBeenCalledWith(
          'WASupportedJurisdictionsService.getWASupportedJurisdictions downstream failure; endpoint=/api/wa-supported-jurisdiction/get; status=502',
          downstreamError
        );
        done();
      },
    });
  });

  it('getWASupportedJurisdictions should return data on success', (done) => {
    const response = ['IA', 'CIVIL'];
    mockHttpService.get.and.returnValue(of(response));

    service.getWASupportedJurisdictions().subscribe((res) => {
      expect(res).toEqual(response);
      expect(mockHttpService.get).toHaveBeenCalledWith('/api/wa-supported-jurisdiction/get');
      expect(mockLoggerService.warn).not.toHaveBeenCalled();
      done();
    });
  });
});

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
        { provide: LoggerService, useValue: jasmine.createSpyObj('LoggerService', ['warn']) },
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

  it('should fall back to the API when reading session storage fails', () => {
    sessionStorageService.getItem.and.throwError('SecurityError');
    let result: string[];

    service.getWASupportedJurisdictions().subscribe((jurisdictions) => (result = jurisdictions));
    httpMock.expectOne('/api/wa-supported-jurisdiction/get').flush(['CIVIL']);

    expect(result).toEqual(['CIVIL']);
  });

  it('should fall back to the API when removing invalid cached data fails', () => {
    sessionStorageService.getItem.and.returnValue('{}');
    sessionStorageService.removeItem.and.throwError('SecurityError');
    let result: string[];

    service.getWASupportedJurisdictions().subscribe((jurisdictions) => (result = jurisdictions));
    httpMock.expectOne('/api/wa-supported-jurisdiction/get').flush(['CIVIL']);

    expect(sessionStorageService.removeItem).toHaveBeenCalledWith(WASupportedJurisdictionsService.jurisdictionStorageKey);
    expect(result).toEqual(['CIVIL']);
  });

  it('should deliver API responses to concurrent subscribers and allow later requests when cache writes fail', () => {
    sessionStorageService.setItem.and.throwError('QuotaExceededError');
    let firstResult: string[];
    let secondResult: string[];

    service.getWASupportedJurisdictions().subscribe((jurisdictions) => (firstResult = jurisdictions));
    service.getWASupportedJurisdictions().subscribe((jurisdictions) => (secondResult = jurisdictions));
    httpMock.expectOne('/api/wa-supported-jurisdiction/get').flush(['CIVIL']);

    expect(firstResult).toEqual(['CIVIL']);
    expect(secondResult).toEqual(['CIVIL']);

    let laterResult: string[];
    service.getWASupportedJurisdictions().subscribe((jurisdictions) => (laterResult = jurisdictions));
    httpMock.expectOne('/api/wa-supported-jurisdiction/get').flush(['CIVIL', 'IA']);

    expect(laterResult).toEqual(['CIVIL', 'IA']);
  });

  it('should allow a new request after an API failure', () => {
    let failure: unknown;
    service.getWASupportedJurisdictions().subscribe({ error: (error) => (failure = error) });
    httpMock.expectOne('/api/wa-supported-jurisdiction/get').flush('Unavailable', { status: 503, statusText: 'Unavailable' });

    expect(failure).toEqual(jasmine.objectContaining({ status: 503 }));

    let result: string[];
    service.getWASupportedJurisdictions().subscribe((jurisdictions) => (result = jurisdictions));
    httpMock.expectOne('/api/wa-supported-jurisdiction/get').flush(['CIVIL']);

    expect(result).toEqual(['CIVIL']);
  });
});
