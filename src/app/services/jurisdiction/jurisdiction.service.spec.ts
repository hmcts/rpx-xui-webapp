import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { Jurisdiction } from '@hmcts/ccd-case-ui-toolkit';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { JurisdictionService } from './jurisdiction.service';

describe('JurisdictionService', () => {
  let service: JurisdictionService;
  let httpMock: HttpTestingController;

  const mockJurisdictions: Jurisdiction[] = [
    { id: 'IA', name: 'Immigration and Asylum', description: '', caseTypes: [] },
    { id: 'CIVIL', name: 'Civil', description: '', caseTypes: [] },
    { id: 'DIVORCE', name: 'Divorce', description: '', caseTypes: [] },
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      teardown: { destroyAfterEach: false },
      imports: [],
      providers: [JurisdictionService, provideHttpClient(withInterceptorsFromDi()), provideHttpClientTesting()],
    });

    service = TestBed.inject(JurisdictionService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    // Verify that no HTTP requests are outstanding
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getJurisdictions', () => {
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
      expect(req.request.headers.get('content-type')).toBe('application/json');
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

    it('should return empty array when API returns empty array', () => {
      service.getJurisdictions().subscribe((response) => {
        expect(response).toEqual([]);
        expect(response.length).toBe(0);
      });

      const req = httpMock.expectOne('/aggregated/caseworkers/:uid/jurisdictions-lite?access=read');
      req.flush([]);
    });

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
  });

  describe('jurisdictionUrl static property', () => {
    it('should have correct static URL property', () => {
      expect(JurisdictionService.jurisdictionUrl).toBe('/aggregated/caseworkers/:uid/jurisdictions-lite?access=read');
    });
  });
});
