import { PipeTransform } from '@angular/core';
import { CaseField } from '../../../domain/definition/case-field.model';
export declare class FieldsFilterPipe implements PipeTransform {
    private static readonly EMPTY_VALUES;
    private static readonly NESTED_TYPES;
    /**
     * Complex type should have at least on simple field descendant with a value.
     *
     * @param field
     * @param values
     * @returns {boolean}
     */
    private static isValidComplex;
    private static isEmpty;
    private static isCompound;
    private static isValidCompound;
    private static keepField;
    private static getValue;
    /**
     * Filter out fields having no data to display and harmonise field values coming parent's value.
     *
     * @param complexField
     * @param keepEmpty
     * @param index
     * @param stripHidden
     * @returns {any}
     */
    transform(complexField: CaseField, keepEmpty?: boolean, index?: number, stripHidden?: boolean): CaseField[];
}
