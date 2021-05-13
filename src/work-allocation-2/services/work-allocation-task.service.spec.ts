import { ListConstants } from '../components/constants';
import { SearchTaskRequest, TaskSearchParameters } from '../models/dtos';
import { ACTION, WorkAllocationTaskService } from './work-allocation-task.service';

describe('WorkAllocation', () => {
  const mockHttpService = jasmine.createSpyObj('mockHttpService', ['put', 'get', 'post']);

  describe('WorkAllocationTaskService', () => {
    it('should be Truthy', () => {
      const service = new WorkAllocationTaskService(mockHttpService);
      expect(service).toBeTruthy();
    });

    it('getTask should make correct api call', () => {
      const service = new WorkAllocationTaskService(mockHttpService);
      service.getTask('123456');
      expect(mockHttpService.get).toHaveBeenCalledWith('/workallocation2/task/123456');
    });

    it('getActionUrl should correctly format the url', () => {
      const service = new WorkAllocationTaskService(mockHttpService);
      const url = service.getActionUrl('123456', ACTION.ASSIGN);
      expect(url).toEqual('/workallocation2/task/123456/assign');
    });

    it('assignTask should make correct api call', () => {
      const service = new WorkAllocationTaskService(mockHttpService);
      const user = {id: 'id1'};
      service.assignTask('123456', user);
      expect(mockHttpService.post).toHaveBeenCalledWith('/workallocation2/task/123456/assign', user);
    });

    it('completeTask should make correct api call', () => {
      const service = new WorkAllocationTaskService(mockHttpService);
      service.completeTask('123456');
      expect(mockHttpService.post).toHaveBeenCalledWith('/workallocation2/task/123456/complete', {});
    });

    it('cancelTask should make correct api call', () => {
      const service = new WorkAllocationTaskService(mockHttpService);
      service.cancelTask('123456');
      expect(mockHttpService.post).toHaveBeenCalledWith('/workallocation2/task/123456/cancel', {});
    });

    it('claimTask should make correct api call', () => {
      const service = new WorkAllocationTaskService(mockHttpService);
      service.claimTask('123456');
      expect(mockHttpService.post).toHaveBeenCalledWith('/workallocation2/task/123456/claim', {});
    });

    it('unclaimTask should make correct api call', () => {
      const service = new WorkAllocationTaskService(mockHttpService);
      service.unclaimTask('123456');
      expect(mockHttpService.post).toHaveBeenCalledWith('/workallocation2/task/123456/unclaim', {});
    });

    it('postTask should make correct api call', () => {
      const service = new WorkAllocationTaskService(mockHttpService);
      const searchParam = {} as TaskSearchParameters;
      service.postTask(searchParam);
      expect(mockHttpService.post).toHaveBeenCalledWith('/workallocation2/task', searchParam);
    });

    it('searchTask should make correct api call', () => {
      const service = new WorkAllocationTaskService(mockHttpService);
      const searchRequest = {} as SearchTaskRequest;
      const view = ListConstants.View.MyTasks;
      service.searchTask({ searchRequest, view });
      expect(mockHttpService.post).toHaveBeenCalledWith('/workallocation2/task', { searchRequest, view });
    });
  });
});
