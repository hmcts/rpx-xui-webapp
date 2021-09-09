import { OnInit } from '@angular/core';
import { CaseViewEvent } from '../../domain';
import { CasesService, CaseNotifier } from '../case-editor';
import { AlertService } from '../../services';
export declare class CaseTimelineComponent implements OnInit {
    private caseNotifier;
    private casesService;
    private alertService;
    case: string;
    events: CaseViewEvent[];
    selectedEventId: string;
    dspMode: typeof CaseTimelineDisplayMode;
    displayMode: CaseTimelineDisplayMode;
    constructor(caseNotifier: CaseNotifier, casesService: CasesService, alertService: AlertService);
    ngOnInit(): void;
    isDataLoaded(): boolean;
    caseHistoryClicked(eventId: string): void;
    goToCaseTimeline(): void;
}
export declare enum CaseTimelineDisplayMode {
    TIMELINE = 0,
    DETAILS = 1
}
