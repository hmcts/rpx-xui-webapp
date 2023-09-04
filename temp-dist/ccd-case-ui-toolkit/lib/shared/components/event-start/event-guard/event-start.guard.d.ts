import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { TaskPayload } from '../../../domain/work-allocation/TaskPayload';
import { SessionStorageService } from '../../../services';
import { WorkAllocationService } from '../../case-editor';
import * as i0 from "@angular/core";
export declare class EventStartGuard implements CanActivate {
    private readonly workAllocationService;
    private readonly router;
    private readonly sessionStorageService;
    constructor(workAllocationService: WorkAllocationService, router: Router, sessionStorageService: SessionStorageService);
    canActivate(route: ActivatedRouteSnapshot): Observable<boolean>;
    checkTaskInEventNotRequired(payload: TaskPayload, caseId: string, taskId: string): boolean;
    private checkForTasks;
    static ɵfac: i0.ɵɵFactoryDeclaration<EventStartGuard, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<EventStartGuard>;
}
//# sourceMappingURL=event-start.guard.d.ts.map