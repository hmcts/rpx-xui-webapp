import { Component, Input } from '@angular/core';
import { CaseFlagSummaryListDisplayMode } from '../../enums';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
function CaseFlagSummaryListComponent_dl_0_div_16_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 2)(1, "dt", 3);
    i0.ɵɵtext(2, " Status ");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "dd", 4);
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate1(" ", ctx_r1.flagStatus, " ");
} }
function CaseFlagSummaryListComponent_dl_0_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "dl", 1)(1, "div", 2)(2, "dt", 3);
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "dd", 4);
    i0.ɵɵtext(5);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(6, "div", 2)(7, "dt", 3);
    i0.ɵɵtext(8, " Flag type ");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(9, "dd", 4);
    i0.ɵɵtext(10);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(11, "div", 2)(12, "dt", 3);
    i0.ɵɵtext(13, " Comments ");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(14, "dd", 4);
    i0.ɵɵtext(15);
    i0.ɵɵelementEnd()();
    i0.ɵɵtemplate(16, CaseFlagSummaryListComponent_dl_0_div_16_Template, 5, 1, "div", 5);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate1(" ", ctx_r0.addUpdateFlagHeaderText, " ");
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1(" ", ctx_r0.flagForSummaryDisplay.partyName || ctx_r0.caseLevelLocation, " ");
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate1(" ", ctx_r0.flagDescription, " ");
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate1(" ", ctx_r0.flagComments, " ");
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", ctx_r0.summaryListDisplayMode === ctx_r0.displayMode.MANAGE);
} }
export class CaseFlagSummaryListComponent {
    constructor() {
        this.displayMode = CaseFlagSummaryListDisplayMode;
        this.caseLevelLocation = 'Case level';
        this.updateFlagHeaderText = 'Update flag for';
        this.addFlagHeaderText = 'Add flag to';
    }
    ngOnInit() {
        if (this.flagForSummaryDisplay) {
            const flagDetail = this.flagForSummaryDisplay.flagDetail;
            this.flagDescription = `${flagDetail.name}${flagDetail.otherDescription
                ? ` - ${flagDetail.otherDescription}`
                : ''}${flagDetail.subTypeValue ? ` - ${flagDetail.subTypeValue}` : ''}`;
            this.flagComments = flagDetail.flagComment;
            this.flagStatus = flagDetail.status;
            this.addUpdateFlagHeaderText =
                this.summaryListDisplayMode === CaseFlagSummaryListDisplayMode.MANAGE ? this.updateFlagHeaderText : this.addFlagHeaderText;
        }
    }
}
CaseFlagSummaryListComponent.ɵfac = function CaseFlagSummaryListComponent_Factory(t) { return new (t || CaseFlagSummaryListComponent)(); };
CaseFlagSummaryListComponent.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: CaseFlagSummaryListComponent, selectors: [["ccd-case-flag-summary-list"]], inputs: { flagForSummaryDisplay: "flagForSummaryDisplay", summaryListDisplayMode: "summaryListDisplayMode" }, decls: 1, vars: 1, consts: [["class", "govuk-summary-list", 4, "ngIf"], [1, "govuk-summary-list"], [1, "govuk-summary-list__row"], [1, "govuk-summary-list__key"], [1, "govuk-summary-list__value"], ["class", "govuk-summary-list__row", 4, "ngIf"]], template: function CaseFlagSummaryListComponent_Template(rf, ctx) { if (rf & 1) {
        i0.ɵɵtemplate(0, CaseFlagSummaryListComponent_dl_0_Template, 17, 5, "dl", 0);
    } if (rf & 2) {
        i0.ɵɵproperty("ngIf", ctx.flagForSummaryDisplay);
    } }, dependencies: [i1.NgIf], encapsulation: 2 });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(CaseFlagSummaryListComponent, [{
        type: Component,
        args: [{ selector: 'ccd-case-flag-summary-list', template: "<dl class=\"govuk-summary-list\" *ngIf=\"flagForSummaryDisplay\">\n  <div class=\"govuk-summary-list__row\">\n    <dt class=\"govuk-summary-list__key\">\n      {{addUpdateFlagHeaderText}}\n    </dt>\n    <dd class=\"govuk-summary-list__value\">\n      {{flagForSummaryDisplay.partyName || caseLevelLocation}}\n    </dd>\n  </div>\n  <div class=\"govuk-summary-list__row\">\n    <dt class=\"govuk-summary-list__key\">\n      Flag type\n    </dt>\n    <dd class=\"govuk-summary-list__value\">\n      {{flagDescription}}\n    </dd>\n  </div>\n  <div class=\"govuk-summary-list__row\">\n    <dt class=\"govuk-summary-list__key\">\n      Comments\n    </dt>\n    <dd class=\"govuk-summary-list__value\">\n      {{flagComments}}\n    </dd>\n  </div>\n  <div class=\"govuk-summary-list__row\" *ngIf=\"summaryListDisplayMode === displayMode.MANAGE\">\n    <dt class=\"govuk-summary-list__key\">\n      Status\n    </dt>\n    <dd class=\"govuk-summary-list__value\">\n      {{flagStatus}}\n    </dd>\n  </div>\n</dl>\n" }]
    }], null, { flagForSummaryDisplay: [{
            type: Input
        }], summaryListDisplayMode: [{
            type: Input
        }] }); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FzZS1mbGFnLXN1bW1hcnktbGlzdC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9jY2QtY2FzZS11aS10b29sa2l0L3NyYy9saWIvc2hhcmVkL2NvbXBvbmVudHMvcGFsZXR0ZS9jYXNlLWZsYWcvY29tcG9uZW50cy9jYXNlLWZsYWctc3VtbWFyeS1saXN0L2Nhc2UtZmxhZy1zdW1tYXJ5LWxpc3QuY29tcG9uZW50LnRzIiwiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvY2NkLWNhc2UtdWktdG9vbGtpdC9zcmMvbGliL3NoYXJlZC9jb21wb25lbnRzL3BhbGV0dGUvY2FzZS1mbGFnL2NvbXBvbmVudHMvY2FzZS1mbGFnLXN1bW1hcnktbGlzdC9jYXNlLWZsYWctc3VtbWFyeS1saXN0LmNvbXBvbmVudC5odG1sIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFVLE1BQU0sZUFBZSxDQUFDO0FBRXpELE9BQU8sRUFBRSw4QkFBOEIsRUFBRSxNQUFNLGFBQWEsQ0FBQzs7OztJQ3VCM0QsOEJBQTJGLFlBQUE7SUFFdkYsd0JBQ0Y7SUFBQSxpQkFBSztJQUNMLDZCQUFzQztJQUNwQyxZQUNGO0lBQUEsaUJBQUssRUFBQTs7O0lBREgsZUFDRjtJQURFLGtEQUNGOzs7SUEvQkosNkJBQTZELGFBQUEsWUFBQTtJQUd2RCxZQUNGO0lBQUEsaUJBQUs7SUFDTCw2QkFBc0M7SUFDcEMsWUFDRjtJQUFBLGlCQUFLLEVBQUE7SUFFUCw4QkFBcUMsWUFBQTtJQUVqQywyQkFDRjtJQUFBLGlCQUFLO0lBQ0wsNkJBQXNDO0lBQ3BDLGFBQ0Y7SUFBQSxpQkFBSyxFQUFBO0lBRVAsK0JBQXFDLGFBQUE7SUFFakMsMkJBQ0Y7SUFBQSxpQkFBSztJQUNMLDhCQUFzQztJQUNwQyxhQUNGO0lBQUEsaUJBQUssRUFBQTtJQUVQLG9GQU9NO0lBQ1IsaUJBQUs7OztJQTlCQyxlQUNGO0lBREUsK0RBQ0Y7SUFFRSxlQUNGO0lBREUsbUdBQ0Y7SUFPRSxlQUNGO0lBREUsdURBQ0Y7SUFPRSxlQUNGO0lBREUsb0RBQ0Y7SUFFb0MsZUFBbUQ7SUFBbkQsa0ZBQW1EOztBRGpCM0YsTUFBTSxPQUFPLDRCQUE0QjtJQUp6QztRQVlTLGdCQUFXLEdBQUcsOEJBQThCLENBQUM7UUFFcEMsc0JBQWlCLEdBQUcsWUFBWSxDQUFDO1FBQ2hDLHlCQUFvQixHQUFHLGlCQUFpQixDQUFDO1FBQ3pDLHNCQUFpQixHQUFHLGFBQWEsQ0FBQztLQWNwRDtJQVpRLFFBQVE7UUFDYixJQUFJLElBQUksQ0FBQyxxQkFBcUIsRUFBRTtZQUM5QixNQUFNLFVBQVUsR0FBRyxJQUFJLENBQUMscUJBQXFCLENBQUMsVUFBVSxDQUFDO1lBQ3pELElBQUksQ0FBQyxlQUFlLEdBQUcsR0FBRyxVQUFVLENBQUMsSUFBSSxHQUFHLFVBQVUsQ0FBQyxnQkFBZ0I7Z0JBQ3JFLENBQUMsQ0FBQyxNQUFNLFVBQVUsQ0FBQyxnQkFBZ0IsRUFBRTtnQkFDckMsQ0FBQyxDQUFDLEVBQUUsR0FBRyxVQUFVLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQyxNQUFNLFVBQVUsQ0FBQyxZQUFZLEVBQUUsQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUM7WUFDMUUsSUFBSSxDQUFDLFlBQVksR0FBRyxVQUFVLENBQUMsV0FBVyxDQUFDO1lBQzNDLElBQUksQ0FBQyxVQUFVLEdBQUcsVUFBVSxDQUFDLE1BQU0sQ0FBQztZQUNwQyxJQUFJLENBQUMsdUJBQXVCO2dCQUMxQixJQUFJLENBQUMsc0JBQXNCLEtBQUssOEJBQThCLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsb0JBQW9CLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQztTQUM5SDtJQUNILENBQUM7O3dHQXpCVSw0QkFBNEI7K0VBQTVCLDRCQUE0QjtRQ1J6Qyw0RUFpQ0s7O1FBakMyQixnREFBMkI7O3VGRFE5Qyw0QkFBNEI7Y0FKeEMsU0FBUzsyQkFDRSw0QkFBNEI7Z0JBS3RCLHFCQUFxQjtrQkFBcEMsS0FBSztZQUNVLHNCQUFzQjtrQkFBckMsS0FBSyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgSW5wdXQsIE9uSW5pdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRmxhZ0RldGFpbERpc3BsYXkgfSBmcm9tICcuLi8uLi9kb21haW4nO1xuaW1wb3J0IHsgQ2FzZUZsYWdTdW1tYXJ5TGlzdERpc3BsYXlNb2RlIH0gZnJvbSAnLi4vLi4vZW51bXMnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdjY2QtY2FzZS1mbGFnLXN1bW1hcnktbGlzdCcsXG4gIHRlbXBsYXRlVXJsOiAnLi9jYXNlLWZsYWctc3VtbWFyeS1saXN0LmNvbXBvbmVudC5odG1sJ1xufSlcbmV4cG9ydCBjbGFzcyBDYXNlRmxhZ1N1bW1hcnlMaXN0Q29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcblxuICBASW5wdXQoKSBwdWJsaWMgZmxhZ0ZvclN1bW1hcnlEaXNwbGF5OiBGbGFnRGV0YWlsRGlzcGxheTtcbiAgQElucHV0KCkgcHVibGljIHN1bW1hcnlMaXN0RGlzcGxheU1vZGU6IENhc2VGbGFnU3VtbWFyeUxpc3REaXNwbGF5TW9kZTtcblxuICBwdWJsaWMgZmxhZ0Rlc2NyaXB0aW9uOiBzdHJpbmc7XG4gIHB1YmxpYyBmbGFnQ29tbWVudHM6IHN0cmluZztcbiAgcHVibGljIGZsYWdTdGF0dXM6IHN0cmluZztcbiAgcHVibGljIGRpc3BsYXlNb2RlID0gQ2FzZUZsYWdTdW1tYXJ5TGlzdERpc3BsYXlNb2RlO1xuICBwdWJsaWMgYWRkVXBkYXRlRmxhZ0hlYWRlclRleHQ6IHN0cmluZztcbiAgcHVibGljIHJlYWRvbmx5IGNhc2VMZXZlbExvY2F0aW9uID0gJ0Nhc2UgbGV2ZWwnO1xuICBwcml2YXRlIHJlYWRvbmx5IHVwZGF0ZUZsYWdIZWFkZXJUZXh0ID0gJ1VwZGF0ZSBmbGFnIGZvcic7XG4gIHByaXZhdGUgcmVhZG9ubHkgYWRkRmxhZ0hlYWRlclRleHQgPSAnQWRkIGZsYWcgdG8nO1xuXG4gIHB1YmxpYyBuZ09uSW5pdCgpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5mbGFnRm9yU3VtbWFyeURpc3BsYXkpIHtcbiAgICAgIGNvbnN0IGZsYWdEZXRhaWwgPSB0aGlzLmZsYWdGb3JTdW1tYXJ5RGlzcGxheS5mbGFnRGV0YWlsO1xuICAgICAgdGhpcy5mbGFnRGVzY3JpcHRpb24gPSBgJHtmbGFnRGV0YWlsLm5hbWV9JHtmbGFnRGV0YWlsLm90aGVyRGVzY3JpcHRpb25cbiAgICAgICAgPyBgIC0gJHtmbGFnRGV0YWlsLm90aGVyRGVzY3JpcHRpb259YFxuICAgICAgICA6ICcnfSR7ZmxhZ0RldGFpbC5zdWJUeXBlVmFsdWUgPyBgIC0gJHtmbGFnRGV0YWlsLnN1YlR5cGVWYWx1ZX1gIDogJyd9YDtcbiAgICAgIHRoaXMuZmxhZ0NvbW1lbnRzID0gZmxhZ0RldGFpbC5mbGFnQ29tbWVudDtcbiAgICAgIHRoaXMuZmxhZ1N0YXR1cyA9IGZsYWdEZXRhaWwuc3RhdHVzO1xuICAgICAgdGhpcy5hZGRVcGRhdGVGbGFnSGVhZGVyVGV4dCA9XG4gICAgICAgIHRoaXMuc3VtbWFyeUxpc3REaXNwbGF5TW9kZSA9PT0gQ2FzZUZsYWdTdW1tYXJ5TGlzdERpc3BsYXlNb2RlLk1BTkFHRSA/IHRoaXMudXBkYXRlRmxhZ0hlYWRlclRleHQgOiB0aGlzLmFkZEZsYWdIZWFkZXJUZXh0O1xuICAgIH1cbiAgfVxufVxuIiwiPGRsIGNsYXNzPVwiZ292dWstc3VtbWFyeS1saXN0XCIgKm5nSWY9XCJmbGFnRm9yU3VtbWFyeURpc3BsYXlcIj5cbiAgPGRpdiBjbGFzcz1cImdvdnVrLXN1bW1hcnktbGlzdF9fcm93XCI+XG4gICAgPGR0IGNsYXNzPVwiZ292dWstc3VtbWFyeS1saXN0X19rZXlcIj5cbiAgICAgIHt7YWRkVXBkYXRlRmxhZ0hlYWRlclRleHR9fVxuICAgIDwvZHQ+XG4gICAgPGRkIGNsYXNzPVwiZ292dWstc3VtbWFyeS1saXN0X192YWx1ZVwiPlxuICAgICAge3tmbGFnRm9yU3VtbWFyeURpc3BsYXkucGFydHlOYW1lIHx8IGNhc2VMZXZlbExvY2F0aW9ufX1cbiAgICA8L2RkPlxuICA8L2Rpdj5cbiAgPGRpdiBjbGFzcz1cImdvdnVrLXN1bW1hcnktbGlzdF9fcm93XCI+XG4gICAgPGR0IGNsYXNzPVwiZ292dWstc3VtbWFyeS1saXN0X19rZXlcIj5cbiAgICAgIEZsYWcgdHlwZVxuICAgIDwvZHQ+XG4gICAgPGRkIGNsYXNzPVwiZ292dWstc3VtbWFyeS1saXN0X192YWx1ZVwiPlxuICAgICAge3tmbGFnRGVzY3JpcHRpb259fVxuICAgIDwvZGQ+XG4gIDwvZGl2PlxuICA8ZGl2IGNsYXNzPVwiZ292dWstc3VtbWFyeS1saXN0X19yb3dcIj5cbiAgICA8ZHQgY2xhc3M9XCJnb3Z1ay1zdW1tYXJ5LWxpc3RfX2tleVwiPlxuICAgICAgQ29tbWVudHNcbiAgICA8L2R0PlxuICAgIDxkZCBjbGFzcz1cImdvdnVrLXN1bW1hcnktbGlzdF9fdmFsdWVcIj5cbiAgICAgIHt7ZmxhZ0NvbW1lbnRzfX1cbiAgICA8L2RkPlxuICA8L2Rpdj5cbiAgPGRpdiBjbGFzcz1cImdvdnVrLXN1bW1hcnktbGlzdF9fcm93XCIgKm5nSWY9XCJzdW1tYXJ5TGlzdERpc3BsYXlNb2RlID09PSBkaXNwbGF5TW9kZS5NQU5BR0VcIj5cbiAgICA8ZHQgY2xhc3M9XCJnb3Z1ay1zdW1tYXJ5LWxpc3RfX2tleVwiPlxuICAgICAgU3RhdHVzXG4gICAgPC9kdD5cbiAgICA8ZGQgY2xhc3M9XCJnb3Z1ay1zdW1tYXJ5LWxpc3RfX3ZhbHVlXCI+XG4gICAgICB7e2ZsYWdTdGF0dXN9fVxuICAgIDwvZGQ+XG4gIDwvZGl2PlxuPC9kbD5cbiJdfQ==