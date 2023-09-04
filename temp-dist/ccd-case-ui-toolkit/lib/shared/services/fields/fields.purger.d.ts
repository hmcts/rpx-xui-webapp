import { UntypedFormGroup } from '@angular/forms';
import { Wizard } from '../../components/case-editor/domain/wizard.model';
import { CaseEventTrigger } from '../../domain/case-view/case-event-trigger.model';
import { CaseField } from '../../domain/definition/case-field.model';
import { FieldsUtils } from './fields.utils';
import * as i0 from "@angular/core";
export declare class FieldsPurger {
    private readonly fieldsUtils;
    constructor(fieldsUtils: FieldsUtils);
    clearHiddenFields(form: UntypedFormGroup, wizard: Wizard, eventTrigger: CaseEventTrigger, currentPageId: string): void;
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
     * @param UntypedFormGroup The `UntypedFormGroup` instance containing the `FormControl` for the specified field
     * @param field The `CaseField` whose value is to be deleted in the backend
     * @param parentField Reference to the parent `CaseField`. Used for checking specifically where a Complex field and
     * its sub-fields have `retain_hidden_value` set to `true`, but the field's parent has it set to `false` or undefined
     */
    deleteFieldValue(formGroup: UntypedFormGroup, field: CaseField, parentField?: CaseField): void;
    /**
     * Maps all values of an array to `null`, retaining keys for any values that are objects. For example,
     * `[{ id: '0', value: 'Test' }, 'Test']` would become `[{ id: null, value: null }, null]`.
     * @param array The array of values to map
     * @returns A new array with the mapped values
     */
    mapArrayValuesToNull(array: any[]): any[];
    static ɵfac: i0.ɵɵFactoryDeclaration<FieldsPurger, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<FieldsPurger>;
}
//# sourceMappingURL=fields.purger.d.ts.map