import { PipeTransform } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { CaseField } from '../../../domain';
export declare class ReadFieldsFilterPipe implements PipeTransform {
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
    private static evaluateConditionalShow;
    /**
     * Filter out fields having no data to display and harmonise field values coming parent's value.
     *
     * @param complexField A complex field, containing other fields we want to extract
     * @param keepEmpty Whether or not we should filter out empty fields.
     * @param index The index within an array.
     * @param setupHidden Whether or not we should evaluate the show/hide conditions on the fields.
     * @param formGroup The top-level FormGroup that contains the data for show/hide evaluation.
     * @param path The current path to this field.
     * @returns CaseField[]
     */
    transform(complexField: CaseField, keepEmpty?: boolean, index?: number, setupHidden?: boolean, formGroup?: FormGroup, path?: string): CaseField[];
}
