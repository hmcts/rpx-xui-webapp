import { EventEmitter, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { CaseEventData, CaseEventTrigger, Draft } from '../../../domain';
import { AlertService, DraftService } from '../../../services';
import { CasesService, EventTriggerService } from '../services';
export declare class CaseCreateComponent implements OnInit {
    private casesService;
    private alertService;
    private draftService;
    private eventTriggerService;
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
}
