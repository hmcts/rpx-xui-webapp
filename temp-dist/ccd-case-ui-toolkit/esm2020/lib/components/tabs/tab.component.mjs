import { Component, Input } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
const _c0 = function (a0) { return { "js-hidden": a0 }; };
const _c1 = ["*"];
export class TabComponent {
}
TabComponent.ɵfac = function TabComponent_Factory(t) { return new (t || TabComponent)(); };
TabComponent.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: TabComponent, selectors: [["cut-tab"]], inputs: { id: "id", title: "title", selected: "selected" }, ngContentSelectors: _c1, decls: 2, vars: 5, consts: [["role", "tabpanel", 1, "tabs-panel", 3, "id", "ngClass"]], template: function TabComponent_Template(rf, ctx) { if (rf & 1) {
        i0.ɵɵprojectionDef();
        i0.ɵɵelementStart(0, "div", 0);
        i0.ɵɵprojection(1);
        i0.ɵɵelementEnd();
    } if (rf & 2) {
        i0.ɵɵproperty("id", ctx.id)("ngClass", i0.ɵɵpureFunction1(3, _c0, !ctx.selected));
        i0.ɵɵattribute("aria-hidden", !ctx.selected);
    } }, dependencies: [i1.NgClass], styles: [".tabs-toggle[_ngcontent-%COMP%]{display:block;padding:10px 15px 3px;margin-bottom:8px}.tabs-toggle[aria-selected=true][_ngcontent-%COMP%]{color:#0b0c0c;text-decoration:none;border-bottom:none}.tabs-toggle[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]{color:#005ea5}@media (max-width: 640px){.tabs-list[_ngcontent-%COMP%]{border-bottom:1px solid #bfc1c3;margin-left:-15px;margin-right:-15px}.tabs-toggle[_ngcontent-%COMP%]{border-top:1px solid #bfc1c3}.tabs-toggle[_ngcontent-%COMP%]:focus{color:#0b0c0c;outline:none}}@media (min-width: 641px){.tabs-panel[_ngcontent-%COMP%]{border-top:1px solid #bfc1c3;clear:both;overflow:hidden}.tabs-list[_ngcontent-%COMP%]{float:left}.tabs-list-item[_ngcontent-%COMP%]{float:left;position:relative;bottom:-1px;padding-top:10px}.tabs-toggle[_ngcontent-%COMP%]{background-color:#dee0e2;border:1px solid transparent;float:left;margin:0 6px 0 0;text-decoration:none}.tabs-toggle[_ngcontent-%COMP%]:visited{color:#005ea5}.tabs-toggle-selected[_ngcontent-%COMP%], .tabs-toggle[aria-selected=true][_ngcontent-%COMP%]{background-color:#fff;border-bottom:0px;border-color:#bfc1c3;padding-bottom:11px;margin-bottom:0;color:#0b0c0c}}"] });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(TabComponent, [{
        type: Component,
        args: [{ selector: 'cut-tab', template: "<div\n  class=\"tabs-panel\"\n  [id]=\"id\"\n  role=\"tabpanel\"\n  [ngClass]=\"{\n          'js-hidden': !selected\n        }\"\n  [attr.aria-hidden]=\"!selected\"\n>\n  <ng-content></ng-content>\n</div>\n", styles: [".tabs-toggle{display:block;padding:10px 15px 3px;margin-bottom:8px}.tabs-toggle[aria-selected=true]{color:#0b0c0c;text-decoration:none;border-bottom:none}.tabs-toggle a{color:#005ea5}@media (max-width: 640px){.tabs-list{border-bottom:1px solid #bfc1c3;margin-left:-15px;margin-right:-15px}.tabs-toggle{border-top:1px solid #bfc1c3}.tabs-toggle:focus{color:#0b0c0c;outline:none}}@media (min-width: 641px){.tabs-panel{border-top:1px solid #bfc1c3;clear:both;overflow:hidden}.tabs-list{float:left}.tabs-list-item{float:left;position:relative;bottom:-1px;padding-top:10px}.tabs-toggle{background-color:#dee0e2;border:1px solid transparent;float:left;margin:0 6px 0 0;text-decoration:none}.tabs-toggle:visited{color:#005ea5}.tabs-toggle-selected,.tabs-toggle[aria-selected=true]{background-color:#fff;border-bottom:0px;border-color:#bfc1c3;padding-bottom:11px;margin-bottom:0;color:#0b0c0c}}\n"] }]
    }], null, { id: [{
            type: Input
        }], title: [{
            type: Input
        }], selected: [{
            type: Input
        }] }); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFiLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2NjZC1jYXNlLXVpLXRvb2xraXQvc3JjL2xpYi9jb21wb25lbnRzL3RhYnMvdGFiLmNvbXBvbmVudC50cyIsIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2NjZC1jYXNlLXVpLXRvb2xraXQvc3JjL2xpYi9jb21wb25lbnRzL3RhYnMvdGFiLmNvbXBvbmVudC5odG1sIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFFLE1BQU0sZUFBZSxDQUFDOzs7OztBQVNqRCxNQUFNLE9BQU8sWUFBWTs7d0VBQVosWUFBWTsrREFBWixZQUFZOztRQ1R6Qiw4QkFRQztRQUNDLGtCQUF5QjtRQUMzQixpQkFBTTs7UUFSSiwyQkFBUyxzREFBQTtRQUtULDRDQUE4Qjs7dUZERW5CLFlBQVk7Y0FQeEIsU0FBUzsyQkFDRSxTQUFTO2dCQVNaLEVBQUU7a0JBRFIsS0FBSztZQUlDLEtBQUs7a0JBRFgsS0FBSztZQUlDLFFBQVE7a0JBRGQsS0FBSyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgSW5wdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnY3V0LXRhYicsXG4gIHRlbXBsYXRlVXJsOiAnLi90YWIuY29tcG9uZW50Lmh0bWwnLFxuICBzdHlsZVVybHM6IFtcbiAgICAnLi90YWJzLmNvbXBvbmVudC5zY3NzJ1xuICBdLFxufSlcbmV4cG9ydCBjbGFzcyBUYWJDb21wb25lbnQge1xuXG4gIEBJbnB1dCgpXG4gIHB1YmxpYyBpZDogc3RyaW5nO1xuXG4gIEBJbnB1dCgpXG4gIHB1YmxpYyB0aXRsZTogc3RyaW5nO1xuXG4gIEBJbnB1dCgpXG4gIHB1YmxpYyBzZWxlY3RlZDogYm9vbGVhbjtcblxufVxuIiwiPGRpdlxuICBjbGFzcz1cInRhYnMtcGFuZWxcIlxuICBbaWRdPVwiaWRcIlxuICByb2xlPVwidGFicGFuZWxcIlxuICBbbmdDbGFzc109XCJ7XG4gICAgICAgICAgJ2pzLWhpZGRlbic6ICFzZWxlY3RlZFxuICAgICAgICB9XCJcbiAgW2F0dHIuYXJpYS1oaWRkZW5dPVwiIXNlbGVjdGVkXCJcbj5cbiAgPG5nLWNvbnRlbnQ+PC9uZy1jb250ZW50PlxuPC9kaXY+XG4iXX0=