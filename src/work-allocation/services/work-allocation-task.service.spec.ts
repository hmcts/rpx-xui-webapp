import { TaskSearchParameters } from './../models/dtos/task-search-parameter';
import { ACTION, WorkAllocationTaskService } from './work-allocation-task.service';

describe('WorkAllocation service', () => {
    const mockHttpService = jasmine.createSpyObj('mockHttpService', ['put', 'get', 'post']);

    it('should be Truthy', () => {
        const workAllocationService = new WorkAllocationTaskService(mockHttpService);
        expect(workAllocationService).toBeTruthy();
    });

    it('getTask', () => {
        const workAllocationService = new WorkAllocationTaskService(mockHttpService);
        workAllocationService.getTask('123456');
        expect(mockHttpService.get).toHaveBeenCalledWith('/workallocation/task/123456');
    });

    it('getActionUrl', () => {
        const workAllocationService = new WorkAllocationTaskService(mockHttpService);
        const url = workAllocationService.getActionUrl('123456', ACTION.ASSIGN);
        expect(url).toEqual('/workallocation/task/123456/assign');
    });

    it('assign Task', () => {
        const workAllocationService = new WorkAllocationTaskService(mockHttpService);
        const assignee = {id: 'id1', userName: 'userName'};
        workAllocationService.assignTask('123456', assignee);
        expect(mockHttpService.post).toHaveBeenCalledWith('/workallocation/task/123456/assign', assignee);
    });

    it('complete Task', () => {
        const workAllocationService = new WorkAllocationTaskService(mockHttpService);
        workAllocationService.completeTask('123456');
        expect(mockHttpService.post).toHaveBeenCalledWith('/workallocation/task/123456/complete', {});
    });

    it('cancel Task', () => {
        const workAllocationService = new WorkAllocationTaskService(mockHttpService);
        workAllocationService.cancelTask('123456');
        expect(mockHttpService.post).toHaveBeenCalledWith('/workallocation/task/123456/cancel', {});
    });

    it('claim Task', () => {
        const workAllocationService = new WorkAllocationTaskService(mockHttpService);
        workAllocationService.claimTask('123456');
        expect(mockHttpService.post).toHaveBeenCalledWith('/workallocation/task/123456/claim', {});
    });

    it('unclaim Task', () => {
        const workAllocationService = new WorkAllocationTaskService(mockHttpService);
        workAllocationService.unclaimTask('123456');
        expect(mockHttpService.post).toHaveBeenCalledWith('/workallocation/task/123456/unclaim', {});
    });

    it('post Task', () => {
        const workAllocationService = new WorkAllocationTaskService(mockHttpService);
        const searchParam = {} as TaskSearchParameters;
        workAllocationService.postTask(searchParam);
        expect(mockHttpService.post).toHaveBeenCalledWith('/workallocation/task/', searchParam);
    });
});
