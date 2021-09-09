import { AbstractControl, FormArray, FormControl, FormGroup } from '@angular/forms';
import { WizardPage } from '../../components/case-editor/domain';
import { AbstractFormFieldComponent } from '../../components/palette/base-field/abstract-form-field.component';
import { CaseEventTrigger, CaseField, CaseView, Predicate } from '../../domain';
export declare class FieldsUtils {
    private static readonly currencyPipe;
    private static readonly datePipe;
    static readonly LABEL_SUFFIX = "---LABEL";
    static convertToCaseField(obj: any): CaseField;
    static toValuesMap(caseFields: CaseField[]): any;
    static getType(elem: any): string;
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
    static addCaseFieldAndComponentReferences(c: AbstractControl, cf: CaseField, comp: AbstractFormFieldComponent): void;
    /**
     * Recursive check of an array or object and its descendants for the presence of any non-empty values.
     *
     * @param object The array or object to check
     * @returns `true` if the array or object (or a descendant) contains at least one non-empty value; `false` otherwise
     */
    static containsNonEmptyValues(object: object): boolean;
    buildCanShowPredicate(eventTrigger: CaseEventTrigger, form: any): Predicate<WizardPage>;
    getCurrentEventState(eventTrigger: {
        case_fields: CaseField[];
    }, form: FormGroup): object;
    cloneCaseField(obj: any): CaseField;
    mergeCaseFieldsAndFormFields(caseFields: CaseField[], formFields: object): object;
    mergeLabelCaseFieldsAndFormFields(caseFields: CaseField[], formFields: object): object;
    controlIterator(aControl: AbstractControl, formArrayFn: (array: FormArray) => void, formGroupFn: (group: FormGroup) => void, controlFn: (control: FormControl) => void): void;
    private mergeFields;
}
