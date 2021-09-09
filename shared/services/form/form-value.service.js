"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var fields_1 = require("../fields");
var field_type_sanitiser_1 = require("./field-type-sanitiser");
var FormValueService = /** @class */ (function () {
    function FormValueService(fieldTypeSanitiser) {
        this.fieldTypeSanitiser = fieldTypeSanitiser;
    }
    FormValueService_1 = FormValueService;
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
     *      form= { complex1': {
                      'simple11': 'value11',
                      'simple12': 'value12',
                      'complex2': {
                        'simple21': 'value21'
                      }
                  }},
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
     * @param form form
     * @param fieldKey dot separated reference to value
     * @param colIndex index of collection item being referenced or 0 otherwise
     * @returns {string} simple or combined value of a field
     **/
    FormValueService.getFieldValue = function (form, fieldKey, colIndex) {
        var fieldIds = fieldKey.split('.');
        var currentFieldId = fieldIds[0];
        var currentForm = form[currentFieldId];
        if (fields_1.FieldsUtils.isMultiSelectValue(currentForm)) {
            return form[currentFieldId + fields_1.FieldsUtils.LABEL_SUFFIX].join(', ');
        }
        else if (fields_1.FieldsUtils.isCollectionOfSimpleTypes(currentForm)) {
            return currentForm.map(function (fieldValue) { return fieldValue['value']; }).join(', ');
        }
        else if (fields_1.FieldsUtils.isCollection(currentForm)) {
            return this.getFieldValue(currentForm[colIndex]['value'], fieldIds.slice(1).join('.'), colIndex);
        }
        else if (fields_1.FieldsUtils.isNonEmptyObject(currentForm)) {
            return this.getFieldValue(currentForm, fieldIds.slice(1).join('.'), colIndex);
        }
        else {
            return currentForm;
        }
    };
    /**
     * A recursive method to remove anything with a `---LABEL` suffix.
     * @param data The data to recurse through and remove MultiSelect labels.
     */
    FormValueService.removeMultiSelectLabels = function (data) {
        if (data && typeof data === 'object') {
            if (Array.isArray(data)) {
                for (var _i = 0, data_1 = data; _i < data_1.length; _i++) {
                    var item = data_1[_i];
                    FormValueService_1.removeMultiSelectLabels(item);
                }
            }
            else {
                var keys = Object.keys(data);
                for (var _a = 0, keys_1 = keys; _a < keys_1.length; _a++) {
                    var key = keys_1[_a];
                    // Have we found one a MultiSelect label?
                    if (key.indexOf(fields_1.FieldsUtils.LABEL_SUFFIX) > 0) {
                        // If so, remove it.
                        delete data[key];
                    }
                    else {
                        FormValueService_1.removeMultiSelectLabels(data[key]);
                    }
                }
            }
        }
    };
    FormValueService.isReadOnly = function (field) {
        return field.display_context ? field.display_context.toUpperCase() === 'READONLY' : false;
    };
    FormValueService.isOptional = function (field) {
        return field.display_context ? field.display_context.toUpperCase() === 'OPTIONAL' : false;
    };
    FormValueService.isLabel = function (field) {
        if (field.field_type) {
            return field.field_type.type === 'Label';
        }
        else {
            return false;
        }
    };
    FormValueService.isEmptyData = function (data) {
        if (data) {
            var allEmpty = true;
            for (var _i = 0, _a = Object.keys(data); _i < _a.length; _i++) {
                var prop = _a[_i];
                var value = data[prop];
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
    };
    /**
     * Should we clear out optional, empty, complex objects?
     * @param clearEmpty False property if we simply want to skip it.
     * @param data The data to assess for "emptiness".
     * @param field The CaseField that will tell us if this is optional.
     */
    FormValueService.clearOptionalEmpty = function (clearEmpty, data, field) {
        if (clearEmpty) {
            return FormValueService_1.isOptional(field) && FormValueService_1.isEmptyData(data);
        }
        return false;
    };
    FormValueService.prototype.sanitise = function (rawValue) {
        return this.sanitiseObject(rawValue);
    };
    FormValueService.prototype.sanitiseCaseReference = function (reference) {
        // strip non digits
        var s = reference.replace(/[\D]/g, '');
        if (s.length > 16) {
            return s.substr(s.length - 16, 16);
        }
        return s;
    };
    FormValueService.prototype.filterCurrentPageFields = function (caseFields, editForm) {
        var cloneForm = JSON.parse(JSON.stringify(editForm));
        Object.keys(cloneForm['data']).forEach(function (key) {
            if (caseFields.findIndex(function (element) { return element.id === key; }) < 0) {
                delete cloneForm['data'][key];
            }
        });
        return cloneForm;
    };
    FormValueService.prototype.sanitiseDynamicLists = function (caseFields, editForm) {
        return this.fieldTypeSanitiser.sanitiseLists(caseFields, editForm.data);
    };
    FormValueService.prototype.sanitiseObject = function (rawObject) {
        if (!rawObject) {
            return rawObject;
        }
        var sanitisedObject = {};
        var documentFieldKeys = ['document_url', 'document_binary_url', 'document_filename'];
        for (var key in rawObject) {
            // If the key is one of documentFieldKeys, it means the field is of Document type. If the value of any of these
            // properties is null, the entire sanitised object to be returned should be null
            if (documentFieldKeys.indexOf(key) > -1 && rawObject[key] == null) {
                sanitisedObject = null;
                break;
            }
            else if ('CaseReference' === key) {
                sanitisedObject[key] = this.sanitiseValue(this.sanitiseCaseReference(String(rawObject[key])));
            }
            else {
                sanitisedObject[key] = this.sanitiseValue(rawObject[key]);
            }
        }
        return sanitisedObject;
    };
    FormValueService.prototype.sanitiseArray = function (rawArray) {
        var _this = this;
        if (!rawArray) {
            return rawArray;
        }
        rawArray.forEach(function (item) {
            if (item && item.hasOwnProperty('value')) {
                item.value = _this.sanitiseValue(item.value);
            }
        });
        // Filter the array to ensure only truthy values are returned; double-bang operator returns the boolean true/false
        // association of a value. In addition, if the array contains items with a "value" object property, return only
        // those whose value object contains non-empty values, including for any descendant objects
        return rawArray
            .filter(function (item) { return !!item; })
            .filter(function (item) { return item.hasOwnProperty('value') ? fields_1.FieldsUtils.containsNonEmptyValues(item.value) : true; });
    };
    FormValueService.prototype.sanitiseValue = function (rawValue) {
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
    };
    FormValueService.prototype.clearNonCaseFields = function (data, caseFields) {
        var _loop_1 = function (dataKey) {
            if (!caseFields.find(function (cf) { return cf.id === dataKey; })) {
                delete data[dataKey];
            }
        };
        for (var dataKey in data) {
            _loop_1(dataKey);
        }
    };
    // TODO refactor so that this and remove unnecessary fields have a common iterator that applies functions to each node visited
    FormValueService.prototype.removeNullLabels = function (data, caseFields) {
        if (data && caseFields && caseFields.length > 0) {
            // check if there is any data at the top level of the form that's not in the caseFields
            for (var _i = 0, caseFields_1 = caseFields; _i < caseFields_1.length; _i++) {
                var field = caseFields_1[_i];
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
                            var collection = data[field.id];
                            // Check if we actually have a collection to work with.
                            if (collection && Array.isArray(collection)) {
                                // If this is a collection of complex object, we need to iterate through
                                // and clear them out.
                                if (field.field_type.collection_field_type.type === 'Complex') {
                                    // Iterate through the elements and remove any unnecessary fields within.
                                    for (var _a = 0, collection_1 = collection; _a < collection_1.length; _a++) {
                                        var item = collection_1[_a];
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
    };
    // TODO refactor so that this and remove unnecessary fields have a common iterator that applies functions to each node visited
    FormValueService.prototype.removeEmptyDocuments = function (data, caseFields) {
        if (data && caseFields && caseFields.length > 0) {
            // check if there is any data at the top level of the form that's not in the caseFields
            for (var _i = 0, caseFields_2 = caseFields; _i < caseFields_2.length; _i++) {
                var field = caseFields_2[_i];
                if (field.field_type) {
                    switch (field.field_type.type) {
                        case 'Complex':
                            // Recurse and remove any empty documents from within a complex field.
                            this.removeEmptyDocuments(data[field.id], field.field_type.complex_fields);
                            break;
                        case 'Collection':
                            // Get hold of the collection.
                            var collection = data[field.id];
                            // Check if we actually have a collection to work with.
                            if (collection && Array.isArray(collection)) {
                                // If this is a collection of complex object, we need to iterate through
                                // and clear out empty documents
                                if (field.field_type.collection_field_type.type === 'Complex') {
                                    // Iterate through the elements and remove any empty documents within.
                                    for (var _a = 0, collection_2 = collection; _a < collection_2.length; _a++) {
                                        var item = collection_2[_a];
                                        this.removeEmptyDocuments(item, field.field_type.collection_field_type.complex_fields);
                                        this.removeEmptyDocuments(item.value, field.field_type.collection_field_type.complex_fields);
                                    }
                                }
                            }
                            break;
                        case 'Document':
                            // Ensure this is executed only if the Document field is NOT hidden and is empty of data; hidden Document
                            // fields are handled by the filterRawFormValues() function in CaseEditSubmit component
                            if (field.hidden !== true && FormValueService_1.isEmptyData(data[field.id])) {
                                delete data[field.id];
                            }
                            break;
                        default:
                            break;
                    }
                }
            }
        }
    };
    /**
     * Clear out unnecessary fields from a data object, based on an array of CaseFields.
     * This method is recursive and will call itself if it encounters particular field types.
     *
     * @param data The object to be tidied up.
     * @param caseFields The CaseFields that need to be cleaned up.
     * @param clearEmpty Whether or not we should clear out empty, optional, complex objects.
     * @param clearNonCase Whether or not we should clear out non-case fields at the top level.
     */
    FormValueService.prototype.removeUnnecessaryFields = function (data, caseFields, clearEmpty, clearNonCase) {
        if (clearEmpty === void 0) { clearEmpty = false; }
        if (clearNonCase === void 0) { clearNonCase = false; }
        if (data && caseFields && caseFields.length > 0) {
            // check if there is any data at the top level of the form that's not in the caseFields
            if (clearNonCase) {
                this.clearNonCaseFields(data, caseFields);
            }
            for (var _i = 0, caseFields_3 = caseFields; _i < caseFields_3.length; _i++) {
                var field = caseFields_3[_i];
                if (!FormValueService_1.isLabel(field) && FormValueService_1.isReadOnly(field)) {
                    // Retain anything that is readonly and not a label.
                    continue;
                }
                if (field.hidden === true && field.display_context !== 'HIDDEN') {
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
                            if (FormValueService_1.isEmptyData(data[field.id])) {
                                delete data[field.id];
                            }
                            break;
                        case 'Complex':
                            this.removeUnnecessaryFields(data[field.id], field.field_type.complex_fields, clearEmpty);
                            // Also remove any optional complex objects that are completely empty.
                            // EUI-4244: Ritesh's fix, passing true instead of clearEmpty.
                            if (FormValueService_1.clearOptionalEmpty(true, data[field.id], field)) {
                                delete data[field.id];
                            }
                            break;
                        case 'Collection':
                            // Get hold of the collection.
                            var collection = data[field.id];
                            // Check if we actually have a collection to work with.
                            if (collection && Array.isArray(collection)) {
                                // If this is a collection of complex object, we need to iterate through
                                // and clear them out.
                                if (field.field_type.collection_field_type.type === 'Complex') {
                                    // Iterate through the elements and remove any unnecessary fields within.
                                    for (var _a = 0, collection_3 = collection; _a < collection_3.length; _a++) {
                                        var item = collection_3[_a];
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
        FormValueService_1.removeMultiSelectLabels(data);
    };
    /**
     * Remove any empty collection fields where a value of greater than zero is specified in the field's {@link FieldType}
     * `min` attribute.
     *
     * @param data The object tree of form values on which to perform the removal
     * @param caseFields The list of underlying {@link CaseField} domain model objects for each field
     */
    FormValueService.prototype.removeEmptyCollectionsWithMinValidation = function (data, caseFields) {
        if (data && caseFields && caseFields.length > 0) {
            for (var _i = 0, caseFields_4 = caseFields; _i < caseFields_4.length; _i++) {
                var field = caseFields_4[_i];
                if (field.field_type.type === 'Collection' && field.field_type.min > 0 && data[field.id] &&
                    Array.isArray(data[field.id]) && data[field.id].length === 0) {
                    delete data[field.id];
                }
            }
        }
    };
    var FormValueService_1;
    FormValueService = FormValueService_1 = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [field_type_sanitiser_1.FieldTypeSanitiser])
    ], FormValueService);
    return FormValueService;
}());
exports.FormValueService = FormValueService;
//# sourceMappingURL=form-value.service.js.map