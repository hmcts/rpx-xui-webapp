import { Subject } from 'rxjs/Subject';
import { CaseEventTrigger } from '../../../domain';
export declare class EventTriggerService {
    eventTriggerSource: Subject<CaseEventTrigger>;
    announceEventTrigger(eventTrigger: CaseEventTrigger): void;
}
