import { Component, ContentChildren, QueryList, ViewChildren } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TabComponent } from './tab.component';
import * as i0 from "@angular/core";
import * as i1 from "@angular/router";
import * as i2 from "@angular/common";
import * as i3 from "rpx-xui-translation";
const _c0 = ["tab"];
const _c1 = function () { return ["."]; };
const _c2 = function (a0) { return { "tabs-toggle-selected": a0 }; };
function TabsComponent_li_2_Template(rf, ctx) { if (rf & 1) {
    const _r4 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "li", 4)(1, "a", 5, 6);
    i0.ɵɵlistener("click", function TabsComponent_li_2_Template_a_click_1_listener() { const restoredCtx = i0.ɵɵrestoreView(_r4); const panel_r1 = restoredCtx.$implicit; const ctx_r3 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r3.show(panel_r1.id)); });
    i0.ɵɵtext(3);
    i0.ɵɵpipe(4, "rpxTranslate");
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const panel_r1 = ctx.$implicit;
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("routerLink", i0.ɵɵpureFunction0(8, _c1))("fragment", panel_r1.id)("ngClass", i0.ɵɵpureFunction1(9, _c2, panel_r1.selected));
    i0.ɵɵattribute("aria-controls", panel_r1.id)("aria-selected", panel_r1.selected);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(4, 6, panel_r1.title));
} }
const _c3 = ["*"];
export class TabsComponent {
    constructor(route) {
        this.route = route;
        this.panelIds = [];
    }
    ngAfterContentInit() {
        this.panels.forEach((panel) => this.panelIds.push(panel.id));
        this.show(this.route.snapshot.fragment);
    }
    show(id) {
        const panels = this.panels.toArray();
        id = id || panels[0].id;
        /* istanbul ignore else */
        if (0 > this.panelIds.indexOf(id)) {
            id = panels[0].id;
        }
        panels.forEach((panel) => panel.selected = id === panel.id);
    }
}
TabsComponent.ɵfac = function TabsComponent_Factory(t) { return new (t || TabsComponent)(i0.ɵɵdirectiveInject(i1.ActivatedRoute)); };
TabsComponent.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: TabsComponent, selectors: [["cut-tabs"]], contentQueries: function TabsComponent_ContentQueries(rf, ctx, dirIndex) { if (rf & 1) {
        i0.ɵɵcontentQuery(dirIndex, TabComponent, 4);
    } if (rf & 2) {
        let _t;
        i0.ɵɵqueryRefresh(_t = i0.ɵɵloadQuery()) && (ctx.panels = _t);
    } }, viewQuery: function TabsComponent_Query(rf, ctx) { if (rf & 1) {
        i0.ɵɵviewQuery(_c0, 5);
    } if (rf & 2) {
        let _t;
        i0.ɵɵqueryRefresh(_t = i0.ɵɵloadQuery()) && (ctx.tabs = _t);
    } }, ngContentSelectors: _c3, decls: 5, vars: 1, consts: [[1, "tabs"], ["role", "list", 1, "tabs-list"], ["class", "tabs-list-item", 4, "ngFor", "ngForOf"], [1, "tabs-content"], [1, "tabs-list-item"], ["role", "tab", "tabindex", "0", 1, "tabs-toggle", 3, "routerLink", "fragment", "ngClass", "click"], ["tab", ""]], template: function TabsComponent_Template(rf, ctx) { if (rf & 1) {
        i0.ɵɵprojectionDef();
        i0.ɵɵelementStart(0, "div", 0)(1, "ul", 1);
        i0.ɵɵtemplate(2, TabsComponent_li_2_Template, 5, 11, "li", 2);
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(3, "div", 3);
        i0.ɵɵprojection(4);
        i0.ɵɵelementEnd()();
    } if (rf & 2) {
        i0.ɵɵadvance(2);
        i0.ɵɵproperty("ngForOf", ctx.panels);
    } }, dependencies: [i2.NgClass, i2.NgForOf, i1.RouterLink, i3.RpxTranslatePipe], styles: [".tabs-toggle[_ngcontent-%COMP%]{display:block;padding:10px 15px 3px;margin-bottom:8px}.tabs-toggle[aria-selected=true][_ngcontent-%COMP%]{color:#0b0c0c;text-decoration:none;border-bottom:none}.tabs-toggle[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]{color:#005ea5}@media (max-width: 640px){.tabs-list[_ngcontent-%COMP%]{border-bottom:1px solid #bfc1c3;margin-left:-15px;margin-right:-15px}.tabs-toggle[_ngcontent-%COMP%]{border-top:1px solid #bfc1c3}.tabs-toggle[_ngcontent-%COMP%]:focus{color:#0b0c0c;outline:none}}@media (min-width: 641px){.tabs-panel[_ngcontent-%COMP%]{border-top:1px solid #bfc1c3;clear:both;overflow:hidden}.tabs-list[_ngcontent-%COMP%]{float:left}.tabs-list-item[_ngcontent-%COMP%]{float:left;position:relative;bottom:-1px;padding-top:10px}.tabs-toggle[_ngcontent-%COMP%]{background-color:#dee0e2;border:1px solid transparent;float:left;margin:0 6px 0 0;text-decoration:none}.tabs-toggle[_ngcontent-%COMP%]:visited{color:#005ea5}.tabs-toggle-selected[_ngcontent-%COMP%], .tabs-toggle[aria-selected=true][_ngcontent-%COMP%]{background-color:#fff;border-bottom:0px;border-color:#bfc1c3;padding-bottom:11px;margin-bottom:0;color:#0b0c0c}}"] });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(TabsComponent, [{
        type: Component,
        args: [{ selector: 'cut-tabs', template: "<div class=\"tabs\">\n\n  <ul class=\"tabs-list\" role=\"list\">\n    <li class=\"tabs-list-item\" *ngFor=\"let panel of panels\">\n      <a\n        class=\"tabs-toggle\"\n        [routerLink]=\"['.']\"\n        [fragment]=\"panel.id\"\n        role=\"tab\"\n        (click)=\"show(panel.id)\"\n        [attr.aria-controls]=\"panel.id\"\n        [attr.aria-selected]=\"panel.selected\"\n        tabindex=\"0\"\n        [ngClass]=\"{\n          'tabs-toggle-selected': panel.selected\n        }\"\n        #tab\n      >{{panel.title | rpxTranslate}}</a>\n    </li>\n  </ul>\n\n  <div class=\"tabs-content\">\n    <ng-content></ng-content>\n  </div>\n\n</div>\n", styles: [".tabs-toggle{display:block;padding:10px 15px 3px;margin-bottom:8px}.tabs-toggle[aria-selected=true]{color:#0b0c0c;text-decoration:none;border-bottom:none}.tabs-toggle a{color:#005ea5}@media (max-width: 640px){.tabs-list{border-bottom:1px solid #bfc1c3;margin-left:-15px;margin-right:-15px}.tabs-toggle{border-top:1px solid #bfc1c3}.tabs-toggle:focus{color:#0b0c0c;outline:none}}@media (min-width: 641px){.tabs-panel{border-top:1px solid #bfc1c3;clear:both;overflow:hidden}.tabs-list{float:left}.tabs-list-item{float:left;position:relative;bottom:-1px;padding-top:10px}.tabs-toggle{background-color:#dee0e2;border:1px solid transparent;float:left;margin:0 6px 0 0;text-decoration:none}.tabs-toggle:visited{color:#005ea5}.tabs-toggle-selected,.tabs-toggle[aria-selected=true]{background-color:#fff;border-bottom:0px;border-color:#bfc1c3;padding-bottom:11px;margin-bottom:0;color:#0b0c0c}}\n"] }]
    }], function () { return [{ type: i1.ActivatedRoute }]; }, { tabs: [{
            type: ViewChildren,
            args: ['tab']
        }], panels: [{
            type: ContentChildren,
            args: [TabComponent]
        }] }); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFicy5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9jY2QtY2FzZS11aS10b29sa2l0L3NyYy9saWIvY29tcG9uZW50cy90YWJzL3RhYnMuY29tcG9uZW50LnRzIiwiLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvY2NkLWNhc2UtdWktdG9vbGtpdC9zcmMvbGliL2NvbXBvbmVudHMvdGFicy90YWJzLmNvbXBvbmVudC5odG1sIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBb0IsU0FBUyxFQUFFLGVBQWUsRUFBYyxTQUFTLEVBQUUsWUFBWSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ2xILE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUNqRCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7Ozs7Ozs7Ozs7SUNDM0MsNkJBQXdELGNBQUE7SUFNcEQsZ05BQVMsZUFBQSx3QkFBYyxDQUFBLElBQUM7SUFRekIsWUFBOEI7O0lBQUEsaUJBQUksRUFBQTs7O0lBWGpDLGVBQW9CO0lBQXBCLHVEQUFvQix5QkFBQSwwREFBQTtJQUlwQiw0Q0FBK0Isb0NBQUE7SUFPaEMsZUFBOEI7SUFBOUIsMERBQThCOzs7QUROckMsTUFBTSxPQUFPLGFBQWE7SUFTeEIsWUFBNkIsS0FBcUI7UUFBckIsVUFBSyxHQUFMLEtBQUssQ0FBZ0I7UUFGakMsYUFBUSxHQUFhLEVBQUUsQ0FBQztJQUVZLENBQUM7SUFFL0Msa0JBQWtCO1FBQ3ZCLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUMsS0FBSyxFQUFFLEVBQUUsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztRQUU3RCxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBQzFDLENBQUM7SUFFTSxJQUFJLENBQUMsRUFBVTtRQUNwQixNQUFNLE1BQU0sR0FBbUIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLEVBQUUsQ0FBQztRQUVyRCxFQUFFLEdBQUcsRUFBRSxJQUFJLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUM7UUFFeEIsMEJBQTBCO1FBQzFCLElBQUksQ0FBQyxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQyxFQUFFO1lBQ2pDLEVBQUUsR0FBRyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDO1NBQ25CO1FBRUQsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDLEtBQUssRUFBRSxFQUFFLENBQUMsS0FBSyxDQUFDLFFBQVEsR0FBRyxFQUFFLEtBQUssS0FBSyxDQUFDLEVBQUUsQ0FBQyxDQUFDO0lBQzlELENBQUM7OzBFQTVCVSxhQUFhO2dFQUFiLGFBQWE7b0NBSVAsWUFBWTs7Ozs7Ozs7Ozs7UUNmL0IsOEJBQWtCLFlBQUE7UUFHZCw2REFlSztRQUNQLGlCQUFLO1FBRUwsOEJBQTBCO1FBQ3hCLGtCQUF5QjtRQUMzQixpQkFBTSxFQUFBOztRQXBCeUMsZUFBUztRQUFULG9DQUFTOzt1RkRRN0MsYUFBYTtjQVB6QixTQUFTOzJCQUNFLFVBQVU7aUVBUVEsSUFBSTtrQkFBL0IsWUFBWTttQkFBQyxLQUFLO1lBR1osTUFBTTtrQkFEWixlQUFlO21CQUFDLFlBQVkiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBBZnRlckNvbnRlbnRJbml0LCBDb21wb25lbnQsIENvbnRlbnRDaGlsZHJlbiwgRWxlbWVudFJlZiwgUXVlcnlMaXN0LCBWaWV3Q2hpbGRyZW4gfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEFjdGl2YXRlZFJvdXRlIH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcbmltcG9ydCB7IFRhYkNvbXBvbmVudCB9IGZyb20gJy4vdGFiLmNvbXBvbmVudCc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2N1dC10YWJzJyxcbiAgdGVtcGxhdGVVcmw6ICcuL3RhYnMuY29tcG9uZW50Lmh0bWwnLFxuICBzdHlsZVVybHM6IFtcbiAgICAnLi90YWJzLmNvbXBvbmVudC5zY3NzJ1xuICBdLFxufSlcbmV4cG9ydCBjbGFzcyBUYWJzQ29tcG9uZW50IGltcGxlbWVudHMgQWZ0ZXJDb250ZW50SW5pdCB7XG5cbiAgQFZpZXdDaGlsZHJlbigndGFiJykgcHVibGljIHRhYnMhOiBRdWVyeUxpc3Q8RWxlbWVudFJlZj47XG5cbiAgQENvbnRlbnRDaGlsZHJlbihUYWJDb21wb25lbnQpXG4gIHB1YmxpYyBwYW5lbHM6IFF1ZXJ5TGlzdDxUYWJDb21wb25lbnQ+O1xuXG4gIHByaXZhdGUgcmVhZG9ubHkgcGFuZWxJZHM6IHN0cmluZ1tdID0gW107XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSByZWFkb25seSByb3V0ZTogQWN0aXZhdGVkUm91dGUpIHt9XG5cbiAgcHVibGljIG5nQWZ0ZXJDb250ZW50SW5pdCgpOiB2b2lkIHtcbiAgICB0aGlzLnBhbmVscy5mb3JFYWNoKChwYW5lbCkgPT4gdGhpcy5wYW5lbElkcy5wdXNoKHBhbmVsLmlkKSk7XG5cbiAgICB0aGlzLnNob3codGhpcy5yb3V0ZS5zbmFwc2hvdC5mcmFnbWVudCk7XG4gIH1cblxuICBwdWJsaWMgc2hvdyhpZDogc3RyaW5nKSB7XG4gICAgY29uc3QgcGFuZWxzOiBUYWJDb21wb25lbnRbXSA9IHRoaXMucGFuZWxzLnRvQXJyYXkoKTtcblxuICAgIGlkID0gaWQgfHwgcGFuZWxzWzBdLmlkO1xuXG4gICAgLyogaXN0YW5idWwgaWdub3JlIGVsc2UgKi9cbiAgICBpZiAoMCA+IHRoaXMucGFuZWxJZHMuaW5kZXhPZihpZCkpIHtcbiAgICAgIGlkID0gcGFuZWxzWzBdLmlkO1xuICAgIH1cblxuICAgIHBhbmVscy5mb3JFYWNoKChwYW5lbCkgPT4gcGFuZWwuc2VsZWN0ZWQgPSBpZCA9PT0gcGFuZWwuaWQpO1xuICB9XG59XG4iLCI8ZGl2IGNsYXNzPVwidGFic1wiPlxuXG4gIDx1bCBjbGFzcz1cInRhYnMtbGlzdFwiIHJvbGU9XCJsaXN0XCI+XG4gICAgPGxpIGNsYXNzPVwidGFicy1saXN0LWl0ZW1cIiAqbmdGb3I9XCJsZXQgcGFuZWwgb2YgcGFuZWxzXCI+XG4gICAgICA8YVxuICAgICAgICBjbGFzcz1cInRhYnMtdG9nZ2xlXCJcbiAgICAgICAgW3JvdXRlckxpbmtdPVwiWycuJ11cIlxuICAgICAgICBbZnJhZ21lbnRdPVwicGFuZWwuaWRcIlxuICAgICAgICByb2xlPVwidGFiXCJcbiAgICAgICAgKGNsaWNrKT1cInNob3cocGFuZWwuaWQpXCJcbiAgICAgICAgW2F0dHIuYXJpYS1jb250cm9sc109XCJwYW5lbC5pZFwiXG4gICAgICAgIFthdHRyLmFyaWEtc2VsZWN0ZWRdPVwicGFuZWwuc2VsZWN0ZWRcIlxuICAgICAgICB0YWJpbmRleD1cIjBcIlxuICAgICAgICBbbmdDbGFzc109XCJ7XG4gICAgICAgICAgJ3RhYnMtdG9nZ2xlLXNlbGVjdGVkJzogcGFuZWwuc2VsZWN0ZWRcbiAgICAgICAgfVwiXG4gICAgICAgICN0YWJcbiAgICAgID57e3BhbmVsLnRpdGxlIHwgcnB4VHJhbnNsYXRlfX08L2E+XG4gICAgPC9saT5cbiAgPC91bD5cblxuICA8ZGl2IGNsYXNzPVwidGFicy1jb250ZW50XCI+XG4gICAgPG5nLWNvbnRlbnQ+PC9uZy1jb250ZW50PlxuICA8L2Rpdj5cblxuPC9kaXY+XG4iXX0=