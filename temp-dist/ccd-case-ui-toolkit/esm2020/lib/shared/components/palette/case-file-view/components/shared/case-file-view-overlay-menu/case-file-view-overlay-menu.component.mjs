import { Component, EventEmitter, Input, Output } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
import * as i2 from "@angular/cdk/overlay";
function CaseFileViewOverlayMenuComponent_ng_template_4_ng_container_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementContainerStart(0);
    i0.ɵɵelementStart(1, "div", 6);
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd();
    i0.ɵɵelementContainerEnd();
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(ctx_r2.title);
} }
function CaseFileViewOverlayMenuComponent_ng_template_4_ng_container_2_img_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "img", 10);
} if (rf & 2) {
    const item_r4 = i0.ɵɵnextContext().$implicit;
    const ctx_r5 = i0.ɵɵnextContext(2);
    i0.ɵɵpropertyInterpolate1("alt", "", ctx_r5.title, " icon'");
    i0.ɵɵproperty("src", item_r4.iconSrc, i0.ɵɵsanitizeUrl);
} }
function CaseFileViewOverlayMenuComponent_ng_template_4_ng_container_2_Template(rf, ctx) { if (rf & 1) {
    const _r8 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementContainerStart(0);
    i0.ɵɵelementStart(1, "div", 7);
    i0.ɵɵlistener("click", function CaseFileViewOverlayMenuComponent_ng_template_4_ng_container_2_Template_div_click_1_listener() { const restoredCtx = i0.ɵɵrestoreView(_r8); const item_r4 = restoredCtx.$implicit; const ctx_r7 = i0.ɵɵnextContext(2); item_r4.actionFn(); return i0.ɵɵresetView(ctx_r7.closeOverlay()); });
    i0.ɵɵtemplate(2, CaseFileViewOverlayMenuComponent_ng_template_4_ng_container_2_img_2_Template, 1, 2, "img", 8);
    i0.ɵɵelementStart(3, "div", 9);
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementContainerEnd();
} if (rf & 2) {
    const item_r4 = ctx.$implicit;
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngIf", item_r4.iconSrc);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(item_r4.actionText);
} }
function CaseFileViewOverlayMenuComponent_ng_template_4_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 3);
    i0.ɵɵtemplate(1, CaseFileViewOverlayMenuComponent_ng_template_4_ng_container_1_Template, 3, 1, "ng-container", 4);
    i0.ɵɵtemplate(2, CaseFileViewOverlayMenuComponent_ng_template_4_ng_container_2_Template, 5, 2, "ng-container", 5);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", ctx_r1.title);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngForOf", ctx_r1.menuItems);
} }
const _c0 = [[["", "trigger", ""]]];
const _c1 = ["[trigger]"];
export class CaseFileViewOverlayMenuComponent {
    constructor() {
        this.title = '';
        this.isOpen = false;
        this.isOpenChange = new EventEmitter();
    }
    closeOverlay() {
        const isOpen = false;
        this.isOpen = isOpen;
        this.isOpenChange.emit(isOpen);
    }
}
CaseFileViewOverlayMenuComponent.ɵfac = function CaseFileViewOverlayMenuComponent_Factory(t) { return new (t || CaseFileViewOverlayMenuComponent)(); };
CaseFileViewOverlayMenuComponent.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: CaseFileViewOverlayMenuComponent, selectors: [["ccd-case-file-view-overlay-menu"]], inputs: { title: "title", menuItems: "menuItems", isOpen: "isOpen" }, outputs: { isOpenChange: "isOpenChange" }, ngContentSelectors: _c1, decls: 5, vars: 4, consts: [["type", "button", "cdkOverlayOrigin", "", 1, "overlay-toggle", 3, "click"], ["trigger", "cdkOverlayOrigin"], ["cdkConnectedOverlay", "", 3, "cdkConnectedOverlayOrigin", "cdkConnectedOverlayOpen", "cdkConnectedOverlayHasBackdrop", "cdkConnectedOverlayBackdropClass", "backdropClick"], [1, "overlay-menu"], [4, "ngIf"], [4, "ngFor", "ngForOf"], [1, "overlay-menu__title"], [1, "overlay-menu__item", 3, "click"], ["class", "overlay-menu__itemIcon", 3, "src", "alt", 4, "ngIf"], [1, "overlay-menu__actionText"], [1, "overlay-menu__itemIcon", 3, "src", "alt"]], template: function CaseFileViewOverlayMenuComponent_Template(rf, ctx) { if (rf & 1) {
        i0.ɵɵprojectionDef(_c0);
        i0.ɵɵelementStart(0, "div")(1, "button", 0, 1);
        i0.ɵɵlistener("click", function CaseFileViewOverlayMenuComponent_Template_button_click_1_listener($event) { $event.stopPropagation(); return ctx.isOpen = !ctx.isOpen; });
        i0.ɵɵprojection(3);
        i0.ɵɵelementEnd();
        i0.ɵɵtemplate(4, CaseFileViewOverlayMenuComponent_ng_template_4_Template, 3, 2, "ng-template", 2);
        i0.ɵɵlistener("backdropClick", function CaseFileViewOverlayMenuComponent_Template_ng_template_backdropClick_4_listener() { return ctx.closeOverlay(); });
        i0.ɵɵelementEnd();
    } if (rf & 2) {
        const _r0 = i0.ɵɵreference(2);
        i0.ɵɵadvance(4);
        i0.ɵɵproperty("cdkConnectedOverlayOrigin", _r0)("cdkConnectedOverlayOpen", ctx.isOpen)("cdkConnectedOverlayHasBackdrop", true)("cdkConnectedOverlayBackdropClass", "cdk-overlay-transparent-backdrop");
    } }, dependencies: [i1.NgForOf, i1.NgIf, i2.CdkConnectedOverlay, i2.CdkOverlayOrigin], styles: [".overlay-toggle[_ngcontent-%COMP%]{display:block;background:none;border:0;padding:0 6px;margin-right:-4px;cursor:pointer}.overlay-menu[_ngcontent-%COMP%]{background-color:#fafafa;border:1px solid grey;margin-top:8px;font-size:1rem}.overlay-menu__title[_ngcontent-%COMP%], .overlay-menu__item[_ngcontent-%COMP%]{padding:10px;border-bottom:1px solid grey}.overlay-menu__title[_ngcontent-%COMP%]:last-child, .overlay-menu__item[_ngcontent-%COMP%]:last-child{border:none}.overlay-menu__title[_ngcontent-%COMP%]{padding-left:6px;padding-right:6px}.overlay-menu__item[_ngcontent-%COMP%]{display:flex;align-items:center;cursor:pointer;font-size:.875em}.overlay-menu__item[_ngcontent-%COMP%]:hover{background-color:#fff2cc}.overlay-menu__itemIcon[_ngcontent-%COMP%]{height:1.25em;width:1.25em;margin-right:6px}"] });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(CaseFileViewOverlayMenuComponent, [{
        type: Component,
        args: [{ selector: 'ccd-case-file-view-overlay-menu', template: "<div>\n  <button type=\"button\" class=\"overlay-toggle\"\n          (click)=\"$event.stopPropagation(); isOpen = !isOpen\"\n          cdkOverlayOrigin #trigger=\"cdkOverlayOrigin\">\n    <ng-content select=\"[trigger]\"></ng-content>\n  </button>\n\n  <ng-template\n    cdkConnectedOverlay\n    [cdkConnectedOverlayOrigin]=\"trigger\"\n    [cdkConnectedOverlayOpen]=\"isOpen\"\n    [cdkConnectedOverlayHasBackdrop]=\"true\"\n    [cdkConnectedOverlayBackdropClass]=\"'cdk-overlay-transparent-backdrop'\"\n    (backdropClick)=\"closeOverlay()\"\n  >\n    <div class=\"overlay-menu\">\n      <ng-container *ngIf=\"title\">\n        <div class=\"overlay-menu__title\">{{title}}</div>\n      </ng-container>\n\n      <ng-container *ngFor=\"let item of menuItems\">\n        <div class=\"overlay-menu__item\" (click)=\"item.actionFn(); closeOverlay();\">\n          <img *ngIf=\"item.iconSrc\" [src]=\"item.iconSrc\" class=\"overlay-menu__itemIcon\" alt=\"{{title}} icon'\" />\n          <div class=\"overlay-menu__actionText\">{{item.actionText}}</div>\n        </div>\n      </ng-container>\n    </div>\n  </ng-template>\n</div>\n", styles: [".overlay-toggle{display:block;background:none;border:0;padding:0 6px;margin-right:-4px;cursor:pointer}.overlay-menu{background-color:#fafafa;border:1px solid grey;margin-top:8px;font-size:1rem}.overlay-menu__title,.overlay-menu__item{padding:10px;border-bottom:1px solid grey}.overlay-menu__title:last-child,.overlay-menu__item:last-child{border:none}.overlay-menu__title{padding-left:6px;padding-right:6px}.overlay-menu__item{display:flex;align-items:center;cursor:pointer;font-size:.875em}.overlay-menu__item:hover{background-color:#fff2cc}.overlay-menu__itemIcon{height:1.25em;width:1.25em;margin-right:6px}\n"] }]
    }], null, { title: [{
            type: Input
        }], menuItems: [{
            type: Input
        }], isOpen: [{
            type: Input
        }], isOpenChange: [{
            type: Output
        }] }); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FzZS1maWxlLXZpZXctb3ZlcmxheS1tZW51LmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2NjZC1jYXNlLXVpLXRvb2xraXQvc3JjL2xpYi9zaGFyZWQvY29tcG9uZW50cy9wYWxldHRlL2Nhc2UtZmlsZS12aWV3L2NvbXBvbmVudHMvc2hhcmVkL2Nhc2UtZmlsZS12aWV3LW92ZXJsYXktbWVudS9jYXNlLWZpbGUtdmlldy1vdmVybGF5LW1lbnUuY29tcG9uZW50LnRzIiwiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvY2NkLWNhc2UtdWktdG9vbGtpdC9zcmMvbGliL3NoYXJlZC9jb21wb25lbnRzL3BhbGV0dGUvY2FzZS1maWxlLXZpZXcvY29tcG9uZW50cy9zaGFyZWQvY2FzZS1maWxlLXZpZXctb3ZlcmxheS1tZW51L2Nhc2UtZmlsZS12aWV3LW92ZXJsYXktbWVudS5jb21wb25lbnQuaHRtbCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLFlBQVksRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLE1BQU0sZUFBZSxDQUFDOzs7OztJQ2dCakUsNkJBQTRCO0lBQzFCLDhCQUFpQztJQUFBLFlBQVM7SUFBQSxpQkFBTTtJQUNsRCwwQkFBZTs7O0lBRG9CLGVBQVM7SUFBVCxrQ0FBUzs7O0lBS3hDLDBCQUFzRzs7OztJQUF4Qiw0REFBcUI7SUFBekUsdURBQW9COzs7O0lBRmxELDZCQUE2QztJQUMzQyw4QkFBMkU7SUFBM0Msc1BBQVMsa0JBQWUsU0FBRSxlQUFBLHFCQUFjLENBQUEsSUFBRTtJQUN4RSw4R0FBc0c7SUFDdEcsOEJBQXNDO0lBQUEsWUFBbUI7SUFBQSxpQkFBTSxFQUFBO0lBRW5FLDBCQUFlOzs7SUFITCxlQUFrQjtJQUFsQixzQ0FBa0I7SUFDYyxlQUFtQjtJQUFuQix3Q0FBbUI7OztJQVIvRCw4QkFBMEI7SUFDeEIsaUhBRWU7SUFFZixpSEFLZTtJQUNqQixpQkFBTTs7O0lBVlcsZUFBVztJQUFYLG1DQUFXO0lBSUssZUFBWTtJQUFaLDBDQUFZOzs7O0FEWmpELE1BQU0sT0FBTyxnQ0FBZ0M7SUFMN0M7UUFNa0IsVUFBSyxHQUFXLEVBQUUsQ0FBQztRQUduQixXQUFNLEdBQUcsS0FBSyxDQUFDO1FBQ2QsaUJBQVksR0FBRyxJQUFJLFlBQVksRUFBVyxDQUFDO0tBUTdEO0lBTlEsWUFBWTtRQUNqQixNQUFNLE1BQU0sR0FBRyxLQUFLLENBQUM7UUFFckIsSUFBSSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUM7UUFDckIsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDakMsQ0FBQzs7Z0hBWlUsZ0NBQWdDO21GQUFoQyxnQ0FBZ0M7O1FDUjdDLDJCQUFLLG1CQUFBO1FBRUssNEdBQVMsd0JBQXdCLHFDQUFtQjtRQUUxRCxrQkFBNEM7UUFDOUMsaUJBQVM7UUFFVCxpR0FvQmM7UUFkWixrSUFBaUIsa0JBQWMsSUFBQztRQWVwQyxpQkFBTTs7O1FBbkJGLGVBQXFDO1FBQXJDLCtDQUFxQyx1Q0FBQSx3Q0FBQSx3RUFBQTs7dUZERDVCLGdDQUFnQztjQUw1QyxTQUFTOzJCQUNFLGlDQUFpQztnQkFLM0IsS0FBSztrQkFBcEIsS0FBSztZQUNVLFNBQVM7a0JBQXhCLEtBQUs7WUFFVSxNQUFNO2tCQUFyQixLQUFLO1lBQ1csWUFBWTtrQkFBNUIsTUFBTSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgRXZlbnRFbWl0dGVyLCBJbnB1dCwgT3V0cHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDYXNlRmlsZVZpZXdPdmVybGF5TWVudUl0ZW0gfSBmcm9tICcuL2Nhc2UtZmlsZS12aWV3LW92ZXJsYXktbWVudS1pdGVtLm1vZGVsJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnY2NkLWNhc2UtZmlsZS12aWV3LW92ZXJsYXktbWVudScsXG4gIHRlbXBsYXRlVXJsOiAnLi9jYXNlLWZpbGUtdmlldy1vdmVybGF5LW1lbnUuY29tcG9uZW50Lmh0bWwnLFxuICBzdHlsZVVybHM6IFsnLi9jYXNlLWZpbGUtdmlldy1vdmVybGF5LW1lbnUuY29tcG9uZW50LnNjc3MnXVxufSlcbmV4cG9ydCBjbGFzcyBDYXNlRmlsZVZpZXdPdmVybGF5TWVudUNvbXBvbmVudCB7XG4gIEBJbnB1dCgpIHB1YmxpYyB0aXRsZTogc3RyaW5nID0gJyc7XG4gIEBJbnB1dCgpIHB1YmxpYyBtZW51SXRlbXM6IENhc2VGaWxlVmlld092ZXJsYXlNZW51SXRlbVtdO1xuXG4gIEBJbnB1dCgpIHB1YmxpYyBpc09wZW4gPSBmYWxzZTtcbiAgQE91dHB1dCgpIHB1YmxpYyBpc09wZW5DaGFuZ2UgPSBuZXcgRXZlbnRFbWl0dGVyPGJvb2xlYW4+KCk7XG5cbiAgcHVibGljIGNsb3NlT3ZlcmxheSgpOiB2b2lkIHtcbiAgICBjb25zdCBpc09wZW4gPSBmYWxzZTtcblxuICAgIHRoaXMuaXNPcGVuID0gaXNPcGVuO1xuICAgIHRoaXMuaXNPcGVuQ2hhbmdlLmVtaXQoaXNPcGVuKTtcbiAgfVxufVxuIiwiPGRpdj5cbiAgPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJvdmVybGF5LXRvZ2dsZVwiXG4gICAgICAgICAgKGNsaWNrKT1cIiRldmVudC5zdG9wUHJvcGFnYXRpb24oKTsgaXNPcGVuID0gIWlzT3BlblwiXG4gICAgICAgICAgY2RrT3ZlcmxheU9yaWdpbiAjdHJpZ2dlcj1cImNka092ZXJsYXlPcmlnaW5cIj5cbiAgICA8bmctY29udGVudCBzZWxlY3Q9XCJbdHJpZ2dlcl1cIj48L25nLWNvbnRlbnQ+XG4gIDwvYnV0dG9uPlxuXG4gIDxuZy10ZW1wbGF0ZVxuICAgIGNka0Nvbm5lY3RlZE92ZXJsYXlcbiAgICBbY2RrQ29ubmVjdGVkT3ZlcmxheU9yaWdpbl09XCJ0cmlnZ2VyXCJcbiAgICBbY2RrQ29ubmVjdGVkT3ZlcmxheU9wZW5dPVwiaXNPcGVuXCJcbiAgICBbY2RrQ29ubmVjdGVkT3ZlcmxheUhhc0JhY2tkcm9wXT1cInRydWVcIlxuICAgIFtjZGtDb25uZWN0ZWRPdmVybGF5QmFja2Ryb3BDbGFzc109XCInY2RrLW92ZXJsYXktdHJhbnNwYXJlbnQtYmFja2Ryb3AnXCJcbiAgICAoYmFja2Ryb3BDbGljayk9XCJjbG9zZU92ZXJsYXkoKVwiXG4gID5cbiAgICA8ZGl2IGNsYXNzPVwib3ZlcmxheS1tZW51XCI+XG4gICAgICA8bmctY29udGFpbmVyICpuZ0lmPVwidGl0bGVcIj5cbiAgICAgICAgPGRpdiBjbGFzcz1cIm92ZXJsYXktbWVudV9fdGl0bGVcIj57e3RpdGxlfX08L2Rpdj5cbiAgICAgIDwvbmctY29udGFpbmVyPlxuXG4gICAgICA8bmctY29udGFpbmVyICpuZ0Zvcj1cImxldCBpdGVtIG9mIG1lbnVJdGVtc1wiPlxuICAgICAgICA8ZGl2IGNsYXNzPVwib3ZlcmxheS1tZW51X19pdGVtXCIgKGNsaWNrKT1cIml0ZW0uYWN0aW9uRm4oKTsgY2xvc2VPdmVybGF5KCk7XCI+XG4gICAgICAgICAgPGltZyAqbmdJZj1cIml0ZW0uaWNvblNyY1wiIFtzcmNdPVwiaXRlbS5pY29uU3JjXCIgY2xhc3M9XCJvdmVybGF5LW1lbnVfX2l0ZW1JY29uXCIgYWx0PVwie3t0aXRsZX19IGljb24nXCIgLz5cbiAgICAgICAgICA8ZGl2IGNsYXNzPVwib3ZlcmxheS1tZW51X19hY3Rpb25UZXh0XCI+e3tpdGVtLmFjdGlvblRleHR9fTwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvbmctY29udGFpbmVyPlxuICAgIDwvZGl2PlxuICA8L25nLXRlbXBsYXRlPlxuPC9kaXY+XG4iXX0=