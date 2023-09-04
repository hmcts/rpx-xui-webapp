import { Component, Input } from '@angular/core';
import * as i0 from "@angular/core";
const _c0 = [[["", "leftNavLinks", ""]], [["", "rightNavLinks", ""]]];
const _c1 = ["[leftNavLinks]", "[rightNavLinks]"];
export class NavigationComponent {
}
NavigationComponent.ɵfac = function NavigationComponent_Factory(t) { return new (t || NavigationComponent)(); };
NavigationComponent.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: NavigationComponent, selectors: [["cut-nav-bar"]], inputs: { isSolicitor: "isSolicitor" }, ngContentSelectors: _c1, decls: 4, vars: 2, consts: [[1, "cut-nav-bar"]], template: function NavigationComponent_Template(rf, ctx) { if (rf & 1) {
        i0.ɵɵprojectionDef(_c0);
        i0.ɵɵelementStart(0, "div")(1, "nav", 0);
        i0.ɵɵprojection(2);
        i0.ɵɵprojection(3, 1);
        i0.ɵɵelementEnd()();
    } if (rf & 2) {
        i0.ɵɵadvance(1);
        i0.ɵɵclassProp("full-screen", !ctx.isSolicitor);
    } }, styles: [".cut-nav-bar[_ngcontent-%COMP%]:after{content:\"\";display:block;clear:both}.cut-nav-bar[_ngcontent-%COMP%]{background-color:#005ea5;max-width:990px;margin:0 auto;height:55px;padding:0 15px}.full-screen[_ngcontent-%COMP%]{max-width:100%}"] });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(NavigationComponent, [{
        type: Component,
        args: [{ selector: 'cut-nav-bar', template: "<div>\n  <nav [class.full-screen]=\"!isSolicitor\" class=\"cut-nav-bar\">\n      <ng-content select=\"[leftNavLinks]\"></ng-content>\n      <ng-content select=\"[rightNavLinks]\"></ng-content>\n  </nav>\n</div>\n", styles: [".cut-nav-bar:after{content:\"\";display:block;clear:both}.cut-nav-bar{background-color:#005ea5;max-width:990px;margin:0 auto;height:55px;padding:0 15px}.full-screen{max-width:100%}\n"] }]
    }], null, { isSolicitor: [{
            type: Input
        }] }); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmF2aWdhdGlvbi5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9jY2QtY2FzZS11aS10b29sa2l0L3NyYy9saWIvY29tcG9uZW50cy9oZWFkZXIvbmF2aWdhdGlvbi9uYXZpZ2F0aW9uLmNvbXBvbmVudC50cyIsIi4uLy4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2NjZC1jYXNlLXVpLXRvb2xraXQvc3JjL2xpYi9jb21wb25lbnRzL2hlYWRlci9uYXZpZ2F0aW9uL25hdmlnYXRpb24uaHRtbCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBRSxNQUFNLGVBQWUsQ0FBQzs7OztBQU9qRCxNQUFNLE9BQU8sbUJBQW1COztzRkFBbkIsbUJBQW1CO3NFQUFuQixtQkFBbUI7O1FDUGhDLDJCQUFLLGFBQUE7UUFFQyxrQkFBaUQ7UUFDakQscUJBQWtEO1FBQ3RELGlCQUFNLEVBQUE7O1FBSEQsZUFBa0M7UUFBbEMsK0NBQWtDOzt1RkRNNUIsbUJBQW1CO2NBTC9CLFNBQVM7MkJBQ0ksYUFBYTtnQkFPbEIsV0FBVztrQkFEakIsS0FBSyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgSW5wdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICdjdXQtbmF2LWJhcicsXG4gICAgdGVtcGxhdGVVcmw6ICcuL25hdmlnYXRpb24uaHRtbCcsXG4gICAgc3R5bGVVcmxzOiBbJy4vbmF2aWdhdGlvbi5zY3NzJ11cbn0pXG5leHBvcnQgY2xhc3MgTmF2aWdhdGlvbkNvbXBvbmVudCB7XG5cbiAgQElucHV0KClcbiAgcHVibGljIGlzU29saWNpdG9yOiBib29sZWFuO1xuXG59XG4iLCI8ZGl2PlxuICA8bmF2IFtjbGFzcy5mdWxsLXNjcmVlbl09XCIhaXNTb2xpY2l0b3JcIiBjbGFzcz1cImN1dC1uYXYtYmFyXCI+XG4gICAgICA8bmctY29udGVudCBzZWxlY3Q9XCJbbGVmdE5hdkxpbmtzXVwiPjwvbmctY29udGVudD5cbiAgICAgIDxuZy1jb250ZW50IHNlbGVjdD1cIltyaWdodE5hdkxpbmtzXVwiPjwvbmctY29udGVudD5cbiAgPC9uYXY+XG48L2Rpdj5cbiJdfQ==