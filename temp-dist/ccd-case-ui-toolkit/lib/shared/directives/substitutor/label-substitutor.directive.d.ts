import { OnDestroy, OnInit } from '@angular/core';
import { UntypedFormGroup } from '@angular/forms';
import { CaseField } from '../../domain/definition/case-field.model';
import { FieldsUtils } from '../../services/fields/fields.utils';
import { PlaceholderService } from './services/placeholder.service';
import * as i0 from "@angular/core";
export declare class LabelSubstitutorDirective implements OnInit, OnDestroy {
    private readonly fieldsUtils;
    private readonly placeholderService;
    caseField: CaseField;
    contextFields: CaseField[];
    formGroup: UntypedFormGroup;
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
    static ɵfac: i0.ɵɵFactoryDeclaration<LabelSubstitutorDirective, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<LabelSubstitutorDirective, "[ccdLabelSubstitutor]", never, { "caseField": "caseField"; "contextFields": "contextFields"; "formGroup": "formGroup"; "elementsToSubstitute": "elementsToSubstitute"; }, {}, never, never, false, never>;
}
//# sourceMappingURL=label-substitutor.directive.d.ts.map