import { EventEmitter, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { CaseEventData } from '../../../domain/case-event-data.model';
import { CaseEventTrigger } from '../../../domain/case-view/case-event-trigger.model';
import { Draft } from '../../../domain/draft.model';
import { AlertService } from '../../../services/alert/alert.service';
import { DraftService } from '../../../services/draft/draft.service';
import { CasesService } from '../services/cases.service';
import { EventTriggerService } from '../services/event-trigger.service';
import * as i0 from "@angular/core";
export declare class CaseCreateComponent implements OnInit {
    private readonly casesService;
    private readonly alertService;
    private readonly draftService;
    private readonly eventTriggerService;
    jurisdiction: string;
    caseType: string;
    event: string;
    cancelled: EventEmitter<any>;
    submitted: EventEmitter<any>;
    eventTrigger: CaseEventTrigger;
    constructor(casesService: CasesService, alertService: AlertService, draftService: DraftService, eventTriggerService: EventTriggerService);
    ngOnInit(): void;
    submit(): (sanitizedEditForm: CaseEventData) => Observable<object>;
    validate(): (sanitizedEditForm: CaseEventData, pageId: string) => Observable<object>;
    saveDraft(): (caseEventData: CaseEventData) => Observable<Draft>;
    emitCancelled(event: any): void;
    emitSubmitted(event: any): void;
    isDataLoaded(): boolean;
    static ɵfac: i0.ɵɵFactoryDeclaration<CaseCreateComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<CaseCreateComponent, "ccd-case-create", never, { "jurisdiction": "jurisdiction"; "caseType": "caseType"; "event": "event"; }, { "cancelled": "cancelled"; "submitted": "submitted"; }, never, never, false, never>;
}
//# sourceMappingURL=case-create.component.d.ts.map