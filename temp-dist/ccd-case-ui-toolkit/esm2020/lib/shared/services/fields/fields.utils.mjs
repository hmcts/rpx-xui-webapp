import { CurrencyPipe } from '@angular/common';
import { Injectable } from '@angular/core';
import { FormArray, FormControl, UntypedFormGroup } from '@angular/forms';
import { plainToClassFromExist } from 'class-transformer';
import { CaseFlagStatus } from '../../components/palette/case-flag/enums/case-flag-status.enum';
import { DatePipe } from '../../components/palette/utils';
import { CaseField } from '../../domain';
import { FormatTranslatorService } from '../case-fields/format-translator.service';
import * as i0 from "@angular/core";
// @dynamic
export class FieldsUtils {
    static convertToCaseField(obj) {
        if (!(obj instanceof CaseField)) {
            return plainToClassFromExist(new CaseField(), obj);
        }
        return obj;
    }
    static toValuesMap(caseFields) {
        const valueMap = {};
        caseFields.forEach(field => {
            valueMap[field.id] = FieldsUtils.prepareValue(field);
        });
        return valueMap;
    }
    // public static getType(elem: any): string {
    //   return Object.prototype.toString.call(elem).slice(8, -1);
    // }
    static isObject(elem) {
        return typeof elem === 'object' && elem !== null;
    }
    static isNonEmptyObject(elem) {
        return this.isObject(elem) && Object.keys(elem).length !== 0;
    }
    static isArray(elem) {
        return Array.isArray(elem);
    }
    static areCollectionValuesSimpleFields(fieldValue) {
        return !this.isObject(fieldValue[0]['value']) && !Array.isArray(fieldValue[0]['value']) && fieldValue[0]['value'] !== undefined;
    }
    static isCollectionOfSimpleTypes(fieldValue) {
        return this.isCollection(fieldValue) && this.areCollectionValuesSimpleFields(fieldValue);
    }
    static isMultiSelectValue(form) {
        return this.isNonEmptyArray(form) && !this.isCollectionWithValue(form);
    }
    static isNonEmptyArray(pageFormFields) {
        return Array.isArray(pageFormFields) && pageFormFields[0] !== undefined;
    }
    static isCollection(pageFormFields) {
        return this.isNonEmptyArray(pageFormFields) && this.isCollectionWithValue(pageFormFields);
    }
    static isCollectionWithValue(pageFormFields) {
        return pageFormFields[0]['value'] !== undefined;
    }
    static cloneObject(obj) {
        return Object.assign({}, obj);
    }
    // temporary function until this can be moved to CaseView class (RDM-2681)
    static getCaseFields(caseView) {
        const caseDataFields = caseView.tabs.reduce((acc, tab) => {
            return acc.concat(tab.fields);
        }, []);
        const metadataFields = caseView.metadataFields;
        return metadataFields.concat(caseDataFields.filter((caseField) => {
            return metadataFields.findIndex(metadataField => metadataField.id === caseField.id) < 0;
        }));
    }
    static addCaseFieldAndComponentReferences(c, cf, comp) {
        c['caseField'] = cf;
        c['component'] = comp;
    }
    /**
     * Recursive check of an array or object and its descendants for the presence of any non-empty values.
     *
     * @param object The array or object to check
     * @returns `true` if the array or object (or a descendant) contains at least one non-empty value; `false` otherwise
     */
    static containsNonEmptyValues(object) {
        if (!object) {
            return false;
        }
        const values = Object.keys(object).map(key => object[key]);
        const objectRefs = [];
        // Also test for numeric values, and length > 0 for non-numeric values because this covers both strings and arrays.
        // Note: Deliberate use of non-equality (!=) operator for null check, to handle both null and undefined values.
        // tslint:disable-next-line: triple-equals
        const hasNonNullPrimitive = values.some(x => (x != null &&
            ((typeof x === 'object' && x.constructor === Object) || Array.isArray(x)
                ? !objectRefs.push(x)
                : typeof x === 'number' || x.length > 0)));
        return !hasNonNullPrimitive ? objectRefs.some(y => this.containsNonEmptyValues(y)) : hasNonNullPrimitive;
    }
    /**
     * handleNestedDynamicLists()
     * Reassigns list_item and value data to DynamicList children
     * down the tree. Server response returns data only in
     * the `value` object of parent complex type
     *
     * EUI-2530 Dynamic Lists for Elements in a Complex Type
     *
     * @param jsonBody - { case_fields: [ CaseField, CaseField ] }
     */
    static handleNestedDynamicLists(jsonBody) {
        if (jsonBody.case_fields) {
            jsonBody.case_fields.forEach(caseField => {
                if (caseField.field_type) {
                    this.setDynamicListDefinition(caseField, caseField.field_type, caseField);
                }
            });
        }
        return jsonBody;
    }
    static prepareValue(field) {
        if (field.value) {
            return field.value;
        }
        else if (field.isComplex()) {
            const valueMap = {};
            field.field_type.complex_fields.forEach(complexField => {
                valueMap[complexField.id] = FieldsUtils.prepareValue(complexField);
            });
            return valueMap;
        }
    }
    /**
     * Formats a `MoneyGBP` value to include currency units.
     * @param fieldValue The CurrencyPipe expects an `any` parameter so this must also be `any`,
     * but it should be "number-like" (e.g., '1234')
     * @returns A formatted string (e.g., £12.34)
     */
    static getMoneyGBP(fieldValue) {
        return fieldValue ? FieldsUtils.currencyPipe.transform(fieldValue / 100, 'GBP', 'symbol') : fieldValue;
    }
    static getLabel(fieldValue) {
        return fieldValue ? fieldValue.label : '';
    }
    static getDate(fieldValue) {
        try {
            // Format specified here wasn't previously working and lots of tests depend on it not working
            // Now that formats work correctly many test would break - and this could affect services which may depend on
            // the orginal behaviour of returning dates in "d MMM yyyy"
            // Note - replaced 'd' with 'D' as datepipe using moment to avoid timezone discrepancies
            return FieldsUtils.datePipe.transform(fieldValue, null, 'D MMM yyyy');
        }
        catch (e) {
            return this.textForInvalidField('Date', fieldValue);
        }
    }
    static getFixedListLabelByCodeOrEmpty(field, code) {
        const relevantItem = code ? field.field_type.fixed_list_items.find(item => item.code === code) : null;
        return relevantItem ? relevantItem.label : '';
    }
    static textForInvalidField(type, invalidValue) {
        return `{ Invalid ${type}: ${invalidValue} }`;
    }
    static setDynamicListDefinition(caseField, caseFieldType, rootCaseField) {
        if (caseFieldType.type === FieldsUtils.SERVER_RESPONSE_FIELD_TYPE_COMPLEX) {
            caseFieldType.complex_fields.forEach(field => {
                try {
                    const isDynamicField = FieldsUtils.SERVER_RESPONSE_FIELD_TYPE_DYNAMIC_LIST_TYPE.indexOf(field.field_type.type) !== -1;
                    if (isDynamicField) {
                        const dynamicListValue = this.getDynamicListValue(rootCaseField.value, field.id);
                        if (dynamicListValue) {
                            const list_items = dynamicListValue[0].list_items;
                            const complexValue = dynamicListValue.map(data => data.value);
                            const value = {
                                list_items,
                                value: complexValue.length > 0 ? complexValue : undefined
                            };
                            field.value = {
                                ...value
                            };
                            field.formatted_value = {
                                ...field.formatted_value,
                                ...value
                            };
                        }
                    }
                    else {
                        this.setDynamicListDefinition(field, field.field_type, rootCaseField);
                    }
                }
                catch (error) {
                    console.log(error);
                }
            });
        }
        else if (caseFieldType.type === FieldsUtils.SERVER_RESPONSE_FIELD_TYPE_COLLECTION) {
            if (caseFieldType.collection_field_type) {
                this.setDynamicListDefinition(caseField, caseFieldType.collection_field_type, rootCaseField);
            }
        }
    }
    static getDynamicListValue(jsonBlock, key) {
        const data = jsonBlock ? this.getNestedFieldValues(jsonBlock, key, []) : [];
        return data.length > 0 ? data : null;
    }
    static getNestedFieldValues(jsonData, key, output = []) {
        if (jsonData && jsonData[key]) {
            output.push(jsonData[key]);
        }
        else {
            for (const elementKey in jsonData) {
                if (typeof jsonData === 'object' && jsonData.hasOwnProperty(elementKey)) {
                    this.getNestedFieldValues(jsonData[elementKey], key, output);
                }
            }
        }
        return output;
    }
    static isFlagsCaseField(caseField) {
        if (!caseField) {
            return false;
        }
        return this.isFlagsFieldType(caseField.field_type);
    }
    /**
     * @deprecated Use {@link isCaseFieldOfType} instead, passing 'FlagLauncher' as the single type in the `types` array
     */
    static isFlagLauncherCaseField(caseField) {
        if (!caseField) {
            return false;
        }
        return caseField.field_type.type === 'FlagLauncher';
    }
    /**
     * @deprecated Use {@link isCaseFieldOfType} instead, passing 'ComponentLauncher' as the single type in the `types`
     * array
     */
    static isComponentLauncherCaseField(caseField) {
        if (!caseField) {
            return false;
        }
        return caseField.field_type.type === 'ComponentLauncher';
    }
    /**
     * Checks if a {@link CaseField} is of one of the given field types.
     *
     * @param caseField The `CaseField` to check
     * @param types An array of one or more field types
     * @returns `true` if the `CaseField` type is one of those in the array of types to check against; `false`
     * otherwise or if `caseField` or `types` are falsy
     */
    static isCaseFieldOfType(caseField, types) {
        if (!caseField || !types) {
            return false;
        }
        return types.some(type => type === caseField.field_type.type || type === caseField.field_type.id);
    }
    static isLinkedCasesCaseField(caseField) {
        return FieldsUtils.isComponentLauncherCaseField(caseField) &&
            caseField.id === 'LinkedCasesComponentLauncher';
    }
    static containsLinkedCasesCaseField(caseFields) {
        return caseFields?.some(caseField => FieldsUtils.isLinkedCasesCaseField(caseField));
    }
    static isFlagsFieldType(fieldType) {
        if (!fieldType) {
            return false;
        }
        // Note: This implementation supports the dummy field type ID of "CaseFlag" for testing and the real field type
        // ID of "Flags"
        return (fieldType.type === 'Complex' && (fieldType.id === 'CaseFlag' || fieldType.id === 'Flags'));
    }
    /**
     * Extract flags data from a `CaseField` instance, recursing and iterating through sub-fields of a Complex field or
     * each field in a Collection field.
     *
     * @param flags An array for accumulating extracted flags data and derived `UntypedFormGroup` paths
     * @param caseField A `CaseField` instance from which to extract the flags data
     * @param pathToFlagsFormGroup A (dot-delimited) string for concatenating the name of each control that forms the path
     * to the `UntypedFormGroup` for the `Flags` instance
     * @param topLevelCaseField The top-level `CaseField` that contains the value property. This is required because _only
     * top-level_ `CaseField`s contain actual values and a reference needs to be maintained to such a field
     * @param currentValue The current value object of a `CaseField` that is a sub-field of a non root-level Complex field.
     * Required for mapping the `CaseField` value to a `Flags` object if it is a "Flags" `CaseField`. (For Complex types,
     * only the _root-level_ `CaseField` contains a value property - all sub-fields, including any nested Complex fields,
     * do *not* contain any values themselves.)
     * @returns An array of `FlagsWithFormGroupPath`, each instance comprising a `Flags` object derived from a `CaseField`
     * of type "Flags", and the dot-delimited path string to the corresponding `UntypedFormGroup`
     */
    static extractFlagsDataFromCaseField(flags, caseField, pathToFlagsFormGroup, topLevelCaseField, currentValue) {
        const fieldType = caseField.field_type;
        switch (fieldType.type) {
            case 'Complex':
                // If the field is a Flags CaseField (these are implemented as Complex types), it can be mapped to a Flags
                // object immediately
                if (FieldsUtils.isFlagsCaseField(caseField)) {
                    // If the Flags CaseField has a value, it is a root-level Complex field; if it does not, it is a Flags
                    // CaseField that is a sub-field within another Complex field, so use the currentValue value (if any)
                    // instead. The exception to this is the "caseFlags" Flags CaseField, which will have an empty object value
                    // initially, because no party name is required
                    if (caseField.value && FieldsUtils.isNonEmptyObject(caseField.value) ||
                        caseField.id === this.caseLevelCaseFlagsFieldId) {
                        flags.push(this.mapCaseFieldToFlagsWithFormGroupPathObject(caseField, pathToFlagsFormGroup));
                    }
                    else if (currentValue && FieldsUtils.isNonEmptyObject(currentValue)) {
                        pathToFlagsFormGroup += `.${caseField.id}`;
                        flags.push(this.mapValueToFlagsWithFormGroupPathObject(caseField.id, currentValue, pathToFlagsFormGroup, topLevelCaseField));
                    }
                }
                else if (fieldType.complex_fields) {
                    const value = caseField.value ? caseField.value : currentValue;
                    if (value && FieldsUtils.isNonEmptyObject(value)) {
                        flags = fieldType.complex_fields.reduce((flagsOfComplexField, subField) => {
                            return this.extractFlagsDataFromCaseField(flagsOfComplexField, subField, pathToFlagsFormGroup, topLevelCaseField, value[subField.id]);
                        }, flags);
                    }
                }
                break;
            // For a Collection field, the values are stored directly as key-value pairs in the CaseField's value property
            // as an array, unless the collection is a sub-field of a Complex type - sub-fields never contain values
            case 'Collection':
                // If this is a collection of Flags CaseFields, these can be mapped to Flags objects immediately
                if (FieldsUtils.isFlagsFieldType(fieldType.collection_field_type)) {
                    // If the Collection CaseField has a value (an array), it is a root-level Collection field; if it does not,
                    // it is a Collection CaseField that is a sub-field within a Complex field, so use the currentValue value
                    // (if any) instead
                    const pathFragment = pathToFlagsFormGroup += '.index.value';
                    if (caseField.value) {
                        caseField.value.forEach((item, index) => {
                            // At each iteration, replace the "index" placeholder with the actual index
                            pathToFlagsFormGroup = pathFragment.replace('index', index.toString(10));
                            flags.push(this.mapValueToFlagsWithFormGroupPathObject(item.id, item.value, pathToFlagsFormGroup, caseField));
                        });
                    }
                    else if (currentValue) {
                        currentValue.forEach((item, index) => {
                            pathToFlagsFormGroup = pathFragment.replace('index', index.toString(10));
                            flags.push(this.mapValueToFlagsWithFormGroupPathObject(item.id, item.value, pathToFlagsFormGroup, topLevelCaseField));
                        });
                    }
                }
                else if (fieldType.collection_field_type.type === 'Complex' && fieldType.collection_field_type.complex_fields) {
                    if (caseField.value) {
                        // Perform a reduction over each Complex field's sub-fields (similar to what is done above for non-Flags
                        // Complex fields)
                        // (Cannot just call this function recursively for each Complex field in the collection because the CaseField
                        // for each one is not part of the collection)
                        const pathFragment = pathToFlagsFormGroup += '.index.value';
                        caseField.value.forEach((item, index) => {
                            // At each iteration, replace the "index" placeholder with the actual index
                            pathToFlagsFormGroup = pathFragment.replace('index', index.toString(10));
                            flags = fieldType.collection_field_type.complex_fields.reduce((flagsOfComplexField, subField) => {
                                return this.extractFlagsDataFromCaseField(flagsOfComplexField, subField, pathToFlagsFormGroup, topLevelCaseField, item.value[subField.id]);
                            }, flags);
                        });
                    }
                }
                break;
            default:
            // Ignore all other field types
        }
        return flags;
    }
    static mapCaseFieldToFlagsWithFormGroupPathObject(caseField, pathToFlagsFormGroup) {
        return this.mapValueToFlagsWithFormGroupPathObject(caseField.id, caseField.value, pathToFlagsFormGroup, caseField);
    }
    static mapValueToFlagsWithFormGroupPathObject(id, value, pathToFlagsFormGroup, caseField) {
        return {
            flags: {
                flagsCaseFieldId: id,
                partyName: value ? value['partyName'] : null,
                roleOnCase: value ? value['roleOnCase'] : null,
                details: value && value['details'] && value['details'].length > 0
                    ? value['details'].map(detail => {
                        return Object.assign({}, ...Object.keys(detail.value).map(k => {
                            // The id property set below will be null for a new case flag, and a unique id returned from CCD when
                            // updating an existing flag
                            switch (k) {
                                // These two fields are date-time fields
                                case 'dateTimeModified':
                                case 'dateTimeCreated':
                                    return { [k]: detail.value[k] ? new Date(detail.value[k]) : null, id: detail.id };
                                // This field is a "yes/no" field
                                case 'hearingRelevant':
                                    return detail.value[k].toUpperCase() === 'YES' ? { [k]: true, id: detail.id } : { [k]: false, id: detail.id };
                                default:
                                    return { [k]: detail.value[k], id: detail.id };
                            }
                        }));
                    })
                    : null
            },
            pathToFlagsFormGroup,
            caseField
        };
    }
    /**
     * Count active flags in a `CaseField` instance, recursing and iterating through sub-fields of a Complex field or each
     * field in a Collection field.
     *
     * @param activeCount An accumulation of the total number of active flags
     * @param caseField A `CaseField` instance for which to count the active flags
     * @param currentValue The current value object of a `CaseField` that is a sub-field of a non root-level Complex field.
     * (For Complex types, only the _root-level_ `CaseField` contains a value property - all sub-fields, including any
     * nested Complex fields, do *not* contain any values themselves.)
     * @returns The count of active flags
     */
    static countActiveFlagsInCaseField(activeCount, caseField, currentValue) {
        const fieldType = caseField.field_type;
        switch (fieldType.type) {
            case 'Complex':
                if (FieldsUtils.isFlagsCaseField(caseField)) {
                    // If the Flags CaseField has a value, it is a root-level Complex field; if it does not, it is a Flags
                    // CaseField that is a sub-field within another Complex field, so use the currentValue value (if any) instead
                    const value = caseField.value ? caseField.value : currentValue;
                    if (value && FieldsUtils.isNonEmptyObject(value) && value.details) {
                        activeCount = value.details.reduce((count, detail) => detail.value.status === CaseFlagStatus.ACTIVE ? count + 1 : count, activeCount);
                    }
                }
                else if (fieldType.complex_fields) {
                    const value = caseField.value ? caseField.value : currentValue;
                    if (value && FieldsUtils.isNonEmptyObject(value)) {
                        activeCount = fieldType.complex_fields.reduce((activeFlagsCountOfComplexField, subField) => {
                            return this.countActiveFlagsInCaseField(activeFlagsCountOfComplexField, subField, value[subField.id]);
                        }, activeCount);
                    }
                }
                break;
            // For a Collection field, the values are stored directly as key-value pairs in the CaseField's value property
            // as an array, unless the collection is a sub-field of a Complex type - sub-fields never contain values
            case 'Collection':
                if (FieldsUtils.isFlagsFieldType(fieldType.collection_field_type)) {
                    // If the Collection CaseField has a value (an array), it is a root-level Collection field; if it does not,
                    // it is a Collection CaseField that is a sub-field within a Complex field, so use the currentValue value
                    // (if any) instead
                    const value = caseField.value ? caseField.value : currentValue;
                    if (value) {
                        value.forEach((item) => {
                            if (item.value['details']) {
                                activeCount = item.value['details'].reduce((count, detail) => detail.value.status === CaseFlagStatus.ACTIVE ? count + 1 : count, activeCount);
                            }
                        });
                    }
                }
                else if (fieldType.collection_field_type.type === 'Complex' && fieldType.collection_field_type.complex_fields) {
                    if (caseField.value) {
                        // Perform a reduction over each Complex field's sub-fields (similar to what is done above for non-Flags
                        // Complex fields)
                        // (Cannot just call this function recursively for each Complex field in the collection because the CaseField
                        // for each one is not part of the collection)
                        caseField.value.forEach((item) => {
                            activeCount = fieldType.collection_field_type.complex_fields.reduce((activeFlagsCountOfComplexField, subField) => {
                                return this.countActiveFlagsInCaseField(activeFlagsCountOfComplexField, subField, item.value[subField.id]);
                            }, activeCount);
                        });
                    }
                }
                break;
            default:
            // Ignore all other field types
        }
        return activeCount;
    }
    buildCanShowPredicate(eventTrigger, form) {
        const currentState = this.getCurrentEventState(eventTrigger, form);
        return (page) => {
            return page.parsedShowCondition.match(currentState);
        };
    }
    getCurrentEventState(eventTrigger, form) {
        return this.mergeCaseFieldsAndFormFields(eventTrigger.case_fields, form.controls['data'].value);
    }
    cloneCaseField(obj) {
        return Object.assign(new CaseField(), obj);
    }
    mergeCaseFieldsAndFormFields(caseFields, formFields) {
        return this.mergeFields(caseFields, formFields, FieldsUtils.DEFAULT_MERGE_FUNCTION);
    }
    mergeLabelCaseFieldsAndFormFields(caseFields, formFields) {
        return this.mergeFields(caseFields, formFields, FieldsUtils.LABEL_MERGE_FUNCTION);
    }
    controlIterator(aControl, formArrayFn, formGroupFn, controlFn) {
        if (aControl instanceof FormArray) { // We're in a collection
            formArrayFn(aControl);
        }
        else if (aControl instanceof UntypedFormGroup) { // We're in a complex type.
            formGroupFn(aControl);
        }
        else if (aControl instanceof FormControl) { // FormControl
            controlFn(aControl);
        }
    }
    mergeFields(caseFields, formFields, mergeFunction) {
        const result = FieldsUtils.cloneObject(formFields);
        caseFields.forEach(field => {
            mergeFunction(field, result);
            if (field.field_type && field.field_type.complex_fields && field.field_type.complex_fields.length > 0) {
                result[field.id] = this.mergeFields(field.field_type.complex_fields, result[field.id], mergeFunction);
            }
        });
        return result;
    }
}
FieldsUtils.caseLevelCaseFlagsFieldId = 'caseFlags';
FieldsUtils.currencyPipe = new CurrencyPipe('en-GB');
FieldsUtils.datePipe = new DatePipe(new FormatTranslatorService());
// EUI-4244. 3 dashes instead of 1 to make this less likely to clash with a real field.
FieldsUtils.LABEL_SUFFIX = '---LABEL';
// Handling of Dynamic Lists in Complex Types
FieldsUtils.SERVER_RESPONSE_FIELD_TYPE_COLLECTION = 'Collection';
FieldsUtils.SERVER_RESPONSE_FIELD_TYPE_COMPLEX = 'Complex';
FieldsUtils.SERVER_RESPONSE_FIELD_TYPE_DYNAMIC_LIST_TYPE = ['DynamicList', 'DynamicRadioList'];
FieldsUtils.DEFAULT_MERGE_FUNCTION = function mergeFunction(field, result) {
    if (!result.hasOwnProperty(field.id)) {
        result[field.id] = field.value;
    }
};
FieldsUtils.LABEL_MERGE_FUNCTION = function mergeFunction(field, result) {
    if (!result) {
        result = {};
    }
    if (!result.hasOwnProperty(field.id)) {
        result[field.id] = field.value;
    }
    // tslint:disable-next-line: switch-default
    switch (field.field_type.type) {
        case 'FixedList':
        case 'FixedRadioList': {
            result[field.id] = FieldsUtils.getFixedListLabelByCodeOrEmpty(field, result[field.id] || field.value);
            break;
        }
        case 'MultiSelectList': {
            const fieldValue = result[field.id] || [];
            result[field.id + FieldsUtils.LABEL_SUFFIX] = [];
            fieldValue.forEach((code, idx) => {
                result[field.id + FieldsUtils.LABEL_SUFFIX][idx] = FieldsUtils.getFixedListLabelByCodeOrEmpty(field, code);
            });
            break;
        }
        case 'Label': {
            result[field.id] = FieldsUtils.getLabel(field);
            break;
        }
        case 'MoneyGBP': {
            const fieldValue = (result[field.id] || field.value);
            result[field.id] = FieldsUtils.getMoneyGBP(fieldValue);
            break;
        }
        case 'Date': {
            const fieldValue = (result[field.id] || field.value);
            result[field.id] = FieldsUtils.getDate(fieldValue);
            break;
        }
        case 'Complex': {
            if (result[field.id] && field.field_type.complex_fields) {
                field.field_type.complex_fields.forEach((f) => {
                    if (['Collection', 'Complex', 'MultiSelectList'].indexOf(f.field_type.type) > -1) {
                        FieldsUtils.LABEL_MERGE_FUNCTION(f, result[field.id]);
                    }
                });
            }
            break;
        }
        case 'Collection': {
            const elements = (result[field.id] || field.value);
            if (elements) {
                elements.forEach((elem) => {
                    // tslint:disable-next-line:switch-default
                    switch (field.field_type.collection_field_type.type) {
                        case 'MoneyGBP': {
                            elem.value = FieldsUtils.getMoneyGBP(elem.value);
                            break;
                        }
                        case 'Date': {
                            elem.value = FieldsUtils.getDate(elem.value);
                            break;
                        }
                        case 'Complex': {
                            if (field.field_type.collection_field_type.complex_fields) {
                                field.field_type.collection_field_type.complex_fields.forEach((f) => {
                                    if (['Collection', 'Complex', 'MultiSelectList'].indexOf(f.field_type.type) > -1) {
                                        FieldsUtils.LABEL_MERGE_FUNCTION(f, elem.value);
                                    }
                                });
                            }
                            break;
                        }
                    }
                });
            }
            break;
        }
    }
};
FieldsUtils.ɵfac = function FieldsUtils_Factory(t) { return new (t || FieldsUtils)(); };
FieldsUtils.ɵprov = /*@__PURE__*/ i0.ɵɵdefineInjectable({ token: FieldsUtils, factory: FieldsUtils.ɵfac });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(FieldsUtils, [{
        type: Injectable
    }], null, null); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmllbGRzLnV0aWxzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvY2NkLWNhc2UtdWktdG9vbGtpdC9zcmMvbGliL3NoYXJlZC9zZXJ2aWNlcy9maWVsZHMvZmllbGRzLnV0aWxzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMvQyxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzNDLE9BQU8sRUFBbUIsU0FBUyxFQUFFLFdBQVcsRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQzNGLE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBSTFELE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSxnRUFBZ0UsQ0FBQztBQUNoRyxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sZ0NBQWdDLENBQUM7QUFDMUQsT0FBTyxFQUFvQixTQUFTLEVBQXlFLE1BQU0sY0FBYyxDQUFDO0FBQ2xJLE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxNQUFNLDBDQUEwQyxDQUFDOztBQUVuRixXQUFXO0FBRVgsTUFBTSxPQUFPLFdBQVc7SUFXZixNQUFNLENBQUMsa0JBQWtCLENBQUMsR0FBUTtRQUN2QyxJQUFJLENBQUMsQ0FBQyxHQUFHLFlBQVksU0FBUyxDQUFDLEVBQUU7WUFDL0IsT0FBTyxxQkFBcUIsQ0FBQyxJQUFJLFNBQVMsRUFBRSxFQUFFLEdBQUcsQ0FBQyxDQUFDO1NBQ3BEO1FBQ0QsT0FBTyxHQUFHLENBQUM7SUFDYixDQUFDO0lBRU0sTUFBTSxDQUFDLFdBQVcsQ0FBQyxVQUF1QjtRQUMvQyxNQUFNLFFBQVEsR0FBRyxFQUFFLENBQUM7UUFDcEIsVUFBVSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsRUFBRTtZQUN6QixRQUFRLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxH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QkFDMUMsUUFBUSxLQUFLLENBQUMsVUFBVSxDQUFDLHFCQUFxQixDQUFDLElBQUksRUFBRTt3QkFDbkQsS0FBSyxVQUFVLENBQUMsQ0FBQzs0QkFDZixJQUFJLENBQUMsS0FBSyxHQUFHLFdBQVcsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDOzRCQUNqRCxNQUFNO3lCQUNQO3dCQUNELEtBQUssTUFBTSxDQUFDLENBQUM7NEJBQ1gsSUFBSSxDQUFDLEtBQUssR0FBRyxXQUFXLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQzs0QkFDN0MsTUFBTTt5QkFDUDt3QkFDRCxLQUFLLFNBQVMsQ0FBQyxDQUFDOzRCQUNkLElBQUksS0FBSyxDQUFDLFVBQVUsQ0FBQyxxQkFBcUIsQ0FBQyxjQUFjLEVBQUU7Z0NBQ3pELEtBQUssQ0FBQyxVQUFVLENBQUMscUJBQXFCLENBQUMsY0FBYyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQVksRUFBRSxFQUFFO29DQUM3RSxJQUFJLENBQUMsWUFBWSxFQUFFLFNBQVMsRUFBRSxpQkFBaUIsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFO3dDQUNoRixXQUFXLENBQUMsb0JBQW9CLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztxQ0FDakQ7Z0NBQ0gsQ0FBQyxDQUFDLENBQUM7NkJBQ0o7NEJBQ0QsTUFBTTt5QkFDUDtxQkFDRjtnQkFDSCxDQUFDLENBQUMsQ0FBQzthQUNKO1lBQ0QsTUFBTTtTQUNQO0tBQ0Y7QUFDSCxDQUFDLENBQUM7c0VBbk9TLFdBQVc7aUVBQVgsV0FBVyxXQUFYLFdBQVc7dUZBQVgsV0FBVztjQUR2QixVQUFVIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ3VycmVuY3lQaXBlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEFic3RyYWN0Q29udHJvbCwgRm9ybUFycmF5LCBGb3JtQ29udHJvbCwgVW50eXBlZEZvcm1Hcm91cCB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7IHBsYWluVG9DbGFzc0Zyb21FeGlzdCB9IGZyb20gJ2NsYXNzLXRyYW5zZm9ybWVyJztcbmltcG9ydCB7IFdpemFyZFBhZ2UgfSBmcm9tICcuLi8uLi9jb21wb25lbnRzL2Nhc2UtZWRpdG9yL2RvbWFpbic7XG5pbXBvcnQgeyBBYnN0cmFjdEZvcm1GaWVsZENvbXBvbmVudCB9IGZyb20gJy4uLy4uL2NvbXBvbmVudHMvcGFsZXR0ZS9iYXNlLWZpZWxkL2Fic3RyYWN0LWZvcm0tZmllbGQuY29tcG9uZW50JztcbmltcG9ydCB7IEZsYWdEZXRhaWwsIEZsYWdzV2l0aEZvcm1Hcm91cFBhdGggfSBmcm9tICcuLi8uLi9jb21wb25lbnRzL3BhbGV0dGUvY2FzZS1mbGFnL2RvbWFpbi9jYXNlLWZsYWcubW9kZWwnO1xuaW1wb3J0IHsgQ2FzZUZsYWdTdGF0dXMgfSBmcm9tICcuLi8uLi9jb21wb25lbnRzL3BhbGV0dGUvY2FzZS1mbGFnL2VudW1zL2Nhc2UtZmxhZy1zdGF0dXMuZW51bSc7XG5pbXBvcnQgeyBEYXRlUGlwZSB9IGZyb20gJy4uLy4uL2NvbXBvbmVudHMvcGFsZXR0ZS91dGlscyc7XG5pbXBvcnQgeyBDYXNlRXZlbnRUcmlnZ2VyLCBDYXNlRmllbGQsIENhc2VUYWIsIENhc2VWaWV3LCBGaWVsZFR5cGUsIEZpZWxkVHlwZUVudW0sIEZpeGVkTGlzdEl0ZW0sIFByZWRpY2F0ZSB9IGZyb20gJy4uLy4uL2RvbWFpbic7XG5pbXBvcnQgeyBGb3JtYXRUcmFuc2xhdG9yU2VydmljZSB9IGZyb20gJy4uL2Nhc2UtZmllbGRzL2Zvcm1hdC10cmFuc2xhdG9yLnNlcnZpY2UnO1xuXG4vLyBAZHluYW1pY1xuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIEZpZWxkc1V0aWxzIHtcbiAgcHJpdmF0ZSBzdGF0aWMgcmVhZG9ubHkgY2FzZUxldmVsQ2FzZUZsYWdzRmllbGRJZCA9ICdjYXNlRmxhZ3MnO1xuICBwcml2YXRlIHN0YXRpYyByZWFkb25seSBjdXJyZW5jeVBpcGU6IEN1cnJlbmN5UGlwZSA9IG5ldyBDdXJyZW5jeVBpcGUoJ2VuLUdCJyk7XG4gIHByaXZhdGUgc3RhdGljIHJlYWRvbmx5IGRhdGVQaXBlOiBEYXRlUGlwZSA9IG5ldyBEYXRlUGlwZShuZXcgRm9ybWF0VHJhbnNsYXRvclNlcnZpY2UoKSk7XG4gIC8vIEVVSS00MjQ0LiAzIGRhc2hlcyBpbnN0ZWFkIG9mIDEgdG8gbWFrZSB0aGlzIGxlc3MgbGlrZWx5IHRvIGNsYXNoIHdpdGggYSByZWFsIGZpZWxkLlxuICBwdWJsaWMgc3RhdGljIHJlYWRvbmx5IExBQkVMX1NVRkZJWCA9ICctLS1MQUJFTCc7XG4gIC8vIEhhbmRsaW5nIG9mIER5bmFtaWMgTGlzdHMgaW4gQ29tcGxleCBUeXBlc1xuICBwdWJsaWMgc3RhdGljIHJlYWRvbmx5IFNFUlZFUl9SRVNQT05TRV9GSUVMRF9UWVBFX0NPTExFQ1RJT04gPSAnQ29sbGVjdGlvbic7XG4gIHB1YmxpYyBzdGF0aWMgcmVhZG9ubHkgU0VSVkVSX1JFU1BPTlNFX0ZJRUxEX1RZUEVfQ09NUExFWCA9ICdDb21wbGV4JztcbiAgcHVibGljIHN0YXRpYyByZWFkb25seSBTRVJWRVJfUkVTUE9OU0VfRklFTERfVFlQRV9EWU5BTUlDX0xJU1RfVFlQRTogRmllbGRUeXBlRW51bVtdID0gWydEeW5hbWljTGlzdCcsICdEeW5hbWljUmFkaW9MaXN0J107XG5cbiAgcHVibGljIHN0YXRpYyBjb252ZXJ0VG9DYXNlRmllbGQob2JqOiBhbnkpOiBDYXNlRmllbGQge1xuICAgIGlmICghKG9iaiBpbnN0YW5jZW9mIENhc2VGaWVsZCkpIHtcbiAgICAgIHJldHVybiBwbGFpblRvQ2xhc3NGcm9tRXhpc3QobmV3IENhc2VGaWVsZCgpLCBvYmopO1xuICAgIH1cbiAgICByZXR1cm4gb2JqO1xuICB9XG5cbiAgcHVibGljIHN0YXRpYyB0b1ZhbHVlc01hcChjYXNlRmllbGRzOiBDYXNlRmllbGRbXSk6IGFueSB7XG4gICAgY29uc3QgdmFsdWVNYXAgPSB7fTtcbiAgICBjYXNlRmllbGRzLmZvckVhY2goZmllbGQgPT4ge1xuICAgICAgdmFsdWVNYXBbZmllbGQuaWRdID0gRmllbGRzVXRpbHMucHJlcGFyZVZhbHVlKGZpZWxkKTtcbiAgICB9KTtcbiAgICByZXR1cm4gdmFsdWVNYXA7XG4gIH1cblxuICAvLyBwdWJsaWMgc3RhdGljIGdldFR5cGUoZWxlbTogYW55KTogc3RyaW5nIHtcbiAgLy8gICByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKGVsZW0pLnNsaWNlKDgsIC0xKTtcbiAgLy8gfVxuXG4gIHB1YmxpYyBzdGF0aWMgaXNPYmplY3QoZWxlbTogYW55KTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHR5cGVvZiBlbGVtID09PSAnb2JqZWN0JyAmJiBlbGVtICE9PSBudWxsO1xuICB9XG5cbiAgcHVibGljIHN0YXRpYyBpc05vbkVtcHR5T2JqZWN0KGVsZW06IGFueSk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLmlzT2JqZWN0KGVsZW0pICYmIE9iamVjdC5rZXlzKGVsZW0pLmxlbmd0aCAhPT0gMDtcbiAgfVxuXG4gIHB1YmxpYyBzdGF0aWMgaXNBcnJheShlbGVtOiBhbnkpOiBib29sZWFuIHtcbiAgICByZXR1cm4gQXJyYXkuaXNBcnJheShlbGVtKTtcbiAgfVxuXG4gIHB1YmxpYyBzdGF0aWMgYXJlQ29sbGVjdGlvblZhbHVlc1NpbXBsZUZpZWxkcyhmaWVsZFZhbHVlOiBhbnlbXSk6IGJvb2xlYW4ge1xuICAgIHJldHVybiAhdGhpcy5pc09iamVjdChmaWVsZFZhbHVlWzBdWyd2YWx1ZSddKSAmJiAhQXJyYXkuaXNBcnJheShmaWVsZFZhbHVlWzBdWyd2YWx1ZSddKSAmJiBmaWVsZFZhbHVlWzBdWyd2YWx1ZSddICE9PSB1bmRlZmluZWQ7XG4gIH1cblxuICBwdWJsaWMgc3RhdGljIGlzQ29sbGVjdGlvbk9mU2ltcGxlVHlwZXMoZmllbGRWYWx1ZTogYW55KTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuaXNDb2xsZWN0aW9uKGZpZWxkVmFsdWUpICYmIHRoaXMuYXJlQ29sbGVjdGlvblZhbHVlc1NpbXBsZUZpZWxkcyhmaWVsZFZhbHVlKTtcbiAgfVxuXG4gIHB1YmxpYyBzdGF0aWMgaXNNdWx0aVNlbGVjdFZhbHVlKGZvcm06IGFueSk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLmlzTm9uRW1wdHlBcnJheShmb3JtKSAmJiAhdGhpcy5pc0NvbGxlY3Rpb25XaXRoVmFsdWUoZm9ybSk7XG4gIH1cblxuICBwdWJsaWMgc3RhdGljIGlzTm9uRW1wdHlBcnJheShwYWdlRm9ybUZpZWxkczogYW55KTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIEFycmF5LmlzQXJyYXkocGFnZUZvcm1GaWVsZHMpICYmIHBhZ2VGb3JtRmllbGRzWzBdICE9PSB1bmRlZmluZWQ7XG4gIH1cblxuICBwdWJsaWMgc3RhdGljIGlzQ29sbGVjdGlvbihwYWdlRm9ybUZpZWxkczogYW55KTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuaXNOb25FbXB0eUFycmF5KHBhZ2VGb3JtRmllbGRzKSAmJiB0aGlzLmlzQ29sbGVjdGlvbldpdGhWYWx1ZShwYWdlRm9ybUZpZWxkcyk7XG4gIH1cblxuICBwdWJsaWMgc3RhdGljIGlzQ29sbGVjdGlvbldpdGhWYWx1ZShwYWdlRm9ybUZpZWxkczogYW55W10pOiBib29sZWFuIHtcbiAgICByZXR1cm4gcGFnZUZvcm1GaWVsZHNbMF1bJ3ZhbHVlJ10gIT09IHVuZGVmaW5lZDtcbiAgfVxuXG4gIHB1YmxpYyBzdGF0aWMgY2xvbmVPYmplY3Qob2JqOiBhbnkpOiBhbnkge1xuICAgIHJldHVybiBPYmplY3QuYXNzaWduKHt9LCBvYmopO1xuICB9XG5cbiAgLy8gdGVtcG9yYXJ5IGZ1bmN0aW9uIHVudGlsIHRoaXMgY2FuIGJlIG1vdmVkIHRvIENhc2VWaWV3IGNsYXNzIChSRE0tMjY4MSlcbiAgcHVibGljIHN0YXRpYyBnZXRDYXNlRmllbGRzKGNhc2VWaWV3OiBDYXNlVmlldyk6IENhc2VGaWVsZFtdIHtcbiAgICBjb25zdCBjYXNlRGF0YUZpZWxkczogQ2FzZUZpZWxkW10gPSBjYXNlVmlldy50YWJzLnJlZHVjZSgoYWNjOiBDYXNlRmllbGRbXSwgdGFiOiBDYXNlVGFiKSA9PiB7XG4gICAgICByZXR1cm4gYWNjLmNvbmNhdCh0YWIuZmllbGRzKTtcbiAgICB9LCBbXSk7XG5cbiAgICBjb25zdCBtZXRhZGF0YUZpZWxkczogQ2FzZUZpZWxkW10gPSBjYXNlVmlldy5tZXRhZGF0YUZpZWxkcztcbiAgICByZXR1cm4gbWV0YWRhdGFGaWVsZHMuY29uY2F0KGNhc2VEYXRhRmllbGRzLmZpbHRlcigoY2FzZUZpZWxkOiBDYXNlRmllbGQpID0+IHtcbiAgICAgIHJldHVybiBtZXRhZGF0YUZpZWxkcy5maW5kSW5kZXgobWV0YWRhdGFGaWVsZCA9PiBtZXRhZGF0YUZpZWxkLmlkID09PSBjYXNlRmllbGQuaWQpIDwgMDtcbiAgICB9KSk7XG4gIH1cblxuICBwdWJsaWMgc3RhdGljIGFkZENhc2VGaWVsZEFuZENvbXBvbmVudFJlZmVyZW5jZXMoYzogQWJzdHJhY3RDb250cm9sLCBjZjogQ2FzZUZpZWxkLCBjb21wOiBBYnN0cmFjdEZvcm1GaWVsZENvbXBvbmVudCk6IHZvaWQge1xuICAgIGNbJ2Nhc2VGaWVsZCddID0gY2Y7XG4gICAgY1snY29tcG9uZW50J10gPSBjb21wO1xuICB9XG5cbiAgLyoqXG4gICAqIFJlY3Vyc2l2ZSBjaGVjayBvZiBhbiBhcnJheSBvciBvYmplY3QgYW5kIGl0cyBkZXNjZW5kYW50cyBmb3IgdGhlIHByZXNlbmNlIG9mIGFueSBub24tZW1wdHkgdmFsdWVzLlxuICAgKlxuICAgKiBAcGFyYW0gb2JqZWN0IFRoZSBhcnJheSBvciBvYmplY3QgdG8gY2hlY2tcbiAgICogQHJldHVybnMgYHRydWVgIGlmIHRoZSBhcnJheSBvciBvYmplY3QgKG9yIGEgZGVzY2VuZGFudCkgY29udGFpbnMgYXQgbGVhc3Qgb25lIG5vbi1lbXB0eSB2YWx1ZTsgYGZhbHNlYCBvdGhlcndpc2VcbiAgICovXG4gIHB1YmxpYyBzdGF0aWMgY29udGFpbnNOb25FbXB0eVZhbHVlcyhvYmplY3Q6IG9iamVjdCk6IGJvb2xlYW4ge1xuICAgIGlmICghb2JqZWN0KSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIGNvbnN0IHZhbHVlcyA9IE9iamVjdC5rZXlzKG9iamVjdCkubWFwKGtleSA9PiBvYmplY3Rba2V5XSk7XG4gICAgY29uc3Qgb2JqZWN0UmVmcyA9IFtdO1xuICAgIC8vIEFsc28gdGVzdCBmb3IgbnVtZXJpYyB2YWx1ZXMsIGFuZCBsZW5ndGggPiAwIGZvciBub24tbnVtZXJpYyB2YWx1ZXMgYmVjYXVzZSB0aGlzIGNvdmVycyBib3RoIHN0cmluZ3MgYW5kIGFycmF5cy5cbiAgICAvLyBOb3RlOiBEZWxpYmVyYXRlIHVzZSBvZiBub24tZXF1YWxpdHkgKCE9KSBvcGVyYXRvciBmb3IgbnVsbCBjaGVjaywgdG8gaGFuZGxlIGJvdGggbnVsbCBhbmQgdW5kZWZpbmVkIHZhbHVlcy5cbiAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6IHRyaXBsZS1lcXVhbHNcbiAgICBjb25zdCBoYXNOb25OdWxsUHJpbWl0aXZlID0gdmFsdWVzLnNvbWUoeCA9PiAoeCAhPSBudWxsICYmXG4gICAgICAoKHR5cGVvZiB4ID09PSAnb2JqZWN0JyAmJiB4LmNvbnN0cnVjdG9yID09PSBPYmplY3QpIHx8IEFycmF5LmlzQXJyYXkoeClcbiAgICAgICAgPyAhb2JqZWN0UmVmcy5wdXNoKHgpXG4gICAgICAgIDogdHlwZW9mIHggPT09ICdudW1iZXInIHx8IHgubGVuZ3RoID4gMClcbiAgICApKTtcbiAgICByZXR1cm4gIWhhc05vbk51bGxQcmltaXRpdmUgPyBvYmplY3RSZWZzLnNvbWUoeSA9PiB0aGlzLmNvbnRhaW5zTm9uRW1wdHlWYWx1ZXMoeSkpIDogaGFzTm9uTnVsbFByaW1pdGl2ZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBoYW5kbGVOZXN0ZWREeW5hbWljTGlzdHMoKVxuICAgKiBSZWFzc2lnbnMgbGlzdF9pdGVtIGFuZCB2YWx1ZSBkYXRhIHRvIER5bmFtaWNMaXN0IGNoaWxkcmVuXG4gICAqIGRvd24gdGhlIHRyZWUuIFNlcnZlciByZXNwb25zZSByZXR1cm5zIGRhdGEgb25seSBpblxuICAgKiB0aGUgYHZhbHVlYCBvYmplY3Qgb2YgcGFyZW50IGNvbXBsZXggdHlwZVxuICAgKlxuICAgKiBFVUktMjUzMCBEeW5hbWljIExpc3RzIGZvciBFbGVtZW50cyBpbiBhIENvbXBsZXggVHlwZVxuICAgKlxuICAgKiBAcGFyYW0ganNvbkJvZHkgLSB7IGNhc2VfZmllbGRzOiBbIENhc2VGaWVsZCwgQ2FzZUZpZWxkIF0gfVxuICAgKi9cbiAgcHVibGljIHN0YXRpYyBoYW5kbGVOZXN0ZWREeW5hbWljTGlzdHMoanNvbkJvZHk6IHsgY2FzZV9maWVsZHM6IENhc2VGaWVsZFtdIH0pOiBhbnkge1xuICAgIGlmIChqc29uQm9keS5jYXNlX2ZpZWxkcykge1xuICAgICAganNvbkJvZHkuY2FzZV9maWVsZHMuZm9yRWFjaChjYXNlRmllbGQgPT4ge1xuICAgICAgICBpZiAoY2FzZUZpZWxkLmZpZWxkX3R5cGUpIHtcbiAgICAgICAgICB0aGlzLnNldER5bmFtaWNMaXN0RGVmaW5pdGlvbihjYXNlRmllbGQsIGNhc2VGaWVsZC5maWVsZF90eXBlLCBjYXNlRmllbGQpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICByZXR1cm4ganNvbkJvZHk7XG4gIH1cblxuICBwcml2YXRlIHN0YXRpYyBwcmVwYXJlVmFsdWUoZmllbGQ6IENhc2VGaWVsZCk6IGFueSB7XG4gICAgaWYgKGZpZWxkLnZhbHVlKSB7XG4gICAgICByZXR1cm4gZmllbGQudmFsdWU7XG4gICAgfSBlbHNlIGlmIChmaWVsZC5pc0NvbXBsZXgoKSkge1xuICAgICAgY29uc3QgdmFsdWVNYXAgPSB7fTtcbiAgICAgIGZpZWxkLmZpZWxkX3R5cGUuY29tcGxleF9maWVsZHMuZm9yRWFjaChjb21wbGV4RmllbGQgPT4ge1xuICAgICAgICB2YWx1ZU1hcFtjb21wbGV4RmllbGQuaWRdID0gRmllbGRzVXRpbHMucHJlcGFyZVZhbHVlKGNvbXBsZXhGaWVsZCk7XG4gICAgICB9KTtcbiAgICAgIHJldHVybiB2YWx1ZU1hcDtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIHN0YXRpYyByZWFkb25seSBERUZBVUxUX01FUkdFX0ZVTkNUSU9OID0gZnVuY3Rpb24gbWVyZ2VGdW5jdGlvbihmaWVsZDogQ2FzZUZpZWxkLCByZXN1bHQ6IG9iamVjdCk6IHZvaWQge1xuICAgIGlmICghcmVzdWx0Lmhhc093blByb3BlcnR5KGZpZWxkLmlkKSkge1xuICAgICAgcmVzdWx0W2ZpZWxkLmlkXSA9IGZpZWxkLnZhbHVlO1xuICAgIH1cbiAgfTtcblxuICBwcml2YXRlIHN0YXRpYyByZWFkb25seSBMQUJFTF9NRVJHRV9GVU5DVElPTiA9IGZ1bmN0aW9uIG1lcmdlRnVuY3Rpb24oZmllbGQ6IENhc2VGaWVsZCwgcmVzdWx0OiBvYmplY3QpOiB2b2lkIHtcbiAgICBpZiAoIXJlc3VsdCkge1xuICAgICAgcmVzdWx0ID0ge307XG4gICAgfVxuICAgIGlmICghcmVzdWx0Lmhhc093blByb3BlcnR5KGZpZWxkLmlkKSkge1xuICAgICAgcmVzdWx0W2ZpZWxkLmlkXSA9IGZpZWxkLnZhbHVlO1xuICAgIH1cblxuICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTogc3dpdGNoLWRlZmF1bHRcbiAgICBzd2l0Y2ggKGZpZWxkLmZpZWxkX3R5cGUudHlwZSkge1xuICAgICAgY2FzZSAnRml4ZWRMaXN0JzpcbiAgICAgIGNhc2UgJ0ZpeGVkUmFkaW9MaXN0Jzoge1xuICAgICAgICByZXN1bHRbZmllbGQuaWRdID0gRmllbGRzVXRpbHMuZ2V0Rml4ZWRMaXN0TGFiZWxCeUNvZGVPckVtcHR5KGZpZWxkLCByZXN1bHRbZmllbGQuaWRdIHx8IGZpZWxkLnZhbHVlKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgICBjYXNlICdNdWx0aVNlbGVjdExpc3QnOiB7XG4gICAgICAgIGNvbnN0IGZpZWxkVmFsdWUgPSByZXN1bHRbZmllbGQuaWRdIHx8IFtdO1xuICAgICAgICByZXN1bHRbZmllbGQuaWQgKyBGaWVsZHNVdGlscy5MQUJFTF9TVUZGSVhdID0gW107XG4gICAgICAgIGZpZWxkVmFsdWUuZm9yRWFjaCgoY29kZTogYW55LCBpZHg6IGFueSkgPT4ge1xuICAgICAgICAgIHJlc3VsdFtmaWVsZC5pZCArIEZpZWxkc1V0aWxzLkxBQkVMX1NVRkZJWF1baWR4XSA9IEZpZWxkc1V0aWxzLmdldEZpeGVkTGlzdExhYmVsQnlDb2RlT3JFbXB0eShmaWVsZCwgY29kZSk7XG4gICAgICAgIH0pO1xuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICAgIGNhc2UgJ0xhYmVsJzoge1xuICAgICAgICByZXN1bHRbZmllbGQuaWRdID0gRmllbGRzVXRpbHMuZ2V0TGFiZWwoZmllbGQpO1xuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICAgIGNhc2UgJ01vbmV5R0JQJzoge1xuICAgICAgICBjb25zdCBmaWVsZFZhbHVlID0gKHJlc3VsdFtmaWVsZC5pZF0gfHwgZmllbGQudmFsdWUpO1xuICAgICAgICByZXN1bHRbZmllbGQuaWRdID0gRmllbGRzVXRpbHMuZ2V0TW9uZXlHQlAoZmllbGRWYWx1ZSk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgICAgY2FzZSAnRGF0ZSc6IHtcbiAgICAgICAgY29uc3QgZmllbGRWYWx1ZSA9IChyZXN1bHRbZmllbGQuaWRdIHx8IGZpZWxkLnZhbHVlKTtcbiAgICAgICAgcmVzdWx0W2ZpZWxkLmlkXSA9IEZpZWxkc1V0aWxzLmdldERhdGUoZmllbGRWYWx1ZSk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgICAgY2FzZSAnQ29tcGxleCc6IHtcbiAgICAgICAgaWYgKHJlc3VsdFtmaWVsZC5pZF0gJiYgZmllbGQuZmllbGRfdHlwZS5jb21wbGV4X2ZpZWxkcykge1xuICAgICAgICAgIGZpZWxkLmZpZWxkX3R5cGUuY29tcGxleF9maWVsZHMuZm9yRWFjaCgoZjogQ2FzZUZpZWxkKSA9PiB7XG4gICAgICAgICAgICBpZiAoWydDb2xsZWN0aW9uJywgJ0NvbXBsZXgnLCAnTXVsdGlTZWxlY3RMaXN0J10uaW5kZXhPZihmLmZpZWxkX3R5cGUudHlwZSkgPiAtMSkge1xuICAgICAgICAgICAgICBGaWVsZHNVdGlscy5MQUJFTF9NRVJHRV9GVU5DVElPTihmLCByZXN1bHRbZmllbGQuaWRdKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICAgIGNhc2UgJ0NvbGxlY3Rpb24nOiB7XG4gICAgICAgIGNvbnN0IGVsZW1lbnRzID0gKHJlc3VsdFtmaWVsZC5pZF0gfHwgZmllbGQudmFsdWUpO1xuICAgICAgICBpZiAoZWxlbWVudHMpIHtcbiAgICAgICAgICBlbGVtZW50cy5mb3JFYWNoKChlbGVtOiBhbnkpID0+IHtcbiAgICAgICAgICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpzd2l0Y2gtZGVmYXVsdFxuICAgICAgICAgICAgc3dpdGNoIChmaWVsZC5maWVsZF90eXBlLmNvbGxlY3Rpb25fZmllbGRfdHlwZS50eXBlKSB7XG4gICAgICAgICAgICAgIGNhc2UgJ01vbmV5R0JQJzoge1xuICAgICAgICAgICAgICAgIGVsZW0udmFsdWUgPSBGaWVsZHNVdGlscy5nZXRNb25leUdCUChlbGVtLnZhbHVlKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICBjYXNlICdEYXRlJzoge1xuICAgICAgICAgICAgICAgIGVsZW0udmFsdWUgPSBGaWVsZHNVdGlscy5nZXREYXRlKGVsZW0udmFsdWUpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIGNhc2UgJ0NvbXBsZXgnOiB7XG4gICAgICAgICAgICAgICAgaWYgKGZpZWxkLmZpZWxkX3R5cGUuY29sbGVjdGlvbl9maWVsZF90eXBlLmNvbXBsZXhfZmllbGRzKSB7XG4gICAgICAgICAgICAgICAgICBmaWVsZC5maWVsZF90eXBlLmNvbGxlY3Rpb25fZmllbGRfdHlwZS5jb21wbGV4X2ZpZWxkcy5mb3JFYWNoKChmOiBDYXNlRmllbGQpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKFsnQ29sbGVjdGlvbicsICdDb21wbGV4JywgJ011bHRpU2VsZWN0TGlzdCddLmluZGV4T2YoZi5maWVsZF90eXBlLnR5cGUpID4gLTEpIHtcbiAgICAgICAgICAgICAgICAgICAgICBGaWVsZHNVdGlscy5MQUJFTF9NRVJHRV9GVU5DVElPTihmLCBlbGVtLnZhbHVlKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgfVxuICB9O1xuXG4gIC8qKlxuICAgKiBGb3JtYXRzIGEgYE1vbmV5R0JQYCB2YWx1ZSB0byBpbmNsdWRlIGN1cnJlbmN5IHVuaXRzLlxuICAgKiBAcGFyYW0gZmllbGRWYWx1ZSBUaGUgQ3VycmVuY3lQaXBlIGV4cGVjdHMgYW4gYGFueWAgcGFyYW1ldGVyIHNvIHRoaXMgbXVzdCBhbHNvIGJlIGBhbnlgLFxuICAgKiBidXQgaXQgc2hvdWxkIGJlIFwibnVtYmVyLWxpa2VcIiAoZS5nLiwgJzEyMzQnKVxuICAgKiBAcmV0dXJucyBBIGZvcm1hdHRlZCBzdHJpbmcgKGUuZy4sIMKjMTIuMzQpXG4gICAqL1xuICBwcml2YXRlIHN0YXRpYyBnZXRNb25leUdCUChmaWVsZFZhbHVlOiBhbnkpOiBzdHJpbmcge1xuICAgIHJldHVybiBmaWVsZFZhbHVlID8gRmllbGRzVXRpbHMuY3VycmVuY3lQaXBlLnRyYW5zZm9ybShmaWVsZFZhbHVlIC8gMTAwLCAnR0JQJywgJ3N5bWJvbCcpIDogZmllbGRWYWx1ZTtcbiAgfVxuXG4gIHByaXZhdGUgc3RhdGljIGdldExhYmVsKGZpZWxkVmFsdWU6IENhc2VGaWVsZCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIGZpZWxkVmFsdWUgPyBmaWVsZFZhbHVlLmxhYmVsIDogJyc7XG4gIH1cblxuICBwcml2YXRlIHN0YXRpYyBnZXREYXRlKGZpZWxkVmFsdWU6IHN0cmluZyk6IHN0cmluZyB7XG4gICAgdHJ5IHtcbiAgICAgIC8vIEZvcm1hdCBzcGVjaWZpZWQgaGVyZSB3YXNuJ3QgcHJldmlvdXNseSB3b3JraW5nIGFuZCBsb3RzIG9mIHRlc3RzIGRlcGVuZCBvbiBpdCBub3Qgd29ya2luZ1xuICAgICAgLy8gTm93IHRoYXQgZm9ybWF0cyB3b3JrIGNvcnJlY3RseSBtYW55IHRlc3Qgd291bGQgYnJlYWsgLSBhbmQgdGhpcyBjb3VsZCBhZmZlY3Qgc2VydmljZXMgd2hpY2ggbWF5IGRlcGVuZCBvblxuICAgICAgLy8gdGhlIG9yZ2luYWwgYmVoYXZpb3VyIG9mIHJldHVybmluZyBkYXRlcyBpbiBcImQgTU1NIHl5eXlcIlxuICAgICAgLy8gTm90ZSAtIHJlcGxhY2VkICdkJyB3aXRoICdEJyBhcyBkYXRlcGlwZSB1c2luZyBtb21lbnQgdG8gYXZvaWQgdGltZXpvbmUgZGlzY3JlcGFuY2llc1xuICAgICAgcmV0dXJuIEZpZWxkc1V0aWxzLmRhdGVQaXBlLnRyYW5zZm9ybShmaWVsZFZhbHVlLCBudWxsLCAnRCBNTU0geXl5eScpO1xuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgIHJldHVybiB0aGlzLnRleHRGb3JJbnZhbGlkRmllbGQoJ0RhdGUnLCBmaWVsZFZhbHVlKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIHN0YXRpYyBnZXRGaXhlZExpc3RMYWJlbEJ5Q29kZU9yRW1wdHkoZmllbGQ6IENhc2VGaWVsZCwgY29kZTogc3RyaW5nKTogc3RyaW5nIHtcbiAgICBjb25zdCByZWxldmFudEl0ZW06IEZpeGVkTGlzdEl0ZW0gPSBjb2RlID8gZmllbGQuZmllbGRfdHlwZS5maXhlZF9saXN0X2l0ZW1zLmZpbmQoaXRlbSA9PiBpdGVtLmNvZGUgPT09IGNvZGUpIDogbnVsbDtcbiAgICByZXR1cm4gcmVsZXZhbnRJdGVtID8gcmVsZXZhbnRJdGVtLmxhYmVsIDogJyc7XG4gIH1cblxuICBwcml2YXRlIHN0YXRpYyB0ZXh0Rm9ySW52YWxpZEZpZWxkKHR5cGU6IHN0cmluZywgaW52YWxpZFZhbHVlOiBzdHJpbmcpOiBzdHJpbmcge1xuICAgIHJldHVybiBgeyBJbnZhbGlkICR7dHlwZX06ICR7aW52YWxpZFZhbHVlfSB9YDtcbiAgfVxuXG4gIHByaXZhdGUgc3RhdGljIHNldER5bmFtaWNMaXN0RGVmaW5pdGlvbihjYXNlRmllbGQ6IENhc2VGaWVsZCwgY2FzZUZpZWxkVHlwZTogRmllbGRUeXBlLCByb290Q2FzZUZpZWxkOiBDYXNlRmllbGQpIHtcbiAgICBpZiAoY2FzZUZpZWxkVHlwZS50eXBlID09PSBGaWVsZHNVdGlscy5TRVJWRVJfUkVTUE9OU0VfRklFTERfVFlQRV9DT01QTEVYKSB7XG5cbiAgICAgIGNhc2VGaWVsZFR5cGUuY29tcGxleF9maWVsZHMuZm9yRWFjaChmaWVsZCA9PiB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgY29uc3QgaXNEeW5hbWljRmllbGQgPSBGaWVsZHNVdGlscy5TRVJWRVJfUkVTUE9OU0VfRklFTERfVFlQRV9EWU5BTUlDX0xJU1RfVFlQRS5pbmRleE9mKGZpZWxkLmZpZWxkX3R5cGUudHlwZSkgIT09IC0xO1xuXG4gICAgICAgICAgaWYgKGlzRHluYW1pY0ZpZWxkKSB7XG4gICAgICAgICAgICBjb25zdCBkeW5hbWljTGlzdFZhbHVlID0gdGhpcy5nZXREeW5hbWljTGlzdFZhbHVlKHJvb3RDYXNlRmllbGQudmFsdWUsIGZpZWxkLmlkKTtcbiAgICAgICAgICAgIGlmIChkeW5hbWljTGlzdFZhbHVlKSB7XG4gICAgICAgICAgICAgIGNvbnN0IGxpc3RfaXRlbXMgPSBkeW5hbWljTGlzdFZhbHVlWzBdLmxpc3RfaXRlbXM7XG4gICAgICAgICAgICAgIGNvbnN0IGNvbXBsZXhWYWx1ZSA9IGR5bmFtaWNMaXN0VmFsdWUubWFwKGRhdGEgPT4gZGF0YS52YWx1ZSk7XG4gICAgICAgICAgICAgIGNvbnN0IHZhbHVlID0ge1xuICAgICAgICAgICAgICAgIGxpc3RfaXRlbXMsXG4gICAgICAgICAgICAgICAgdmFsdWU6IGNvbXBsZXhWYWx1ZS5sZW5ndGggPiAwID8gY29tcGxleFZhbHVlIDogdW5kZWZpbmVkXG4gICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgIGZpZWxkLnZhbHVlID0ge1xuICAgICAgICAgICAgICAgIC4uLnZhbHVlXG4gICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgIGZpZWxkLmZvcm1hdHRlZF92YWx1ZSA9IHtcbiAgICAgICAgICAgICAgICAuLi5maWVsZC5mb3JtYXR0ZWRfdmFsdWUsXG4gICAgICAgICAgICAgICAgLi4udmFsdWVcbiAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5zZXREeW5hbWljTGlzdERlZmluaXRpb24oZmllbGQsIGZpZWxkLmZpZWxkX3R5cGUsIHJvb3RDYXNlRmllbGQpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICBjb25zb2xlLmxvZyhlcnJvcik7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH0gZWxzZSBpZiAoY2FzZUZpZWxkVHlwZS50eXBlID09PSBGaWVsZHNVdGlscy5TRVJWRVJfUkVTUE9OU0VfRklFTERfVFlQRV9DT0xMRUNUSU9OKSB7XG4gICAgICBpZiAoY2FzZUZpZWxkVHlwZS5jb2xsZWN0aW9uX2ZpZWxkX3R5cGUpIHtcbiAgICAgICAgdGhpcy5zZXREeW5hbWljTGlzdERlZmluaXRpb24oY2FzZUZpZWxkLCBjYXNlRmllbGRUeXBlLmNvbGxlY3Rpb25fZmllbGRfdHlwZSwgcm9vdENhc2VGaWVsZCk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBzdGF0aWMgZ2V0RHluYW1pY0xpc3RWYWx1ZShqc29uQmxvY2s6IGFueSwga2V5OiBzdHJpbmcpIHtcbiAgICBjb25zdCBkYXRhID0ganNvbkJsb2NrID8gdGhpcy5nZXROZXN0ZWRGaWVsZFZhbHVlcyhqc29uQmxvY2ssIGtleSwgW10pIDogW107XG5cbiAgICByZXR1cm4gZGF0YS5sZW5ndGggPiAwID8gZGF0YSA6IG51bGw7XG4gIH1cblxuICBwcml2YXRlIHN0YXRpYyBnZXROZXN0ZWRGaWVsZFZhbHVlcyhqc29uRGF0YTogYW55LCBrZXk6IHN0cmluZywgb3V0cHV0OiBhbnlbXSA9IFtdKSB7XG4gICAgaWYgKGpzb25EYXRhICYmIGpzb25EYXRhW2tleV0pIHtcbiAgICAgIG91dHB1dC5wdXNoKGpzb25EYXRhW2tleV0pO1xuICAgIH0gZWxzZSB7XG4gICAgICBmb3IgKGNvbnN0IGVsZW1lbnRLZXkgaW4ganNvbkRhdGEpIHtcbiAgICAgICAgaWYgKHR5cGVvZiBqc29uRGF0YSA9PT0gJ29iamVjdCcgJiYganNvbkRhdGEuaGFzT3duUHJvcGVydHkoZWxlbWVudEtleSkpIHtcbiAgICAgICAgICB0aGlzLmdldE5lc3RlZEZpZWxkVmFsdWVzKGpzb25EYXRhW2VsZW1lbnRLZXldLCBrZXksIG91dHB1dCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIG91dHB1dDtcbiAgfVxuXG4gIHB1YmxpYyBzdGF0aWMgaXNGbGFnc0Nhc2VGaWVsZChjYXNlRmllbGQ6IENhc2VGaWVsZCk6IGJvb2xlYW4ge1xuICAgIGlmICghY2FzZUZpZWxkKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXMuaXNGbGFnc0ZpZWxkVHlwZShjYXNlRmllbGQuZmllbGRfdHlwZSk7XG4gIH1cblxuICAvKipcbiAgICogQGRlcHJlY2F0ZWQgVXNlIHtAbGluayBpc0Nhc2VGaWVsZE9mVHlwZX0gaW5zdGVhZCwgcGFzc2luZyAnRmxhZ0xhdW5jaGVyJyBhcyB0aGUgc2luZ2xlIHR5cGUgaW4gdGhlIGB0eXBlc2AgYXJyYXlcbiAgICovXG4gIHB1YmxpYyBzdGF0aWMgaXNGbGFnTGF1bmNoZXJDYXNlRmllbGQoY2FzZUZpZWxkOiBDYXNlRmllbGQpOiBib29sZWFuIHtcbiAgICBpZiAoIWNhc2VGaWVsZCkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIHJldHVybiBjYXNlRmllbGQuZmllbGRfdHlwZS50eXBlID09PSAnRmxhZ0xhdW5jaGVyJztcbiAgfVxuXG4gIC8qKlxuICAgKiBAZGVwcmVjYXRlZCBVc2Uge0BsaW5rIGlzQ2FzZUZpZWxkT2ZUeXBlfSBpbnN0ZWFkLCBwYXNzaW5nICdDb21wb25lbnRMYXVuY2hlcicgYXMgdGhlIHNpbmdsZSB0eXBlIGluIHRoZSBgdHlwZXNgXG4gICAqIGFycmF5XG4gICAqL1xuICBwdWJsaWMgc3RhdGljIGlzQ29tcG9uZW50TGF1bmNoZXJDYXNlRmllbGQoY2FzZUZpZWxkOiBDYXNlRmllbGQpOiBib29sZWFuIHtcbiAgICBpZiAoIWNhc2VGaWVsZCkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIHJldHVybiBjYXNlRmllbGQuZmllbGRfdHlwZS50eXBlID09PSAnQ29tcG9uZW50TGF1bmNoZXInO1xuICB9XG5cbiAgLyoqXG4gICAqIENoZWNrcyBpZiBhIHtAbGluayBDYXNlRmllbGR9IGlzIG9mIG9uZSBvZiB0aGUgZ2l2ZW4gZmllbGQgdHlwZXMuXG4gICAqXG4gICAqIEBwYXJhbSBjYXNlRmllbGQgVGhlIGBDYXNlRmllbGRgIHRvIGNoZWNrXG4gICAqIEBwYXJhbSB0eXBlcyBBbiBhcnJheSBvZiBvbmUgb3IgbW9yZSBmaWVsZCB0eXBlc1xuICAgKiBAcmV0dXJucyBgdHJ1ZWAgaWYgdGhlIGBDYXNlRmllbGRgIHR5cGUgaXMgb25lIG9mIHRob3NlIGluIHRoZSBhcnJheSBvZiB0eXBlcyB0byBjaGVjayBhZ2FpbnN0OyBgZmFsc2VgXG4gICAqIG90aGVyd2lzZSBvciBpZiBgY2FzZUZpZWxkYCBvciBgdHlwZXNgIGFyZSBmYWxzeVxuICAgKi9cbiAgcHVibGljIHN0YXRpYyBpc0Nhc2VGaWVsZE9mVHlwZShjYXNlRmllbGQ6IENhc2VGaWVsZCwgdHlwZXM6IEZpZWxkVHlwZUVudW1bXSk6IGJvb2xlYW4ge1xuICAgIGlmICghY2FzZUZpZWxkIHx8ICF0eXBlcykge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIHJldHVybiB0eXBlcy5zb21lKHR5cGUgPT4gdHlwZSA9PT0gY2FzZUZpZWxkLmZpZWxkX3R5cGUudHlwZSB8fCB0eXBlID09PSBjYXNlRmllbGQuZmllbGRfdHlwZS5pZCk7XG4gIH1cblxuICBwdWJsaWMgc3RhdGljIGlzTGlua2VkQ2FzZXNDYXNlRmllbGQoY2FzZUZpZWxkOiBDYXNlRmllbGQpOiBib29sZWFuIHtcbiAgICByZXR1cm4gRmllbGRzVXRpbHMuaXNDb21wb25lbnRMYXVuY2hlckNhc2VGaWVsZChjYXNlRmllbGQpICYmXG4gICAgICBjYXNlRmllbGQuaWQgPT09ICdMaW5rZWRDYXNlc0NvbXBvbmVudExhdW5jaGVyJztcbiAgfVxuXG4gIHB1YmxpYyBzdGF0aWMgY29udGFpbnNMaW5rZWRDYXNlc0Nhc2VGaWVsZChjYXNlRmllbGRzOiBDYXNlRmllbGRbXSk6IGJvb2xlYW4ge1xuICAgIHJldHVybiBjYXNlRmllbGRzPy5zb21lKGNhc2VGaWVsZCA9PiBGaWVsZHNVdGlscy5pc0xpbmtlZENhc2VzQ2FzZUZpZWxkKGNhc2VGaWVsZCkpO1xuICB9XG5cbiAgcHVibGljIHN0YXRpYyBpc0ZsYWdzRmllbGRUeXBlKGZpZWxkVHlwZTogRmllbGRUeXBlKTogYm9vbGVhbiB7XG4gICAgaWYgKCFmaWVsZFR5cGUpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICAvLyBOb3RlOiBUaGlzIGltcGxlbWVudGF0aW9uIHN1cHBvcnRzIHRoZSBkdW1teSBmaWVsZCB0eXBlIElEIG9mIFwiQ2FzZUZsYWdcIiBmb3IgdGVzdGluZyBhbmQgdGhlIHJlYWwgZmllbGQgdHlwZVxuICAgIC8vIElEIG9mIFwiRmxhZ3NcIlxuICAgIHJldHVybiAoZmllbGRUeXBlLnR5cGUgPT09ICdDb21wbGV4JyAmJiAoZmllbGRUeXBlLmlkID09PSAnQ2FzZUZsYWcnIHx8IGZpZWxkVHlwZS5pZCA9PT0gJ0ZsYWdzJykpO1xuICB9XG5cbiAgLyoqXG4gICAqIEV4dHJhY3QgZmxhZ3MgZGF0YSBmcm9tIGEgYENhc2VGaWVsZGAgaW5zdGFuY2UsIHJlY3Vyc2luZyBhbmQgaXRlcmF0aW5nIHRocm91Z2ggc3ViLWZpZWxkcyBvZiBhIENvbXBsZXggZmllbGQgb3JcbiAgICogZWFjaCBmaWVsZCBpbiBhIENvbGxlY3Rpb24gZmllbGQuXG4gICAqXG4gICAqIEBwYXJhbSBmbGFncyBBbiBhcnJheSBmb3IgYWNjdW11bGF0aW5nIGV4dHJhY3RlZCBmbGFncyBkYXRhIGFuZCBkZXJpdmVkIGBVbnR5cGVkRm9ybUdyb3VwYCBwYXRoc1xuICAgKiBAcGFyYW0gY2FzZUZpZWxkIEEgYENhc2VGaWVsZGAgaW5zdGFuY2UgZnJvbSB3aGljaCB0byBleHRyYWN0IHRoZSBmbGFncyBkYXRhXG4gICAqIEBwYXJhbSBwYXRoVG9GbGFnc0Zvcm1Hcm91cCBBIChkb3QtZGVsaW1pdGVkKSBzdHJpbmcgZm9yIGNvbmNhdGVuYXRpbmcgdGhlIG5hbWUgb2YgZWFjaCBjb250cm9sIHRoYXQgZm9ybXMgdGhlIHBhdGhcbiAgICogdG8gdGhlIGBVbnR5cGVkRm9ybUdyb3VwYCBmb3IgdGhlIGBGbGFnc2AgaW5zdGFuY2VcbiAgICogQHBhcmFtIHRvcExldmVsQ2FzZUZpZWxkIFRoZSB0b3AtbGV2ZWwgYENhc2VGaWVsZGAgdGhhdCBjb250YWlucyB0aGUgdmFsdWUgcHJvcGVydHkuIFRoaXMgaXMgcmVxdWlyZWQgYmVjYXVzZSBfb25seVxuICAgKiB0b3AtbGV2ZWxfIGBDYXNlRmllbGRgcyBjb250YWluIGFjdHVhbCB2YWx1ZXMgYW5kIGEgcmVmZXJlbmNlIG5lZWRzIHRvIGJlIG1haW50YWluZWQgdG8gc3VjaCBhIGZpZWxkXG4gICAqIEBwYXJhbSBjdXJyZW50VmFsdWUgVGhlIGN1cnJlbnQgdmFsdWUgb2JqZWN0IG9mIGEgYENhc2VGaWVsZGAgdGhhdCBpcyBhIHN1Yi1maWVsZCBvZiBhIG5vbiByb290LWxldmVsIENvbXBsZXggZmllbGQuXG4gICAqIFJlcXVpcmVkIGZvciBtYXBwaW5nIHRoZSBgQ2FzZUZpZWxkYCB2YWx1ZSB0byBhIGBGbGFnc2Agb2JqZWN0IGlmIGl0IGlzIGEgXCJGbGFnc1wiIGBDYXNlRmllbGRgLiAoRm9yIENvbXBsZXggdHlwZXMsXG4gICAqIG9ubHkgdGhlIF9yb290LWxldmVsXyBgQ2FzZUZpZWxkYCBjb250YWlucyBhIHZhbHVlIHByb3BlcnR5IC0gYWxsIHN1Yi1maWVsZHMsIGluY2x1ZGluZyBhbnkgbmVzdGVkIENvbXBsZXggZmllbGRzLFxuICAgKiBkbyAqbm90KiBjb250YWluIGFueSB2YWx1ZXMgdGhlbXNlbHZlcy4pXG4gICAqIEByZXR1cm5zIEFuIGFycmF5IG9mIGBGbGFnc1dpdGhGb3JtR3JvdXBQYXRoYCwgZWFjaCBpbnN0YW5jZSBjb21wcmlzaW5nIGEgYEZsYWdzYCBvYmplY3QgZGVyaXZlZCBmcm9tIGEgYENhc2VGaWVsZGBcbiAgICogb2YgdHlwZSBcIkZsYWdzXCIsIGFuZCB0aGUgZG90LWRlbGltaXRlZCBwYXRoIHN0cmluZyB0byB0aGUgY29ycmVzcG9uZGluZyBgVW50eXBlZEZvcm1Hcm91cGBcbiAgICovXG4gIHB1YmxpYyBzdGF0aWMgZXh0cmFjdEZsYWdzRGF0YUZyb21DYXNlRmllbGQoZmxhZ3M6IEZsYWdzV2l0aEZvcm1Hcm91cFBhdGhbXSwgY2FzZUZpZWxkOiBDYXNlRmllbGQsXG4gICAgcGF0aFRvRmxhZ3NGb3JtR3JvdXA6IHN0cmluZywgdG9wTGV2ZWxDYXNlRmllbGQ6IENhc2VGaWVsZCwgY3VycmVudFZhbHVlPzogb2JqZWN0KTogRmxhZ3NXaXRoRm9ybUdyb3VwUGF0aFtdIHtcbiAgICBjb25zdCBmaWVsZFR5cGUgPSBjYXNlRmllbGQuZmllbGRfdHlwZTtcbiAgICBzd2l0Y2ggKGZpZWxkVHlwZS50eXBlKSB7XG4gICAgICBjYXNlICdDb21wbGV4JzpcbiAgICAgICAgLy8gSWYgdGhlIGZpZWxkIGlzIGEgRmxhZ3MgQ2FzZUZpZWxkICh0aGVzZSBhcmUgaW1wbGVtZW50ZWQgYXMgQ29tcGxleCB0eXBlcyksIGl0IGNhbiBiZSBtYXBwZWQgdG8gYSBGbGFnc1xuICAgICAgICAvLyBvYmplY3QgaW1tZWRpYXRlbHlcbiAgICAgICAgaWYgKEZpZWxkc1V0aWxzLmlzRmxhZ3NDYXNlRmllbGQoY2FzZUZpZWxkKSkge1xuICAgICAgICAgIC8vIElmIHRoZSBGbGFncyBDYXNlRmllbGQgaGFzIGEgdmFsdWUsIGl0IGlzIGEgcm9vdC1sZXZlbCBDb21wbGV4IGZpZWxkOyBpZiBpdCBkb2VzIG5vdCwgaXQgaXMgYSBGbGFnc1xuICAgICAgICAgIC8vIENhc2VGaWVsZCB0aGF0IGlzIGEgc3ViLWZpZWxkIHdpdGhpbiBhbm90aGVyIENvbXBsZXggZmllbGQsIHNvIHVzZSB0aGUgY3VycmVudFZhbHVlIHZhbHVlIChpZiBhbnkpXG4gICAgICAgICAgLy8gaW5zdGVhZC4gVGhlIGV4Y2VwdGlvbiB0byB0aGlzIGlzIHRoZSBcImNhc2VGbGFnc1wiIEZsYWdzIENhc2VGaWVsZCwgd2hpY2ggd2lsbCBoYXZlIGFuIGVtcHR5IG9iamVjdCB2YWx1ZVxuICAgICAgICAgIC8vIGluaXRpYWxseSwgYmVjYXVzZSBubyBwYXJ0eSBuYW1lIGlzIHJlcXVpcmVkXG4gICAgICAgICAgaWYgKGNhc2VGaWVsZC52YWx1ZSAmJiBGaWVsZHNVdGlscy5pc05vbkVtcHR5T2JqZWN0KGNhc2VGaWVsZC52YWx1ZSkgfHxcbiAgICAgICAgICAgIGNhc2VGaWVsZC5pZCA9PT0gdGhpcy5jYXNlTGV2ZWxDYXNlRmxhZ3NGaWVsZElkKSB7XG4gICAgICAgICAgICBmbGFncy5wdXNoKHRoaXMubWFwQ2FzZUZpZWxkVG9GbGFnc1dpdGhGb3JtR3JvdXBQYXRoT2JqZWN0KGNhc2VGaWVsZCwgcGF0aFRvRmxhZ3NGb3JtR3JvdXApKTtcbiAgICAgICAgICB9IGVsc2UgaWYgKGN1cnJlbnRWYWx1ZSAmJiBGaWVsZHNVdGlscy5pc05vbkVtcHR5T2JqZWN0KGN1cnJlbnRWYWx1ZSkpIHtcbiAgICAgICAgICAgIHBhdGhUb0ZsYWdzRm9ybUdyb3VwICs9IGAuJHtjYXNlRmllbGQuaWR9YDtcbiAgICAgICAgICAgIGZsYWdzLnB1c2godGhpcy5tYXBWYWx1ZVRvRmxhZ3NXaXRoRm9ybUdyb3VwUGF0aE9iamVjdChcbiAgICAgICAgICAgICAgY2FzZUZpZWxkLmlkLCBjdXJyZW50VmFsdWUsIHBhdGhUb0ZsYWdzRm9ybUdyb3VwLCB0b3BMZXZlbENhc2VGaWVsZCkpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIGlmIChmaWVsZFR5cGUuY29tcGxleF9maWVsZHMpIHtcbiAgICAgICAgICBjb25zdCB2YWx1ZSA9IGNhc2VGaWVsZC52YWx1ZSA/IGNhc2VGaWVsZC52YWx1ZSA6IGN1cnJlbnRWYWx1ZTtcbiAgICAgICAgICBpZiAodmFsdWUgJiYgRmllbGRzVXRpbHMuaXNOb25FbXB0eU9iamVjdCh2YWx1ZSkpIHtcbiAgICAgICAgICAgIGZsYWdzID0gZmllbGRUeXBlLmNvbXBsZXhfZmllbGRzLnJlZHVjZSgoZmxhZ3NPZkNvbXBsZXhGaWVsZCwgc3ViRmllbGQpID0+IHtcbiAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuZXh0cmFjdEZsYWdzRGF0YUZyb21DYXNlRmllbGQoXG4gICAgICAgICAgICAgICAgZmxhZ3NPZkNvbXBsZXhGaWVsZCwgc3ViRmllbGQsIHBhdGhUb0ZsYWdzRm9ybUdyb3VwLCB0b3BMZXZlbENhc2VGaWVsZCwgdmFsdWVbc3ViRmllbGQuaWRdKTtcbiAgICAgICAgICAgIH0sIGZsYWdzKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgYnJlYWs7XG4gICAgICAvLyBGb3IgYSBDb2xsZWN0aW9uIGZpZWxkLCB0aGUgdmFsdWVzIGFyZSBzdG9yZWQgZGlyZWN0bHkgYXMga2V5LXZhbHVlIHBhaXJzIGluIHRoZSBDYXNlRmllbGQncyB2YWx1ZSBwcm9wZXJ0eVxuICAgICAgLy8gYXMgYW4gYXJyYXksIHVubGVzcyB0aGUgY29sbGVjdGlvbiBpcyBhIHN1Yi1maWVsZCBvZiBhIENvbXBsZXggdHlwZSAtIHN1Yi1maWVsZHMgbmV2ZXIgY29udGFpbiB2YWx1ZXNcbiAgICAgIGNhc2UgJ0NvbGxlY3Rpb24nOlxuICAgICAgICAvLyBJZiB0aGlzIGlzIGEgY29sbGVjdGlvbiBvZiBGbGFncyBDYXNlRmllbGRzLCB0aGVzZSBjYW4gYmUgbWFwcGVkIHRvIEZsYWdzIG9iamVjdHMgaW1tZWRpYXRlbHlcbiAgICAgICAgaWYgKEZpZWxkc1V0aWxzLmlzRmxhZ3NGaWVsZFR5cGUoZmllbGRUeXBlLmNvbGxlY3Rpb25fZmllbGRfdHlwZSkpIHtcbiAgICAgICAgICAvLyBJZiB0aGUgQ29sbGVjdGlvbiBDYXNlRmllbGQgaGFzIGEgdmFsdWUgKGFuIGFycmF5KSwgaXQgaXMgYSByb290LWxldmVsIENvbGxlY3Rpb24gZmllbGQ7IGlmIGl0IGRvZXMgbm90LFxuICAgICAgICAgIC8vIGl0IGlzIGEgQ29sbGVjdGlvbiBDYXNlRmllbGQgdGhhdCBpcyBhIHN1Yi1maWVsZCB3aXRoaW4gYSBDb21wbGV4IGZpZWxkLCBzbyB1c2UgdGhlIGN1cnJlbnRWYWx1ZSB2YWx1ZVxuICAgICAgICAgIC8vIChpZiBhbnkpIGluc3RlYWRcbiAgICAgICAgICBjb25zdCBwYXRoRnJhZ21lbnQgPSBwYXRoVG9GbGFnc0Zvcm1Hcm91cCArPSAnLmluZGV4LnZhbHVlJztcbiAgICAgICAgICBpZiAoY2FzZUZpZWxkLnZhbHVlKSB7XG4gICAgICAgICAgICBjYXNlRmllbGQudmFsdWUuZm9yRWFjaCgoaXRlbTogeyBpZDogc3RyaW5nOyB2YWx1ZTogb2JqZWN0OyB9LCBpbmRleDogbnVtYmVyKSA9PiB7XG4gICAgICAgICAgICAgIC8vIEF0IGVhY2ggaXRlcmF0aW9uLCByZXBsYWNlIHRoZSBcImluZGV4XCIgcGxhY2Vob2xkZXIgd2l0aCB0aGUgYWN0dWFsIGluZGV4XG4gICAgICAgICAgICAgIHBhdGhUb0ZsYWdzRm9ybUdyb3VwID0gcGF0aEZyYWdtZW50LnJlcGxhY2UoJ2luZGV4JywgaW5kZXgudG9TdHJpbmcoMTApKTtcbiAgICAgICAgICAgICAgZmxhZ3MucHVzaChcbiAgICAgICAgICAgICAgICB0aGlzLm1hcFZhbHVlVG9GbGFnc1dpdGhGb3JtR3JvdXBQYXRoT2JqZWN0KGl0ZW0uaWQsIGl0ZW0udmFsdWUsIHBhdGhUb0ZsYWdzRm9ybUdyb3VwLCBjYXNlRmllbGQpKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH0gZWxzZSBpZiAoY3VycmVudFZhbHVlKSB7XG4gICAgICAgICAgICAoY3VycmVudFZhbHVlIGFzIFtdKS5mb3JFYWNoKChpdGVtOiB7IGlkOiBzdHJpbmc7IHZhbHVlOiBvYmplY3Q7IH0sIGluZGV4OiBudW1iZXIpID0+IHtcbiAgICAgICAgICAgICAgcGF0aFRvRmxhZ3NGb3JtR3JvdXAgPSBwYXRoRnJhZ21lbnQucmVwbGFjZSgnaW5kZXgnLCBpbmRleC50b1N0cmluZygxMCkpO1xuICAgICAgICAgICAgICBmbGFncy5wdXNoKFxuICAgICAgICAgICAgICAgIHRoaXMubWFwVmFsdWVUb0ZsYWdzV2l0aEZvcm1Hcm91cFBhdGhPYmplY3QoaXRlbS5pZCwgaXRlbS52YWx1ZSwgcGF0aFRvRmxhZ3NGb3JtR3JvdXAsIHRvcExldmVsQ2FzZUZpZWxkKSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSBpZiAoZmllbGRUeXBlLmNvbGxlY3Rpb25fZmllbGRfdHlwZS50eXBlID09PSAnQ29tcGxleCcgJiYgZmllbGRUeXBlLmNvbGxlY3Rpb25fZmllbGRfdHlwZS5jb21wbGV4X2ZpZWxkcykge1xuICAgICAgICAgIGlmIChjYXNlRmllbGQudmFsdWUpIHtcbiAgICAgICAgICAgIC8vIFBlcmZvcm0gYSByZWR1Y3Rpb24gb3ZlciBlYWNoIENvbXBsZXggZmllbGQncyBzdWItZmllbGRzIChzaW1pbGFyIHRvIHdoYXQgaXMgZG9uZSBhYm92ZSBmb3Igbm9uLUZsYWdzXG4gICAgICAgICAgICAvLyBDb21wbGV4IGZpZWxkcylcbiAgICAgICAgICAgIC8vIChDYW5ub3QganVzdCBjYWxsIHRoaXMgZnVuY3Rpb24gcmVjdXJzaXZlbHkgZm9yIGVhY2ggQ29tcGxleCBmaWVsZCBpbiB0aGUgY29sbGVjdGlvbiBiZWNhdXNlIHRoZSBDYXNlRmllbGRcbiAgICAgICAgICAgIC8vIGZvciBlYWNoIG9uZSBpcyBub3QgcGFydCBvZiB0aGUgY29sbGVjdGlvbilcbiAgICAgICAgICAgIGNvbnN0IHBhdGhGcmFnbWVudCA9IHBhdGhUb0ZsYWdzRm9ybUdyb3VwICs9ICcuaW5kZXgudmFsdWUnO1xuICAgICAgICAgICAgY2FzZUZpZWxkLnZhbHVlLmZvckVhY2goKGl0ZW06IHsgaWQ6IHN0cmluZzsgdmFsdWU6IG9iamVjdDsgfSwgaW5kZXg6IG51bWJlcikgPT4ge1xuICAgICAgICAgICAgICAvLyBBdCBlYWNoIGl0ZXJhdGlvbiwgcmVwbGFjZSB0aGUgXCJpbmRleFwiIHBsYWNlaG9sZGVyIHdpdGggdGhlIGFjdHVhbCBpbmRleFxuICAgICAgICAgICAgICBwYXRoVG9GbGFnc0Zvcm1Hcm91cCA9IHBhdGhGcmFnbWVudC5yZXBsYWNlKCdpbmRleCcsIGluZGV4LnRvU3RyaW5nKDEwKSk7XG4gICAgICAgICAgICAgIGZsYWdzID0gZmllbGRUeXBlLmNvbGxlY3Rpb25fZmllbGRfdHlwZS5jb21wbGV4X2ZpZWxkcy5yZWR1Y2UoKGZsYWdzT2ZDb21wbGV4RmllbGQsIHN1YkZpZWxkKSA9PiB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuZXh0cmFjdEZsYWdzRGF0YUZyb21DYXNlRmllbGQoXG4gICAgICAgICAgICAgICAgICBmbGFnc09mQ29tcGxleEZpZWxkLCBzdWJGaWVsZCwgcGF0aFRvRmxhZ3NGb3JtR3JvdXAsIHRvcExldmVsQ2FzZUZpZWxkLCBpdGVtLnZhbHVlW3N1YkZpZWxkLmlkXSk7XG4gICAgICAgICAgICAgIH0sIGZsYWdzKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBicmVhaztcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAvLyBJZ25vcmUgYWxsIG90aGVyIGZpZWxkIHR5cGVzXG4gICAgfVxuICAgIHJldHVybiBmbGFncztcbiAgfVxuXG4gIHByaXZhdGUgc3RhdGljIG1hcENhc2VGaWVsZFRvRmxhZ3NXaXRoRm9ybUdyb3VwUGF0aE9iamVjdChjYXNlRmllbGQ6IENhc2VGaWVsZCxcbiAgICBwYXRoVG9GbGFnc0Zvcm1Hcm91cDogc3RyaW5nKTogRmxhZ3NXaXRoRm9ybUdyb3VwUGF0aCB7XG4gICAgcmV0dXJuIHRoaXMubWFwVmFsdWVUb0ZsYWdzV2l0aEZvcm1Hcm91cFBhdGhPYmplY3QoY2FzZUZpZWxkLmlkLCBjYXNlRmllbGQudmFsdWUsIHBhdGhUb0ZsYWdzRm9ybUdyb3VwLCBjYXNlRmllbGQpO1xuICB9XG5cbiAgcHJpdmF0ZSBzdGF0aWMgbWFwVmFsdWVUb0ZsYWdzV2l0aEZvcm1Hcm91cFBhdGhPYmplY3QoaWQ6IHN0cmluZywgdmFsdWU6IG9iamVjdCxcbiAgICBwYXRoVG9GbGFnc0Zvcm1Hcm91cDogc3RyaW5nLCBjYXNlRmllbGQ6IENhc2VGaWVsZCk6IEZsYWdzV2l0aEZvcm1Hcm91cFBhdGgge1xuICAgIHJldHVybiB7XG4gICAgICBmbGFnczoge1xuICAgICAgICBmbGFnc0Nhc2VGaWVsZElkOiBpZCxcbiAgICAgICAgcGFydHlOYW1lOiB2YWx1ZSA/IHZhbHVlWydwYXJ0eU5hbWUnXSA6IG51bGwsXG4gICAgICAgIHJvbGVPbkNhc2U6IHZhbHVlID8gdmFsdWVbJ3JvbGVPbkNhc2UnXSA6IG51bGwsXG4gICAgICAgIGRldGFpbHM6IHZhbHVlICYmIHZhbHVlWydkZXRhaWxzJ10gJiYgdmFsdWVbJ2RldGFpbHMnXS5sZW5ndGggPiAwXG4gICAgICAgICAgPyAodmFsdWVbJ2RldGFpbHMnXSBhcyBhbnlbXSkubWFwKGRldGFpbCA9PiB7XG4gICAgICAgICAgICByZXR1cm4gT2JqZWN0LmFzc2lnbih7fSwgLi4uT2JqZWN0LmtleXMoZGV0YWlsLnZhbHVlKS5tYXAoayA9PiB7XG4gICAgICAgICAgICAgIC8vIFRoZSBpZCBwcm9wZXJ0eSBzZXQgYmVsb3cgd2lsbCBiZSBudWxsIGZvciBhIG5ldyBjYXNlIGZsYWcsIGFuZCBhIHVuaXF1ZSBpZCByZXR1cm5lZCBmcm9tIENDRCB3aGVuXG4gICAgICAgICAgICAgIC8vIHVwZGF0aW5nIGFuIGV4aXN0aW5nIGZsYWdcbiAgICAgICAgICAgICAgc3dpdGNoIChrKSB7XG4gICAgICAgICAgICAgICAgLy8gVGhlc2UgdHdvIGZpZWxkcyBhcmUgZGF0ZS10aW1lIGZpZWxkc1xuICAgICAgICAgICAgICAgIGNhc2UgJ2RhdGVUaW1lTW9kaWZpZWQnOlxuICAgICAgICAgICAgICAgIGNhc2UgJ2RhdGVUaW1lQ3JlYXRlZCc6XG4gICAgICAgICAgICAgICAgICByZXR1cm4geyBba106IGRldGFpbC52YWx1ZVtrXSA/IG5ldyBEYXRlKGRldGFpbC52YWx1ZVtrXSkgOiBudWxsLCBpZDogZGV0YWlsLmlkIH07XG4gICAgICAgICAgICAgICAgLy8gVGhpcyBmaWVsZCBpcyBhIFwieWVzL25vXCIgZmllbGRcbiAgICAgICAgICAgICAgICBjYXNlICdoZWFyaW5nUmVsZXZhbnQnOlxuICAgICAgICAgICAgICAgICAgcmV0dXJuIGRldGFpbC52YWx1ZVtrXS50b1VwcGVyQ2FzZSgpID09PSAnWUVTJyA/IHsgW2tdOiB0cnVlLCBpZDogZGV0YWlsLmlkIH0gOiB7IFtrXTogZmFsc2UsIGlkOiBkZXRhaWwuaWQgfTtcbiAgICAgICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgICAgcmV0dXJuIHsgW2tdOiBkZXRhaWwudmFsdWVba10sIGlkOiBkZXRhaWwuaWQgfTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSkpO1xuICAgICAgICAgIH0pIGFzIEZsYWdEZXRhaWxbXVxuICAgICAgICAgIDogbnVsbFxuICAgICAgfSxcbiAgICAgIHBhdGhUb0ZsYWdzRm9ybUdyb3VwLFxuICAgICAgY2FzZUZpZWxkXG4gICAgfTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDb3VudCBhY3RpdmUgZmxhZ3MgaW4gYSBgQ2FzZUZpZWxkYCBpbnN0YW5jZSwgcmVjdXJzaW5nIGFuZCBpdGVyYXRpbmcgdGhyb3VnaCBzdWItZmllbGRzIG9mIGEgQ29tcGxleCBmaWVsZCBvciBlYWNoXG4gICAqIGZpZWxkIGluIGEgQ29sbGVjdGlvbiBmaWVsZC5cbiAgICpcbiAgICogQHBhcmFtIGFjdGl2ZUNvdW50IEFuIGFjY3VtdWxhdGlvbiBvZiB0aGUgdG90YWwgbnVtYmVyIG9mIGFjdGl2ZSBmbGFnc1xuICAgKiBAcGFyYW0gY2FzZUZpZWxkIEEgYENhc2VGaWVsZGAgaW5zdGFuY2UgZm9yIHdoaWNoIHRvIGNvdW50IHRoZSBhY3RpdmUgZmxhZ3NcbiAgICogQHBhcmFtIGN1cnJlbnRWYWx1ZSBUaGUgY3VycmVudCB2YWx1ZSBvYmplY3Qgb2YgYSBgQ2FzZUZpZWxkYCB0aGF0IGlzIGEgc3ViLWZpZWxkIG9mIGEgbm9uIHJvb3QtbGV2ZWwgQ29tcGxleCBmaWVsZC5cbiAgICogKEZvciBDb21wbGV4IHR5cGVzLCBvbmx5IHRoZSBfcm9vdC1sZXZlbF8gYENhc2VGaWVsZGAgY29udGFpbnMgYSB2YWx1ZSBwcm9wZXJ0eSAtIGFsbCBzdWItZmllbGRzLCBpbmNsdWRpbmcgYW55XG4gICAqIG5lc3RlZCBDb21wbGV4IGZpZWxkcywgZG8gKm5vdCogY29udGFpbiBhbnkgdmFsdWVzIHRoZW1zZWx2ZXMuKVxuICAgKiBAcmV0dXJucyBUaGUgY291bnQgb2YgYWN0aXZlIGZsYWdzXG4gICAqL1xuICBwdWJsaWMgc3RhdGljIGNvdW50QWN0aXZlRmxhZ3NJbkNhc2VGaWVsZChhY3RpdmVDb3VudDogbnVtYmVyLCBjYXNlRmllbGQ6IENhc2VGaWVsZCwgY3VycmVudFZhbHVlPzogb2JqZWN0KTogbnVtYmVyIHtcbiAgICBjb25zdCBmaWVsZFR5cGUgPSBjYXNlRmllbGQuZmllbGRfdHlwZTtcbiAgICBzd2l0Y2ggKGZpZWxkVHlwZS50eXBlKSB7XG4gICAgICBjYXNlICdDb21wbGV4JzpcbiAgICAgICAgaWYgKEZpZWxkc1V0aWxzLmlzRmxhZ3NDYXNlRmllbGQoY2FzZUZpZWxkKSkge1xuICAgICAgICAgIC8vIElmIHRoZSBGbGFncyBDYXNlRmllbGQgaGFzIGEgdmFsdWUsIGl0IGlzIGEgcm9vdC1sZXZlbCBDb21wbGV4IGZpZWxkOyBpZiBpdCBkb2VzIG5vdCwgaXQgaXMgYSBGbGFnc1xuICAgICAgICAgIC8vIENhc2VGaWVsZCB0aGF0IGlzIGEgc3ViLWZpZWxkIHdpdGhpbiBhbm90aGVyIENvbXBsZXggZmllbGQsIHNvIHVzZSB0aGUgY3VycmVudFZhbHVlIHZhbHVlIChpZiBhbnkpIGluc3RlYWRcbiAgICAgICAgICBjb25zdCB2YWx1ZSA9IGNhc2VGaWVsZC52YWx1ZSA/IGNhc2VGaWVsZC52YWx1ZSA6IGN1cnJlbnRWYWx1ZTtcbiAgICAgICAgICBpZiAodmFsdWUgJiYgRmllbGRzVXRpbHMuaXNOb25FbXB0eU9iamVjdCh2YWx1ZSkgJiYgdmFsdWUuZGV0YWlscykge1xuICAgICAgICAgICAgYWN0aXZlQ291bnQgPSB2YWx1ZS5kZXRhaWxzLnJlZHVjZShcbiAgICAgICAgICAgICAgKGNvdW50LCBkZXRhaWwpID0+IGRldGFpbC52YWx1ZS5zdGF0dXMgPT09IENhc2VGbGFnU3RhdHVzLkFDVElWRSA/IGNvdW50ICsgMSA6IGNvdW50LFxuICAgICAgICAgICAgICBhY3RpdmVDb3VudFxuICAgICAgICAgICAgKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSBpZiAoZmllbGRUeXBlLmNvbXBsZXhfZmllbGRzKSB7XG4gICAgICAgICAgY29uc3QgdmFsdWUgPSBjYXNlRmllbGQudmFsdWUgPyBjYXNlRmllbGQudmFsdWUgOiBjdXJyZW50VmFsdWU7XG4gICAgICAgICAgaWYgKHZhbHVlICYmIEZpZWxkc1V0aWxzLmlzTm9uRW1wdHlPYmplY3QodmFsdWUpKSB7XG4gICAgICAgICAgICBhY3RpdmVDb3VudCA9IGZpZWxkVHlwZS5jb21wbGV4X2ZpZWxkcy5yZWR1Y2UoKGFjdGl2ZUZsYWdzQ291bnRPZkNvbXBsZXhGaWVsZCwgc3ViRmllbGQpID0+IHtcbiAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuY291bnRBY3RpdmVGbGFnc0luQ2FzZUZpZWxkKFxuICAgICAgICAgICAgICAgIGFjdGl2ZUZsYWdzQ291bnRPZkNvbXBsZXhGaWVsZCxcbiAgICAgICAgICAgICAgICBzdWJGaWVsZCxcbiAgICAgICAgICAgICAgICB2YWx1ZVtzdWJGaWVsZC5pZF1cbiAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIH0sIGFjdGl2ZUNvdW50KTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgYnJlYWs7XG4gICAgICAvLyBGb3IgYSBDb2xsZWN0aW9uIGZpZWxkLCB0aGUgdmFsdWVzIGFyZSBzdG9yZWQgZGlyZWN0bHkgYXMga2V5LXZhbHVlIHBhaXJzIGluIHRoZSBDYXNlRmllbGQncyB2YWx1ZSBwcm9wZXJ0eVxuICAgICAgLy8gYXMgYW4gYXJyYXksIHVubGVzcyB0aGUgY29sbGVjdGlvbiBpcyBhIHN1Yi1maWVsZCBvZiBhIENvbXBsZXggdHlwZSAtIHN1Yi1maWVsZHMgbmV2ZXIgY29udGFpbiB2YWx1ZXNcbiAgICAgIGNhc2UgJ0NvbGxlY3Rpb24nOlxuICAgICAgICBpZiAoRmllbGRzVXRpbHMuaXNGbGFnc0ZpZWxkVHlwZShmaWVsZFR5cGUuY29sbGVjdGlvbl9maWVsZF90eXBlKSkge1xuICAgICAgICAgIC8vIElmIHRoZSBDb2xsZWN0aW9uIENhc2VGaWVsZCBoYXMgYSB2YWx1ZSAoYW4gYXJyYXkpLCBpdCBpcyBhIHJvb3QtbGV2ZWwgQ29sbGVjdGlvbiBmaWVsZDsgaWYgaXQgZG9lcyBub3QsXG4gICAgICAgICAgLy8gaXQgaXMgYSBDb2xsZWN0aW9uIENhc2VGaWVsZCB0aGF0IGlzIGEgc3ViLWZpZWxkIHdpdGhpbiBhIENvbXBsZXggZmllbGQsIHNvIHVzZSB0aGUgY3VycmVudFZhbHVlIHZhbHVlXG4gICAgICAgICAgLy8gKGlmIGFueSkgaW5zdGVhZFxuICAgICAgICAgIGNvbnN0IHZhbHVlID0gY2FzZUZpZWxkLnZhbHVlID8gY2FzZUZpZWxkLnZhbHVlIDogY3VycmVudFZhbHVlO1xuICAgICAgICAgIGlmICh2YWx1ZSkge1xuICAgICAgICAgICAgdmFsdWUuZm9yRWFjaCgoaXRlbTogeyBpZDogc3RyaW5nOyB2YWx1ZTogb2JqZWN0OyB9KSA9PiB7XG4gICAgICAgICAgICAgIGlmIChpdGVtLnZhbHVlWydkZXRhaWxzJ10pIHtcbiAgICAgICAgICAgICAgICBhY3RpdmVDb3VudCA9IGl0ZW0udmFsdWVbJ2RldGFpbHMnXS5yZWR1Y2UoXG4gICAgICAgICAgICAgICAgICAoY291bnQsIGRldGFpbCkgPT4gZGV0YWlsLnZhbHVlLnN0YXR1cyA9PT0gQ2FzZUZsYWdTdGF0dXMuQUNUSVZFID8gY291bnQgKyAxIDogY291bnQsXG4gICAgICAgICAgICAgICAgICBhY3RpdmVDb3VudFxuICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIGlmIChmaWVsZFR5cGUuY29sbGVjdGlvbl9maWVsZF90eXBlLnR5cGUgPT09ICdDb21wbGV4JyAmJiBmaWVsZFR5cGUuY29sbGVjdGlvbl9maWVsZF90eXBlLmNvbXBsZXhfZmllbGRzKSB7XG4gICAgICAgICAgaWYgKGNhc2VGaWVsZC52YWx1ZSkge1xuICAgICAgICAgICAgLy8gUGVyZm9ybSBhIHJlZHVjdGlvbiBvdmVyIGVhY2ggQ29tcGxleCBmaWVsZCdzIHN1Yi1maWVsZHMgKHNpbWlsYXIgdG8gd2hhdCBpcyBkb25lIGFib3ZlIGZvciBub24tRmxhZ3NcbiAgICAgICAgICAgIC8vIENvbXBsZXggZmllbGRzKVxuICAgICAgICAgICAgLy8gKENhbm5vdCBqdXN0IGNhbGwgdGhpcyBmdW5jdGlvbiByZWN1cnNpdmVseSBmb3IgZWFjaCBDb21wbGV4IGZpZWxkIGluIHRoZSBjb2xsZWN0aW9uIGJlY2F1c2UgdGhlIENhc2VGaWVsZFxuICAgICAgICAgICAgLy8gZm9yIGVhY2ggb25lIGlzIG5vdCBwYXJ0IG9mIHRoZSBjb2xsZWN0aW9uKVxuICAgICAgICAgICAgY2FzZUZpZWxkLnZhbHVlLmZvckVhY2goKGl0ZW06IHsgaWQ6IHN0cmluZzsgdmFsdWU6IG9iamVjdDsgfSkgPT4ge1xuICAgICAgICAgICAgICBhY3RpdmVDb3VudCA9IGZpZWxkVHlwZS5jb2xsZWN0aW9uX2ZpZWxkX3R5cGUuY29tcGxleF9maWVsZHMucmVkdWNlKFxuICAgICAgICAgICAgICAgIChhY3RpdmVGbGFnc0NvdW50T2ZDb21wbGV4RmllbGQsIHN1YkZpZWxkKSA9PiB7XG4gICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5jb3VudEFjdGl2ZUZsYWdzSW5DYXNlRmllbGQoYWN0aXZlRmxhZ3NDb3VudE9mQ29tcGxleEZpZWxkLCBzdWJGaWVsZCwgaXRlbS52YWx1ZVtzdWJGaWVsZC5pZF0pO1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgYWN0aXZlQ291bnRcbiAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBicmVhaztcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAvLyBJZ25vcmUgYWxsIG90aGVyIGZpZWxkIHR5cGVzXG4gICAgfVxuICAgIHJldHVybiBhY3RpdmVDb3VudDtcbiAgfVxuXG4gIHB1YmxpYyBidWlsZENhblNob3dQcmVkaWNhdGUoZXZlbnRUcmlnZ2VyOiBDYXNlRXZlbnRUcmlnZ2VyLCBmb3JtOiBhbnkpOiBQcmVkaWNhdGU8V2l6YXJkUGFnZT4ge1xuICAgIGNvbnN0IGN1cnJlbnRTdGF0ZSA9IHRoaXMuZ2V0Q3VycmVudEV2ZW50U3RhdGUoZXZlbnRUcmlnZ2VyLCBmb3JtKTtcbiAgICByZXR1cm4gKHBhZ2U6IFdpemFyZFBhZ2UpOiBib29sZWFuID0+IHtcbiAgICAgIHJldHVybiBwYWdlLnBhcnNlZFNob3dDb25kaXRpb24ubWF0Y2goY3VycmVudFN0YXRlKTtcbiAgICB9O1xuICB9XG5cbiAgcHVibGljIGdldEN1cnJlbnRFdmVudFN0YXRlKGV2ZW50VHJpZ2dlcjogeyBjYXNlX2ZpZWxkczogQ2FzZUZpZWxkW10gfSwgZm9ybTogVW50eXBlZEZvcm1Hcm91cCk6IG9iamVjdCB7XG4gICAgcmV0dXJuIHRoaXMubWVyZ2VDYXNlRmllbGRzQW5kRm9ybUZpZWxkcyhldmVudFRyaWdnZXIuY2FzZV9maWVsZHMsIGZvcm0uY29udHJvbHNbJ2RhdGEnXS52YWx1ZSk7XG4gIH1cblxuICBwdWJsaWMgY2xvbmVDYXNlRmllbGQob2JqOiBhbnkpOiBDYXNlRmllbGQge1xuICAgIHJldHVybiBPYmplY3QuYXNzaWduKG5ldyBDYXNlRmllbGQoKSwgb2JqKTtcbiAgfVxuXG4gIHB1YmxpYyBtZXJnZUNhc2VGaWVsZHNBbmRGb3JtRmllbGRzKGNhc2VGaWVsZHM6IENhc2VGaWVsZFtdLCBmb3JtRmllbGRzOiBvYmplY3QpOiBvYmplY3Qge1xuICAgIHJldHVybiB0aGlzLm1lcmdlRmllbGRzKGNhc2VGaWVsZHMsIGZvcm1GaWVsZHMsIEZpZWxkc1V0aWxzLkRFRkFVTFRfTUVSR0VfRlVOQ1RJT04pO1xuICB9XG5cbiAgcHVibGljIG1lcmdlTGFiZWxDYXNlRmllbGRzQW5kRm9ybUZpZWxkcyhjYXNlRmllbGRzOiBDYXNlRmllbGRbXSwgZm9ybUZpZWxkczogb2JqZWN0KTogb2JqZWN0IHtcbiAgICByZXR1cm4gdGhpcy5tZXJnZUZpZWxkcyhjYXNlRmllbGRzLCBmb3JtRmllbGRzLCBGaWVsZHNVdGlscy5MQUJFTF9NRVJHRV9GVU5DVElPTik7XG4gIH1cblxuICBwdWJsaWMgY29udHJvbEl0ZXJhdG9yKFxuICAgIGFDb250cm9sOiBBYnN0cmFjdENvbnRyb2wsXG4gICAgZm9ybUFycmF5Rm46IChhcnJheTogRm9ybUFycmF5KSA9PiB2b2lkLFxuICAgIGZvcm1Hcm91cEZuOiAoZ3JvdXA6IFVudHlwZWRGb3JtR3JvdXApID0+IHZvaWQsXG4gICAgY29udHJvbEZuOiAoY29udHJvbDogRm9ybUNvbnRyb2wpID0+IHZvaWRcbiAgKTogdm9pZCB7XG4gICAgaWYgKGFDb250cm9sIGluc3RhbmNlb2YgRm9ybUFycmF5KSB7IC8vIFdlJ3JlIGluIGEgY29sbGVjdGlvblxuICAgICAgZm9ybUFycmF5Rm4oYUNvbnRyb2wpO1xuICAgIH0gZWxzZSBpZiAoYUNvbnRyb2wgaW5zdGFuY2VvZiBVbnR5cGVkRm9ybUdyb3VwKSB7IC8vIFdlJ3JlIGluIGEgY29tcGxleCB0eXBlLlxuICAgICAgZm9ybUdyb3VwRm4oYUNvbnRyb2wpO1xuICAgIH0gZWxzZSBpZiAoYUNvbnRyb2wgaW5zdGFuY2VvZiBGb3JtQ29udHJvbCkgeyAvLyBGb3JtQ29udHJvbFxuICAgICAgY29udHJvbEZuKGFDb250cm9sKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIG1lcmdlRmllbGRzKGNhc2VGaWVsZHM6IENhc2VGaWVsZFtdLCBmb3JtRmllbGRzOiBvYmplY3QsIG1lcmdlRnVuY3Rpb246IChmaWVsZDogQ2FzZUZpZWxkLCByZXN1bHQ6IG9iamVjdCkgPT4gdm9pZCk6IG9iamVjdCB7XG4gICAgY29uc3QgcmVzdWx0OiBvYmplY3QgPSBGaWVsZHNVdGlscy5jbG9uZU9iamVjdChmb3JtRmllbGRzKTtcbiAgICBjYXNlRmllbGRzLmZvckVhY2goZmllbGQgPT4ge1xuICAgICAgbWVyZ2VGdW5jdGlvbihmaWVsZCwgcmVzdWx0KTtcbiAgICAgIGlmIChmaWVsZC5maWVsZF90eXBlICYmIGZpZWxkLmZpZWxkX3R5cGUuY29tcGxleF9maWVsZHMgJiYgZmllbGQuZmllbGRfdHlwZS5jb21wbGV4X2ZpZWxkcy5sZW5ndGggPiAwKSB7XG4gICAgICAgIHJlc3VsdFtmaWVsZC5pZF0gPSB0aGlzLm1lcmdlRmllbGRzKGZpZWxkLmZpZWxkX3R5cGUuY29tcGxleF9maWVsZHMsIHJlc3VsdFtmaWVsZC5pZF0sIG1lcmdlRnVuY3Rpb24pO1xuICAgICAgfVxuICAgIH0pO1xuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cbn1cbiJdfQ==