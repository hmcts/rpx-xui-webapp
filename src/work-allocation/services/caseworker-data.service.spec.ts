import { HttpClient } from '@angular/common/http';
import { of, throwError } from 'rxjs';
import { LoggerService } from '../../app/services/logger/logger.service';
import { Caseworker } from '../models/dtos';
import { CaseworkerDataService } from './caseworker-data.service';

describe('CaseworkerDataService', () => {
  let mockHttpService: jasmine.SpyObj<HttpClient>;
  let mockLoggerService: jasmine.SpyObj<LoggerService>;
  let service: CaseworkerDataService;

  beforeEach(() => {
    mockHttpService = jasmine.createSpyObj('mockHttpService', ['put', 'get', 'post']);
    mockLoggerService = jasmine.createSpyObj('LoggerService', ['warn']);
    mockHttpService.get.and.returnValue(of({}));
    mockHttpService.post.and.returnValue(of({}));
    service = new CaseworkerDataService(mockHttpService, mockLoggerService);
  });

  it('should be Truthy', () => {
    expect(service).toBeTruthy();
  });

  it('getForLocation should make correct api call', () => {
    service.getForLocation('location123');
    expect(mockHttpService.get).toHaveBeenCalledWith(`${CaseworkerDataService.caseWorkerUrl}/location/location123`);
  });

  it('getForService should make correct api call', () => {
    service.getForService('service1');
    expect(mockHttpService.get).toHaveBeenCalledWith(`${CaseworkerDataService.caseWorkerUrl}/service/service1`);
  });

  it('getForLocationAndService should make correct api call', () => {
    service.getForLocationAndService('location123', 'service1');
    expect(mockHttpService.get).toHaveBeenCalledWith(
      `${CaseworkerDataService.caseWorkerUrl}/location/location123/service/service1`
    );
  });

  it('search should make correct api call', () => {
    service.search('searchTerm');
    expect(mockHttpService.post).toHaveBeenCalledWith(`${CaseworkerDataService.caseWorkerUrl}/search`, { term: 'searchTerm' });
  });

  it('getDetails should make correct api call', () => {
    service.getDetails('123456');
    expect(mockHttpService.get).toHaveBeenCalledWith(`${CaseworkerDataService.caseWorkerUrl}/123456`);
  });

  it('getUsersFromServices should log and rethrow downstream failure', (done) => {
    const downstreamError = { status: 500 };
    mockHttpService.post.and.returnValue(throwError(() => downstreamError));

    service.getUsersFromServices(['IA', 'CIVIL'], 'alice').subscribe({
      next: () => done.fail('expected error'),
      error: (error) => {
        expect(error).toEqual(downstreamError);
        expect(mockLoggerService.warn).toHaveBeenCalledWith(
          'CaseworkerDataService.getUsersFromServices downstream failure; services=IA,CIVIL; termPresent=true; endpoint=/workallocation/caseworker/getUsersByServiceName; status=500',
          downstreamError
        );
        done();
      },
    });
  });

  it('getUsersFromServices should return users on success and send expected payload', (done) => {
    const response = [{ idamId: 'u1' }] as unknown as Caseworker[];
    mockHttpService.post.and.returnValue(of(response));

    service.getUsersFromServices(['IA', 'CIVIL'], 'alice').subscribe((res) => {
      expect(res).toEqual(response);
      expect(mockHttpService.post).toHaveBeenCalledWith('/workallocation/caseworker/getUsersByServiceName', {
        services: ['IA', 'CIVIL'],
        term: 'alice',
      });
      expect(mockLoggerService.warn).not.toHaveBeenCalled();
      done();
    });
  });

  it('getForLocation should log and rethrow downstream failure', (done) => {
    const downstreamError = { status: 503 };
    mockHttpService.get.and.returnValue(throwError(() => downstreamError));

    service.getForLocation('location123').subscribe({
      next: () => done.fail('expected error'),
      error: (error) => {
        expect(error).toEqual(downstreamError);
        expect(mockLoggerService.warn).toHaveBeenCalledWith(
          'CaseworkerDataService.getForLocation downstream failure; locationId=location123; endpoint=/workallocation/caseworker/location/location123; status=503',
          downstreamError
        );
        done();
      },
    });
  });

  it('getForService should log and rethrow downstream failure', (done) => {
    const downstreamError = { status: 500 };
    mockHttpService.get.and.returnValue(throwError(() => downstreamError));

    service.getForService('service1').subscribe({
      next: () => done.fail('expected error'),
      error: (error) => {
        expect(error).toEqual(downstreamError);
        expect(mockLoggerService.warn).toHaveBeenCalledWith(
          'CaseworkerDataService.getForService downstream failure; serviceId=service1; endpoint=/workallocation/caseworker/service/service1; status=500',
          downstreamError
        );
        done();
      },
    });
  });

  it('getForLocationAndService should log and rethrow downstream failure', (done) => {
    const downstreamError = { status: 404 };
    mockHttpService.get.and.returnValue(throwError(() => downstreamError));

    service.getForLocationAndService('location123', 'service1').subscribe({
      next: () => done.fail('expected error'),
      error: (error) => {
        expect(error).toEqual(downstreamError);
        expect(mockLoggerService.warn).toHaveBeenCalledWith(
          'CaseworkerDataService.getForLocationAndService downstream failure; locationId=location123; serviceId=service1; endpoint=/workallocation/caseworker/location/location123/service/service1; status=404',
          downstreamError
        );
        done();
      },
    });
  });

  it('search should log and rethrow downstream failure', (done) => {
    const downstreamError = { status: 502 };
    mockHttpService.post.and.returnValue(throwError(() => downstreamError));

    service.search('searchTerm').subscribe({
      next: () => done.fail('expected error'),
      error: (error) => {
        expect(error).toEqual(downstreamError);
        expect(mockLoggerService.warn).toHaveBeenCalledWith(
          'CaseworkerDataService.search downstream failure; termPresent=true; endpoint=/workallocation/caseworker/search; status=502',
          downstreamError
        );
        done();
      },
    });
  });

  it('getDetails should log and rethrow downstream failure', (done) => {
    const downstreamError = { status: 401 };
    mockHttpService.get.and.returnValue(throwError(() => downstreamError));

    service.getDetails('123456').subscribe({
      next: () => done.fail('expected error'),
      error: (error) => {
        expect(error).toEqual(downstreamError);
        expect(mockLoggerService.warn).toHaveBeenCalledWith(
          'CaseworkerDataService.getDetails downstream failure; caseworkerId=123456; endpoint=/workallocation/caseworker/123456; status=401',
          downstreamError
        );
        done();
      },
    });
  });
});
