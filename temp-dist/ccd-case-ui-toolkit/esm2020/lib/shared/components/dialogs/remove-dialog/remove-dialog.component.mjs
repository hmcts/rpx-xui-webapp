import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import * as i0 from "@angular/core";
import * as i1 from "@angular/material/dialog";
import * as i2 from "rpx-xui-translation";
export class RemoveDialogComponent {
    constructor(matDialogRef) {
        this.matDialogRef = matDialogRef;
    }
    remove() {
        this.result = 'Remove';
        this.matDialogRef.close(this.result);
    }
    cancel() {
        this.result = 'Cancel';
        this.matDialogRef.close(this.result);
    }
}
RemoveDialogComponent.ɵfac = function RemoveDialogComponent_Factory(t) { return new (t || RemoveDialogComponent)(i0.ɵɵdirectiveInject(i1.MatDialogRef)); };
RemoveDialogComponent.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: RemoveDialogComponent, selectors: [["ccd-remove-dialog"]], decls: 19, vars: 12, consts: [[1, "dialog-header"], [1, "heading-h2", "x", 3, "click"], [1, "heading-h2", "dialog-title"], [1, "dialog-info"], [1, "text-info"], ["type", "button", "title", "Remove", 1, "button", "action-button", 3, "click"], ["type", "button", "title", "Cancel", 1, "button", "button-secondary", 3, "click"]], template: function RemoveDialogComponent_Template(rf, ctx) { if (rf & 1) {
        i0.ɵɵelementStart(0, "div")(1, "div", 0)(2, "h2", 1);
        i0.ɵɵlistener("click", function RemoveDialogComponent_Template_h2_click_2_listener() { return ctx.cancel(); });
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
        i0.ɵɵlistener("click", function RemoveDialogComponent_Template_button_click_13_listener() { return ctx.remove(); });
        i0.ɵɵtext(14);
        i0.ɵɵpipe(15, "rpxTranslate");
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(16, "button", 6);
        i0.ɵɵlistener("click", function RemoveDialogComponent_Template_button_click_16_listener() { return ctx.cancel(); });
        i0.ɵɵtext(17);
        i0.ɵɵpipe(18, "rpxTranslate");
        i0.ɵɵelementEnd()()();
    } if (rf & 2) {
        i0.ɵɵadvance(6);
        i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(7, 4, "Are you sure you want to remove the item?"));
        i0.ɵɵadvance(4);
        i0.ɵɵtextInterpolate1(" ", i0.ɵɵpipeBind1(11, 6, "You are about to permanently remove an item, are you sure you want to remove this item?"), " ");
        i0.ɵɵadvance(4);
        i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(15, 8, "Remove"));
        i0.ɵɵadvance(3);
        i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(18, 10, "Cancel"));
    } }, dependencies: [i2.RpxTranslatePipe], styles: [".x[_ngcontent-%COMP%]{margin:0;padding:9px 9px 0 0;font-size:24px;font-weight:700;font-style:normal;font-stretch:normal;cursor:pointer;color:#6e7071}.dialog-header[_ngcontent-%COMP%]{text-align:right}.dialog-title[_ngcontent-%COMP%], .dialog-info[_ngcontent-%COMP%]{margin:0 0 21px 25px}.action-button[_ngcontent-%COMP%]{margin:0 15px 0 25px}"] });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(RemoveDialogComponent, [{
        type: Component,
        args: [{ selector: 'ccd-remove-dialog', template: "<div>\n  <div class=\"dialog-header\">\n    <h2 (click)=\"cancel()\" class=\"heading-h2 x\">X</h2>\n  </div>\n  <div>\n    <h2 class=\"heading-h2 dialog-title\">{{'Are you sure you want to remove the item?' | rpxTranslate}}</h2>\n  </div>\n  <div class=\"dialog-info\">\n    <span class=\"text-info\">\n      {{'You are about to permanently remove an item, are you sure you want to remove this item?' | rpxTranslate}}\n    </span>\n  </div>\n  <div>\n    <button type=\"button\" title=\"Remove\" class=\"button action-button\" (click)=\"remove()\">{{'Remove' | rpxTranslate}}</button>\n    <button type=\"button\" title=\"Cancel\" class=\"button button-secondary\" (click)=\"cancel()\">{{'Cancel' | rpxTranslate}}</button>\n  </div>\n</div>\n", styles: [".x{margin:0;padding:9px 9px 0 0;font-size:24px;font-weight:700;font-style:normal;font-stretch:normal;cursor:pointer;color:#6e7071}.dialog-header{text-align:right}.dialog-title,.dialog-info{margin:0 0 21px 25px}.action-button{margin:0 15px 0 25px}\n"] }]
    }], function () { return [{ type: i1.MatDialogRef }]; }, null); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVtb3ZlLWRpYWxvZy5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9jY2QtY2FzZS11aS10b29sa2l0L3NyYy9saWIvc2hhcmVkL2NvbXBvbmVudHMvZGlhbG9ncy9yZW1vdmUtZGlhbG9nL3JlbW92ZS1kaWFsb2cuY29tcG9uZW50LnRzIiwiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvY2NkLWNhc2UtdWktdG9vbGtpdC9zcmMvbGliL3NoYXJlZC9jb21wb25lbnRzL2RpYWxvZ3MvcmVtb3ZlLWRpYWxvZy9yZW1vdmUtZGlhbG9nLmNvbXBvbmVudC5odG1sIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDMUMsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLDBCQUEwQixDQUFDOzs7O0FBT3hELE1BQU0sT0FBTyxxQkFBcUI7SUFJaEMsWUFBNkIsWUFBaUQ7UUFBakQsaUJBQVksR0FBWixZQUFZLENBQXFDO0lBQUcsQ0FBQztJQUUzRSxNQUFNO1FBQ1gsSUFBSSxDQUFDLE1BQU0sR0FBRyxRQUFRLENBQUM7UUFDdkIsSUFBSSxDQUFDLFlBQVksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQ3ZDLENBQUM7SUFDTSxNQUFNO1FBQ1gsSUFBSSxDQUFDLE1BQU0sR0FBRyxRQUFRLENBQUM7UUFDdkIsSUFBSSxDQUFDLFlBQVksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQ3ZDLENBQUM7OzBGQWJVLHFCQUFxQjt3RUFBckIscUJBQXFCO1FDUmxDLDJCQUFLLGFBQUEsWUFBQTtRQUVHLDhGQUFTLFlBQVEsSUFBQztRQUFzQixpQkFBQztRQUFBLGlCQUFLLEVBQUE7UUFFcEQsMkJBQUssWUFBQTtRQUNpQyxZQUE4RDs7UUFBQSxpQkFBSyxFQUFBO1FBRXpHLDhCQUF5QixjQUFBO1FBRXJCLGFBQ0Y7O1FBQUEsaUJBQU8sRUFBQTtRQUVULDRCQUFLLGlCQUFBO1FBQytELG1HQUFTLFlBQVEsSUFBQztRQUFDLGFBQTJCOztRQUFBLGlCQUFTO1FBQ3pILGtDQUF3RjtRQUFuQixtR0FBUyxZQUFRLElBQUM7UUFBQyxhQUEyQjs7UUFBQSxpQkFBUyxFQUFBLEVBQUE7O1FBVHhGLGVBQThEO1FBQTlELHVGQUE4RDtRQUloRyxlQUNGO1FBREUsaUpBQ0Y7UUFHcUYsZUFBMkI7UUFBM0IscURBQTJCO1FBQ3hCLGVBQTJCO1FBQTNCLHNEQUEyQjs7dUZETjFHLHFCQUFxQjtjQUxqQyxTQUFTOzJCQUNFLG1CQUFtQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgTWF0RGlhbG9nUmVmIH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvZGlhbG9nJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnY2NkLXJlbW92ZS1kaWFsb2cnLFxuICB0ZW1wbGF0ZVVybDogJy4vcmVtb3ZlLWRpYWxvZy5jb21wb25lbnQuaHRtbCcsXG4gIHN0eWxlVXJsczogWycuLi9hY3Rpb24tZGlhbG9nLmNvbXBvbmVudC5zY3NzJ11cbn0pXG5leHBvcnQgY2xhc3MgUmVtb3ZlRGlhbG9nQ29tcG9uZW50IHtcblxuICBwdWJsaWMgcmVzdWx0OiBzdHJpbmc7XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSByZWFkb25seSBtYXREaWFsb2dSZWY6IE1hdERpYWxvZ1JlZjxSZW1vdmVEaWFsb2dDb21wb25lbnQ+KSB7fVxuXG4gIHB1YmxpYyByZW1vdmUoKSB7XG4gICAgdGhpcy5yZXN1bHQgPSAnUmVtb3ZlJztcbiAgICB0aGlzLm1hdERpYWxvZ1JlZi5jbG9zZSh0aGlzLnJlc3VsdCk7XG4gIH1cbiAgcHVibGljIGNhbmNlbCgpIHtcbiAgICB0aGlzLnJlc3VsdCA9ICdDYW5jZWwnO1xuICAgIHRoaXMubWF0RGlhbG9nUmVmLmNsb3NlKHRoaXMucmVzdWx0KTtcbiAgfVxufVxuIiwiPGRpdj5cbiAgPGRpdiBjbGFzcz1cImRpYWxvZy1oZWFkZXJcIj5cbiAgICA8aDIgKGNsaWNrKT1cImNhbmNlbCgpXCIgY2xhc3M9XCJoZWFkaW5nLWgyIHhcIj5YPC9oMj5cbiAgPC9kaXY+XG4gIDxkaXY+XG4gICAgPGgyIGNsYXNzPVwiaGVhZGluZy1oMiBkaWFsb2ctdGl0bGVcIj57eydBcmUgeW91IHN1cmUgeW91IHdhbnQgdG8gcmVtb3ZlIHRoZSBpdGVtPycgfCBycHhUcmFuc2xhdGV9fTwvaDI+XG4gIDwvZGl2PlxuICA8ZGl2IGNsYXNzPVwiZGlhbG9nLWluZm9cIj5cbiAgICA8c3BhbiBjbGFzcz1cInRleHQtaW5mb1wiPlxuICAgICAge3snWW91IGFyZSBhYm91dCB0byBwZXJtYW5lbnRseSByZW1vdmUgYW4gaXRlbSwgYXJlIHlvdSBzdXJlIHlvdSB3YW50IHRvIHJlbW92ZSB0aGlzIGl0ZW0/JyB8IHJweFRyYW5zbGF0ZX19XG4gICAgPC9zcGFuPlxuICA8L2Rpdj5cbiAgPGRpdj5cbiAgICA8YnV0dG9uIHR5cGU9XCJidXR0b25cIiB0aXRsZT1cIlJlbW92ZVwiIGNsYXNzPVwiYnV0dG9uIGFjdGlvbi1idXR0b25cIiAoY2xpY2spPVwicmVtb3ZlKClcIj57eydSZW1vdmUnIHwgcnB4VHJhbnNsYXRlfX08L2J1dHRvbj5cbiAgICA8YnV0dG9uIHR5cGU9XCJidXR0b25cIiB0aXRsZT1cIkNhbmNlbFwiIGNsYXNzPVwiYnV0dG9uIGJ1dHRvbi1zZWNvbmRhcnlcIiAoY2xpY2spPVwiY2FuY2VsKClcIj57eydDYW5jZWwnIHwgcnB4VHJhbnNsYXRlfX08L2J1dHRvbj5cbiAgPC9kaXY+XG48L2Rpdj5cbiJdfQ==