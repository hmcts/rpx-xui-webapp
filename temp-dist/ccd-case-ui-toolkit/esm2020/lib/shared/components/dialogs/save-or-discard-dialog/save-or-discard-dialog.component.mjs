import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import * as i0 from "@angular/core";
import * as i1 from "@angular/material/dialog";
import * as i2 from "rpx-xui-translation";
export class SaveOrDiscardDialogComponent {
    constructor(matDialogRef) {
        this.matDialogRef = matDialogRef;
    }
    cancel() {
        this.result = 'Cancel';
        this.matDialogRef.close(this.result);
    }
    save() {
        this.result = 'Save';
        this.matDialogRef.close(this.result);
    }
    discard() {
        this.result = 'Discard';
        this.matDialogRef.close(this.result);
    }
}
SaveOrDiscardDialogComponent.ɵfac = function SaveOrDiscardDialogComponent_Factory(t) { return new (t || SaveOrDiscardDialogComponent)(i0.ɵɵdirectiveInject(i1.MatDialogRef)); };
SaveOrDiscardDialogComponent.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: SaveOrDiscardDialogComponent, selectors: [["ccd-save-or-discard-dialog"]], decls: 19, vars: 12, consts: [[1, "dialog-header"], [1, "heading-h2", "x", 3, "click"], [1, "heading-h2", "dialog-title"], [1, "dialog-info"], [1, "text-info"], ["type", "button", "title", "Save", 1, "button", "action-button", 3, "click"], ["type", "button", "title", "Discard", 1, "button", "button-secondary", 3, "click"]], template: function SaveOrDiscardDialogComponent_Template(rf, ctx) { if (rf & 1) {
        i0.ɵɵelementStart(0, "div")(1, "div", 0)(2, "h2", 1);
        i0.ɵɵlistener("click", function SaveOrDiscardDialogComponent_Template_h2_click_2_listener() { return ctx.cancel(); });
        i0.ɵɵtext(3, "X");
        i0.ɵɵelementEnd()();
        i0.ɵɵelementStart(4, "div")(5, "h2", 2);
        i0.ɵɵtext(6);
        i0.ɵɵpipe(7, "rpxTranslate");
        i0.ɵɵelementEnd()();
        i0.ɵɵelementStart(8, "div", 3)(9, "span", 4);
        i0.ɵɵtext(10);
        i0.ɵɵpipe(11, "rpxTranslate");
        i0.ɵɵelementEnd()();
        i0.ɵɵelementStart(12, "div")(13, "button", 5);
        i0.ɵɵlistener("click", function SaveOrDiscardDialogComponent_Template_button_click_13_listener() { return ctx.save(); });
        i0.ɵɵtext(14);
        i0.ɵɵpipe(15, "rpxTranslate");
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(16, "button", 6);
        i0.ɵɵlistener("click", function SaveOrDiscardDialogComponent_Template_button_click_16_listener() { return ctx.discard(); });
        i0.ɵɵtext(17);
        i0.ɵɵpipe(18, "rpxTranslate");
        i0.ɵɵelementEnd()()();
    } if (rf & 2) {
        i0.ɵɵadvance(6);
        i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(7, 4, "Would you like to save changes to this page?"));
        i0.ɵɵadvance(4);
        i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(11, 6, "You will be taken back to your case list."));
        i0.ɵɵadvance(4);
        i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(15, 8, "Save"));
        i0.ɵɵadvance(3);
        i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(18, 10, "Discard"));
    } }, dependencies: [i2.RpxTranslatePipe], styles: [".x[_ngcontent-%COMP%]{margin:0;padding:9px 9px 0 0;font-size:24px;font-weight:700;font-style:normal;font-stretch:normal;cursor:pointer;color:#6e7071}.dialog-header[_ngcontent-%COMP%]{text-align:right}.dialog-title[_ngcontent-%COMP%], .dialog-info[_ngcontent-%COMP%]{margin:0 0 21px 25px}.action-button[_ngcontent-%COMP%]{margin:0 15px 0 25px}"] });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(SaveOrDiscardDialogComponent, [{
        type: Component,
        args: [{ selector: 'ccd-save-or-discard-dialog', template: "<div>\n  <div class=\"dialog-header\">\n    <h2 (click)=\"cancel()\" class=\"heading-h2 x\">X</h2>\n  </div>\n  <div>\n    <h2 class=\"heading-h2 dialog-title\">{{'Would you like to save changes to this page?' | rpxTranslate}}</h2>\n  </div>\n  <div class=\"dialog-info\">\n    <span class=\"text-info\">{{'You will be taken back to your case list.' | rpxTranslate}}</span>\n  </div>\n  <div>\n    <button type=\"button\" title=\"Save\" class=\"button action-button\" (click)=\"save()\">{{'Save' | rpxTranslate}}</button>\n    <button type=\"button\" title=\"Discard\" class=\"button button-secondary\" (click)=\"discard()\">{{'Discard' | rpxTranslate}}</button>\n  </div>\n</div>\n", styles: [".x{margin:0;padding:9px 9px 0 0;font-size:24px;font-weight:700;font-style:normal;font-stretch:normal;cursor:pointer;color:#6e7071}.dialog-header{text-align:right}.dialog-title,.dialog-info{margin:0 0 21px 25px}.action-button{margin:0 15px 0 25px}\n"] }]
    }], function () { return [{ type: i1.MatDialogRef }]; }, null); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2F2ZS1vci1kaXNjYXJkLWRpYWxvZy5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9jY2QtY2FzZS11aS10b29sa2l0L3NyYy9saWIvc2hhcmVkL2NvbXBvbmVudHMvZGlhbG9ncy9zYXZlLW9yLWRpc2NhcmQtZGlhbG9nL3NhdmUtb3ItZGlzY2FyZC1kaWFsb2cuY29tcG9uZW50LnRzIiwiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvY2NkLWNhc2UtdWktdG9vbGtpdC9zcmMvbGliL3NoYXJlZC9jb21wb25lbnRzL2RpYWxvZ3Mvc2F2ZS1vci1kaXNjYXJkLWRpYWxvZy9zYXZlLW9yLWRpc2NhcmQtZGlhbG9nLmNvbXBvbmVudC5odG1sIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDMUMsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLDBCQUEwQixDQUFDOzs7O0FBT3hELE1BQU0sT0FBTyw0QkFBNEI7SUFJdkMsWUFBNkIsWUFBd0Q7UUFBeEQsaUJBQVksR0FBWixZQUFZLENBQTRDO0lBQUcsQ0FBQztJQUVsRixNQUFNO1FBQ1gsSUFBSSxDQUFDLE1BQU0sR0FBRyxRQUFRLENBQUM7UUFDdkIsSUFBSSxDQUFDLFlBQVksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQ3ZDLENBQUM7SUFDTSxJQUFJO1FBQ1QsSUFBSSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUM7UUFDckIsSUFBSSxDQUFDLFlBQVksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQ3ZDLENBQUM7SUFDTSxPQUFPO1FBQ1osSUFBSSxDQUFDLE1BQU0sR0FBRyxTQUFTLENBQUM7UUFDeEIsSUFBSSxDQUFDLFlBQVksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQ3ZDLENBQUM7O3dHQWpCVSw0QkFBNEI7K0VBQTVCLDRCQUE0QjtRQ1J6QywyQkFBSyxhQUFBLFlBQUE7UUFFRyxxR0FBUyxZQUFRLElBQUM7UUFBc0IsaUJBQUM7UUFBQSxpQkFBSyxFQUFBO1FBRXBELDJCQUFLLFlBQUE7UUFDaUMsWUFBaUU7O1FBQUEsaUJBQUssRUFBQTtRQUU1Ryw4QkFBeUIsY0FBQTtRQUNDLGFBQThEOztRQUFBLGlCQUFPLEVBQUE7UUFFL0YsNEJBQUssaUJBQUE7UUFDNkQsMEdBQVMsVUFBTSxJQUFDO1FBQUMsYUFBeUI7O1FBQUEsaUJBQVM7UUFDbkgsa0NBQTBGO1FBQXBCLDBHQUFTLGFBQVMsSUFBQztRQUFDLGFBQTRCOztRQUFBLGlCQUFTLEVBQUEsRUFBQTs7UUFQM0YsZUFBaUU7UUFBakUsMEZBQWlFO1FBRzdFLGVBQThEO1FBQTlELHdGQUE4RDtRQUdMLGVBQXlCO1FBQXpCLG1EQUF5QjtRQUNoQixlQUE0QjtRQUE1Qix1REFBNEI7O3VGREo3Ryw0QkFBNEI7Y0FMeEMsU0FBUzsyQkFDRSw0QkFBNEIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE1hdERpYWxvZ1JlZiB9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL2RpYWxvZyc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2NjZC1zYXZlLW9yLWRpc2NhcmQtZGlhbG9nJyxcbiAgdGVtcGxhdGVVcmw6ICcuL3NhdmUtb3ItZGlzY2FyZC1kaWFsb2cuY29tcG9uZW50Lmh0bWwnLFxuICBzdHlsZVVybHM6IFsnLi4vYWN0aW9uLWRpYWxvZy5jb21wb25lbnQuc2NzcyddXG59KVxuZXhwb3J0IGNsYXNzIFNhdmVPckRpc2NhcmREaWFsb2dDb21wb25lbnQge1xuXG4gIHB1YmxpYyByZXN1bHQ6IHN0cmluZztcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIHJlYWRvbmx5IG1hdERpYWxvZ1JlZjogTWF0RGlhbG9nUmVmPFNhdmVPckRpc2NhcmREaWFsb2dDb21wb25lbnQ+KSB7fVxuXG4gIHB1YmxpYyBjYW5jZWwoKSB7XG4gICAgdGhpcy5yZXN1bHQgPSAnQ2FuY2VsJztcbiAgICB0aGlzLm1hdERpYWxvZ1JlZi5jbG9zZSh0aGlzLnJlc3VsdCk7XG4gIH1cbiAgcHVibGljIHNhdmUoKSB7XG4gICAgdGhpcy5yZXN1bHQgPSAnU2F2ZSc7XG4gICAgdGhpcy5tYXREaWFsb2dSZWYuY2xvc2UodGhpcy5yZXN1bHQpO1xuICB9XG4gIHB1YmxpYyBkaXNjYXJkKCkge1xuICAgIHRoaXMucmVzdWx0ID0gJ0Rpc2NhcmQnO1xuICAgIHRoaXMubWF0RGlhbG9nUmVmLmNsb3NlKHRoaXMucmVzdWx0KTtcbiAgfVxufVxuIiwiPGRpdj5cbiAgPGRpdiBjbGFzcz1cImRpYWxvZy1oZWFkZXJcIj5cbiAgICA8aDIgKGNsaWNrKT1cImNhbmNlbCgpXCIgY2xhc3M9XCJoZWFkaW5nLWgyIHhcIj5YPC9oMj5cbiAgPC9kaXY+XG4gIDxkaXY+XG4gICAgPGgyIGNsYXNzPVwiaGVhZGluZy1oMiBkaWFsb2ctdGl0bGVcIj57eydXb3VsZCB5b3UgbGlrZSB0byBzYXZlIGNoYW5nZXMgdG8gdGhpcyBwYWdlPycgfCBycHhUcmFuc2xhdGV9fTwvaDI+XG4gIDwvZGl2PlxuICA8ZGl2IGNsYXNzPVwiZGlhbG9nLWluZm9cIj5cbiAgICA8c3BhbiBjbGFzcz1cInRleHQtaW5mb1wiPnt7J1lvdSB3aWxsIGJlIHRha2VuIGJhY2sgdG8geW91ciBjYXNlIGxpc3QuJyB8IHJweFRyYW5zbGF0ZX19PC9zcGFuPlxuICA8L2Rpdj5cbiAgPGRpdj5cbiAgICA8YnV0dG9uIHR5cGU9XCJidXR0b25cIiB0aXRsZT1cIlNhdmVcIiBjbGFzcz1cImJ1dHRvbiBhY3Rpb24tYnV0dG9uXCIgKGNsaWNrKT1cInNhdmUoKVwiPnt7J1NhdmUnIHwgcnB4VHJhbnNsYXRlfX08L2J1dHRvbj5cbiAgICA8YnV0dG9uIHR5cGU9XCJidXR0b25cIiB0aXRsZT1cIkRpc2NhcmRcIiBjbGFzcz1cImJ1dHRvbiBidXR0b24tc2Vjb25kYXJ5XCIgKGNsaWNrKT1cImRpc2NhcmQoKVwiPnt7J0Rpc2NhcmQnIHwgcnB4VHJhbnNsYXRlfX08L2J1dHRvbj5cbiAgPC9kaXY+XG48L2Rpdj5cbiJdfQ==