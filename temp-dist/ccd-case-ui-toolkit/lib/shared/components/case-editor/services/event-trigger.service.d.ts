import { Subject } from 'rxjs';
import { CaseEventTrigger } from '../../../domain/case-view/case-event-trigger.model';
import * as i0 from "@angular/core";
export declare class EventTriggerService {
    eventTriggerSource: Subject<CaseEventTrigger>;
    announceEventTrigger(eventTrigger: CaseEventTrigger): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<EventTriggerService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<EventTriggerService>;
}
//# sourceMappingURL=event-trigger.service.d.ts.map