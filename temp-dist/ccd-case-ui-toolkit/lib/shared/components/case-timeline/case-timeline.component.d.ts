import { OnInit } from '@angular/core';
import { CaseViewEvent } from '../../domain/case-view/case-view-event.model';
import { AlertService } from '../../services/alert/alert.service';
import { CaseNotifier, CasesService } from '../case-editor';
import * as i0 from "@angular/core";
export declare enum CaseTimelineDisplayMode {
    TIMELINE = 0,
    DETAILS = 1
}
export declare class CaseTimelineComponent implements OnInit {
    private readonly caseNotifier;
    private readonly casesService;
    private readonly alertService;
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
    static ɵfac: i0.ɵɵFactoryDeclaration<CaseTimelineComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<CaseTimelineComponent, "ccd-case-timeline", never, { "case": "case"; }, {}, never, never, false, never>;
}
//# sourceMappingURL=case-timeline.component.d.ts.map