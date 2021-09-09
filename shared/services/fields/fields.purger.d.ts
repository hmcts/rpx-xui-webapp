import { FormGroup } from '@angular/forms';
import { FieldsUtils } from './fields.utils';
import { Wizard } from '../../components';
import { CaseField } from '../../domain/definition';
import { CaseEventTrigger } from '../../domain';
export declare class FieldsPurger {
    private fieldsUtils;
    constructor(fieldsUtils: FieldsUtils);
    clearHiddenFields(form: FormGroup, wizard: Wizard, eventTrigger: CaseEventTrigger, currentPageId: string): void;
    private clearHiddenFieldForPageShowCondition;
    private clearHiddenFieldForFieldShowCondition;
    private retainHiddenValueByFieldType;
    private isHidden;
    private findCaseFieldByWizardPageFieldId;
    private hasShowConditionPage;
    private hasShowConditionField;
    private getShowConditionKey;
    private resetField;
    private resetPage;
    private getType;
    private isObject;
    private isReadonly;
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
    deleteFieldValue(formGroup: FormGroup, field: CaseField, parentField?: CaseField): void;
}
