import { EventEmitter, AfterViewInit, OnDestroy } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Subject, Subscription } from 'rxjs';
import { CaseField } from '../../../domain/definition/case-field.model';
import { FormValueService } from '../../../services/form/form-value.service';
export declare class CaseEditFormComponent implements OnDestroy, AfterViewInit {
    private formValueService;
    fields: CaseField[];
    formGroup: FormGroup;
    caseFields: CaseField[];
    pageChangeSubject: Subject<boolean>;
    valuesChanged: EventEmitter<any>;
    initial: any;
    pageChangeSubscription: Subscription;
    formGroupChangeSubscription: Subscription;
    constructor(formValueService: FormValueService);
    ngOnDestroy(): void;
    ngAfterViewInit(): void;
    subscribeToFormChanges(): void;
    retrieveInitialFormValues(): void;
    detectChangesAndEmit(changes: any): void;
}
