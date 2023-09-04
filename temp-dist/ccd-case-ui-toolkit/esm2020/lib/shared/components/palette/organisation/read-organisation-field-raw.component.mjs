import { Component, Input } from '@angular/core';
import { of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { OrganisationConverter } from '../../../domain/organisation/organisation-converter';
import { OrganisationService } from '../../../services/organisation/organisation.service';
import { AbstractFieldReadComponent } from '../base-field/abstract-field-read.component';
import * as i0 from "@angular/core";
import * as i1 from "../../../services/organisation/organisation.service";
import * as i2 from "../../../domain/organisation/organisation-converter";
import * as i3 from "@angular/common";
import * as i4 from "../markdown/markdown.component";
import * as i5 from "rpx-xui-translation";
function ReadOrganisationFieldRawComponent_table_7_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "table", 1);
    i0.ɵɵpipe(1, "rpxTranslate");
    i0.ɵɵelementStart(2, "tr", 4);
    i0.ɵɵelement(3, "th", 2);
    i0.ɵɵelementStart(4, "td", 5)(5, "span", 6);
    i0.ɵɵtext(6);
    i0.ɵɵpipe(7, "rpxTranslate");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(8, "td")(9, "span", 6);
    i0.ɵɵtext(10);
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(11, "tr", 4);
    i0.ɵɵelement(12, "th", 2);
    i0.ɵɵelementStart(13, "td", 5)(14, "span", 6);
    i0.ɵɵtext(15);
    i0.ɵɵpipe(16, "rpxTranslate");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(17, "td");
    i0.ɵɵelement(18, "ccd-markdown", 7);
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    const selectedOrg_r1 = ctx.ngIf;
    i0.ɵɵattribute("aria-describedby", i0.ɵɵpipeBind1(1, 5, "complex selected organisation field table"));
    i0.ɵɵadvance(6);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(7, 7, "Name:"));
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate(selectedOrg_r1.name);
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(16, 9, "Address:"));
    i0.ɵɵadvance(3);
    i0.ɵɵproperty("content", selectedOrg_r1.address);
} }
export class ReadOrganisationFieldRawComponent extends AbstractFieldReadComponent {
    constructor(organisationService, organisationConverter) {
        super();
        this.organisationService = organisationService;
        this.organisationConverter = organisationConverter;
        this.caseFields = [];
    }
    ngOnInit() {
        super.ngOnInit();
        if (this.caseField.value && this.caseField.value.OrganisationID) {
            this.organisations$ = this.organisationService.getActiveOrganisations();
            this.selectedOrg$ = this.organisations$.pipe(switchMap((organisations) => of(this.organisationConverter.toSimpleOrganisationModel(organisations.find(findOrg => findOrg.organisationIdentifier === this.caseField.value.OrganisationID)))));
        }
    }
}
ReadOrganisationFieldRawComponent.ɵfac = function ReadOrganisationFieldRawComponent_Factory(t) { return new (t || ReadOrganisationFieldRawComponent)(i0.ɵɵdirectiveInject(i1.OrganisationService), i0.ɵɵdirectiveInject(i2.OrganisationConverter)); };
ReadOrganisationFieldRawComponent.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: ReadOrganisationFieldRawComponent, selectors: [["ccd-read-organisation-field-raw"]], inputs: { caseFields: "caseFields" }, features: [i0.ɵɵInheritDefinitionFeature], decls: 9, vars: 6, consts: [[1, "complex-panel"], [1, "complex-field-table"], [2, "display", "none"], ["class", "complex-field-table", 4, "ngIf"], [1, "complex-panel-compound-field"], [1, "label-width-small"], [1, "text-16"], [3, "content"]], template: function ReadOrganisationFieldRawComponent_Template(rf, ctx) { if (rf & 1) {
        i0.ɵɵelementStart(0, "div", 0)(1, "table", 1);
        i0.ɵɵpipe(2, "rpxTranslate");
        i0.ɵɵelementStart(3, "tbody")(4, "tr");
        i0.ɵɵelement(5, "th", 2);
        i0.ɵɵelementStart(6, "td");
        i0.ɵɵtemplate(7, ReadOrganisationFieldRawComponent_table_7_Template, 19, 11, "table", 3);
        i0.ɵɵpipe(8, "async");
        i0.ɵɵelementEnd()()()()();
    } if (rf & 2) {
        i0.ɵɵadvance(1);
        i0.ɵɵattribute("aria-describedby", i0.ɵɵpipeBind1(2, 2, "complex organisation field table"));
        i0.ɵɵadvance(6);
        i0.ɵɵproperty("ngIf", i0.ɵɵpipeBind1(8, 4, ctx.selectedOrg$));
    } }, dependencies: [i3.NgIf, i4.MarkdownComponent, i3.AsyncPipe, i5.RpxTranslatePipe], styles: [".hmcts-banner[_ngcontent-%COMP%]{border:0 solid;margin-bottom:10px;color:#000}.hmcts-banner[_ngcontent-%COMP%]   .warning-message[_ngcontent-%COMP%]{font-weight:700}.govuk-hint[_ngcontent-%COMP%]{font-size:1.1rem}.name-header[_ngcontent-%COMP%]{font-weight:700;margin-top:10px;font-size:18px}.td-address[_ngcontent-%COMP%]{width:90%;padding-top:2px}.td-select[_ngcontent-%COMP%]{width:10%}.warning-panel[_ngcontent-%COMP%]{background-color:#e7ebef;height:40px;margin-bottom:0;align-items:center;display:flex}.warning-panel[_ngcontent-%COMP%]   .warning-message[_ngcontent-%COMP%]{padding-left:15px}.complex-field-table[_ngcontent-%COMP%] > tbody[_ngcontent-%COMP%] > tr[_ngcontent-%COMP%] > th[_ngcontent-%COMP%]{border:none}.complex-field-table[_ngcontent-%COMP%] > tbody[_ngcontent-%COMP%] > tr[_ngcontent-%COMP%]:last-child > th[_ngcontent-%COMP%], .complex-field-table[_ngcontent-%COMP%] > tbody[_ngcontent-%COMP%] > tr[_ngcontent-%COMP%]:last-child > td[_ngcontent-%COMP%]{border-bottom:none}.complex-field-title[_ngcontent-%COMP%]{width:300px}.label-width-small[_ngcontent-%COMP%]{width:100px}.label-width-medium[_ngcontent-%COMP%]{width:150px}.scroll-container[_ngcontent-%COMP%]{height:600px;overflow-y:scroll}.no-result-message[_ngcontent-%COMP%]{margin-top:15px}"] });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(ReadOrganisationFieldRawComponent, [{
        type: Component,
        args: [{ selector: 'ccd-read-organisation-field-raw', template: "<div class=\"complex-panel\">\n  <table class=\"complex-field-table\" [attr.aria-describedby]=\"'complex organisation field table' | rpxTranslate\">\n    <tbody>\n      <tr>\n        <th style=\"display: none;\"></th>\n        <td>\n          <table class=\"complex-field-table\" *ngIf=\"(selectedOrg$ | async) as selectedOrg\"\n                 [attr.aria-describedby]=\"'complex selected organisation field table' | rpxTranslate\">\n            <tr class=\"complex-panel-compound-field\">\n              <th style=\"display: none;\"></th>\n              <td class=\"label-width-small\"><span class=\"text-16\">{{'Name:' | rpxTranslate}}</span></td>\n              <td><span class=\"text-16\">{{selectedOrg.name}}</span></td>\n            </tr>\n            <tr class=\"complex-panel-compound-field\">\n              <th style=\"display: none;\"></th>\n              <td class=\"label-width-small\"><span class=\"text-16\">{{'Address:' | rpxTranslate}}</span></td>\n              <td>\n                <ccd-markdown [content]=\"selectedOrg.address\"></ccd-markdown>\n              </td>\n            </tr>\n          </table>\n        </td>\n      </tr>\n    </tbody>\n  </table>\n</div>\n", styles: [".hmcts-banner{border:0 solid;margin-bottom:10px;color:#000}.hmcts-banner .warning-message{font-weight:700}.govuk-hint{font-size:1.1rem}.name-header{font-weight:700;margin-top:10px;font-size:18px}.td-address{width:90%;padding-top:2px}.td-select{width:10%}.warning-panel{background-color:#e7ebef;height:40px;margin-bottom:0;align-items:center;display:flex}.warning-panel .warning-message{padding-left:15px}.complex-field-table>tbody>tr>th{border:none}.complex-field-table>tbody>tr:last-child>th,.complex-field-table>tbody>tr:last-child>td{border-bottom:none}.complex-field-title{width:300px}.label-width-small{width:100px}.label-width-medium{width:150px}.scroll-container{height:600px;overflow-y:scroll}.no-result-message{margin-top:15px}\n"] }]
    }], function () { return [{ type: i1.OrganisationService }, { type: i2.OrganisationConverter }]; }, { caseFields: [{
            type: Input
        }] }); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVhZC1vcmdhbmlzYXRpb24tZmllbGQtcmF3LmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2NjZC1jYXNlLXVpLXRvb2xraXQvc3JjL2xpYi9zaGFyZWQvY29tcG9uZW50cy9wYWxldHRlL29yZ2FuaXNhdGlvbi9yZWFkLW9yZ2FuaXNhdGlvbi1maWVsZC1yYXcuY29tcG9uZW50LnRzIiwiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvY2NkLWNhc2UtdWktdG9vbGtpdC9zcmMvbGliL3NoYXJlZC9jb21wb25lbnRzL3BhbGV0dGUvb3JnYW5pc2F0aW9uL3JlYWQtb3JnYW5pc2F0aW9uLWZpZWxkLXJhdy5jb21wb25lbnQuaHRtbCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBVSxNQUFNLGVBQWUsQ0FBQztBQUN6RCxPQUFPLEVBQWMsRUFBRSxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQ3RDLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUUzQyxPQUFPLEVBQUUscUJBQXFCLEVBQUUsTUFBTSxxREFBcUQsQ0FBQztBQUU1RixPQUFPLEVBQUUsbUJBQW1CLEVBQWtCLE1BQU0scURBQXFELENBQUM7QUFDMUcsT0FBTyxFQUFFLDBCQUEwQixFQUFFLE1BQU0sNkNBQTZDLENBQUM7Ozs7Ozs7O0lDRC9FLGdDQUM0Rjs7SUFDMUYsNkJBQXlDO0lBQ3ZDLHdCQUFnQztJQUNoQyw2QkFBOEIsY0FBQTtJQUFzQixZQUEwQjs7SUFBQSxpQkFBTyxFQUFBO0lBQ3JGLDBCQUFJLGNBQUE7SUFBc0IsYUFBb0I7SUFBQSxpQkFBTyxFQUFBLEVBQUE7SUFFdkQsOEJBQXlDO0lBQ3ZDLHlCQUFnQztJQUNoQyw4QkFBOEIsZUFBQTtJQUFzQixhQUE2Qjs7SUFBQSxpQkFBTyxFQUFBO0lBQ3hGLDJCQUFJO0lBQ0YsbUNBQTZEO0lBQy9ELGlCQUFLLEVBQUEsRUFBQTs7O0lBWEYscUdBQW9GO0lBR25DLGVBQTBCO0lBQTFCLG1EQUEwQjtJQUNwRCxlQUFvQjtJQUFwQix5Q0FBb0I7SUFJTSxlQUE2QjtJQUE3Qix1REFBNkI7SUFFakUsZUFBK0I7SUFBL0IsZ0RBQStCOztBREg3RCxNQUFNLE9BQU8saUNBQWtDLFNBQVEsMEJBQTBCO0lBUS9FLFlBQTZCLG1CQUF3QyxFQUFtQixxQkFBNEM7UUFDbEksS0FBSyxFQUFFLENBQUM7UUFEbUIsd0JBQW1CLEdBQW5CLG1CQUFtQixDQUFxQjtRQUFtQiwwQkFBcUIsR0FBckIscUJBQXFCLENBQXVCO1FBTDdILGVBQVUsR0FBZ0IsRUFBRSxDQUFDO0lBT3BDLENBQUM7SUFFTSxRQUFRO1FBQ2IsS0FBSyxDQUFDLFFBQVEsRUFBRSxDQUFDO1FBQ2pCLElBQUksSUFBSSxDQUFDLFNBQVMsQ0FBQyxLQUFLLElBQUksSUFBSSxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsY0FBYyxFQUFFO1lBQy9ELElBQUksQ0FBQyxjQUFjLEdBQUcsSUFBSSxDQUFDLG1CQUFtQixDQUFDLHNCQUFzQixFQUFFLENBQUM7WUFDeEUsSUFBSSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUMsY0FBYyxDQUFDLElBQUksQ0FDMUMsU0FBUyxDQUFDLENBQUMsYUFBK0IsRUFBRSxFQUFFLENBQUMsRUFBRSxDQUM3QyxJQUFJLENBQUMscUJBQXFCLENBQUMseUJBQXlCLENBQ2xELGFBQWEsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQyxPQUFPLENBQUMsc0JBQXNCLEtBQUssSUFBSSxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsY0FBYyxDQUFDLENBQ3RHLENBQ0YsQ0FDRixDQUNGLENBQUM7U0FDSDtJQUNILENBQUM7O2tIQXpCVSxpQ0FBaUM7b0ZBQWpDLGlDQUFpQztRQ2Q5Qyw4QkFBMkIsZUFBQTs7UUFFdkIsNkJBQU8sU0FBQTtRQUVILHdCQUFnQztRQUNoQywwQkFBSTtRQUNGLHdGQWNROztRQUNWLGlCQUFLLEVBQUEsRUFBQSxFQUFBLEVBQUE7O1FBcEJ3QixlQUEyRTtRQUEzRSw0RkFBMkU7UUFLbEUsZUFBNkI7UUFBN0IsNkRBQTZCOzt1RkRROUQsaUNBQWlDO2NBTDdDLFNBQVM7MkJBQ0UsaUNBQWlDOzBHQU9wQyxVQUFVO2tCQURoQixLQUFLIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBJbnB1dCwgT25Jbml0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlLCBvZiB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgc3dpdGNoTWFwIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHsgQ2FzZUZpZWxkIH0gZnJvbSAnLi4vLi4vLi4vZG9tYWluL2RlZmluaXRpb24nO1xuaW1wb3J0IHsgT3JnYW5pc2F0aW9uQ29udmVydGVyIH0gZnJvbSAnLi4vLi4vLi4vZG9tYWluL29yZ2FuaXNhdGlvbi9vcmdhbmlzYXRpb24tY29udmVydGVyJztcbmltcG9ydCB7IFNpbXBsZU9yZ2FuaXNhdGlvbk1vZGVsIH0gZnJvbSAnLi4vLi4vLi4vZG9tYWluL29yZ2FuaXNhdGlvbi9zaW1wbGUtb3JnYW5pc2F0aW9uLm1vZGVsJztcbmltcG9ydCB7IE9yZ2FuaXNhdGlvblNlcnZpY2UsIE9yZ2FuaXNhdGlvblZtIH0gZnJvbSAnLi4vLi4vLi4vc2VydmljZXMvb3JnYW5pc2F0aW9uL29yZ2FuaXNhdGlvbi5zZXJ2aWNlJztcbmltcG9ydCB7IEFic3RyYWN0RmllbGRSZWFkQ29tcG9uZW50IH0gZnJvbSAnLi4vYmFzZS1maWVsZC9hYnN0cmFjdC1maWVsZC1yZWFkLmNvbXBvbmVudCc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2NjZC1yZWFkLW9yZ2FuaXNhdGlvbi1maWVsZC1yYXcnLFxuICB0ZW1wbGF0ZVVybDogJy4vcmVhZC1vcmdhbmlzYXRpb24tZmllbGQtcmF3LmNvbXBvbmVudC5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJy4vb3JnYW5pc2F0aW9uLWZpZWxkLnNjc3MnXVxufSlcbmV4cG9ydCBjbGFzcyBSZWFkT3JnYW5pc2F0aW9uRmllbGRSYXdDb21wb25lbnQgZXh0ZW5kcyBBYnN0cmFjdEZpZWxkUmVhZENvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG5cbiAgQElucHV0KClcbiAgcHVibGljIGNhc2VGaWVsZHM6IENhc2VGaWVsZFtdID0gW107XG5cbiAgcHVibGljIG9yZ2FuaXNhdGlvbnMkOiBPYnNlcnZhYmxlPE9yZ2FuaXNhdGlvblZtW10+O1xuICBwdWJsaWMgc2VsZWN0ZWRPcmckOiBPYnNlcnZhYmxlPFNpbXBsZU9yZ2FuaXNhdGlvbk1vZGVsPjtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIHJlYWRvbmx5IG9yZ2FuaXNhdGlvblNlcnZpY2U6IE9yZ2FuaXNhdGlvblNlcnZpY2UsIHByaXZhdGUgcmVhZG9ubHkgb3JnYW5pc2F0aW9uQ29udmVydGVyOiBPcmdhbmlzYXRpb25Db252ZXJ0ZXIpIHtcbiAgICBzdXBlcigpO1xuICB9XG5cbiAgcHVibGljIG5nT25Jbml0KCk6IHZvaWQge1xuICAgIHN1cGVyLm5nT25Jbml0KCk7XG4gICAgaWYgKHRoaXMuY2FzZUZpZWxkLnZhbHVlICYmIHRoaXMuY2FzZUZpZWxkLnZhbHVlLk9yZ2FuaXNhdGlvbklEKSB7XG4gICAgICB0aGlzLm9yZ2FuaXNhdGlvbnMkID0gdGhpcy5vcmdhbmlzYXRpb25TZXJ2aWNlLmdldEFjdGl2ZU9yZ2FuaXNhdGlvbnMoKTtcbiAgICAgIHRoaXMuc2VsZWN0ZWRPcmckID0gdGhpcy5vcmdhbmlzYXRpb25zJC5waXBlKFxuICAgICAgICBzd2l0Y2hNYXAoKG9yZ2FuaXNhdGlvbnM6IE9yZ2FuaXNhdGlvblZtW10pID0+IG9mKFxuICAgICAgICAgICAgdGhpcy5vcmdhbmlzYXRpb25Db252ZXJ0ZXIudG9TaW1wbGVPcmdhbmlzYXRpb25Nb2RlbChcbiAgICAgICAgICAgICAgb3JnYW5pc2F0aW9ucy5maW5kKGZpbmRPcmcgPT4gZmluZE9yZy5vcmdhbmlzYXRpb25JZGVudGlmaWVyID09PSB0aGlzLmNhc2VGaWVsZC52YWx1ZS5PcmdhbmlzYXRpb25JRClcbiAgICAgICAgICAgIClcbiAgICAgICAgICApXG4gICAgICAgIClcbiAgICAgICk7XG4gICAgfVxuICB9XG59XG4iLCI8ZGl2IGNsYXNzPVwiY29tcGxleC1wYW5lbFwiPlxuICA8dGFibGUgY2xhc3M9XCJjb21wbGV4LWZpZWxkLXRhYmxlXCIgW2F0dHIuYXJpYS1kZXNjcmliZWRieV09XCInY29tcGxleCBvcmdhbmlzYXRpb24gZmllbGQgdGFibGUnIHwgcnB4VHJhbnNsYXRlXCI+XG4gICAgPHRib2R5PlxuICAgICAgPHRyPlxuICAgICAgICA8dGggc3R5bGU9XCJkaXNwbGF5OiBub25lO1wiPjwvdGg+XG4gICAgICAgIDx0ZD5cbiAgICAgICAgICA8dGFibGUgY2xhc3M9XCJjb21wbGV4LWZpZWxkLXRhYmxlXCIgKm5nSWY9XCIoc2VsZWN0ZWRPcmckIHwgYXN5bmMpIGFzIHNlbGVjdGVkT3JnXCJcbiAgICAgICAgICAgICAgICAgW2F0dHIuYXJpYS1kZXNjcmliZWRieV09XCInY29tcGxleCBzZWxlY3RlZCBvcmdhbmlzYXRpb24gZmllbGQgdGFibGUnIHwgcnB4VHJhbnNsYXRlXCI+XG4gICAgICAgICAgICA8dHIgY2xhc3M9XCJjb21wbGV4LXBhbmVsLWNvbXBvdW5kLWZpZWxkXCI+XG4gICAgICAgICAgICAgIDx0aCBzdHlsZT1cImRpc3BsYXk6IG5vbmU7XCI+PC90aD5cbiAgICAgICAgICAgICAgPHRkIGNsYXNzPVwibGFiZWwtd2lkdGgtc21hbGxcIj48c3BhbiBjbGFzcz1cInRleHQtMTZcIj57eydOYW1lOicgfCBycHhUcmFuc2xhdGV9fTwvc3Bhbj48L3RkPlxuICAgICAgICAgICAgICA8dGQ+PHNwYW4gY2xhc3M9XCJ0ZXh0LTE2XCI+e3tzZWxlY3RlZE9yZy5uYW1lfX08L3NwYW4+PC90ZD5cbiAgICAgICAgICAgIDwvdHI+XG4gICAgICAgICAgICA8dHIgY2xhc3M9XCJjb21wbGV4LXBhbmVsLWNvbXBvdW5kLWZpZWxkXCI+XG4gICAgICAgICAgICAgIDx0aCBzdHlsZT1cImRpc3BsYXk6IG5vbmU7XCI+PC90aD5cbiAgICAgICAgICAgICAgPHRkIGNsYXNzPVwibGFiZWwtd2lkdGgtc21hbGxcIj48c3BhbiBjbGFzcz1cInRleHQtMTZcIj57eydBZGRyZXNzOicgfCBycHhUcmFuc2xhdGV9fTwvc3Bhbj48L3RkPlxuICAgICAgICAgICAgICA8dGQ+XG4gICAgICAgICAgICAgICAgPGNjZC1tYXJrZG93biBbY29udGVudF09XCJzZWxlY3RlZE9yZy5hZGRyZXNzXCI+PC9jY2QtbWFya2Rvd24+XG4gICAgICAgICAgICAgIDwvdGQ+XG4gICAgICAgICAgICA8L3RyPlxuICAgICAgICAgIDwvdGFibGU+XG4gICAgICAgIDwvdGQ+XG4gICAgICA8L3RyPlxuICAgIDwvdGJvZHk+XG4gIDwvdGFibGU+XG48L2Rpdj5cbiJdfQ==