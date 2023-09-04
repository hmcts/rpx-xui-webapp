import { OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CaseView } from '../../../domain/case-view/case-view.model';
import { CasesService } from '../../case-editor/services/cases.service';
import * as i0 from "@angular/core";
export declare class CaseBasicAccessViewComponent implements OnInit, OnDestroy {
    private readonly casesService;
    private readonly router;
    static CANCEL_LINK_DESTINATION: string;
    caseDetails: CaseView;
    accessType: string;
    courtOrHearingCentre: string;
    showSpinner: boolean;
    private courtOrHearingCentreSubscription;
    constructor(casesService: CasesService, router: Router);
    ngOnInit(): void;
    ngOnDestroy(): void;
    onCancel(): void;
    getRequestUrl(accessType: string): string;
    static ɵfac: i0.ɵɵFactoryDeclaration<CaseBasicAccessViewComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<CaseBasicAccessViewComponent, "ccd-case-basic-access-view", never, { "caseDetails": "caseDetails"; "accessType": "accessType"; }, {}, never, never, false, never>;
}
//# sourceMappingURL=case-basic-access-view.component.d.ts.map