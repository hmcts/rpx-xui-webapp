import { OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { AlertService } from '../../../../../services/alert/alert.service';
import { SessionStorageService } from '../../../../../services/session/session-storage.service';
import { CaseworkerService } from '../../../services/case-worker.service';
import { JudicialworkerService } from '../../../services/judicial-worker.service';
import { WorkAllocationService } from '../../../services/work-allocation.service';
import { CaseEventCompletionComponent } from '../../case-event-completion.component';
import * as i0 from "@angular/core";
export declare class CaseEventCompletionTaskReassignedComponent implements OnInit, OnDestroy {
    private readonly parentComponent;
    private readonly route;
    private readonly workAllocationService;
    private readonly sessionStorageService;
    private readonly judicialworkerService;
    private readonly caseworkerService;
    private readonly alertService;
    caseId: string;
    assignedUserId: string;
    assignedUserName: string;
    subscription: Subscription;
    caseworkerSubscription: Subscription;
    judicialworkerSubscription: Subscription;
    constructor(parentComponent: CaseEventCompletionComponent, route: ActivatedRoute, workAllocationService: WorkAllocationService, sessionStorageService: SessionStorageService, judicialworkerService: JudicialworkerService, caseworkerService: CaseworkerService, alertService: AlertService);
    ngOnInit(): void;
    ngOnDestroy(): void;
    onContinue(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<CaseEventCompletionTaskReassignedComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<CaseEventCompletionTaskReassignedComponent, "app-case-event-completion-task-reassigned", never, {}, {}, never, never, false, never>;
}
//# sourceMappingURL=case-event-completion-task-reassigned.component.d.ts.map