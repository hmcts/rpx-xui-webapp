import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, UntypedFormGroup } from '@angular/forms';
import { CaseFlagFieldState, CaseFlagStatus, CaseFlagWizardStepTitle, UpdateFlagErrorMessage, UpdateFlagStep } from '../../enums';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
import * as i2 from "@angular/forms";
function UpdateFlagComponent_div_8_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 16)(1, "span", 17);
    i0.ɵɵtext(2, "Error:");
    i0.ɵɵelementEnd();
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate1(" ", ctx_r0.updateFlagNotEnteredErrorMessage, " ");
} }
function UpdateFlagComponent_div_9_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 18)(1, "span", 17);
    i0.ɵɵtext(2, "Error:");
    i0.ɵɵelementEnd();
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate1(" ", ctx_r1.updateFlagCharLimitErrorMessage, " ");
} }
function UpdateFlagComponent_button_22_Template(rf, ctx) { if (rf & 1) {
    const _r4 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 19);
    i0.ɵɵlistener("click", function UpdateFlagComponent_button_22_Template_button_click_0_listener() { i0.ɵɵrestoreView(_r4); const ctx_r3 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r3.onChangeStatus()); });
    i0.ɵɵtext(1, " Make inactive ");
    i0.ɵɵelementEnd();
} }
const _c0 = function (a0) { return { "form-group-error": a0 }; };
const _c1 = function (a0) { return { "govuk-tag--grey": a0 }; };
export class UpdateFlagComponent {
    constructor() {
        this.caseFlagStateEmitter = new EventEmitter();
        this.updateFlagTitle = '';
        this.errorMessages = [];
        this.updateFlagNotEnteredErrorMessage = null;
        this.updateFlagCharLimitErrorMessage = null;
        this.updateFlagControlName = 'flagComments';
        this.commentsMaxCharLimit = 200;
    }
    ngOnInit() {
        this.updateFlagHint = UpdateFlagStep.HINT_TEXT;
        this.updateFlagCharLimitInfo = UpdateFlagStep.CHARACTER_LIMIT_INFO;
        this.formGroup.addControl(this.updateFlagControlName, new FormControl(''));
        if (this.selectedFlag && this.selectedFlag.flagDetailDisplay && this.selectedFlag.flagDetailDisplay.flagDetail) {
            const flagDetail = this.selectedFlag.flagDetailDisplay.flagDetail;
            // Populate flag comments text area with existing comments
            this.formGroup.get(this.updateFlagControlName).setValue(flagDetail.flagComment);
            if (flagDetail.name) {
                this.updateFlagTitle =
                    `${CaseFlagWizardStepTitle.UPDATE_FLAG_TITLE} "${flagDetail.name}${flagDetail.subTypeValue
                        ? `, ${flagDetail.subTypeValue}"`
                        : '"'}`;
            }
        }
    }
    onNext() {
        // Validate flag comments entry
        this.validateTextEntry();
        // If validation has passed, update the flag details with the comments entered
        if (this.errorMessages.length === 0) {
            this.selectedFlag.flagDetailDisplay.flagDetail = {
                ...this.selectedFlag.flagDetailDisplay.flagDetail, flagComment: this.formGroup.get(this.updateFlagControlName).value
            };
        }
        // Return case flag field state, error messages, and selected flag detail to the parent. The selected flag must be
        // re-emitted because the parent component repopulates this on handling this EventEmitter
        this.caseFlagStateEmitter.emit({
            currentCaseFlagFieldState: CaseFlagFieldState.FLAG_UPDATE,
            errorMessages: this.errorMessages,
            selectedFlag: this.selectedFlag
        });
    }
    onChangeStatus() {
        this.selectedFlag.flagDetailDisplay.flagDetail = {
            ...this.selectedFlag.flagDetailDisplay.flagDetail,
            status: this.selectedFlag.flagDetailDisplay.flagDetail.status === CaseFlagStatus.ACTIVE
                ? CaseFlagStatus.INACTIVE
                : this.selectedFlag.flagDetailDisplay.flagDetail.status
        };
    }
    validateTextEntry() {
        this.updateFlagNotEnteredErrorMessage = null;
        this.updateFlagCharLimitErrorMessage = null;
        this.errorMessages = [];
        const comment = this.formGroup.get(this.updateFlagControlName).value;
        if (!comment) {
            this.updateFlagNotEnteredErrorMessage = UpdateFlagErrorMessage.FLAG_COMMENTS_NOT_ENTERED;
            this.errorMessages.push({
                title: '',
                description: UpdateFlagErrorMessage.FLAG_COMMENTS_NOT_ENTERED,
                fieldId: this.updateFlagControlName
            });
        }
        if (comment && comment.length > this.commentsMaxCharLimit) {
            this.updateFlagCharLimitErrorMessage = UpdateFlagErrorMessage.FLAG_COMMENTS_CHAR_LIMIT_EXCEEDED;
            this.errorMessages.push({
                title: '',
                description: UpdateFlagErrorMessage.FLAG_COMMENTS_CHAR_LIMIT_EXCEEDED,
                fieldId: this.updateFlagControlName
            });
        }
    }
}
UpdateFlagComponent.ɵfac = function UpdateFlagComponent_Factory(t) { return new (t || UpdateFlagComponent)(); };
UpdateFlagComponent.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: UpdateFlagComponent, selectors: [["ccd-update-flag"]], inputs: { formGroup: "formGroup", selectedFlag: "selectedFlag" }, outputs: { caseFlagStateEmitter: "caseFlagStateEmitter" }, decls: 26, vars: 18, consts: [[1, "form-group", 3, "formGroup"], ["data-module", "govuk-character-count", "data-maxlength", "200", 1, "govuk-character-count"], [1, "govuk-form-group", 3, "ngClass"], [1, "govuk-label-wrapper"], [1, "govuk-label", "govuk-label--l", 3, "for"], ["id", "update-flag-hint", 1, "govuk-hint"], ["id", "update-flag-not-entered-error-message", "class", "govuk-error-message", 4, "ngIf"], ["id", "update-flag-char-limit-error", "class", "govuk-error-message", 4, "ngIf"], ["rows", "5", "aria-describedby", "update-flag-hint update-flag-char-limit-info update-flag-char-limit-error", 1, "govuk-textarea", 3, "id", "name", "formControlName"], ["id", "update-flag-char-limit-info", "aria-live", "polite", 1, "govuk-hint", "govuk-character-count__message"], [1, "govuk-grid-row"], [1, "govuk-grid-column-one-half"], [1, "govuk-tag", 3, "ngClass"], ["class", "button button-secondary", "type", "button", 3, "click", 4, "ngIf"], [1, "govuk-button-group"], ["type", "button", 1, "button", "button-primary", 3, "click"], ["id", "update-flag-not-entered-error-message", 1, "govuk-error-message"], [1, "govuk-visually-hidden"], ["id", "update-flag-char-limit-error", 1, "govuk-error-message"], ["type", "button", 1, "button", "button-secondary", 3, "click"]], template: function UpdateFlagComponent_Template(rf, ctx) { if (rf & 1) {
        i0.ɵɵelementStart(0, "div", 0)(1, "div", 1)(2, "div", 2)(3, "h1", 3)(4, "label", 4);
        i0.ɵɵtext(5);
        i0.ɵɵelementEnd()();
        i0.ɵɵelementStart(6, "div", 5);
        i0.ɵɵtext(7);
        i0.ɵɵelementEnd();
        i0.ɵɵtemplate(8, UpdateFlagComponent_div_8_Template, 4, 1, "div", 6);
        i0.ɵɵtemplate(9, UpdateFlagComponent_div_9_Template, 4, 1, "div", 7);
        i0.ɵɵelementStart(10, "textarea", 8);
        i0.ɵɵtext(11, "      ");
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(12, "div", 9);
        i0.ɵɵtext(13);
        i0.ɵɵelementEnd()()();
        i0.ɵɵelementStart(14, "div", 10)(15, "div", 11)(16, "p");
        i0.ɵɵtext(17, "Flag status: ");
        i0.ɵɵelementStart(18, "span")(19, "strong", 12);
        i0.ɵɵtext(20);
        i0.ɵɵelementEnd()()()();
        i0.ɵɵelementStart(21, "div", 11);
        i0.ɵɵtemplate(22, UpdateFlagComponent_button_22_Template, 2, 0, "button", 13);
        i0.ɵɵelementEnd()();
        i0.ɵɵelementStart(23, "div", 14)(24, "button", 15);
        i0.ɵɵlistener("click", function UpdateFlagComponent_Template_button_click_24_listener() { return ctx.onNext(); });
        i0.ɵɵtext(25, "Next");
        i0.ɵɵelementEnd()()();
    } if (rf & 2) {
        i0.ɵɵproperty("formGroup", ctx.formGroup);
        i0.ɵɵadvance(2);
        i0.ɵɵproperty("ngClass", i0.ɵɵpureFunction1(14, _c0, ctx.errorMessages.length > 0));
        i0.ɵɵadvance(2);
        i0.ɵɵproperty("for", ctx.updateFlagControlName);
        i0.ɵɵadvance(1);
        i0.ɵɵtextInterpolate1(" ", ctx.updateFlagTitle, " ");
        i0.ɵɵadvance(2);
        i0.ɵɵtextInterpolate1(" ", ctx.updateFlagHint, " ");
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngIf", ctx.updateFlagNotEnteredErrorMessage);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngIf", ctx.updateFlagCharLimitErrorMessage);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("id", ctx.updateFlagControlName)("name", ctx.updateFlagControlName)("formControlName", ctx.updateFlagControlName);
        i0.ɵɵadvance(3);
        i0.ɵɵtextInterpolate1(" ", ctx.updateFlagCharLimitInfo, " ");
        i0.ɵɵadvance(6);
        i0.ɵɵproperty("ngClass", i0.ɵɵpureFunction1(16, _c1, ctx.selectedFlag.flagDetailDisplay.flagDetail.status === "Inactive"));
        i0.ɵɵadvance(1);
        i0.ɵɵtextInterpolate1(" ", ctx.selectedFlag.flagDetailDisplay.flagDetail.status, " ");
        i0.ɵɵadvance(2);
        i0.ɵɵproperty("ngIf", ctx.selectedFlag.flagDetailDisplay.flagDetail.status === "Active");
    } }, dependencies: [i1.NgClass, i1.NgIf, i2.DefaultValueAccessor, i2.NgControlStatus, i2.NgControlStatusGroup, i2.FormGroupDirective, i2.FormControlName], encapsulation: 2 });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(UpdateFlagComponent, [{
        type: Component,
        args: [{ selector: 'ccd-update-flag', template: "<div class=\"form-group\" [formGroup]=\"formGroup\">\n  <div class=\"govuk-character-count\" data-module=\"govuk-character-count\" data-maxlength=\"200\">\n    <div class=\"govuk-form-group\" [ngClass]=\"{'form-group-error': errorMessages.length > 0}\">\n      <h1 class=\"govuk-label-wrapper\"><label class=\"govuk-label govuk-label--l\" [for]=\"updateFlagControlName\">\n          {{updateFlagTitle}}\n        </label>\n      </h1>\n      <div id=\"update-flag-hint\" class=\"govuk-hint\">\n        {{updateFlagHint}}\n      </div>\n      <div id=\"update-flag-not-entered-error-message\" class=\"govuk-error-message\"\n        *ngIf=\"updateFlagNotEnteredErrorMessage\">\n        <span class=\"govuk-visually-hidden\">Error:</span> {{updateFlagNotEnteredErrorMessage}}\n      </div>\n      <div id=\"update-flag-char-limit-error\" class=\"govuk-error-message\"\n        *ngIf=\"updateFlagCharLimitErrorMessage\">\n        <span class=\"govuk-visually-hidden\">Error:</span> {{updateFlagCharLimitErrorMessage}}\n      </div>\n      <textarea class=\"govuk-textarea\" [id]=\"updateFlagControlName\"\n        [name]=\"updateFlagControlName\" [formControlName]=\"updateFlagControlName\" rows=\"5\"\n        aria-describedby=\"update-flag-hint update-flag-char-limit-info update-flag-char-limit-error\">\n      </textarea>\n      <div id=\"update-flag-char-limit-info\" class=\"govuk-hint govuk-character-count__message\" aria-live=\"polite\">\n        {{updateFlagCharLimitInfo}}\n      </div>\n    </div>\n  </div>\n  <div class=\"govuk-grid-row\">\n    <div class=\"govuk-grid-column-one-half\">\n      <p>Flag status:\n        <span>\n          <strong class=\"govuk-tag\" [ngClass]=\"{'govuk-tag--grey': selectedFlag.flagDetailDisplay.flagDetail.status === 'Inactive'}\">\n            {{selectedFlag.flagDetailDisplay.flagDetail.status}}\n          </strong>\n        </span>\n      </p>\n    </div>\n    <div class=\"govuk-grid-column-one-half\">\n      <button class=\"button button-secondary\" type=\"button\" (click)=\"onChangeStatus()\" *ngIf=\"selectedFlag.flagDetailDisplay.flagDetail.status === 'Active'\">\n        Make inactive\n      </button>\n    </div>\n  </div>\n  <div class=\"govuk-button-group\">\n    <button class=\"button button-primary\" type=\"button\" (click)=\"onNext()\">Next</button>\n  </div>\n</div>\n" }]
    }], null, { formGroup: [{
            type: Input
        }], selectedFlag: [{
            type: Input
        }], caseFlagStateEmitter: [{
            type: Output
        }] }); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXBkYXRlLWZsYWcuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvY2NkLWNhc2UtdWktdG9vbGtpdC9zcmMvbGliL3NoYXJlZC9jb21wb25lbnRzL3BhbGV0dGUvY2FzZS1mbGFnL2NvbXBvbmVudHMvdXBkYXRlLWZsYWcvdXBkYXRlLWZsYWcuY29tcG9uZW50LnRzIiwiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvY2NkLWNhc2UtdWktdG9vbGtpdC9zcmMvbGliL3NoYXJlZC9jb21wb25lbnRzL3BhbGV0dGUvY2FzZS1mbGFnL2NvbXBvbmVudHMvdXBkYXRlLWZsYWcvdXBkYXRlLWZsYWcuY29tcG9uZW50Lmh0bWwiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxZQUFZLEVBQUUsS0FBSyxFQUFVLE1BQU0sRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMvRSxPQUFPLEVBQUUsV0FBVyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFHL0QsT0FBTyxFQUFFLGtCQUFrQixFQUFFLGNBQWMsRUFBRSx1QkFBdUIsRUFBRSxzQkFBc0IsRUFBRSxjQUFjLEVBQUUsTUFBTSxhQUFhLENBQUM7Ozs7O0lDTTVILCtCQUMyQyxlQUFBO0lBQ0wsc0JBQU07SUFBQSxpQkFBTztJQUFDLFlBQ3BEO0lBQUEsaUJBQU07OztJQUQ4QyxlQUNwRDtJQURvRCx3RUFDcEQ7OztJQUNBLCtCQUMwQyxlQUFBO0lBQ0osc0JBQU07SUFBQSxpQkFBTztJQUFDLFlBQ3BEO0lBQUEsaUJBQU07OztJQUQ4QyxlQUNwRDtJQURvRCx1RUFDcEQ7Ozs7SUFxQkEsa0NBQXVKO0lBQWpHLG9LQUFTLGVBQUEsdUJBQWdCLENBQUEsSUFBQztJQUM5RSwrQkFDRjtJQUFBLGlCQUFTOzs7O0FEOUJmLE1BQU0sT0FBTyxtQkFBbUI7SUFKaEM7UUFTbUIseUJBQW9CLEdBQWdDLElBQUksWUFBWSxFQUFpQixDQUFDO1FBRWhHLG9CQUFlLEdBQUcsRUFBRSxDQUFDO1FBQ3JCLGtCQUFhLEdBQW1CLEVBQUUsQ0FBQztRQUNuQyxxQ0FBZ0MsR0FBMkIsSUFBSSxDQUFDO1FBQ2hFLG9DQUErQixHQUEyQixJQUFJLENBQUM7UUFHdEQsMEJBQXFCLEdBQUcsY0FBYyxDQUFDO1FBQ3RDLHlCQUFvQixHQUFHLEdBQUcsQ0FBQztLQXFFN0M7SUFuRVEsUUFBUTtRQUNiLElBQUksQ0FBQyxjQUFjLEdBQUcsY0FBYyxDQUFDLFNBQVMsQ0FBQztRQUMvQyxJQUFJLENBQUMsdUJBQXVCLEdBQUcsY0FBYyxDQUFDLG9CQUFvQixDQUFDO1FBQ25FLElBQUksQ0FBQyxTQUFTLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxxQkFBcUIsRUFBRSxJQUFJLFdBQVcsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBRTNFLElBQUksSUFBSSxDQUFDLFlBQVksSUFBSSxJQUFJLENBQUMsWUFBWSxDQUFDLGlCQUFpQixJQUFJLElBQUksQ0FBQyxZQUFZLENBQUMsaUJBQWlCLENBQUMsVUFBVSxFQUFFO1lBQzlHLE1BQU0sVUFBVSxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsaUJBQWlCLENBQUMsVUFBVSxDQUFDO1lBQ2xFLDBEQUEwRDtZQUMxRCxJQUFJLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMscUJBQXFCLENBQUMsQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDLFdBQVcsQ0FBQyxDQUFDO1lBQ2hGLElBQUksVUFBVSxDQUFDLElBQUksRUFBRTtnQkFDbkIsSUFBSSxDQUFDLGVBQWU7b0JBQ2xCLEdBQUcsdUJBQXVCLENBQUMsaUJBQWlCLEtBQUssVUFBVSxDQUFDLElBQUksR0FBRyxVQUFVLENBQUMsWUFBWTt3QkFDeEYsQ0FBQyxDQUFDLEtBQUssVUFBVSxDQUFDLFlBQVksR0FBRzt3QkFDakMsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDO2FBQ2I7U0FDRjtJQUNILENBQUM7SUFFTSxNQUFNO1FBQ1gsK0JBQStCO1FBQy9CLElBQUksQ0FBQyxpQkFBaUIsRUFBRSxDQUFDO1FBQ3pCLDhFQUE4RTtRQUM5RSxJQUFJLElBQUksQ0FBQyxhQUFhLENBQUMsTUFBTSxLQUFLLENBQUMsRUFBRTtZQUNuQyxJQUFJLENBQUMsWUFBWSxDQUFDLGlCQUFpQixDQUFDLFVBQVUsR0FBRztnQkFDL0MsR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLGlCQUFpQixDQUFDLFVBQVUsRUFBRSxXQUFXLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLHFCQUFxQixDQUFDLENBQUMsS0FBSzthQUNySCxDQUFDO1NBQ0g7UUFDRCxrSEFBa0g7UUFDbEgseUZBQXlGO1FBQ3pGLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxJQUFJLENBQUM7WUFDN0IseUJBQXlCLEVBQUUsa0JBQWtCLENBQUMsV0FBVztZQUN6RCxhQUFhLEVBQUUsSUFBSSxDQUFDLGFBQWE7WUFDakMsWUFBWSxFQUFFLElBQUksQ0FBQyxZQUFZO1NBQ2hDLENBQUMsQ0FBQztJQUNMLENBQUM7SUFFTSxjQUFjO1FBQ25CLElBQUksQ0FBQyxZQUFZLENBQUMsaUJBQWlCLENBQUMsVUFBVSxHQUFHO1lBQy9DLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxpQkFBaUIsQ0FBQyxVQUFVO1lBQ2pELE1BQU0sRUFBRSxJQUFJLENBQUMsWUFBWSxDQUFDLGlCQUFpQixDQUFDLFVBQVUsQ0FBQyxNQUFNLEtBQUssY0FBYyxDQUFDLE1BQU07Z0JBQ3JGLENBQUMsQ0FBQyxjQUFjLENBQUMsUUFBUTtnQkFDekIsQ0FBQyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsaUJBQWlCLENBQUMsVUFBVSxDQUFDLE1BQU07U0FDMUQsQ0FBQztJQUNKLENBQUM7SUFFTyxpQkFBaUI7UUFDdkIsSUFBSSxDQUFDLGdDQUFnQyxHQUFHLElBQUksQ0FBQztRQUM3QyxJQUFJLENBQUMsK0JBQStCLEdBQUcsSUFBSSxDQUFDO1FBQzVDLElBQUksQ0FBQyxhQUFhLEdBQUcsRUFBRSxDQUFDO1FBQ3hCLE1BQU0sT0FBTyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDLEtBQUssQ0FBQztRQUNyRSxJQUFJLENBQUMsT0FBTyxFQUFFO1lBQ1osSUFBSSxDQUFDLGdDQUFnQyxHQUFHLHNCQUFzQixDQUFDLHlCQUF5QixDQUFDO1lBQ3pGLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDO2dCQUN0QixLQUFLLEVBQUUsRUFBRTtnQkFDVCxXQUFXLEVBQUUsc0JBQXNCLENBQUMseUJBQXlCO2dCQUM3RCxPQUFPLEVBQUUsSUFBSSxDQUFDLHFCQUFxQjthQUNwQyxDQUFDLENBQUM7U0FDSjtRQUNELElBQUksT0FBTyxJQUFJLE9BQU8sQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLG9CQUFvQixFQUFFO1lBQ3pELElBQUksQ0FBQywrQkFBK0IsR0FBRyxzQkFBc0IsQ0FBQyxpQ0FBaUMsQ0FBQztZQUNoRyxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQztnQkFDdEIsS0FBSyxFQUFFLEVBQUU7Z0JBQ1QsV0FBVyxFQUFFLHNCQUFzQixDQUFDLGlDQUFpQztnQkFDckUsT0FBTyxFQUFFLElBQUksQ0FBQyxxQkFBcUI7YUFDcEMsQ0FBQyxDQUFDO1NBQ0o7SUFDSCxDQUFDOztzRkFsRlUsbUJBQW1CO3NFQUFuQixtQkFBbUI7UUNWaEMsOEJBQWdELGFBQUEsYUFBQSxZQUFBLGVBQUE7UUFJdEMsWUFDRjtRQUFBLGlCQUFRLEVBQUE7UUFFViw4QkFBOEM7UUFDNUMsWUFDRjtRQUFBLGlCQUFNO1FBQ04sb0VBR007UUFDTixvRUFHTTtRQUNOLG9DQUUrRjtRQUMvRix1QkFBQTtRQUFBLGlCQUFXO1FBQ1gsK0JBQTJHO1FBQ3pHLGFBQ0Y7UUFBQSxpQkFBTSxFQUFBLEVBQUE7UUFHVixnQ0FBNEIsZUFBQSxTQUFBO1FBRXJCLDhCQUNEO1FBQUEsNkJBQU0sa0JBQUE7UUFFRixhQUNGO1FBQUEsaUJBQVMsRUFBQSxFQUFBLEVBQUE7UUFJZixnQ0FBd0M7UUFDdEMsNkVBRVM7UUFDWCxpQkFBTSxFQUFBO1FBRVIsZ0NBQWdDLGtCQUFBO1FBQ3NCLGlHQUFTLFlBQVEsSUFBQztRQUFDLHFCQUFJO1FBQUEsaUJBQVMsRUFBQSxFQUFBOztRQTVDaEUseUNBQXVCO1FBRWIsZUFBMEQ7UUFBMUQsbUZBQTBEO1FBQ1osZUFBNkI7UUFBN0IsK0NBQTZCO1FBQ25HLGVBQ0Y7UUFERSxvREFDRjtRQUdBLGVBQ0Y7UUFERSxtREFDRjtRQUVHLGVBQXNDO1FBQXRDLDJEQUFzQztRQUl0QyxlQUFxQztRQUFyQywwREFBcUM7UUFHUCxlQUE0QjtRQUE1Qiw4Q0FBNEIsbUNBQUEsOENBQUE7UUFLM0QsZUFDRjtRQURFLDREQUNGO1FBTzhCLGVBQWdHO1FBQWhHLDBIQUFnRztRQUN4SCxlQUNGO1FBREUscUZBQ0Y7UUFLOEUsZUFBbUU7UUFBbkUsd0ZBQW1FOzt1RkQ1QjlJLG1CQUFtQjtjQUovQixTQUFTOzJCQUNFLGlCQUFpQjtnQkFLWCxTQUFTO2tCQUF4QixLQUFLO1lBQ1UsWUFBWTtrQkFBM0IsS0FBSztZQUVXLG9CQUFvQjtrQkFBcEMsTUFBTSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgRXZlbnRFbWl0dGVyLCBJbnB1dCwgT25Jbml0LCBPdXRwdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEZvcm1Db250cm9sLCBVbnR5cGVkRm9ybUdyb3VwIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHsgRXJyb3JNZXNzYWdlIH0gZnJvbSAnLi4vLi4vLi4vLi4vLi4vZG9tYWluJztcbmltcG9ydCB7IENhc2VGbGFnU3RhdGUsIEZsYWdEZXRhaWxEaXNwbGF5V2l0aEZvcm1Hcm91cFBhdGggfSBmcm9tICcuLi8uLi9kb21haW4nO1xuaW1wb3J0IHsgQ2FzZUZsYWdGaWVsZFN0YXRlLCBDYXNlRmxhZ1N0YXR1cywgQ2FzZUZsYWdXaXphcmRTdGVwVGl0bGUsIFVwZGF0ZUZsYWdFcnJvck1lc3NhZ2UsIFVwZGF0ZUZsYWdTdGVwIH0gZnJvbSAnLi4vLi4vZW51bXMnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdjY2QtdXBkYXRlLWZsYWcnLFxuICB0ZW1wbGF0ZVVybDogJy4vdXBkYXRlLWZsYWcuY29tcG9uZW50Lmh0bWwnXG59KVxuZXhwb3J0IGNsYXNzIFVwZGF0ZUZsYWdDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuXG4gIEBJbnB1dCgpIHB1YmxpYyBmb3JtR3JvdXA6IFVudHlwZWRGb3JtR3JvdXA7XG4gIEBJbnB1dCgpIHB1YmxpYyBzZWxlY3RlZEZsYWc6IEZsYWdEZXRhaWxEaXNwbGF5V2l0aEZvcm1Hcm91cFBhdGg7XG5cbiAgQE91dHB1dCgpIHB1YmxpYyBjYXNlRmxhZ1N0YXRlRW1pdHRlcjogRXZlbnRFbWl0dGVyPENhc2VGbGFnU3RhdGU+ID0gbmV3IEV2ZW50RW1pdHRlcjxDYXNlRmxhZ1N0YXRlPigpO1xuXG4gIHB1YmxpYyB1cGRhdGVGbGFnVGl0bGUgPSAnJztcbiAgcHVibGljIGVycm9yTWVzc2FnZXM6IEVycm9yTWVzc2FnZVtdID0gW107XG4gIHB1YmxpYyB1cGRhdGVGbGFnTm90RW50ZXJlZEVycm9yTWVzc2FnZTogVXBkYXRlRmxhZ0Vycm9yTWVzc2FnZSA9IG51bGw7XG4gIHB1YmxpYyB1cGRhdGVGbGFnQ2hhckxpbWl0RXJyb3JNZXNzYWdlOiBVcGRhdGVGbGFnRXJyb3JNZXNzYWdlID0gbnVsbDtcbiAgcHVibGljIHVwZGF0ZUZsYWdIaW50OiBVcGRhdGVGbGFnU3RlcDtcbiAgcHVibGljIHVwZGF0ZUZsYWdDaGFyTGltaXRJbmZvOiBVcGRhdGVGbGFnU3RlcDtcbiAgcHVibGljIHJlYWRvbmx5IHVwZGF0ZUZsYWdDb250cm9sTmFtZSA9ICdmbGFnQ29tbWVudHMnO1xuICBwcml2YXRlIHJlYWRvbmx5IGNvbW1lbnRzTWF4Q2hhckxpbWl0ID0gMjAwO1xuXG4gIHB1YmxpYyBuZ09uSW5pdCgpOiB2b2lkIHtcbiAgICB0aGlzLnVwZGF0ZUZsYWdIaW50ID0gVXBkYXRlRmxhZ1N0ZXAuSElOVF9URVhUO1xuICAgIHRoaXMudXBkYXRlRmxhZ0NoYXJMaW1pdEluZm8gPSBVcGRhdGVGbGFnU3RlcC5DSEFSQUNURVJfTElNSVRfSU5GTztcbiAgICB0aGlzLmZvcm1Hcm91cC5hZGRDb250cm9sKHRoaXMudXBkYXRlRmxhZ0NvbnRyb2xOYW1lLCBuZXcgRm9ybUNvbnRyb2woJycpKTtcblxuICAgIGlmICh0aGlzLnNlbGVjdGVkRmxhZyAmJiB0aGlzLnNlbGVjdGVkRmxhZy5mbGFnRGV0YWlsRGlzcGxheSAmJiB0aGlzLnNlbGVjdGVkRmxhZy5mbGFnRGV0YWlsRGlzcGxheS5mbGFnRGV0YWlsKSB7XG4gICAgICBjb25zdCBmbGFnRGV0YWlsID0gdGhpcy5zZWxlY3RlZEZsYWcuZmxhZ0RldGFpbERpc3BsYXkuZmxhZ0RldGFpbDtcbiAgICAgIC8vIFBvcHVsYXRlIGZsYWcgY29tbWVudHMgdGV4dCBhcmVhIHdpdGggZXhpc3RpbmcgY29tbWVudHNcbiAgICAgIHRoaXMuZm9ybUdyb3VwLmdldCh0aGlzLnVwZGF0ZUZsYWdDb250cm9sTmFtZSkuc2V0VmFsdWUoZmxhZ0RldGFpbC5mbGFnQ29tbWVudCk7XG4gICAgICBpZiAoZmxhZ0RldGFpbC5uYW1lKSB7XG4gICAgICAgIHRoaXMudXBkYXRlRmxhZ1RpdGxlID1cbiAgICAgICAgICBgJHtDYXNlRmxhZ1dpemFyZFN0ZXBUaXRsZS5VUERBVEVfRkxBR19USVRMRX0gXCIke2ZsYWdEZXRhaWwubmFtZX0ke2ZsYWdEZXRhaWwuc3ViVHlwZVZhbHVlXG4gICAgICAgICAgICA/IGAsICR7ZmxhZ0RldGFpbC5zdWJUeXBlVmFsdWV9XCJgXG4gICAgICAgICAgICA6ICdcIid9YDtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBwdWJsaWMgb25OZXh0KCk6IHZvaWQge1xuICAgIC8vIFZhbGlkYXRlIGZsYWcgY29tbWVudHMgZW50cnlcbiAgICB0aGlzLnZhbGlkYXRlVGV4dEVudHJ5KCk7XG4gICAgLy8gSWYgdmFsaWRhdGlvbiBoYXMgcGFzc2VkLCB1cGRhdGUgdGhlIGZsYWcgZGV0YWlscyB3aXRoIHRoZSBjb21tZW50cyBlbnRlcmVkXG4gICAgaWYgKHRoaXMuZXJyb3JNZXNzYWdlcy5sZW5ndGggPT09IDApIHtcbiAgICAgIHRoaXMuc2VsZWN0ZWRGbGFnLmZsYWdEZXRhaWxEaXNwbGF5LmZsYWdEZXRhaWwgPSB7XG4gICAgICAgIC4uLnRoaXMuc2VsZWN0ZWRGbGFnLmZsYWdEZXRhaWxEaXNwbGF5LmZsYWdEZXRhaWwsIGZsYWdDb21tZW50OiB0aGlzLmZvcm1Hcm91cC5nZXQodGhpcy51cGRhdGVGbGFnQ29udHJvbE5hbWUpLnZhbHVlXG4gICAgICB9O1xuICAgIH1cbiAgICAvLyBSZXR1cm4gY2FzZSBmbGFnIGZpZWxkIHN0YXRlLCBlcnJvciBtZXNzYWdlcywgYW5kIHNlbGVjdGVkIGZsYWcgZGV0YWlsIHRvIHRoZSBwYXJlbnQuIFRoZSBzZWxlY3RlZCBmbGFnIG11c3QgYmVcbiAgICAvLyByZS1lbWl0dGVkIGJlY2F1c2UgdGhlIHBhcmVudCBjb21wb25lbnQgcmVwb3B1bGF0ZXMgdGhpcyBvbiBoYW5kbGluZyB0aGlzIEV2ZW50RW1pdHRlclxuICAgIHRoaXMuY2FzZUZsYWdTdGF0ZUVtaXR0ZXIuZW1pdCh7XG4gICAgICBjdXJyZW50Q2FzZUZsYWdGaWVsZFN0YXRlOiBDYXNlRmxhZ0ZpZWxkU3RhdGUuRkxBR19VUERBVEUsXG4gICAgICBlcnJvck1lc3NhZ2VzOiB0aGlzLmVycm9yTWVzc2FnZXMsXG4gICAgICBzZWxlY3RlZEZsYWc6IHRoaXMuc2VsZWN0ZWRGbGFnXG4gICAgfSk7XG4gIH1cblxuICBwdWJsaWMgb25DaGFuZ2VTdGF0dXMoKTogdm9pZCB7XG4gICAgdGhpcy5zZWxlY3RlZEZsYWcuZmxhZ0RldGFpbERpc3BsYXkuZmxhZ0RldGFpbCA9IHtcbiAgICAgIC4uLnRoaXMuc2VsZWN0ZWRGbGFnLmZsYWdEZXRhaWxEaXNwbGF5LmZsYWdEZXRhaWwsXG4gICAgICBzdGF0dXM6IHRoaXMuc2VsZWN0ZWRGbGFnLmZsYWdEZXRhaWxEaXNwbGF5LmZsYWdEZXRhaWwuc3RhdHVzID09PSBDYXNlRmxhZ1N0YXR1cy5BQ1RJVkVcbiAgICAgICAgPyBDYXNlRmxhZ1N0YXR1cy5JTkFDVElWRVxuICAgICAgICA6IHRoaXMuc2VsZWN0ZWRGbGFnLmZsYWdEZXRhaWxEaXNwbGF5LmZsYWdEZXRhaWwuc3RhdHVzXG4gICAgfTtcbiAgfVxuXG4gIHByaXZhdGUgdmFsaWRhdGVUZXh0RW50cnkoKTogdm9pZCB7XG4gICAgdGhpcy51cGRhdGVGbGFnTm90RW50ZXJlZEVycm9yTWVzc2FnZSA9IG51bGw7XG4gICAgdGhpcy51cGRhdGVGbGFnQ2hhckxpbWl0RXJyb3JNZXNzYWdlID0gbnVsbDtcbiAgICB0aGlzLmVycm9yTWVzc2FnZXMgPSBbXTtcbiAgICBjb25zdCBjb21tZW50ID0gdGhpcy5mb3JtR3JvdXAuZ2V0KHRoaXMudXBkYXRlRmxhZ0NvbnRyb2xOYW1lKS52YWx1ZTtcbiAgICBpZiAoIWNvbW1lbnQpIHtcbiAgICAgIHRoaXMudXBkYXRlRmxhZ05vdEVudGVyZWRFcnJvck1lc3NhZ2UgPSBVcGRhdGVGbGFnRXJyb3JNZXNzYWdlLkZMQUdfQ09NTUVOVFNfTk9UX0VOVEVSRUQ7XG4gICAgICB0aGlzLmVycm9yTWVzc2FnZXMucHVzaCh7XG4gICAgICAgIHRpdGxlOiAnJyxcbiAgICAgICAgZGVzY3JpcHRpb246IFVwZGF0ZUZsYWdFcnJvck1lc3NhZ2UuRkxBR19DT01NRU5UU19OT1RfRU5URVJFRCxcbiAgICAgICAgZmllbGRJZDogdGhpcy51cGRhdGVGbGFnQ29udHJvbE5hbWVcbiAgICAgIH0pO1xuICAgIH1cbiAgICBpZiAoY29tbWVudCAmJiBjb21tZW50Lmxlbmd0aCA+IHRoaXMuY29tbWVudHNNYXhDaGFyTGltaXQpIHtcbiAgICAgIHRoaXMudXBkYXRlRmxhZ0NoYXJMaW1pdEVycm9yTWVzc2FnZSA9IFVwZGF0ZUZsYWdFcnJvck1lc3NhZ2UuRkxBR19DT01NRU5UU19DSEFSX0xJTUlUX0VYQ0VFREVEO1xuICAgICAgdGhpcy5lcnJvck1lc3NhZ2VzLnB1c2goe1xuICAgICAgICB0aXRsZTogJycsXG4gICAgICAgIGRlc2NyaXB0aW9uOiBVcGRhdGVGbGFnRXJyb3JNZXNzYWdlLkZMQUdfQ09NTUVOVFNfQ0hBUl9MSU1JVF9FWENFRURFRCxcbiAgICAgICAgZmllbGRJZDogdGhpcy51cGRhdGVGbGFnQ29udHJvbE5hbWVcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxufVxuIiwiPGRpdiBjbGFzcz1cImZvcm0tZ3JvdXBcIiBbZm9ybUdyb3VwXT1cImZvcm1Hcm91cFwiPlxuICA8ZGl2IGNsYXNzPVwiZ292dWstY2hhcmFjdGVyLWNvdW50XCIgZGF0YS1tb2R1bGU9XCJnb3Z1ay1jaGFyYWN0ZXItY291bnRcIiBkYXRhLW1heGxlbmd0aD1cIjIwMFwiPlxuICAgIDxkaXYgY2xhc3M9XCJnb3Z1ay1mb3JtLWdyb3VwXCIgW25nQ2xhc3NdPVwieydmb3JtLWdyb3VwLWVycm9yJzogZXJyb3JNZXNzYWdlcy5sZW5ndGggPiAwfVwiPlxuICAgICAgPGgxIGNsYXNzPVwiZ292dWstbGFiZWwtd3JhcHBlclwiPjxsYWJlbCBjbGFzcz1cImdvdnVrLWxhYmVsIGdvdnVrLWxhYmVsLS1sXCIgW2Zvcl09XCJ1cGRhdGVGbGFnQ29udHJvbE5hbWVcIj5cbiAgICAgICAgICB7e3VwZGF0ZUZsYWdUaXRsZX19XG4gICAgICAgIDwvbGFiZWw+XG4gICAgICA8L2gxPlxuICAgICAgPGRpdiBpZD1cInVwZGF0ZS1mbGFnLWhpbnRcIiBjbGFzcz1cImdvdnVrLWhpbnRcIj5cbiAgICAgICAge3t1cGRhdGVGbGFnSGludH19XG4gICAgICA8L2Rpdj5cbiAgICAgIDxkaXYgaWQ9XCJ1cGRhdGUtZmxhZy1ub3QtZW50ZXJlZC1lcnJvci1tZXNzYWdlXCIgY2xhc3M9XCJnb3Z1ay1lcnJvci1tZXNzYWdlXCJcbiAgICAgICAgKm5nSWY9XCJ1cGRhdGVGbGFnTm90RW50ZXJlZEVycm9yTWVzc2FnZVwiPlxuICAgICAgICA8c3BhbiBjbGFzcz1cImdvdnVrLXZpc3VhbGx5LWhpZGRlblwiPkVycm9yOjwvc3Bhbj4ge3t1cGRhdGVGbGFnTm90RW50ZXJlZEVycm9yTWVzc2FnZX19XG4gICAgICA8L2Rpdj5cbiAgICAgIDxkaXYgaWQ9XCJ1cGRhdGUtZmxhZy1jaGFyLWxpbWl0LWVycm9yXCIgY2xhc3M9XCJnb3Z1ay1lcnJvci1tZXNzYWdlXCJcbiAgICAgICAgKm5nSWY9XCJ1cGRhdGVGbGFnQ2hhckxpbWl0RXJyb3JNZXNzYWdlXCI+XG4gICAgICAgIDxzcGFuIGNsYXNzPVwiZ292dWstdmlzdWFsbHktaGlkZGVuXCI+RXJyb3I6PC9zcGFuPiB7e3VwZGF0ZUZsYWdDaGFyTGltaXRFcnJvck1lc3NhZ2V9fVxuICAgICAgPC9kaXY+XG4gICAgICA8dGV4dGFyZWEgY2xhc3M9XCJnb3Z1ay10ZXh0YXJlYVwiIFtpZF09XCJ1cGRhdGVGbGFnQ29udHJvbE5hbWVcIlxuICAgICAgICBbbmFtZV09XCJ1cGRhdGVGbGFnQ29udHJvbE5hbWVcIiBbZm9ybUNvbnRyb2xOYW1lXT1cInVwZGF0ZUZsYWdDb250cm9sTmFtZVwiIHJvd3M9XCI1XCJcbiAgICAgICAgYXJpYS1kZXNjcmliZWRieT1cInVwZGF0ZS1mbGFnLWhpbnQgdXBkYXRlLWZsYWctY2hhci1saW1pdC1pbmZvIHVwZGF0ZS1mbGFnLWNoYXItbGltaXQtZXJyb3JcIj5cbiAgICAgIDwvdGV4dGFyZWE+XG4gICAgICA8ZGl2IGlkPVwidXBkYXRlLWZsYWctY2hhci1saW1pdC1pbmZvXCIgY2xhc3M9XCJnb3Z1ay1oaW50IGdvdnVrLWNoYXJhY3Rlci1jb3VudF9fbWVzc2FnZVwiIGFyaWEtbGl2ZT1cInBvbGl0ZVwiPlxuICAgICAgICB7e3VwZGF0ZUZsYWdDaGFyTGltaXRJbmZvfX1cbiAgICAgIDwvZGl2PlxuICAgIDwvZGl2PlxuICA8L2Rpdj5cbiAgPGRpdiBjbGFzcz1cImdvdnVrLWdyaWQtcm93XCI+XG4gICAgPGRpdiBjbGFzcz1cImdvdnVrLWdyaWQtY29sdW1uLW9uZS1oYWxmXCI+XG4gICAgICA8cD5GbGFnIHN0YXR1czpcbiAgICAgICAgPHNwYW4+XG4gICAgICAgICAgPHN0cm9uZyBjbGFzcz1cImdvdnVrLXRhZ1wiIFtuZ0NsYXNzXT1cInsnZ292dWstdGFnLS1ncmV5Jzogc2VsZWN0ZWRGbGFnLmZsYWdEZXRhaWxEaXNwbGF5LmZsYWdEZXRhaWwuc3RhdHVzID09PSAnSW5hY3RpdmUnfVwiPlxuICAgICAgICAgICAge3tzZWxlY3RlZEZsYWcuZmxhZ0RldGFpbERpc3BsYXkuZmxhZ0RldGFpbC5zdGF0dXN9fVxuICAgICAgICAgIDwvc3Ryb25nPlxuICAgICAgICA8L3NwYW4+XG4gICAgICA8L3A+XG4gICAgPC9kaXY+XG4gICAgPGRpdiBjbGFzcz1cImdvdnVrLWdyaWQtY29sdW1uLW9uZS1oYWxmXCI+XG4gICAgICA8YnV0dG9uIGNsYXNzPVwiYnV0dG9uIGJ1dHRvbi1zZWNvbmRhcnlcIiB0eXBlPVwiYnV0dG9uXCIgKGNsaWNrKT1cIm9uQ2hhbmdlU3RhdHVzKClcIiAqbmdJZj1cInNlbGVjdGVkRmxhZy5mbGFnRGV0YWlsRGlzcGxheS5mbGFnRGV0YWlsLnN0YXR1cyA9PT0gJ0FjdGl2ZSdcIj5cbiAgICAgICAgTWFrZSBpbmFjdGl2ZVxuICAgICAgPC9idXR0b24+XG4gICAgPC9kaXY+XG4gIDwvZGl2PlxuICA8ZGl2IGNsYXNzPVwiZ292dWstYnV0dG9uLWdyb3VwXCI+XG4gICAgPGJ1dHRvbiBjbGFzcz1cImJ1dHRvbiBidXR0b24tcHJpbWFyeVwiIHR5cGU9XCJidXR0b25cIiAoY2xpY2spPVwib25OZXh0KClcIj5OZXh0PC9idXR0b24+XG4gIDwvZGl2PlxuPC9kaXY+XG4iXX0=