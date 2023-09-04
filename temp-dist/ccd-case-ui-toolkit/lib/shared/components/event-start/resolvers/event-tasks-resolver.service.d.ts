import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { Task } from '../../../domain/work-allocation/Task';
import { SessionStorageService } from '../../../services/session/session-storage.service';
import { WorkAllocationService } from '../../case-editor/services/work-allocation.service';
import * as i0 from "@angular/core";
export declare class EventTasksResolverService implements Resolve<Task[]> {
    private readonly service;
    private readonly sessionStorageService;
    constructor(service: WorkAllocationService, sessionStorageService: SessionStorageService);
    resolve(route: ActivatedRouteSnapshot): Observable<Task[]>;
    static ɵfac: i0.ɵɵFactoryDeclaration<EventTasksResolverService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<EventTasksResolverService>;
}
//# sourceMappingURL=event-tasks-resolver.service.d.ts.map