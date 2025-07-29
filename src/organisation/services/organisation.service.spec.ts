import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { of, throwError } from 'rxjs';
import { ENVIRONMENT, OrganisationService } from './organisation.service';

describe('OrganisationService', () => {
  let service: OrganisationService;
  let mockHttpClient: jasmine.SpyObj<HttpClient>;

  beforeEach(() => {
    mockHttpClient = jasmine.createSpyObj('HttpClient', ['get']);

    TestBed.configureTestingModule({
      providers: [
        OrganisationService,
        { provide: HttpClient, useValue: mockHttpClient }
      ]
    });

    service = TestBed.inject(OrganisationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('fetchOrganisation', () => {
    it('should fetch organisation data successfully', (done) => {
      const mockOrganisationData = {
        id: '123',
        name: 'Test Organisation',
        address: '123 Test Street'
      };
      mockHttpClient.get.and.returnValue(of(mockOrganisationData));

      service.fetchOrganisation().subscribe(data => {
        expect(data).toEqual(mockOrganisationData);
        expect(mockHttpClient.get).toHaveBeenCalledWith(`${ENVIRONMENT.orgUri}`);
        expect(mockHttpClient.get).toHaveBeenCalledWith('/api/organisation');
        done();
      });
    });

    it('should handle empty response', (done) => {
      mockHttpClient.get.and.returnValue(of({}));

      service.fetchOrganisation().subscribe(data => {
        expect(data).toEqual({});
        expect(mockHttpClient.get).toHaveBeenCalledWith(`${ENVIRONMENT.orgUri}`);
        done();
      });
    });

    it('should handle null response', (done) => {
      mockHttpClient.get.and.returnValue(of(null));

      service.fetchOrganisation().subscribe(data => {
        expect(data).toBeNull();
        expect(mockHttpClient.get).toHaveBeenCalledWith(`${ENVIRONMENT.orgUri}`);
        done();
      });
    });

    it('should handle HTTP error', (done) => {
      const errorResponse = new HttpErrorResponse({
        error: 'Test error',
        status: 500,
        statusText: 'Internal Server Error'
      });
      mockHttpClient.get.and.returnValue(throwError(errorResponse));

      service.fetchOrganisation().subscribe(
        () => fail('should have failed with error'),
        (error) => {
          expect(error).toBeTruthy();
          done();
        }
      );
    });
  });

  describe('handleError', () => {
    let consoleErrorSpy: jasmine.Spy;

    beforeEach(() => {
      consoleErrorSpy = spyOn(console, 'error');
    });

    it('should handle client-side error with ErrorEvent', (done) => {
      const errorEvent = new ErrorEvent('Network error', {
        message: 'Failed to fetch'
      });
      const httpError = new HttpErrorResponse({
        error: errorEvent
      });

      service.handleError(httpError).subscribe(
        () => fail('should have failed'),
        (error) => {
          expect(error).toBe('error please try again later.');
          expect(consoleErrorSpy).toHaveBeenCalledWith('An error occurred:', 'Failed to fetch');
          done();
        }
      );
    });

    it('should handle backend error with status code', (done) => {
      const httpError = new HttpErrorResponse({
        error: { message: 'Backend error message' },
        status: 404,
        statusText: 'Not Found'
      });

      service.handleError(httpError).subscribe(
        () => fail('should have failed'),
        (error) => {
          expect(error).toBe('error please try again later.');
          expect(consoleErrorSpy).toHaveBeenCalledWith(
            'Backend returned code 404, body was:',
            { message: 'Backend error message' }
          );
          done();
        }
      );
    });

    it('should handle backend error with different status codes', (done) => {
      const httpError = new HttpErrorResponse({
        error: 'Unauthorized',
        status: 401,
        statusText: 'Unauthorized'
      });

      service.handleError(httpError).subscribe(
        () => fail('should have failed'),
        (error) => {
          expect(error).toBe('error please try again later.');
          expect(consoleErrorSpy).toHaveBeenCalledWith(
            'Backend returned code 401, body was:',
            'Unauthorized'
          );
          done();
        }
      );
    });

    it('should handle backend error with 500 status', (done) => {
      const httpError = new HttpErrorResponse({
        error: { detail: 'Internal server error occurred' },
        status: 500,
        statusText: 'Internal Server Error'
      });

      service.handleError(httpError).subscribe(
        () => fail('should have failed'),
        (error) => {
          expect(error).toBe('error please try again later.');
          expect(consoleErrorSpy).toHaveBeenCalledWith(
            'Backend returned code 500, body was:',
            { detail: 'Internal server error occurred' }
          );
          done();
        }
      );
    });

    it('should handle error with null error property', (done) => {
      const httpError = new HttpErrorResponse({
        error: null,
        status: 400,
        statusText: 'Bad Request'
      });

      service.handleError(httpError).subscribe(
        () => fail('should have failed'),
        (error) => {
          expect(error).toBe('error please try again later.');
          expect(consoleErrorSpy).toHaveBeenCalledWith(
            'Backend returned code 400, body was:',
            null
          );
          done();
        }
      );
    });

    it('should handle error with undefined error property', (done) => {
      const httpError = new HttpErrorResponse({
        error: undefined,
        status: 403,
        statusText: 'Forbidden'
      });

      service.handleError(httpError).subscribe(
        () => fail('should have failed'),
        (error) => {
          expect(error).toBe('error please try again later.');
          expect(consoleErrorSpy).toHaveBeenCalledWith(
            'Backend returned code 403, body was:',
            null
          );
          done();
        }
      );
    });

    it('should handle error with empty error message', (done) => {
      const errorEvent = new ErrorEvent('Network error', {
        message: ''
      });
      const httpError = new HttpErrorResponse({
        error: errorEvent
      });

      service.handleError(httpError).subscribe(
        () => fail('should have failed'),
        (error) => {
          expect(error).toBe('error please try again later.');
          expect(consoleErrorSpy).toHaveBeenCalledWith('An error occurred:', '');
          done();
        }
      );
    });
  });

  describe('ENVIRONMENT constant', () => {
    it('should have correct orgUri', () => {
      expect(ENVIRONMENT.orgUri).toBe('/api/organisation');
    });
  });
});