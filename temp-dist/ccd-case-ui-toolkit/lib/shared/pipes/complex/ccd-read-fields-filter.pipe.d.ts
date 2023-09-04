import { PipeTransform } from '@angular/core';
import { AbstractControl, UntypedFormGroup } from '@angular/forms';
import { CaseField } from '../../domain/definition/case-field.model';
import * as i0 from "@angular/core";
export declare class ReadFieldsFilterPipe implements PipeTransform {
    private static readonly EMPTY_VALUES;
    private static readonly ALWAYS_NULL_FIELDS;
    private static readonly NESTED_TYPES;
    /**
     * Complex type should have at least on simple field descendant with a value.
     */
    private static isValidComplex;
    private static isValidCollection;
    private static isEmpty;
    private static isCompound;
    private static isValidCompound;
    private static keepField;
    private static getValue;
    private static evaluateConditionalShow;
    /**
     * Filter out fields having no data to display and harmonise field values coming parent's value.
     */
    transform(complexField: CaseField, keepEmpty?: boolean, index?: number, setupHidden?: boolean, formGroup?: UntypedFormGroup | AbstractControl, path?: string): CaseField[];
    static ɵfac: i0.ɵɵFactoryDeclaration<ReadFieldsFilterPipe, never>;
    static ɵpipe: i0.ɵɵPipeDeclaration<ReadFieldsFilterPipe, "ccdReadFieldsFilter", false>;
}
//# sourceMappingURL=ccd-read-fields-filter.pipe.d.ts.map