import { OnInit } from '@angular/core';
import { FlagDetailDisplay } from '../../domain';
import { CaseFlagSummaryListDisplayMode } from '../../enums';
import * as i0 from "@angular/core";
export declare class CaseFlagSummaryListComponent implements OnInit {
    flagForSummaryDisplay: FlagDetailDisplay;
    summaryListDisplayMode: CaseFlagSummaryListDisplayMode;
    flagDescription: string;
    flagComments: string;
    flagStatus: string;
    displayMode: typeof CaseFlagSummaryListDisplayMode;
    addUpdateFlagHeaderText: string;
    readonly caseLevelLocation = "Case level";
    private readonly updateFlagHeaderText;
    private readonly addFlagHeaderText;
    ngOnInit(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<CaseFlagSummaryListComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<CaseFlagSummaryListComponent, "ccd-case-flag-summary-list", never, { "flagForSummaryDisplay": "flagForSummaryDisplay"; "summaryListDisplayMode": "summaryListDisplayMode"; }, {}, never, never, false, never>;
}
//# sourceMappingURL=case-flag-summary-list.component.d.ts.map