import { Component, Input } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
import * as i2 from "rpx-xui-translation";
function AlertComponent_ng_container_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementContainerStart(0);
    i0.ɵɵnamespaceSVG();
    i0.ɵɵelementStart(1, "svg", 5);
    i0.ɵɵelement(2, "path", 6);
    i0.ɵɵelementEnd();
    i0.ɵɵelementContainerEnd();
} }
function AlertComponent_ng_container_3_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementContainerStart(0);
    i0.ɵɵnamespaceSVG();
    i0.ɵɵelementStart(1, "svg", 5);
    i0.ɵɵelement(2, "path", 6);
    i0.ɵɵelementEnd();
    i0.ɵɵelementContainerEnd();
} }
function AlertComponent_ng_container_4_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementContainerStart(0);
    i0.ɵɵnamespaceSVG();
    i0.ɵɵelementStart(1, "svg", 5);
    i0.ɵɵelement(2, "path", 7);
    i0.ɵɵelementEnd();
    i0.ɵɵelementContainerEnd();
} }
function AlertComponent_ng_container_5_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementContainerStart(0);
    i0.ɵɵnamespaceSVG();
    i0.ɵɵelementStart(1, "svg", 5);
    i0.ɵɵelement(2, "path", 8);
    i0.ɵɵelementEnd();
    i0.ɵɵelementContainerEnd();
} }
const _c0 = ["*"];
export var AlertMessageType;
(function (AlertMessageType) {
    AlertMessageType["WARNING"] = "warning";
    AlertMessageType["SUCCESS"] = "success";
    AlertMessageType["ERROR"] = "error";
    AlertMessageType["INFORMATION"] = "information";
})(AlertMessageType || (AlertMessageType = {}));
export class AlertComponent {
    constructor() {
        this.showIcon = true;
        this.alertMessageType = AlertMessageType;
    }
}
// confirmation type has been removed as per EUI-3232
AlertComponent.TYPE_WARNING = 'warning';
AlertComponent.TYPE_SUCCESS = 'success';
AlertComponent.TYPE_ERROR = 'error';
AlertComponent.TYPE_INFORMATION = 'information';
AlertComponent.ɵfac = function AlertComponent_Factory(t) { return new (t || AlertComponent)(); };
AlertComponent.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: AlertComponent, selectors: [["cut-alert"]], inputs: { type: "type", showIcon: "showIcon" }, ngContentSelectors: _c0, decls: 11, vars: 12, consts: [[1, "hmcts-banner"], [3, "ngSwitch"], [4, "ngSwitchCase"], [1, "hmcts-banner__message"], [1, "hmcts-banner__assistive"], ["fill", "currentColor", "role", "presentation", "focusable", "false", "xmlns", "http://www.w3.org/2000/svg", "viewBox", "0 0 25 25", "height", "25", "width", "25", 1, "hmcts-banner__icon"], ["d", "M13.6,15.4h-2.3v-4.5h2.3V15.4z M13.6,19.8h-2.3v-2.2h2.3V19.8z M0,23.2h25L12.5,2L0,23.2z"], ["d", "M25,6.2L8.7,23.2L0,14.1l4-4.2l4.7,4.9L21,2L25,6.2z"], ["d", "M13.7,18.5h-2.4v-2.4h2.4V18.5z M12.5,13.7c-0.7,0-1.2-0.5-1.2-1.2V7.7c0-0.7,0.5-1.2,1.2-1.2s1.2,0.5,1.2,1.2v4.8\n      C13.7,13.2,13.2,13.7,12.5,13.7z M12.5,0.5c-6.6,0-12,5.4-12,12s5.4,12,12,12s12-5.4,12-12S19.1,0.5,12.5,0.5z"]], template: function AlertComponent_Template(rf, ctx) { if (rf & 1) {
        i0.ɵɵprojectionDef();
        i0.ɵɵelementStart(0, "div", 0);
        i0.ɵɵelementContainerStart(1, 1);
        i0.ɵɵtemplate(2, AlertComponent_ng_container_2_Template, 3, 0, "ng-container", 2);
        i0.ɵɵtemplate(3, AlertComponent_ng_container_3_Template, 3, 0, "ng-container", 2);
        i0.ɵɵtemplate(4, AlertComponent_ng_container_4_Template, 3, 0, "ng-container", 2);
        i0.ɵɵtemplate(5, AlertComponent_ng_container_5_Template, 3, 0, "ng-container", 2);
        i0.ɵɵelementContainerEnd();
        i0.ɵɵelementStart(6, "div", 3)(7, "span", 4);
        i0.ɵɵtext(8);
        i0.ɵɵpipe(9, "rpxTranslate");
        i0.ɵɵelementEnd();
        i0.ɵɵprojection(10);
        i0.ɵɵelementEnd()();
    } if (rf & 2) {
        i0.ɵɵclassProp("hmcts-banner--warning", ctx.type === ctx.alertMessageType.WARNING || ctx.type === ctx.alertMessageType.ERROR)("hmcts-banner--success", ctx.type === ctx.alertMessageType.SUCCESS);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngSwitch", ctx.type);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngSwitchCase", ctx.alertMessageType.WARNING);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngSwitchCase", ctx.alertMessageType.ERROR);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngSwitchCase", ctx.alertMessageType.SUCCESS);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngSwitchCase", ctx.alertMessageType.INFORMATION);
        i0.ɵɵadvance(3);
        i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(9, 10, ctx.type));
    } }, dependencies: [i1.NgSwitch, i1.NgSwitchCase, i2.RpxTranslatePipe], styles: [".alert[_ngcontent-%COMP%]:after{content:\"\";display:table;clear:both}.alert[_ngcontent-%COMP%]{color:#fff;padding:10px;font-size:16px;line-height:1.25}.alert-error[_ngcontent-%COMP%]{background-color:#df3034}.alert-warning[_ngcontent-%COMP%]{background-color:#912b88}.alert-success[_ngcontent-%COMP%], .alert-confirmation[_ngcontent-%COMP%]{background-color:#006435}.alert-success[_ngcontent-%COMP%]   .icon-tick[_ngcontent-%COMP%], .alert-confirmation[_ngcontent-%COMP%]   .icon-tick[_ngcontent-%COMP%]{height:20px;width:20px;background-size:cover}.alert-message[_ngcontent-%COMP%]{color:#fff;display:table-cell;font-weight:700}.alert-message[_ngcontent-%COMP%]   a[_ngcontent-%COMP%], .alert-message[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]:visited{color:#fff;text-decoration:underline}.alert[_ngcontent-%COMP%]   .icon[_ngcontent-%COMP%]{display:table-cell;vertical-align:top}.alert[_ngcontent-%COMP%]   .icon[_ngcontent-%COMP%] + .alert-message[_ngcontent-%COMP%]{padding-left:10px}"] });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(AlertComponent, [{
        type: Component,
        args: [{ selector: 'cut-alert', template: "<div\n  class=\"hmcts-banner\"\n  [class.hmcts-banner--warning]=\"type === alertMessageType.WARNING || type === alertMessageType.ERROR\"\n  [class.hmcts-banner--success]=\"type === alertMessageType.SUCCESS\"\n>\n  <ng-container [ngSwitch]=\"type\">\n    <ng-container *ngSwitchCase=\"alertMessageType.WARNING\">\n      <svg class=\"hmcts-banner__icon\" fill=\"currentColor\" role=\"presentation\" focusable=\"false\"\n        xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 25 25\" height=\"25\" width=\"25\">\n        <path d=\"M13.6,15.4h-2.3v-4.5h2.3V15.4z M13.6,19.8h-2.3v-2.2h2.3V19.8z M0,23.2h25L12.5,2L0,23.2z\"></path>\n      </svg>\n    </ng-container>\n    <ng-container *ngSwitchCase=\"alertMessageType.ERROR\">\n      <svg class=\"hmcts-banner__icon\" fill=\"currentColor\" role=\"presentation\" focusable=\"false\"\n        xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 25 25\" height=\"25\" width=\"25\">\n        <path d=\"M13.6,15.4h-2.3v-4.5h2.3V15.4z M13.6,19.8h-2.3v-2.2h2.3V19.8z M0,23.2h25L12.5,2L0,23.2z\"></path>\n      </svg>\n    </ng-container>\n    <ng-container *ngSwitchCase=\"alertMessageType.SUCCESS\">\n      <svg class=\"hmcts-banner__icon\" fill=\"currentColor\" role=\"presentation\" focusable=\"false\"\n        xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 25 25\" height=\"25\" width=\"25\">\n        <path d=\"M25,6.2L8.7,23.2L0,14.1l4-4.2l4.7,4.9L21,2L25,6.2z\"></path>\n      </svg>\n    </ng-container>\n    <ng-container *ngSwitchCase=\"alertMessageType.INFORMATION\">\n      <svg class=\"hmcts-banner__icon\" fill=\"currentColor\" role=\"presentation\" focusable=\"false\"\n        xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 25 25\" height=\"25\" width=\"25\">\n        <path d=\"M13.7,18.5h-2.4v-2.4h2.4V18.5z M12.5,13.7c-0.7,0-1.2-0.5-1.2-1.2V7.7c0-0.7,0.5-1.2,1.2-1.2s1.2,0.5,1.2,1.2v4.8\n      C13.7,13.2,13.2,13.7,12.5,13.7z M12.5,0.5c-6.6,0-12,5.4-12,12s5.4,12,12,12s12-5.4,12-12S19.1,0.5,12.5,0.5z\"></path>\n      </svg>\n    </ng-container>\n  </ng-container>\n  <div class=\"hmcts-banner__message\">\n    <span class=\"hmcts-banner__assistive\">{{type | rpxTranslate}}</span>\n    <ng-content></ng-content>\n  </div>\n</div>\n", styles: [".alert:after{content:\"\";display:table;clear:both}.alert{color:#fff;padding:10px;font-size:16px;line-height:1.25}.alert-error{background-color:#df3034}.alert-warning{background-color:#912b88}.alert-success,.alert-confirmation{background-color:#006435}.alert-success .icon-tick,.alert-confirmation .icon-tick{height:20px;width:20px;background-size:cover}.alert-message{color:#fff;display:table-cell;font-weight:700}.alert-message a,.alert-message a:visited{color:#fff;text-decoration:underline}.alert .icon{display:table-cell;vertical-align:top}.alert .icon+.alert-message{padding-left:10px}\n"] }]
    }], null, { type: [{
            type: Input
        }], showIcon: [{
            type: Input
        }] }); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWxlcnQuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvY2NkLWNhc2UtdWktdG9vbGtpdC9zcmMvbGliL2NvbXBvbmVudHMvYmFubmVycy9hbGVydC9hbGVydC5jb21wb25lbnQudHMiLCIuLi8uLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9jY2QtY2FzZS11aS10b29sa2l0L3NyYy9saWIvY29tcG9uZW50cy9iYW5uZXJzL2FsZXJ0L2FsZXJ0LmNvbXBvbmVudC5odG1sIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFFLE1BQU0sZUFBZSxDQUFDOzs7OztJQ003Qyw2QkFBdUQ7SUFDckQsbUJBQ2dGO0lBRGhGLDhCQUNnRjtJQUM5RSwwQkFBeUc7SUFDM0csaUJBQU07SUFDUiwwQkFBZTs7O0lBQ2YsNkJBQXFEO0lBQ25ELG1CQUNnRjtJQURoRiw4QkFDZ0Y7SUFDOUUsMEJBQXlHO0lBQzNHLGlCQUFNO0lBQ1IsMEJBQWU7OztJQUNmLDZCQUF1RDtJQUNyRCxtQkFDZ0Y7SUFEaEYsOEJBQ2dGO0lBQzlFLDBCQUFvRTtJQUN0RSxpQkFBTTtJQUNSLDBCQUFlOzs7SUFDZiw2QkFBMkQ7SUFDekQsbUJBQ2dGO0lBRGhGLDhCQUNnRjtJQUM5RSwwQkFDaUg7SUFDbkgsaUJBQU07SUFDUiwwQkFBZTs7O0FENUJuQixNQUFNLENBQU4sSUFBWSxnQkFLWDtBQUxELFdBQVksZ0JBQWdCO0lBQzFCLHVDQUFtQixDQUFBO0lBQ25CLHVDQUFtQixDQUFBO0lBQ25CLG1DQUFlLENBQUE7SUFDZiwrQ0FBMkIsQ0FBQTtBQUM3QixDQUFDLEVBTFcsZ0JBQWdCLEtBQWhCLGdCQUFnQixRQUszQjtBQVNELE1BQU0sT0FBTyxjQUFjO0lBUDNCO1FBbUJTLGFBQVEsR0FBRyxJQUFJLENBQUM7UUFFaEIscUJBQWdCLEdBQUcsZ0JBQWdCLENBQUM7S0FDNUM7O0FBYkMscURBQXFEO0FBQzlCLDJCQUFZLEdBQUcsU0FBUyxDQUFDO0FBQ3pCLDJCQUFZLEdBQUcsU0FBUyxDQUFDO0FBQ3pCLHlCQUFVLEdBQUcsT0FBTyxDQUFDO0FBQ3JCLCtCQUFnQixHQUFHLGFBQWEsQ0FBQzs0RUFON0MsY0FBYztpRUFBZCxjQUFjOztRQ2hCM0IsOEJBSUM7UUFDQyxnQ0FBZ0M7UUFDOUIsaUZBS2U7UUFDZixpRkFLZTtRQUNmLGlGQUtlO1FBQ2YsaUZBTWU7UUFDakIsMEJBQWU7UUFDZiw4QkFBbUMsY0FBQTtRQUNLLFlBQXVCOztRQUFBLGlCQUFPO1FBQ3BFLG1CQUF5QjtRQUMzQixpQkFBTSxFQUFBOztRQWpDTiw2SEFBb0csb0VBQUE7UUFHdEYsZUFBaUI7UUFBakIsbUNBQWlCO1FBQ2QsZUFBc0M7UUFBdEMsMkRBQXNDO1FBTXRDLGVBQW9DO1FBQXBDLHlEQUFvQztRQU1wQyxlQUFzQztRQUF0QywyREFBc0M7UUFNdEMsZUFBMEM7UUFBMUMsK0RBQTBDO1FBU25CLGVBQXVCO1FBQXZCLHFEQUF1Qjs7dUZEakJwRCxjQUFjO2NBUDFCLFNBQVM7MkJBQ0UsV0FBVztnQkFlZCxJQUFJO2tCQURWLEtBQUs7WUFJQyxRQUFRO2tCQURkLEtBQUsiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIElucHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmV4cG9ydCBlbnVtIEFsZXJ0TWVzc2FnZVR5cGUge1xuICBXQVJOSU5HID0gJ3dhcm5pbmcnLFxuICBTVUNDRVNTID0gJ3N1Y2Nlc3MnLFxuICBFUlJPUiA9ICdlcnJvcicsXG4gIElORk9STUFUSU9OID0gJ2luZm9ybWF0aW9uJ1xufVxuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdjdXQtYWxlcnQnLFxuICB0ZW1wbGF0ZVVybDogJy4vYWxlcnQuY29tcG9uZW50Lmh0bWwnLFxuICBzdHlsZVVybHM6IFtcbiAgICAnLi9hbGVydC5jb21wb25lbnQuc2NzcydcbiAgXVxufSlcbmV4cG9ydCBjbGFzcyBBbGVydENvbXBvbmVudCB7XG5cbiAgLy8gY29uZmlybWF0aW9uIHR5cGUgaGFzIGJlZW4gcmVtb3ZlZCBhcyBwZXIgRVVJLTMyMzJcbiAgcHVibGljIHN0YXRpYyByZWFkb25seSBUWVBFX1dBUk5JTkcgPSAnd2FybmluZyc7XG4gIHB1YmxpYyBzdGF0aWMgcmVhZG9ubHkgVFlQRV9TVUNDRVNTID0gJ3N1Y2Nlc3MnO1xuICBwdWJsaWMgc3RhdGljIHJlYWRvbmx5IFRZUEVfRVJST1IgPSAnZXJyb3InO1xuICBwdWJsaWMgc3RhdGljIHJlYWRvbmx5IFRZUEVfSU5GT1JNQVRJT04gPSAnaW5mb3JtYXRpb24nO1xuXG4gIEBJbnB1dCgpXG4gIHB1YmxpYyB0eXBlOiBBbGVydE1lc3NhZ2VUeXBlO1xuXG4gIEBJbnB1dCgpXG4gIHB1YmxpYyBzaG93SWNvbiA9IHRydWU7XG5cbiAgcHVibGljIGFsZXJ0TWVzc2FnZVR5cGUgPSBBbGVydE1lc3NhZ2VUeXBlO1xufVxuIiwiPGRpdlxuICBjbGFzcz1cImhtY3RzLWJhbm5lclwiXG4gIFtjbGFzcy5obWN0cy1iYW5uZXItLXdhcm5pbmddPVwidHlwZSA9PT0gYWxlcnRNZXNzYWdlVHlwZS5XQVJOSU5HIHx8IHR5cGUgPT09IGFsZXJ0TWVzc2FnZVR5cGUuRVJST1JcIlxuICBbY2xhc3MuaG1jdHMtYmFubmVyLS1zdWNjZXNzXT1cInR5cGUgPT09IGFsZXJ0TWVzc2FnZVR5cGUuU1VDQ0VTU1wiXG4+XG4gIDxuZy1jb250YWluZXIgW25nU3dpdGNoXT1cInR5cGVcIj5cbiAgICA8bmctY29udGFpbmVyICpuZ1N3aXRjaENhc2U9XCJhbGVydE1lc3NhZ2VUeXBlLldBUk5JTkdcIj5cbiAgICAgIDxzdmcgY2xhc3M9XCJobWN0cy1iYW5uZXJfX2ljb25cIiBmaWxsPVwiY3VycmVudENvbG9yXCIgcm9sZT1cInByZXNlbnRhdGlvblwiIGZvY3VzYWJsZT1cImZhbHNlXCJcbiAgICAgICAgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiIHZpZXdCb3g9XCIwIDAgMjUgMjVcIiBoZWlnaHQ9XCIyNVwiIHdpZHRoPVwiMjVcIj5cbiAgICAgICAgPHBhdGggZD1cIk0xMy42LDE1LjRoLTIuM3YtNC41aDIuM1YxNS40eiBNMTMuNiwxOS44aC0yLjN2LTIuMmgyLjNWMTkuOHogTTAsMjMuMmgyNUwxMi41LDJMMCwyMy4yelwiPjwvcGF0aD5cbiAgICAgIDwvc3ZnPlxuICAgIDwvbmctY29udGFpbmVyPlxuICAgIDxuZy1jb250YWluZXIgKm5nU3dpdGNoQ2FzZT1cImFsZXJ0TWVzc2FnZVR5cGUuRVJST1JcIj5cbiAgICAgIDxzdmcgY2xhc3M9XCJobWN0cy1iYW5uZXJfX2ljb25cIiBmaWxsPVwiY3VycmVudENvbG9yXCIgcm9sZT1cInByZXNlbnRhdGlvblwiIGZvY3VzYWJsZT1cImZhbHNlXCJcbiAgICAgICAgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiIHZpZXdCb3g9XCIwIDAgMjUgMjVcIiBoZWlnaHQ9XCIyNVwiIHdpZHRoPVwiMjVcIj5cbiAgICAgICAgPHBhdGggZD1cIk0xMy42LDE1LjRoLTIuM3YtNC41aDIuM1YxNS40eiBNMTMuNiwxOS44aC0yLjN2LTIuMmgyLjNWMTkuOHogTTAsMjMuMmgyNUwxMi41LDJMMCwyMy4yelwiPjwvcGF0aD5cbiAgICAgIDwvc3ZnPlxuICAgIDwvbmctY29udGFpbmVyPlxuICAgIDxuZy1jb250YWluZXIgKm5nU3dpdGNoQ2FzZT1cImFsZXJ0TWVzc2FnZVR5cGUuU1VDQ0VTU1wiPlxuICAgICAgPHN2ZyBjbGFzcz1cImhtY3RzLWJhbm5lcl9faWNvblwiIGZpbGw9XCJjdXJyZW50Q29sb3JcIiByb2xlPVwicHJlc2VudGF0aW9uXCIgZm9jdXNhYmxlPVwiZmFsc2VcIlxuICAgICAgICB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIgdmlld0JveD1cIjAgMCAyNSAyNVwiIGhlaWdodD1cIjI1XCIgd2lkdGg9XCIyNVwiPlxuICAgICAgICA8cGF0aCBkPVwiTTI1LDYuMkw4LjcsMjMuMkwwLDE0LjFsNC00LjJsNC43LDQuOUwyMSwyTDI1LDYuMnpcIj48L3BhdGg+XG4gICAgICA8L3N2Zz5cbiAgICA8L25nLWNvbnRhaW5lcj5cbiAgICA8bmctY29udGFpbmVyICpuZ1N3aXRjaENhc2U9XCJhbGVydE1lc3NhZ2VUeXBlLklORk9STUFUSU9OXCI+XG4gICAgICA8c3ZnIGNsYXNzPVwiaG1jdHMtYmFubmVyX19pY29uXCIgZmlsbD1cImN1cnJlbnRDb2xvclwiIHJvbGU9XCJwcmVzZW50YXRpb25cIiBmb2N1c2FibGU9XCJmYWxzZVwiXG4gICAgICAgIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIiB2aWV3Qm94PVwiMCAwIDI1IDI1XCIgaGVpZ2h0PVwiMjVcIiB3aWR0aD1cIjI1XCI+XG4gICAgICAgIDxwYXRoIGQ9XCJNMTMuNywxOC41aC0yLjR2LTIuNGgyLjRWMTguNXogTTEyLjUsMTMuN2MtMC43LDAtMS4yLTAuNS0xLjItMS4yVjcuN2MwLTAuNywwLjUtMS4yLDEuMi0xLjJzMS4yLDAuNSwxLjIsMS4ydjQuOFxuICAgICAgQzEzLjcsMTMuMiwxMy4yLDEzLjcsMTIuNSwxMy43eiBNMTIuNSwwLjVjLTYuNiwwLTEyLDUuNC0xMiwxMnM1LjQsMTIsMTIsMTJzMTItNS40LDEyLTEyUzE5LjEsMC41LDEyLjUsMC41elwiPjwvcGF0aD5cbiAgICAgIDwvc3ZnPlxuICAgIDwvbmctY29udGFpbmVyPlxuICA8L25nLWNvbnRhaW5lcj5cbiAgPGRpdiBjbGFzcz1cImhtY3RzLWJhbm5lcl9fbWVzc2FnZVwiPlxuICAgIDxzcGFuIGNsYXNzPVwiaG1jdHMtYmFubmVyX19hc3Npc3RpdmVcIj57e3R5cGUgfCBycHhUcmFuc2xhdGV9fTwvc3Bhbj5cbiAgICA8bmctY29udGVudD48L25nLWNvbnRlbnQ+XG4gIDwvZGl2PlxuPC9kaXY+XG4iXX0=