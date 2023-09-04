import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import * as i0 from "@angular/core";
import * as i1 from "@angular/material/dialog";
import * as i2 from "rpx-xui-translation";
export class DeleteOrCancelDialogComponent {
    constructor(matDialogRef) {
        this.matDialogRef = matDialogRef;
    }
    delete() {
        this.result = 'Delete';
        this.matDialogRef.close(this.result);
    }
    cancel() {
        this.result = 'Cancel';
        this.matDialogRef.close(this.result);
    }
}
DeleteOrCancelDialogComponent.ɵfac = function DeleteOrCancelDialogComponent_Factory(t) { return new (t || DeleteOrCancelDialogComponent)(i0.ɵɵdirectiveInject(i1.MatDialogRef)); };
DeleteOrCancelDialogComponent.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: DeleteOrCancelDialogComponent, selectors: [["ccd-delete-or-cancel-dialog"]], decls: 19, vars: 12, consts: [[1, "dialog-header"], [1, "heading-h2", "x", 3, "click"], [1, "heading-h2", "dialog-title"], [1, "dialog-info"], [1, "text-info"], ["type", "button", "title", "Delete", 1, "button", "action-button", 3, "click"], ["type", "button", "title", "Cancel", 1, "button", "button-secondary", 3, "click"]], template: function DeleteOrCancelDialogComponent_Template(rf, ctx) { if (rf & 1) {
        i0.ɵɵelementStart(0, "div")(1, "div", 0)(2, "h2", 1);
        i0.ɵɵlistener("click", function DeleteOrCancelDialogComponent_Template_h2_click_2_listener() { return ctx.cancel(); });
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
        i0.ɵɵlistener("click", function DeleteOrCancelDialogComponent_Template_button_click_13_listener() { return ctx.delete(); });
        i0.ɵɵtext(14);
        i0.ɵɵpipe(15, "rpxTranslate");
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(16, "button", 6);
        i0.ɵɵlistener("click", function DeleteOrCancelDialogComponent_Template_button_click_16_listener() { return ctx.cancel(); });
        i0.ɵɵtext(17);
        i0.ɵɵpipe(18, "rpxTranslate");
        i0.ɵɵelementEnd()()();
    } if (rf & 2) {
        i0.ɵɵadvance(6);
        i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(7, 4, "Are you sure you want to delete this draft?"));
        i0.ɵɵadvance(4);
        i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(11, 6, "You are about to delete this draft. Are you sure you want to proceed?"));
        i0.ɵɵadvance(4);
        i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(15, 8, "Delete draft"));
        i0.ɵɵadvance(3);
        i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(18, 10, "Cancel"));
    } }, dependencies: [i2.RpxTranslatePipe], styles: [".x[_ngcontent-%COMP%]{margin:0;padding:9px 9px 0 0;font-size:24px;font-weight:700;font-style:normal;font-stretch:normal;cursor:pointer;color:#6e7071}.dialog-header[_ngcontent-%COMP%]{text-align:right}.dialog-title[_ngcontent-%COMP%], .dialog-info[_ngcontent-%COMP%]{margin:0 0 21px 25px}.action-button[_ngcontent-%COMP%]{margin:0 15px 0 25px}"] });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(DeleteOrCancelDialogComponent, [{
        type: Component,
        args: [{ selector: 'ccd-delete-or-cancel-dialog', template: "<div>\n    <div class=\"dialog-header\">\n      <h2 (click)=\"cancel()\" class=\"heading-h2 x\">X</h2>\n    </div>\n    <div>\n      <h2 class=\"heading-h2 dialog-title\">{{'Are you sure you want to delete this draft?' | rpxTranslate}}</h2>\n    </div>\n    <div class=\"dialog-info\">\n      <span class=\"text-info\">{{'You are about to delete this draft. Are you sure you want to proceed?' | rpxTranslate}}</span>\n    </div>\n    <div>\n      <button type=\"button\" title=\"Delete\" class=\"button action-button\" (click)=\"delete()\">{{'Delete draft' | rpxTranslate}}</button>\n      <button type=\"button\" title=\"Cancel\" class=\"button button-secondary\" (click)=\"cancel()\">{{'Cancel' | rpxTranslate}}</button>\n    </div>\n</div>\n", styles: [".x{margin:0;padding:9px 9px 0 0;font-size:24px;font-weight:700;font-style:normal;font-stretch:normal;cursor:pointer;color:#6e7071}.dialog-header{text-align:right}.dialog-title,.dialog-info{margin:0 0 21px 25px}.action-button{margin:0 15px 0 25px}\n"] }]
    }], function () { return [{ type: i1.MatDialogRef }]; }, null); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVsZXRlLW9yLWNhbmNlbC1kaWFsb2cuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvY2NkLWNhc2UtdWktdG9vbGtpdC9zcmMvbGliL3NoYXJlZC9jb21wb25lbnRzL2RpYWxvZ3MvZGVsZXRlLW9yLWNhbmNlbC1kaWFsb2cvZGVsZXRlLW9yLWNhbmNlbC1kaWFsb2cuY29tcG9uZW50LnRzIiwiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvY2NkLWNhc2UtdWktdG9vbGtpdC9zcmMvbGliL3NoYXJlZC9jb21wb25lbnRzL2RpYWxvZ3MvZGVsZXRlLW9yLWNhbmNlbC1kaWFsb2cvZGVsZXRlLW9yLWNhbmNlbC1kaWFsb2cuY29tcG9uZW50Lmh0bWwiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMxQyxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sMEJBQTBCLENBQUM7Ozs7QUFPeEQsTUFBTSxPQUFPLDZCQUE2QjtJQUl4QyxZQUE2QixZQUF5RDtRQUF6RCxpQkFBWSxHQUFaLFlBQVksQ0FBNkM7SUFBRyxDQUFDO0lBRW5GLE1BQU07UUFDWCxJQUFJLENBQUMsTUFBTSxHQUFHLFFBQVEsQ0FBQztRQUN2QixJQUFJLENBQUMsWUFBWSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDdkMsQ0FBQztJQUNNLE1BQU07UUFDWCxJQUFJLENBQUMsTUFBTSxHQUFHLFFBQVEsQ0FBQztRQUN2QixJQUFJLENBQUMsWUFBWSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDdkMsQ0FBQzs7MEdBYlUsNkJBQTZCO2dGQUE3Qiw2QkFBNkI7UUNSMUMsMkJBQUssYUFBQSxZQUFBO1FBRUssc0dBQVMsWUFBUSxJQUFDO1FBQXNCLGlCQUFDO1FBQUEsaUJBQUssRUFBQTtRQUVwRCwyQkFBSyxZQUFBO1FBQ2lDLFlBQWdFOztRQUFBLGlCQUFLLEVBQUE7UUFFM0csOEJBQXlCLGNBQUE7UUFDQyxhQUEwRjs7UUFBQSxpQkFBTyxFQUFBO1FBRTNILDRCQUFLLGlCQUFBO1FBQytELDJHQUFTLFlBQVEsSUFBQztRQUFDLGFBQWlDOztRQUFBLGlCQUFTO1FBQy9ILGtDQUF3RjtRQUFuQiwyR0FBUyxZQUFRLElBQUM7UUFBQyxhQUEyQjs7UUFBQSxpQkFBUyxFQUFBLEVBQUE7O1FBUHhGLGVBQWdFO1FBQWhFLHlGQUFnRTtRQUc1RSxlQUEwRjtRQUExRixvSEFBMEY7UUFHN0IsZUFBaUM7UUFBakMsMkRBQWlDO1FBQzlCLGVBQTJCO1FBQTNCLHNEQUEyQjs7dUZESjVHLDZCQUE2QjtjQUx6QyxTQUFTOzJCQUNFLDZCQUE2QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgTWF0RGlhbG9nUmVmIH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvZGlhbG9nJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnY2NkLWRlbGV0ZS1vci1jYW5jZWwtZGlhbG9nJyxcbiAgdGVtcGxhdGVVcmw6ICcuL2RlbGV0ZS1vci1jYW5jZWwtZGlhbG9nLmNvbXBvbmVudC5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJy4uL2FjdGlvbi1kaWFsb2cuY29tcG9uZW50LnNjc3MnXVxufSlcbmV4cG9ydCBjbGFzcyBEZWxldGVPckNhbmNlbERpYWxvZ0NvbXBvbmVudCB7XG5cbiAgcHVibGljIHJlc3VsdDogc3RyaW5nO1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgcmVhZG9ubHkgbWF0RGlhbG9nUmVmOiBNYXREaWFsb2dSZWY8RGVsZXRlT3JDYW5jZWxEaWFsb2dDb21wb25lbnQ+KSB7fVxuXG4gIHB1YmxpYyBkZWxldGUoKSB7XG4gICAgdGhpcy5yZXN1bHQgPSAnRGVsZXRlJztcbiAgICB0aGlzLm1hdERpYWxvZ1JlZi5jbG9zZSh0aGlzLnJlc3VsdCk7XG4gIH1cbiAgcHVibGljIGNhbmNlbCgpIHtcbiAgICB0aGlzLnJlc3VsdCA9ICdDYW5jZWwnO1xuICAgIHRoaXMubWF0RGlhbG9nUmVmLmNsb3NlKHRoaXMucmVzdWx0KTtcbiAgfVxufVxuIiwiPGRpdj5cbiAgICA8ZGl2IGNsYXNzPVwiZGlhbG9nLWhlYWRlclwiPlxuICAgICAgPGgyIChjbGljayk9XCJjYW5jZWwoKVwiIGNsYXNzPVwiaGVhZGluZy1oMiB4XCI+WDwvaDI+XG4gICAgPC9kaXY+XG4gICAgPGRpdj5cbiAgICAgIDxoMiBjbGFzcz1cImhlYWRpbmctaDIgZGlhbG9nLXRpdGxlXCI+e3snQXJlIHlvdSBzdXJlIHlvdSB3YW50IHRvIGRlbGV0ZSB0aGlzIGRyYWZ0PycgfCBycHhUcmFuc2xhdGV9fTwvaDI+XG4gICAgPC9kaXY+XG4gICAgPGRpdiBjbGFzcz1cImRpYWxvZy1pbmZvXCI+XG4gICAgICA8c3BhbiBjbGFzcz1cInRleHQtaW5mb1wiPnt7J1lvdSBhcmUgYWJvdXQgdG8gZGVsZXRlIHRoaXMgZHJhZnQuIEFyZSB5b3Ugc3VyZSB5b3Ugd2FudCB0byBwcm9jZWVkPycgfCBycHhUcmFuc2xhdGV9fTwvc3Bhbj5cbiAgICA8L2Rpdj5cbiAgICA8ZGl2PlxuICAgICAgPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgdGl0bGU9XCJEZWxldGVcIiBjbGFzcz1cImJ1dHRvbiBhY3Rpb24tYnV0dG9uXCIgKGNsaWNrKT1cImRlbGV0ZSgpXCI+e3snRGVsZXRlIGRyYWZ0JyB8IHJweFRyYW5zbGF0ZX19PC9idXR0b24+XG4gICAgICA8YnV0dG9uIHR5cGU9XCJidXR0b25cIiB0aXRsZT1cIkNhbmNlbFwiIGNsYXNzPVwiYnV0dG9uIGJ1dHRvbi1zZWNvbmRhcnlcIiAoY2xpY2spPVwiY2FuY2VsKClcIj57eydDYW5jZWwnIHwgcnB4VHJhbnNsYXRlfX08L2J1dHRvbj5cbiAgICA8L2Rpdj5cbjwvZGl2PlxuIl19