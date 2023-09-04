import { OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, UntypedFormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AbstractAppConfig } from '../../../../app.config';
import { CaseView, ErrorMessage } from '../../../domain';
import { AccessReason } from './models';
import * as i0 from "@angular/core";
export declare class CaseReviewSpecificAccessRequestComponent implements OnInit, OnDestroy {
    private readonly fb;
    private readonly route;
    private readonly router;
    private readonly appConfig;
    static CANCEL_LINK_DESTINATION: string;
    collapsed: boolean;
    title: string;
    hint: string;
    caseRefLabel: string;
    formGroup: UntypedFormGroup;
    submitted: boolean;
    errorMessage: ErrorMessage;
    readonly accessReasons: DisplayedAccessReason[];
    requestAccessDetails: RequestAccessDetails;
    caseSubscription: Subscription;
    userAccessType: string;
    caseDetails: CaseView;
    private readonly genericError;
    private readonly radioSelectedControlName;
    constructor(fb: FormBuilder, route: ActivatedRoute, router: Router, appConfig: AbstractAppConfig);
    ngOnInit(): void;
    ngOnDestroy(): void;
    onChange(): void;
    onSubmit(): void;
    onCancel(): void;
    setMockData(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<CaseReviewSpecificAccessRequestComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<CaseReviewSpecificAccessRequestComponent, "ccd-case-review-specific-access-request", never, {}, {}, never, never, false, never>;
}
export interface DisplayedAccessReason {
    reason: AccessReason;
    checked: boolean;
}
export interface RequestAccessDetails {
    caseName: string;
    caseReference: string;
    dateSubmitted: string;
    requestFrom: string;
    reasonForCaseAccess: string;
}
//# sourceMappingURL=case-review-specific-access-request.component.d.ts.map