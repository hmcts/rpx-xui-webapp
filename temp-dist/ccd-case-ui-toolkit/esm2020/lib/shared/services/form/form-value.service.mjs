import { Injectable } from '@angular/core';
import { FieldsUtils } from '../fields';
import { FieldTypeSanitiser } from './field-type-sanitiser';
import * as i0 from "@angular/core";
import * as i1 from "./field-type-sanitiser";
export class FormValueService {
    constructor(fieldTypeSanitiser) {
        this.fieldTypeSanitiser = fieldTypeSanitiser;
    }
    /**
     * Gets value of a field based on fieldKey which is a dot separated reference to value and collection index.
     * There are two exceptions:
     * 1) In case of a multiselect being identified as a leaf a '---LABEL' suffix is appended to the key and values of that key are returned
     *      form= { 'list': ['code1', 'code2'],
     *              'list---LABEL': ['label1', 'label2'] },
     *      fieldKey=list,
     *      colIndex=0,
     *      value=label1, label2
     * 2) In case of a collection of simple fields is identified as a leaf all values are joined seperated by a comma
     *      form= { 'collection': [{ 'value': 'value1' }, { 'value': 'value2' }] }
     *      fieldKey=collection
     *      colIndex=1
     *      value=value1, value2
     *
     * Other examples:
     * 1) simple field reference: form={ 'PersonFirstName': 'John' }, fieldKey=PersonFirstName, value=John
     * 2) complex field reference:
     *      form= { complex1': { 'simple11': 'value11', 'simple12': 'value12', 'complex2': { 'simple21': 'value21' } }},
     *      fieldKey=complex1.complex2.simple21
     *      colIndex=0,
     *      value=value21
     * 3) complex field with collection field with complex field reference:
     *      form= { 'complex1': {
     *               'collection1': [
     *               { 'value': {
     *                   'complex2': {
     *                     'simple1': 'value1',
     *                     'complex3': {
     *                       'complex4': {
     *                         'simple2': 'value12'
     *                       }
     *                     }
     *                   }
     *                 }
     *               },
     *               { 'value': {
     *                   'complex2': {
     *                     'simple1': 'value2',
     *                     'complex3': {
     *                       'complex4': {
     *                         'simple2': 'value21'
     *                       }
     *                     }
     *                   }
     *                 }
     *               },
     *               { 'value': {
     *                   'complex2': {
     *                     'simple1': 'value3',
     *                     'complex3': {
     *                       'complex4': {
     *                         'simple2': 'value31'
     *                       }
     *                     }
     *                   }
     *                 }
     *               }
     *             ]}}
     *      fieldKey=complex1.collection1.complex2.complex3.complex4.simple2
     *      colIndex=2,
     *      value=value21
     * 4) collection of complex types
     *      form= { 'collection1': [
     *               { 'value': {'complex1': {
     *                             'simple1': 'value11',
     *                             'complex2': {
     *                               'complex3': {
     *                                 'simple2': 'value12'
     *                               }
     *                             }
     *                         }}
     *               },
     *               { 'value': {'complex1': {
     *                             'simple1': 'value21',
     *                             'complex2': {
     *                               'complex3': {
     *                                 'simple2': 'value22'
     *                               }
     *                             }
     *                         }}
     *               },
     *               { 'value': {'complex1': {
     *                             'simple1': 'value31',
     *                             'complex2': {
     *                               'complex3': {
     *                                 'simple2': 'value32'
     *                               }
     *                             }
     *                           }}
     *               }
     *             ]}
     *      fieldKey=collection1.complex1.complex2.complex3.simple2
     *      colIndex=2
     *      value=value32
     *
     * If key is pointing at a complex or collection leaf (not simple, collection of simple or multiselect types) then undefined is returned.
     * Also no key referring a leaf that is contained within collection will contain index number. The index is passed as an argument to the
     * method.
     */
    static getFieldValue(form, fieldKey, colIndex) {
        const fieldIds = fieldKey.split('.');
        const currentFieldId = fieldIds[0];
        const currentForm = form[currentFieldId];
        if (FieldsUtils.isMultiSelectValue(currentForm)) {
            return form[currentFieldId + FieldsUtils.LABEL_SUFFIX].join(', ');
        }
        else if (FieldsUtils.isCollectionOfSimpleTypes(currentForm)) {
            return currentForm.map(fieldValue => fieldValue['value']).join(', ');
        }
        else if (FieldsUtils.isCollection(currentForm)) {
            return this.getFieldValue(currentForm[colIndex]['value'], fieldIds.slice(1).join('.'), colIndex);
        }
        else if (FieldsUtils.isNonEmptyObject(currentForm)) {
            return this.getFieldValue(currentForm, fieldIds.slice(1).join('.'), colIndex);
        }
        else {
            return currentForm;
        }
    }
    /**
     * A recursive method to remove anything with a `---LABEL` suffix.
     * @param data The data to recurse through and remove MultiSelect labels.
     */
    static removeMultiSelectLabels(data) {
        if (data && typeof data === 'object') {
            if (Array.isArray(data)) {
                for (const item of data) {
                    FormValueService.removeMultiSelectLabels(item);
                }
            }
            else {
                const keys = Object.keys(data);
                for (const key of keys) {
                    // Have we found one a MultiSelect label?
                    if (key.indexOf(FieldsUtils.LABEL_SUFFIX) > 0) {
                        // If so, remove it.
                        delete data[key];
                    }
                    else {
                        FormValueService.removeMultiSelectLabels(data[key]);
                    }
                }
            }
        }
    }
    static isReadOnly(field) {
        return field.display_context ? field.display_context.toUpperCase() === 'READONLY' : false;
    }
    static isOptional(field) {
        return field.display_context ? field.display_context.toUpperCase() === 'OPTIONAL' : false;
    }
    static isLabel(field) {
        if (field.field_type) {
            return field.field_type.type === 'Label';
        }
        else {
            return false;
        }
    }
    static isEmptyData(data) {
        if (data) {
            let allEmpty = true;
            for (const prop of Object.keys(data)) {
                const value = data[prop];
                if (value) {
                    if (typeof (value) === 'object') {
                        allEmpty = allEmpty && this.isEmptyData(value);
                    }
                    else {
                        allEmpty = false;
                    }
                }
            }
            return allEmpty;
        }
        return true;
    }
    /**
     * Should we clear out optional, empty, complex objects?
     * @param clearEmpty False property if we simply want to skip it.
     * @param data The data to assess for "emptiness".
     * @param field The CaseField that will tell us if this is optional.
     */
    static clearOptionalEmpty(clearEmpty, data, field) {
        if (clearEmpty) {
            return FormValueService.isOptional(field) && FormValueService.isEmptyData(data);
        }
        return false;
    }
    sanitise(rawValue) {
        return this.sanitiseObject(rawValue);
    }
    sanitiseCaseReference(reference) {
        // strip non digits
        const s = reference.replace(/[\D]/g, '');
        if (s.length > 16) {
            return s.substr(s.length - 16, 16);
        }
        return s;
    }
    filterCurrentPageFields(caseFields, editForm) {
        const cloneForm = JSON.parse(JSON.stringify(editForm));
        Object.keys(cloneForm['data']).forEach((key) => {
            if (caseFields.findIndex((element) => element.id === key) < 0) {
                delete cloneForm['data'][key];
            }
        });
        return cloneForm;
    }
    sanitiseDynamicLists(caseFields, editForm) {
        return this.fieldTypeSanitiser.sanitiseLists(caseFields, editForm.data);
    }
    sanitiseObject(rawObject) {
        if (!rawObject) {
            return rawObject;
        }
        let sanitisedObject = {};
        const documentFieldKeys = ['document_url', 'document_binary_url', 'document_filename'];
        for (const key in rawObject) {
            // If the key is one of documentFieldKeys, it means the field is of Document type. If the value of any of these
            // properties is null, the entire sanitised object to be returned should be null
            if (documentFieldKeys.indexOf(key) > -1 && rawObject[key] === null) {
                sanitisedObject = null;
                break;
            }
            else if ('CaseReference' === key) {
                sanitisedObject[key] = this.sanitiseValue(this.sanitiseCaseReference(String(rawObject[key])));
            }
            else {
                sanitisedObject[key] = this.sanitiseValue(rawObject[key]);
                if (Array.isArray(sanitisedObject[key])) {
                    // If the 'sanitised' array is empty, whereas the original array had 1 or more items
                    // delete the property from the sanatised object
                    if (sanitisedObject[key].length === 0 && rawObject[key].length > 0) {
                        delete sanitisedObject[key];
                    }
                }
            }
        }
        return sanitisedObject;
    }
    sanitiseArray(rawArray) {
        if (!rawArray) {
            return rawArray;
        }
        rawArray.forEach(item => {
            if (item && item.hasOwnProperty('value')) {
                item.value = this.sanitiseValue(item.value);
            }
        });
        // Filter the array to ensure only truthy values are returned; double-bang operator returns the boolean true/false
        // association of a value. In addition, if the array contains items with a "value" object property, return only
        // those whose value object contains non-empty values, including for any descendant objects
        return rawArray
            .filter(item => !!item)
            .filter(item => item.hasOwnProperty('value') ? FieldsUtils.containsNonEmptyValues(item.value) : true);
    }
    sanitiseValue(rawValue) {
        if (Array.isArray(rawValue)) {
            return this.sanitiseArray(rawValue);
        }
        switch (typeof rawValue) {
            case 'object':
                return this.sanitiseObject(rawValue);
            case 'string':
                return rawValue.trim();
            case 'number':
                return String(rawValue);
            default:
                return rawValue;
        }
    }
    clearNonCaseFields(data, caseFields) {
        for (const dataKey in data) {
            if (!caseFields.find(cf => cf.id === dataKey)) {
                delete data[dataKey];
            }
        }
    }
    // TODO refactor so that this and remove unnecessary fields have a common iterator that applies functions to each node visited
    removeNullLabels(data, caseFields) {
        if (data && caseFields && caseFields.length > 0) {
            // check if there is any data at the top level of the form that's not in the caseFields
            for (const field of caseFields) {
                if (field.field_type) {
                    switch (field.field_type.type) {
                        case 'Label':
                            // Delete any labels that are null
                            if ((data[field.id] === null) || (data[field.id] === '')) {
                                delete data[field.id];
                            }
                            break;
                        case 'Complex':
                            // Recurse and remove anything unnecessary from within a complex field.
                            this.removeNullLabels(data[field.id], field.field_type.complex_fields);
                            break;
                        case 'Collection':
                            // Get hold of the collection.
                            const collection = data[field.id];
                            // Check if we actually have a collection to work with.
                            if (collection && Array.isArray(collection)) {
                                // If this is a collection of complex object, we need to iterate through
                                // and clear them out.
                                if (field.field_type.collection_field_type.type === 'Complex') {
                                    // Iterate through the elements and remove any unnecessary fields within.
                                    for (const item of collection) {
                                        this.removeNullLabels(item, field.field_type.collection_field_type.complex_fields);
                                        this.removeNullLabels(item.value, field.field_type.collection_field_type.complex_fields);
                                    }
                                }
                            }
                            break;
                        default:
                            break;
                    }
                }
            }
        }
    }
    // TODO refactor so that this and remove unnecessary fields have a common iterator that applies functions to each node visited
    removeEmptyDocuments(data, caseFields) {
        if (data && caseFields && caseFields.length > 0) {
            // check if there is any data at the top level of the form that's not in the caseFields
            for (const field of caseFields) {
                if (field.field_type) {
                    switch (field.field_type.type) {
                        case 'Complex':
                            // Recurse and remove any empty documents from within a complex field.
                            this.removeEmptyDocuments(data[field.id], field.field_type.complex_fields);
                            break;
                        case 'Collection':
                            // Get hold of the collection.
                            const collection = data[field.id];
                            // Check if we actually have a collection to work with.
                            if (collection && Array.isArray(collection)) {
                                // If this is a collection of complex object, we need to iterate through
                                // and clear out empty documents
                                if (field.field_type.collection_field_type.type === 'Complex') {
                                    // Iterate through the elements and remove any empty documents within.
                                    for (const item of collection) {
                                        this.removeEmptyDocuments(item, field.field_type.collection_field_type.complex_fields);
                                        this.removeEmptyDocuments(item.value, field.field_type.collection_field_type.complex_fields);
                                    }
                                }
                            }
                            break;
                        case 'Document':
                            // Ensure this is executed only if the Document field is NOT hidden and is empty of data; hidden Document
                            // fields are handled by the filterRawFormValues() function in CaseEditSubmit component
                            if (field.hidden !== true && FormValueService.isEmptyData(data[field.id])) {
                                delete data[field.id];
                            }
                            break;
                        default:
                            break;
                    }
                }
            }
        }
    }
    /**
     * Clear out unnecessary fields from a data object, based on an array of CaseFields.
     * This method is recursive and will call itself if it encounters particular field types.
     *
     * @param data The object to be tidied up.
     * @param caseFields The CaseFields that need to be cleaned up.
     * @param clearEmpty Whether or not we should clear out empty, optional, complex objects.
     * @param clearNonCase Whether or not we should clear out non-case fields at the top level.
     */
    removeUnnecessaryFields(data, caseFields, clearEmpty = false, clearNonCase = false, fromPreviousPage = false, currentPageCaseFields = []) {
        if (data && caseFields && caseFields.length > 0) {
            // check if there is any data at the top level of the form that's not in the caseFields
            if (clearNonCase) {
                this.clearNonCaseFields(data, caseFields);
            }
            for (const field of caseFields) {
                if (!FormValueService.isLabel(field) && FormValueService.isReadOnly(field)) {
                    // Retain anything that is readonly and not a label.
                    continue;
                }
                if (field.hidden === true && field.display_context !== 'HIDDEN' && field.id !== 'caseLinks') {
                    // Delete anything that is hidden (that is NOT readonly), and that
                    // hasn't had its display_context overridden to make it hidden.
                    delete data[field.id];
                }
                else if (field.field_type) {
                    switch (field.field_type.type) {
                        case 'Label':
                            // Delete any labels.
                            delete data[field.id];
                            break;
                        case 'Document':
                            if (FormValueService.isEmptyData(data[field.id])) {
                                delete data[field.id];
                            }
                            break;
                        case 'Complex':
                            this.removeUnnecessaryFields(data[field.id], field.field_type.complex_fields, clearEmpty);
                            // Also remove any optional complex objects that are completely empty.
                            // EUI-4244: Ritesh's fix, passing true instead of clearEmpty.
                            if (FormValueService.clearOptionalEmpty(true, data[field.id], field)) {
                                delete data[field.id];
                            }
                            if (data[field.id] && FormValueService.isEmptyData(data[field.id]) && fromPreviousPage
                                && currentPageCaseFields.findIndex((cField) => cField.id === field.id) === -1) {
                                delete data[field.id];
                            }
                            break;
                        case 'Collection':
                            // Check for valid collection data
                            this.removeInvalidCollectionData(data, field);
                            // Get hold of the collection.
                            const collection = data[field.id];
                            // Check if we actually have a collection to work with.
                            if (collection && Array.isArray(collection)) {
                                // If this is a collection of complex object, we need to iterate through
                                // and clear them out.
                                if (field.field_type.collection_field_type.type === 'Complex') {
                                    // Iterate through the elements and remove any unnecessary fields within.
                                    for (const item of collection) {
                                        this.removeUnnecessaryFields(item, field.field_type.collection_field_type.complex_fields, clearEmpty);
                                        this.removeUnnecessaryFields(item.value, field.field_type.collection_field_type.complex_fields, false);
                                    }
                                }
                            }
                            break;
                        default:
                            break;
                    }
                }
            }
        }
        // Clear out any MultiSelect labels.
        FormValueService.removeMultiSelectLabels(data);
    }
    removeInvalidCollectionData(data, field) {
        if (data[field.id] && data[field.id].length > 0) {
            for (const objCollection of data[field.id]) {
                if (Object.keys(objCollection).length === 1 && Object.keys(objCollection).indexOf('id') > -1) {
                    data[field.id] = [];
                }
            }
        }
    }
    /**
     * Remove any empty collection fields where a value of greater than zero is specified in the field's {@link FieldType}
     * `min` attribute.
     *
     * @param data The object tree of form values on which to perform the removal
     * @param caseFields The list of underlying {@link CaseField} domain model objects for each field
     */
    removeEmptyCollectionsWithMinValidation(data, caseFields) {
        if (data && caseFields && caseFields.length > 0) {
            for (const field of caseFields) {
                if (field.field_type.type === 'Collection' && field.field_type.min > 0 && data[field.id] &&
                    Array.isArray(data[field.id]) && data[field.id].length === 0) {
                    delete data[field.id];
                }
            }
        }
    }
    /**
     * Remove from the top level of the form data any case fields of a given type or types that are not intended to be
     * persisted. This function is intended to remove "special" case field types from the data, such as FlagLauncher or
     * ComponentLauncher fields.
     *
     * @param data The object tree of form values on which to perform the removal at the top level only
     * @param caseFields The list of underlying {@link CaseField} domain model objects for each field
     * @param types An array of one or more field types
     */
    removeCaseFieldsOfType(data, caseFields, types) {
        if (data && caseFields && caseFields.length > 0 && types.length > 0) {
            const caseFieldsToRemove = caseFields.filter(caseField => FieldsUtils.isCaseFieldOfType(caseField, types));
            for (const caseField of caseFieldsToRemove) {
                delete data[caseField.id];
            }
        }
    }
    /**
     * Re-populate the form data from the values held in the case fields. This is necessary in order to pick up, for
     * each `Flags` field, any flag details data not currently present.
     *
     * `Flags` fields may be contained in other `CaseField` instances, either as a sub-field of a Complex field, or
     * fields in a collection (or sub-fields of Complex fields in a collection). Therefore, it is necessary to
     * iterate through all `CaseField`s.
     *
     * @param data The object tree of form values on which to perform the data population
     * @param caseFields The list of underlying {@link CaseField} domain model objects for each field
     */
    repopulateFormDataFromCaseFieldValues(data, caseFields) {
        if (data && caseFields && caseFields.length > 0 &&
            caseFields.findIndex(caseField => FieldsUtils.isCaseFieldOfType(caseField, ['FlagLauncher'])) > -1) {
            // Ignore the FlagLauncher CaseField because it does not hold any values
            caseFields.filter(caseField => !FieldsUtils.isCaseFieldOfType(caseField, ['FlagLauncher']))
                .forEach(caseField => {
                // Ensure that the data object is populated for all CaseField keys it contains, even if for a given
                // CaseField key, the data object has a falsy value (hence the use of hasOwnProperty() for the check below)
                // See https://tools.hmcts.net/jira/browse/EUI-7377
                if (data.hasOwnProperty(caseField.id) && caseField.value) {
                    // Create new object for the CaseField ID within the data object, if necessary (i.e. if the current value
                    // is falsy)
                    if (!data[caseField.id]) {
                        data[caseField.id] = {};
                    }
                    // Copy all values from the corresponding CaseField; this ensures all nested flag data (for example, a
                    // Flags field within a Complex field or a collection of Complex fields) is copied across
                    Object.keys(data[caseField.id]).forEach(key => {
                        if (caseField.value.hasOwnProperty(key)) {
                            data[caseField.id][key] = caseField.value[key];
                        }
                    });
                }
            });
        }
    }
    /**
     * Populate the linked cases from the data held in its corresponding CaseField.
     *
     * @param data The object tree of form values on which to perform the data population
     * @param caseFields The list of underlying {@link CaseField} domain model objects for each field
     */
    populateLinkedCasesDetailsFromCaseFields(data, caseFields) {
        if (data && caseFields && caseFields.length > 0) {
            caseFields.filter(caseField => !FieldsUtils.isCaseFieldOfType(caseField, ['ComponentLauncher']))
                .forEach(caseField => {
                if (data.hasOwnProperty('caseLinks') && caseField.value) {
                    data[caseField.id] = caseField.value;
                }
            });
        }
    }
}
FormValueService.ɵfac = function FormValueService_Factory(t) { return new (t || FormValueService)(i0.ɵɵinject(i1.FieldTypeSanitiser)); };
FormValueService.ɵprov = /*@__PURE__*/ i0.ɵɵdefineInjectable({ token: FormValueService, factory: FormValueService.ɵfac });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(FormValueService, [{
        type: Injectable
    }], function () { return [{ type: i1.FieldTypeSanitiser }]; }, null); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9ybS12YWx1ZS5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvY2NkLWNhc2UtdWktdG9vbGtpdC9zcmMvbGliL3NoYXJlZC9zZXJ2aWNlcy9mb3JtL2Zvcm0tdmFsdWUuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRzNDLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxXQUFXLENBQUM7QUFDeEMsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0sd0JBQXdCLENBQUM7OztBQUc1RCxNQUFNLE9BQU8sZ0JBQWdCO0lBOEwzQixZQUE2QixrQkFBc0M7UUFBdEMsdUJBQWtCLEdBQWxCLGtCQUFrQixDQUFvQjtJQUNuRSxDQUFDO0lBOUxEOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7T0FtR0c7SUFDSSxNQUFNLENBQUMsYUFBYSxDQUFDLElBQUksRUFBRSxRQUFRLEVBQUUsUUFBUTtRQUNsRCxNQUFNLFFBQVEsR0FBRyxRQUFRLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ3JDLE1BQU0sY0FBYyxHQUFHLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNuQyxNQUFNLFdBQVcsR0FBRyxJQUFJLENBQUMsY0FBYyxDQUFDLENBQUM7UUFDekMsSUFBSSxXQUFXLENBQUMsa0JBQWtCLENBQUMsV0FBVyxDQUFDLEVBQUU7WUFDL0MsT0FBTyxJQUFJLENBQUMsY0FBYyxHQUFHLFdBQVcsQ0FBQyxZQUFZLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7U0FDbkU7YUFBTSxJQUFJLFdBQVcsQ0FBQyx5QkFBeUIsQ0FBQyxXQUFXLENBQUMsRUFB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RUFBRSxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsU0FBUyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQzt5QkFDaEQ7b0JBQ0gsQ0FBQyxDQUFDLENBQUM7aUJBQ0o7WUFDSCxDQUFDLENBQUMsQ0FBQztTQUNOO0lBQ0gsQ0FBQztJQUVEOzs7OztPQUtHO0lBQ0ksd0NBQXdDLENBQUMsSUFBWSxFQUFFLFVBQXVCO1FBQ25GLElBQUksSUFBSSxJQUFJLFVBQVUsSUFBSSxVQUFVLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRTtZQUMvQyxVQUFVLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxXQUFXLENBQUMsaUJBQWlCLENBQUMsU0FBUyxFQUFFLENBQUMsbUJBQW1CLENBQUMsQ0FBQyxDQUFDO2lCQUM3RixPQUFPLENBQUMsU0FBUyxDQUFDLEVBQUU7Z0JBQ25CLElBQUksSUFBSSxDQUFDLGNBQWMsQ0FBQyxXQUFXLENBQUMsSUFBSSxTQUFTLENBQUMsS0FBSyxFQUFFO29CQUN2RCxJQUFJLENBQUMsU0FBUyxDQUFDLEVBQUUsQ0FBQyxHQUFHLFNBQVMsQ0FBQyxLQUFLLENBQUM7aUJBQ3RDO1lBQ0gsQ0FBQyxDQUFDLENBQUM7U0FDTjtJQUNILENBQUM7O2dGQXRpQlUsZ0JBQWdCO3NFQUFoQixnQkFBZ0IsV0FBaEIsZ0JBQWdCO3VGQUFoQixnQkFBZ0I7Y0FENUIsVUFBVSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHsgQ2FzZUZpZWxkLCBGaWVsZFR5cGVFbnVtIH0gZnJvbSAnLi4vLi4vZG9tYWluJztcbmltcG9ydCB7IEZpZWxkc1V0aWxzIH0gZnJvbSAnLi4vZmllbGRzJztcbmltcG9ydCB7IEZpZWxkVHlwZVNhbml0aXNlciB9IGZyb20gJy4vZmllbGQtdHlwZS1zYW5pdGlzZXInO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgRm9ybVZhbHVlU2VydmljZSB7XG4gIC8qKlxuICAgKiBHZXRzIHZhbHVlIG9mIGEgZmllbGQgYmFzZWQgb24gZmllbGRLZXkgd2hpY2ggaXMgYSBkb3Qgc2VwYXJhdGVkIHJlZmVyZW5jZSB0byB2YWx1ZSBhbmQgY29sbGVjdGlvbiBpbmRleC5cbiAgICogVGhlcmUgYXJlIHR3byBleGNlcHRpb25zOlxuICAgKiAxKSBJbiBjYXNlIG9mIGEgbXVsdGlzZWxlY3QgYmVpbmcgaWRlbnRpZmllZCBhcyBhIGxlYWYgYSAnLS0tTEFCRUwnIHN1ZmZpeCBpcyBhcHBlbmRlZCB0byB0aGUga2V5IGFuZCB2YWx1ZXMgb2YgdGhhdCBrZXkgYXJlIHJldHVybmVkXG4gICAqICAgICAgZm9ybT0geyAnbGlzdCc6IFsnY29kZTEnLCAnY29kZTInXSxcbiAgICogICAgICAgICAgICAgICdsaXN0LS0tTEFCRUwnOiBbJ2xhYmVsMScsICdsYWJlbDInXSB9LFxuICAgKiAgICAgIGZpZWxkS2V5PWxpc3QsXG4gICAqICAgICAgY29sSW5kZXg9MCxcbiAgICogICAgICB2YWx1ZT1sYWJlbDEsIGxhYmVsMlxuICAgKiAyKSBJbiBjYXNlIG9mIGEgY29sbGVjdGlvbiBvZiBzaW1wbGUgZmllbGRzIGlzIGlkZW50aWZpZWQgYXMgYSBsZWFmIGFsbCB2YWx1ZXMgYXJlIGpvaW5lZCBzZXBlcmF0ZWQgYnkgYSBjb21tYVxuICAgKiAgICAgIGZvcm09IHsgJ2NvbGxlY3Rpb24nOiBbeyAndmFsdWUnOiAndmFsdWUxJyB9LCB7ICd2YWx1ZSc6ICd2YWx1ZTInIH1dIH1cbiAgICogICAgICBmaWVsZEtleT1jb2xsZWN0aW9uXG4gICAqICAgICAgY29sSW5kZXg9MVxuICAgKiAgICAgIHZhbHVlPXZhbHVlMSwgdmFsdWUyXG4gICAqXG4gICAqIE90aGVyIGV4YW1wbGVzOlxuICAgKiAxKSBzaW1wbGUgZmllbGQgcmVmZXJlbmNlOiBmb3JtPXsgJ1BlcnNvbkZpcnN0TmFtZSc6ICdKb2huJyB9LCBmaWVsZEtleT1QZXJzb25GaXJzdE5hbWUsIHZhbHVlPUpvaG5cbiAgICogMikgY29tcGxleCBmaWVsZCByZWZlcmVuY2U6XG4gICAqICAgICAgZm9ybT0geyBjb21wbGV4MSc6IHsgJ3NpbXBsZTExJzogJ3ZhbHVlMTEnLCAnc2ltcGxlMTInOiAndmFsdWUxMicsICdjb21wbGV4Mic6IHsgJ3NpbXBsZTIxJzogJ3ZhbHVlMjEnIH0gfX0sXG4gICAqICAgICAgZmllbGRLZXk9Y29tcGxleDEuY29tcGxleDIuc2ltcGxlMjFcbiAgICogICAgICBjb2xJbmRleD0wLFxuICAgKiAgICAgIHZhbHVlPXZhbHVlMjFcbiAgICogMykgY29tcGxleCBmaWVsZCB3aXRoIGNvbGxlY3Rpb24gZmllbGQgd2l0aCBjb21wbGV4IGZpZWxkIHJlZmVyZW5jZTpcbiAgICogICAgICBmb3JtPSB7ICdjb21wbGV4MSc6IHtcbiAgICogICAgICAgICAgICAgICAnY29sbGVjdGlvbjEnOiBbXG4gICAqICAgICAgICAgICAgICAgeyAndmFsdWUnOiB7XG4gICAqICAgICAgICAgICAgICAgICAgICdjb21wbGV4Mic6IHtcbiAgICogICAgICAgICAgICAgICAgICAgICAnc2ltcGxlMSc6ICd2YWx1ZTEnLFxuICAgKiAgICAgICAgICAgICAgICAgICAgICdjb21wbGV4Myc6IHtcbiAgICogICAgICAgICAgICAgICAgICAgICAgICdjb21wbGV4NCc6IHtcbiAgICogICAgICAgICAgICAgICAgICAgICAgICAgJ3NpbXBsZTInOiAndmFsdWUxMidcbiAgICogICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICogICAgICAgICAgICAgICAgICAgICB9XG4gICAqICAgICAgICAgICAgICAgICAgIH1cbiAgICogICAgICAgICAgICAgICAgIH1cbiAgICogICAgICAgICAgICAgICB9LFxuICAgKiAgICAgICAgICAgICAgIHsgJ3ZhbHVlJzoge1xuICAgKiAgICAgICAgICAgICAgICAgICAnY29tcGxleDInOiB7XG4gICAqICAgICAgICAgICAgICAgICAgICAgJ3NpbXBsZTEnOiAndmFsdWUyJyxcbiAgICogICAgICAgICAgICAgICAgICAgICAnY29tcGxleDMnOiB7XG4gICAqICAgICAgICAgICAgICAgICAgICAgICAnY29tcGxleDQnOiB7XG4gICAqICAgICAgICAgICAgICAgICAgICAgICAgICdzaW1wbGUyJzogJ3ZhbHVlMjEnXG4gICAqICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAqICAgICAgICAgICAgICAgICAgICAgfVxuICAgKiAgICAgICAgICAgICAgICAgICB9XG4gICAqICAgICAgICAgICAgICAgICB9XG4gICAqICAgICAgICAgICAgICAgfSxcbiAgICogICAgICAgICAgICAgICB7ICd2YWx1ZSc6IHtcbiAgICogICAgICAgICAgICAgICAgICAgJ2NvbXBsZXgyJzoge1xuICAgKiAgICAgICAgICAgICAgICAgICAgICdzaW1wbGUxJzogJ3ZhbHVlMycsXG4gICAqICAgICAgICAgICAgICAgICAgICAgJ2NvbXBsZXgzJzoge1xuICAgKiAgICAgICAgICAgICAgICAgICAgICAgJ2NvbXBsZXg0Jzoge1xuICAgKiAgICAgICAgICAgICAgICAgICAgICAgICAnc2ltcGxlMic6ICd2YWx1ZTMxJ1xuICAgKiAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgKiAgICAgICAgICAgICAgICAgICAgIH1cbiAgICogICAgICAgICAgICAgICAgICAgfVxuICAgKiAgICAgICAgICAgICAgICAgfVxuICAgKiAgICAgICAgICAgICAgIH1cbiAgICogICAgICAgICAgICAgXX19XG4gICAqICAgICAgZmllbGRLZXk9Y29tcGxleDEuY29sbGVjdGlvbjEuY29tcGxleDIuY29tcGxleDMuY29tcGxleDQuc2ltcGxlMlxuICAgKiAgICAgIGNvbEluZGV4PTIsXG4gICAqICAgICAgdmFsdWU9dmFsdWUyMVxuICAgKiA0KSBjb2xsZWN0aW9uIG9mIGNvbXBsZXggdHlwZXNcbiAgICogICAgICBmb3JtPSB7ICdjb2xsZWN0aW9uMSc6IFtcbiAgICogICAgICAgICAgICAgICB7ICd2YWx1ZSc6IHsnY29tcGxleDEnOiB7XG4gICAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAnc2ltcGxlMSc6ICd2YWx1ZTExJyxcbiAgICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICdjb21wbGV4Mic6IHtcbiAgICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJ2NvbXBsZXgzJzoge1xuICAgKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICdzaW1wbGUyJzogJ3ZhbHVlMTInXG4gICAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICogICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICogICAgICAgICAgICAgICAgICAgICAgICAgfX1cbiAgICogICAgICAgICAgICAgICB9LFxuICAgKiAgICAgICAgICAgICAgIHsgJ3ZhbHVlJzogeydjb21wbGV4MSc6IHtcbiAgICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICdzaW1wbGUxJzogJ3ZhbHVlMjEnLFxuICAgKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJ2NvbXBsZXgyJzoge1xuICAgKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAnY29tcGxleDMnOiB7XG4gICAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJ3NpbXBsZTInOiAndmFsdWUyMidcbiAgICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgKiAgICAgICAgICAgICAgICAgICAgICAgICB9fVxuICAgKiAgICAgICAgICAgICAgIH0sXG4gICAqICAgICAgICAgICAgICAgeyAndmFsdWUnOiB7J2NvbXBsZXgxJzoge1xuICAgKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJ3NpbXBsZTEnOiAndmFsdWUzMScsXG4gICAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAnY29tcGxleDInOiB7XG4gICAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICdjb21wbGV4Myc6IHtcbiAgICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAnc2ltcGxlMic6ICd2YWx1ZTMyJ1xuICAgKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAqICAgICAgICAgICAgICAgICAgICAgICAgICAgfX1cbiAgICogICAgICAgICAgICAgICB9XG4gICAqICAgICAgICAgICAgIF19XG4gICAqICAgICAgZmllbGRLZXk9Y29sbGVjdGlvbjEuY29tcGxleDEuY29tcGxleDIuY29tcGxleDMuc2ltcGxlMlxuICAgKiAgICAgIGNvbEluZGV4PTJcbiAgICogICAgICB2YWx1ZT12YWx1ZTMyXG4gICAqXG4gICAqIElmIGtleSBpcyBwb2ludGluZyBhdCBhIGNvbXBsZXggb3IgY29sbGVjdGlvbiBsZWFmIChub3Qgc2ltcGxlLCBjb2xsZWN0aW9uIG9mIHNpbXBsZSBvciBtdWx0aXNlbGVjdCB0eXBlcykgdGhlbiB1bmRlZmluZWQgaXMgcmV0dXJuZWQuXG4gICAqIEFsc28gbm8ga2V5IHJlZmVycmluZyBhIGxlYWYgdGhhdCBpcyBjb250YWluZWQgd2l0aGluIGNvbGxlY3Rpb24gd2lsbCBjb250YWluIGluZGV4IG51bWJlci4gVGhlIGluZGV4IGlzIHBhc3NlZCBhcyBhbiBhcmd1bWVudCB0byB0aGVcbiAgICogbWV0aG9kLlxuICAgKi9cbiAgcHVibGljIHN0YXRpYyBnZXRGaWVsZFZhbHVlKGZvcm0sIGZpZWxkS2V5LCBjb2xJbmRleCkge1xuICAgIGNvbnN0IGZpZWxkSWRzID0gZmllbGRLZXkuc3BsaXQoJy4nKTtcbiAgICBjb25zdCBjdXJyZW50RmllbGRJZCA9IGZpZWxkSWRzWzBdO1xuICAgIGNvbnN0IGN1cnJlbnRGb3JtID0gZm9ybVtjdXJyZW50RmllbGRJZF07XG4gICAgaWYgKEZpZWxkc1V0aWxzLmlzTXVsdGlTZWxlY3RWYWx1ZShjdXJyZW50Rm9ybSkpIHtcbiAgICAgIHJldHVybiBmb3JtW2N1cnJlbnRGaWVsZElkICsgRmllbGRzVXRpbHMuTEFCRUxfU1VGRklYXS5qb2luKCcsICcpO1xuICAgIH0gZWxzZSBpZiAoRmllbGRzVXRpbHMuaXNDb2xsZWN0aW9uT2ZTaW1wbGVUeXBlcyhjdXJyZW50Rm9ybSkpIHtcbiAgICAgIHJldHVybiBjdXJyZW50Rm9ybS5tYXAoZmllbGRWYWx1ZSA9PiBmaWVsZFZhbHVlWyd2YWx1ZSddKS5qb2luKCcsICcpO1xuICAgIH0gZWxzZSBpZiAoRmllbGRzVXRpbHMuaXNDb2xsZWN0aW9uKGN1cnJlbnRGb3JtKSkge1xuICAgICAgcmV0dXJuIHRoaXMuZ2V0RmllbGRWYWx1ZShjdXJyZW50Rm9ybVtjb2xJbmRleF1bJ3ZhbHVlJ10sIGZpZWxkSWRzLnNsaWNlKDEpLmpvaW4oJy4nKSwgY29sSW5kZXgpO1xuICAgIH0gZWxzZSBpZiAoRmllbGRzVXRpbHMuaXNOb25FbXB0eU9iamVjdChjdXJyZW50Rm9ybSkpIHtcbiAgICAgIHJldHVybiB0aGlzLmdldEZpZWxkVmFsdWUoY3VycmVudEZvcm0sIGZpZWxkSWRzLnNsaWNlKDEpLmpvaW4oJy4nKSwgY29sSW5kZXgpO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gY3VycmVudEZvcm07XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEEgcmVjdXJzaXZlIG1ldGhvZCB0byByZW1vdmUgYW55dGhpbmcgd2l0aCBhIGAtLS1MQUJFTGAgc3VmZml4LlxuICAgKiBAcGFyYW0gZGF0YSBUaGUgZGF0YSB0byByZWN1cnNlIHRocm91Z2ggYW5kIHJlbW92ZSBNdWx0aVNlbGVjdCBsYWJlbHMuXG4gICAqL1xuICBwdWJsaWMgc3RhdGljIHJlbW92ZU11bHRpU2VsZWN0TGFiZWxzKGRhdGE6IGFueSk6IHZvaWQge1xuICAgIGlmIChkYXRhICYmIHR5cGVvZiBkYXRhID09PSAnb2JqZWN0Jykge1xuICAgICAgaWYgKEFycmF5LmlzQXJyYXkoZGF0YSkpIHtcbiAgICAgICAgZm9yIChjb25zdCBpdGVtIG9mIGRhdGEpIHtcbiAgICAgICAgICBGb3JtVmFsdWVTZXJ2aWNlLnJlbW92ZU11bHRpU2VsZWN0TGFiZWxzKGl0ZW0pO1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjb25zdCBrZXlzOiBzdHJpbmdbXSA9IE9iamVjdC5rZXlzKGRhdGEpO1xuICAgICAgICBmb3IgKGNvbnN0IGtleSBvZiBrZXlzKSB7XG4gICAgICAgICAgLy8gSGF2ZSB3ZSBmb3VuZCBvbmUgYSBNdWx0aVNlbGVjdCBsYWJlbD9cbiAgICAgICAgICBpZiAoa2V5LmluZGV4T2YoRmllbGRzVXRpbHMuTEFCRUxfU1VGRklYKSA+IDApIHtcbiAgICAgICAgICAgIC8vIElmIHNvLCByZW1vdmUgaXQuXG4gICAgICAgICAgICBkZWxldGUgZGF0YVtrZXldO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBGb3JtVmFsdWVTZXJ2aWNlLnJlbW92ZU11bHRpU2VsZWN0TGFiZWxzKGRhdGFba2V5XSk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBzdGF0aWMgaXNSZWFkT25seShmaWVsZDogQ2FzZUZpZWxkKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIGZpZWxkLmRpc3BsYXlfY29udGV4dCA/IGZpZWxkLmRpc3BsYXlfY29udGV4dC50b1VwcGVyQ2FzZSgpID09PSAnUkVBRE9OTFknIDogZmFsc2U7XG4gIH1cblxuICBwcml2YXRlIHN0YXRpYyBpc09wdGlvbmFsKGZpZWxkOiBDYXNlRmllbGQpOiBib29sZWFuIHtcbiAgICByZXR1cm4gZmllbGQuZGlzcGxheV9jb250ZXh0ID8gZmllbGQuZGlzcGxheV9jb250ZXh0LnRvVXBwZXJDYXNlKCkgPT09ICdPUFRJT05BTCcgOiBmYWxzZTtcbiAgfVxuXG4gIHByaXZhdGUgc3RhdGljIGlzTGFiZWwoZmllbGQ6IENhc2VGaWVsZCk6IGJvb2xlYW4ge1xuICAgIGlmIChmaWVsZC5maWVsZF90eXBlKSB7XG4gICAgICByZXR1cm4gZmllbGQuZmllbGRfdHlwZS50eXBlID09PSAnTGFiZWwnO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBzdGF0aWMgaXNFbXB0eURhdGEoZGF0YTogb2JqZWN0KTogYm9vbGVhbiB7XG4gICAgaWYgKGRhdGEpIHtcbiAgICAgIGxldCBhbGxFbXB0eSA9IHRydWU7XG4gICAgICBmb3IgKGNvbnN0IHByb3Agb2YgT2JqZWN0LmtleXMoZGF0YSkpIHtcbiAgICAgICAgY29uc3QgdmFsdWUgPSBkYXRhW3Byb3BdO1xuICAgICAgICBpZiAodmFsdWUpIHtcbiAgICAgICAgICBpZiAodHlwZW9mICh2YWx1ZSkgPT09ICdvYmplY3QnKSB7XG4gICAgICAgICAgICBhbGxFbXB0eSA9IGFsbEVtcHR5ICYmIHRoaXMuaXNFbXB0eURhdGEodmFsdWUpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBhbGxFbXB0eSA9IGZhbHNlO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgcmV0dXJuIGFsbEVtcHR5O1xuICAgIH1cbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTaG91bGQgd2UgY2xlYXIgb3V0IG9wdGlvbmFsLCBlbXB0eSwgY29tcGxleCBvYmplY3RzP1xuICAgKiBAcGFyYW0gY2xlYXJFbXB0eSBGYWxzZSBwcm9wZXJ0eSBpZiB3ZSBzaW1wbHkgd2FudCB0byBza2lwIGl0LlxuICAgKiBAcGFyYW0gZGF0YSBUaGUgZGF0YSB0byBhc3Nlc3MgZm9yIFwiZW1wdGluZXNzXCIuXG4gICAqIEBwYXJhbSBmaWVsZCBUaGUgQ2FzZUZpZWxkIHRoYXQgd2lsbCB0ZWxsIHVzIGlmIHRoaXMgaXMgb3B0aW9uYWwuXG4gICAqL1xuICBwcml2YXRlIHN0YXRpYyBjbGVhck9wdGlvbmFsRW1wdHkoY2xlYXJFbXB0eTogYm9vbGVhbiwgZGF0YTogb2JqZWN0LCBmaWVsZDogQ2FzZUZpZWxkKTogYm9vbGVhbiB7XG4gICAgaWYgKGNsZWFyRW1wdHkpIHtcbiAgICAgIHJldHVybiBGb3JtVmFsdWVTZXJ2aWNlLmlzT3B0aW9uYWwoZmllbGQpICYmIEZvcm1WYWx1ZVNlcnZpY2UuaXNFbXB0eURhdGEoZGF0YSk7XG4gICAgfVxuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgcmVhZG9ubHkgZmllbGRUeXBlU2FuaXRpc2VyOiBGaWVsZFR5cGVTYW5pdGlzZXIpIHtcbiAgfVxuXG4gIHB1YmxpYyBzYW5pdGlzZShyYXdWYWx1ZTogb2JqZWN0KTogb2JqZWN0IHtcbiAgICByZXR1cm4gdGhpcy5zYW5pdGlzZU9iamVjdChyYXdWYWx1ZSk7XG4gIH1cblxuICBwdWJsaWMgc2FuaXRpc2VDYXNlUmVmZXJlbmNlKHJlZmVyZW5jZTogc3RyaW5nKTogc3RyaW5nIHtcbiAgICAvLyBzdHJpcCBub24gZGlnaXRzXG4gICAgY29uc3Qgczogc3RyaW5nID0gcmVmZXJlbmNlLnJlcGxhY2UoL1tcXERdL2csICcnKTtcbiAgICBpZiAocy5sZW5ndGggPiAxNikge1xuICAgICAgcmV0dXJuIHMuc3Vic3RyKHMubGVuZ3RoIC0gMTYsIDE2KTtcbiAgICB9XG4gICAgcmV0dXJuIHM7XG4gIH1cblxuICBwdWJsaWMgZmlsdGVyQ3VycmVudFBhZ2VGaWVsZHMoY2FzZUZpZWxkczogQ2FzZUZpZWxkW10sIGVkaXRGb3JtOiBhbnkpOiBhbnkge1xuICAgIGNvbnN0IGNsb25lRm9ybSA9IEpTT04ucGFyc2UoSlNPTi5zdHJpbmdpZnkoZWRpdEZvcm0pKTtcbiAgICBPYmplY3Qua2V5cyhjbG9uZUZvcm1bJ2RhdGEnXSkuZm9yRWFjaCgoa2V5KSA9PiB7XG4gICAgICBpZiAoY2FzZUZpZWxkcy5maW5kSW5kZXgoKGVsZW1lbnQpID0+IGVsZW1lbnQuaWQgPT09IGtleSkgPCAwKSB7XG4gICAgICAgIGRlbGV0ZSBjbG9uZUZvcm1bJ2RhdGEnXVtrZXldO1xuICAgICAgfVxuICAgIH0pO1xuICAgIHJldHVybiBjbG9uZUZvcm07XG4gIH1cblxuICBwdWJsaWMgc2FuaXRpc2VEeW5hbWljTGlzdHMoY2FzZUZpZWxkczogQ2FzZUZpZWxkW10sIGVkaXRGb3JtOiBhbnkpOiBhbnkge1xuICAgIHJldHVybiB0aGlzLmZpZWxkVHlwZVNhbml0aXNlci5zYW5pdGlzZUxpc3RzKGNhc2VGaWVsZHMsIGVkaXRGb3JtLmRhdGEpO1xuICB9XG5cbiAgcHJpdmF0ZSBzYW5pdGlzZU9iamVjdChyYXdPYmplY3Q6IG9iamVjdCk6IG9iamVjdCB7XG4gICAgaWYgKCFyYXdPYmplY3QpIHtcbiAgICAgIHJldHVybiByYXdPYmplY3Q7XG4gICAgfVxuXG4gICAgbGV0IHNhbml0aXNlZE9iamVjdCA9IHt9O1xuICAgIGNvbnN0IGRvY3VtZW50RmllbGRLZXlzID0gWydkb2N1bWVudF91cmwnLCAnZG9jdW1lbnRfYmluYXJ5X3VybCcsICdkb2N1bWVudF9maWxlbmFtZSddO1xuICAgIGZvciAoY29uc3Qga2V5IGluIHJhd09iamVjdCkge1xuICAgICAgLy8gSWYgdGhlIGtleSBpcyBvbmUgb2YgZG9jdW1lbnRGaWVsZEtleXMsIGl0IG1lYW5zIHRoZSBmaWVsZCBpcyBvZiBEb2N1bWVudCB0eXBlLiBJZiB0aGUgdmFsdWUgb2YgYW55IG9mIHRoZXNlXG4gICAgICAvLyBwcm9wZXJ0aWVzIGlzIG51bGwsIHRoZSBlbnRpcmUgc2FuaXRpc2VkIG9iamVjdCB0byBiZSByZXR1cm5lZCBzaG91bGQgYmUgbnVsbFxuICAgICAgaWYgKGRvY3VtZW50RmllbGRLZXlzLmluZGV4T2Yoa2V5KSA+IC0xICYmIHJhd09iamVjdFtrZXldID09PSBudWxsKSB7XG4gICAgICAgIHNhbml0aXNlZE9iamVjdCA9IG51bGw7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfSBlbHNlIGlmICgnQ2FzZVJlZmVyZW5jZScgPT09IGtleSkge1xuICAgICAgICBzYW5pdGlzZWRPYmplY3Rba2V5XSA9IHRoaXMuc2FuaXRpc2VWYWx1ZSh0aGlzLnNhbml0aXNlQ2FzZVJlZmVyZW5jZShTdHJpbmcocmF3T2JqZWN0W2tleV0pKSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBzYW5pdGlzZWRPYmplY3Rba2V5XSA9IHRoaXMuc2FuaXRpc2VWYWx1ZShyYXdPYmplY3Rba2V5XSk7XG4gICAgICAgIGlmIChBcnJheS5pc0FycmF5KHNhbml0aXNlZE9iamVjdFtrZXldKSkge1xuICAgICAgICAgIC8vIElmIHRoZSAnc2FuaXRpc2VkJyBhcnJheSBpcyBlbXB0eSwgd2hlcmVhcyB0aGUgb3JpZ2luYWwgYXJyYXkgaGFkIDEgb3IgbW9yZSBpdGVtc1xuICAgICAgICAgIC8vIGRlbGV0ZSB0aGUgcHJvcGVydHkgZnJvbSB0aGUgc2FuYXRpc2VkIG9iamVjdFxuICAgICAgICAgIGlmIChzYW5pdGlzZWRPYmplY3Rba2V5XS5sZW5ndGggPT09IDAgJiYgcmF3T2JqZWN0W2tleV0ubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgZGVsZXRlIHNhbml0aXNlZE9iamVjdFtrZXldO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gc2FuaXRpc2VkT2JqZWN0O1xuICB9XG5cbiAgcHJpdmF0ZSBzYW5pdGlzZUFycmF5KHJhd0FycmF5OiBhbnlbXSk6IGFueVtdIHtcbiAgICBpZiAoIXJhd0FycmF5KSB7XG4gICAgICByZXR1cm4gcmF3QXJyYXk7XG4gICAgfVxuXG4gICAgcmF3QXJyYXkuZm9yRWFjaChpdGVtID0+IHtcbiAgICAgIGlmIChpdGVtICYmIGl0ZW0uaGFzT3duUHJvcGVydHkoJ3ZhbHVlJykpIHtcbiAgICAgICAgaXRlbS52YWx1ZSA9IHRoaXMuc2FuaXRpc2VWYWx1ZShpdGVtLnZhbHVlKTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIC8vIEZpbHRlciB0aGUgYXJyYXkgdG8gZW5zdXJlIG9ubHkgdHJ1dGh5IHZhbHVlcyBhcmUgcmV0dXJuZWQ7IGRvdWJsZS1iYW5nIG9wZXJhdG9yIHJldHVybnMgdGhlIGJvb2xlYW4gdHJ1ZS9mYWxzZVxuICAgIC8vIGFzc29jaWF0aW9uIG9mIGEgdmFsdWUuIEluIGFkZGl0aW9uLCBpZiB0aGUgYXJyYXkgY29udGFpbnMgaXRlbXMgd2l0aCBhIFwidmFsdWVcIiBvYmplY3QgcHJvcGVydHksIHJldHVybiBvbmx5XG4gICAgLy8gdGhvc2Ugd2hvc2UgdmFsdWUgb2JqZWN0IGNvbnRhaW5zIG5vbi1lbXB0eSB2YWx1ZXMsIGluY2x1ZGluZyBmb3IgYW55IGRlc2NlbmRhbnQgb2JqZWN0c1xuICAgIHJldHVybiByYXdBcnJheVxuICAgICAgLmZpbHRlcihpdGVtID0+ICEhaXRlbSlcbiAgICAgIC5maWx0ZXIoaXRlbSA9PiBpdGVtLmhhc093blByb3BlcnR5KCd2YWx1ZScpID8gRmllbGRzVXRpbHMuY29udGFpbnNOb25FbXB0eVZhbHVlcyhpdGVtLnZhbHVlKSA6IHRydWUpO1xuICB9XG5cbiAgcHJpdmF0ZSBzYW5pdGlzZVZhbHVlKHJhd1ZhbHVlOiBhbnkpOiBhbnkge1xuICAgIGlmIChBcnJheS5pc0FycmF5KHJhd1ZhbHVlKSkge1xuICAgICAgcmV0dXJuIHRoaXMuc2FuaXRpc2VBcnJheShyYXdWYWx1ZSk7XG4gICAgfVxuXG4gICAgc3dpdGNoICh0eXBlb2YgcmF3VmFsdWUpIHtcbiAgICAgIGNhc2UgJ29iamVjdCc6XG4gICAgICAgIHJldHVybiB0aGlzLnNhbml0aXNlT2JqZWN0KHJhd1ZhbHVlKTtcbiAgICAgIGNhc2UgJ3N0cmluZyc6XG4gICAgICAgIHJldHVybiByYXdWYWx1ZS50cmltKCk7XG4gICAgICBjYXNlICdudW1iZXInOlxuICAgICAgICByZXR1cm4gU3RyaW5nKHJhd1ZhbHVlKTtcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIHJldHVybiByYXdWYWx1ZTtcbiAgICB9XG4gIH1cblxuICBwdWJsaWMgY2xlYXJOb25DYXNlRmllbGRzKGRhdGE6IG9iamVjdCwgY2FzZUZpZWxkczogQ2FzZUZpZWxkW10pIHtcbiAgICBmb3IgKGNvbnN0IGRhdGFLZXkgaW4gZGF0YSkge1xuICAgICAgaWYgKCFjYXNlRmllbGRzLmZpbmQoY2YgPT4gY2YuaWQgPT09IGRhdGFLZXkpKSB7XG4gICAgICAgIGRlbGV0ZSBkYXRhW2RhdGFLZXldO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIC8vIFRPRE8gcmVmYWN0b3Igc28gdGhhdCB0aGlzIGFuZCByZW1vdmUgdW5uZWNlc3NhcnkgZmllbGRzIGhhdmUgYSBjb21tb24gaXRlcmF0b3IgdGhhdCBhcHBsaWVzIGZ1bmN0aW9ucyB0byBlYWNoIG5vZGUgdmlzaXRlZFxuICBwdWJsaWMgcmVtb3ZlTnVsbExhYmVscyhkYXRhOiBvYmplY3QsIGNhc2VGaWVsZHM6IENhc2VGaWVsZFtdKSB7XG4gICAgaWYgKGRhdGEgJiYgY2FzZUZpZWxkcyAmJiBjYXNlRmllbGRzLmxlbmd0aCA+IDApIHtcbiAgICAgIC8vIGNoZWNrIGlmIHRoZXJlIGlzIGFueSBkYXRhIGF0IHRoZSB0b3AgbGV2ZWwgb2YgdGhlIGZvcm0gdGhhdCdzIG5vdCBpbiB0aGUgY2FzZUZpZWxkc1xuICAgICAgZm9yIChjb25zdCBmaWVsZCBvZiBjYXNlRmllbGRzKSB7XG4gICAgICAgIGlmIChmaWVsZC5maWVsZF90eXBlKSB7XG4gICAgICAgICAgc3dpdGNoIChmaWVsZC5maWVsZF90eXBlLnR5cGUpIHtcbiAgICAgICAgICAgIGNhc2UgJ0xhYmVsJzpcbiAgICAgICAgICAgICAgLy8gRGVsZXRlIGFueSBsYWJlbHMgdGhhdCBhcmUgbnVsbFxuICAgICAgICAgICAgICBpZiAoKGRhdGFbZmllbGQuaWRdID09PSBudWxsKSB8fCAoZGF0YVtmaWVsZC5pZF0gPT09ICcnKSkge1xuICAgICAgICAgICAgICAgIGRlbGV0ZSBkYXRhW2ZpZWxkLmlkXTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgJ0NvbXBsZXgnOlxuICAgICAgICAgICAgICAvLyBSZWN1cnNlIGFuZCByZW1vdmUgYW55dGhpbmcgdW5uZWNlc3NhcnkgZnJvbSB3aXRoaW4gYSBjb21wbGV4IGZpZWxkLlxuICAgICAgICAgICAgICB0aGlzLnJlbW92ZU51bGxMYWJlbHMoZGF0YVtmaWVsZC5pZF0sIGZpZWxkLmZpZWxkX3R5cGUuY29tcGxleF9maWVsZHMpO1xuICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgJ0NvbGxlY3Rpb24nOlxuICAgICAgICAgICAgICAvLyBHZXQgaG9sZCBvZiB0aGUgY29sbGVjdGlvbi5cbiAgICAgICAgICAgICAgY29uc3QgY29sbGVjdGlvbiA9IGRhdGFbZmllbGQuaWRdO1xuICAgICAgICAgICAgICAvLyBDaGVjayBpZiB3ZSBhY3R1YWxseSBoYXZlIGEgY29sbGVjdGlvbiB0byB3b3JrIHdpdGguXG4gICAgICAgICAgICAgIGlmIChjb2xsZWN0aW9uICYmIEFycmF5LmlzQXJyYXkoY29sbGVjdGlvbikpIHtcbiAgICAgICAgICAgICAgICAvLyBJZiB0aGlzIGlzIGEgY29sbGVjdGlvbiBvZiBjb21wbGV4IG9iamVjdCwgd2UgbmVlZCB0byBpdGVyYXRlIHRocm91Z2hcbiAgICAgICAgICAgICAgICAvLyBhbmQgY2xlYXIgdGhlbSBvdXQuXG4gICAgICAgICAgICAgICAgaWYgKGZpZWxkLmZpZWxkX3R5cGUuY29sbGVjdGlvbl9maWVsZF90eXBlLnR5cGUgPT09ICdDb21wbGV4Jykge1xuICAgICAgICAgICAgICAgICAgLy8gSXRlcmF0ZSB0aHJvdWdoIHRoZSBlbGVtZW50cyBhbmQgcmVtb3ZlIGFueSB1bm5lY2Vzc2FyeSBmaWVsZHMgd2l0aGluLlxuICAgICAgICAgICAgICAgICAgZm9yIChjb25zdCBpdGVtIG9mIGNvbGxlY3Rpb24pIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5yZW1vdmVOdWxsTGFiZWxzKGl0ZW0sIGZpZWxkLmZpZWxkX3R5cGUuY29sbGVjdGlvbl9maWVsZF90eXBlLmNvbXBsZXhfZmllbGRzKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5yZW1vdmVOdWxsTGFiZWxzKGl0ZW0udmFsdWUsIGZpZWxkLmZpZWxkX3R5cGUuY29sbGVjdGlvbl9maWVsZF90eXBlLmNvbXBsZXhfZmllbGRzKTtcbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgLy8gVE9ETyByZWZhY3RvciBzbyB0aGF0IHRoaXMgYW5kIHJlbW92ZSB1bm5lY2Vzc2FyeSBmaWVsZHMgaGF2ZSBhIGNvbW1vbiBpdGVyYXRvciB0aGF0IGFwcGxpZXMgZnVuY3Rpb25zIHRvIGVhY2ggbm9kZSB2aXNpdGVkXG4gIHB1YmxpYyByZW1vdmVFbXB0eURvY3VtZW50cyhkYXRhOiBvYmplY3QsIGNhc2VGaWVsZHM6IENhc2VGaWVsZFtdKSB7XG4gICAgaWYgKGRhdGEgJiYgY2FzZUZpZWxkcyAmJiBjYXNlRmllbGRzLmxlbmd0aCA+IDApIHtcbiAgICAgIC8vIGNoZWNrIGlmIHRoZXJlIGlzIGFueSBkYXRhIGF0IHRoZSB0b3AgbGV2ZWwgb2YgdGhlIGZvcm0gdGhhdCdzIG5vdCBpbiB0aGUgY2FzZUZpZWxkc1xuICAgICAgZm9yIChjb25zdCBmaWVsZCBvZiBjYXNlRmllbGRzKSB7XG4gICAgICAgIGlmIChmaWVsZC5maWVsZF90eXBlKSB7XG4gICAgICAgICAgc3dpdGNoIChmaWVsZC5maWVsZF90eXBlLnR5cGUpIHtcbiAgICAgICAgICAgIGNhc2UgJ0NvbXBsZXgnOlxuICAgICAgICAgICAgICAvLyBSZWN1cnNlIGFuZCByZW1vdmUgYW55IGVtcHR5IGRvY3VtZW50cyBmcm9tIHdpdGhpbiBhIGNvbXBsZXggZmllbGQuXG4gICAgICAgICAgICAgIHRoaXMucmVtb3ZlRW1wdHlEb2N1bWVudHMoZGF0YVtmaWVsZC5pZF0sIGZpZWxkLmZpZWxkX3R5cGUuY29tcGxleF9maWVsZHMpO1xuICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgJ0NvbGxlY3Rpb24nOlxuICAgICAgICAgICAgICAvLyBHZXQgaG9sZCBvZiB0aGUgY29sbGVjdGlvbi5cbiAgICAgICAgICAgICAgY29uc3QgY29sbGVjdGlvbiA9IGRhdGFbZmllbGQuaWRdO1xuICAgICAgICAgICAgICAvLyBDaGVjayBpZiB3ZSBhY3R1YWxseSBoYXZlIGEgY29sbGVjdGlvbiB0byB3b3JrIHdpdGguXG4gICAgICAgICAgICAgIGlmIChjb2xsZWN0aW9uICYmIEFycmF5LmlzQXJyYXkoY29sbGVjdGlvbikpIHtcbiAgICAgICAgICAgICAgICAvLyBJZiB0aGlzIGlzIGEgY29sbGVjdGlvbiBvZiBjb21wbGV4IG9iamVjdCwgd2UgbmVlZCB0byBpdGVyYXRlIHRocm91Z2hcbiAgICAgICAgICAgICAgICAvLyBhbmQgY2xlYXIgb3V0IGVtcHR5IGRvY3VtZW50c1xuICAgICAgICAgICAgICAgIGlmIChmaWVsZC5maWVsZF90eXBlLmNvbGxlY3Rpb25fZmllbGRfdHlwZS50eXBlID09PSAnQ29tcGxleCcpIHtcbiAgICAgICAgICAgICAgICAgIC8vIEl0ZXJhdGUgdGhyb3VnaCB0aGUgZWxlbWVudHMgYW5kIHJlbW92ZSBhbnkgZW1wdHkgZG9jdW1lbnRzIHdpdGhpbi5cbiAgICAgICAgICAgICAgICAgIGZvciAoY29uc3QgaXRlbSBvZiBjb2xsZWN0aW9uKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucmVtb3ZlRW1wdHlEb2N1bWVudHMoaXRlbSwgZmllbGQuZmllbGRfdHlwZS5jb2xsZWN0aW9uX2ZpZWxkX3R5cGUuY29tcGxleF9maWVsZHMpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnJlbW92ZUVtcHR5RG9jdW1lbnRzKGl0ZW0udmFsdWUsIGZpZWxkLmZpZWxkX3R5cGUuY29sbGVjdGlvbl9maWVsZF90eXBlLmNvbXBsZXhfZmllbGRzKTtcbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlICdEb2N1bWVudCc6XG4gICAgICAgICAgICAgIC8vIEVuc3VyZSB0aGlzIGlzIGV4ZWN1dGVkIG9ubHkgaWYgdGhlIERvY3VtZW50IGZpZWxkIGlzIE5PVCBoaWRkZW4gYW5kIGlzIGVtcHR5IG9mIGRhdGE7IGhpZGRlbiBEb2N1bWVudFxuICAgICAgICAgICAgICAvLyBmaWVsZHMgYXJlIGhhbmRsZWQgYnkgdGhlIGZpbHRlclJhd0Zvcm1WYWx1ZXMoKSBmdW5jdGlvbiBpbiBDYXNlRWRpdFN1Ym1pdCBjb21wb25lbnRcbiAgICAgICAgICAgICAgaWYgKGZpZWxkLmhpZGRlbiAhPT0gdHJ1ZSAmJiBGb3JtVmFsdWVTZXJ2aWNlLmlzRW1wdHlEYXRhKGRhdGFbZmllbGQuaWRdKSkge1xuICAgICAgICAgICAgICAgIGRlbGV0ZSBkYXRhW2ZpZWxkLmlkXTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxuICAvKipcbiAgICogQ2xlYXIgb3V0IHVubmVjZXNzYXJ5IGZpZWxkcyBmcm9tIGEgZGF0YSBvYmplY3QsIGJhc2VkIG9uIGFuIGFycmF5IG9mIENhc2VGaWVsZHMuXG4gICAqIFRoaXMgbWV0aG9kIGlzIHJlY3Vyc2l2ZSBhbmQgd2lsbCBjYWxsIGl0c2VsZiBpZiBpdCBlbmNvdW50ZXJzIHBhcnRpY3VsYXIgZmllbGQgdHlwZXMuXG4gICAqXG4gICAqIEBwYXJhbSBkYXRhIFRoZSBvYmplY3QgdG8gYmUgdGlkaWVkIHVwLlxuICAgKiBAcGFyYW0gY2FzZUZpZWxkcyBUaGUgQ2FzZUZpZWxkcyB0aGF0IG5lZWQgdG8gYmUgY2xlYW5lZCB1cC5cbiAgICogQHBhcmFtIGNsZWFyRW1wdHkgV2hldGhlciBvciBub3Qgd2Ugc2hvdWxkIGNsZWFyIG91dCBlbXB0eSwgb3B0aW9uYWwsIGNvbXBsZXggb2JqZWN0cy5cbiAgICogQHBhcmFtIGNsZWFyTm9uQ2FzZSBXaGV0aGVyIG9yIG5vdCB3ZSBzaG91bGQgY2xlYXIgb3V0IG5vbi1jYXNlIGZpZWxkcyBhdCB0aGUgdG9wIGxldmVsLlxuICAgKi9cbiAgcHVibGljIHJlbW92ZVVubmVjZXNzYXJ5RmllbGRzKGRhdGE6IG9iamVjdCwgY2FzZUZpZWxkczogQ2FzZUZpZWxkW10sIGNsZWFyRW1wdHkgPSBmYWxzZSwgY2xlYXJOb25DYXNlID0gZmFsc2UsXG4gICAgZnJvbVByZXZpb3VzUGFnZSA9IGZhbHNlLCBjdXJyZW50UGFnZUNhc2VGaWVsZHMgPSBbXSk6IHZvaWQge1xuICAgIGlmIChkYXRhICYmIGNhc2VGaWVsZHMgJiYgY2FzZUZpZWxkcy5sZW5ndGggPiAwKSB7XG4gICAgICAvLyBjaGVjayBpZiB0aGVyZSBpcyBhbnkgZGF0YSBhdCB0aGUgdG9wIGxldmVsIG9mIHRoZSBmb3JtIHRoYXQncyBub3QgaW4gdGhlIGNhc2VGaWVsZHNcbiAgICAgIGlmIChjbGVhck5vbkNhc2UpIHtcbiAgICAgICAgdGhpcy5jbGVhck5vbkNhc2VGaWVsZHMoZGF0YSwgY2FzZUZpZWxkcyk7XG4gICAgICB9XG4gICAgICBmb3IgKGNvbnN0IGZpZWxkIG9mIGNhc2VGaWVsZHMpIHtcbiAgICAgICAgaWYgKCFGb3JtVmFsdWVTZXJ2aWNlLmlzTGFiZWwoZmllbGQpICYmIEZvcm1WYWx1ZVNlcnZpY2UuaXNSZWFkT25seShmaWVsZCkpIHtcbiAgICAgICAgICAvLyBSZXRhaW4gYW55dGhpbmcgdGhhdCBpcyByZWFkb25seSBhbmQgbm90IGEgbGFiZWwuXG4gICAgICAgICAgY29udGludWU7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGZpZWxkLmhpZGRlbiA9PT0gdHJ1ZSAmJiBmaWVsZC5kaXNwbGF5X2NvbnRleHQgIT09ICdISURERU4nICYmIGZpZWxkLmlkICE9PSAnY2FzZUxpbmtzJykge1xuICAgICAgICAgIC8vIERlbGV0ZSBhbnl0aGluZyB0aGF0IGlzIGhpZGRlbiAodGhhdCBpcyBOT1QgcmVhZG9ubHkpLCBhbmQgdGhhdFxuICAgICAgICAgIC8vIGhhc24ndCBoYWQgaXRzIGRpc3BsYXlfY29udGV4dCBvdmVycmlkZGVuIHRvIG1ha2UgaXQgaGlkZGVuLlxuICAgICAgICAgIGRlbGV0ZSBkYXRhW2ZpZWxkLmlkXTtcbiAgICAgICAgfSBlbHNlIGlmIChmaWVsZC5maWVsZF90eXBlKSB7XG4gICAgICAgICAgc3dpdGNoIChmaWVsZC5maWVsZF90eXBlLnR5cGUpIHtcbiAgICAgICAgICAgIGNhc2UgJ0xhYmVsJzpcbiAgICAgICAgICAgICAgLy8gRGVsZXRlIGFueSBsYWJlbHMuXG4gICAgICAgICAgICAgIGRlbGV0ZSBkYXRhW2ZpZWxkLmlkXTtcbiAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlICdEb2N1bWVudCc6XG4gICAgICAgICAgICAgIGlmIChGb3JtVmFsdWVTZXJ2aWNlLmlzRW1wdHlEYXRhKGRhdGFbZmllbGQuaWRdKSkge1xuICAgICAgICAgICAgICAgIGRlbGV0ZSBkYXRhW2ZpZWxkLmlkXTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgJ0NvbXBsZXgnOlxuICAgICAgICAgICAgICB0aGlzLnJlbW92ZVVubmVjZXNzYXJ5RmllbGRzKGRhdGFbZmllbGQuaWRdLCBmaWVsZC5maWVsZF90eXBlLmNvbXBsZXhfZmllbGRzLCBjbGVhckVtcHR5KTtcbiAgICAgICAgICAgICAgLy8gQWxzbyByZW1vdmUgYW55IG9wdGlvbmFsIGNvbXBsZXggb2JqZWN0cyB0aGF0IGFyZSBjb21wbGV0ZWx5IGVtcHR5LlxuICAgICAgICAgICAgICAvLyBFVUktNDI0NDogUml0ZXNoJ3MgZml4LCBwYXNzaW5nIHRydWUgaW5zdGVhZCBvZiBjbGVhckVtcHR5LlxuICAgICAgICAgICAgICBpZiAoRm9ybVZhbHVlU2VydmljZS5jbGVhck9wdGlvbmFsRW1wdHkodHJ1ZSwgZGF0YVtmaWVsZC5pZF0sIGZpZWxkKSkge1xuICAgICAgICAgICAgICAgIGRlbGV0ZSBkYXRhW2ZpZWxkLmlkXTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICBpZiAoZGF0YVtmaWVsZC5pZF0gJiYgRm9ybVZhbHVlU2VydmljZS5pc0VtcHR5RGF0YShkYXRhW2ZpZWxkLmlkXSkgJiYgZnJvbVByZXZpb3VzUGFnZVxuICAgICAgICAgICAgICAgICYmIGN1cnJlbnRQYWdlQ2FzZUZpZWxkcy5maW5kSW5kZXgoKGNGaWVsZDogYW55KSA9PiBjRmllbGQuaWQgPT09IGZpZWxkLmlkKSA9PT0gLTEpIHtcbiAgICAgICAgICAgICAgICBkZWxldGUgZGF0YVtmaWVsZC5pZF07XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlICdDb2xsZWN0aW9uJzpcbiAgICAgICAgICAgICAgLy8gQ2hlY2sgZm9yIHZhbGlkIGNvbGxlY3Rpb24gZGF0YVxuICAgICAgICAgICAgICB0aGlzLnJlbW92ZUludmFsaWRDb2xsZWN0aW9uRGF0YShkYXRhLCBmaWVsZCk7XG4gICAgICAgICAgICAgIC8vIEdldCBob2xkIG9mIHRoZSBjb2xsZWN0aW9uLlxuICAgICAgICAgICAgICBjb25zdCBjb2xsZWN0aW9uID0gZGF0YVtmaWVsZC5pZF07XG4gICAgICAgICAgICAgIC8vIENoZWNrIGlmIHdlIGFjdHVhbGx5IGhhdmUgYSBjb2xsZWN0aW9uIHRvIHdvcmsgd2l0aC5cbiAgICAgICAgICAgICAgaWYgKGNvbGxlY3Rpb24gJiYgQXJyYXkuaXNBcnJheShjb2xsZWN0aW9uKSkge1xuICAgICAgICAgICAgICAgIC8vIElmIHRoaXMgaXMgYSBjb2xsZWN0aW9uIG9mIGNvbXBsZXggb2JqZWN0LCB3ZSBuZWVkIHRvIGl0ZXJhdGUgdGhyb3VnaFxuICAgICAgICAgICAgICAgIC8vIGFuZCBjbGVhciB0aGVtIG91dC5cbiAgICAgICAgICAgICAgICBpZiAoZmllbGQuZmllbGRfdHlwZS5jb2xsZWN0aW9uX2ZpZWxkX3R5cGUudHlwZSA9PT0gJ0NvbXBsZXgnKSB7XG4gICAgICAgICAgICAgICAgICAvLyBJdGVyYXRlIHRocm91Z2ggdGhlIGVsZW1lbnRzIGFuZCByZW1vdmUgYW55IHVubmVjZXNzYXJ5IGZpZWxkcyB3aXRoaW4uXG4gICAgICAgICAgICAgICAgICBmb3IgKGNvbnN0IGl0ZW0gb2YgY29sbGVjdGlvbikge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnJlbW92ZVVubmVjZXNzYXJ5RmllbGRzKGl0ZW0sIGZpZWxkLmZpZWxkX3R5cGUuY29sbGVjdGlvbl9maWVsZF90eXBlLmNvbXBsZXhfZmllbGRzLCBjbGVhckVtcHR5KTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5yZW1vdmVVbm5lY2Vzc2FyeUZpZWxkcyhpdGVtLnZhbHVlLCBmaWVsZC5maWVsZF90eXBlLmNvbGxlY3Rpb25fZmllbGRfdHlwZS5jb21wbGV4X2ZpZWxkcywgZmFsc2UpO1xuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIC8vIENsZWFyIG91dCBhbnkgTXVsdGlTZWxlY3QgbGFiZWxzLlxuICAgIEZvcm1WYWx1ZVNlcnZpY2UucmVtb3ZlTXVsdGlTZWxlY3RMYWJlbHMoZGF0YSk7XG4gIH1cblxuICBwdWJsaWMgcmVtb3ZlSW52YWxpZENvbGxlY3Rpb25EYXRhKGRhdGE6IG9iamVjdCwgZmllbGQ6IENhc2VGaWVsZCkge1xuICAgIGlmIChkYXRhW2ZpZWxkLmlkXSAmJiBkYXRhW2ZpZWxkLmlkXS5sZW5ndGggPiAwKSB7XG4gICAgICBmb3IgKGNvbnN0IG9iakNvbGxlY3Rpb24gb2YgZGF0YVtmaWVsZC5pZF0pIHtcbiAgICAgICAgaWYgKE9iamVjdC5rZXlzKG9iakNvbGxlY3Rpb24pLmxlbmd0aCA9PT0gMSAmJiBPYmplY3Qua2V5cyhvYmpDb2xsZWN0aW9uKS5pbmRleE9mKCdpZCcpID4gLTEpIHtcbiAgICAgICAgICBkYXRhW2ZpZWxkLmlkXSA9IFtdO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFJlbW92ZSBhbnkgZW1wdHkgY29sbGVjdGlvbiBmaWVsZHMgd2hlcmUgYSB2YWx1ZSBvZiBncmVhdGVyIHRoYW4gemVybyBpcyBzcGVjaWZpZWQgaW4gdGhlIGZpZWxkJ3Mge0BsaW5rIEZpZWxkVHlwZX1cbiAgICogYG1pbmAgYXR0cmlidXRlLlxuICAgKlxuICAgKiBAcGFyYW0gZGF0YSBUaGUgb2JqZWN0IHRyZWUgb2YgZm9ybSB2YWx1ZXMgb24gd2hpY2ggdG8gcGVyZm9ybSB0aGUgcmVtb3ZhbFxuICAgKiBAcGFyYW0gY2FzZUZpZWxkcyBUaGUgbGlzdCBvZiB1bmRlcmx5aW5nIHtAbGluayBDYXNlRmllbGR9IGRvbWFpbiBtb2RlbCBvYmplY3RzIGZvciBlYWNoIGZpZWxkXG4gICAqL1xuICBwdWJsaWMgcmVtb3ZlRW1wdHlDb2xsZWN0aW9uc1dpdGhNaW5WYWxpZGF0aW9uKGRhdGE6IG9iamVjdCwgY2FzZUZpZWxkczogQ2FzZUZpZWxkW10pOiB2b2lkIHtcbiAgICBpZiAoZGF0YSAmJiBjYXNlRmllbGRzICYmIGNhc2VGaWVsZHMubGVuZ3RoID4gMCkge1xuICAgICAgZm9yIChjb25zdCBmaWVsZCBvZiBjYXNlRmllbGRzKSB7XG4gICAgICAgIGlmIChmaWVsZC5maWVsZF90eXBlLnR5cGUgPT09ICdDb2xsZWN0aW9uJyAmJiBmaWVsZC5maWVsZF90eXBlLm1pbiA+IDAgJiYgZGF0YVtmaWVsZC5pZF0gJiZcbiAgICAgICAgICBBcnJheS5pc0FycmF5KGRhdGFbZmllbGQuaWRdKSAmJiBkYXRhW2ZpZWxkLmlkXS5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICBkZWxldGUgZGF0YVtmaWVsZC5pZF07XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogUmVtb3ZlIGZyb20gdGhlIHRvcCBsZXZlbCBvZiB0aGUgZm9ybSBkYXRhIGFueSBjYXNlIGZpZWxkcyBvZiBhIGdpdmVuIHR5cGUgb3IgdHlwZXMgdGhhdCBhcmUgbm90IGludGVuZGVkIHRvIGJlXG4gICAqIHBlcnNpc3RlZC4gVGhpcyBmdW5jdGlvbiBpcyBpbnRlbmRlZCB0byByZW1vdmUgXCJzcGVjaWFsXCIgY2FzZSBmaWVsZCB0eXBlcyBmcm9tIHRoZSBkYXRhLCBzdWNoIGFzIEZsYWdMYXVuY2hlciBvclxuICAgKiBDb21wb25lbnRMYXVuY2hlciBmaWVsZHMuXG4gICAqXG4gICAqIEBwYXJhbSBkYXRhIFRoZSBvYmplY3QgdHJlZSBvZiBmb3JtIHZhbHVlcyBvbiB3aGljaCB0byBwZXJmb3JtIHRoZSByZW1vdmFsIGF0IHRoZSB0b3AgbGV2ZWwgb25seVxuICAgKiBAcGFyYW0gY2FzZUZpZWxkcyBUaGUgbGlzdCBvZiB1bmRlcmx5aW5nIHtAbGluayBDYXNlRmllbGR9IGRvbWFpbiBtb2RlbCBvYmplY3RzIGZvciBlYWNoIGZpZWxkXG4gICAqIEBwYXJhbSB0eXBlcyBBbiBhcnJheSBvZiBvbmUgb3IgbW9yZSBmaWVsZCB0eXBlc1xuICAgKi9cbiAgcHVibGljIHJlbW92ZUNhc2VGaWVsZHNPZlR5cGUoZGF0YTogb2JqZWN0LCBjYXNlRmllbGRzOiBDYXNlRmllbGRbXSwgdHlwZXM6IEZpZWxkVHlwZUVudW1bXSk6IHZvaWQge1xuICAgIGlmIChkYXRhICYmIGNhc2VGaWVsZHMgJiYgY2FzZUZpZWxkcy5sZW5ndGggPiAwICYmIHR5cGVzLmxlbmd0aCA+IDApIHtcbiAgICAgIGNvbnN0IGNhc2VGaWVsZHNUb1JlbW92ZSA9IGNhc2VGaWVsZHMuZmlsdGVyKGNhc2VGaWVsZCA9PiBGaWVsZHNVdGlscy5pc0Nhc2VGaWVsZE9mVHlwZShjYXNlRmllbGQsIHR5cGVzKSk7XG4gICAgICBmb3IgKGNvbnN0IGNhc2VGaWVsZCBvZiBjYXNlRmllbGRzVG9SZW1vdmUpIHtcbiAgICAgICAgZGVsZXRlIGRhdGFbY2FzZUZpZWxkLmlkXTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogUmUtcG9wdWxhdGUgdGhlIGZvcm0gZGF0YSBmcm9tIHRoZSB2YWx1ZXMgaGVsZCBpbiB0aGUgY2FzZSBmaWVsZHMuIFRoaXMgaXMgbmVjZXNzYXJ5IGluIG9yZGVyIHRvIHBpY2sgdXAsIGZvclxuICAgKiBlYWNoIGBGbGFnc2AgZmllbGQsIGFueSBmbGFnIGRldGFpbHMgZGF0YSBub3QgY3VycmVudGx5IHByZXNlbnQuXG4gICAqXG4gICAqIGBGbGFnc2AgZmllbGRzIG1heSBiZSBjb250YWluZWQgaW4gb3RoZXIgYENhc2VGaWVsZGAgaW5zdGFuY2VzLCBlaXRoZXIgYXMgYSBzdWItZmllbGQgb2YgYSBDb21wbGV4IGZpZWxkLCBvclxuICAgKiBmaWVsZHMgaW4gYSBjb2xsZWN0aW9uIChvciBzdWItZmllbGRzIG9mIENvbXBsZXggZmllbGRzIGluIGEgY29sbGVjdGlvbikuIFRoZXJlZm9yZSwgaXQgaXMgbmVjZXNzYXJ5IHRvXG4gICAqIGl0ZXJhdGUgdGhyb3VnaCBhbGwgYENhc2VGaWVsZGBzLlxuICAgKlxuICAgKiBAcGFyYW0gZGF0YSBUaGUgb2JqZWN0IHRyZWUgb2YgZm9ybSB2YWx1ZXMgb24gd2hpY2ggdG8gcGVyZm9ybSB0aGUgZGF0YSBwb3B1bGF0aW9uXG4gICAqIEBwYXJhbSBjYXNlRmllbGRzIFRoZSBsaXN0IG9mIHVuZGVybHlpbmcge0BsaW5rIENhc2VGaWVsZH0gZG9tYWluIG1vZGVsIG9iamVjdHMgZm9yIGVhY2ggZmllbGRcbiAgICovXG4gIHB1YmxpYyByZXBvcHVsYXRlRm9ybURhdGFGcm9tQ2FzZUZpZWxkVmFsdWVzKGRhdGE6IG9iamVjdCwgY2FzZUZpZWxkczogQ2FzZUZpZWxkW10pOiB2b2lkIHtcbiAgICBpZiAoZGF0YSAmJiBjYXNlRmllbGRzICYmIGNhc2VGaWVsZHMubGVuZ3RoID4gMCAmJlxuICAgICAgY2FzZUZpZWxkcy5maW5kSW5kZXgoY2FzZUZpZWxkID0+IEZpZWxkc1V0aWxzLmlzQ2FzZUZpZWxkT2ZUeXBlKGNhc2VGaWVsZCwgWydGbGFnTGF1bmNoZXInXSkpID4gLTEpIHtcbiAgICAgIC8vIElnbm9yZSB0aGUgRmxhZ0xhdW5jaGVyIENhc2VGaWVsZCBiZWNhdXNlIGl0IGRvZXMgbm90IGhvbGQgYW55IHZhbHVlc1xuICAgICAgY2FzZUZpZWxkcy5maWx0ZXIoY2FzZUZpZWxkID0+ICFGaWVsZHNVdGlscy5pc0Nhc2VGaWVsZE9mVHlwZShjYXNlRmllbGQsIFsnRmxhZ0xhdW5jaGVyJ10pKVxuICAgICAgICAuZm9yRWFjaChjYXNlRmllbGQgPT4ge1xuICAgICAgICAgIC8vIEVuc3VyZSB0aGF0IHRoZSBkYXRhIG9iamVjdCBpcyBwb3B1bGF0ZWQgZm9yIGFsbCBDYXNlRmllbGQga2V5cyBpdCBjb250YWlucywgZXZlbiBpZiBmb3IgYSBnaXZlblxuICAgICAgICAgIC8vIENhc2VGaWVsZCBrZXksIHRoZSBkYXRhIG9iamVjdCBoYXMgYSBmYWxzeSB2YWx1ZSAoaGVuY2UgdGhlIHVzZSBvZiBoYXNPd25Qcm9wZXJ0eSgpIGZvciB0aGUgY2hlY2sgYmVsb3cpXG4gICAgICAgICAgLy8gU2VlIGh0dHBzOi8vdG9vbHMuaG1jdHMubmV0L2ppcmEvYnJvd3NlL0VVSS03Mzc3XG4gICAgICAgICAgaWYgKGRhdGEuaGFzT3duUHJvcGVydHkoY2FzZUZpZWxkLmlkKSAmJiBjYXNlRmllbGQudmFsdWUpIHtcbiAgICAgICAgICAgIC8vIENyZWF0ZSBuZXcgb2JqZWN0IGZvciB0aGUgQ2FzZUZpZWxkIElEIHdpdGhpbiB0aGUgZGF0YSBvYmplY3QsIGlmIG5lY2Vzc2FyeSAoaS5lLiBpZiB0aGUgY3VycmVudCB2YWx1ZVxuICAgICAgICAgICAgLy8gaXMgZmFsc3kpXG4gICAgICAgICAgICBpZiAoIWRhdGFbY2FzZUZpZWxkLmlkXSkge1xuICAgICAgICAgICAgICBkYXRhW2Nhc2VGaWVsZC5pZF0gPSB7fTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIENvcHkgYWxsIHZhbHVlcyBmcm9tIHRoZSBjb3JyZXNwb25kaW5nIENhc2VGaWVsZDsgdGhpcyBlbnN1cmVzIGFsbCBuZXN0ZWQgZmxhZyBkYXRhIChmb3IgZXhhbXBsZSwgYVxuICAgICAgICAgICAgLy8gRmxhZ3MgZmllbGQgd2l0aGluIGEgQ29tcGxleCBmaWVsZCBvciBhIGNvbGxlY3Rpb24gb2YgQ29tcGxleCBmaWVsZHMpIGlzIGNvcGllZCBhY3Jvc3NcbiAgICAgICAgICAgIE9iamVjdC5rZXlzKGRhdGFbY2FzZUZpZWxkLmlkXSkuZm9yRWFjaChrZXkgPT4ge1xuICAgICAgICAgICAgICBpZiAoY2FzZUZpZWxkLnZhbHVlLmhhc093blByb3BlcnR5KGtleSkpIHtcbiAgICAgICAgICAgICAgICBkYXRhW2Nhc2VGaWVsZC5pZF1ba2V5XSA9IGNhc2VGaWVsZC52YWx1ZVtrZXldO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBQb3B1bGF0ZSB0aGUgbGlua2VkIGNhc2VzIGZyb20gdGhlIGRhdGEgaGVsZCBpbiBpdHMgY29ycmVzcG9uZGluZyBDYXNlRmllbGQuXG4gICAqXG4gICAqIEBwYXJhbSBkYXRhIFRoZSBvYmplY3QgdHJlZSBvZiBmb3JtIHZhbHVlcyBvbiB3aGljaCB0byBwZXJmb3JtIHRoZSBkYXRhIHBvcHVsYXRpb25cbiAgICogQHBhcmFtIGNhc2VGaWVsZHMgVGhlIGxpc3Qgb2YgdW5kZXJseWluZyB7QGxpbmsgQ2FzZUZpZWxkfSBkb21haW4gbW9kZWwgb2JqZWN0cyBmb3IgZWFjaCBmaWVsZFxuICAgKi9cbiAgcHVibGljIHBvcHVsYXRlTGlua2VkQ2FzZXNEZXRhaWxzRnJvbUNhc2VGaWVsZHMoZGF0YTogb2JqZWN0LCBjYXNlRmllbGRzOiBDYXNlRmllbGRbXSk6IHZvaWQge1xuICAgIGlmIChkYXRhICYmIGNhc2VGaWVsZHMgJiYgY2FzZUZpZWxkcy5sZW5ndGggPiAwKSB7XG4gICAgICBjYXNlRmllbGRzLmZpbHRlcihjYXNlRmllbGQgPT4gIUZpZWxkc1V0aWxzLmlzQ2FzZUZpZWxkT2ZUeXBlKGNhc2VGaWVsZCwgWydDb21wb25lbnRMYXVuY2hlciddKSlcbiAgICAgICAgLmZvckVhY2goY2FzZUZpZWxkID0+IHtcbiAgICAgICAgICBpZiAoZGF0YS5oYXNPd25Qcm9wZXJ0eSgnY2FzZUxpbmtzJykgJiYgY2FzZUZpZWxkLnZhbHVlKSB7XG4gICAgICAgICAgICBkYXRhW2Nhc2VGaWVsZC5pZF0gPSBjYXNlRmllbGQudmFsdWU7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG4gIH1cbn1cbiJdfQ==