import { EventEmitter, OnInit } from '@angular/core';
import { CaseViewEvent } from '../../../../domain';
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
}
