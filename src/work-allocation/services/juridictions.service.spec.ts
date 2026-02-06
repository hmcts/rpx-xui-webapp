import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { Jurisdiction } from '@hmcts/ccd-case-ui-toolkit';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { SessionStorageService } from '../../app/services';
import { JurisdictionsService } from './juridictions.service';

describe('JurisdictionsService', () => {
  let service: JurisdictionsService;
  let httpMock: HttpTestingController;
  let sessionStorageService: SessionStorageService;

  const mockJurisdictions: Jurisdiction[] = [
    { id: 'IA', name: 'Immigration and Asylum', description: '', caseTypes: [] },
    { id: 'CIVIL', name: 'Civil', description: '', caseTypes: [] },
    { id: 'DIVORCE', name: 'Divorce', description: '', caseTypes: [] },
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      teardown: { destroyAfterEach: false },
      imports: [],
      providers: [
        JurisdictionsService,
        SessionStorageService,
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting(),
      ],
    });

    service = TestBed.inject(JurisdictionsService);
    httpMock = TestBed.inject(HttpTestingController);
    sessionStorageService = TestBed.inject(SessionStorageService);

    // Clear session storage before each test
    sessionStorage.clear();
  });

  afterEach(() => {
    // Verify that no HTTP requests are outstanding
    httpMock.verify();
    sessionStorage.clear();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getJurisdictions', () => {
    describe('when session storage is empty', () => {
      it('should make GET request to jurisdictions-lite endpoint with correct URL', () => {
        service.getJurisdictions().subscribe((response) => {
          expect(response).toEqual(mockJurisdictions);
        });

        const req = httpMock.expectOne('/aggregated/caseworkers/:uid/jurisdictions-lite?access=read');
        expect(req.request.method).toBe('GET');
        expect(req.request.url).toBe('/aggregated/caseworkers/:uid/jurisdictions-lite?access=read');
        req.flush(mockJurisdictions);
      });

      it('should set correct headers in the request', () => {
        service.getJurisdictions().subscribe();

        const req = httpMock.expectOne('/aggregated/caseworkers/:uid/jurisdictions-lite?access=read');
        expect(req.request.headers.get('Content-Type')).toBe('application/json');
        expect(req.request.headers.get('Accept')).toBe('application/json');
        req.flush(mockJurisdictions);
      });

      it('should return jurisdictions array on successful response', () => {
        service.getJurisdictions().subscribe((response) => {
          expect(response).toEqual(mockJurisdictions);
          expect(response.length).toBe(3);
          expect(response[0].id).toBe('IA');
          expect(response[0].name).toBe('Immigration and Asylum');
        });

        const req = httpMock.expectOne('/aggregated/caseworkers/:uid/jurisdictions-lite?access=read');
        req.flush(mockJurisdictions);
      });

      it('should save jurisdictions to session storage after successful HTTP call', () => {
        spyOn(sessionStorageService, 'setItem').and.callThrough();

        service.getJurisdictions().subscribe((response) => {
          expect(response).toEqual(mockJurisdictions);
          expect(sessionStorageService.setItem).toHaveBeenCalledWith('JURISDICTIONS', JSON.stringify(mockJurisdictions));
        });

        const req = httpMock.expectOne('/aggregated/caseworkers/:uid/jurisdictions-lite?access=read');
        req.flush(mockJurisdictions);
      });

      it('should verify session storage contains cached data after HTTP call', () => {
        service.getJurisdictions().subscribe();

        const req = httpMock.expectOne('/aggregated/caseworkers/:uid/jurisdictions-lite?access=read');
        req.flush(mockJurisdictions);

        // Verify data was saved to session storage
        const cachedData = sessionStorage.getItem('JURISDICTIONS');
        expect(cachedData).toBeTruthy();
        expect(JSON.parse(cachedData)).toEqual(mockJurisdictions);
      });
    });

    describe('when session storage has cached data', () => {
      beforeEach(() => {
        // Pre-populate session storage with cached jurisdictions
        sessionStorage.setItem('JURISDICTIONS', JSON.stringify(mockJurisdictions));
      });

      it('should return cached jurisdictions without making HTTP request', () => {
        service.getJurisdictions().subscribe((response) => {
          expect(response).toEqual(mockJurisdictions);
        });

        // Verify no HTTP request was made
        httpMock.expectNone('/aggregated/caseworkers/:uid/jurisdictions-lite?access=read');
      });

      it('should return cached data immediately without network call', () => {
        const cachedJurisdictions: Jurisdiction[] = [
          { id: 'CACHED', name: 'Cached Jurisdiction', description: '', caseTypes: [] },
        ];
        sessionStorage.setItem('JURISDICTIONS', JSON.stringify(cachedJurisdictions));

        service.getJurisdictions().subscribe((response) => {
          expect(response).toEqual(cachedJurisdictions);
          expect(response[0].id).toBe('CACHED');
        });

        // Verify no HTTP request was made
        httpMock.expectNone('/aggregated/caseworkers/:uid/jurisdictions-lite?access=read');
      });

      it('should not call sessionStorageService.setItem when using cache', () => {
        spyOn(sessionStorageService, 'setItem');

        service.getJurisdictions().subscribe();

        expect(sessionStorageService.setItem).not.toHaveBeenCalled();
        httpMock.expectNone('/aggregated/caseworkers/:uid/jurisdictions-lite?access=read');
      });
    });

    describe('error handling', () => {
      it('should handle HTTP error responses', () => {
        const errorMessage = 'Server Error';
        const errorStatus = 500;

        service.getJurisdictions().subscribe({
          next: () => fail('should have failed with 500 error'),
          error: (error) => {
            expect(error.status).toBe(errorStatus);
            expect(error.statusText).toBe('Internal Server Error');
          },
        });

        const req = httpMock.expectOne('/aggregated/caseworkers/:uid/jurisdictions-lite?access=read');
        req.flush(errorMessage, { status: errorStatus, statusText: 'Internal Server Error' });
      });

      it('should handle network errors', () => {
        service.getJurisdictions().subscribe({
          next: () => fail('should have failed with network error'),
          error: (error) => {
            expect(error.error).toBeTruthy();
          },
        });

        const req = httpMock.expectOne('/aggregated/caseworkers/:uid/jurisdictions-lite?access=read');
        req.error(new ErrorEvent('Network error'));
      });

      it('should handle 404 Not Found error', () => {
        service.getJurisdictions().subscribe({
          next: () => fail('should have failed with 404 error'),
          error: (error) => {
            expect(error.status).toBe(404);
            expect(error.statusText).toBe('Not Found');
          },
        });

        const req = httpMock.expectOne('/aggregated/caseworkers/:uid/jurisdictions-lite?access=read');
        req.flush('Not Found', { status: 404, statusText: 'Not Found' });
      });

      it('should not save to session storage on error', () => {
        spyOn(sessionStorageService, 'setItem');

        service.getJurisdictions().subscribe({
          next: () => fail('should have failed'),
          error: () => {
            expect(sessionStorageService.setItem).not.toHaveBeenCalled();
          },
        });

        const req = httpMock.expectOne('/aggregated/caseworkers/:uid/jurisdictions-lite?access=read');
        req.flush('Error', { status: 500, statusText: 'Internal Server Error' });
      });
    });

    describe('edge cases', () => {
      it('should handle empty array response', () => {
        service.getJurisdictions().subscribe((response) => {
          expect(response).toEqual([]);
          expect(response.length).toBe(0);
        });

        const req = httpMock.expectOne('/aggregated/caseworkers/:uid/jurisdictions-lite?access=read');
        req.flush([]);
      });

      it('should handle null response from API', () => {
        service.getJurisdictions().subscribe((response) => {
          expect(response).toBeNull();
        });

        const req = httpMock.expectOne('/aggregated/caseworkers/:uid/jurisdictions-lite?access=read');
        req.flush(null);
      });

      it('should handle invalid JSON in session storage gracefully', () => {
        // Set invalid JSON in session storage
        sessionStorage.setItem('JURISDICTIONS', 'invalid-json{');
        spyOn(sessionStorageService, 'removeItem').and.callThrough();

        // Should fall back to HTTP request
        service.getJurisdictions().subscribe((response) => {
          expect(response).toEqual(mockJurisdictions);
          // Verify corrupted data was removed from session storage
          expect(sessionStorageService.removeItem).toHaveBeenCalledWith('JURISDICTIONS');
        });

        const req = httpMock.expectOne('/aggregated/caseworkers/:uid/jurisdictions-lite?access=read');
        req.flush(mockJurisdictions);
      });
    });

    describe('multiple calls', () => {
      it('should use cache on subsequent calls after first successful HTTP call', () => {
        // First call - should make HTTP request
        service.getJurisdictions().subscribe();
        const req1 = httpMock.expectOne('/aggregated/caseworkers/:uid/jurisdictions-lite?access=read');
        req1.flush(mockJurisdictions);

        // Second call - should use cache
        service.getJurisdictions().subscribe((response) => {
          expect(response).toEqual(mockJurisdictions);
        });
        httpMock.expectNone('/aggregated/caseworkers/:uid/jurisdictions-lite?access=read');
      });
    });
  });
});
