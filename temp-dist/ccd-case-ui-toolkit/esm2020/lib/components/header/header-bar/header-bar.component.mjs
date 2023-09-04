import { Component, EventEmitter, Input, Output } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
import * as i2 from "rpx-xui-translation";
function HeaderBarComponent_div_3_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div")(1, "a", 12);
    i0.ɵɵelement(2, "img", 13);
    i0.ɵɵtext(3);
    i0.ɵɵpipe(4, "rpxTranslate");
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate1(" ", i0.ɵɵpipeBind1(4, 1, "GOV.UK"), " ");
} }
function HeaderBarComponent_div_4_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 14)(1, "div", 15)(2, "span");
    i0.ɵɵtext(3);
    i0.ɵɵpipe(4, "rpxTranslate");
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(4, 1, ctx_r1.title));
} }
function HeaderBarComponent_div_10_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 16)(1, "div", 17)(2, "span", 18);
    i0.ɵɵtext(3);
    i0.ɵɵpipe(4, "rpxTranslate");
    i0.ɵɵelementEnd();
    i0.ɵɵprojection(5);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext();
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(4, 1, ctx_r2.title));
} }
const _c0 = [[["", "headerNavigation", ""]]];
const _c1 = ["[headerNavigation]"];
export class HeaderBarComponent {
    constructor() {
        this.signOutRequest = new EventEmitter();
    }
    signOut() {
        this.signOutRequest.emit();
    }
}
HeaderBarComponent.ɵfac = function HeaderBarComponent_Factory(t) { return new (t || HeaderBarComponent)(); };
HeaderBarComponent.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: HeaderBarComponent, selectors: [["cut-header-bar"]], inputs: { title: "title", isSolicitor: "isSolicitor", username: "username" }, outputs: { signOutRequest: "signOutRequest" }, ngContentSelectors: _c1, decls: 17, vars: 14, consts: [["role", "banner", "id", "global-header", 1, "with-proposition"], [1, "header-wrapper"], [1, "header-global"], [4, "ngIf"], ["class", "global-header", 4, "ngIf"], [1, "header-proposition"], [1, "content"], ["href", "#proposition-links", 1, "js-header-toggle", "menu"], ["id", "proposition-menu", 4, "ngIf"], [1, "proposition-right"], ["id", "user-name"], ["id", "sign-out", "href", "javascript:void(0)", 3, "click"], ["href", "https://www.gov.uk", "title", "Go to the GOV.UK homepage", "id", "logo", 1, "content", 2, "margin-left", "0px"], ["src", "/img/gov.uk_logotype_crown_invert_trans.png?0.23.0", "width", "36", "height", "32", "alt", ""], [1, "global-header"], [1, "title"], ["id", "proposition-menu"], [1, "title-solicitor"], ["id", "proposition-name"]], template: function HeaderBarComponent_Template(rf, ctx) { if (rf & 1) {
        i0.ɵɵprojectionDef(_c0);
        i0.ɵɵelementStart(0, "header", 0)(1, "div", 1)(2, "div", 2);
        i0.ɵɵtemplate(3, HeaderBarComponent_div_3_Template, 5, 3, "div", 3);
        i0.ɵɵtemplate(4, HeaderBarComponent_div_4_Template, 5, 3, "div", 4);
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(5, "div", 5)(6, "div", 6)(7, "a", 7);
        i0.ɵɵtext(8);
        i0.ɵɵpipe(9, "rpxTranslate");
        i0.ɵɵelementEnd();
        i0.ɵɵtemplate(10, HeaderBarComponent_div_10_Template, 6, 3, "div", 8);
        i0.ɵɵelementStart(11, "div", 9)(12, "span", 10);
        i0.ɵɵtext(13);
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(14, "a", 11);
        i0.ɵɵlistener("click", function HeaderBarComponent_Template_a_click_14_listener() { return ctx.signOut(); });
        i0.ɵɵtext(15);
        i0.ɵɵpipe(16, "rpxTranslate");
        i0.ɵɵelementEnd()()()()()();
    } if (rf & 2) {
        i0.ɵɵadvance(1);
        i0.ɵɵclassProp("full-screen", !ctx.isSolicitor);
        i0.ɵɵadvance(1);
        i0.ɵɵclassProp("header-logo", ctx.isSolicitor);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngIf", ctx.isSolicitor);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngIf", !ctx.isSolicitor);
        i0.ɵɵadvance(4);
        i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(9, 10, "Menu"));
        i0.ɵɵadvance(2);
        i0.ɵɵproperty("ngIf", ctx.isSolicitor);
        i0.ɵɵadvance(3);
        i0.ɵɵtextInterpolate(ctx.username);
        i0.ɵɵadvance(2);
        i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(16, 12, "Sign Out"));
    } }, dependencies: [i1.NgIf, i2.RpxTranslatePipe], styles: [".title[_ngcontent-%COMP%]:after, .global-header[_ngcontent-%COMP%]   .header-username[_ngcontent-%COMP%]:after, .global-header[_ngcontent-%COMP%]   .header-title[_ngcontent-%COMP%]:after, .global-header[_ngcontent-%COMP%]:after{content:\"\";display:block;clear:both}.global-header[_ngcontent-%COMP%]{background-color:#000;width:100%}.global-header[_ngcontent-%COMP%]   .header-title[_ngcontent-%COMP%]{font-family:nta,Arial,sans-serif;text-transform:none;font-size:16pt;line-height:1.25;float:left;font-weight:700;color:#fff;position:relative;top:50%;transform:translateY(-50%)}@media (min-width: 641px){.global-header[_ngcontent-%COMP%]   .header-title[_ngcontent-%COMP%]{font-size:20pt;line-height:1.3}}@media (min-width: 769px){.global-header[_ngcontent-%COMP%]   .header-title[_ngcontent-%COMP%]{width:50%}}@media screen and (max-width: 379px){.global-header[_ngcontent-%COMP%]   .header-title[_ngcontent-%COMP%]{width:auto;float:none}}.global-header[_ngcontent-%COMP%]   .header-title[_ngcontent-%COMP%]   .header-title-span[_ngcontent-%COMP%]{padding-left:22px}.global-header[_ngcontent-%COMP%]   .header-username[_ngcontent-%COMP%]{font-family:nta,Arial,sans-serif;font-weight:400;text-transform:none;font-size:12pt;line-height:1.25;float:right;text-align:right;color:#fff;position:relative;top:50%;transform:translateY(-50%)}@media (min-width: 641px){.global-header[_ngcontent-%COMP%]   .header-username[_ngcontent-%COMP%]{font-size:14pt;line-height:1.4285714286}}@media (min-width: 769px){.global-header[_ngcontent-%COMP%]   .header-username[_ngcontent-%COMP%]{width:50%}}.global-header[_ngcontent-%COMP%]   .header-username[_ngcontent-%COMP%]   .header-username-span[_ngcontent-%COMP%]{padding-right:15px}#global-header[_ngcontent-%COMP%]   .full-screen[_ngcontent-%COMP%]{max-width:100%}.title[_ngcontent-%COMP%]{font-weight:700;color:#fff;font-size:24px}.title-solicitor[_ngcontent-%COMP%]{float:left}.proposition-right[_ngcontent-%COMP%]{float:right;padding-top:5px}#global-header.with-proposition[_ngcontent-%COMP%]   .header-wrapper[_ngcontent-%COMP%]   .header-logo[_ngcontent-%COMP%]{width:27%}#global-header.with-proposition[_ngcontent-%COMP%]   .header-wrapper[_ngcontent-%COMP%]   .header-proposition[_ngcontent-%COMP%]{width:100%;float:none}#global-header.with-proposition[_ngcontent-%COMP%]   .header-wrapper[_ngcontent-%COMP%]   .header-proposition[_ngcontent-%COMP%]   .content[_ngcontent-%COMP%]{margin:0}#user-name[_ngcontent-%COMP%], #sign-out[_ngcontent-%COMP%]{font-size:16px;font-weight:700;border:none;color:#fff;margin:0 0 0 9px;text-decoration:none;background-color:#000}#user-name[_ngcontent-%COMP%]:focus, #sign-out[_ngcontent-%COMP%]:focus{color:#fff}#sign-out[_ngcontent-%COMP%]:hover{text-decoration:underline}"] });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(HeaderBarComponent, [{
        type: Component,
        args: [{ selector: 'cut-header-bar', template: "<header role=\"banner\" id=\"global-header\" class=\"with-proposition\">\n  <div [class.full-screen]=\"!isSolicitor\" class=\"header-wrapper\">\n\n    <div class=\"header-global\" [class.header-logo]=\"isSolicitor\">\n      <div *ngIf=\"isSolicitor\">\n        <a href=\"https://www.gov.uk\" title=\"Go to the GOV.UK homepage\" id=\"logo\" class=\"content\" style=\"margin-left: 0px;\">\n          <img src=\"/img/gov.uk_logotype_crown_invert_trans.png?0.23.0\" width=\"36\" height=\"32\" alt=\"\"> {{'GOV.UK' | rpxTranslate}}\n        </a>\n      </div>\n      <div class=\"global-header\" *ngIf=\"!isSolicitor\">\n        <div class=\"title\">\n          <span>{{title | rpxTranslate}}</span>\n        </div>\n      </div>\n    </div>\n\n    <div class=\"header-proposition\">\n      <div class=\"content\">\n        <a href=\"#proposition-links\" class=\"js-header-toggle menu\">{{'Menu' | rpxTranslate}}</a>\n        <div *ngIf=\"isSolicitor\" id=\"proposition-menu\">\n          <div class=\"title-solicitor\">\n            <span id=\"proposition-name\">{{title | rpxTranslate}}</span>\n            <ng-content select=\"[headerNavigation]\"></ng-content>\n          </div>\n        </div>\n\n        <div class=\"proposition-right\">\n          <span id=\"user-name\">{{username}}</span>\n          <a (click)=\"signOut()\" id=\"sign-out\" href=\"javascript:void(0)\">{{'Sign Out' | rpxTranslate}}</a>\n        </div>\n      </div>\n    </div>\n\n  </div>\n</header>\n", styles: [".title:after,.global-header .header-username:after,.global-header .header-title:after,.global-header:after{content:\"\";display:block;clear:both}.global-header{background-color:#000;width:100%}.global-header .header-title{font-family:nta,Arial,sans-serif;text-transform:none;font-size:16pt;line-height:1.25;float:left;font-weight:700;color:#fff;position:relative;top:50%;transform:translateY(-50%)}@media (min-width: 641px){.global-header .header-title{font-size:20pt;line-height:1.3}}@media (min-width: 769px){.global-header .header-title{width:50%}}@media screen and (max-width: 379px){.global-header .header-title{width:auto;float:none}}.global-header .header-title .header-title-span{padding-left:22px}.global-header .header-username{font-family:nta,Arial,sans-serif;font-weight:400;text-transform:none;font-size:12pt;line-height:1.25;float:right;text-align:right;color:#fff;position:relative;top:50%;transform:translateY(-50%)}@media (min-width: 641px){.global-header .header-username{font-size:14pt;line-height:1.4285714286}}@media (min-width: 769px){.global-header .header-username{width:50%}}.global-header .header-username .header-username-span{padding-right:15px}#global-header .full-screen{max-width:100%}.title{font-weight:700;color:#fff;font-size:24px}.title-solicitor{float:left}.proposition-right{float:right;padding-top:5px}#global-header.with-proposition .header-wrapper .header-logo{width:27%}#global-header.with-proposition .header-wrapper .header-proposition{width:100%;float:none}#global-header.with-proposition .header-wrapper .header-proposition .content{margin:0}#user-name,#sign-out{font-size:16px;font-weight:700;border:none;color:#fff;margin:0 0 0 9px;text-decoration:none;background-color:#000}#user-name:focus,#sign-out:focus{color:#fff}#sign-out:hover{text-decoration:underline}\n"] }]
    }], null, { title: [{
            type: Input
        }], isSolicitor: [{
            type: Input
        }], username: [{
            type: Input
        }], signOutRequest: [{
            type: Output
        }] }); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGVhZGVyLWJhci5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9jY2QtY2FzZS11aS10b29sa2l0L3NyYy9saWIvY29tcG9uZW50cy9oZWFkZXIvaGVhZGVyLWJhci9oZWFkZXItYmFyLmNvbXBvbmVudC50cyIsIi4uLy4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2NjZC1jYXNlLXVpLXRvb2xraXQvc3JjL2xpYi9jb21wb25lbnRzL2hlYWRlci9oZWFkZXItYmFyL2hlYWRlci1iYXIuaHRtbCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLFlBQVksRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLE1BQU0sZUFBZSxDQUFDOzs7OztJQ0lqRSwyQkFBeUIsWUFBQTtJQUVyQiwwQkFBNEY7SUFBQyxZQUMvRjs7SUFBQSxpQkFBSSxFQUFBOztJQUQyRixlQUMvRjtJQUQrRiwrREFDL0Y7OztJQUVGLCtCQUFnRCxjQUFBLFdBQUE7SUFFdEMsWUFBd0I7O0lBQUEsaUJBQU8sRUFBQSxFQUFBOzs7SUFBL0IsZUFBd0I7SUFBeEIsd0RBQXdCOzs7SUFRaEMsK0JBQStDLGNBQUEsZUFBQTtJQUVmLFlBQXdCOztJQUFBLGlCQUFPO0lBQzNELGtCQUFxRDtJQUN2RCxpQkFBTSxFQUFBOzs7SUFGd0IsZUFBd0I7SUFBeEIsd0RBQXdCOzs7O0FEZGhFLE1BQU0sT0FBTyxrQkFBa0I7SUFML0I7UUFpQm1CLG1CQUFjLEdBQXNCLElBQUksWUFBWSxFQUFFLENBQUM7S0FLekU7SUFIUSxPQUFPO1FBQ1osSUFBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLEVBQUUsQ0FBQztJQUM3QixDQUFDOztvRkFoQlUsa0JBQWtCO3FFQUFsQixrQkFBa0I7O1FDUC9CLGlDQUFrRSxhQUFBLGFBQUE7UUFJNUQsbUVBSU07UUFDTixtRUFJTTtRQUNSLGlCQUFNO1FBRU4sOEJBQWdDLGFBQUEsV0FBQTtRQUUrQixZQUF5Qjs7UUFBQSxpQkFBSTtRQUN4RixxRUFLTTtRQUVOLCtCQUErQixnQkFBQTtRQUNSLGFBQVk7UUFBQSxpQkFBTztRQUN4Qyw4QkFBK0Q7UUFBNUQsMkZBQVMsYUFBUyxJQUFDO1FBQXlDLGFBQTZCOztRQUFBLGlCQUFJLEVBQUEsRUFBQSxFQUFBLEVBQUEsRUFBQTs7UUEzQm5HLGVBQWtDO1FBQWxDLCtDQUFrQztRQUVWLGVBQWlDO1FBQWpDLDhDQUFpQztRQUNwRCxlQUFpQjtRQUFqQixzQ0FBaUI7UUFLSyxlQUFrQjtRQUFsQix1Q0FBa0I7UUFTZSxlQUF5QjtRQUF6QixtREFBeUI7UUFDOUUsZUFBaUI7UUFBakIsc0NBQWlCO1FBUUEsZUFBWTtRQUFaLGtDQUFZO1FBQzhCLGVBQTZCO1FBQTdCLHdEQUE2Qjs7dUZEckJ6RixrQkFBa0I7Y0FMOUIsU0FBUzsyQkFDRSxnQkFBZ0I7Z0JBT25CLEtBQUs7a0JBRFgsS0FBSztZQUlDLFdBQVc7a0JBRGpCLEtBQUs7WUFJQyxRQUFRO2tCQURkLEtBQUs7WUFJVyxjQUFjO2tCQUQ5QixNQUFNIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBFdmVudEVtaXR0ZXIsIElucHV0LCBPdXRwdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnY3V0LWhlYWRlci1iYXInLFxuICB0ZW1wbGF0ZVVybDogJy4vaGVhZGVyLWJhci5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJy4vaGVhZGVyLWJhci5zY3NzJ11cbn0pXG5leHBvcnQgY2xhc3MgSGVhZGVyQmFyQ29tcG9uZW50IHtcblxuICBASW5wdXQoKVxuICBwdWJsaWMgdGl0bGU6IHN0cmluZztcblxuICBASW5wdXQoKVxuICBwdWJsaWMgaXNTb2xpY2l0b3I6IGJvb2xlYW47XG5cbiAgQElucHV0KClcbiAgcHVibGljIHVzZXJuYW1lOiBzdHJpbmc7XG5cbiAgQE91dHB1dCgpXG4gIHByaXZhdGUgcmVhZG9ubHkgc2lnbk91dFJlcXVlc3Q6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gIHB1YmxpYyBzaWduT3V0KCkge1xuICAgIHRoaXMuc2lnbk91dFJlcXVlc3QuZW1pdCgpO1xuICB9XG59XG4iLCI8aGVhZGVyIHJvbGU9XCJiYW5uZXJcIiBpZD1cImdsb2JhbC1oZWFkZXJcIiBjbGFzcz1cIndpdGgtcHJvcG9zaXRpb25cIj5cbiAgPGRpdiBbY2xhc3MuZnVsbC1zY3JlZW5dPVwiIWlzU29saWNpdG9yXCIgY2xhc3M9XCJoZWFkZXItd3JhcHBlclwiPlxuXG4gICAgPGRpdiBjbGFzcz1cImhlYWRlci1nbG9iYWxcIiBbY2xhc3MuaGVhZGVyLWxvZ29dPVwiaXNTb2xpY2l0b3JcIj5cbiAgICAgIDxkaXYgKm5nSWY9XCJpc1NvbGljaXRvclwiPlxuICAgICAgICA8YSBocmVmPVwiaHR0cHM6Ly93d3cuZ292LnVrXCIgdGl0bGU9XCJHbyB0byB0aGUgR09WLlVLIGhvbWVwYWdlXCIgaWQ9XCJsb2dvXCIgY2xhc3M9XCJjb250ZW50XCIgc3R5bGU9XCJtYXJnaW4tbGVmdDogMHB4O1wiPlxuICAgICAgICAgIDxpbWcgc3JjPVwiL2ltZy9nb3YudWtfbG9nb3R5cGVfY3Jvd25faW52ZXJ0X3RyYW5zLnBuZz8wLjIzLjBcIiB3aWR0aD1cIjM2XCIgaGVpZ2h0PVwiMzJcIiBhbHQ9XCJcIj4ge3snR09WLlVLJyB8IHJweFRyYW5zbGF0ZX19XG4gICAgICAgIDwvYT5cbiAgICAgIDwvZGl2PlxuICAgICAgPGRpdiBjbGFzcz1cImdsb2JhbC1oZWFkZXJcIiAqbmdJZj1cIiFpc1NvbGljaXRvclwiPlxuICAgICAgICA8ZGl2IGNsYXNzPVwidGl0bGVcIj5cbiAgICAgICAgICA8c3Bhbj57e3RpdGxlIHwgcnB4VHJhbnNsYXRlfX08L3NwYW4+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgPC9kaXY+XG5cbiAgICA8ZGl2IGNsYXNzPVwiaGVhZGVyLXByb3Bvc2l0aW9uXCI+XG4gICAgICA8ZGl2IGNsYXNzPVwiY29udGVudFwiPlxuICAgICAgICA8YSBocmVmPVwiI3Byb3Bvc2l0aW9uLWxpbmtzXCIgY2xhc3M9XCJqcy1oZWFkZXItdG9nZ2xlIG1lbnVcIj57eydNZW51JyB8IHJweFRyYW5zbGF0ZX19PC9hPlxuICAgICAgICA8ZGl2ICpuZ0lmPVwiaXNTb2xpY2l0b3JcIiBpZD1cInByb3Bvc2l0aW9uLW1lbnVcIj5cbiAgICAgICAgICA8ZGl2IGNsYXNzPVwidGl0bGUtc29saWNpdG9yXCI+XG4gICAgICAgICAgICA8c3BhbiBpZD1cInByb3Bvc2l0aW9uLW5hbWVcIj57e3RpdGxlIHwgcnB4VHJhbnNsYXRlfX08L3NwYW4+XG4gICAgICAgICAgICA8bmctY29udGVudCBzZWxlY3Q9XCJbaGVhZGVyTmF2aWdhdGlvbl1cIj48L25nLWNvbnRlbnQ+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuXG4gICAgICAgIDxkaXYgY2xhc3M9XCJwcm9wb3NpdGlvbi1yaWdodFwiPlxuICAgICAgICAgIDxzcGFuIGlkPVwidXNlci1uYW1lXCI+e3t1c2VybmFtZX19PC9zcGFuPlxuICAgICAgICAgIDxhIChjbGljayk9XCJzaWduT3V0KClcIiBpZD1cInNpZ24tb3V0XCIgaHJlZj1cImphdmFzY3JpcHQ6dm9pZCgwKVwiPnt7J1NpZ24gT3V0JyB8IHJweFRyYW5zbGF0ZX19PC9hPlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgIDwvZGl2PlxuXG4gIDwvZGl2PlxuPC9oZWFkZXI+XG4iXX0=