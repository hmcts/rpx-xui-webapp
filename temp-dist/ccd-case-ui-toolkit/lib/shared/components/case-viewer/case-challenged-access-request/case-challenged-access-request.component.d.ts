import { OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, UntypedFormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ErrorMessage } from '../../../domain';
import { CaseNotifier, CasesService } from '../../case-editor';
import { AccessReason } from './models';
import * as i0 from "@angular/core";
export declare class CaseChallengedAccessRequestComponent implements OnDestroy, OnInit {
    private readonly fb;
    private readonly router;
    private readonly casesService;
    private readonly route;
    private readonly caseNotifier;
    static CANCEL_LINK_DESTINATION: string;
    title: string;
    hint: string;
    caseRefLabel: string;
    readonly accessReasons: DisplayedAccessReason[];
    formGroup: UntypedFormGroup;
    submitted: boolean;
    errorMessage: ErrorMessage;
    $roleAssignmentResponseSubscription: Subscription;
    private readonly genericError;
    private readonly radioSelectedControlName;
    private readonly caseReferenceControlName;
    private readonly otherReasonControlName;
    constructor(fb: FormBuilder, router: Router, casesService: CasesService, route: ActivatedRoute, caseNotifier: CaseNotifier);
    ngOnInit(): void;
    onChange(): void;
    onSubmit(): void;
    onCancel(): void;
    ngOnDestroy(): void;
    private inputEmpty;
    static ɵfac: i0.ɵɵFactoryDeclaration<CaseChallengedAccessRequestComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<CaseChallengedAccessRequestComponent, "ccd-case-challenged-access-request", never, {}, {}, never, never, false, never>;
}
export interface DisplayedAccessReason {
    reason: AccessReason;
    checked: boolean;
}
//# sourceMappingURL=case-challenged-access-request.component.d.ts.map