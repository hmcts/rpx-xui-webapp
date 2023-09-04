import { WizardPage } from '../../components/case-editor/domain/wizard-page.model';
import { CaseField } from '../definition/case-field.model';
export declare class CaseEventTrigger {
    id: string;
    name: string;
    description?: string;
    case_id?: string;
    case_fields: CaseField[];
    event_token: string;
    wizard_pages: WizardPage[];
    show_summary?: boolean;
    show_event_notes?: boolean;
    end_button_label?: string;
    can_save_draft?: boolean;
    hasFields(): boolean;
    hasPages(): boolean;
}
//# sourceMappingURL=case-event-trigger.model.d.ts.map