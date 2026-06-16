import { HttpClient } from '@angular/common/http';
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
    service = new WASupportedJurisdictionsService(mockHttpService, mockLoggerService);
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
