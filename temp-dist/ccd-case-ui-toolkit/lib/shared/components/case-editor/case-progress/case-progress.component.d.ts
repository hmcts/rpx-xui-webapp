import { EventEmitter, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { CaseEventData } from '../../../domain/case-event-data.model';
import { CaseEventTrigger } from '../../../domain/case-view/case-event-trigger.model';
import { CaseView } from '../../../domain/case-view/case-view.model';
import { AlertService } from '../../../services/alert/alert.service';
import { CasesService } from '../services/cases.service';
import { EventTriggerService } from '../services/event-trigger.service';
import * as i0 from "@angular/core";
export declare class CaseProgressComponent implements OnInit {
    private readonly casesService;
    private readonly alertService;
    private readonly eventTriggerService;
    case: string;
    event: string;
    cancelled: EventEmitter<any>;
    submitted: EventEmitter<any>;
    caseDetails: CaseView;
    eventTrigger: CaseEventTrigger;
    constructor(casesService: CasesService, alertService: AlertService, eventTriggerService: EventTriggerService);
    ngOnInit(): void;
    submit(): (sanitizedEditForm: CaseEventData) => Observable<object>;
    validate(): (sanitizedEditForm: CaseEventData, pageId: string) => Observable<object>;
    emitCancelled(event: any): void;
    emitSubmitted(event: any): void;
    isDataLoaded(): boolean;
    static ɵfac: i0.ɵɵFactoryDeclaration<CaseProgressComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<CaseProgressComponent, "ccd-case-progress", never, { "case": "case"; "event": "event"; }, { "cancelled": "cancelled"; "submitted": "submitted"; }, never, never, false, never>;
}
//# sourceMappingURL=case-progress.component.d.ts.map