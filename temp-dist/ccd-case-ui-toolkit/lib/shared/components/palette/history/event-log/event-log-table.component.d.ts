import { EventEmitter, OnInit } from '@angular/core';
import { CaseViewEvent } from '../../../../domain';
import * as i0 from "@angular/core";
export declare class EventLogTableComponent implements OnInit {
    events: CaseViewEvent[];
    selected: CaseViewEvent;
    onSelect: EventEmitter<CaseViewEvent>;
    onCaseHistory: EventEmitter<string>;
    isPartOfCaseTimeline: boolean;
    ngOnInit(): void;
    select(event: CaseViewEvent): void;
    significantItemExist(event: CaseViewEvent): boolean;
    getSignificantItemUrl(event: CaseViewEvent): string;
    getSignificantItemDesc(event: CaseViewEvent): string;
    caseHistoryClicked(eventId: string): void;
    getAriaLabelforColumn(event: CaseViewEvent): string;
    getAriaLabelforRow(event: CaseViewEvent): string;
    getAriaLabelforLink(event: CaseViewEvent): string;
    static ɵfac: i0.ɵɵFactoryDeclaration<EventLogTableComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<EventLogTableComponent, "ccd-event-log-table", never, { "events": "events"; "selected": "selected"; }, { "onSelect": "onSelect"; "onCaseHistory": "onCaseHistory"; }, never, never, false, never>;
}
//# sourceMappingURL=event-log-table.component.d.ts.map