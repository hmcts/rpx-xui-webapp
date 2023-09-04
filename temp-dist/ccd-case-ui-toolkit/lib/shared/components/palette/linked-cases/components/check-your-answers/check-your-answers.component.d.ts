import { EventEmitter, OnInit } from '@angular/core';
import { CaseLink, LinkedCasesState } from '../../domain';
import { LinkedCasesService } from '../../services/linked-cases.service';
import * as i0 from "@angular/core";
export declare class CheckYourAnswersComponent implements OnInit {
    private linkedCasesService;
    linkedCasesStateEmitter: EventEmitter<LinkedCasesState>;
    linkedCases: CaseLink[];
    casesToUnlink: CaseLink[];
    isLinkCasesJourney: boolean;
    linkedCasesTableCaption: string;
    constructor(linkedCasesService: LinkedCasesService);
    ngOnInit(): void;
    onChange(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<CheckYourAnswersComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<CheckYourAnswersComponent, "ccd-linked-cases-check-your-answers", never, {}, { "linkedCasesStateEmitter": "linkedCasesStateEmitter"; }, never, never, false, never>;
}
//# sourceMappingURL=check-your-answers.component.d.ts.map