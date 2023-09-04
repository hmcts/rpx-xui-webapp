import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import * as i0 from "@angular/core";
import * as i1 from "@angular/material/dialog";
import * as i2 from "rpx-xui-translation";
export class DocumentDialogComponent {
    constructor(matDialogRef) {
        this.matDialogRef = matDialogRef;
    }
    ngOnInit() {
    }
    replace() {
        this.result = 'Replace';
        this.matDialogRef.close(this.result);
    }
    cancel() {
        this.result = 'Cancel';
        this.matDialogRef.close(this.result);
    }
}
DocumentDialogComponent.ɵfac = function DocumentDialogComponent_Factory(t) { return new (t || DocumentDialogComponent)(i0.ɵɵdirectiveInject(i1.MatDialogRef)); };
DocumentDialogComponent.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: DocumentDialogComponent, selectors: [["ccd-document-dialog"]], decls: 19, vars: 12, consts: [[1, "dialog-header"], [1, "heading-h2", "x", 3, "click"], [1, "heading-h2", "dialog-title"], [1, "dialog-info"], [1, "text-info"], ["type", "button", "title", "Replace", 1, "button", "action-button", 3, "click"], ["type", "button", "title", "Cancel", 1, "button", "button-secondary", 3, "click"]], template: function DocumentDialogComponent_Template(rf, ctx) { if (rf & 1) {
        i0.ɵɵelementStart(0, "div")(1, "div", 0)(2, "h2", 1);
        i0.ɵɵlistener("click", function DocumentDialogComponent_Template_h2_click_2_listener() { return ctx.cancel(); });
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
        i0.ɵɵlistener("click", function DocumentDialogComponent_Template_button_click_13_listener() { return ctx.replace(); });
        i0.ɵɵtext(14);
        i0.ɵɵpipe(15, "rpxTranslate");
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(16, "button", 6);
        i0.ɵɵlistener("click", function DocumentDialogComponent_Template_button_click_16_listener() { return ctx.cancel(); });
        i0.ɵɵtext(17);
        i0.ɵɵpipe(18, "rpxTranslate");
        i0.ɵɵelementEnd()()();
    } if (rf & 2) {
        i0.ɵɵadvance(6);
        i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(7, 4, "Are you sure you want to replace the existing file?"));
        i0.ɵɵadvance(4);
        i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(11, 6, "You are about to delete the original file uploaded. Are you sure you want to proceed?"));
        i0.ɵɵadvance(4);
        i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(15, 8, "Replace file"));
        i0.ɵɵadvance(3);
        i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(18, 10, "Cancel"));
    } }, dependencies: [i2.RpxTranslatePipe], styles: [".x[_ngcontent-%COMP%]{margin:0;padding:9px 9px 0 0;font-size:24px;font-weight:700;font-style:normal;font-stretch:normal;cursor:pointer;color:#6e7071}.dialog-header[_ngcontent-%COMP%]{text-align:right}.dialog-title[_ngcontent-%COMP%], .dialog-info[_ngcontent-%COMP%]{margin:0 0 21px 25px}.action-button[_ngcontent-%COMP%]{margin:0 15px 0 25px}"] });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(DocumentDialogComponent, [{
        type: Component,
        args: [{ selector: 'ccd-document-dialog', template: "<div>\n  <div class=\"dialog-header\">\n    <h2 (click)=\"cancel()\" class=\"heading-h2 x\">X</h2>\n  </div>\n  <div>\n    <h2 class=\"heading-h2 dialog-title\">{{'Are you sure you want to replace the existing file?' | rpxTranslate}}</h2>\n  </div>\n  <div class=\"dialog-info\">\n    <span class=\"text-info\">{{'You are about to delete the original file uploaded. Are you sure you want to proceed?' | rpxTranslate}}</span>\n  </div>\n  <div>\n    <button type=\"button\" title=\"Replace\" class=\"button action-button\" (click)=\"replace()\">{{'Replace file' | rpxTranslate}}</button>\n    <button type=\"button\" title=\"Cancel\" class=\"button button-secondary\" (click)=\"cancel()\">{{'Cancel' | rpxTranslate}}</button>\n  </div>\n</div>\n", styles: [".x{margin:0;padding:9px 9px 0 0;font-size:24px;font-weight:700;font-style:normal;font-stretch:normal;cursor:pointer;color:#6e7071}.dialog-header{text-align:right}.dialog-title,.dialog-info{margin:0 0 21px 25px}.action-button{margin:0 15px 0 25px}\n"] }]
    }], function () { return [{ type: i1.MatDialogRef }]; }, null); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZG9jdW1lbnQtZGlhbG9nLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2NjZC1jYXNlLXVpLXRvb2xraXQvc3JjL2xpYi9zaGFyZWQvY29tcG9uZW50cy9kaWFsb2dzL2RvY3VtZW50LWRpYWxvZy9kb2N1bWVudC1kaWFsb2cuY29tcG9uZW50LnRzIiwiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvY2NkLWNhc2UtdWktdG9vbGtpdC9zcmMvbGliL3NoYXJlZC9jb21wb25lbnRzL2RpYWxvZ3MvZG9jdW1lbnQtZGlhbG9nL2RvY3VtZW50LWRpYWxvZy5jb21wb25lbnQuaHRtbCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFVLE1BQU0sZUFBZSxDQUFDO0FBQ2xELE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQzs7OztBQU94RCxNQUFNLE9BQU8sdUJBQXVCO0lBSWxDLFlBQTZCLFlBQW1EO1FBQW5ELGlCQUFZLEdBQVosWUFBWSxDQUF1QztJQUFHLENBQUM7SUFFN0UsUUFBUTtJQUNmLENBQUM7SUFFTSxPQUFPO1FBQ1osSUFBSSxDQUFDLE1BQU0sR0FBRyxTQUFTLENBQUM7UUFDeEIsSUFBSSxDQUFDLFlBQVksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQ3ZDLENBQUM7SUFDTSxNQUFNO1FBQ1gsSUFBSSxDQUFDLE1BQU0sR0FBRyxRQUFRLENBQUM7UUFDdkIsSUFBSSxDQUFDLFlBQVksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQ3ZDLENBQUM7OzhGQWhCVSx1QkFBdUI7MEVBQXZCLHVCQUF1QjtRQ1JwQywyQkFBSyxhQUFBLFlBQUE7UUFFRyxnR0FBUyxZQUFRLElBQUM7UUFBc0IsaUJBQUM7UUFBQSxpQkFBSyxFQUFBO1FBRXBELDJCQUFLLFlBQUE7UUFDaUMsWUFBd0U7O1FBQUEsaUJBQUssRUFBQTtRQUVuSCw4QkFBeUIsY0FBQTtRQUNDLGFBQTBHOztRQUFBLGlCQUFPLEVBQUE7UUFFM0ksNEJBQUssaUJBQUE7UUFDZ0UscUdBQVMsYUFBUyxJQUFDO1FBQUMsYUFBaUM7O1FBQUEsaUJBQVM7UUFDakksa0NBQXdGO1FBQW5CLHFHQUFTLFlBQVEsSUFBQztRQUFDLGFBQTJCOztRQUFBLGlCQUFTLEVBQUEsRUFBQTs7UUFQeEYsZUFBd0U7UUFBeEUsaUdBQXdFO1FBR3BGLGVBQTBHO1FBQTFHLG9JQUEwRztRQUczQyxlQUFpQztRQUFqQywyREFBaUM7UUFDaEMsZUFBMkI7UUFBM0Isc0RBQTJCOzt1RkRKMUcsdUJBQXVCO2NBTG5DLFNBQVM7MkJBQ0UscUJBQXFCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE1hdERpYWxvZ1JlZiB9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL2RpYWxvZyc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2NjZC1kb2N1bWVudC1kaWFsb2cnLFxuICB0ZW1wbGF0ZVVybDogJy4vZG9jdW1lbnQtZGlhbG9nLmNvbXBvbmVudC5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJy4uL2FjdGlvbi1kaWFsb2cuY29tcG9uZW50LnNjc3MnXVxufSlcbmV4cG9ydCBjbGFzcyBEb2N1bWVudERpYWxvZ0NvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG5cbiAgcHVibGljIHJlc3VsdDogc3RyaW5nO1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgcmVhZG9ubHkgbWF0RGlhbG9nUmVmOiBNYXREaWFsb2dSZWY8RG9jdW1lbnREaWFsb2dDb21wb25lbnQ+KSB7fVxuXG4gIHB1YmxpYyBuZ09uSW5pdCgpIHtcbiAgfVxuXG4gIHB1YmxpYyByZXBsYWNlKCkge1xuICAgIHRoaXMucmVzdWx0ID0gJ1JlcGxhY2UnO1xuICAgIHRoaXMubWF0RGlhbG9nUmVmLmNsb3NlKHRoaXMucmVzdWx0KTtcbiAgfVxuICBwdWJsaWMgY2FuY2VsKCkge1xuICAgIHRoaXMucmVzdWx0ID0gJ0NhbmNlbCc7XG4gICAgdGhpcy5tYXREaWFsb2dSZWYuY2xvc2UodGhpcy5yZXN1bHQpO1xuICB9XG59XG4iLCI8ZGl2PlxuICA8ZGl2IGNsYXNzPVwiZGlhbG9nLWhlYWRlclwiPlxuICAgIDxoMiAoY2xpY2spPVwiY2FuY2VsKClcIiBjbGFzcz1cImhlYWRpbmctaDIgeFwiPlg8L2gyPlxuICA8L2Rpdj5cbiAgPGRpdj5cbiAgICA8aDIgY2xhc3M9XCJoZWFkaW5nLWgyIGRpYWxvZy10aXRsZVwiPnt7J0FyZSB5b3Ugc3VyZSB5b3Ugd2FudCB0byByZXBsYWNlIHRoZSBleGlzdGluZyBmaWxlPycgfCBycHhUcmFuc2xhdGV9fTwvaDI+XG4gIDwvZGl2PlxuICA8ZGl2IGNsYXNzPVwiZGlhbG9nLWluZm9cIj5cbiAgICA8c3BhbiBjbGFzcz1cInRleHQtaW5mb1wiPnt7J1lvdSBhcmUgYWJvdXQgdG8gZGVsZXRlIHRoZSBvcmlnaW5hbCBmaWxlIHVwbG9hZGVkLiBBcmUgeW91IHN1cmUgeW91IHdhbnQgdG8gcHJvY2VlZD8nIHwgcnB4VHJhbnNsYXRlfX08L3NwYW4+XG4gIDwvZGl2PlxuICA8ZGl2PlxuICAgIDxidXR0b24gdHlwZT1cImJ1dHRvblwiIHRpdGxlPVwiUmVwbGFjZVwiIGNsYXNzPVwiYnV0dG9uIGFjdGlvbi1idXR0b25cIiAoY2xpY2spPVwicmVwbGFjZSgpXCI+e3snUmVwbGFjZSBmaWxlJyB8IHJweFRyYW5zbGF0ZX19PC9idXR0b24+XG4gICAgPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgdGl0bGU9XCJDYW5jZWxcIiBjbGFzcz1cImJ1dHRvbiBidXR0b24tc2Vjb25kYXJ5XCIgKGNsaWNrKT1cImNhbmNlbCgpXCI+e3snQ2FuY2VsJyB8IHJweFRyYW5zbGF0ZX19PC9idXR0b24+XG4gIDwvZGl2PlxuPC9kaXY+XG4iXX0=