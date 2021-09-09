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
var fields_utils_1 = require("./fields.utils");
var conditional_show_model_1 = require("../../directives/conditional-show/domain/conditional-show.model");
// @dynamic
var FieldsPurger = /** @class */ (function () {
    function FieldsPurger(fieldsUtils) {
        this.fieldsUtils = fieldsUtils;
    }
    FieldsPurger.prototype.clearHiddenFields = function (form, wizard, eventTrigger, currentPageId) {
        this.clearHiddenFieldForFieldShowCondition(currentPageId, form, wizard, eventTrigger);
        this.clearHiddenFieldForPageShowCondition(form, wizard, eventTrigger);
    };
    FieldsPurger.prototype.clearHiddenFieldForPageShowCondition = function (form, wizard, eventTrigger) {
        var _this = this;
        var currentEventState = this.fieldsUtils.getCurrentEventState(eventTrigger, form);
        wizard.pages.forEach(function (wp) {
            if (_this.hasShowConditionPage(wp, currentEventState)) {
                var condition = new conditional_show_model_1.ShowCondition(wp.show_condition);
                if (_this.isHidden(condition, currentEventState)) {
                    _this.resetPage(form, wp);
                }
            }
        });
    };
    FieldsPurger.prototype.clearHiddenFieldForFieldShowCondition = function (currentPageId, form, wizard, eventTrigger) {
        var _this = this;
        var formFields = form.getRawValue();
        var currentPage = wizard.getPage(currentPageId, this.fieldsUtils.buildCanShowPredicate(eventTrigger, form));
        currentPage.wizard_page_fields.forEach(function (wpf) {
            var case_field = _this.findCaseFieldByWizardPageFieldId(currentPage, wpf);
            if (_this.hasShowConditionField(case_field, formFields)) {
                var condition = new conditional_show_model_1.ShowCondition(case_field.show_condition);
                if (_this.isHidden(condition, formFields.data) && !(_this.isReadonly(case_field))) {
                    _this.resetField(form, case_field);
                }
            }
            _this.retainHiddenValueByFieldType(case_field, form);
        });
    };
    FieldsPurger.prototype.retainHiddenValueByFieldType = function (field, form) {
        // so far only applies to the new field type OrganisationPolicy which needs to retain the default case role value
        // for other case fields there should be no side effects
        if (field && field.field_type && field.field_type.id === 'OrganisationPolicy') {
            // <bubble_wrap>
            // Doing some null checking to stop it from falling over.
            var data = form.get('data');
            if (data) {
                var fieldGroup = data.controls[field.id];
                if (fieldGroup) {
                    var caseRoleFormControl = fieldGroup.get('OrgPolicyCaseAssignedRole');
                    if (caseRoleFormControl) {
                        caseRoleFormControl.enable();
                    }
                }
            }
            // </bubble_wrap>
        }
    };
    FieldsPurger.prototype.isHidden = function (condition, formFields) {
        return !condition.match(formFields);
    };
    FieldsPurger.prototype.findCaseFieldByWizardPageFieldId = function (currentPage, wizardPageField) {
        return currentPage.case_fields.find(function (cf) { return cf.id === wizardPageField.case_field_id; });
    };
    FieldsPurger.prototype.hasShowConditionPage = function (wizardPage, formFields) {
        return wizardPage.show_condition && formFields[this.getShowConditionKey(wizardPage.show_condition)];
    };
    FieldsPurger.prototype.hasShowConditionField = function (case_field, formFields) {
        return case_field.show_condition && formFields.data[this.getShowConditionKey(case_field.show_condition)];
    };
    FieldsPurger.prototype.getShowConditionKey = function (show_condition) {
        // Need to allow for negated conditions, i.e. !=, as well as regular ones (=)
        // Also need to allow for conditions specified using the "CONTAINS" keyword
        return show_condition.split(/!=|=|CONTAINS/)[0];
    };
    FieldsPurger.prototype.resetField = function (form, field) {
        var _this = this;
        /**
         * If the hidden field's value is to be retained, do nothing (except if it is a Complex type or collection of
         * Complex types). This is a change to the previous behaviour (which used to clear the field value but remove it
         * from submission as an update to the back-end). The new behaviour is to leave the field as is, so if the field
         * is hidden but then un-hidden before form submission, any previously entered value is retained.
         *
         * For Complex field types, an additional check of sub-fields is required. The same applies to a collection of
         * Complex types.
         */
        if (field.retain_hidden_value) {
            var fieldType = field.field_type.type;
            // If the field is a Complex type, loop over its sub-fields and call deleteFieldValue() for any sub-fields
            // where retain_hidden_value is false, OR for any Complex sub-fields *regardless of their retain_hidden_value*
            // (in order to inspect the sub-fields of a Complex type within another Complex type)
            if (fieldType === 'Complex' && field.field_type.complex_fields.length > 0) {
                for (var _i = 0, _a = field.field_type.complex_fields; _i < _a.length; _i++) {
                    var complexSubField = _a[_i];
                    if ((complexSubField.field_type.type === 'Complex' && complexSubField.field_type.complex_fields.length > 0) ||
                        !complexSubField.retain_hidden_value) {
                        // Check for the existence of the parent FormGroup corresponding to the Complex field; if it exists, call
                        // deleteFieldValue() to delete the sub-field
                        var parentFormGroup = form.get('data').controls[field.id];
                        if (parentFormGroup) {
                            this.deleteFieldValue(parentFormGroup, complexSubField);
                        }
                    }
                }
            }
            else if (fieldType === 'Collection' && field.field_type.collection_field_type.type === 'Complex' &&
                field.field_type.collection_field_type.complex_fields.length > 0) {
                // If the field is a collection of Complex types, loop through each one and call deleteFieldValue() for any
                // sub-fields where retain_hidden_value is false, OR for any Complex sub-fields *regardless of their
                // retain_hidden_value* (in order to inspect the sub-fields of a Complex type within another Complex type)
                // Get the array of field controls corresponding to the Complex field values
                var fieldControls_1 = form.get('data').controls[field.id];
                if (fieldControls_1) {
                    // Get the array of Complex field values
                    var complexFieldValues = fieldControls_1.value;
                    // For each Complex field value, get the ID of each sub-field within it and use as a key to find the
                    // corresponding sub-CaseField (which contains the field type information)
                    if (complexFieldValues) {
                        complexFieldValues.forEach(function (fieldValue, index) { return Object.keys(fieldValue.value).forEach(function (subFieldId) {
                            // Find the sub-CaseField corresponding to the sub-field ID
                            var subCaseField;
                            for (var _i = 0, _a = field.field_type.collection_field_type.complex_fields; _i < _a.length; _i++) {
                                var caseField = _a[_i];
                                if (caseField.id === subFieldId) {
                                    subCaseField = caseField;
                                    break;
                                }
                            }
                            // Recursively delete the sub-field value if retain_hidden_value is false, OR if the sub-field type is
                            // Complex and regardless of retain_hidden_value, passing in the parent FormGroup
                            if (subCaseField &&
                                ((subCaseField.field_type.type === 'Complex' && subCaseField.field_type.complex_fields.length > 0) ||
                                    !subCaseField.retain_hidden_value)) {
                                var parentFormGroup = fieldControls_1.at(index).get('value');
                                _this.deleteFieldValue(parentFormGroup, subCaseField);
                            }
                        }); });
                    }
                }
            }
        }
        else {
            // Delete the field value
            this.deleteFieldValue(form.get('data'), field);
        }
    };
    FieldsPurger.prototype.resetPage = function (form, wizardPage) {
        var _this = this;
        wizardPage.wizard_page_fields.forEach(function (wpf) {
            var case_field = _this.findCaseFieldByWizardPageFieldId(wizardPage, wpf);
            _this.resetField(form, case_field);
        });
    };
    FieldsPurger.prototype.getType = function (elem) {
        return Object.prototype.toString.call(elem).slice(8, -1);
    };
    FieldsPurger.prototype.isObject = function (elem) {
        return this.getType(elem) === 'Object';
    };
    ;
    // TODO: call isReadOnly on CaseFields once we make it available
    FieldsPurger.prototype.isReadonly = function (case_field) {
        return case_field.display_context.toUpperCase() === 'READONLY';
    };
    /**
     * Deletes a field value by setting the value of the corresponding {@link FormControl} to null (or an empty array
     * if the field type is `Collection`), except when the field type is `Complex` or `Document`. For `Complex` field
     * types, this recursive method is called until simple or "base" field types are reached. For `Document` field
     * types, its _sub-field_ `FormControl` values are set to null.
     *
     * @param formGroup The `FormGroup` instance containing the `FormControl` for the specified field
     * @param field The `CaseField` whose value is to be deleted in the backend
     * @param parentField Reference to the parent `CaseField`. Used for checking specifically where a Complex field and
     * its sub-fields have `retain_hidden_value` set to `true`, but the field's parent has it set to `false` or undefined
     */
    FieldsPurger.prototype.deleteFieldValue = function (formGroup, field, parentField) {
        var _this = this;
        var fieldType = field.field_type.type;
        var fieldControl = formGroup.get(field.id);
        if (fieldControl) {
            switch (fieldType) {
                case 'Complex':
                    /**
                     * If the field is a Complex type, loop over its sub-fields and call deleteFieldValue() for:
                     *
                     * * Any sub-fields where retain_hidden_value is false/undefined, if the parent field has
                     * retain_hidden_value = true;
                     * * ALL sub-fields if the parent field has retain_hidden_value = true BUT its _own_ parent has
                     * retain_hidden_value = false/undefined (thus overriding anything else);
                     * * ALL sub-fields if the parent field has retain_hidden_value = false/undefined;
                     * * Any Complex sub-fields *regardless of their retain_hidden_value* (in order to inspect the sub-fields
                     * of a Complex type within another Complex type)
                     */
                    if (field.field_type.complex_fields.length > 0) {
                        for (var _i = 0, _a = field.field_type.complex_fields; _i < _a.length; _i++) {
                            var complexSubField = _a[_i];
                            if ((complexSubField.field_type.type === 'Complex' && complexSubField.field_type.complex_fields.length > 0) ||
                                (complexSubField.field_type.type !== 'Complex' &&
                                    (field.retain_hidden_value
                                        ? !complexSubField.retain_hidden_value || (parentField && !parentField.retain_hidden_value)
                                        : true))) {
                                // The fieldControl is cast to a FormGroup because a Complex field type uses this as its underlying
                                // implementation
                                this.deleteFieldValue(fieldControl, complexSubField, field);
                            }
                        }
                    }
                    break;
                case 'Collection':
                    // If it is a collection of Complex types, loop through each one; else fall through to be handled as a
                    // collection of simple types (in the same way as MultiSelectList), unless it's a collection of Document
                    // types, which requires different handling
                    var collectionFieldType_1 = field.field_type.collection_field_type;
                    if (collectionFieldType_1.type === 'Complex' && collectionFieldType_1.complex_fields.length > 0) {
                        // Get the array of Complex field values
                        var complexFieldValues = fieldControl.value;
                        // For each Complex field value, get the ID of each sub-field within it and use as a key to find the
                        // corresponding sub-CaseField (which contains the field type information)
                        if (complexFieldValues) {
                            complexFieldValues.forEach(function (fieldValue, index) { return Object.keys(fieldValue.value).forEach(function (subFieldId) {
                                // Find the sub-CaseField corresponding to the sub-field ID
                                var subCaseField;
                                for (var _i = 0, _a = collectionFieldType_1.complex_fields; _i < _a.length; _i++) {
                                    var caseField = _a[_i];
                                    if (caseField.id === subFieldId) {
                                        subCaseField = caseField;
                                        break;
                                    }
                                }
                                // Recursively delete the sub-field value, passing in the parent FormGroup
                                var parentFormGroup = fieldControl.at(index).get('value');
                                _this.deleteFieldValue(parentFormGroup, subCaseField);
                            }); });
                        }
                        break;
                    }
                    else if (collectionFieldType_1.type === 'Document') {
                        // Get the array of Document field values
                        var documentFieldValues = fieldControl.value;
                        // For each Document field value, set all its property values to null (this is not accepted by the
                        // back-end but will be handled by sanitiseObject() in FormValueService before sending - see below for
                        // the single Document case)
                        if (documentFieldValues) {
                            documentFieldValues.forEach(function (fieldValue, index) { return Object.keys(fieldValue.value).forEach(function (subFieldId) {
                                // Get the FormGroup containing the FormControl for the sub-field and set its value to null
                                fieldControl.at(index).get("value." + subFieldId).setValue(null);
                            }); });
                        }
                        break;
                    }
                // Omitted "break" is intentional because a collection should be handled as per MultiSelectList if it is
                // not a collection of Complex types
                // tslint:disable-next-line: no-switch-case-fall-through
                case 'MultiSelectList':
                    // Field control should be a FormArray, so map each of its values to null
                    // NOTE: The FormArray cannot just be set to an empty array because Angular checks that all existing values
                    // of a FormArray are present; setting the control's value to an empty array causes a runtime error
                    fieldControl.setValue(fieldControl.value.map(function () { return null; }));
                    break;
                case 'Document':
                    // NOTE: The field control (a FormGroup in this case) cannot just be set to null because Angular checks that
                    // all existing values of a FormGroup are present; setting the control's value to null causes a runtime error
                    var documentFieldValue = fieldControl.value;
                    for (var key in documentFieldValue) {
                        if (fieldControl.get(key)) {
                            // The back-end doesn't accept null as a valid value for any of the Document field type properties but
                            // this is handled by sanitiseObject() in FormValueService, returning a null object for the entire
                            // Document field, if any of its properties is null - which is accepted by the back-end
                            fieldControl.get(key).setValue(null);
                        }
                    }
                    break;
                // Note: the default case applies to DynamicList fields, too
                default:
                    fieldControl.setValue(null);
            }
        }
    };
    FieldsPurger = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [fields_utils_1.FieldsUtils])
    ], FieldsPurger);
    return FieldsPurger;
}());
exports.FieldsPurger = FieldsPurger;
//# sourceMappingURL=fields.purger.js.map