"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var common_1 = require("@angular/common");
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var class_transformer_1 = require("class-transformer");
var utils_1 = require("../../components/palette/utils");
var domain_1 = require("../../domain");
var format_translator_service_1 = require("../case-fields/format-translator.service");
// @dynamic
var FieldsUtils = /** @class */ (function () {
    function FieldsUtils() {
    }
    FieldsUtils_1 = FieldsUtils;
    FieldsUtils.convertToCaseField = function (obj) {
        if (!(obj instanceof domain_1.CaseField)) {
            return class_transformer_1.plainToClassFromExist(new domain_1.CaseField(), obj);
        }
        return obj;
    };
    FieldsUtils.toValuesMap = function (caseFields) {
        var valueMap = {};
        caseFields.forEach(function (field) {
            valueMap[field.id] = FieldsUtils_1.prepareValue(field);
        });
        return valueMap;
    };
    FieldsUtils.getType = function (elem) {
        return Object.prototype.toString.call(elem).slice(8, -1);
    };
    FieldsUtils.isObject = function (elem) {
        return typeof elem === 'object' && elem !== null;
    };
    FieldsUtils.isNonEmptyObject = function (elem) {
        return this.isObject(elem) && Object.keys(elem).length !== 0;
    };
    FieldsUtils.isArray = function (elem) {
        return Array.isArray(elem);
    };
    FieldsUtils.areCollectionValuesSimpleFields = function (fieldValue) {
        return !this.isObject(fieldValue[0]['value']) && !Array.isArray(fieldValue[0]['value']) && fieldValue[0]['value'] !== undefined;
    };
    FieldsUtils.isCollectionOfSimpleTypes = function (fieldValue) {
        return this.isCollection(fieldValue) && this.areCollectionValuesSimpleFields(fieldValue);
    };
    FieldsUtils.isMultiSelectValue = function (form) {
        return this.isNonEmptyArray(form) && !this.isCollectionWithValue(form);
    };
    FieldsUtils.isNonEmptyArray = function (pageFormFields) {
        return Array.isArray(pageFormFields) && pageFormFields[0] !== undefined;
    };
    FieldsUtils.isCollection = function (pageFormFields) {
        return this.isNonEmptyArray(pageFormFields) && this.isCollectionWithValue(pageFormFields);
    };
    FieldsUtils.isCollectionWithValue = function (pageFormFields) {
        return pageFormFields[0]['value'] !== undefined;
    };
    FieldsUtils.cloneObject = function (obj) {
        return Object.assign({}, obj);
    };
    // temporary function until this can be moved to CaseView class (RDM-2681)
    FieldsUtils.getCaseFields = function (caseView) {
        var caseDataFields = caseView.tabs.reduce(function (acc, tab) {
            return acc.concat(tab.fields);
        }, []);
        var metadataFields = caseView.metadataFields;
        return metadataFields.concat(caseDataFields.filter(function (caseField) {
            return metadataFields.findIndex(function (metadataField) { return metadataField.id === caseField.id; }) < 0;
        }));
    };
    FieldsUtils.prepareValue = function (field) {
        if (field.value) {
            return field.value;
        }
        else if (field.isComplex()) {
            var valueMap_1 = {};
            field.field_type.complex_fields.forEach(function (complexField) {
                valueMap_1[complexField.id] = FieldsUtils_1.prepareValue(complexField);
            });
            return valueMap_1;
        }
    };
    /**
     * Formats a `MoneyGBP` value to include currency units.
     * @param fieldValue The CurrencyPipe expects an `any` parameter so this must also be `any`,
     * but it should be "number-like" (e.g., '1234')
     * @returns A formatted string (e.g., £12.34)
     */
    FieldsUtils.getMoneyGBP = function (fieldValue) {
        return fieldValue ? FieldsUtils_1.currencyPipe.transform(fieldValue / 100, 'GBP', 'symbol') : fieldValue;
    };
    FieldsUtils.getLabel = function (fieldValue) {
        return fieldValue ? fieldValue.label : '';
    };
    FieldsUtils.getDate = function (fieldValue) {
        try {
            // Format specified here wasn't previously working and lots of tests depend on it not working
            // Now that formats work correctly many test would break - and this could affect services which may depend on
            // the orginal behaviour of returning dates in "d MMM yyyy"
            // Note - replaced 'd' with 'D' as datepipe using moment to avoid timezone discrepancies
            return FieldsUtils_1.datePipe.transform(fieldValue, null, 'D MMM yyyy');
        }
        catch (e) {
            return this.textForInvalidField('Date', fieldValue);
        }
    };
    FieldsUtils.getFixedListLabelByCodeOrEmpty = function (field, code) {
        var relevantItem = code ? field.field_type.fixed_list_items.find(function (item) { return item.code === code; }) : null;
        return relevantItem ? relevantItem.label : '';
    };
    FieldsUtils.textForInvalidField = function (type, invalidValue) {
        return "{ Invalid " + type + ": " + invalidValue + " }";
    };
    FieldsUtils.addCaseFieldAndComponentReferences = function (c, cf, comp) {
        c['caseField'] = cf;
        c['component'] = comp;
    };
    /**
     * Recursive check of an array or object and its descendants for the presence of any non-empty values.
     *
     * @param object The array or object to check
     * @returns `true` if the array or object (or a descendant) contains at least one non-empty value; `false` otherwise
     */
    FieldsUtils.containsNonEmptyValues = function (object) {
        var _this = this;
        if (!object) {
            return false;
        }
        var values = Object.keys(object).map(function (key) { return object[key]; });
        var objectRefs = [];
        // Also test for numeric values, and length > 0 for non-numeric values because this covers both strings and arrays.
        // Note: Deliberate use of non-equality (!=) operator for null check, to handle both null and undefined values.
        var hasNonNullPrimitive = values.some(function (x) { return (x != null &&
            ((typeof x === 'object' && x.constructor === Object) || Array.isArray(x)
                ? !objectRefs.push(x)
                : typeof x === 'number' || x.length > 0)); });
        return !hasNonNullPrimitive ? objectRefs.some(function (y) { return _this.containsNonEmptyValues(y); }) : hasNonNullPrimitive;
    };
    FieldsUtils.prototype.buildCanShowPredicate = function (eventTrigger, form) {
        var currentState = this.getCurrentEventState(eventTrigger, form);
        return function (page) {
            return page.parsedShowCondition.match(currentState);
        };
    };
    FieldsUtils.prototype.getCurrentEventState = function (eventTrigger, form) {
        return this.mergeCaseFieldsAndFormFields(eventTrigger.case_fields, form.controls['data'].value);
    };
    FieldsUtils.prototype.cloneCaseField = function (obj) {
        return Object.assign(new domain_1.CaseField(), obj);
    };
    FieldsUtils.prototype.mergeCaseFieldsAndFormFields = function (caseFields, formFields) {
        return this.mergeFields(caseFields, formFields, FieldsUtils_1.DEFAULT_MERGE_FUNCTION);
    };
    FieldsUtils.prototype.mergeLabelCaseFieldsAndFormFields = function (caseFields, formFields) {
        return this.mergeFields(caseFields, formFields, FieldsUtils_1.LABEL_MERGE_FUNCTION);
    };
    FieldsUtils.prototype.controlIterator = function (aControl, formArrayFn, formGroupFn, controlFn) {
        if (aControl instanceof forms_1.FormArray) { // We're in a collection
            formArrayFn(aControl);
        }
        else if (aControl instanceof forms_1.FormGroup) { // We're in a complex type.
            formGroupFn(aControl);
        }
        else if (aControl instanceof forms_1.FormControl) { // FormControl
            controlFn(aControl);
        }
    };
    FieldsUtils.prototype.mergeFields = function (caseFields, formFields, mergeFunction) {
        var _this = this;
        var result = FieldsUtils_1.cloneObject(formFields);
        caseFields.forEach(function (field) {
            mergeFunction(field, result);
            if (field.field_type && field.field_type.complex_fields && field.field_type.complex_fields.length > 0) {
                result[field.id] = _this.mergeFields(field.field_type.complex_fields, result[field.id], mergeFunction);
            }
        });
        return result;
    };
    var FieldsUtils_1;
    FieldsUtils.currencyPipe = new common_1.CurrencyPipe('en-GB');
    FieldsUtils.datePipe = new utils_1.DatePipe(new format_translator_service_1.FormatTranslatorService());
    // EUI-4244. 3 dashes instead of 1 to make this less likely to clash with a real field.
    FieldsUtils.LABEL_SUFFIX = '---LABEL';
    FieldsUtils.DEFAULT_MERGE_FUNCTION = function mergeFunction(field, result) {
        if (!result.hasOwnProperty(field.id)) {
            result[field.id] = field.value;
        }
    };
    FieldsUtils.LABEL_MERGE_FUNCTION = function mergeFunction(field, result) {
        if (!result.hasOwnProperty(field.id)) {
            result[field.id] = field.value;
        }
        switch (field.field_type.type) {
            case 'FixedList':
            case 'FixedRadioList': {
                result[field.id] = FieldsUtils_1.getFixedListLabelByCodeOrEmpty(field, result[field.id] || field.value);
                break;
            }
            case 'MultiSelectList': {
                var fieldValue = result[field.id] || [];
                result[field.id + FieldsUtils_1.LABEL_SUFFIX] = [];
                fieldValue.forEach(function (code, idx) {
                    result[field.id + FieldsUtils_1.LABEL_SUFFIX][idx] = FieldsUtils_1.getFixedListLabelByCodeOrEmpty(field, code);
                });
                break;
            }
            case 'Label': {
                result[field.id] = FieldsUtils_1.getLabel(field);
                break;
            }
            case 'MoneyGBP': {
                var fieldValue = (result[field.id] || field.value);
                result[field.id] = FieldsUtils_1.getMoneyGBP(fieldValue);
                break;
            }
            case 'Date': {
                var fieldValue = (result[field.id] || field.value);
                result[field.id] = FieldsUtils_1.getDate(fieldValue);
                break;
            }
            case 'Complex': {
                if (result[field.id] && field.field_type.complex_fields) {
                    field.field_type.complex_fields.forEach(function (f) {
                        if (['Collection', 'Complex', 'MultiSelectList'].indexOf(f.field_type.type) > -1) {
                            FieldsUtils_1.LABEL_MERGE_FUNCTION(f, result[field.id]);
                        }
                    });
                }
                break;
            }
            case 'Collection': {
                var elements = (result[field.id] || field.value);
                if (elements) {
                    elements.forEach(function (elem) {
                        switch (field.field_type.collection_field_type.type) {
                            case 'MoneyGBP': {
                                elem.value = FieldsUtils_1.getMoneyGBP(elem.value);
                                break;
                            }
                            case 'Date': {
                                elem.value = FieldsUtils_1.getDate(elem.value);
                                break;
                            }
                            case 'Complex': {
                                if (field.field_type.collection_field_type.complex_fields) {
                                    field.field_type.collection_field_type.complex_fields.forEach(function (f) {
                                        if (['Collection', 'Complex', 'MultiSelectList'].indexOf(f.field_type.type) > -1) {
                                            FieldsUtils_1.LABEL_MERGE_FUNCTION(f, elem.value);
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
    FieldsUtils = FieldsUtils_1 = __decorate([
        core_1.Injectable()
    ], FieldsUtils);
    return FieldsUtils;
}());
exports.FieldsUtils = FieldsUtils;
//# sourceMappingURL=fields.utils.js.map