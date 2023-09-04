import { Component } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { CaseNotifier, CasesService } from '../../case-editor';
import { SpecificAccessRequestErrors, SpecificAccessRequestPageText } from './models';
import * as i0 from "@angular/core";
import * as i1 from "@angular/forms";
import * as i2 from "@angular/router";
import * as i3 from "../../case-editor";
function CaseSpecificAccessRequestComponent_exui_error_message_0_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "exui-error-message", 22);
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵproperty("error", ctx_r0.errorMessage);
} }
function CaseSpecificAccessRequestComponent_div_38_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 23);
    i0.ɵɵtext(1);
    i0.ɵɵpipe(2, "rpxTranslate");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate1(" ", i0.ɵɵpipeBind1(2, 1, ctx_r1.errorMessage.description), " ");
} }
const _c0 = function (a0) { return { "form-group-error": a0 }; };
const _c1 = function (a0) { return { "govuk-textarea--error": a0 }; };
export class CaseSpecificAccessRequestComponent {
    constructor(fb, router, casesService, route, caseNotifier) {
        this.fb = fb;
        this.router = router;
        this.casesService = casesService;
        this.route = route;
        this.caseNotifier = caseNotifier;
        this.collapsed = false;
        this.submitted = false;
        this.genericError = 'There is a problem';
        this.specificReasonControlName = 'specificReason';
    }
    ngOnInit() {
        this.title = SpecificAccessRequestPageText.TITLE;
        this.hint = SpecificAccessRequestPageText.HINT;
        this.caseRefLabel = SpecificAccessRequestPageText.CASE_REF;
        this.formGroup = this.fb.group({
            radioSelected: new FormControl(null, null),
        });
        this.formGroup.addControl(this.specificReasonControlName, new FormControl('', {
            validators: [
                (control) => {
                    if (this.inputEmpty(control)) {
                        return { invalid: true };
                    }
                    return null;
                },
            ],
            updateOn: 'submit',
        }));
    }
    onChange() {
        this.submitted = false;
        // Clear the "specific reason" fields manually. This prevents any previous value being retained by
        // the field's FormControl when the field itself is removed from the DOM by *ngIf. (If it is subsequently added back
        // to the DOM by *ngIf, it will appear empty but the associated FormControl still has the previous value.)
        this.formGroup.get(this.specificReasonControlName).setValue('');
    }
    onSubmit() {
        this.submitted = true;
        if (this.formGroup.get(this.specificReasonControlName).invalid) {
            this.errorMessage = {
                title: this.genericError,
                description: SpecificAccessRequestErrors.NO_REASON,
                fieldId: 'specific-reason',
            };
        }
        // Initiate Specific Access Request
        if (this.formGroup.valid) {
            // Get the Case Reference (for which access is being requested) from the ActivatedRouteSnapshot data
            const caseId = this.route.snapshot.params.cid;
            const specificAccessRequest = {
                specificReason: this.formGroup.get(this.specificReasonControlName).value
            };
            this.$roleAssignmentResponseSubscription = this.casesService.createSpecificAccessRequest(caseId, specificAccessRequest)
                .pipe(switchMap(() => this.caseNotifier.fetchAndRefresh(caseId)))
                .subscribe(() => {
                // Would have been nice to pass the caseId within state.data, but this isn't part of NavigationExtras until
                // Angular 7.2
                this.router.navigate(['success'], { relativeTo: this.route });
            }, () => {
                // Navigate to error page
            });
        }
    }
    onCancel() {
        // Navigate to the page before previous one (should be Search Results or Case List page, for example)
        this.router.navigateByUrl(CaseSpecificAccessRequestComponent.CANCEL_LINK_DESTINATION);
    }
    ngOnDestroy() {
        if (this.$roleAssignmentResponseSubscription) {
            this.$roleAssignmentResponseSubscription.unsubscribe();
        }
    }
    inputEmpty(input) {
        return input.value === null || input.value.trim().length === 0;
    }
}
CaseSpecificAccessRequestComponent.CANCEL_LINK_DESTINATION = '/work/my-work/list';
CaseSpecificAccessRequestComponent.ɵfac = function CaseSpecificAccessRequestComponent_Factory(t) { return new (t || CaseSpecificAccessRequestComponent)(i0.ɵɵdirectiveInject(i1.FormBuilder), i0.ɵɵdirectiveInject(i2.Router), i0.ɵɵdirectiveInject(i3.CasesService), i0.ɵɵdirectiveInject(i2.ActivatedRoute), i0.ɵɵdirectiveInject(i3.CaseNotifier)); };
CaseSpecificAccessRequestComponent.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: CaseSpecificAccessRequestComponent, selectors: [["ccd-case-specific-access-request"]], decls: 50, vars: 42, consts: [[3, "error", 4, "ngIf"], ["type", "information"], [3, "formGroup", "submit"], [1, "govuk-form-group", 3, "ngClass"], ["aria-describedby", "reason-hint", 1, "govuk-fieldset"], [1, "govuk-fieldset__legend", "govuk-fieldset__legend--l"], [1, "govuk-fieldset__heading"], ["data-module", "govuk-details", "role", "group", 1, "govuk-details"], ["role", "button", "aria-expanded", "false", 1, "govuk-details__summary"], [1, "govuk-details__summary-text"], ["aria-hidden", "true", 1, "govuk-details__text"], [1, "govuk-body"], [1, "govuk-list", "govuk-list--bullet"], ["id", "reason-hint", 1, "govuk-hint"], ["id", "conditional-reason-3"], [1, "govuk-form-group"], ["id", "specific-reason-error-message", "class", "govuk-error-message", 4, "ngIf"], ["id", "specific-reason", "name", "specific-reason", "rows", "8", "formControlName", "specificReason", 1, "govuk-textarea", 3, "ngClass"], [1, "govuk-button-group"], ["type", "submit", 1, "govuk-button", "govuk-!-margin-right-3"], [1, "govuk-grid-column-full", "govuk-!-padding-left-0"], ["href", "javascript:void(0)", 1, "govuk-body", 3, "click"], [3, "error"], ["id", "specific-reason-error-message", 1, "govuk-error-message"]], template: function CaseSpecificAccessRequestComponent_Template(rf, ctx) { if (rf & 1) {
        i0.ɵɵtemplate(0, CaseSpecificAccessRequestComponent_exui_error_message_0_Template, 1, 1, "exui-error-message", 0);
        i0.ɵɵelementStart(1, "cut-alert", 1);
        i0.ɵɵtext(2);
        i0.ɵɵpipe(3, "rpxTranslate");
        i0.ɵɵelement(4, "br");
        i0.ɵɵtext(5);
        i0.ɵɵpipe(6, "rpxTranslate");
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(7, "form", 2);
        i0.ɵɵlistener("submit", function CaseSpecificAccessRequestComponent_Template_form_submit_7_listener() { return ctx.onSubmit(); });
        i0.ɵɵelementStart(8, "div", 3)(9, "fieldset", 4)(10, "legend", 5)(11, "h1", 6);
        i0.ɵɵtext(12);
        i0.ɵɵpipe(13, "rpxTranslate");
        i0.ɵɵelementEnd()();
        i0.ɵɵelementStart(14, "details", 7)(15, "summary", 8)(16, "span", 9);
        i0.ɵɵtext(17);
        i0.ɵɵpipe(18, "rpxTranslate");
        i0.ɵɵelementEnd()();
        i0.ɵɵelementStart(19, "div", 10)(20, "p", 11);
        i0.ɵɵtext(21);
        i0.ɵɵpipe(22, "rpxTranslate");
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(23, "ul", 12)(24, "li");
        i0.ɵɵtext(25);
        i0.ɵɵpipe(26, "rpxTranslate");
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(27, "li");
        i0.ɵɵtext(28);
        i0.ɵɵpipe(29, "rpxTranslate");
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(30, "li");
        i0.ɵɵtext(31);
        i0.ɵɵpipe(32, "rpxTranslate");
        i0.ɵɵelementEnd()()()();
        i0.ɵɵelementStart(33, "div", 13);
        i0.ɵɵtext(34);
        i0.ɵɵpipe(35, "rpxTranslate");
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(36, "div", 14)(37, "div", 15);
        i0.ɵɵtemplate(38, CaseSpecificAccessRequestComponent_div_38_Template, 3, 3, "div", 16);
        i0.ɵɵelementStart(39, "textarea", 17);
        i0.ɵɵtext(40, "          ");
        i0.ɵɵelementEnd()()()()();
        i0.ɵɵelementStart(41, "div", 18)(42, "button", 19);
        i0.ɵɵtext(43);
        i0.ɵɵpipe(44, "rpxTranslate");
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(45, "div", 20)(46, "p")(47, "a", 21);
        i0.ɵɵlistener("click", function CaseSpecificAccessRequestComponent_Template_a_click_47_listener() { return ctx.onCancel(); });
        i0.ɵɵtext(48);
        i0.ɵɵpipe(49, "rpxTranslate");
        i0.ɵɵelementEnd()()()()();
    } if (rf & 2) {
        i0.ɵɵproperty("ngIf", ctx.formGroup.invalid && ctx.submitted);
        i0.ɵɵadvance(2);
        i0.ɵɵtextInterpolate1(" ", i0.ɵɵpipeBind1(3, 16, "Authorisation is needed to access this case."), "");
        i0.ɵɵadvance(3);
        i0.ɵɵtextInterpolate1(" ", i0.ɵɵpipeBind1(6, 18, "This could be because it's outside your jurisdiction, or you may be excluded from the case. If you request access to this case, it will be logged for auditing purposes."), "\n");
        i0.ɵɵadvance(2);
        i0.ɵɵproperty("formGroup", ctx.formGroup);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngClass", i0.ɵɵpureFunction1(38, _c0, ctx.formGroup.invalid && ctx.submitted));
        i0.ɵɵadvance(4);
        i0.ɵɵtextInterpolate1(" ", i0.ɵɵpipeBind1(13, 20, ctx.title), " ");
        i0.ɵɵadvance(5);
        i0.ɵɵtextInterpolate1(" ", i0.ɵɵpipeBind1(18, 22, "Help with requesting case access"), " ");
        i0.ɵɵadvance(4);
        i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(22, 24, "You could include:"));
        i0.ɵɵadvance(4);
        i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(26, 26, "the case reference of the linked case"));
        i0.ɵɵadvance(3);
        i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(29, 28, "how long you require access to this case"));
        i0.ɵɵadvance(3);
        i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(32, 30, "any other reasons why you require access"));
        i0.ɵɵadvance(3);
        i0.ɵɵtextInterpolate1(" ", i0.ɵɵpipeBind1(35, 32, ctx.hint), " ");
        i0.ɵɵadvance(4);
        i0.ɵɵproperty("ngIf", ctx.formGroup.get("specificReason").invalid && ctx.submitted);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngClass", i0.ɵɵpureFunction1(40, _c1, ctx.formGroup.get("specificReason").invalid && ctx.submitted));
        i0.ɵɵadvance(4);
        i0.ɵɵtextInterpolate1(" ", i0.ɵɵpipeBind1(44, 34, "Submit"), " ");
        i0.ɵɵadvance(5);
        i0.ɵɵtextInterpolate1(" ", i0.ɵɵpipeBind1(49, 36, "Cancel"), " ");
    } }, encapsulation: 2 });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(CaseSpecificAccessRequestComponent, [{
        type: Component,
        args: [{ selector: 'ccd-case-specific-access-request', template: "<exui-error-message\n  *ngIf=\"formGroup.invalid && submitted\"\n  [error]=\"errorMessage\"></exui-error-message>\n<cut-alert type=\"information\">\n  {{'Authorisation is needed to access this case.' | rpxTranslate}}<br />\n  {{'This could be because it\\'s outside your jurisdiction, or you may be excluded from the case. If you request access to this case, it will be logged for auditing purposes.' | rpxTranslate}}\n</cut-alert>\n<form [formGroup]=\"formGroup\" (submit)=\"onSubmit()\">\n  <div class=\"govuk-form-group\"\n    [ngClass]=\"{ 'form-group-error': formGroup.invalid && submitted }\">\n    <fieldset class=\"govuk-fieldset\" aria-describedby=\"reason-hint\">\n      <legend class=\"govuk-fieldset__legend govuk-fieldset__legend--l\">\n        <h1 class=\"govuk-fieldset__heading\">\n          {{ title | rpxTranslate }}\n        </h1>\n      </legend>\n\n      <details class=\"govuk-details\" data-module=\"govuk-details\" role=\"group\">\n        <summary\n          class=\"govuk-details__summary\"\n          role=\"button\"\n          aria-expanded=\"false\">\n          <span class=\"govuk-details__summary-text\">\n            {{'Help with requesting case access' | rpxTranslate}}\n          </span>\n        </summary>\n        <div\n          class=\"govuk-details__text\"\n          aria-hidden=\"true\">\n          <p class=\"govuk-body\">{{'You could include:' | rpxTranslate}}</p>\n          <ul class=\"govuk-list govuk-list--bullet\">\n            <li>{{'the case reference of the linked case' | rpxTranslate}}</li>\n            <li>{{'how long you require access to this case' | rpxTranslate}}</li>\n            <li>{{'any other reasons why you require access' | rpxTranslate}}</li>\n          </ul>\n        </div>\n      </details>\n\n      <div id=\"reason-hint\" class=\"govuk-hint\">\n        {{ hint | rpxTranslate }}\n      </div>\n      <div id=\"conditional-reason-3\">\n        <div class=\"govuk-form-group\">\n          <div\n            id=\"specific-reason-error-message\"\n            class=\"govuk-error-message\"\n            *ngIf=\"formGroup.get('specificReason').invalid && submitted\">\n            {{ errorMessage.description | rpxTranslate }}\n          </div>\n          <textarea\n            class=\"govuk-textarea\"\n            [ngClass]=\"{\n              'govuk-textarea--error':\n                formGroup.get('specificReason').invalid && submitted\n            }\"\n            id=\"specific-reason\"\n            name=\"specific-reason\"\n            rows=\"8\"\n            formControlName=\"specificReason\">\n          </textarea>\n        </div>\n      </div>\n    </fieldset>\n  </div>\n\n  <div class=\"govuk-button-group\">\n    <button class=\"govuk-button govuk-!-margin-right-3\" type=\"submit\">\n      {{'Submit' | rpxTranslate}}\n    </button>\n    <div class=\"govuk-grid-column-full govuk-!-padding-left-0\">\n      <p>\n        <a class=\"govuk-body\" (click)=\"onCancel()\" href=\"javascript:void(0)\">\n          {{'Cancel' | rpxTranslate}}\n        </a>\n      </p>\n    </div>\n  </div>\n</form>\n" }]
    }], function () { return [{ type: i1.FormBuilder }, { type: i2.Router }, { type: i3.CasesService }, { type: i2.ActivatedRoute }, { type: i3.CaseNotifier }]; }, null); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FzZS1zcGVjaWZpYy1hY2Nlc3MtcmVxdWVzdC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9jY2QtY2FzZS11aS10b29sa2l0L3NyYy9saWIvc2hhcmVkL2NvbXBvbmVudHMvY2FzZS12aWV3ZXIvY2FzZS1zcGVjaWZpYy1hY2Nlc3MtcmVxdWVzdC9jYXNlLXNwZWNpZmljLWFjY2Vzcy1yZXF1ZXN0LmNvbXBvbmVudC50cyIsIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2NjZC1jYXNlLXVpLXRvb2xraXQvc3JjL2xpYi9zaGFyZWQvY29tcG9uZW50cy9jYXNlLXZpZXdlci9jYXNlLXNwZWNpZmljLWFjY2Vzcy1yZXF1ZXN0L2Nhc2Utc3BlY2lmaWMtYWNjZXNzLXJlcXVlc3QuY29tcG9uZW50Lmh0bWwiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFNBQVMsRUFBcUIsTUFBTSxlQUFlLENBQUM7QUFDN0QsT0FBTyxFQUVMLFdBQVcsRUFDWCxXQUFXLEVBRVosTUFBTSxnQkFBZ0IsQ0FBQztBQUN4QixPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBRXpELE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUUzQyxPQUFPLEVBQUUsWUFBWSxFQUFFLFlBQVksRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBQy9ELE9BQU8sRUFDTCwyQkFBMkIsRUFDM0IsNkJBQTZCLEVBQzlCLE1BQU0sVUFBVSxDQUFDOzs7Ozs7SUNmbEIseUNBRThDOzs7SUFBNUMsMkNBQXNCOzs7SUF5Q2QsK0JBRytEO0lBQzdELFlBQ0Y7O0lBQUEsaUJBQU07OztJQURKLGVBQ0Y7SUFERSxzRkFDRjs7OztBRDNCVixNQUFNLE9BQU8sa0NBQWtDO0lBYzdDLFlBQ21CLEVBQWUsRUFDZixNQUFjLEVBQ2QsWUFB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RDs7UUFBQSxpQkFBSyxFQUFBLEVBQUEsRUFBQTtRQUs1RSxnQ0FBeUM7UUFDdkMsYUFDRjs7UUFBQSxpQkFBTTtRQUNOLGdDQUErQixlQUFBO1FBRTNCLHNGQUtNO1FBQ04scUNBU21DO1FBQ25DLDJCQUFBO1FBQUEsaUJBQVcsRUFBQSxFQUFBLEVBQUEsRUFBQTtRQU1uQixnQ0FBZ0Msa0JBQUE7UUFFNUIsYUFDRjs7UUFBQSxpQkFBUztRQUNULGdDQUEyRCxTQUFBLGFBQUE7UUFFakMsMkdBQVMsY0FBVSxJQUFDO1FBQ3hDLGFBQ0Y7O1FBQUEsaUJBQUksRUFBQSxFQUFBLEVBQUEsRUFBQTs7UUF4RVQsNkRBQW9DO1FBR3JDLGVBQWlFO1FBQWpFLHFHQUFpRTtRQUNqRSxlQUNGO1FBREUsbU9BQ0Y7UUFDTSxlQUF1QjtRQUF2Qix5Q0FBdUI7UUFFekIsZUFBa0U7UUFBbEUsNkZBQWtFO1FBSTVELGVBQ0Y7UUFERSxrRUFDRjtRQVNJLGVBQ0Y7UUFERSwyRkFDRjtRQUtzQixlQUF1QztRQUF2QyxrRUFBdUM7UUFFdkQsZUFBMEQ7UUFBMUQscUZBQTBEO1FBQzFELGVBQTZEO1FBQTdELHdGQUE2RDtRQUM3RCxlQUE2RDtRQUE3RCx3RkFBNkQ7UUFNckUsZUFDRjtRQURFLGlFQUNGO1FBTU8sZUFBMEQ7UUFBMUQsbUZBQTBEO1FBSzNELGVBR0U7UUFIRixtSEFHRTtRQWFSLGVBQ0Y7UUFERSxpRUFDRjtRQUlNLGVBQ0Y7UUFERSxpRUFDRjs7dUZEcERLLGtDQUFrQztjQUo5QyxTQUFTOzJCQUNFLGtDQUFrQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25EZXN0cm95LCBPbkluaXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7XG4gIEFic3RyYWN0Q29udHJvbCxcbiAgRm9ybUJ1aWxkZXIsXG4gIEZvcm1Db250cm9sLFxuICBVbnR5cGVkRm9ybUdyb3VwXG59IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7IEFjdGl2YXRlZFJvdXRlLCBSb3V0ZXIgfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xuaW1wb3J0IHsgU3Vic2NyaXB0aW9uIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBzd2l0Y2hNYXAgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQgeyBFcnJvck1lc3NhZ2UsIFNwZWNpZmljQWNjZXNzUmVxdWVzdCB9IGZyb20gJy4uLy4uLy4uL2RvbWFpbic7XG5pbXBvcnQgeyBDYXNlTm90aWZpZXIsIENhc2VzU2VydmljZSB9IGZyb20gJy4uLy4uL2Nhc2UtZWRpdG9yJztcbmltcG9ydCB7XG4gIFNwZWNpZmljQWNjZXNzUmVxdWVzdEVycm9ycyxcbiAgU3BlY2lmaWNBY2Nlc3NSZXF1ZXN0UGFnZVRleHRcbn0gZnJvbSAnLi9tb2RlbHMnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdjY2QtY2FzZS1zcGVjaWZpYy1hY2Nlc3MtcmVxdWVzdCcsXG4gIHRlbXBsYXRlVXJsOiAnLi9jYXNlLXNwZWNpZmljLWFjY2Vzcy1yZXF1ZXN0LmNvbXBvbmVudC5odG1sJyxcbn0pXG5leHBvcnQgY2xhc3MgQ2FzZVNwZWNpZmljQWNjZXNzUmVxdWVzdENvbXBvbmVudCBpbXBsZW1lbnRzIE9uRGVzdHJveSwgT25Jbml0IHtcbiAgcHVibGljIHN0YXRpYyBDQU5DRUxfTElOS19ERVNUSU5BVElPTiA9ICcvd29yay9teS13b3JrL2xpc3QnO1xuICBwdWJsaWMgY29sbGFwc2VkID0gZmFsc2U7XG4gIHB1YmxpYyB0aXRsZTogc3RyaW5nO1xuICBwdWJsaWMgaGludDogc3RyaW5nO1xuICBwdWJsaWMgY2FzZVJlZkxhYmVsOiBzdHJpbmc7XG4gIHB1YmxpYyBmb3JtR3JvdXA6IFVudHlwZWRGb3JtR3JvdXA7XG4gIHB1YmxpYyBzdWJtaXR0ZWQgPSBmYWxzZTtcbiAgcHVibGljIGVycm9yTWVzc2FnZTogRXJyb3JNZXNzYWdlO1xuICBwdWJsaWMgJHJvbGVBc3NpZ25tZW50UmVzcG9uc2VTdWJzY3JpcHRpb246IFN1YnNjcmlwdGlvbjtcblxuICBwcml2YXRlIHJlYWRvbmx5IGdlbmVyaWNFcnJvciA9ICdUaGVyZSBpcyBhIHByb2JsZW0nO1xuICBwcml2YXRlIHJlYWRvbmx5IHNwZWNpZmljUmVhc29uQ29udHJvbE5hbWUgPSAnc3BlY2lmaWNSZWFzb24nO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgcmVhZG9ubHkgZmI6IEZvcm1CdWlsZGVyLFxuICAgIHByaXZhdGUgcmVhZG9ubHkgcm91dGVyOiBSb3V0ZXIsXG4gICAgcHJpdmF0ZSByZWFkb25seSBjYXNlc1NlcnZpY2U6IENhc2VzU2VydmljZSxcbiAgICBwcml2YXRlIHJlYWRvbmx5IHJvdXRlOiBBY3RpdmF0ZWRSb3V0ZSxcbiAgICBwcml2YXRlIHJlYWRvbmx5IGNhc2VOb3RpZmllcjogQ2FzZU5vdGlmaWVyXG4gICkgeyB9XG5cbiAgcHVibGljIG5nT25Jbml0KCk6IHZvaWQge1xuICAgIHRoaXMudGl0bGUgPSBTcGVjaWZpY0FjY2Vzc1JlcXVlc3RQYWdlVGV4dC5USVRMRTtcbiAgICB0aGlzLmhpbnQgPSBTcGVjaWZpY0FjY2Vzc1JlcXVlc3RQYWdlVGV4dC5ISU5UO1xuICAgIHRoaXMuY2FzZVJlZkxhYmVsID0gU3BlY2lmaWNBY2Nlc3NSZXF1ZXN0UGFnZVRleHQuQ0FTRV9SRUY7XG4gICAgdGhpcy5mb3JtR3JvdXAgPSB0aGlzLmZiLmdyb3VwKHtcbiAgICAgIHJhZGlvU2VsZWN0ZWQ6IG5ldyBGb3JtQ29udHJvbChudWxsLCBudWxsKSxcbiAgICB9KTtcblxuICAgIHRoaXMuZm9ybUdyb3VwLmFkZENvbnRyb2woXG4gICAgICB0aGlzLnNwZWNpZmljUmVhc29uQ29udHJvbE5hbWUsXG4gICAgICBuZXcgRm9ybUNvbnRyb2woJycsIHtcbiAgICAgICAgdmFsaWRhdG9yczogW1xuICAgICAgICAgIChjb250cm9sOiBBYnN0cmFjdENvbnRyb2wpOiB7IFtrZXk6IHN0cmluZ106IGJvb2xlYW4gfSB8IG51bGwgPT4ge1xuICAgICAgICAgICAgaWYgKHRoaXMuaW5wdXRFbXB0eShjb250cm9sKSkge1xuICAgICAgICAgICAgICByZXR1cm4geyBpbnZhbGlkOiB0cnVlIH07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgICB9LFxuICAgICAgICBdLFxuICAgICAgICB1cGRhdGVPbjogJ3N1Ym1pdCcsXG4gICAgICB9KVxuICAgICk7XG4gIH1cblxuICBwdWJsaWMgb25DaGFuZ2UoKTogdm9pZCB7XG4gICAgdGhpcy5zdWJtaXR0ZWQgPSBmYWxzZTtcbiAgICAvLyBDbGVhciB0aGUgXCJzcGVjaWZpYyByZWFzb25cIiBmaWVsZHMgbWFudWFsbHkuIFRoaXMgcHJldmVudHMgYW55IHByZXZpb3VzIHZhbHVlIGJlaW5nIHJldGFpbmVkIGJ5XG4gICAgLy8gdGhlIGZpZWxkJ3MgRm9ybUNvbnRyb2wgd2hlbiB0aGUgZmllbGQgaXRzZWxmIGlzIHJlbW92ZWQgZnJvbSB0aGUgRE9NIGJ5ICpuZ0lmLiAoSWYgaXQgaXMgc3Vic2VxdWVudGx5IGFkZGVkIGJhY2tcbiAgICAvLyB0byB0aGUgRE9NIGJ5ICpuZ0lmLCBpdCB3aWxsIGFwcGVhciBlbXB0eSBidXQgdGhlIGFzc29jaWF0ZWQgRm9ybUNvbnRyb2wgc3RpbGwgaGFzIHRoZSBwcmV2aW91cyB2YWx1ZS4pXG4gICAgdGhpcy5mb3JtR3JvdXAuZ2V0KHRoaXMuc3BlY2lmaWNSZWFzb25Db250cm9sTmFtZSkuc2V0VmFsdWUoJycpO1xuICB9XG5cbiAgcHVibGljIG9uU3VibWl0KCk6IHZvaWQge1xuICAgIHRoaXMuc3VibWl0dGVkID0gdHJ1ZTtcbiAgICBpZiAodGhpcy5mb3JtR3JvdXAuZ2V0KHRoaXMuc3BlY2lmaWNSZWFzb25Db250cm9sTmFtZSkuaW52YWxpZCkge1xuICAgICAgdGhpcy5lcnJvck1lc3NhZ2UgPSB7XG4gICAgICAgIHRpdGxlOiB0aGlzLmdlbmVyaWNFcnJvcixcbiAgICAgICAgZGVzY3JpcHRpb246IFNwZWNpZmljQWNjZXNzUmVxdWVzdEVycm9ycy5OT19SRUFTT04sXG4gICAgICAgIGZpZWxkSWQ6ICdzcGVjaWZpYy1yZWFzb24nLFxuICAgICAgfTtcbiAgICB9XG5cbiAgICAvLyBJbml0aWF0ZSBTcGVjaWZpYyBBY2Nlc3MgUmVxdWVzdFxuICAgIGlmICh0aGlzLmZvcm1Hcm91cC52YWxpZCkge1xuICAgICAgLy8gR2V0IHRoZSBDYXNlIFJlZmVyZW5jZSAoZm9yIHdoaWNoIGFjY2VzcyBpcyBiZWluZyByZXF1ZXN0ZWQpIGZyb20gdGhlIEFjdGl2YXRlZFJvdXRlU25hcHNob3QgZGF0YVxuICAgICAgY29uc3QgY2FzZUlkID0gdGhpcy5yb3V0ZS5zbmFwc2hvdC5wYXJhbXMuY2lkO1xuICAgICAgY29uc3Qgc3BlY2lmaWNBY2Nlc3NSZXF1ZXN0ID0ge1xuICAgICAgICBzcGVjaWZpY1JlYXNvbjogdGhpcy5mb3JtR3JvdXAuZ2V0KHRoaXMuc3BlY2lmaWNSZWFzb25Db250cm9sTmFtZSkudmFsdWVcbiAgICAgIH0gYXMgU3BlY2lmaWNBY2Nlc3NSZXF1ZXN0O1xuXG4gICAgICB0aGlzLiRyb2xlQXNzaWdubWVudFJlc3BvbnNlU3Vic2NyaXB0aW9uID0gdGhpcy5jYXNlc1NlcnZpY2UuY3JlYXRlU3BlY2lmaWNBY2Nlc3NSZXF1ZXN0KGNhc2VJZCwgc3BlY2lmaWNBY2Nlc3NSZXF1ZXN0KVxuICAgICAgICAucGlwZShzd2l0Y2hNYXAoKCkgPT4gdGhpcy5jYXNlTm90aWZpZXIuZmV0Y2hBbmRSZWZyZXNoKGNhc2VJZCkpKVxuICAgICAgICAuc3Vic2NyaWJlKFxuICAgICAgICAgICgpID0+IHtcbiAgICAgICAgICAgIC8vIFdvdWxkIGhhdmUgYmVlbiBuaWNlIHRvIHBhc3MgdGhlIGNhc2VJZCB3aXRoaW4gc3RhdGUuZGF0YSwgYnV0IHRoaXMgaXNuJ3QgcGFydCBvZiBOYXZpZ2F0aW9uRXh0cmFzIHVudGlsXG4gICAgICAgICAgICAvLyBBbmd1bGFyIDcuMlxuICAgICAgICAgICAgdGhpcy5yb3V0ZXIubmF2aWdhdGUoWydzdWNjZXNzJ10sIHsgcmVsYXRpdmVUbzogdGhpcy5yb3V0ZSB9KTtcbiAgICAgICAgICB9LFxuICAgICAgICAgICgpID0+IHtcbiAgICAgICAgICAgIC8vIE5hdmlnYXRlIHRvIGVycm9yIHBhZ2VcbiAgICAgICAgICB9XG4gICAgICAgICk7XG4gICAgfVxuICB9XG5cbiAgcHVibGljIG9uQ2FuY2VsKCk6IHZvaWQge1xuICAgIC8vIE5hdmlnYXRlIHRvIHRoZSBwYWdlIGJlZm9yZSBwcmV2aW91cyBvbmUgKHNob3VsZCBiZSBTZWFyY2ggUmVzdWx0cyBvciBDYXNlIExpc3QgcGFnZSwgZm9yIGV4YW1wbGUpXG4gICAgdGhpcy5yb3V0ZXIubmF2aWdhdGVCeVVybChDYXNlU3BlY2lmaWNBY2Nlc3NSZXF1ZXN0Q29tcG9uZW50LkNBTkNFTF9MSU5LX0RFU1RJTkFUSU9OKTtcbiAgfVxuXG4gIHB1YmxpYyBuZ09uRGVzdHJveSgpOiB2b2lkIHtcbiAgICBpZiAodGhpcy4kcm9sZUFzc2lnbm1lbnRSZXNwb25zZVN1YnNjcmlwdGlvbikge1xuICAgICAgdGhpcy4kcm9sZUFzc2lnbm1lbnRSZXNwb25zZVN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgaW5wdXRFbXB0eShpbnB1dDogQWJzdHJhY3RDb250cm9sKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIGlucHV0LnZhbHVlID09PSBudWxsIHx8IGlucHV0LnZhbHVlLnRyaW0oKS5sZW5ndGggPT09IDA7XG4gIH1cbn1cbiIsIjxleHVpLWVycm9yLW1lc3NhZ2VcbiAgKm5nSWY9XCJmb3JtR3JvdXAuaW52YWxpZCAmJiBzdWJtaXR0ZWRcIlxuICBbZXJyb3JdPVwiZXJyb3JNZXNzYWdlXCI+PC9leHVpLWVycm9yLW1lc3NhZ2U+XG48Y3V0LWFsZXJ0IHR5cGU9XCJpbmZvcm1hdGlvblwiPlxuICB7eydBdXRob3Jpc2F0aW9uIGlzIG5lZWRlZCB0byBhY2Nlc3MgdGhpcyBjYXNlLicgfCBycHhUcmFuc2xhdGV9fTxiciAvPlxuICB7eydUaGlzIGNvdWxkIGJlIGJlY2F1c2UgaXRcXCdzIG91dHNpZGUgeW91ciBqdXJpc2RpY3Rpb24sIG9yIHlvdSBtYXkgYmUgZXhjbHVkZWQgZnJvbSB0aGUgY2FzZS4gSWYgeW91IHJlcXVlc3QgYWNjZXNzIHRvIHRoaXMgY2FzZSwgaXQgd2lsbCBiZSBsb2dnZWQgZm9yIGF1ZGl0aW5nIHB1cnBvc2VzLicgfCBycHhUcmFuc2xhdGV9fVxuPC9jdXQtYWxlcnQ+XG48Zm9ybSBbZm9ybUdyb3VwXT1cImZvcm1Hcm91cFwiIChzdWJtaXQpPVwib25TdWJtaXQoKVwiPlxuICA8ZGl2IGNsYXNzPVwiZ292dWstZm9ybS1ncm91cFwiXG4gICAgW25nQ2xhc3NdPVwieyAnZm9ybS1ncm91cC1lcnJvcic6IGZvcm1Hcm91cC5pbnZhbGlkICYmIHN1Ym1pdHRlZCB9XCI+XG4gICAgPGZpZWxkc2V0IGNsYXNzPVwiZ292dWstZmllbGRzZXRcIiBhcmlhLWRlc2NyaWJlZGJ5PVwicmVhc29uLWhpbnRcIj5cbiAgICAgIDxsZWdlbmQgY2xhc3M9XCJnb3Z1ay1maWVsZHNldF9fbGVnZW5kIGdvdnVrLWZpZWxkc2V0X19sZWdlbmQtLWxcIj5cbiAgICAgICAgPGgxIGNsYXNzPVwiZ292dWstZmllbGRzZXRfX2hlYWRpbmdcIj5cbiAgICAgICAgICB7eyB0aXRsZSB8IHJweFRyYW5zbGF0ZSB9fVxuICAgICAgICA8L2gxPlxuICAgICAgPC9sZWdlbmQ+XG5cbiAgICAgIDxkZXRhaWxzIGNsYXNzPVwiZ292dWstZGV0YWlsc1wiIGRhdGEtbW9kdWxlPVwiZ292dWstZGV0YWlsc1wiIHJvbGU9XCJncm91cFwiPlxuICAgICAgICA8c3VtbWFyeVxuICAgICAgICAgIGNsYXNzPVwiZ292dWstZGV0YWlsc19fc3VtbWFyeVwiXG4gICAgICAgICAgcm9sZT1cImJ1dHRvblwiXG4gICAgICAgICAgYXJpYS1leHBhbmRlZD1cImZhbHNlXCI+XG4gICAgICAgICAgPHNwYW4gY2xhc3M9XCJnb3Z1ay1kZXRhaWxzX19zdW1tYXJ5LXRleHRcIj5cbiAgICAgICAgICAgIHt7J0hlbHAgd2l0aCByZXF1ZXN0aW5nIGNhc2UgYWNjZXNzJyB8IHJweFRyYW5zbGF0ZX19XG4gICAgICAgICAgPC9zcGFuPlxuICAgICAgICA8L3N1bW1hcnk+XG4gICAgICAgIDxkaXZcbiAgICAgICAgICBjbGFzcz1cImdvdnVrLWRldGFpbHNfX3RleHRcIlxuICAgICAgICAgIGFyaWEtaGlkZGVuPVwidHJ1ZVwiPlxuICAgICAgICAgIDxwIGNsYXNzPVwiZ292dWstYm9keVwiPnt7J1lvdSBjb3VsZCBpbmNsdWRlOicgfCBycHhUcmFuc2xhdGV9fTwvcD5cbiAgICAgICAgICA8dWwgY2xhc3M9XCJnb3Z1ay1saXN0IGdvdnVrLWxpc3QtLWJ1bGxldFwiPlxuICAgICAgICAgICAgPGxpPnt7J3RoZSBjYXNlIHJlZmVyZW5jZSBvZiB0aGUgbGlua2VkIGNhc2UnIHwgcnB4VHJhbnNsYXRlfX08L2xpPlxuICAgICAgICAgICAgPGxpPnt7J2hvdyBsb25nIHlvdSByZXF1aXJlIGFjY2VzcyB0byB0aGlzIGNhc2UnIHwgcnB4VHJhbnNsYXRlfX08L2xpPlxuICAgICAgICAgICAgPGxpPnt7J2FueSBvdGhlciByZWFzb25zIHdoeSB5b3UgcmVxdWlyZSBhY2Nlc3MnIHwgcnB4VHJhbnNsYXRlfX08L2xpPlxuICAgICAgICAgIDwvdWw+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kZXRhaWxzPlxuXG4gICAgICA8ZGl2IGlkPVwicmVhc29uLWhpbnRcIiBjbGFzcz1cImdvdnVrLWhpbnRcIj5cbiAgICAgICAge3sgaGludCB8IHJweFRyYW5zbGF0ZSB9fVxuICAgICAgPC9kaXY+XG4gICAgICA8ZGl2IGlkPVwiY29uZGl0aW9uYWwtcmVhc29uLTNcIj5cbiAgICAgICAgPGRpdiBjbGFzcz1cImdvdnVrLWZvcm0tZ3JvdXBcIj5cbiAgICAgICAgICA8ZGl2XG4gICAgICAgICAgICBpZD1cInNwZWNpZmljLXJlYXNvbi1lcnJvci1tZXNzYWdlXCJcbiAgICAgICAgICAgIGNsYXNzPVwiZ292dWstZXJyb3ItbWVzc2FnZVwiXG4gICAgICAgICAgICAqbmdJZj1cImZvcm1Hcm91cC5nZXQoJ3NwZWNpZmljUmVhc29uJykuaW52YWxpZCAmJiBzdWJtaXR0ZWRcIj5cbiAgICAgICAgICAgIHt7IGVycm9yTWVzc2FnZS5kZXNjcmlwdGlvbiB8IHJweFRyYW5zbGF0ZSB9fVxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDx0ZXh0YXJlYVxuICAgICAgICAgICAgY2xhc3M9XCJnb3Z1ay10ZXh0YXJlYVwiXG4gICAgICAgICAgICBbbmdDbGFzc109XCJ7XG4gICAgICAgICAgICAgICdnb3Z1ay10ZXh0YXJlYS0tZXJyb3InOlxuICAgICAgICAgICAgICAgIGZvcm1Hcm91cC5nZXQoJ3NwZWNpZmljUmVhc29uJykuaW52YWxpZCAmJiBzdWJtaXR0ZWRcbiAgICAgICAgICAgIH1cIlxuICAgICAgICAgICAgaWQ9XCJzcGVjaWZpYy1yZWFzb25cIlxuICAgICAgICAgICAgbmFtZT1cInNwZWNpZmljLXJlYXNvblwiXG4gICAgICAgICAgICByb3dzPVwiOFwiXG4gICAgICAgICAgICBmb3JtQ29udHJvbE5hbWU9XCJzcGVjaWZpY1JlYXNvblwiPlxuICAgICAgICAgIDwvdGV4dGFyZWE+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgPC9maWVsZHNldD5cbiAgPC9kaXY+XG5cbiAgPGRpdiBjbGFzcz1cImdvdnVrLWJ1dHRvbi1ncm91cFwiPlxuICAgIDxidXR0b24gY2xhc3M9XCJnb3Z1ay1idXR0b24gZ292dWstIS1tYXJnaW4tcmlnaHQtM1wiIHR5cGU9XCJzdWJtaXRcIj5cbiAgICAgIHt7J1N1Ym1pdCcgfCBycHhUcmFuc2xhdGV9fVxuICAgIDwvYnV0dG9uPlxuICAgIDxkaXYgY2xhc3M9XCJnb3Z1ay1ncmlkLWNvbHVtbi1mdWxsIGdvdnVrLSEtcGFkZGluZy1sZWZ0LTBcIj5cbiAgICAgIDxwPlxuICAgICAgICA8YSBjbGFzcz1cImdvdnVrLWJvZHlcIiAoY2xpY2spPVwib25DYW5jZWwoKVwiIGhyZWY9XCJqYXZhc2NyaXB0OnZvaWQoMClcIj5cbiAgICAgICAgICB7eydDYW5jZWwnIHwgcnB4VHJhbnNsYXRlfX1cbiAgICAgICAgPC9hPlxuICAgICAgPC9wPlxuICAgIDwvZGl2PlxuICA8L2Rpdj5cbjwvZm9ybT5cbiJdfQ==