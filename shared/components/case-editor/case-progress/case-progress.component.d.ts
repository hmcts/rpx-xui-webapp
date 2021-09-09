import { EventEmitter, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { CaseEventData, CaseEventTrigger, CaseView } from '../../../domain';
import { AlertService } from '../../../services';
import { CasesService, EventTriggerService } from '../services';
export declare class CaseProgressComponent implements OnInit {
    private casesService;
    private alertService;
    private eventTriggerService;
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
}
