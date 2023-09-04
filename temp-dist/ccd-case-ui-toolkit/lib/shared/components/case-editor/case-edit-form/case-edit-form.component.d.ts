import { AfterViewInit, EventEmitter, OnDestroy } from '@angular/core';
import { UntypedFormGroup } from '@angular/forms';
import { Subject, Subscription } from 'rxjs';
import { CaseField } from '../../../domain/definition/case-field.model';
import { FormValueService } from '../../../services/form/form-value.service';
import * as i0 from "@angular/core";
export declare class CaseEditFormComponent implements OnDestroy, AfterViewInit {
    private readonly formValueService;
    fields: CaseField[];
    formGroup: UntypedFormGroup;
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
    static ɵfac: i0.ɵɵFactoryDeclaration<CaseEditFormComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<CaseEditFormComponent, "ccd-case-edit-form", never, { "fields": "fields"; "formGroup": "formGroup"; "caseFields": "caseFields"; "pageChangeSubject": "pageChangeSubject"; }, { "valuesChanged": "valuesChanged"; }, never, never, false, never>;
}
//# sourceMappingURL=case-edit-form.component.d.ts.map