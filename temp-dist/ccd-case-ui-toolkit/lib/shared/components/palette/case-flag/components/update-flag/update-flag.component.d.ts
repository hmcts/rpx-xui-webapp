import { EventEmitter, OnInit } from '@angular/core';
import { UntypedFormGroup } from '@angular/forms';
import { ErrorMessage } from '../../../../../domain';
import { CaseFlagState, FlagDetailDisplayWithFormGroupPath } from '../../domain';
import { UpdateFlagErrorMessage, UpdateFlagStep } from '../../enums';
import * as i0 from "@angular/core";
export declare class UpdateFlagComponent implements OnInit {
    formGroup: UntypedFormGroup;
    selectedFlag: FlagDetailDisplayWithFormGroupPath;
    caseFlagStateEmitter: EventEmitter<CaseFlagState>;
    updateFlagTitle: string;
    errorMessages: ErrorMessage[];
    updateFlagNotEnteredErrorMessage: UpdateFlagErrorMessage;
    updateFlagCharLimitErrorMessage: UpdateFlagErrorMessage;
    updateFlagHint: UpdateFlagStep;
    updateFlagCharLimitInfo: UpdateFlagStep;
    readonly updateFlagControlName = "flagComments";
    private readonly commentsMaxCharLimit;
    ngOnInit(): void;
    onNext(): void;
    onChangeStatus(): void;
    private validateTextEntry;
    static ɵfac: i0.ɵɵFactoryDeclaration<UpdateFlagComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<UpdateFlagComponent, "ccd-update-flag", never, { "formGroup": "formGroup"; "selectedFlag": "selectedFlag"; }, { "caseFlagStateEmitter": "caseFlagStateEmitter"; }, never, never, false, never>;
}
//# sourceMappingURL=update-flag.component.d.ts.map