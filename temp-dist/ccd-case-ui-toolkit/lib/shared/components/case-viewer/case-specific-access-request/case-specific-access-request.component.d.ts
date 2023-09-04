import { OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, UntypedFormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ErrorMessage } from '../../../domain';
import { CaseNotifier, CasesService } from '../../case-editor';
import * as i0 from "@angular/core";
export declare class CaseSpecificAccessRequestComponent implements OnDestroy, OnInit {
    private readonly fb;
    private readonly router;
    private readonly casesService;
    private readonly route;
    private readonly caseNotifier;
    static CANCEL_LINK_DESTINATION: string;
    collapsed: boolean;
    title: string;
    hint: string;
    caseRefLabel: string;
    formGroup: UntypedFormGroup;
    submitted: boolean;
    errorMessage: ErrorMessage;
    $roleAssignmentResponseSubscription: Subscription;
    private readonly genericError;
    private readonly specificReasonControlName;
    constructor(fb: FormBuilder, router: Router, casesService: CasesService, route: ActivatedRoute, caseNotifier: CaseNotifier);
    ngOnInit(): void;
    onChange(): void;
    onSubmit(): void;
    onCancel(): void;
    ngOnDestroy(): void;
    private inputEmpty;
    static ɵfac: i0.ɵɵFactoryDeclaration<CaseSpecificAccessRequestComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<CaseSpecificAccessRequestComponent, "ccd-case-specific-access-request", never, {}, {}, never, never, false, never>;
}
//# sourceMappingURL=case-specific-access-request.component.d.ts.map