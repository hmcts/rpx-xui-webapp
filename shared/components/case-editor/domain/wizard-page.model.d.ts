import { Orderable } from '../../../domain/order/orderable.model';
import { WizardPageField } from './wizard-page-field.model';
import { CaseField } from '../../../domain/definition/case-field.model';
import { ShowCondition } from '../../../directives/conditional-show/domain/conditional-show.model';
export declare class WizardPage implements Orderable {
    id: string;
    label: string;
    order?: number;
    wizard_page_fields: WizardPageField[];
    case_fields: CaseField[];
    show_condition?: string;
    parsedShowCondition: ShowCondition;
    getCol1Fields(): CaseField[];
    getCol2Fields(): CaseField[];
    isMultiColumn(): Boolean;
}
