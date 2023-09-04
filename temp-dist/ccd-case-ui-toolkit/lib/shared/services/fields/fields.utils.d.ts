import { AbstractControl, FormArray, FormControl, UntypedFormGroup } from '@angular/forms';
import { WizardPage } from '../../components/case-editor/domain';
import { AbstractFormFieldComponent } from '../../components/palette/base-field/abstract-form-field.component';
import { FlagsWithFormGroupPath } from '../../components/palette/case-flag/domain/case-flag.model';
import { CaseEventTrigger, CaseField, CaseView, FieldType, FieldTypeEnum, Predicate } from '../../domain';
import * as i0 from "@angular/core";
export declare class FieldsUtils {
    private static readonly caseLevelCaseFlagsFieldId;
    private static readonly currencyPipe;
    private static readonly datePipe;
    static readonly LABEL_SUFFIX = "---LABEL";
    static readonly SERVER_RESPONSE_FIELD_TYPE_COLLECTION = "Collection";
    static readonly SERVER_RESPONSE_FIELD_TYPE_COMPLEX = "Complex";
    static readonly SERVER_RESPONSE_FIELD_TYPE_DYNAMIC_LIST_TYPE: FieldTypeEnum[];
    static convertToCaseField(obj: any): CaseField;
    static toValuesMap(caseFields: CaseField[]): any;
    static isObject(elem: any): boolean;
    static isNonEmptyObject(elem: any): boolean;
    static isArray(elem: any): boolean;
    static areCollectionValuesSimpleFields(fieldValue: any[]): boolean;
    static isCollectionOfSimpleTypes(fieldValue: any): boolean;
    static isMultiSelectValue(form: any): boolean;
    static isNonEmptyArray(pageFormFields: any): boolean;
    static isCollection(pageFormFields: any): boolean;
    static isCollectionWithValue(pageFormFields: any[]): boolean;
    static cloneObject(obj: any): any;
    static getCaseFields(caseView: CaseView): CaseField[];
    static addCaseFieldAndComponentReferences(c: AbstractControl, cf: CaseField, comp: AbstractFormFieldComponent): void;
    /**
     * Recursive check of an array or object and its descendants for the presence of any non-empty values.
     *
     * @param object The array or object to check
     * @returns `true` if the array or object (or a descendant) contains at least one non-empty value; `false` otherwise
     */
    static containsNonEmptyValues(object: object): boolean;
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
    static handleNestedDynamicLists(jsonBody: {
        case_fields: CaseField[];
    }): any;
    private static prepareValue;
    private static readonly DEFAULT_MERGE_FUNCTION;
    private static readonly LABEL_MERGE_FUNCTION;
    /**
     * Formats a `MoneyGBP` value to include currency units.
     * @param fieldValue The CurrencyPipe expects an `any` parameter so this must also be `any`,
     * but it should be "number-like" (e.g., '1234')
     * @returns A formatted string (e.g., £12.34)
     */
    private static getMoneyGBP;
    private static getLabel;
    private static getDate;
    private static getFixedListLabelByCodeOrEmpty;
    private static textForInvalidField;
    private static setDynamicListDefinition;
    private static getDynamicListValue;
    private static getNestedFieldValues;
    static isFlagsCaseField(caseField: CaseField): boolean;
    /**
     * @deprecated Use {@link isCaseFieldOfType} instead, passing 'FlagLauncher' as the single type in the `types` array
     */
    static isFlagLauncherCaseField(caseField: CaseField): boolean;
    /**
     * @deprecated Use {@link isCaseFieldOfType} instead, passing 'ComponentLauncher' as the single type in the `types`
     * array
     */
    static isComponentLauncherCaseField(caseField: CaseField): boolean;
    /**
     * Checks if a {@link CaseField} is of one of the given field types.
     *
     * @param caseField The `CaseField` to check
     * @param types An array of one or more field types
     * @returns `true` if the `CaseField` type is one of those in the array of types to check against; `false`
     * otherwise or if `caseField` or `types` are falsy
     */
    static isCaseFieldOfType(caseField: CaseField, types: FieldTypeEnum[]): boolean;
    static isLinkedCasesCaseField(caseField: CaseField): boolean;
    static containsLinkedCasesCaseField(caseFields: CaseField[]): boolean;
    static isFlagsFieldType(fieldType: FieldType): boolean;
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
    static extractFlagsDataFromCaseField(flags: FlagsWithFormGroupPath[], caseField: CaseField, pathToFlagsFormGroup: string, topLevelCaseField: CaseField, currentValue?: object): FlagsWithFormGroupPath[];
    private static mapCaseFieldToFlagsWithFormGroupPathObject;
    private static mapValueToFlagsWithFormGroupPathObject;
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
    static countActiveFlagsInCaseField(activeCount: number, caseField: CaseField, currentValue?: object): number;
    buildCanShowPredicate(eventTrigger: CaseEventTrigger, form: any): Predicate<WizardPage>;
    getCurrentEventState(eventTrigger: {
        case_fields: CaseField[];
    }, form: UntypedFormGroup): object;
    cloneCaseField(obj: any): CaseField;
    mergeCaseFieldsAndFormFields(caseFields: CaseField[], formFields: object): object;
    mergeLabelCaseFieldsAndFormFields(caseFields: CaseField[], formFields: object): object;
    controlIterator(aControl: AbstractControl, formArrayFn: (array: FormArray) => void, formGroupFn: (group: UntypedFormGroup) => void, controlFn: (control: FormControl) => void): void;
    private mergeFields;
    static ɵfac: i0.ɵɵFactoryDeclaration<FieldsUtils, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<FieldsUtils>;
}
//# sourceMappingURL=fields.utils.d.ts.map