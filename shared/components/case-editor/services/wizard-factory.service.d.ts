import { CaseEventTrigger } from '../../../domain/case-view/case-event-trigger.model';
import { Wizard } from '../domain';
export declare class WizardFactoryService {
    create(eventTrigger: CaseEventTrigger): Wizard;
}
