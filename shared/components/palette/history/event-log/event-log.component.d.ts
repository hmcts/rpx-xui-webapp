import { OnInit, EventEmitter } from '@angular/core';
import { CaseViewEvent } from '../../../../domain';
export declare class EventLogComponent implements OnInit {
    events: CaseViewEvent[];
    onCaseHistory: EventEmitter<String>;
    selected: CaseViewEvent;
    isPartOfCaseTimeline: boolean;
    ngOnInit(): void;
    select(event: CaseViewEvent): void;
    caseHistoryClicked(eventId: string): void;
}
