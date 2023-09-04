import { ActivatedRoute, Router } from '@angular/router';
import { Task } from '../../../domain/work-allocation/Task';
import { SessionStorageService } from '../../../services';
export interface EventStartStateMachineContext {
    tasks: Task[];
    caseId: string;
    eventId: string;
    taskId: string;
    router: Router;
    route: ActivatedRoute;
    sessionStorageService: SessionStorageService;
}
//# sourceMappingURL=event-start-state-machine-context.model.d.ts.map