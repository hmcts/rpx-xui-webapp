import { PipeTransform } from '@angular/core';
import { CaseField } from '../../domain/definition/case-field.model';
import * as i0 from "@angular/core";
export declare class FieldsFilterPipe implements PipeTransform {
    private static readonly EMPTY_VALUES;
    private static readonly NESTED_TYPES;
    /**
     * Complex type should have at least on simple field descendant with a value.
     */
    private static isValidComplex;
    private static isEmpty;
    private static isCompound;
    private static isValidCompound;
    private static keepField;
    private static getValue;
    /**
     * Filter out fields having no data to display and harmonise field values coming parent's value.
     */
    transform(complexField: CaseField, keepEmpty?: boolean, index?: number, stripHidden?: boolean): CaseField[];
    static ɵfac: i0.ɵɵFactoryDeclaration<FieldsFilterPipe, never>;
    static ɵpipe: i0.ɵɵPipeDeclaration<FieldsFilterPipe, "ccdFieldsFilter", false>;
}
//# sourceMappingURL=fields-filter.pipe.d.ts.map