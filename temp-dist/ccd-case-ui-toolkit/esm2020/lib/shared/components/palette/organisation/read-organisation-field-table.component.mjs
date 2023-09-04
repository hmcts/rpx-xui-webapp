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
function ReadOrganisationFieldTableComponent_table_12_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "table", 1);
    i0.ɵɵpipe(1, "rpxTranslate");
    i0.ɵɵelementStart(2, "tr", 6);
    i0.ɵɵelement(3, "th", 7);
    i0.ɵɵelementStart(4, "td", 8)(5, "span", 4);
    i0.ɵɵtext(6);
    i0.ɵɵpipe(7, "rpxTranslate");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(8, "td")(9, "span", 4);
    i0.ɵɵtext(10);
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(11, "tr", 6);
    i0.ɵɵelement(12, "th", 7);
    i0.ɵɵelementStart(13, "td", 8)(14, "span", 4);
    i0.ɵɵtext(15);
    i0.ɵɵpipe(16, "rpxTranslate");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(17, "td");
    i0.ɵɵelement(18, "ccd-markdown", 9);
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
export class ReadOrganisationFieldTableComponent extends AbstractFieldReadComponent {
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
ReadOrganisationFieldTableComponent.ɵfac = function ReadOrganisationFieldTableComponent_Factory(t) { return new (t || ReadOrganisationFieldTableComponent)(i0.ɵɵdirectiveInject(i1.OrganisationService), i0.ɵɵdirectiveInject(i2.OrganisationConverter)); };
ReadOrganisationFieldTableComponent.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: ReadOrganisationFieldTableComponent, selectors: [["ccd-read-organisation-field-table"]], inputs: { caseFields: "caseFields" }, features: [i0.ɵɵInheritDefinitionFeature], decls: 14, vars: 9, consts: [[1, "complex-panel"], [1, "complex-field-table"], [1, "complex-field-title"], [1, "complex-panel-title"], [1, "text-16"], ["class", "complex-field-table", 4, "ngIf"], [1, "complex-panel-compound-field"], [2, "display", "none"], [1, "label-width-medium"], [3, "content"]], template: function ReadOrganisationFieldTableComponent_Template(rf, ctx) { if (rf & 1) {
        i0.ɵɵelementStart(0, "div", 0)(1, "table", 1);
        i0.ɵɵpipe(2, "rpxTranslate");
        i0.ɵɵelementStart(3, "tbody")(4, "tr")(5, "th", 2)(6, "dl", 3)(7, "dt")(8, "span", 4);
        i0.ɵɵtext(9);
        i0.ɵɵpipe(10, "rpxTranslate");
        i0.ɵɵelementEnd()()()();
        i0.ɵɵelementStart(11, "td");
        i0.ɵɵtemplate(12, ReadOrganisationFieldTableComponent_table_12_Template, 19, 11, "table", 5);
        i0.ɵɵpipe(13, "async");
        i0.ɵɵelementEnd()()()()();
    } if (rf & 2) {
        i0.ɵɵadvance(1);
        i0.ɵɵattribute("aria-describedby", i0.ɵɵpipeBind1(2, 3, "complex organisation field table"));
        i0.ɵɵadvance(8);
        i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(10, 5, ctx.caseField.label));
        i0.ɵɵadvance(3);
        i0.ɵɵproperty("ngIf", i0.ɵɵpipeBind1(13, 7, ctx.selectedOrg$));
    } }, dependencies: [i3.NgIf, i4.MarkdownComponent, i3.AsyncPipe, i5.RpxTranslatePipe], styles: [".hmcts-banner[_ngcontent-%COMP%]{border:0 solid;margin-bottom:10px;color:#000}.hmcts-banner[_ngcontent-%COMP%]   .warning-message[_ngcontent-%COMP%]{font-weight:700}.govuk-hint[_ngcontent-%COMP%]{font-size:1.1rem}.name-header[_ngcontent-%COMP%]{font-weight:700;margin-top:10px;font-size:18px}.td-address[_ngcontent-%COMP%]{width:90%;padding-top:2px}.td-select[_ngcontent-%COMP%]{width:10%}.warning-panel[_ngcontent-%COMP%]{background-color:#e7ebef;height:40px;margin-bottom:0;align-items:center;display:flex}.warning-panel[_ngcontent-%COMP%]   .warning-message[_ngcontent-%COMP%]{padding-left:15px}.complex-field-table[_ngcontent-%COMP%] > tbody[_ngcontent-%COMP%] > tr[_ngcontent-%COMP%] > th[_ngcontent-%COMP%]{border:none}.complex-field-table[_ngcontent-%COMP%] > tbody[_ngcontent-%COMP%] > tr[_ngcontent-%COMP%]:last-child > th[_ngcontent-%COMP%], .complex-field-table[_ngcontent-%COMP%] > tbody[_ngcontent-%COMP%] > tr[_ngcontent-%COMP%]:last-child > td[_ngcontent-%COMP%]{border-bottom:none}.complex-field-title[_ngcontent-%COMP%]{width:300px}.label-width-small[_ngcontent-%COMP%]{width:100px}.label-width-medium[_ngcontent-%COMP%]{width:150px}.scroll-container[_ngcontent-%COMP%]{height:600px;overflow-y:scroll}.no-result-message[_ngcontent-%COMP%]{margin-top:15px}"] });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(ReadOrganisationFieldTableComponent, [{
        type: Component,
        args: [{ selector: 'ccd-read-organisation-field-table', template: "<div class=\"complex-panel\">\n  <table class=\"complex-field-table\" [attr.aria-describedby]=\"'complex organisation field table' | rpxTranslate\">\n    <tbody>\n      <tr>\n        <th class=\"complex-field-title\">\n          <dl class=\"complex-panel-title\">\n            <dt><span class=\"text-16\">{{caseField.label | rpxTranslate}}</span></dt>\n          </dl>\n        </th>\n        <td>\n          <table class=\"complex-field-table\" *ngIf=\"(selectedOrg$ | async) as selectedOrg\"\n                 [attr.aria-describedby]=\"'complex selected organisation field table' | rpxTranslate\">\n            <tr class=\"complex-panel-compound-field\">\n              <th style=\"display: none;\"></th>\n              <td class=\"label-width-medium\"><span class=\"text-16\">{{'Name:' | rpxTranslate}}</span></td>\n              <td><span class=\"text-16\">{{selectedOrg.name}}</span></td>\n            </tr>\n            <tr class=\"complex-panel-compound-field\">\n              <th style=\"display: none;\"></th>\n              <td class=\"label-width-medium\"><span class=\"text-16\">{{'Address:' | rpxTranslate}}</span></td>\n              <td>\n                <ccd-markdown [content]=\"selectedOrg.address\"></ccd-markdown>\n              </td>\n            </tr>\n          </table>\n        </td>\n      </tr>\n    </tbody>\n  </table>\n</div>\n", styles: [".hmcts-banner{border:0 solid;margin-bottom:10px;color:#000}.hmcts-banner .warning-message{font-weight:700}.govuk-hint{font-size:1.1rem}.name-header{font-weight:700;margin-top:10px;font-size:18px}.td-address{width:90%;padding-top:2px}.td-select{width:10%}.warning-panel{background-color:#e7ebef;height:40px;margin-bottom:0;align-items:center;display:flex}.warning-panel .warning-message{padding-left:15px}.complex-field-table>tbody>tr>th{border:none}.complex-field-table>tbody>tr:last-child>th,.complex-field-table>tbody>tr:last-child>td{border-bottom:none}.complex-field-title{width:300px}.label-width-small{width:100px}.label-width-medium{width:150px}.scroll-container{height:600px;overflow-y:scroll}.no-result-message{margin-top:15px}\n"] }]
    }], function () { return [{ type: i1.OrganisationService }, { type: i2.OrganisationConverter }]; }, { caseFields: [{
            type: Input
        }] }); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVhZC1vcmdhbmlzYXRpb24tZmllbGQtdGFibGUuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvY2NkLWNhc2UtdWktdG9vbGtpdC9zcmMvbGliL3NoYXJlZC9jb21wb25lbnRzL3BhbGV0dGUvb3JnYW5pc2F0aW9uL3JlYWQtb3JnYW5pc2F0aW9uLWZpZWxkLXRhYmxlLmNvbXBvbmVudC50cyIsIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2NjZC1jYXNlLXVpLXRvb2xraXQvc3JjL2xpYi9zaGFyZWQvY29tcG9uZW50cy9wYWxldHRlL29yZ2FuaXNhdGlvbi9yZWFkLW9yZ2FuaXNhdGlvbi1maWVsZC10YWJsZS5jb21wb25lbnQuaHRtbCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBVSxNQUFNLGVBQWUsQ0FBQztBQUN6RCxPQUFPLEVBQWMsRUFBRSxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQ3RDLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUUzQyxPQUFPLEVBQUUscUJBQXFCLEVBQUUsTUFBTSxxREFBcUQsQ0FBQztBQUU1RixPQUFPLEVBQUUsbUJBQW1CLEVBQWtCLE1BQU0scURBQXFELENBQUM7QUFDMUcsT0FBTyxFQUFFLDBCQUEwQixFQUFFLE1BQU0sNkNBQTZDLENBQUM7Ozs7Ozs7O0lDRy9FLGdDQUM0Rjs7SUFDMUYsNkJBQXlDO0lBQ3ZDLHdCQUFnQztJQUNoQyw2QkFBK0IsY0FBQTtJQUFzQixZQUEwQjs7SUFBQSxpQkFBTyxFQUFBO0lBQ3RGLDBCQUFJLGNBQUE7SUFBc0IsYUFBb0I7SUFBQSxpQkFBTyxFQUFBLEVBQUE7SUFFdkQsOEJBQXlDO0lBQ3ZDLHlCQUFnQztJQUNoQyw4QkFBK0IsZUFBQTtJQUFzQixhQUE2Qjs7SUFBQSxpQkFBTyxFQUFBO0lBQ3pGLDJCQUFJO0lBQ0YsbUNBQTZEO0lBQy9ELGlCQUFLLEVBQUEsRUFBQTs7O0lBWEYscUdBQW9GO0lBR2xDLGVBQTBCO0lBQTFCLG1EQUEwQjtJQUNyRCxlQUFvQjtJQUFwQix5Q0FBb0I7SUFJTyxlQUE2QjtJQUE3Qix1REFBNkI7SUFFbEUsZUFBK0I7SUFBL0IsZ0RBQStCOztBRE43RCxNQUFNLE9BQU8sbUNBQW9DLFNBQVEsMEJBQTBCO0lBUWpGLFlBQTZCLG1CQUF3QyxFQUFtQixxQkFBNEM7UUFDbEksS0FBSyxFQUFFLENBQUM7UUFEbUIsd0JBQW1CLEdBQW5CLG1CQUFtQixDQUFxQjtRQUFtQiwwQkFBcUIsR0FBckIscUJBQXFCLENBQXVCO1FBTDdILGVBQVUsR0FBZ0IsRUFBRSxDQUFDO0lBT3BDLENBQUM7SUFFTSxRQUFRO1FBQ2IsS0FBSyxDQUFDLFFBQVEsRUFBRSxDQUFDO1FBQ2pCLElBQUksSUFBSSxDQUFDLFNBQVMsQ0FBQyxLQUFLLElBQUksSUFBSSxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsY0FBYyxFQUFFO1lBQy9ELElBQUksQ0FBQyxjQUFjLEdBQUcsSUFBSSxDQUFDLG1CQUFtQixDQUFDLHNCQUFzQixFQUFFLENBQUM7WUFDeEUsSUFBSSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUMsY0FBYyxDQUFDLElBQUksQ0FDMUMsU0FBUyxDQUFDLENBQUMsYUFBK0IsRUFBRSxFQUFFLENBQUMsRUFBRSxDQUM3QyxJQUFJLENBQUMscUJBQXFCLENBQUMseUJBQXlCLENBQ2xELGFBQWEsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQyxPQUFPLENBQUMsc0JBQXNCLEtBQUssSUFBSSxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsY0FBYyxDQUFDLENBQ3RHLENBQ0YsQ0FDRixDQUNGLENBQUM7U0FDSDtJQUNILENBQUM7O3NIQXpCVSxtQ0FBbUM7c0ZBQW5DLG1DQUFtQztRQ2ZoRCw4QkFBMkIsZUFBQTs7UUFFdkIsNkJBQU8sU0FBQSxZQUFBLFlBQUEsU0FBQSxjQUFBO1FBSTJCLFlBQWtDOztRQUFBLGlCQUFPLEVBQUEsRUFBQSxFQUFBO1FBR3ZFLDJCQUFJO1FBQ0YsNEZBY1E7O1FBQ1YsaUJBQUssRUFBQSxFQUFBLEVBQUEsRUFBQTs7UUF4QndCLGVBQTJFO1FBQTNFLDRGQUEyRTtRQUsxRSxlQUFrQztRQUFsQyxnRUFBa0M7UUFJMUIsZUFBNkI7UUFBN0IsOERBQTZCOzt1RkRLOUQsbUNBQW1DO2NBTi9DLFNBQVM7MkJBQ0UsbUNBQW1DOzBHQVF0QyxVQUFVO2tCQURoQixLQUFLIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBJbnB1dCwgT25Jbml0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlLCBvZiB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgc3dpdGNoTWFwIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHsgQ2FzZUZpZWxkIH0gZnJvbSAnLi4vLi4vLi4vZG9tYWluL2RlZmluaXRpb24vY2FzZS1maWVsZC5tb2RlbCc7XG5pbXBvcnQgeyBPcmdhbmlzYXRpb25Db252ZXJ0ZXIgfSBmcm9tICcuLi8uLi8uLi9kb21haW4vb3JnYW5pc2F0aW9uL29yZ2FuaXNhdGlvbi1jb252ZXJ0ZXInO1xuaW1wb3J0IHsgU2ltcGxlT3JnYW5pc2F0aW9uTW9kZWwgfSBmcm9tICcuLi8uLi8uLi9kb21haW4vb3JnYW5pc2F0aW9uL3NpbXBsZS1vcmdhbmlzYXRpb24ubW9kZWwnO1xuaW1wb3J0IHsgT3JnYW5pc2F0aW9uU2VydmljZSwgT3JnYW5pc2F0aW9uVm0gfSBmcm9tICcuLi8uLi8uLi9zZXJ2aWNlcy9vcmdhbmlzYXRpb24vb3JnYW5pc2F0aW9uLnNlcnZpY2UnO1xuaW1wb3J0IHsgQWJzdHJhY3RGaWVsZFJlYWRDb21wb25lbnQgfSBmcm9tICcuLi9iYXNlLWZpZWxkL2Fic3RyYWN0LWZpZWxkLXJlYWQuY29tcG9uZW50JztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnY2NkLXJlYWQtb3JnYW5pc2F0aW9uLWZpZWxkLXRhYmxlJyxcbiAgdGVtcGxhdGVVcmw6ICcuL3JlYWQtb3JnYW5pc2F0aW9uLWZpZWxkLXRhYmxlLmNvbXBvbmVudC5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJy4vb3JnYW5pc2F0aW9uLWZpZWxkLnNjc3MnXVxufSlcblxuZXhwb3J0IGNsYXNzIFJlYWRPcmdhbmlzYXRpb25GaWVsZFRhYmxlQ29tcG9uZW50IGV4dGVuZHMgQWJzdHJhY3RGaWVsZFJlYWRDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuXG4gIEBJbnB1dCgpXG4gIHB1YmxpYyBjYXNlRmllbGRzOiBDYXNlRmllbGRbXSA9IFtdO1xuXG4gIHB1YmxpYyBvcmdhbmlzYXRpb25zJDogT2JzZXJ2YWJsZTxPcmdhbmlzYXRpb25WbVtdPjtcbiAgcHVibGljIHNlbGVjdGVkT3JnJDogT2JzZXJ2YWJsZTxTaW1wbGVPcmdhbmlzYXRpb25Nb2RlbD47XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSByZWFkb25seSBvcmdhbmlzYXRpb25TZXJ2aWNlOiBPcmdhbmlzYXRpb25TZXJ2aWNlLCBwcml2YXRlIHJlYWRvbmx5IG9yZ2FuaXNhdGlvbkNvbnZlcnRlcjogT3JnYW5pc2F0aW9uQ29udmVydGVyKSB7XG4gICAgc3VwZXIoKTtcbiAgfVxuXG4gIHB1YmxpYyBuZ09uSW5pdCgpOiB2b2lkIHtcbiAgICBzdXBlci5uZ09uSW5pdCgpO1xuICAgIGlmICh0aGlzLmNhc2VGaWVsZC52YWx1ZSAmJiB0aGlzLmNhc2VGaWVsZC52YWx1ZS5PcmdhbmlzYXRpb25JRCkge1xuICAgICAgdGhpcy5vcmdhbmlzYXRpb25zJCA9IHRoaXMub3JnYW5pc2F0aW9uU2VydmljZS5nZXRBY3RpdmVPcmdhbmlzYXRpb25zKCk7XG4gICAgICB0aGlzLnNlbGVjdGVkT3JnJCA9IHRoaXMub3JnYW5pc2F0aW9ucyQucGlwZShcbiAgICAgICAgc3dpdGNoTWFwKChvcmdhbmlzYXRpb25zOiBPcmdhbmlzYXRpb25WbVtdKSA9PiBvZihcbiAgICAgICAgICAgIHRoaXMub3JnYW5pc2F0aW9uQ29udmVydGVyLnRvU2ltcGxlT3JnYW5pc2F0aW9uTW9kZWwoXG4gICAgICAgICAgICAgIG9yZ2FuaXNhdGlvbnMuZmluZChmaW5kT3JnID0+IGZpbmRPcmcub3JnYW5pc2F0aW9uSWRlbnRpZmllciA9PT0gdGhpcy5jYXNlRmllbGQudmFsdWUuT3JnYW5pc2F0aW9uSUQpXG4gICAgICAgICAgICApXG4gICAgICAgICAgKVxuICAgICAgICApXG4gICAgICApO1xuICAgIH1cbiAgfVxufVxuIiwiPGRpdiBjbGFzcz1cImNvbXBsZXgtcGFuZWxcIj5cbiAgPHRhYmxlIGNsYXNzPVwiY29tcGxleC1maWVsZC10YWJsZVwiIFthdHRyLmFyaWEtZGVzY3JpYmVkYnldPVwiJ2NvbXBsZXggb3JnYW5pc2F0aW9uIGZpZWxkIHRhYmxlJyB8IHJweFRyYW5zbGF0ZVwiPlxuICAgIDx0Ym9keT5cbiAgICAgIDx0cj5cbiAgICAgICAgPHRoIGNsYXNzPVwiY29tcGxleC1maWVsZC10aXRsZVwiPlxuICAgICAgICAgIDxkbCBjbGFzcz1cImNvbXBsZXgtcGFuZWwtdGl0bGVcIj5cbiAgICAgICAgICAgIDxkdD48c3BhbiBjbGFzcz1cInRleHQtMTZcIj57e2Nhc2VGaWVsZC5sYWJlbCB8IHJweFRyYW5zbGF0ZX19PC9zcGFuPjwvZHQ+XG4gICAgICAgICAgPC9kbD5cbiAgICAgICAgPC90aD5cbiAgICAgICAgPHRkPlxuICAgICAgICAgIDx0YWJsZSBjbGFzcz1cImNvbXBsZXgtZmllbGQtdGFibGVcIiAqbmdJZj1cIihzZWxlY3RlZE9yZyQgfCBhc3luYykgYXMgc2VsZWN0ZWRPcmdcIlxuICAgICAgICAgICAgICAgICBbYXR0ci5hcmlhLWRlc2NyaWJlZGJ5XT1cIidjb21wbGV4IHNlbGVjdGVkIG9yZ2FuaXNhdGlvbiBmaWVsZCB0YWJsZScgfCBycHhUcmFuc2xhdGVcIj5cbiAgICAgICAgICAgIDx0ciBjbGFzcz1cImNvbXBsZXgtcGFuZWwtY29tcG91bmQtZmllbGRcIj5cbiAgICAgICAgICAgICAgPHRoIHN0eWxlPVwiZGlzcGxheTogbm9uZTtcIj48L3RoPlxuICAgICAgICAgICAgICA8dGQgY2xhc3M9XCJsYWJlbC13aWR0aC1tZWRpdW1cIj48c3BhbiBjbGFzcz1cInRleHQtMTZcIj57eydOYW1lOicgfCBycHhUcmFuc2xhdGV9fTwvc3Bhbj48L3RkPlxuICAgICAgICAgICAgICA8dGQ+PHNwYW4gY2xhc3M9XCJ0ZXh0LTE2XCI+e3tzZWxlY3RlZE9yZy5uYW1lfX08L3NwYW4+PC90ZD5cbiAgICAgICAgICAgIDwvdHI+XG4gICAgICAgICAgICA8dHIgY2xhc3M9XCJjb21wbGV4LXBhbmVsLWNvbXBvdW5kLWZpZWxkXCI+XG4gICAgICAgICAgICAgIDx0aCBzdHlsZT1cImRpc3BsYXk6IG5vbmU7XCI+PC90aD5cbiAgICAgICAgICAgICAgPHRkIGNsYXNzPVwibGFiZWwtd2lkdGgtbWVkaXVtXCI+PHNwYW4gY2xhc3M9XCJ0ZXh0LTE2XCI+e3snQWRkcmVzczonIHwgcnB4VHJhbnNsYXRlfX08L3NwYW4+PC90ZD5cbiAgICAgICAgICAgICAgPHRkPlxuICAgICAgICAgICAgICAgIDxjY2QtbWFya2Rvd24gW2NvbnRlbnRdPVwic2VsZWN0ZWRPcmcuYWRkcmVzc1wiPjwvY2NkLW1hcmtkb3duPlxuICAgICAgICAgICAgICA8L3RkPlxuICAgICAgICAgICAgPC90cj5cbiAgICAgICAgICA8L3RhYmxlPlxuICAgICAgICA8L3RkPlxuICAgICAgPC90cj5cbiAgICA8L3Rib2R5PlxuICA8L3RhYmxlPlxuPC9kaXY+XG4iXX0=