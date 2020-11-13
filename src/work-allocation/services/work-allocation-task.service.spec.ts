import { TaskSearchParameters } from 'api/workAllocation/interfaces/taskSearchParameter';
import { ACTION, WorkAllocationTaskService } from './work-allocation-task.service';

describe('WorkAllocation service', () => {
    const mockHttpService = jasmine.createSpyObj('mockHttpService', ['put', 'get', 'post']);

    it('should be Truthy', () => {
        const workAllocationService = new WorkAllocationTaskService(mockHttpService);
        expect(workAllocationService).toBeTruthy();
    });

    it('getActionUrl', () => {
        const userService = new WorkAllocationTaskService(mockHttpService);
        const url = userService.getActionUrl('123456', ACTION.ASSIGN);
        expect(url).toEqual('/workallocation/task/123456/assign');
    });

    it('assign Task', () => {
        const userService = new WorkAllocationTaskService(mockHttpService);
        const assignee = {id: 'id1', userName: 'userName'};
        userService.assignTask('123456', assignee);
        expect(mockHttpService.post).toHaveBeenCalledWith('/workallocation/task/123456/assign', assignee);
    });

    it('complete Task', () => {
        const userService = new WorkAllocationTaskService(mockHttpService);
        userService.completeTask('123456');
        expect(mockHttpService.post).toHaveBeenCalledWith('/workallocation/task/123456/complete', {});
    });

    it('cancel Task', () => {
        const userService = new WorkAllocationTaskService(mockHttpService);
        userService.cancelTask('123456');
        expect(mockHttpService.post).toHaveBeenCalledWith('/workallocation/task/123456/cancel', {});
    });

    it('claim Task', () => {
        const userService = new WorkAllocationTaskService(mockHttpService);
        userService.claimTask('123456');
        expect(mockHttpService.post).toHaveBeenCalledWith('/workallocation/task/123456/claim', {});
    });

    it('unclaim Task', () => {
        const userService = new WorkAllocationTaskService(mockHttpService);
        userService.unclaimTask('123456');
        expect(mockHttpService.post).toHaveBeenCalledWith('/workallocation/task/123456/unclaim', {});
    });

    it('post Task', () => {
        const userService = new WorkAllocationTaskService(mockHttpService);
        const searchParam = {} as TaskSearchParameters;
        userService.postTask(searchParam);
        expect(mockHttpService.post).toHaveBeenCalledWith('/workallocation/task/', searchParam);
    });
});
