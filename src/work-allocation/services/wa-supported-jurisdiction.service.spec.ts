import { HttpClient, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
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

  it('should return supported jurisdictions from session storage without making an HTTP request', () => {
    sessionStorageService.getItem.and.returnValue(JSON.stringify(['CIVIL', 'IA']));
    let result: string[];

    service.getWASupportedJurisdictions().subscribe((jurisdictions) => (result = jurisdictions));

    expect(result).toEqual(['CIVIL', 'IA']);
    httpMock.expectNone('/api/wa-supported-jurisdiction/get');
  });

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

  it('should use session storage after the initial HTTP request completes', () => {
    let cachedValue: string;
    sessionStorageService.getItem.and.callFake(() => cachedValue);
    sessionStorageService.setItem.and.callFake((_key, value) => (cachedValue = value));

    service.getWASupportedJurisdictions().subscribe();
    httpMock.expectOne('/api/wa-supported-jurisdiction/get').flush(['CIVIL']);

    let result: string[];
    service.getWASupportedJurisdictions().subscribe((jurisdictions) => (result = jurisdictions));

    expect(result).toEqual(['CIVIL']);
    httpMock.expectNone('/api/wa-supported-jurisdiction/get');
  });

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
