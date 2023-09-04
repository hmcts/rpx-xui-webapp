import { OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AbstractFieldReadComponent } from '../base-field/abstract-field-read.component';
import { PaletteContext } from '../base-field/palette-context.enum';
import { FlagDetailDisplay, FlagsWithFormGroupPath } from './domain';
import { CaseFlagSummaryListDisplayMode } from './enums';
import * as i0 from "@angular/core";
export declare class ReadCaseFlagFieldComponent extends AbstractFieldReadComponent implements OnInit {
    private readonly route;
    flagsData: FlagsWithFormGroupPath[];
    partyLevelCaseFlagData: FlagsWithFormGroupPath[];
    caseLevelCaseFlagData: FlagsWithFormGroupPath;
    paletteContext: typeof PaletteContext;
    flagForSummaryDisplay: FlagDetailDisplay;
    summaryListDisplayMode: CaseFlagSummaryListDisplayMode;
    readonly caseLevelCaseFlagsFieldId = "caseFlags";
    readonly caseNameMissing = "Case name missing";
    private readonly createMode;
    private readonly updateMode;
    constructor(route: ActivatedRoute);
    ngOnInit(): void;
    private extractNewFlagToFlagDetailDisplayObject;
    static ɵfac: i0.ɵɵFactoryDeclaration<ReadCaseFlagFieldComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<ReadCaseFlagFieldComponent, "ccd-read-case-flag-field", never, {}, {}, never, never, false, never>;
}
//# sourceMappingURL=read-case-flag-field.component.d.ts.map