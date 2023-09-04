import { CaseField } from '../../domain/definition/case-field.model';
import { FieldTypeEnum } from '../../domain/definition/field-type-enum.model';
import * as i0 from "@angular/core";
export declare class FieldTypeSanitiser {
    static readonly FIELD_TYPE_COMPLEX: FieldTypeEnum;
    static readonly FIELD_TYPE_COLLECTION: FieldTypeEnum;
    static readonly FIELD_TYPE_DYNAMIC_LIST: FieldTypeEnum;
    static readonly FIELD_TYPE_DYNAMIC_RADIO_LIST: FieldTypeEnum;
    static readonly FIELD_TYPE_DYNAMIC_MULTISELECT_LIST: FieldTypeEnum;
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
    private convertArrayToDynamicListOutput;
    private convertStringToDynamicListOutput;
    private getListItems;
    static ɵfac: i0.ɵɵFactoryDeclaration<FieldTypeSanitiser, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<FieldTypeSanitiser>;
}
//# sourceMappingURL=field-type-sanitiser.d.ts.map