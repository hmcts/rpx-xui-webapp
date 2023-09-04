import { OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { StateMachine } from '@edium/fsm';
import { SessionStorageService } from '../../services/session/session-storage.service';
import { EventStartStateMachineContext } from './models/event-start-state-machine-context.model';
import { EventStartStateMachineService } from './services/event-start-state-machine.service';
import * as i0 from "@angular/core";
export declare class EventStartComponent implements OnInit {
    private service;
    private readonly router;
    private readonly route;
    private readonly sessionStorageService;
    stateMachine: StateMachine;
    context: EventStartStateMachineContext;
    constructor(service: EventStartStateMachineService, router: Router, route: ActivatedRoute, sessionStorageService: SessionStorageService);
    ngOnInit(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<EventStartComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<EventStartComponent, "ccd-event-start", never, {}, {}, never, never, false, never>;
}
//# sourceMappingURL=event-start.component.d.ts.map