import { Orderable } from '../../../domain/order/orderable.model';
import { ComplexFieldOverride } from './wizard-page-field-complex-override.model';
export declare class WizardPageField implements Orderable {
    case_field_id: string;
    order?: number;
    page_column_no?: number;
    complex_field_overrides?: ComplexFieldOverride[];
}
//# sourceMappingURL=wizard-page-field.model.d.ts.map