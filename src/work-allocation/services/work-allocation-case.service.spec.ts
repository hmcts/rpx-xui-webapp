import { HttpClient } from '@angular/common/http';
import { of, throwError } from 'rxjs';
import { ListConstants } from '../components/constants';
import { CaseSearchParameters, SearchCaseRequest } from '../models/dtos';
import { LoggerService } from '../../app/services/logger/logger.service';
import { ACTION, WorkAllocationCaseService } from './work-allocation-case.service';

describe('WorkAllocationCaseService', () => {
  let mockHttpService: jasmine.SpyObj<HttpClient>;
  let mockLoggerService: jasmine.SpyObj<LoggerService>;
  let service: WorkAllocationCaseService;

  beforeEach(() => {
    mockHttpService = jasmine.createSpyObj('mockHttpService', ['put', 'get', 'post']);
    mockLoggerService = jasmine.createSpyObj('LoggerService', ['warn']);
    mockHttpService.get.and.returnValue(of({}));
    mockHttpService.post.and.returnValue(of({}));
    service = new WorkAllocationCaseService(mockHttpService, mockLoggerService);
  });

  it('should be Truthy', () => {
    expect(service).toBeTruthy();
  });

  it('getCase should make correct api call', () => {
    service.getCase('123456');
    expect(mockHttpService.get).toHaveBeenCalledWith('/workallocation/case/123456');
  });

  it('getActionUrl should correctly format the url', () => {
    const url = service.getActionUrl('123456', ACTION.ASSIGN);
    expect(url).toEqual('/workallocation/case/123456/assign');
  });

  it('assignCase should make correct api call', () => {
    const user = { id: 'id1' };
    service.assignCase('123456', user);
    expect(mockHttpService.post).toHaveBeenCalledWith('/workallocation/case/123456/assign', user);
  });

  it('completeCase should make correct api call', () => {
    service.completeCase('123456');
    expect(mockHttpService.post).toHaveBeenCalledWith('/workallocation/case/123456/complete', {});
  });

  it('cancelCase should make correct api call', () => {
    service.cancelCase('123456');
    expect(mockHttpService.post).toHaveBeenCalledWith('/workallocation/case/123456/cancel', {});
  });

  it('claimCase should make correct api call', () => {
    service.claimCase('123456');
    expect(mockHttpService.post).toHaveBeenCalledWith('/workallocation/case/123456/claim', {});
  });

  it('unclaimCase should make correct api call', () => {
    service.unclaimCase('123456');
    expect(mockHttpService.post).toHaveBeenCalledWith('/workallocation/case/123456/unclaim', {});
  });

  it('postCase should make correct api call', () => {
    const searchParam = {} as CaseSearchParameters;
    service.postCase(searchParam);
    expect(mockHttpService.post).toHaveBeenCalledWith('/workallocation/case', searchParam);
  });

  it('searchCase should make correct api call', () => {
    const searchRequest = {} as SearchCaseRequest;
    const view = ListConstants.View.MyCases;

    service.searchCase({ searchRequest, view });

    expect(mockHttpService.post).toHaveBeenCalledWith('/workallocation/case', { searchRequest, view });
    expect(mockLoggerService.warn).not.toHaveBeenCalled();
  });

  it('getMyCases should make correct api call', () => {
    const body = { searchRequest: {} as SearchCaseRequest, view: ListConstants.View.MyCases };

    service.getMyCases(body);

    expect(mockHttpService.post).toHaveBeenCalledWith('/workallocation/my-work/cases', body);
    expect(mockLoggerService.warn).not.toHaveBeenCalled();
  });

  it('getCases should make correct api call', () => {
    const body = { searchRequest: {} as SearchCaseRequest, view: ListConstants.View.AllWork };

    service.getCases(body);

    expect(mockHttpService.post).toHaveBeenCalledWith('/workallocation/all-work/cases', body);
    expect(mockLoggerService.warn).not.toHaveBeenCalled();
  });

  it('getMyAccess should make correct api call', (done) => {
    const body = { searchRequest: {} as SearchCaseRequest, view: ListConstants.View.MyCases };
    const response = { access: true };
    mockHttpService.post.and.returnValue(of(response));

    service.getMyAccess(body).subscribe((result) => {
      expect(result).toEqual(response);
      expect(mockHttpService.post).toHaveBeenCalledWith('/workallocation/my-work/myaccess', body);
      expect(mockLoggerService.warn).not.toHaveBeenCalled();
      done();
    });
  });

  it('getTasksByCaseId should make correct api call', () => {
    service.getTasksByCaseId('123456');

    expect(mockHttpService.post).toHaveBeenCalledWith('/workallocation/case/task/123456', { refined: true });
    expect(mockLoggerService.warn).not.toHaveBeenCalled();
  });

  it('getMyCases should log and rethrow downstream failure', (done) => {
    const body = { searchRequest: {} as SearchCaseRequest, view: ListConstants.View.MyCases };
    const downstreamError = { status: 502 };
    mockHttpService.post.and.returnValue(throwError(() => downstreamError));

    service.getMyCases(body).subscribe({
      next: () => done.fail('expected error'),
      error: (error) => {
        expect(error).toEqual(downstreamError);
        expect(mockLoggerService.warn).toHaveBeenCalledWith(
          'WorkAllocationCaseService.getMyCases downstream failure; view=MyCases; endpoint=/workallocation/my-work/cases; status=502',
          downstreamError
        );
        done();
      },
    });
  });

  it('getCases should log and rethrow downstream failure', (done) => {
    const body = { searchRequest: {} as SearchCaseRequest, view: ListConstants.View.AllWork };
    const downstreamError = { status: 503 };
    mockHttpService.post.and.returnValue(throwError(() => downstreamError));

    service.getCases(body).subscribe({
      next: () => done.fail('expected error'),
      error: (error) => {
        expect(error).toEqual(downstreamError);
        expect(mockLoggerService.warn).toHaveBeenCalledWith(
          'WorkAllocationCaseService.getCases downstream failure; view=AllWork; endpoint=/workallocation/all-work/cases; status=503',
          downstreamError
        );
        done();
      },
    });
  });

  it('searchCase should log and rethrow downstream failure', (done) => {
    const body = { searchRequest: {} as SearchCaseRequest, view: ListConstants.View.MyCases };
    const downstreamError = { status: 500 };
    mockHttpService.post.and.returnValue(throwError(() => downstreamError));

    service.searchCase(body).subscribe({
      next: () => done.fail('expected error'),
      error: (error) => {
        expect(error).toEqual(downstreamError);
        expect(mockLoggerService.warn).toHaveBeenCalledWith(
          'WorkAllocationCaseService.searchCase downstream failure; view=MyCases; endpoint=/workallocation/case; status=500',
          downstreamError
        );
        done();
      },
    });
  });

  it('assignCase should log and rethrow downstream failure', (done) => {
    const downstreamError = { status: 500 };
    mockHttpService.post.and.returnValue(throwError(() => downstreamError));

    service.assignCase('123456', { id: 'id1' }).subscribe({
      next: () => done.fail('expected error'),
      error: (error) => {
        expect(error).toEqual(downstreamError);
        expect(mockLoggerService.warn).toHaveBeenCalledWith(
          'WorkAllocationCaseService.assignCase downstream failure; caseId=123456; endpoint=/workallocation/case/123456/assign; status=500',
          downstreamError
        );
        done();
      },
    });
  });

  it('getTasksByCaseId should log and rethrow downstream failure', (done) => {
    const downstreamError = { status: 504 };
    mockHttpService.post.and.returnValue(throwError(() => downstreamError));

    service.getTasksByCaseId('123456').subscribe({
      next: () => done.fail('expected error'),
      error: (error) => {
        expect(error).toEqual(downstreamError);
        expect(mockLoggerService.warn).toHaveBeenCalledWith(
          'WorkAllocationCaseService.getTasksByCaseId downstream failure; caseId=123456; endpoint=/workallocation/case/task/123456; status=504',
          downstreamError
        );
        done();
      },
    });
  });

  it('getMyAccess should log and rethrow downstream failure', (done) => {
    const body = { searchRequest: {} as SearchCaseRequest, view: ListConstants.View.MyCases };
    const downstreamError = { status: 403 };
    mockHttpService.post.and.returnValue(throwError(() => downstreamError));

    service.getMyAccess(body).subscribe({
      next: () => done.fail('expected error'),
      error: (error) => {
        expect(error).toEqual(downstreamError);
        expect(mockLoggerService.warn).toHaveBeenCalledWith(
          'WorkAllocationCaseService.getMyAccess downstream failure; view=MyCases; endpoint=/workallocation/my-work/myaccess; status=403',
          downstreamError
        );
        done();
      },
    });
  });
});
