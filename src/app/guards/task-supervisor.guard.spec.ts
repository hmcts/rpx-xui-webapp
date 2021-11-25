import { TaskSupervisorGuard } from './task-supervisor.guard';

describe('Allow Accept Terms guard', () => {
    let guard: TaskSupervisorGuard;
    let service: any;
    let router: any;

    beforeEach(() => {
        service = jasmine.createSpyObj('SessionStorageService', ['getItem']);
        router = jasmine.createSpyObj('router', ['navigateByUrl']);
        guard = new TaskSupervisorGuard(service, router);
    });

    it('is Truthy', () => {
        expect(guard).toBeTruthy();
    });

    it('calls acceptGuard returns true', () => {
        const user = {roles: ['task-supervisor']};
        service.getItem.and.returnValue(JSON.stringify(user));
        const result = guard.canActivate();
        expect(router.navigateByUrl).not.toHaveBeenCalled();
        expect(result).toBeTruthy();
    });

    it('calls acceptGuard returns true', () => {
        const user = {roles: ['Some role']};
        service.getItem.and.returnValue(JSON.stringify(user));
        const result = guard.canActivate();
        expect(router.navigateByUrl).toHaveBeenCalled();
        expect(result).toBeFalsy();
    });
});
