import { OnDestroy, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { CaseField } from '../../domain/definition/case-field.model';
import { FieldsUtils } from '../../services/fields/fields.utils';
import { PlaceholderService } from './services';
export declare class LabelSubstitutorDirective implements OnInit, OnDestroy {
    private readonly fieldsUtils;
    private readonly placeholderService;
    caseField: CaseField;
    contextFields: CaseField[];
    formGroup: FormGroup;
    elementsToSubstitute: string[];
    private initialLabel;
    private initialHintText;
    constructor(fieldsUtils: FieldsUtils, placeholderService: PlaceholderService);
    ngOnInit(): void;
    ngOnDestroy(): void;
    private shouldSubstitute;
    private getReadOnlyAndFormFields;
    private removeDuplicates;
    private getFormFieldsValuesIncludingDisabled;
    private resolvePlaceholders;
}
