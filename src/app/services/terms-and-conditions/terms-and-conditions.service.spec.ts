import { HttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { TCDocument } from '@hmcts/rpx-xui-common-lib';
import { of, throwError } from 'rxjs';
import { TermsConditionsService } from './terms-and-conditions.service';

describe('TermsConditionsService', () => {
  let service: TermsConditionsService;
  let mockHttpClient: jasmine.SpyObj<HttpClient>;

  beforeEach(() => {
    mockHttpClient = jasmine.createSpyObj('HttpClient', ['get']);

    TestBed.configureTestingModule({
      providers: [
        TermsConditionsService,
        { provide: HttpClient, useValue: mockHttpClient }
      ]
    });

    service = TestBed.inject(TermsConditionsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getTermsConditions', () => {
    it('should return terms and conditions document on success', (done) => {
      const mockTCDocument: TCDocument = {
        content: 'Terms and conditions content',
        version: 1.0,
        mimeType: 'text/html'
      };

      mockHttpClient.get.and.returnValue(of(mockTCDocument));

      service.getTermsConditions().subscribe(result => {
        expect(result).toEqual(mockTCDocument);
        expect(mockHttpClient.get).toHaveBeenCalledWith('api/termsAndConditions');
        expect(mockHttpClient.get).toHaveBeenCalledTimes(1);
        done();
      });
    });

    it('should handle error when getting terms and conditions fails', (done) => {
      const errorResponse = { status: 500, message: 'Internal Server Error' };
      mockHttpClient.get.and.returnValue(throwError(errorResponse));

      service.getTermsConditions().subscribe(
        () => fail('should have failed'),
        (error) => {
          expect(error).toEqual(errorResponse);
          expect(mockHttpClient.get).toHaveBeenCalledWith('api/termsAndConditions');
          done();
        }
      );
    });

    it('should handle 404 error when terms and conditions not found', (done) => {
      const errorResponse = { status: 404, message: 'Not Found' };
      mockHttpClient.get.and.returnValue(throwError(errorResponse));

      service.getTermsConditions().subscribe(
        () => fail('should have failed'),
        (error) => {
          expect(error.status).toBe(404);
          expect(error.message).toBe('Not Found');
          done();
        }
      );
    });

    it('should handle network error when getting terms and conditions', (done) => {
      const networkError = new Error('Network error');
      mockHttpClient.get.and.returnValue(throwError(networkError));

      service.getTermsConditions().subscribe(
        () => fail('should have failed'),
        (error) => {
          expect(error.message).toBe('Network error');
          done();
        }
      );
    });
  });

  describe('isTermsConditionsFeatureEnabled', () => {
    it('should return true when feature is enabled', (done) => {
      mockHttpClient.get.and.returnValue(of(true));

      service.isTermsConditionsFeatureEnabled().subscribe(result => {
        expect(result).toBe(true);
        expect(mockHttpClient.get).toHaveBeenCalledWith('api/configuration?configurationKey=termsAndConditionsEnabled');
        expect(mockHttpClient.get).toHaveBeenCalledTimes(1);
        done();
      });
    });

    it('should return false when feature is disabled', (done) => {
      mockHttpClient.get.and.returnValue(of(false));

      service.isTermsConditionsFeatureEnabled().subscribe(result => {
        expect(result).toBe(false);
        expect(mockHttpClient.get).toHaveBeenCalledWith('api/configuration?configurationKey=termsAndConditionsEnabled');
        done();
      });
    });

    it('should handle error when checking feature flag fails', (done) => {
      const errorResponse = { status: 500, message: 'Internal Server Error' };
      mockHttpClient.get.and.returnValue(throwError(errorResponse));

      service.isTermsConditionsFeatureEnabled().subscribe(
        () => fail('should have failed'),
        (error) => {
          expect(error).toEqual(errorResponse);
          expect(mockHttpClient.get).toHaveBeenCalledWith('api/configuration?configurationKey=termsAndConditionsEnabled');
          done();
        }
      );
    });

    it('should handle 404 error when configuration endpoint not found', (done) => {
      const errorResponse = { status: 404, message: 'Configuration not found' };
      mockHttpClient.get.and.returnValue(throwError(errorResponse));

      service.isTermsConditionsFeatureEnabled().subscribe(
        () => fail('should have failed'),
        (error) => {
          expect(error.status).toBe(404);
          expect(error.message).toBe('Configuration not found');
          done();
        }
      );
    });

    it('should handle unauthorized error when checking feature flag', (done) => {
      const errorResponse = { status: 401, message: 'Unauthorized' };
      mockHttpClient.get.and.returnValue(throwError(errorResponse));

      service.isTermsConditionsFeatureEnabled().subscribe(
        () => fail('should have failed'),
        (error) => {
          expect(error.status).toBe(401);
          done();
        }
      );
    });

    it('should handle timeout error when checking feature flag', (done) => {
      const timeoutError = { name: 'TimeoutError', message: 'Request timeout' };
      mockHttpClient.get.and.returnValue(throwError(timeoutError));

      service.isTermsConditionsFeatureEnabled().subscribe(
        () => fail('should have failed'),
        (error) => {
          expect(error.name).toBe('TimeoutError');
          expect(error.message).toBe('Request timeout');
          done();
        }
      );
    });
  });

  describe('multiple consecutive calls', () => {
    it('should handle multiple calls to getTermsConditions', (done) => {
      const mockTCDocument: TCDocument = {
        content: 'Terms and conditions content',
        version: 2.0,
        mimeType: 'text/html'
      };

      mockHttpClient.get.and.returnValue(of(mockTCDocument));

      let callCount = 0;
      const totalCalls = 3;

      for (let i = 0; i < totalCalls; i++) {
        service.getTermsConditions().subscribe(result => {
          expect(result).toEqual(mockTCDocument);
          callCount++;
          if (callCount === totalCalls) {
            expect(mockHttpClient.get).toHaveBeenCalledTimes(totalCalls);
            done();
          }
        });
      }
    });

    it('should handle mixed success and error responses', (done) => {
      const mockTCDocument: TCDocument = {
        content: 'Terms and conditions content',
        version: 1.0,
        mimeType: 'text/html'
      };
      const errorResponse = { status: 503, message: 'Service Unavailable' };

      let callCount = 0;

      // First call succeeds
      mockHttpClient.get.and.returnValue(of(mockTCDocument));
      service.getTermsConditions().subscribe(result => {
        expect(result).toEqual(mockTCDocument);
        callCount++;

        // Second call fails
        mockHttpClient.get.and.returnValue(throwError(errorResponse));
        service.getTermsConditions().subscribe(
          () => fail('should have failed'),
          (error) => {
            expect(error).toEqual(errorResponse);
            callCount++;

            // Third call succeeds again
            mockHttpClient.get.and.returnValue(of(mockTCDocument));
            service.getTermsConditions().subscribe(result => {
              expect(result).toEqual(mockTCDocument);
              expect(mockHttpClient.get).toHaveBeenCalledTimes(3);
              done();
            });
          }
        );
      });
    });
  });

  describe('edge cases', () => {
    it('should handle empty terms and conditions document', (done) => {
      const emptyTCDocument: TCDocument = {
        content: '',
        version: 0,
        mimeType: ''
      };

      mockHttpClient.get.and.returnValue(of(emptyTCDocument));

      service.getTermsConditions().subscribe(result => {
        expect(result).toEqual(emptyTCDocument);
        expect(result.content).toBe('');
        expect(result.version).toBe(0);
        expect(result.mimeType).toBe('');
        done();
      });
    });

    it('should handle null response from terms and conditions endpoint', (done) => {
      mockHttpClient.get.and.returnValue(of(null));

      service.getTermsConditions().subscribe(result => {
        expect(result).toBeNull();
        done();
      });
    });

    it('should handle undefined response from feature flag endpoint', (done) => {
      mockHttpClient.get.and.returnValue(of(undefined));

      service.isTermsConditionsFeatureEnabled().subscribe(result => {
        expect(result).toBeUndefined();
        done();
      });
    });

    it('should handle partial terms and conditions document', (done) => {
      const partialTCDocument: Partial<TCDocument> = {
        content: 'Some content',
        version: 1.0
        // mimeType field is missing
      };

      mockHttpClient.get.and.returnValue(of(partialTCDocument));

      service.getTermsConditions().subscribe(result => {
        expect(result.content).toBe('Some content');
        expect(result.version).toBe(1.0);
        expect(result.mimeType).toBeUndefined();
        done();
      });
    });
  });

  describe('service instantiation', () => {
    it('should use injected HttpClient instance', () => {
      expect(service).toBeDefined();
      expect(mockHttpClient).toBeDefined();
      
      // Verify that the service uses the mocked HttpClient
      service.getTermsConditions();
      expect(mockHttpClient.get).toHaveBeenCalled();
    });

    it('should have the correct configuration key', () => {
      // Access the private field through bracket notation for testing
      expect(service['configuration']).toBe('termsAndConditionsEnabled');
    });

    it('should maintain the same HttpClient instance across multiple method calls', () => {
      const firstHttpClient = service['http'];
      
      service.getTermsConditions();
      service.isTermsConditionsFeatureEnabled();
      
      const secondHttpClient = service['http'];
      
      expect(firstHttpClient).toBe(secondHttpClient);
      expect(mockHttpClient.get).toHaveBeenCalledTimes(2);
    });
  });
});