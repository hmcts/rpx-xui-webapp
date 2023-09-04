import { ComponentPortal } from '@angular/cdk/portal';
import { EventEmitter, InjectionToken, OnChanges, SimpleChanges } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { StateMachine } from '@edium/fsm';
import { AlertService } from '../../../services/alert/alert.service';
import { SessionStorageService } from '../../../services/session/session-storage.service';
import { EventCompletionParams } from '../domain/event-completion-params.model';
import { EventCompletionComponentEmitter, EventCompletionStateMachineContext } from '../domain/event-completion-state-machine-context.model';
import { EventCompletionStateMachineService } from '../services/event-completion-state-machine.service';
import { WorkAllocationService } from '../services/work-allocation.service';
import * as i0 from "@angular/core";
export declare const COMPONENT_PORTAL_INJECTION_TOKEN: InjectionToken<CaseEventCompletionComponent>;
export declare class CaseEventCompletionComponent implements OnChanges, EventCompletionComponentEmitter {
    private readonly service;
    private readonly router;
    private readonly route;
    private readonly sessionStorageService;
    private readonly workAllocationService;
    private readonly alertService;
    eventCompletionParams: EventCompletionParams;
    eventCanBeCompleted: EventEmitter<boolean>;
    stateMachine: StateMachine;
    context: EventCompletionStateMachineContext;
    selectedComponentPortal: ComponentPortal<any>;
    constructor(service: EventCompletionStateMachineService, router: Router, route: ActivatedRoute, sessionStorageService: SessionStorageService, workAllocationService: WorkAllocationService, alertService: AlertService);
    ngOnChanges(changes?: SimpleChanges): void;
    showPortal(portalType: number): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<CaseEventCompletionComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<CaseEventCompletionComponent, "ccd-case-event-completion", never, { "eventCompletionParams": "eventCompletionParams"; }, { "eventCanBeCompleted": "eventCanBeCompleted"; }, never, never, false, never>;
}
//# sourceMappingURL=case-event-completion.component.d.ts.map