import { Injectable } from '@angular/core';
import { ShowCondition } from '../../directives/conditional-show/domain/conditional-show.model';
import { FieldsUtils } from './fields.utils';
import * as i0 from "@angular/core";
import * as i1 from "./fields.utils";
// @dynamic
export class FieldsPurger {
    constructor(fieldsUtils) {
        this.fieldsUtils = fieldsUtils;
    }
    clearHiddenFields(form, wizard, eventTrigger, currentPageId) {
        this.clearHiddenFieldForFieldShowCondition(currentPageId, form, wizard, eventTrigger);
        this.clearHiddenFieldForPageShowCondition(form, wizard, eventTrigger);
    }
    clearHiddenFieldForPageShowCondition(form, wizard, eventTrigger) {
        const currentEventState = this.fieldsUtils.getCurrentEventState(eventTrigger, form);
        wizard.pages.forEach(wp => {
            if (this.hasShowConditionPage(wp, currentEventState)) {
                const condition = new ShowCondition(wp.show_condition);
                if (this.isHidden(condition, currentEventState)) {
                    this.resetPage(form, wp);
                }
            }
        });
    }
    clearHiddenFieldForFieldShowCondition(currentPageId, form, wizard, eventTrigger) {
        const formFields = form.getRawValue();
        const currentPage = wizard.getPage(currentPageId, this.fieldsUtils.buildCanShowPredicate(eventTrigger, form));
        currentPage.wizard_page_fields.forEach(wpf => {
            const caseField = this.findCaseFieldByWizardPageFieldId(currentPage, wpf);
            if (this.hasShowConditionField(caseField, formFields)) {
                const condition = new ShowCondition(caseField.show_condition);
                if (this.isHidden(condition, formFields.data) && !(this.isReadonly(caseField))) {
                    this.resetField(form, caseField);
                }
            }
            this.retainHiddenValueByFieldType(caseField, form);
        });
    }
    retainHiddenValueByFieldType(field, form) {
        // so far only applies to the new field type OrganisationPolicy which needs to retain the default case role value
        // for other case fields there should be no side effects
        if (field && field.field_type && field.field_type.id === 'OrganisationPolicy') {
            // <bubble_wrap>
            // Doing some null checking to stop it from falling over.
            const data = form.get('data');
            if (data) {
                const fieldGroup = data.controls[field.id];
                if (fieldGroup) {
                    const caseRoleFormControl = fieldGroup.get('OrgPolicyCaseAssignedRole');
                    if (caseRoleFormControl) {
                        caseRoleFormControl.enable();
                    }
                }
            }
            // </bubble_wrap>
        }
    }
    isHidden(condition, formFields) {
        return !condition.match(formFields);
    }
    findCaseFieldByWizardPageFieldId(currentPage, wizardPageField) {
        return currentPage.case_fields.find(cf => cf.id === wizardPageField.case_field_id);
    }
    hasShowConditionPage(wizardPage, formFields) {
        return wizardPage.show_condition && formFields[this.getShowConditionKey(wizardPage.show_condition)];
    }
    hasShowConditionField(caseField, formFields) {
        return caseField.show_condition && formFields.data[this.getShowConditionKey(caseField.show_condition)];
    }
    getShowConditionKey(showCondition) {
        // Need to allow for negated conditions, i.e. !=, as well as regular ones (=)
        // Also need to allow for conditions specified using the "CONTAINS" keyword
        return showCondition.split(/!=|=|CONTAINS/)[0];
    }
    resetField(form, field) {
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
            const fieldType = field.field_type.type;
            // If the field is a Complex type, loop over its sub-fields and call deleteFieldValue() for any sub-fields
            // where retain_hidden_value is false, OR for any Complex sub-fields *regardless of their retain_hidden_value*
            // (in order to inspect the sub-fields of a Complex type within another Complex type)
            if (fieldType === 'Complex' && field.field_type.complex_fields.length > 0) {
                for (const complexSubField of field.field_type.complex_fields) {
                    if ((complexSubField.field_type.type === 'Complex' && complexSubField.field_type.complex_fields.length > 0) ||
                        !complexSubField.retain_hidden_value) {
                        // Check for the existence of the parent UntypedFormGroup corresponding to the Complex field; if it exists, call
                        // deleteFieldValue() to delete the sub-field
                        const parentFormGroup = form.get('data').controls[field.id];
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
                const fieldControls = form.get('data').controls[field.id];
                if (fieldControls) {
                    // Get the array of Complex field values
                    const complexFieldValues = fieldControls.value;
                    // For each Complex field value, get the ID of each sub-field within it and use as a key to find the
                    // corresponding sub-CaseField (which contains the field type information)
                    if (complexFieldValues) {
                        complexFieldValues.forEach((fieldValue, index) => Object.keys(fieldValue.value).forEach(subFieldId => {
                            // Find the sub-CaseField corresponding to the sub-field ID
                            let subCaseField;
                            for (const caseField of field.field_type.collection_field_type.complex_fields) {
                                if (caseField.id === subFieldId) {
                                    subCaseField = caseField;
                                    break;
                                }
                            }
                            // Recursively delete the sub-field value if retain_hidden_value is false, OR if the sub-field type is
                            // Complex and regardless of retain_hidden_value, passing in the parent UntypedFormGroup
                            if (subCaseField &&
                                ((subCaseField.field_type.type === 'Complex' && subCaseField.field_type.complex_fields.length > 0) ||
                                    !subCaseField.retain_hidden_value)) {
                                const parentFormGroup = fieldControls.at(index).get('value');
                                this.deleteFieldValue(parentFormGroup, subCaseField);
                            }
                        }));
                    }
                }
            }
        }
        else {
            // Delete the field value
            this.deleteFieldValue(form.get('data'), field);
        }
    }
    resetPage(form, wizardPage) {
        wizardPage.wizard_page_fields.forEach(wpf => {
            const caseField = this.findCaseFieldByWizardPageFieldId(wizardPage, wpf);
            this.resetField(form, caseField);
        });
    }
    getType(elem) {
        return Object.prototype.toString.call(elem).slice(8, -1);
    }
    isObject(elem) {
        return this.getType(elem) === 'Object';
    }
    // TODO: call isReadOnly on CaseFields once we make it available
    isReadonly(caseField) {
        return caseField.display_context.toUpperCase() === 'READONLY';
    }
    /**
     * Deletes a field value by setting the value of the corresponding {@link FormControl} to null (or an empty array
     * if the field type is `Collection`), except when the field type is `Complex` or `Document`. For `Complex` field
     * types, this recursive method is called until simple or "base" field types are reached. For `Document` field
     * types, its _sub-field_ `FormControl` values are set to null.
     *
     * @param UntypedFormGroup The `UntypedFormGroup` instance containing the `FormControl` for the specified field
     * @param field The `CaseField` whose value is to be deleted in the backend
     * @param parentField Reference to the parent `CaseField`. Used for checking specifically where a Complex field and
     * its sub-fields have `retain_hidden_value` set to `true`, but the field's parent has it set to `false` or undefined
     */
    deleteFieldValue(formGroup, field, parentField) {
        const fieldType = field.field_type.type;
        const fieldControl = formGroup.get(field.id);
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
                        for (const complexSubField of field.field_type.complex_fields) {
                            if ((complexSubField.field_type.type === 'Complex' && complexSubField.field_type.complex_fields.length > 0) ||
                                (complexSubField.field_type.type !== 'Complex' &&
                                    (field.retain_hidden_value
                                        ? !complexSubField.retain_hidden_value || (parentField && !parentField.retain_hidden_value)
                                        : true))) {
                                // The fieldControl is cast to a UntypedFormGroup because a Complex field type uses this as its underlying
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
                    const collectionFieldType = field.field_type.collection_field_type;
                    if (collectionFieldType.type === 'Complex' && collectionFieldType.complex_fields.length > 0) {
                        // Get the array of Complex field values
                        const complexFieldValues = fieldControl.value;
                        // For each Complex field value, get the ID of each sub-field within it and use as a key to find the
                        // corresponding sub-CaseField (which contains the field type information)
                        if (complexFieldValues) {
                            complexFieldValues.forEach((fieldValue, index) => Object.keys(fieldValue.value).forEach(subFieldId => {
                                // Find the sub-CaseField corresponding to the sub-field ID
                                let subCaseField;
                                for (const caseField of collectionFieldType.complex_fields) {
                                    if (caseField.id === subFieldId) {
                                        subCaseField = caseField;
                                        break;
                                    }
                                }
                                // Recursively delete the sub-field value, passing in the parent UntypedFormGroup
                                const parentFormGroup = fieldControl.at(index).get('value');
                                this.deleteFieldValue(parentFormGroup, subCaseField);
                            }));
                        }
                        break;
                    }
                    else if (collectionFieldType.type === 'Document') {
                        // Get the array of Document field values
                        const documentFieldValues = fieldControl.value;
                        // For each Document field value, set all its property values to null (this is not accepted by the
                        // back-end but will be handled by sanitiseObject() in FormValueService before sending - see below for
                        // the single Document case)
                        if (documentFieldValues) {
                            documentFieldValues.forEach((fieldValue, index) => Object.keys(fieldValue.value).forEach(subFieldId => {
                                // Get the UntypedFormGroup containing the FormControl for the sub-field and set its value to null
                                fieldControl.at(index).get(`value.${subFieldId}`).setValue(null);
                            }));
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
                    if (fieldControl.value) {
                        // Need to allow for field values that are objects, not just primitives
                        fieldControl.setValue(this.mapArrayValuesToNull(fieldControl.value));
                    }
                    break;
                case 'Document':
                    // NOTE: The field control (a UntypedFormGroup in this case) cannot just be set to null because Angular checks that
                    // all existing values of a UntypedFormGroup are present; setting the control's value to null causes a runtime error
                    const documentFieldValue = fieldControl.value;
                    for (const key in documentFieldValue) {
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
    }
    /**
     * Maps all values of an array to `null`, retaining keys for any values that are objects. For example,
     * `[{ id: '0', value: 'Test' }, 'Test']` would become `[{ id: null, value: null }, null]`.
     * @param array The array of values to map
     * @returns A new array with the mapped values
     */
    mapArrayValuesToNull(array) {
        return array.map(element => {
            return typeof element === 'object'
                ? Object.assign({}, ...Object.keys(element).map(k => ({ [k]: null })))
                : null;
        });
    }
}
FieldsPurger.ɵfac = function FieldsPurger_Factory(t) { return new (t || FieldsPurger)(i0.ɵɵinject(i1.FieldsUtils)); };
FieldsPurger.ɵprov = /*@__PURE__*/ i0.ɵɵdefineInjectable({ token: FieldsPurger, factory: FieldsPurger.ɵfac });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(FieldsPurger, [{
        type: Injectable
    }], function () { return [{ type: i1.FieldsUtils }]; }, null); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmllbGRzLnB1cmdlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2NjZC1jYXNlLXVpLXRvb2xraXQvc3JjL2xpYi9zaGFyZWQvc2VydmljZXMvZmllbGRzL2ZpZWxkcy5wdXJnZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQU0zQyxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0saUVBQWlFLENBQUM7QUFJaEcsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLGdCQUFnQixDQUFDOzs7QUFFN0MsV0FBVztBQUVYLE1BQU0sT0FBTyxZQUFZO0lBRXZCLFlBQTZCLFdBQXdCO1FBQXhCLGdCQUFXLEdBQVgsV0FBVyxDQUFhO0lBQUksQ0FBQztJQUVuRCxpQkFBaUIsQ0FBQyxJQUFzQixFQUFFLE1BQWMsRUFBRSxZQUE4QixFQUFFLGFBQXFCO1FBQ3BILElBQUksQ0FBQyxxQ0FBcUMsQ0FBQyxhQUFhLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxZQUFZLENBQUMsQ0FBQztRQUN0RixJQUFJLENBQUMsb0NBQW9DLENBQUMsSUFBSSxFQUFFLE1BQU0sRUFBRSxZQUFZLENBQUMsQ0FBQztJQUN4RSxDQUFDO0lBRU8sb0NBQW9DLENBQUMsSUFBc0IsRUFBRSxNQUFjLEVBQUUsWUFBOEI7UUFDakgsTUFBTSxpQkFBaUIsR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLG9CQUFvQixDQUFDLFlBQVksRUFBRSxJQUFJLENBQUMsQ0FBQztRQUNwRixNQUFNLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUMsRUFBRTtZQUN4QixJQUFJLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxFQUFFLEVBQUUsaUJBQWlCLENBQUMsRUFBRTtnQkFDcEQsTUFBTSxTQUFTLEdBQUcsSUFBSSxhQUFhLENBQUMsRUFBRSxDQUFDLGNBQWMsQ0FBQyxD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LENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDO2FBQy9CO1NBQ0Y7SUFDSCxDQUFDO0lBRUQ7Ozs7O09BS0c7SUFDSSxvQkFBb0IsQ0FBQyxLQUFZO1FBQ3RDLE9BQU8sS0FBSyxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsRUFBRTtZQUN6QixPQUFPLE9BQU8sT0FBTyxLQUFLLFFBQVE7Z0JBQ2hDLENBQUMsQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLEVBQUUsRUFBRSxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDO2dCQUN0RSxDQUFDLENBQUMsSUFBSSxDQUFDO1FBQ1gsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDOzt3RUE5U1UsWUFBWTtrRUFBWixZQUFZLFdBQVosWUFBWTt1RkFBWixZQUFZO2NBRHhCLFVBQVUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBGb3JtQXJyYXksIEZvcm1Db250cm9sLCBVbnR5cGVkRm9ybUdyb3VwIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuXG5pbXBvcnQgeyBXaXphcmRQYWdlRmllbGQgfSBmcm9tICcuLi8uLi9jb21wb25lbnRzL2Nhc2UtZWRpdG9yL2RvbWFpbi93aXphcmQtcGFnZS1maWVsZC5tb2RlbCc7XG5pbXBvcnQgeyBXaXphcmRQYWdlIH0gZnJvbSAnLi4vLi4vY29tcG9uZW50cy9jYXNlLWVkaXRvci9kb21haW4vd2l6YXJkLXBhZ2UubW9kZWwnO1xuaW1wb3J0IHsgV2l6YXJkIH0gZnJvbSAnLi4vLi4vY29tcG9uZW50cy9jYXNlLWVkaXRvci9kb21haW4vd2l6YXJkLm1vZGVsJztcbmltcG9ydCB7IFNob3dDb25kaXRpb24gfSBmcm9tICcuLi8uLi9kaXJlY3RpdmVzL2NvbmRpdGlvbmFsLXNob3cvZG9tYWluL2NvbmRpdGlvbmFsLXNob3cubW9kZWwnO1xuaW1wb3J0IHsgQ2FzZUV2ZW50VHJpZ2dlciB9IGZyb20gJy4uLy4uL2RvbWFpbi9jYXNlLXZpZXcvY2FzZS1ldmVudC10cmlnZ2VyLm1vZGVsJztcbmltcG9ydCB7IENhc2VGaWVsZCB9IGZyb20gJy4uLy4uL2RvbWFpbi9kZWZpbml0aW9uL2Nhc2UtZmllbGQubW9kZWwnO1xuaW1wb3J0IHsgRmllbGRUeXBlRW51bSB9IGZyb20gJy4uLy4uL2RvbWFpbi9kZWZpbml0aW9uL2ZpZWxkLXR5cGUtZW51bS5tb2RlbCc7XG5pbXBvcnQgeyBGaWVsZHNVdGlscyB9IGZyb20gJy4vZmllbGRzLnV0aWxzJztcblxuLy8gQGR5bmFtaWNcbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBGaWVsZHNQdXJnZXIge1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgcmVhZG9ubHkgZmllbGRzVXRpbHM6IEZpZWxkc1V0aWxzKSB7IH1cblxuICBwdWJsaWMgY2xlYXJIaWRkZW5GaWVsZHMoZm9ybTogVW50eXBlZEZvcm1Hcm91cCwgd2l6YXJkOiBXaXphcmQsIGV2ZW50VHJpZ2dlcjogQ2FzZUV2ZW50VHJpZ2dlciwgY3VycmVudFBhZ2VJZDogc3RyaW5nKTogdm9pZCB7XG4gICAgdGhpcy5jbGVhckhpZGRlbkZpZWxkRm9yRmllbGRTaG93Q29uZGl0aW9uKGN1cnJlbnRQYWdlSWQsIGZvcm0sIHdpemFyZCwgZXZlbnRUcmlnZ2VyKTtcbiAgICB0aGlzLmNsZWFySGlkZGVuRmllbGRGb3JQYWdlU2hvd0NvbmRpdGlvbihmb3JtLCB3aXphcmQsIGV2ZW50VHJpZ2dlcik7XG4gIH1cblxuICBwcml2YXRlIGNsZWFySGlkZGVuRmllbGRGb3JQYWdlU2hvd0NvbmRpdGlvbihmb3JtOiBVbnR5cGVkRm9ybUdyb3VwLCB3aXphcmQ6IFdpemFyZCwgZXZlbnRUcmlnZ2VyOiBDYXNlRXZlbnRUcmlnZ2VyKTogdm9pZCB7XG4gICAgY29uc3QgY3VycmVudEV2ZW50U3RhdGUgPSB0aGlzLmZpZWxkc1V0aWxzLmdldEN1cnJlbnRFdmVudFN0YXRlKGV2ZW50VHJpZ2dlciwgZm9ybSk7XG4gICAgd2l6YXJkLnBhZ2VzLmZvckVhY2god3AgPT4ge1xuICAgICAgaWYgKHRoaXMuaGFzU2hvd0NvbmRpdGlvblBhZ2Uod3AsIGN1cnJlbnRFdmVudFN0YXRlKSkge1xuICAgICAgICBjb25zdCBjb25kaXRpb24gPSBuZXcgU2hvd0NvbmRpdGlvbih3cC5zaG93X2NvbmRpdGlvbik7XG4gICAgICAgIGlmICh0aGlzLmlzSGlkZGVuKGNvbmRpdGlvbiwgY3VycmVudEV2ZW50U3RhdGUpKSB7XG4gICAgICAgICAgdGhpcy5yZXNldFBhZ2UoZm9ybSwgd3ApO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICBwcml2YXRlIGNsZWFySGlkZGVuRmllbGRGb3JGaWVsZFNob3dDb25kaXRpb24oY3VycmVudFBhZ2VJZDogc3RyaW5nLFxuICAgIGZvcm06IFVudHlwZWRGb3JtR3JvdXAsXG4gICAgd2l6YXJkOiBXaXphcmQsXG4gICAgZXZlbnRUcmlnZ2VyOiBDYXNlRXZlbnRUcmlnZ2VyKTogdm9pZCB7XG4gICAgY29uc3QgZm9ybUZpZWxkcyA9IGZvcm0uZ2V0UmF3VmFsdWUoKTtcbiAgICBjb25zdCBjdXJyZW50UGFnZTogV2l6YXJkUGFnZSA9IHdpemFyZC5nZXRQYWdlKGN1cnJlbnRQYWdlSWQsIHRoaXMuZmllbGRzVXRpbHMuYnVpbGRDYW5TaG93UHJlZGljYXRlKGV2ZW50VHJpZ2dlciwgZm9ybSkpO1xuICAgIGN1cnJlbnRQYWdlLndpemFyZF9wYWdlX2ZpZWxkcy5mb3JFYWNoKHdwZiA9PiB7XG4gICAgICBjb25zdCBjYXNlRmllbGQgPSB0aGlzLmZpbmRDYXNlRmllbGRCeVdpemFyZFBhZ2VGaWVsZElkKGN1cnJlbnRQYWdlLCB3cGYpO1xuICAgICAgaWYgKHRoaXMuaGFzU2hvd0NvbmRpdGlvbkZpZWxkKGNhc2VGaWVsZCwgZm9ybUZpZWxkcykpIHtcbiAgICAgICAgY29uc3QgY29uZGl0aW9uID0gbmV3IFNob3dDb25kaXRpb24oY2FzZUZpZWxkLnNob3dfY29uZGl0aW9uKTtcbiAgICAgICAgaWYgKHRoaXMuaXNIaWRkZW4oY29uZGl0aW9uLCBmb3JtRmllbGRzLmRhdGEpICYmICEodGhpcy5pc1JlYWRvbmx5KGNhc2VGaWVsZCkpKSB7XG4gICAgICAgICAgdGhpcy5yZXNldEZpZWxkKGZvcm0sIGNhc2VGaWVsZCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHRoaXMucmV0YWluSGlkZGVuVmFsdWVCeUZpZWxkVHlwZShjYXNlRmllbGQsIGZvcm0pO1xuICAgIH0pO1xuICB9XG5cbiAgcHJpdmF0ZSByZXRhaW5IaWRkZW5WYWx1ZUJ5RmllbGRUeXBlKGZpZWxkOiBDYXNlRmllbGQsIGZvcm06IGFueSk6IHZvaWQge1xuICAgIC8vIHNvIGZhciBvbmx5IGFwcGxpZXMgdG8gdGhlIG5ldyBmaWVsZCB0eXBlIE9yZ2FuaXNhdGlvblBvbGljeSB3aGljaCBuZWVkcyB0byByZXRhaW4gdGhlIGRlZmF1bHQgY2FzZSByb2xlIHZhbHVlXG4gICAgLy8gZm9yIG90aGVyIGNhc2UgZmllbGRzIHRoZXJlIHNob3VsZCBiZSBubyBzaWRlIGVmZmVjdHNcbiAgICBpZiAoZmllbGQgJiYgZmllbGQuZmllbGRfdHlwZSAmJiBmaWVsZC5maWVsZF90eXBlLmlkID09PSAnT3JnYW5pc2F0aW9uUG9saWN5Jykge1xuICAgICAgLy8gPGJ1YmJsZV93cmFwPlxuICAgICAgLy8gRG9pbmcgc29tZSBudWxsIGNoZWNraW5nIHRvIHN0b3AgaXQgZnJvbSBmYWxsaW5nIG92ZXIuXG4gICAgICBjb25zdCBkYXRhOiBVbnR5cGVkRm9ybUdyb3VwID0gZm9ybS5nZXQoJ2RhdGEnKSBhcyBVbnR5cGVkRm9ybUdyb3VwO1xuICAgICAgaWYgKGRhdGEpIHtcbiAgICAgICAgY29uc3QgZmllbGRHcm91cDogVW50eXBlZEZvcm1Hcm91cCA9IGRhdGEuY29udHJvbHNbZmllbGQuaWRdIGFzIFVudHlwZWRGb3JtR3JvdXA7XG4gICAgICAgIGlmIChmaWVsZEdyb3VwKSB7XG4gICAgICAgICAgY29uc3QgY2FzZVJvbGVGb3JtQ29udHJvbDogRm9ybUNvbnRyb2wgPSBmaWVsZEdyb3VwLmdldCgnT3JnUG9saWN5Q2FzZUFzc2lnbmVkUm9sZScpIGFzIEZvcm1Db250cm9sO1xuICAgICAgICAgIGlmIChjYXNlUm9sZUZvcm1Db250cm9sKSB7XG4gICAgICAgICAgICBjYXNlUm9sZUZvcm1Db250cm9sLmVuYWJsZSgpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgLy8gPC9idWJibGVfd3JhcD5cbiAgICB9XG4gIH1cblxuICBwcml2YXRlIGlzSGlkZGVuKGNvbmRpdGlvbjogU2hvd0NvbmRpdGlvbiwgZm9ybUZpZWxkczogYW55KTogYm9vbGVhbiB7XG4gICAgcmV0dXJuICFjb25kaXRpb24ubWF0Y2goZm9ybUZpZWxkcyk7XG4gIH1cblxuICBwcml2YXRlIGZpbmRDYXNlRmllbGRCeVdpemFyZFBhZ2VGaWVsZElkKGN1cnJlbnRQYWdlOiBXaXphcmRQYWdlLCB3aXphcmRQYWdlRmllbGQ6IFdpemFyZFBhZ2VGaWVsZCk6IENhc2VGaWVsZCB7XG4gICAgcmV0dXJuIGN1cnJlbnRQYWdlLmNhc2VfZmllbGRzLmZpbmQoY2YgPT4gY2YuaWQgPT09IHdpemFyZFBhZ2VGaWVsZC5jYXNlX2ZpZWxkX2lkKTtcbiAgfVxuXG4gIHByaXZhdGUgaGFzU2hvd0NvbmRpdGlvblBhZ2Uod2l6YXJkUGFnZTogV2l6YXJkUGFnZSwgZm9ybUZpZWxkczogYW55KTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHdpemFyZFBhZ2Uuc2hvd19jb25kaXRpb24gJiYgZm9ybUZpZWxkc1t0aGlzLmdldFNob3dDb25kaXRpb25LZXkod2l6YXJkUGFnZS5zaG93X2NvbmRpdGlvbildO1xuICB9XG5cbiAgcHJpdmF0ZSBoYXNTaG93Q29uZGl0aW9uRmllbGQoY2FzZUZpZWxkOiBDYXNlRmllbGQsIGZvcm1GaWVsZHM6IGFueSk6IGJvb2xlYW4ge1xuICAgIHJldHVybiBjYXNlRmllbGQuc2hvd19jb25kaXRpb24gJiYgZm9ybUZpZWxkcy5kYXRhW3RoaXMuZ2V0U2hvd0NvbmRpdGlvbktleShjYXNlRmllbGQuc2hvd19jb25kaXRpb24pXTtcbiAgfVxuXG4gIHByaXZhdGUgZ2V0U2hvd0NvbmRpdGlvbktleShzaG93Q29uZGl0aW9uOiBzdHJpbmcpOiBzdHJpbmcge1xuICAgIC8vIE5lZWQgdG8gYWxsb3cgZm9yIG5lZ2F0ZWQgY29uZGl0aW9ucywgaS5lLiAhPSwgYXMgd2VsbCBhcyByZWd1bGFyIG9uZXMgKD0pXG4gICAgLy8gQWxzbyBuZWVkIHRvIGFsbG93IGZvciBjb25kaXRpb25zIHNwZWNpZmllZCB1c2luZyB0aGUgXCJDT05UQUlOU1wiIGtleXdvcmRcbiAgICByZXR1cm4gc2hvd0NvbmRpdGlvbi5zcGxpdCgvIT18PXxDT05UQUlOUy8pWzBdO1xuICB9XG5cbiAgcHJpdmF0ZSByZXNldEZpZWxkKGZvcm06IFVudHlwZWRGb3JtR3JvdXAsIGZpZWxkOiBDYXNlRmllbGQpOiB2b2lkIHtcbiAgICAvKipcbiAgICAgKiBJZiB0aGUgaGlkZGVuIGZpZWxkJ3MgdmFsdWUgaXMgdG8gYmUgcmV0YWluZWQsIGRvIG5vdGhpbmcgKGV4Y2VwdCBpZiBpdCBpcyBhIENvbXBsZXggdHlwZSBvciBjb2xsZWN0aW9uIG9mXG4gICAgICogQ29tcGxleCB0eXBlcykuIFRoaXMgaXMgYSBjaGFuZ2UgdG8gdGhlIHByZXZpb3VzIGJlaGF2aW91ciAod2hpY2ggdXNlZCB0byBjbGVhciB0aGUgZmllbGQgdmFsdWUgYnV0IHJlbW92ZSBpdFxuICAgICAqIGZyb20gc3VibWlzc2lvbiBhcyBhbiB1cGRhdGUgdG8gdGhlIGJhY2stZW5kKS4gVGhlIG5ldyBiZWhhdmlvdXIgaXMgdG8gbGVhdmUgdGhlIGZpZWxkIGFzIGlzLCBzbyBpZiB0aGUgZmllbGRcbiAgICAgKiBpcyBoaWRkZW4gYnV0IHRoZW4gdW4taGlkZGVuIGJlZm9yZSBmb3JtIHN1Ym1pc3Npb24sIGFueSBwcmV2aW91c2x5IGVudGVyZWQgdmFsdWUgaXMgcmV0YWluZWQuXG4gICAgICpcbiAgICAgKiBGb3IgQ29tcGxleCBmaWVsZCB0eXBlcywgYW4gYWRkaXRpb25hbCBjaGVjayBvZiBzdWItZmllbGRzIGlzIHJlcXVpcmVkLiBUaGUgc2FtZSBhcHBsaWVzIHRvIGEgY29sbGVjdGlvbiBvZlxuICAgICAqIENvbXBsZXggdHlwZXMuXG4gICAgICovXG4gICAgaWYgKGZpZWxkLnJldGFpbl9oaWRkZW5fdmFsdWUpIHtcbiAgICAgIGNvbnN0IGZpZWxkVHlwZTogRmllbGRUeXBlRW51bSA9IGZpZWxkLmZpZWxkX3R5cGUudHlwZTtcbiAgICAgIC8vIElmIHRoZSBmaWVsZCBpcyBhIENvbXBsZXggdHlwZSwgbG9vcCBvdmVyIGl0cyBzdWItZmllbGRzIGFuZCBjYWxsIGRlbGV0ZUZpZWxkVmFsdWUoKSBmb3IgYW55IHN1Yi1maWVsZHNcbiAgICAgIC8vIHdoZXJlIHJldGFpbl9oaWRkZW5fdmFsdWUgaXMgZmFsc2UsIE9SIGZvciBhbnkgQ29tcGxleCBzdWItZmllbGRzICpyZWdhcmRsZXNzIG9mIHRoZWlyIHJldGFpbl9oaWRkZW5fdmFsdWUqXG4gICAgICAvLyAoaW4gb3JkZXIgdG8gaW5zcGVjdCB0aGUgc3ViLWZpZWxkcyBvZiBhIENvbXBsZXggdHlwZSB3aXRoaW4gYW5vdGhlciBDb21wbGV4IHR5cGUpXG4gICAgICBpZiAoZmllbGRUeXBlID09PSAnQ29tcGxleCcgJiYgZmllbGQuZmllbGRfdHlwZS5jb21wbGV4X2ZpZWxkcy5sZW5ndGggPiAwKSB7XG4gICAgICAgIGZvciAoY29uc3QgY29tcGxleFN1YkZpZWxkIG9mIGZpZWxkLmZpZWxkX3R5cGUuY29tcGxleF9maWVsZHMpIHtcbiAgICAgICAgICBpZiAoKGNvbXBsZXhTdWJGaWVsZC5maWVsZF90eXBlLnR5cGUgPT09ICdDb21wbGV4JyAmJiBjb21wbGV4U3ViRmllbGQuZmllbGRfdHlwZS5jb21wbGV4X2ZpZWxkcy5sZW5ndGggPiAwKSB8fFxuICAgICAgICAgICAgIWNvbXBsZXhTdWJGaWVsZC5yZXRhaW5faGlkZGVuX3ZhbHVlKSB7XG4gICAgICAgICAgICAvLyBDaGVjayBmb3IgdGhlIGV4aXN0ZW5jZSBvZiB0aGUgcGFyZW50IFVudHlwZWRGb3JtR3JvdXAgY29ycmVzcG9uZGluZyB0byB0aGUgQ29tcGxleCBmaWVsZDsgaWYgaXQgZXhpc3RzLCBjYWxsXG4gICAgICAgICAgICAvLyBkZWxldGVGaWVsZFZhbHVlKCkgdG8gZGVsZXRlIHRoZSBzdWItZmllbGRcbiAgICAgICAgICAgIGNvbnN0IHBhcmVudEZvcm1Hcm91cCA9IChmb3JtLmdldCgnZGF0YScpIGFzIFVudHlwZWRGb3JtR3JvdXApLmNvbnRyb2xzW2ZpZWxkLmlkXSBhcyBVbnR5cGVkRm9ybUdyb3VwO1xuICAgICAgICAgICAgaWYgKHBhcmVudEZvcm1Hcm91cCkge1xuICAgICAgICAgICAgICB0aGlzLmRlbGV0ZUZpZWxkVmFsdWUocGFyZW50Rm9ybUdyb3VwLCBjb21wbGV4U3ViRmllbGQpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSBlbHNlIGlmIChmaWVsZFR5cGUgPT09ICdDb2xsZWN0aW9uJyAmJiBmaWVsZC5maWVsZF90eXBlLmNvbGxlY3Rpb25fZmllbGRfdHlwZS50eXBlID09PSAnQ29tcGxleCcgJiZcbiAgICAgICAgZmllbGQuZmllbGRfdHlwZS5jb2xsZWN0aW9uX2ZpZWxkX3R5cGUuY29tcGxleF9maWVsZHMubGVuZ3RoID4gMCkge1xuICAgICAgICAvLyBJZiB0aGUgZmllbGQgaXMgYSBjb2xsZWN0aW9uIG9mIENvbXBsZXggdHlwZXMsIGxvb3AgdGhyb3VnaCBlYWNoIG9uZSBhbmQgY2FsbCBkZWxldGVGaWVsZFZhbHVlKCkgZm9yIGFueVxuICAgICAgICAvLyBzdWItZmllbGRzIHdoZXJlIHJldGFpbl9oaWRkZW5fdmFsdWUgaXMgZmFsc2UsIE9SIGZvciBhbnkgQ29tcGxleCBzdWItZmllbGRzICpyZWdhcmRsZXNzIG9mIHRoZWlyXG4gICAgICAgIC8vIHJldGFpbl9oaWRkZW5fdmFsdWUqIChpbiBvcmRlciB0byBpbnNwZWN0IHRoZSBzdWItZmllbGRzIG9mIGEgQ29tcGxleCB0eXBlIHdpdGhpbiBhbm90aGVyIENvbXBsZXggdHlwZSlcblxuICAgICAgICAvLyBHZXQgdGhlIGFycmF5IG9mIGZpZWxkIGNvbnRyb2xzIGNvcnJlc3BvbmRpbmcgdG8gdGhlIENvbXBsZXggZmllbGQgdmFsdWVzXG4gICAgICAgIGNvbnN0IGZpZWxkQ29udHJvbHMgPSAoZm9ybS5nZXQoJ2RhdGEnKSBhcyBVbnR5cGVkRm9ybUdyb3VwKS5jb250cm9sc1tmaWVsZC5pZF0gYXMgRm9ybUFycmF5O1xuXG4gICAgICAgIGlmIChmaWVsZENvbnRyb2xzKSB7XG4gICAgICAgICAgLy8gR2V0IHRoZSBhcnJheSBvZiBDb21wbGV4IGZpZWxkIHZhbHVlc1xuICAgICAgICAgIGNvbnN0IGNvbXBsZXhGaWVsZFZhbHVlcyA9IGZpZWxkQ29udHJvbHMudmFsdWUgYXMgYW55W107XG5cbiAgICAgICAgICAvLyBGb3IgZWFjaCBDb21wbGV4IGZpZWxkIHZhbHVlLCBnZXQgdGhlIElEIG9mIGVhY2ggc3ViLWZpZWxkIHdpdGhpbiBpdCBhbmQgdXNlIGFzIGEga2V5IHRvIGZpbmQgdGhlXG4gICAgICAgICAgLy8gY29ycmVzcG9uZGluZyBzdWItQ2FzZUZpZWxkICh3aGljaCBjb250YWlucyB0aGUgZmllbGQgdHlwZSBpbmZvcm1hdGlvbilcbiAgICAgICAgICBpZiAoY29tcGxleEZpZWxkVmFsdWVzKSB7XG4gICAgICAgICAgICBjb21wbGV4RmllbGRWYWx1ZXMuZm9yRWFjaCgoZmllbGRWYWx1ZSwgaW5kZXgpID0+IE9iamVjdC5rZXlzKGZpZWxkVmFsdWUudmFsdWUpLmZvckVhY2goc3ViRmllbGRJZCA9PiB7XG4gICAgICAgICAgICAgIC8vIEZpbmQgdGhlIHN1Yi1DYXNlRmllbGQgY29ycmVzcG9uZGluZyB0byB0aGUgc3ViLWZpZWxkIElEXG4gICAgICAgICAgICAgIGxldCBzdWJDYXNlRmllbGQ6IENhc2VGaWVsZDtcbiAgICAgICAgICAgICAgZm9yIChjb25zdCBjYXNlRmllbGQgb2YgZmllbGQuZmllbGRfdHlwZS5jb2xsZWN0aW9uX2ZpZWxkX3R5cGUuY29tcGxleF9maWVsZHMpIHtcbiAgICAgICAgICAgICAgICBpZiAoY2FzZUZpZWxkLmlkID09PSBzdWJGaWVsZElkKSB7XG4gICAgICAgICAgICAgICAgICBzdWJDYXNlRmllbGQgPSBjYXNlRmllbGQ7XG4gICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAvLyBSZWN1cnNpdmVseSBkZWxldGUgdGhlIHN1Yi1maWVsZCB2YWx1ZSBpZiByZXRhaW5faGlkZGVuX3ZhbHVlIGlzIGZhbHNlLCBPUiBpZiB0aGUgc3ViLWZpZWxkIHR5cGUgaXNcbiAgICAgICAgICAgICAgLy8gQ29tcGxleCBhbmQgcmVnYXJkbGVzcyBvZiByZXRhaW5faGlkZGVuX3ZhbHVlLCBwYXNzaW5nIGluIHRoZSBwYXJlbnQgVW50eXBlZEZvcm1Hcm91cFxuICAgICAgICAgICAgICBpZiAoc3ViQ2FzZUZpZWxkICYmXG4gICAgICAgICAgICAgICAgKChzdWJDYXNlRmllbGQuZmllbGRfdHlwZS50eXBlID09PSAnQ29tcGxleCcgJiYgc3ViQ2FzZUZpZWxkLmZpZWxkX3R5cGUuY29tcGxleF9maWVsZHMubGVuZ3RoID4gMCkgfHxcbiAgICAgICAgICAgICAgICAgICFzdWJDYXNlRmllbGQucmV0YWluX2hpZGRlbl92YWx1ZSkpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBwYXJlbnRGb3JtR3JvdXA6IFVudHlwZWRGb3JtR3JvdXAgPSBmaWVsZENvbnRyb2xzLmF0KGluZGV4KS5nZXQoJ3ZhbHVlJykgYXMgVW50eXBlZEZvcm1Hcm91cDtcbiAgICAgICAgICAgICAgICB0aGlzLmRlbGV0ZUZpZWxkVmFsdWUocGFyZW50Rm9ybUdyb3VwLCBzdWJDYXNlRmllbGQpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KSk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIERlbGV0ZSB0aGUgZmllbGQgdmFsdWVcbiAgICAgIHRoaXMuZGVsZXRlRmllbGRWYWx1ZShmb3JtLmdldCgnZGF0YScpIGFzIFVudHlwZWRGb3JtR3JvdXAsIGZpZWxkKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIHJlc2V0UGFnZShmb3JtOiBVbnR5cGVkRm9ybUdyb3VwLCB3aXphcmRQYWdlOiBXaXphcmRQYWdlKTogdm9pZCB7XG4gICAgd2l6YXJkUGFnZS53aXphcmRfcGFnZV9maWVsZHMuZm9yRWFjaCh3cGYgPT4ge1xuICAgICAgY29uc3QgY2FzZUZpZWxkID0gdGhpcy5maW5kQ2FzZUZpZWxkQnlXaXphcmRQYWdlRmllbGRJZCh3aXphcmRQYWdlLCB3cGYpO1xuICAgICAgdGhpcy5yZXNldEZpZWxkKGZvcm0sIGNhc2VGaWVsZCk7XG4gICAgfSk7XG4gIH1cblxuICBwcml2YXRlIGdldFR5cGUoZWxlbTogYW55KTogc3RyaW5nIHtcbiAgICByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKGVsZW0pLnNsaWNlKDgsIC0xKTtcbiAgfVxuXG4gIHByaXZhdGUgaXNPYmplY3QoZWxlbTogYW55KTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuZ2V0VHlwZShlbGVtKSA9PT0gJ09iamVjdCc7XG4gIH1cblxuICAvLyBUT0RPOiBjYWxsIGlzUmVhZE9ubHkgb24gQ2FzZUZpZWxkcyBvbmNlIHdlIG1ha2UgaXQgYXZhaWxhYmxlXG4gIHByaXZhdGUgaXNSZWFkb25seShjYXNlRmllbGQ6IENhc2VGaWVsZCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiBjYXNlRmllbGQuZGlzcGxheV9jb250ZXh0LnRvVXBwZXJDYXNlKCkgPT09ICdSRUFET05MWSc7XG4gIH1cblxuICAvKipcbiAgICogRGVsZXRlcyBhIGZpZWxkIHZhbHVlIGJ5IHNldHRpbmcgdGhlIHZhbHVlIG9mIHRoZSBjb3JyZXNwb25kaW5nIHtAbGluayBGb3JtQ29udHJvbH0gdG8gbnVsbCAob3IgYW4gZW1wdHkgYXJyYXlcbiAgICogaWYgdGhlIGZpZWxkIHR5cGUgaXMgYENvbGxlY3Rpb25gKSwgZXhjZXB0IHdoZW4gdGhlIGZpZWxkIHR5cGUgaXMgYENvbXBsZXhgIG9yIGBEb2N1bWVudGAuIEZvciBgQ29tcGxleGAgZmllbGRcbiAgICogdHlwZXMsIHRoaXMgcmVjdXJzaXZlIG1ldGhvZCBpcyBjYWxsZWQgdW50aWwgc2ltcGxlIG9yIFwiYmFzZVwiIGZpZWxkIHR5cGVzIGFyZSByZWFjaGVkLiBGb3IgYERvY3VtZW50YCBmaWVsZFxuICAgKiB0eXBlcywgaXRzIF9zdWItZmllbGRfIGBGb3JtQ29udHJvbGAgdmFsdWVzIGFyZSBzZXQgdG8gbnVsbC5cbiAgICpcbiAgICogQHBhcmFtIFVudHlwZWRGb3JtR3JvdXAgVGhlIGBVbnR5cGVkRm9ybUdyb3VwYCBpbnN0YW5jZSBjb250YWluaW5nIHRoZSBgRm9ybUNvbnRyb2xgIGZvciB0aGUgc3BlY2lmaWVkIGZpZWxkXG4gICAqIEBwYXJhbSBmaWVsZCBUaGUgYENhc2VGaWVsZGAgd2hvc2UgdmFsdWUgaXMgdG8gYmUgZGVsZXRlZCBpbiB0aGUgYmFja2VuZFxuICAgKiBAcGFyYW0gcGFyZW50RmllbGQgUmVmZXJlbmNlIHRvIHRoZSBwYXJlbnQgYENhc2VGaWVsZGAuIFVzZWQgZm9yIGNoZWNraW5nIHNwZWNpZmljYWxseSB3aGVyZSBhIENvbXBsZXggZmllbGQgYW5kXG4gICAqIGl0cyBzdWItZmllbGRzIGhhdmUgYHJldGFpbl9oaWRkZW5fdmFsdWVgIHNldCB0byBgdHJ1ZWAsIGJ1dCB0aGUgZmllbGQncyBwYXJlbnQgaGFzIGl0IHNldCB0byBgZmFsc2VgIG9yIHVuZGVmaW5lZFxuICAgKi9cbiAgcHVibGljIGRlbGV0ZUZpZWxkVmFsdWUoZm9ybUdyb3VwOiBVbnR5cGVkRm9ybUdyb3VwLCBmaWVsZDogQ2FzZUZpZWxkLCBwYXJlbnRGaWVsZD86IENhc2VGaWVsZCk6IHZvaWQge1xuICAgIGNvbnN0IGZpZWxkVHlwZTogRmllbGRUeXBlRW51bSA9IGZpZWxkLmZpZWxkX3R5cGUudHlwZTtcbiAgICBjb25zdCBmaWVsZENvbnRyb2wgPSBmb3JtR3JvdXAuZ2V0KGZpZWxkLmlkKTtcblxuICAgIGlmIChmaWVsZENvbnRyb2wpIHtcbiAgICAgIHN3aXRjaCAoZmllbGRUeXBlKSB7XG4gICAgICAgIGNhc2UgJ0NvbXBsZXgnOlxuICAgICAgICAgIC8qKlxuICAgICAgICAgICAqIElmIHRoZSBmaWVsZCBpcyBhIENvbXBsZXggdHlwZSwgbG9vcCBvdmVyIGl0cyBzdWItZmllbGRzIGFuZCBjYWxsIGRlbGV0ZUZpZWxkVmFsdWUoKSBmb3I6XG4gICAgICAgICAgICpcbiAgICAgICAgICAgKiAqIEFueSBzdWItZmllbGRzIHdoZXJlIHJldGFpbl9oaWRkZW5fdmFsdWUgaXMgZmFsc2UvdW5kZWZpbmVkLCBpZiB0aGUgcGFyZW50IGZpZWxkIGhhc1xuICAgICAgICAgICAqIHJldGFpbl9oaWRkZW5fdmFsdWUgPSB0cnVlO1xuICAgICAgICAgICAqICogQUxMIHN1Yi1maWVsZHMgaWYgdGhlIHBhcmVudCBmaWVsZCBoYXMgcmV0YWluX2hpZGRlbl92YWx1ZSA9IHRydWUgQlVUIGl0cyBfb3duXyBwYXJlbnQgaGFzXG4gICAgICAgICAgICogcmV0YWluX2hpZGRlbl92YWx1ZSA9IGZhbHNlL3VuZGVmaW5lZCAodGh1cyBvdmVycmlkaW5nIGFueXRoaW5nIGVsc2UpO1xuICAgICAgICAgICAqICogQUxMIHN1Yi1maWVsZHMgaWYgdGhlIHBhcmVudCBmaWVsZCBoYXMgcmV0YWluX2hpZGRlbl92YWx1ZSA9IGZhbHNlL3VuZGVmaW5lZDtcbiAgICAgICAgICAgKiAqIEFueSBDb21wbGV4IHN1Yi1maWVsZHMgKnJlZ2FyZGxlc3Mgb2YgdGhlaXIgcmV0YWluX2hpZGRlbl92YWx1ZSogKGluIG9yZGVyIHRvIGluc3BlY3QgdGhlIHN1Yi1maWVsZHNcbiAgICAgICAgICAgKiBvZiBhIENvbXBsZXggdHlwZSB3aXRoaW4gYW5vdGhlciBDb21wbGV4IHR5cGUpXG4gICAgICAgICAgICovXG4gICAgICAgICAgaWYgKGZpZWxkLmZpZWxkX3R5cGUuY29tcGxleF9maWVsZHMubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgZm9yIChjb25zdCBjb21wbGV4U3ViRmllbGQgb2YgZmllbGQuZmllbGRfdHlwZS5jb21wbGV4X2ZpZWxkcykge1xuICAgICAgICAgICAgICBpZiAoKGNvbXBsZXhTdWJGaWVsZC5maWVsZF90eXBlLnR5cGUgPT09ICdDb21wbGV4JyAmJiBjb21wbGV4U3ViRmllbGQuZmllbGRfdHlwZS5jb21wbGV4X2ZpZWxkcy5sZW5ndGggPiAwKSB8fFxuICAgICAgICAgICAgICAgIChjb21wbGV4U3ViRmllbGQuZmllbGRfdHlwZS50eXBlICE9PSAnQ29tcGxleCcgJiZcbiAgICAgICAgICAgICAgICAgIChmaWVsZC5yZXRhaW5faGlkZGVuX3ZhbHVlXG4gICAgICAgICAgICAgICAgICAgID8gIWNvbXBsZXhTdWJGaWVsZC5yZXRhaW5faGlkZGVuX3ZhbHVlIHx8IChwYXJlbnRGaWVsZCAmJiAhcGFyZW50RmllbGQucmV0YWluX2hpZGRlbl92YWx1ZSlcbiAgICAgICAgICAgICAgICAgICAgOiB0cnVlKSkpIHtcbiAgICAgICAgICAgICAgICAvLyBUaGUgZmllbGRDb250cm9sIGlzIGNhc3QgdG8gYSBVbnR5cGVkRm9ybUdyb3VwIGJlY2F1c2UgYSBDb21wbGV4IGZpZWxkIHR5cGUgdXNlcyB0aGlzIGFzIGl0cyB1bmRlcmx5aW5nXG4gICAgICAgICAgICAgICAgLy8gaW1wbGVtZW50YXRpb25cbiAgICAgICAgICAgICAgICB0aGlzLmRlbGV0ZUZpZWxkVmFsdWUoZmllbGRDb250cm9sIGFzIFVudHlwZWRGb3JtR3JvdXAsIGNvbXBsZXhTdWJGaWVsZCwgZmllbGQpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlICdDb2xsZWN0aW9uJzpcbiAgICAgICAgICAvLyBJZiBpdCBpcyBhIGNvbGxlY3Rpb24gb2YgQ29tcGxleCB0eXBlcywgbG9vcCB0aHJvdWdoIGVhY2ggb25lOyBlbHNlIGZhbGwgdGhyb3VnaCB0byBiZSBoYW5kbGVkIGFzIGFcbiAgICAgICAgICAvLyBjb2xsZWN0aW9uIG9mIHNpbXBsZSB0eXBlcyAoaW4gdGhlIHNhbWUgd2F5IGFzIE11bHRpU2VsZWN0TGlzdCksIHVubGVzcyBpdCdzIGEgY29sbGVjdGlvbiBvZiBEb2N1bWVudFxuICAgICAgICAgIC8vIHR5cGVzLCB3aGljaCByZXF1aXJlcyBkaWZmZXJlbnQgaGFuZGxpbmdcbiAgICAgICAgICBjb25zdCBjb2xsZWN0aW9uRmllbGRUeXBlID0gZmllbGQuZmllbGRfdHlwZS5jb2xsZWN0aW9uX2ZpZWxkX3R5cGU7XG4gICAgICAgICAgaWYgKGNvbGxlY3Rpb25GaWVsZFR5cGUudHlwZSA9PT0gJ0NvbXBsZXgnICYmIGNvbGxlY3Rpb25GaWVsZFR5cGUuY29tcGxleF9maWVsZHMubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgLy8gR2V0IHRoZSBhcnJheSBvZiBDb21wbGV4IGZpZWxkIHZhbHVlc1xuICAgICAgICAgICAgY29uc3QgY29tcGxleEZpZWxkVmFsdWVzID0gZmllbGRDb250cm9sLnZhbHVlIGFzIGFueVtdO1xuXG4gICAgICAgICAgICAvLyBGb3IgZWFjaCBDb21wbGV4IGZpZWxkIHZhbHVlLCBnZXQgdGhlIElEIG9mIGVhY2ggc3ViLWZpZWxkIHdpdGhpbiBpdCBhbmQgdXNlIGFzIGEga2V5IHRvIGZpbmQgdGhlXG4gICAgICAgICAgICAvLyBjb3JyZXNwb25kaW5nIHN1Yi1DYXNlRmllbGQgKHdoaWNoIGNvbnRhaW5zIHRoZSBmaWVsZCB0eXBlIGluZm9ybWF0aW9uKVxuICAgICAgICAgICAgaWYgKGNvbXBsZXhGaWVsZFZhbHVlcykge1xuICAgICAgICAgICAgICBjb21wbGV4RmllbGRWYWx1ZXMuZm9yRWFjaCgoZmllbGRWYWx1ZSwgaW5kZXgpID0+IE9iamVjdC5rZXlzKGZpZWxkVmFsdWUudmFsdWUpLmZvckVhY2goc3ViRmllbGRJZCA9PiB7XG4gICAgICAgICAgICAgICAgLy8gRmluZCB0aGUgc3ViLUNhc2VGaWVsZCBjb3JyZXNwb25kaW5nIHRvIHRoZSBzdWItZmllbGQgSURcbiAgICAgICAgICAgICAgICBsZXQgc3ViQ2FzZUZpZWxkOiBDYXNlRmllbGQ7XG4gICAgICAgICAgICAgICAgZm9yIChjb25zdCBjYXNlRmllbGQgb2YgY29sbGVjdGlvbkZpZWxkVHlwZS5jb21wbGV4X2ZpZWxkcykge1xuICAgICAgICAgICAgICAgICAgaWYgKGNhc2VGaWVsZC5pZCA9PT0gc3ViRmllbGRJZCkge1xuICAgICAgICAgICAgICAgICAgICBzdWJDYXNlRmllbGQgPSBjYXNlRmllbGQ7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIC8vIFJlY3Vyc2l2ZWx5IGRlbGV0ZSB0aGUgc3ViLWZpZWxkIHZhbHVlLCBwYXNzaW5nIGluIHRoZSBwYXJlbnQgVW50eXBlZEZvcm1Hcm91cFxuICAgICAgICAgICAgICAgIGNvbnN0IHBhcmVudEZvcm1Hcm91cDogVW50eXBlZEZvcm1Hcm91cCA9IChmaWVsZENvbnRyb2wgYXMgRm9ybUFycmF5KS5hdChpbmRleCkuZ2V0KCd2YWx1ZScpIGFzIFVudHlwZWRGb3JtR3JvdXA7XG4gICAgICAgICAgICAgICAgdGhpcy5kZWxldGVGaWVsZFZhbHVlKHBhcmVudEZvcm1Hcm91cCwgc3ViQ2FzZUZpZWxkKTtcbiAgICAgICAgICAgICAgfSkpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgfSBlbHNlIGlmIChjb2xsZWN0aW9uRmllbGRUeXBlLnR5cGUgPT09ICdEb2N1bWVudCcpIHtcbiAgICAgICAgICAgIC8vIEdldCB0aGUgYXJyYXkgb2YgRG9jdW1lbnQgZmllbGQgdmFsdWVzXG4gICAgICAgICAgICBjb25zdCBkb2N1bWVudEZpZWxkVmFsdWVzID0gZmllbGRDb250cm9sLnZhbHVlIGFzIGFueVtdO1xuXG4gICAgICAgICAgICAvLyBGb3IgZWFjaCBEb2N1bWVudCBmaWVsZCB2YWx1ZSwgc2V0IGFsbCBpdHMgcHJvcGVydHkgdmFsdWVzIHRvIG51bGwgKHRoaXMgaXMgbm90IGFjY2VwdGVkIGJ5IHRoZVxuICAgICAgICAgICAgLy8gYmFjay1lbmQgYnV0IHdpbGwgYmUgaGFuZGxlZCBieSBzYW5pdGlzZU9iamVjdCgpIGluIEZvcm1WYWx1ZVNlcnZpY2UgYmVmb3JlIHNlbmRpbmcgLSBzZWUgYmVsb3cgZm9yXG4gICAgICAgICAgICAvLyB0aGUgc2luZ2xlIERvY3VtZW50IGNhc2UpXG4gICAgICAgICAgICBpZiAoZG9jdW1lbnRGaWVsZFZhbHVlcykge1xuICAgICAgICAgICAgICBkb2N1bWVudEZpZWxkVmFsdWVzLmZvckVhY2goKGZpZWxkVmFsdWUsIGluZGV4KSA9PiBPYmplY3Qua2V5cyhmaWVsZFZhbHVlLnZhbHVlKS5mb3JFYWNoKHN1YkZpZWxkSWQgPT4ge1xuICAgICAgICAgICAgICAgIC8vIEdldCB0aGUgVW50eXBlZEZvcm1Hcm91cCBjb250YWluaW5nIHRoZSBGb3JtQ29udHJvbCBmb3IgdGhlIHN1Yi1maWVsZCBhbmQgc2V0IGl0cyB2YWx1ZSB0byBudWxsXG4gICAgICAgICAgICAgICAgKGZpZWxkQ29udHJvbCBhcyBGb3JtQXJyYXkpLmF0KGluZGV4KS5nZXQoYHZhbHVlLiR7c3ViRmllbGRJZH1gKS5zZXRWYWx1ZShudWxsKTtcbiAgICAgICAgICAgICAgfSkpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgfVxuICAgICAgICAvLyBPbWl0dGVkIFwiYnJlYWtcIiBpcyBpbnRlbnRpb25hbCBiZWNhdXNlIGEgY29sbGVjdGlvbiBzaG91bGQgYmUgaGFuZGxlZCBhcyBwZXIgTXVsdGlTZWxlY3RMaXN0IGlmIGl0IGlzXG4gICAgICAgIC8vIG5vdCBhIGNvbGxlY3Rpb24gb2YgQ29tcGxleCB0eXBlc1xuICAgICAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6IG5vLXN3aXRjaC1jYXNlLWZhbGwtdGhyb3VnaFxuICAgICAgICBjYXNlICdNdWx0aVNlbGVjdExpc3QnOlxuICAgICAgICAgIC8vIEZpZWxkIGNvbnRyb2wgc2hvdWxkIGJlIGEgRm9ybUFycmF5LCBzbyBtYXAgZWFjaCBvZiBpdHMgdmFsdWVzIHRvIG51bGxcbiAgICAgICAgICAvLyBOT1RFOiBUaGUgRm9ybUFycmF5IGNhbm5vdCBqdXN0IGJlIHNldCB0byBhbiBlbXB0eSBhcnJheSBiZWNhdXNlIEFuZ3VsYXIgY2hlY2tzIHRoYXQgYWxsIGV4aXN0aW5nIHZhbHVlc1xuICAgICAgICAgIC8vIG9mIGEgRm9ybUFycmF5IGFyZSBwcmVzZW50OyBzZXR0aW5nIHRoZSBjb250cm9sJ3MgdmFsdWUgdG8gYW4gZW1wdHkgYXJyYXkgY2F1c2VzIGEgcnVudGltZSBlcnJvclxuICAgICAgICAgIGlmIChmaWVsZENvbnRyb2wudmFsdWUpIHtcbiAgICAgICAgICAgIC8vIE5lZWQgdG8gYWxsb3cgZm9yIGZpZWxkIHZhbHVlcyB0aGF0IGFyZSBvYmplY3RzLCBub3QganVzdCBwcmltaXRpdmVzXG4gICAgICAgICAgICBmaWVsZENvbnRyb2wuc2V0VmFsdWUodGhpcy5tYXBBcnJheVZhbHVlc1RvTnVsbChmaWVsZENvbnRyb2wudmFsdWUpKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgJ0RvY3VtZW50JzpcbiAgICAgICAgICAvLyBOT1RFOiBUaGUgZmllbGQgY29udHJvbCAoYSBVbnR5cGVkRm9ybUdyb3VwIGluIHRoaXMgY2FzZSkgY2Fubm90IGp1c3QgYmUgc2V0IHRvIG51bGwgYmVjYXVzZSBBbmd1bGFyIGNoZWNrcyB0aGF0XG4gICAgICAgICAgLy8gYWxsIGV4aXN0aW5nIHZhbHVlcyBvZiBhIFVudHlwZWRGb3JtR3JvdXAgYXJlIHByZXNlbnQ7IHNldHRpbmcgdGhlIGNvbnRyb2wncyB2YWx1ZSB0byBudWxsIGNhdXNlcyBhIHJ1bnRpbWUgZXJyb3JcbiAgICAgICAgICBjb25zdCBkb2N1bWVudEZpZWxkVmFsdWUgPSBmaWVsZENvbnRyb2wudmFsdWU7XG4gICAgICAgICAgZm9yIChjb25zdCBrZXkgaW4gZG9jdW1lbnRGaWVsZFZhbHVlKSB7XG4gICAgICAgICAgICBpZiAoZmllbGRDb250cm9sLmdldChrZXkpKSB7XG4gICAgICAgICAgICAgIC8vIFRoZSBiYWNrLWVuZCBkb2Vzbid0IGFjY2VwdCBudWxsIGFzIGEgdmFsaWQgdmFsdWUgZm9yIGFueSBvZiB0aGUgRG9jdW1lbnQgZmllbGQgdHlwZSBwcm9wZXJ0aWVzIGJ1dFxuICAgICAgICAgICAgICAvLyB0aGlzIGlzIGhhbmRsZWQgYnkgc2FuaXRpc2VPYmplY3QoKSBpbiBGb3JtVmFsdWVTZXJ2aWNlLCByZXR1cm5pbmcgYSBudWxsIG9iamVjdCBmb3IgdGhlIGVudGlyZVxuICAgICAgICAgICAgICAvLyBEb2N1bWVudCBmaWVsZCwgaWYgYW55IG9mIGl0cyBwcm9wZXJ0aWVzIGlzIG51bGwgLSB3aGljaCBpcyBhY2NlcHRlZCBieSB0aGUgYmFjay1lbmRcbiAgICAgICAgICAgICAgZmllbGRDb250cm9sLmdldChrZXkpLnNldFZhbHVlKG51bGwpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgICBicmVhaztcbiAgICAgICAgLy8gTm90ZTogdGhlIGRlZmF1bHQgY2FzZSBhcHBsaWVzIHRvIER5bmFtaWNMaXN0IGZpZWxkcywgdG9vXG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgZmllbGRDb250cm9sLnNldFZhbHVlKG51bGwpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBNYXBzIGFsbCB2YWx1ZXMgb2YgYW4gYXJyYXkgdG8gYG51bGxgLCByZXRhaW5pbmcga2V5cyBmb3IgYW55IHZhbHVlcyB0aGF0IGFyZSBvYmplY3RzLiBGb3IgZXhhbXBsZSxcbiAgICogYFt7IGlkOiAnMCcsIHZhbHVlOiAnVGVzdCcgfSwgJ1Rlc3QnXWAgd291bGQgYmVjb21lIGBbeyBpZDogbnVsbCwgdmFsdWU6IG51bGwgfSwgbnVsbF1gLlxuICAgKiBAcGFyYW0gYXJyYXkgVGhlIGFycmF5IG9mIHZhbHVlcyB0byBtYXBcbiAgICogQHJldHVybnMgQSBuZXcgYXJyYXkgd2l0aCB0aGUgbWFwcGVkIHZhbHVlc1xuICAgKi9cbiAgcHVibGljIG1hcEFycmF5VmFsdWVzVG9OdWxsKGFycmF5OiBhbnlbXSk6IGFueVtdIHtcbiAgICByZXR1cm4gYXJyYXkubWFwKGVsZW1lbnQgPT4ge1xuICAgICAgcmV0dXJuIHR5cGVvZiBlbGVtZW50ID09PSAnb2JqZWN0J1xuICAgICAgICA/IE9iamVjdC5hc3NpZ24oe30sIC4uLk9iamVjdC5rZXlzKGVsZW1lbnQpLm1hcChrID0+ICh7IFtrXTogbnVsbCB9KSkpXG4gICAgICAgIDogbnVsbDtcbiAgICB9KTtcbiAgfVxufVxuIl19