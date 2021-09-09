import { CaseField } from '../../domain/definition';
import { FieldTypeEnum } from '../../domain/definition/field-type-enum.model';
export declare class FieldTypeSanitiser {
    static readonly FIELD_TYPE_COMPLEX: FieldTypeEnum;
    static readonly FIELD_TYPE_COLLECTION: FieldTypeEnum;
    static readonly FIELD_TYPE_DYNAMIC_LIST: FieldTypeEnum;
    static readonly FIELD_TYPE_DYNAMIC_RADIO_LIST: FieldTypeEnum;
    /**
     * This method finds dynamiclists in a form and replaces their string
     * values, with a JSON object, as below:
     * From: 'xyz'
     * To  : {
     *   value: { code:'xyz', label:'XYZ' },
     *   list_items: [
     *     { code:'xyz', label:'XYZ'},
     *     { code:'abc', label:'ABC'}
     *   ]
     * }
     * @param caseFields The CaseFields to assess.
     * @param data The data in the form.
     */
    sanitiseLists(caseFields: CaseField[], data: any): void;
    private convertStringToDynamicListOutput;
    private getListItems;
}
