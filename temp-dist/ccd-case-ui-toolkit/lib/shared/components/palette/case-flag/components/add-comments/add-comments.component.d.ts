import { EventEmitter, OnInit } from '@angular/core';
import { UntypedFormGroup } from '@angular/forms';
import { ErrorMessage } from '../../../../../domain';
import { CaseFlagState } from '../../domain';
import { AddCommentsErrorMessage, AddCommentsStep, CaseFlagWizardStepTitle } from '../../enums';
import * as i0 from "@angular/core";
export declare class AddCommentsComponent implements OnInit {
    formGroup: UntypedFormGroup;
    optional: boolean;
    caseFlagStateEmitter: EventEmitter<CaseFlagState>;
    addCommentsTitle: CaseFlagWizardStepTitle;
    errorMessages: ErrorMessage[];
    flagCommentsNotEnteredErrorMessage: AddCommentsErrorMessage;
    flagCommentsCharLimitErrorMessage: AddCommentsErrorMessage;
    addCommentsHint: AddCommentsStep;
    addCommentsCharLimitInfo: AddCommentsStep;
    readonly flagCommentsControlName = "flagComments";
    private readonly commentsMaxCharLimit;
    ngOnInit(): void;
    onNext(): void;
    private validateTextEntry;
    static ɵfac: i0.ɵɵFactoryDeclaration<AddCommentsComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<AddCommentsComponent, "ccd-add-comments", never, { "formGroup": "formGroup"; "optional": "optional"; }, { "caseFlagStateEmitter": "caseFlagStateEmitter"; }, never, never, false, never>;
}
//# sourceMappingURL=add-comments.component.d.ts.map