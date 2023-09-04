import { CaseField } from './case-field.model';
import { FieldTypeEnum } from './field-type-enum.model';
import { FixedListItem } from './fixed-list-item.model';
export declare class FieldType {
    id: string;
    type: FieldTypeEnum;
    min?: number | Date;
    max?: number | Date;
    regular_expression?: string;
    fixed_list_items?: FixedListItem[];
    complex_fields?: CaseField[];
    collection_field_type?: FieldType;
}
//# sourceMappingURL=field-type.model.d.ts.map