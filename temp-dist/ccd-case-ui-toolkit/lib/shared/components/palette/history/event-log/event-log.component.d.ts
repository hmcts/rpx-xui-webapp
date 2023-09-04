import { EventEmitter, OnInit } from '@angular/core';
import { CaseViewEvent } from '../../../../domain';
import * as i0 from "@angular/core";
export declare class EventLogComponent implements OnInit {
    events: CaseViewEvent[];
    onCaseHistory: EventEmitter<string>;
    selected: CaseViewEvent;
    isPartOfCaseTimeline: boolean;
    ngOnInit(): void;
    select(event: CaseViewEvent): void;
    caseHistoryClicked(eventId: string): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<EventLogComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<EventLogComponent, "ccd-event-log", never, { "events": "events"; }, { "onCaseHistory": "onCaseHistory"; }, never, never, false, never>;
}
//# sourceMappingURL=event-log.component.d.ts.map