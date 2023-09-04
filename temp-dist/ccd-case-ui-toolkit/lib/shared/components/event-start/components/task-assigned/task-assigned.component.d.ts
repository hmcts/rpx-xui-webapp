import { OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Task } from '../../../../domain/work-allocation/Task';
import { CaseworkerService } from '../../../case-editor/services/case-worker.service';
import { JudicialworkerService } from '../../../case-editor/services/judicial-worker.service';
import * as i0 from "@angular/core";
export declare class TaskAssignedComponent implements OnInit, OnDestroy {
    private readonly route;
    private readonly judicialworkerService;
    private readonly caseworkerService;
    task: Task;
    caseId: string;
    assignedUserName: string;
    caseworkerSubscription: Subscription;
    judicialworkerSubscription: Subscription;
    constructor(route: ActivatedRoute, judicialworkerService: JudicialworkerService, caseworkerService: CaseworkerService);
    ngOnInit(): void;
    ngOnDestroy(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<TaskAssignedComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<TaskAssignedComponent, "app-task-assigned", never, {}, {}, never, never, false, never>;
}
//# sourceMappingURL=task-assigned.component.d.ts.map