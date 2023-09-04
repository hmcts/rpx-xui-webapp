import { AfterViewInit, OnDestroy, OnInit } from '@angular/core';
import { UntypedFormGroup } from '@angular/forms';
import { CaseField } from '../../domain/definition/case-field.model';
import { FieldsUtils } from '../../services/fields/fields.utils';
import * as i0 from "@angular/core";
export declare class ConditionalShowFormDirective implements OnInit, AfterViewInit, OnDestroy {
    private readonly fieldsUtils;
    caseFields: CaseField[];
    contextFields: CaseField[];
    formGroup: UntypedFormGroup;
    private allFieldValues;
    private formChangesSubscription;
    constructor(fieldsUtils: FieldsUtils);
    ngOnInit(): void;
    /**
     * Moved the evaluation of show/hide conditions and subscription
     * to form changes until after the form has been fully created.
     *
     * Prior to this change, I traced more than 5,100,000 firings of
     * the evaluateCondition INSIDE the show_condition check on page
     * load for an event with a lot of content. After this change,
     * that number dropped to fewer than 2,500 - that's a.
     */
    ngAfterViewInit(): void;
    ngOnDestroy(): void;
    private subscribeToFormChanges;
    private evaluateControl;
    private evaluateCondition;
    private readonly handleFormControl;
    private readonly handleFormArray;
    private readonly handleFormGroup;
    private evalAllShowHideConditions;
    private buildPath;
    private getCurrentPagesReadOnlyAndFormFieldValues;
    private getFormFieldsValuesIncludingDisabled;
    private unsubscribeFromFormChanges;
    static ɵfac: i0.ɵɵFactoryDeclaration<ConditionalShowFormDirective, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<ConditionalShowFormDirective, "[ccdConditionalShowForm]", never, { "caseFields": "caseFields"; "contextFields": "contextFields"; "formGroup": "formGroup"; }, {}, never, never, false, never>;
}
//# sourceMappingURL=conditional-show-form.directive.d.ts.map