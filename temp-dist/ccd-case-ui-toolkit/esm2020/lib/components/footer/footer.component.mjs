import { Component, Input } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
import * as i2 from "rpx-xui-translation";
function FooterComponent_div_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 3)(1, "div", 4);
    i0.ɵɵprojection(2);
    i0.ɵɵelementStart(3, "div", 5)(4, "p", 6)(5, "a", 7);
    i0.ɵɵtext(6);
    i0.ɵɵpipe(7, "rpxTranslate");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(8, "p");
    i0.ɵɵtext(9);
    i0.ɵɵpipe(10, "rpxTranslate");
    i0.ɵɵelementStart(11, "a", 7);
    i0.ɵɵtext(12);
    i0.ɵɵpipe(13, "rpxTranslate");
    i0.ɵɵelementEnd();
    i0.ɵɵtext(14);
    i0.ɵɵpipe(15, "rpxTranslate");
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(16, "div", 8)(17, "a", 9);
    i0.ɵɵtext(18);
    i0.ɵɵpipe(19, "rpxTranslate");
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    i0.ɵɵadvance(6);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(7, 5, "Open Government Licence"));
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate1("", i0.ɵɵpipeBind1(10, 7, "All content is available under the"), " ");
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(13, 9, "Open Government Licence v3.0"));
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1(", ", i0.ɵɵpipeBind1(15, 11, "except where otherwise stated"), "");
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate1(" \u00A9 ", i0.ɵɵpipeBind1(19, 13, "Crown copyright"), " ");
} }
function FooterComponent_div_3_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 3)(1, "div", 10)(2, "span", 11);
    i0.ɵɵtext(3);
    i0.ɵɵpipe(4, "rpxTranslate");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(5, "div", 12)(6, "span", 11);
    i0.ɵɵtext(7);
    i0.ɵɵpipe(8, "rpxTranslate");
    i0.ɵɵelementStart(9, "a", 13);
    i0.ɵɵtext(10);
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(11, "div", 14)(12, "span", 11);
    i0.ɵɵtext(13);
    i0.ɵɵpipe(14, "rpxTranslate");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(15, "div", 15)(16, "span", 11);
    i0.ɵɵtext(17);
    i0.ɵɵpipe(18, "rpxTranslate");
    i0.ɵɵelementEnd()();
    i0.ɵɵprojection(19, 1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(4, 7, "Help"));
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate1("", i0.ɵɵpipeBind1(8, 9, "Email"), ": ");
    i0.ɵɵadvance(2);
    i0.ɵɵpropertyInterpolate1("href", "mailto:", ctx_r1.email, "", i0.ɵɵsanitizeUrl);
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate(ctx_r1.email);
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate2("", i0.ɵɵpipeBind1(14, 11, "Phone"), ": ", ctx_r1.phone, "");
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(18, 13, ctx_r1.workhours));
} }
const _c0 = [[["", "footerSolsNavLinks", ""]], [["", "footerCaseWorkerNavLinks", ""]]];
const _c1 = ["[footerSolsNavLinks]", "[footerCaseWorkerNavLinks]"];
export class FooterComponent {
}
FooterComponent.ɵfac = function FooterComponent_Factory(t) { return new (t || FooterComponent)(); };
FooterComponent.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: FooterComponent, selectors: [["cut-footer-bar"]], inputs: { email: "email", isSolicitor: "isSolicitor", phone: "phone", workhours: "workhours" }, ngContentSelectors: _c1, decls: 4, vars: 4, consts: [["id", "footer", "role", "footer", 1, "group", "js-footer"], [1, "footer-wrapper"], ["class", "footer-meta", 4, "ngIf"], [1, "footer-meta"], [1, "footer-meta-inner"], [1, "open-government-licence"], [1, "logo"], ["href", "https://www.nationalarchives.gov.uk/doc/open-government-licence/version/3/", "rel", "license"], [1, "copyright"], ["href", "https://www.nationalarchives.gov.uk/information-management/re-using-public-sector-information/copyright-and-re-use/crown-copyright/"], [1, "title"], [1, "footer-text"], [1, "email"], [3, "href"], [1, "phone"], [1, "work-hours"]], template: function FooterComponent_Template(rf, ctx) { if (rf & 1) {
        i0.ɵɵprojectionDef(_c0);
        i0.ɵɵelementStart(0, "footer", 0)(1, "div", 1);
        i0.ɵɵtemplate(2, FooterComponent_div_2_Template, 20, 15, "div", 2);
        i0.ɵɵtemplate(3, FooterComponent_div_3_Template, 20, 15, "div", 2);
        i0.ɵɵelementEnd()();
    } if (rf & 2) {
        i0.ɵɵadvance(1);
        i0.ɵɵclassProp("full-screen", !ctx.isSolicitor);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngIf", ctx.isSolicitor);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngIf", !ctx.isSolicitor);
    } }, dependencies: [i1.NgIf, i2.RpxTranslatePipe], styles: [".footer-text[_ngcontent-%COMP%]{color:#231f20;margin-top:5px;font-size:16px;font-weight:400;font-style:normal;font-stretch:normal;letter-spacing:normal}#footer[_ngcontent-%COMP%]   .full-screen[_ngcontent-%COMP%]{max-width:100%;padding-left:20px}"] });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(FooterComponent, [{
        type: Component,
        args: [{ selector: 'cut-footer-bar', template: "<footer class=\"group js-footer\" id=\"footer\" role=\"footer\">\n  <div [class.full-screen]=\"!isSolicitor\" class=\"footer-wrapper\">\n\n    <!-- Condition: Solicitor -->\n    <div *ngIf=\"isSolicitor\" class=\"footer-meta\">\n      <div class=\"footer-meta-inner\">\n        <ng-content select=\"[footerSolsNavLinks]\"></ng-content>\n        <div class=\"open-government-licence\">\n          <p class=\"logo\"><a href=\"https://www.nationalarchives.gov.uk/doc/open-government-licence/version/3/\" rel=\"license\">{{'Open Government Licence' | rpxTranslate}}</a></p>\n          <p>{{'All content is available under the' | rpxTranslate}} <a href=\"https://www.nationalarchives.gov.uk/doc/open-government-licence/version/3/\" rel=\"license\">{{'Open Government Licence v3.0' | rpxTranslate}}</a>, {{'except where otherwise stated' | rpxTranslate}}</p>\n        </div>\n      </div>\n\n      <div class=\"copyright\">\n        <a href=\"https://www.nationalarchives.gov.uk/information-management/re-using-public-sector-information/copyright-and-re-use/crown-copyright/\">\n          \u00A9 {{'Crown copyright' | rpxTranslate}}\n        </a>\n      </div>\n    </div>\n\n    <!-- Condition: Case Worker -->\n    <div *ngIf=\"!isSolicitor\" class=\"footer-meta\">\n      <div class=\"title\">\n        <span class=\"footer-text\">{{'Help' | rpxTranslate}}</span>\n      </div>\n      <div class=\"email\">\n        <span class=\"footer-text\">{{'Email' | rpxTranslate}}: <a href=\"mailto:{{email}}\">{{email}}</a></span>\n      </div>\n      <div class=\"phone\">\n        <span class=\"footer-text\">{{'Phone' | rpxTranslate}}: {{phone}}</span>\n      </div>\n      <div class=\"work-hours\">\n        <span class=\"footer-text\">{{workhours | rpxTranslate}}</span>\n      </div>\n      <ng-content select=\"[footerCaseWorkerNavLinks]\"></ng-content>\n    </div>\n\n  </div>\n</footer>\n", styles: [".footer-text{color:#231f20;margin-top:5px;font-size:16px;font-weight:400;font-style:normal;font-stretch:normal;letter-spacing:normal}#footer .full-screen{max-width:100%;padding-left:20px}\n"] }]
    }], null, { email: [{
            type: Input
        }], isSolicitor: [{
            type: Input
        }], phone: [{
            type: Input
        }], workhours: [{
            type: Input
        }] }); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9vdGVyLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2NjZC1jYXNlLXVpLXRvb2xraXQvc3JjL2xpYi9jb21wb25lbnRzL2Zvb3Rlci9mb290ZXIuY29tcG9uZW50LnRzIiwiLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvY2NkLWNhc2UtdWktdG9vbGtpdC9zcmMvbGliL2NvbXBvbmVudHMvZm9vdGVyL2Zvb3Rlci5odG1sIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFFLE1BQU0sZUFBZSxDQUFDOzs7OztJQ0k3Qyw4QkFBNkMsYUFBQTtJQUV6QyxrQkFBdUQ7SUFDdkQsOEJBQXFDLFdBQUEsV0FBQTtJQUNnRixZQUE0Qzs7SUFBQSxpQkFBSSxFQUFBO0lBQ25LLHlCQUFHO0lBQUEsWUFBd0Q7O0lBQUEsNkJBQW1HO0lBQUEsYUFBaUQ7O0lBQUEsaUJBQUk7SUFBQSxhQUFvRDs7SUFBQSxpQkFBSSxFQUFBLEVBQUE7SUFJL1EsK0JBQXVCLFlBQUE7SUFFbkIsYUFDRjs7SUFBQSxpQkFBSSxFQUFBLEVBQUE7O0lBUmlILGVBQTRDO0lBQTVDLHFFQUE0QztJQUM1SixlQUF3RDtJQUF4RCwyRkFBd0Q7SUFBbUcsZUFBaUQ7SUFBakQsMkVBQWlEO0lBQUksZUFBb0Q7SUFBcEQsd0ZBQW9EO0lBTXZRLGVBQ0Y7SUFERSxpRkFDRjs7O0lBS0osOEJBQThDLGNBQUEsZUFBQTtJQUVoQixZQUF5Qjs7SUFBQSxpQkFBTyxFQUFBO0lBRTVELCtCQUFtQixlQUFBO0lBQ1MsWUFBNEI7O0lBQUEsNkJBQTJCO0lBQUEsYUFBUztJQUFBLGlCQUFJLEVBQUEsRUFBQTtJQUVoRyxnQ0FBbUIsZ0JBQUE7SUFDUyxhQUFxQzs7SUFBQSxpQkFBTyxFQUFBO0lBRXhFLGdDQUF3QixnQkFBQTtJQUNJLGFBQTRCOztJQUFBLGlCQUFPLEVBQUE7SUFFL0Qsc0JBQTZEO0lBQy9ELGlCQUFNOzs7SUFad0IsZUFBeUI7SUFBekIsa0RBQXlCO0lBR3pCLGVBQTRCO0lBQTVCLDhEQUE0QjtJQUFHLGVBQXVCO0lBQXZCLGdGQUF1QjtJQUFDLGVBQVM7SUFBVCxrQ0FBUztJQUdoRSxlQUFxQztJQUFyQyxrRkFBcUM7SUFHckMsZUFBNEI7SUFBNUIsOERBQTRCOzs7O0FEekI5RCxNQUFNLE9BQU8sZUFBZTs7OEVBQWYsZUFBZTtrRUFBZixlQUFlOztRQ1A1QixpQ0FBMEQsYUFBQTtRQUl0RCxrRUFjTTtRQUdOLGtFQWNNO1FBRVIsaUJBQU0sRUFBQTs7UUFwQ0QsZUFBa0M7UUFBbEMsK0NBQWtDO1FBRy9CLGVBQWlCO1FBQWpCLHNDQUFpQjtRQWlCakIsZUFBa0I7UUFBbEIsdUNBQWtCOzt1RkRkZixlQUFlO2NBTDNCLFNBQVM7MkJBQ0ksZ0JBQWdCO2dCQU9yQixLQUFLO2tCQURYLEtBQUs7WUFJQyxXQUFXO2tCQURqQixLQUFLO1lBSUMsS0FBSztrQkFEWCxLQUFLO1lBSUMsU0FBUztrQkFEZixLQUFLIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBJbnB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ2N1dC1mb290ZXItYmFyJyxcbiAgICB0ZW1wbGF0ZVVybDogJy4vZm9vdGVyLmh0bWwnLFxuICAgIHN0eWxlVXJsczogWycuL2Zvb3Rlci5zY3NzJ11cbn0pXG5leHBvcnQgY2xhc3MgRm9vdGVyQ29tcG9uZW50IHtcblxuICBASW5wdXQoKVxuICBwdWJsaWMgZW1haWw6IHN0cmluZztcblxuICBASW5wdXQoKVxuICBwdWJsaWMgaXNTb2xpY2l0b3I6IGJvb2xlYW47XG5cbiAgQElucHV0KClcbiAgcHVibGljIHBob25lOiBzdHJpbmc7XG5cbiAgQElucHV0KClcbiAgcHVibGljIHdvcmtob3Vyczogc3RyaW5nO1xuXG59XG4iLCI8Zm9vdGVyIGNsYXNzPVwiZ3JvdXAganMtZm9vdGVyXCIgaWQ9XCJmb290ZXJcIiByb2xlPVwiZm9vdGVyXCI+XG4gIDxkaXYgW2NsYXNzLmZ1bGwtc2NyZWVuXT1cIiFpc1NvbGljaXRvclwiIGNsYXNzPVwiZm9vdGVyLXdyYXBwZXJcIj5cblxuICAgIDwhLS0gQ29uZGl0aW9uOiBTb2xpY2l0b3IgLS0+XG4gICAgPGRpdiAqbmdJZj1cImlzU29saWNpdG9yXCIgY2xhc3M9XCJmb290ZXItbWV0YVwiPlxuICAgICAgPGRpdiBjbGFzcz1cImZvb3Rlci1tZXRhLWlubmVyXCI+XG4gICAgICAgIDxuZy1jb250ZW50IHNlbGVjdD1cIltmb290ZXJTb2xzTmF2TGlua3NdXCI+PC9uZy1jb250ZW50PlxuICAgICAgICA8ZGl2IGNsYXNzPVwib3Blbi1nb3Zlcm5tZW50LWxpY2VuY2VcIj5cbiAgICAgICAgICA8cCBjbGFzcz1cImxvZ29cIj48YSBocmVmPVwiaHR0cHM6Ly93d3cubmF0aW9uYWxhcmNoaXZlcy5nb3YudWsvZG9jL29wZW4tZ292ZXJubWVudC1saWNlbmNlL3ZlcnNpb24vMy9cIiByZWw9XCJsaWNlbnNlXCI+e3snT3BlbiBHb3Zlcm5tZW50IExpY2VuY2UnIHwgcnB4VHJhbnNsYXRlfX08L2E+PC9wPlxuICAgICAgICAgIDxwPnt7J0FsbCBjb250ZW50IGlzIGF2YWlsYWJsZSB1bmRlciB0aGUnIHwgcnB4VHJhbnNsYXRlfX0gPGEgaHJlZj1cImh0dHBzOi8vd3d3Lm5hdGlvbmFsYXJjaGl2ZXMuZ292LnVrL2RvYy9vcGVuLWdvdmVybm1lbnQtbGljZW5jZS92ZXJzaW9uLzMvXCIgcmVsPVwibGljZW5zZVwiPnt7J09wZW4gR292ZXJubWVudCBMaWNlbmNlIHYzLjAnIHwgcnB4VHJhbnNsYXRlfX08L2E+LCB7eydleGNlcHQgd2hlcmUgb3RoZXJ3aXNlIHN0YXRlZCcgfCBycHhUcmFuc2xhdGV9fTwvcD5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cblxuICAgICAgPGRpdiBjbGFzcz1cImNvcHlyaWdodFwiPlxuICAgICAgICA8YSBocmVmPVwiaHR0cHM6Ly93d3cubmF0aW9uYWxhcmNoaXZlcy5nb3YudWsvaW5mb3JtYXRpb24tbWFuYWdlbWVudC9yZS11c2luZy1wdWJsaWMtc2VjdG9yLWluZm9ybWF0aW9uL2NvcHlyaWdodC1hbmQtcmUtdXNlL2Nyb3duLWNvcHlyaWdodC9cIj5cbiAgICAgICAgICDCqSB7eydDcm93biBjb3B5cmlnaHQnIHwgcnB4VHJhbnNsYXRlfX1cbiAgICAgICAgPC9hPlxuICAgICAgPC9kaXY+XG4gICAgPC9kaXY+XG5cbiAgICA8IS0tIENvbmRpdGlvbjogQ2FzZSBXb3JrZXIgLS0+XG4gICAgPGRpdiAqbmdJZj1cIiFpc1NvbGljaXRvclwiIGNsYXNzPVwiZm9vdGVyLW1ldGFcIj5cbiAgICAgIDxkaXYgY2xhc3M9XCJ0aXRsZVwiPlxuICAgICAgICA8c3BhbiBjbGFzcz1cImZvb3Rlci10ZXh0XCI+e3snSGVscCcgfCBycHhUcmFuc2xhdGV9fTwvc3Bhbj5cbiAgICAgIDwvZGl2PlxuICAgICAgPGRpdiBjbGFzcz1cImVtYWlsXCI+XG4gICAgICAgIDxzcGFuIGNsYXNzPVwiZm9vdGVyLXRleHRcIj57eydFbWFpbCcgfCBycHhUcmFuc2xhdGV9fTogPGEgaHJlZj1cIm1haWx0bzp7e2VtYWlsfX1cIj57e2VtYWlsfX08L2E+PC9zcGFuPlxuICAgICAgPC9kaXY+XG4gICAgICA8ZGl2IGNsYXNzPVwicGhvbmVcIj5cbiAgICAgICAgPHNwYW4gY2xhc3M9XCJmb290ZXItdGV4dFwiPnt7J1Bob25lJyB8IHJweFRyYW5zbGF0ZX19OiB7e3Bob25lfX08L3NwYW4+XG4gICAgICA8L2Rpdj5cbiAgICAgIDxkaXYgY2xhc3M9XCJ3b3JrLWhvdXJzXCI+XG4gICAgICAgIDxzcGFuIGNsYXNzPVwiZm9vdGVyLXRleHRcIj57e3dvcmtob3VycyB8IHJweFRyYW5zbGF0ZX19PC9zcGFuPlxuICAgICAgPC9kaXY+XG4gICAgICA8bmctY29udGVudCBzZWxlY3Q9XCJbZm9vdGVyQ2FzZVdvcmtlck5hdkxpbmtzXVwiPjwvbmctY29udGVudD5cbiAgICA8L2Rpdj5cblxuICA8L2Rpdj5cbjwvZm9vdGVyPlxuIl19