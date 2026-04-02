import { HttpClient } from '@angular/common/http';
import { of, throwError } from 'rxjs';
import { ListConstants } from '../components/constants';
import { SearchTaskRequest, TaskSearchParameters } from '../models/dtos';
import { LoggerService } from '../../app/services/logger/logger.service';
import { ACTION, WorkAllocationTaskService } from './work-allocation-task.service';

describe('WorkAllocationTaskService', () => {
  let mockHttpService: jasmine.SpyObj<HttpClient>;
  let mockLoggerService: jasmine.SpyObj<LoggerService>;
  let service: WorkAllocationTaskService;

  beforeEach(() => {
    mockHttpService = jasmine.createSpyObj('mockHttpService', ['put', 'get', 'post']);
    mockLoggerService = jasmine.createSpyObj('LoggerService', ['warn']);
    mockHttpService.post.and.returnValue(of({ tasks: [], total_records: 0 }));
    mockHttpService.get.and.returnValue(of([]));
    service = new WorkAllocationTaskService(mockHttpService, mockLoggerService);
    sessionStorage.removeItem('userDetails');
  });

  afterEach(() => {
    sessionStorage.removeItem('userDetails');
  });

  it('should be Truthy', () => {
    expect(service).toBeTruthy();
  });

  it('getTask should make correct api call', () => {
    service.getTask('123456');
    expect(mockHttpService.get).toHaveBeenCalledWith('/workallocation/task/123456');
  });

  it('getActionUrl should correctly format the url', () => {
    const url = service.getActionUrl('123456', ACTION.ASSIGN);
    expect(url).toEqual('/workallocation/task/123456/assign');
  });

  it('assignTask should make correct api call', () => {
    const user = { id: 'id1' };
    service.assignTask('123456', user);
    expect(mockHttpService.post).toHaveBeenCalledWith('/workallocation/task/123456/assign', user);
  });

  it('completeTask should make correct api call', () => {
    service.completeTask('123456', true);
    expect(mockHttpService.post).toHaveBeenCalledWith('/workallocation/task/123456/complete', {
      hasNoAssigneeOnComplete: true,
    });
  });

  it('cancelTask should make correct api call', () => {
    service.cancelTask('123456');
    expect(mockHttpService.post).toHaveBeenCalledWith('/workallocation/task/123456/cancel', {
      hasNoAssigneeOnComplete: undefined,
    });
  });

  it('claimTask should make correct api call', () => {
    service.claimTask('123456');
    expect(mockHttpService.post).toHaveBeenCalledWith('/workallocation/task/123456/claim', {
      hasNoAssigneeOnComplete: undefined,
    });
  });

  it('unclaimTask should make correct api call', () => {
    service.unclaimTask('123456');
    expect(mockHttpService.post).toHaveBeenCalledWith('/workallocation/task/123456/unclaim', {
      hasNoAssigneeOnComplete: undefined,
    });
  });

  it('postTask should make correct api call', () => {
    const searchParam = {} as TaskSearchParameters;
    service.postTask(searchParam);
    expect(mockHttpService.post).toHaveBeenCalledWith('/workallocation/task', searchParam);
  });

  it('searchTask should make correct api call and update currentTasks$', (done) => {
    const searchRequest = {} as SearchTaskRequest;
    const view = ListConstants.View.MyTasks;
    const response = { tasks: [{ id: 't-1' }], total_records: 1 };
    mockHttpService.post.and.returnValue(of(response));

    service.searchTask({ searchRequest, view, currentUser: null, refined: true }).subscribe((result) => {
      expect(result).toEqual(jasmine.objectContaining({ total_records: 1 }));
      expect(service.currentTasks$.getValue()).toEqual(jasmine.arrayContaining([jasmine.objectContaining({ id: 't-1' })]));
      expect(mockHttpService.post).toHaveBeenCalledWith('/workallocation/task', {
        searchRequest,
        view,
        currentUser: null,
        refined: true,
      });
      expect(mockLoggerService.warn).not.toHaveBeenCalled();
      done();
    });
  });

  it('searchTask should log and rethrow downstream failure', (done) => {
    const searchRequest = {} as SearchTaskRequest;
    const downstreamError = { status: 502 };
    mockHttpService.post.and.returnValue(throwError(() => downstreamError));

    service.searchTask({ searchRequest, view: ListConstants.View.MyTasks, currentUser: null, refined: true }).subscribe({
      next: () => done.fail('expected error'),
      error: (error) => {
        expect(error).toEqual(downstreamError);
        expect(mockLoggerService.warn).toHaveBeenCalledWith(
          'WorkAllocationTaskService.searchTask downstream failure; view=MyTasks; endpoint=/workallocation/task; status=502',
          downstreamError
        );
        done();
      },
    });
  });

  it('getUsersAssignedTasks should return [] when userDetails missing', (done) => {
    service.getUsersAssignedTasks().subscribe((res) => {
      expect(res).toEqual([]);
      done();
    });
  });

  it('getUsersAssignedTasks should post expected payload when userDetails exists', (done) => {
    sessionStorage.setItem('userDetails', JSON.stringify({ id: 'u1', uid: 'u1', roles: ['caseworker'] }));
    mockHttpService.post.and.returnValue(of({ tasks: [{ id: 't1' }] }));

    service.getUsersAssignedTasks().subscribe((res) => {
      expect(res).toEqual(jasmine.arrayContaining([jasmine.objectContaining({ id: 't1' })]));
      expect(mockHttpService.post).toHaveBeenCalledWith('/workallocation/task', {
        searchRequest: {
          search_parameters: [
            { key: 'user', operator: 'IN', values: ['u1'] },
            { key: 'state', operator: 'IN', values: ['assigned'] },
          ],
          sorting_parameters: [],
          search_by: 'caseworker',
        },
        view: 'MyTasks',
      });
      expect(mockLoggerService.warn).not.toHaveBeenCalled();
      done();
    });
  });

  it('getTaskTypeNamesFromService should return data on success', (done) => {
    const response = [{ taskName: 'Review', taskId: 1 }];
    mockHttpService.get.and.returnValue(of(response));

    service.getTaskTypeNamesFromService().subscribe((res) => {
      expect(res).toEqual(response);
      expect(mockHttpService.get).toHaveBeenCalledWith('/workallocation2/taskNames');
      expect(mockLoggerService.warn).not.toHaveBeenCalled();
      done();
    });
  });

  it('getUsersAssignedTasks should log and rethrow downstream failure', (done) => {
    const downstreamError = { status: 503 };
    sessionStorage.setItem('userDetails', JSON.stringify({ id: 'u1', uid: 'u1', roles: ['caseworker'] }));
    mockHttpService.post.and.returnValue(throwError(() => downstreamError));

    service.getUsersAssignedTasks().subscribe({
      next: () => done.fail('expected error'),
      error: (error) => {
        expect(error).toEqual(downstreamError);
        expect(mockLoggerService.warn).toHaveBeenCalledWith(
          'WorkAllocationTaskService.getUsersAssignedTasks downstream failure; endpoint=/workallocation/task; status=503',
          downstreamError
        );
        done();
      },
    });
  });

  it('getTaskTypeNamesFromService should log and rethrow downstream failure', (done) => {
    const downstreamError = { status: 500 };
    mockHttpService.get.and.returnValue(throwError(() => downstreamError));

    service.getTaskTypeNamesFromService().subscribe({
      next: () => done.fail('expected error'),
      error: (error) => {
        expect(error).toEqual(downstreamError);
        expect(mockLoggerService.warn).toHaveBeenCalledWith(
          'WorkAllocationTaskService.getTaskTypeNamesFromService downstream failure; endpoint=/workallocation2/taskNames; status=500',
          downstreamError
        );
        done();
      },
    });
  });

  it('assignTask should log and rethrow downstream failure', (done) => {
    const downstreamError = { status: 500 };
    mockHttpService.post.and.returnValue(throwError(() => downstreamError));

    service.assignTask('123456', { id: 'u2' }).subscribe({
      next: () => done.fail('expected error'),
      error: (error) => {
        expect(error).toEqual(downstreamError);
        expect(mockLoggerService.warn).toHaveBeenCalledWith(
          'WorkAllocationTaskService.assignTask downstream failure; taskId=123456; endpoint=/workallocation/task/123456/assign; status=500',
          downstreamError
        );
        done();
      },
    });
  });
});
