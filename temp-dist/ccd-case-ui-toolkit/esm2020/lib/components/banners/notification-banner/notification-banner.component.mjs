import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NotificationBannerType } from './enums';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
function NotificationBannerComponent_div_0_ng_container_7_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementContainerStart(0);
    i0.ɵɵnamespaceSVG();
    i0.ɵɵelementStart(1, "svg", 10);
    i0.ɵɵelement(2, "path", 11);
    i0.ɵɵelementEnd();
    i0.ɵɵelementContainerEnd();
} }
function NotificationBannerComponent_div_0_ng_container_8_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementContainerStart(0);
    i0.ɵɵnamespaceSVG();
    i0.ɵɵelementStart(1, "svg", 10);
    i0.ɵɵelement(2, "path", 11);
    i0.ɵɵelementEnd();
    i0.ɵɵelementContainerEnd();
} }
function NotificationBannerComponent_div_0_ng_container_9_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementContainerStart(0);
    i0.ɵɵnamespaceSVG();
    i0.ɵɵelementStart(1, "svg", 10);
    i0.ɵɵelement(2, "path", 12);
    i0.ɵɵelementEnd();
    i0.ɵɵelementContainerEnd();
} }
function NotificationBannerComponent_div_0_ng_container_10_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementContainerStart(0);
    i0.ɵɵnamespaceSVG();
    i0.ɵɵelementStart(1, "svg", 10);
    i0.ɵɵelement(2, "path", 13);
    i0.ɵɵelementEnd();
    i0.ɵɵelementContainerEnd();
} }
function NotificationBannerComponent_div_0_a_12_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "a", 14);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r5 = i0.ɵɵnextContext(2);
    i0.ɵɵpropertyInterpolate("href", ctx_r5.notificationBannerConfig.linkUrl, i0.ɵɵsanitizeUrl);
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate(ctx_r5.notificationBannerConfig.linkText);
} }
function NotificationBannerComponent_div_0_a_13_Template(rf, ctx) { if (rf & 1) {
    const _r8 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "a", 15);
    i0.ɵɵlistener("click", function NotificationBannerComponent_div_0_a_13_Template_a_click_0_listener() { i0.ɵɵrestoreView(_r8); const ctx_r7 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r7.onLinkClick(ctx_r7.notificationBannerConfig.triggerOutputEventText)); });
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r6 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate(ctx_r6.notificationBannerConfig.linkText);
} }
function NotificationBannerComponent_div_0_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 1)(1, "div", 2)(2, "h2", 3);
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(4, "div", 4)(5, "p", 5);
    i0.ɵɵelementContainerStart(6, 6);
    i0.ɵɵtemplate(7, NotificationBannerComponent_div_0_ng_container_7_Template, 3, 0, "ng-container", 7);
    i0.ɵɵtemplate(8, NotificationBannerComponent_div_0_ng_container_8_Template, 3, 0, "ng-container", 7);
    i0.ɵɵtemplate(9, NotificationBannerComponent_div_0_ng_container_9_Template, 3, 0, "ng-container", 7);
    i0.ɵɵtemplate(10, NotificationBannerComponent_div_0_ng_container_10_Template, 3, 0, "ng-container", 7);
    i0.ɵɵelementContainerEnd();
    i0.ɵɵtext(11);
    i0.ɵɵtemplate(12, NotificationBannerComponent_div_0_a_12_Template, 2, 2, "a", 8);
    i0.ɵɵtemplate(13, NotificationBannerComponent_div_0_a_13_Template, 2, 1, "a", 9);
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵproperty("ngClass", ctx_r0.notificationBannerConfig.headerClass);
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate1(" ", ctx_r0.notificationBannerConfig.headingText, " ");
    i0.ɵɵadvance(3);
    i0.ɵɵproperty("ngSwitch", ctx_r0.notificationBannerConfig.bannerType);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngSwitchCase", ctx_r0.notificationBannerType.WARNING);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngSwitchCase", ctx_r0.notificationBannerType.ERROR);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngSwitchCase", ctx_r0.notificationBannerType.SUCCESS);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngSwitchCase", ctx_r0.notificationBannerType.INFORMATION);
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate1(" ", ctx_r0.notificationBannerConfig.description, " ");
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", ctx_r0.notificationBannerConfig.showLink && !ctx_r0.notificationBannerConfig.triggerOutputEvent);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", ctx_r0.notificationBannerConfig.showLink && ctx_r0.notificationBannerConfig.triggerOutputEvent);
} }
export class NotificationBannerComponent {
    constructor() {
        this.linkClicked = new EventEmitter();
    }
    get notificationBannerType() {
        return NotificationBannerType;
    }
    onLinkClick(triggerOutputEventText) {
        this.linkClicked.emit(triggerOutputEventText);
    }
}
NotificationBannerComponent.ɵfac = function NotificationBannerComponent_Factory(t) { return new (t || NotificationBannerComponent)(); };
NotificationBannerComponent.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: NotificationBannerComponent, selectors: [["ccd-notification-banner"]], inputs: { notificationBannerConfig: "notificationBannerConfig" }, outputs: { linkClicked: "linkClicked" }, decls: 1, vars: 1, consts: [["class", "govuk-notification-banner", "role", "region", "aria-labelledby", "govuk-notification-banner-title", "data-module", "govuk-notification-banner", 3, "ngClass", 4, "ngIf"], ["role", "region", "aria-labelledby", "govuk-notification-banner-title", "data-module", "govuk-notification-banner", 1, "govuk-notification-banner", 3, "ngClass"], [1, "govuk-notification-banner__header"], ["id", "govuk-notification-banner-title", 1, "govuk-notification-banner__title"], [1, "govuk-notification-banner__content"], [1, "govuk-notification-banner__heading"], [3, "ngSwitch"], [4, "ngSwitchCase"], ["class", "govuk-notification-banner__link", 3, "href", 4, "ngIf"], ["class", "govuk-notification-banner__link", "href", "javascript:void(0)", 3, "click", 4, "ngIf"], ["fill", "currentColor", "role", "presentation", "focusable", "false", "xmlns", "http://www.w3.org/2000/svg", "viewBox", "0 0 25 25", "height", "36", "width", "36", 1, "hmcts-banner__icon"], ["d", "M13.6,15.4h-2.3v-4.5h2.3V15.4z M13.6,19.8h-2.3v-2.2h2.3V19.8z M0,23.2h25L12.5,2L0,23.2z"], ["d", "M25,6.2L8.7,23.2L0,14.1l4-4.2l4.7,4.9L21,2L25,6.2z"], ["d", "M13.7,18.5h-2.4v-2.4h2.4V18.5z M12.5,13.7c-0.7,0-1.2-0.5-1.2-1.2V7.7c0-0.7,0.5-1.2,1.2-1.2s1.2,0.5,1.2,1.2v4.8\n          C13.7,13.2,13.2,13.7,12.5,13.7z M12.5,0.5c-6.6,0-12,5.4-12,12s5.4,12,12,12s12-5.4,12-12S19.1,0.5,12.5,0.5z"], [1, "govuk-notification-banner__link", 3, "href"], ["href", "javascript:void(0)", 1, "govuk-notification-banner__link", 3, "click"]], template: function NotificationBannerComponent_Template(rf, ctx) { if (rf & 1) {
        i0.ɵɵtemplate(0, NotificationBannerComponent_div_0_Template, 14, 10, "div", 0);
    } if (rf & 2) {
        i0.ɵɵproperty("ngIf", ctx.notificationBannerConfig);
    } }, dependencies: [i1.NgClass, i1.NgIf, i1.NgSwitch, i1.NgSwitchCase], styles: [".govuk-notification-banner[_ngcontent-%COMP%]   .govuk-notification-banner__content[_ngcontent-%COMP%]   .govuk-notification-banner__heading[_ngcontent-%COMP%]{margin-left:0;max-width:900px}.govuk-notification-banner[_ngcontent-%COMP%]   .govuk-notification-banner__content[_ngcontent-%COMP%]   .govuk-notification-banner__heading[_ngcontent-%COMP%]   .govuk-notification-banner__link[_ngcontent-%COMP%]{margin-left:10px}.notification-banner-information[_ngcontent-%COMP%], .notification-banner-error[_ngcontent-%COMP%]{background-color:#d4351c;border:5px solid #d4351c}.notification-banner-warning[_ngcontent-%COMP%]{background-color:#912b88;border:5px solid #912b88}.notification-banner-success[_ngcontent-%COMP%]{background-color:#006435;border:5px solid #006435}"] });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(NotificationBannerComponent, [{
        type: Component,
        args: [{ selector: 'ccd-notification-banner', template: "<div *ngIf=\"notificationBannerConfig\"\n  class=\"govuk-notification-banner\"\n  [ngClass]=\"notificationBannerConfig.headerClass\"\n  role=\"region\"\n  aria-labelledby=\"govuk-notification-banner-title\"\n  data-module=\"govuk-notification-banner\">\n\n  <div class=\"govuk-notification-banner__header\">\n    <h2 class=\"govuk-notification-banner__title\" id=\"govuk-notification-banner-title\">\n      {{notificationBannerConfig.headingText}}\n    </h2>\n  </div>\n  <div class=\"govuk-notification-banner__content\">\n    <p class=\"govuk-notification-banner__heading\">\n      <ng-container [ngSwitch]=\"notificationBannerConfig.bannerType\">\n        <ng-container *ngSwitchCase=\"notificationBannerType.WARNING\">\n          <svg class=\"hmcts-banner__icon\" fill=\"currentColor\" role=\"presentation\" focusable=\"false\"\n            xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 25 25\" height=\"36\" width=\"36\">\n            <path d=\"M13.6,15.4h-2.3v-4.5h2.3V15.4z M13.6,19.8h-2.3v-2.2h2.3V19.8z M0,23.2h25L12.5,2L0,23.2z\"></path>\n          </svg>\n        </ng-container>\n        <ng-container *ngSwitchCase=\"notificationBannerType.ERROR\">\n          <svg class=\"hmcts-banner__icon\" fill=\"currentColor\" role=\"presentation\" focusable=\"false\"\n            xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 25 25\" height=\"36\" width=\"36\">\n            <path d=\"M13.6,15.4h-2.3v-4.5h2.3V15.4z M13.6,19.8h-2.3v-2.2h2.3V19.8z M0,23.2h25L12.5,2L0,23.2z\"></path>\n          </svg>\n        </ng-container>\n        <ng-container *ngSwitchCase=\"notificationBannerType.SUCCESS\">\n          <svg class=\"hmcts-banner__icon\" fill=\"currentColor\" role=\"presentation\" focusable=\"false\"\n            xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 25 25\" height=\"36\" width=\"36\">\n            <path d=\"M25,6.2L8.7,23.2L0,14.1l4-4.2l4.7,4.9L21,2L25,6.2z\"></path>\n          </svg>\n        </ng-container>\n        <ng-container *ngSwitchCase=\"notificationBannerType.INFORMATION\">\n          <svg class=\"hmcts-banner__icon\" fill=\"currentColor\" role=\"presentation\" focusable=\"false\"\n            xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 25 25\" height=\"36\" width=\"36\">\n            <path d=\"M13.7,18.5h-2.4v-2.4h2.4V18.5z M12.5,13.7c-0.7,0-1.2-0.5-1.2-1.2V7.7c0-0.7,0.5-1.2,1.2-1.2s1.2,0.5,1.2,1.2v4.8\n          C13.7,13.2,13.2,13.7,12.5,13.7z M12.5,0.5c-6.6,0-12,5.4-12,12s5.4,12,12,12s12-5.4,12-12S19.1,0.5,12.5,0.5z\"></path>\n          </svg>\n        </ng-container>\n      </ng-container>\n      {{notificationBannerConfig.description}}\n      <a *ngIf=\"notificationBannerConfig.showLink && !notificationBannerConfig.triggerOutputEvent\"\n        class=\"govuk-notification-banner__link\"\n        href=\"{{notificationBannerConfig.linkUrl}}\">{{notificationBannerConfig.linkText}}</a>\n      <a *ngIf=\"notificationBannerConfig.showLink && notificationBannerConfig.triggerOutputEvent\"\n        class=\"govuk-notification-banner__link\"\n        href=\"javascript:void(0)\"\n        (click)=\"onLinkClick(notificationBannerConfig.triggerOutputEventText)\">{{notificationBannerConfig.linkText}}</a>\n    </p>\n  </div>\n</div>\n", styles: [".govuk-notification-banner .govuk-notification-banner__content .govuk-notification-banner__heading{margin-left:0;max-width:900px}.govuk-notification-banner .govuk-notification-banner__content .govuk-notification-banner__heading .govuk-notification-banner__link{margin-left:10px}.notification-banner-information,.notification-banner-error{background-color:#d4351c;border:5px solid #d4351c}.notification-banner-warning{background-color:#912b88;border:5px solid #912b88}.notification-banner-success{background-color:#006435;border:5px solid #006435}\n"] }]
    }], null, { notificationBannerConfig: [{
            type: Input
        }], linkClicked: [{
            type: Output
        }] }); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibm90aWZpY2F0aW9uLWJhbm5lci5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9jY2QtY2FzZS11aS10b29sa2l0L3NyYy9saWIvY29tcG9uZW50cy9iYW5uZXJzL25vdGlmaWNhdGlvbi1iYW5uZXIvbm90aWZpY2F0aW9uLWJhbm5lci5jb21wb25lbnQudHMiLCIuLi8uLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9jY2QtY2FzZS11aS10b29sa2l0L3NyYy9saWIvY29tcG9uZW50cy9iYW5uZXJzL25vdGlmaWNhdGlvbi1iYW5uZXIvbm90aWZpY2F0aW9uLWJhbm5lci5jb21wb25lbnQuaHRtbCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLFlBQVksRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRXZFLE9BQU8sRUFBRSxzQkFBc0IsRUFBRSxNQUFNLFNBQVMsQ0FBQzs7OztJQ2F6Qyw2QkFBNkQ7SUFDM0QsbUJBQ2dGO0lBRGhGLCtCQUNnRjtJQUM5RSwyQkFBeUc7SUFDM0csaUJBQU07SUFDUiwwQkFBZTs7O0lBQ2YsNkJBQTJEO0lBQ3pELG1CQUNnRjtJQURoRiwrQkFDZ0Y7SUFDOUUsMkJBQXlHO0lBQzNHLGlCQUFNO0lBQ1IsMEJBQWU7OztJQUNmLDZCQUE2RDtJQUMzRCxtQkFDZ0Y7SUFEaEYsK0JBQ2dGO0lBQzlFLDJCQUFvRTtJQUN0RSxpQkFBTTtJQUNSLDBCQUFlOzs7SUFDZiw2QkFBaUU7SUFDL0QsbUJBQ2dGO0lBRGhGLCtCQUNnRjtJQUM5RSwyQkFDaUg7SUFDbkgsaUJBQU07SUFDUiwwQkFBZTs7O0lBR2pCLDZCQUU4QztJQUFBLFlBQXFDO0lBQUEsaUJBQUk7OztJQUFyRiwyRkFBMkM7SUFBQyxlQUFxQztJQUFyQyw4REFBcUM7Ozs7SUFDbkYsNkJBR3lFO0lBQXZFLHlLQUFTLGVBQUEsMEVBQTRELENBQUEsSUFBQztJQUFDLFlBQXFDO0lBQUEsaUJBQUk7OztJQUF6QyxlQUFxQztJQUFyQyw4REFBcUM7OztJQWhEcEgsOEJBSzBDLGFBQUEsWUFBQTtJQUlwQyxZQUNGO0lBQUEsaUJBQUssRUFBQTtJQUVQLDhCQUFnRCxXQUFBO0lBRTVDLGdDQUErRDtJQUM3RCxvR0FLZTtJQUNmLG9HQUtlO0lBQ2Ysb0dBS2U7SUFDZixzR0FNZTtJQUNqQiwwQkFBZTtJQUNmLGFBQ0E7SUFBQSxnRkFFdUY7SUFDdkYsZ0ZBR2tIO0lBQ3BILGlCQUFJLEVBQUEsRUFBQTs7O0lBL0NOLHFFQUFnRDtJQU81QyxlQUNGO0lBREUsNEVBQ0Y7SUFJZ0IsZUFBZ0Q7SUFBaEQscUVBQWdEO0lBQzdDLGVBQTRDO0lBQTVDLG9FQUE0QztJQU01QyxlQUEwQztJQUExQyxrRUFBMEM7SUFNMUMsZUFBNEM7SUFBNUMsb0VBQTRDO0lBTTVDLGVBQWdEO0lBQWhELHdFQUFnRDtJQVFqRSxlQUNBO0lBREEsNEVBQ0E7SUFBSSxlQUF1RjtJQUF2RixzSEFBdUY7SUFHdkYsZUFBc0Y7SUFBdEYscUhBQXNGOztBRHBDaEcsTUFBTSxPQUFPLDJCQUEyQjtJQUx4QztRQVVTLGdCQUFXLEdBQXlCLElBQUksWUFBWSxFQUFVLENBQUM7S0FTdkU7SUFQQyxJQUFXLHNCQUFzQjtRQUMvQixPQUFPLHNCQUFzQixDQUFDO0lBQ2hDLENBQUM7SUFFTSxXQUFXLENBQUMsc0JBQThCO1FBQy9DLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLHNCQUFzQixDQUFDLENBQUM7SUFDaEQsQ0FBQzs7c0dBYlUsMkJBQTJCOzhFQUEzQiwyQkFBMkI7UUNUeEMsOEVBbURNOztRQW5EQSxtREFBOEI7O3VGRFN2QiwyQkFBMkI7Y0FMdkMsU0FBUzsyQkFDRSx5QkFBeUI7Z0JBTTVCLHdCQUF3QjtrQkFEOUIsS0FBSztZQUlDLFdBQVc7a0JBRGpCLE1BQU0iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIEV2ZW50RW1pdHRlciwgSW5wdXQsIE91dHB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgTm90aWZpY2F0aW9uQmFubmVyQ29uZmlnIH0gZnJvbSAnLi9kb21haW4nO1xuaW1wb3J0IHsgTm90aWZpY2F0aW9uQmFubmVyVHlwZSB9IGZyb20gJy4vZW51bXMnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdjY2Qtbm90aWZpY2F0aW9uLWJhbm5lcicsXG4gIHRlbXBsYXRlVXJsOiAnLi9ub3RpZmljYXRpb24tYmFubmVyLmNvbXBvbmVudC5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJy4vbm90aWZpY2F0aW9uLWJhbm5lci5jb21wb25lbnQuc2NzcyddXG59KVxuZXhwb3J0IGNsYXNzIE5vdGlmaWNhdGlvbkJhbm5lckNvbXBvbmVudCB7XG4gIEBJbnB1dCgpXG4gIHB1YmxpYyBub3RpZmljYXRpb25CYW5uZXJDb25maWc6IE5vdGlmaWNhdGlvbkJhbm5lckNvbmZpZztcblxuICBAT3V0cHV0KClcbiAgcHVibGljIGxpbmtDbGlja2VkOiBFdmVudEVtaXR0ZXI8c3RyaW5nPiA9IG5ldyBFdmVudEVtaXR0ZXI8c3RyaW5nPigpO1xuXG4gIHB1YmxpYyBnZXQgbm90aWZpY2F0aW9uQmFubmVyVHlwZSgpOiB0eXBlb2YgTm90aWZpY2F0aW9uQmFubmVyVHlwZSB7XG4gICAgcmV0dXJuIE5vdGlmaWNhdGlvbkJhbm5lclR5cGU7XG4gIH1cblxuICBwdWJsaWMgb25MaW5rQ2xpY2sodHJpZ2dlck91dHB1dEV2ZW50VGV4dDogc3RyaW5nKTogdm9pZCB7XG4gICAgdGhpcy5saW5rQ2xpY2tlZC5lbWl0KHRyaWdnZXJPdXRwdXRFdmVudFRleHQpO1xuICB9XG59XG4iLCI8ZGl2ICpuZ0lmPVwibm90aWZpY2F0aW9uQmFubmVyQ29uZmlnXCJcbiAgY2xhc3M9XCJnb3Z1ay1ub3RpZmljYXRpb24tYmFubmVyXCJcbiAgW25nQ2xhc3NdPVwibm90aWZpY2F0aW9uQmFubmVyQ29uZmlnLmhlYWRlckNsYXNzXCJcbiAgcm9sZT1cInJlZ2lvblwiXG4gIGFyaWEtbGFiZWxsZWRieT1cImdvdnVrLW5vdGlmaWNhdGlvbi1iYW5uZXItdGl0bGVcIlxuICBkYXRhLW1vZHVsZT1cImdvdnVrLW5vdGlmaWNhdGlvbi1iYW5uZXJcIj5cblxuICA8ZGl2IGNsYXNzPVwiZ292dWstbm90aWZpY2F0aW9uLWJhbm5lcl9faGVhZGVyXCI+XG4gICAgPGgyIGNsYXNzPVwiZ292dWstbm90aWZpY2F0aW9uLWJhbm5lcl9fdGl0bGVcIiBpZD1cImdvdnVrLW5vdGlmaWNhdGlvbi1iYW5uZXItdGl0bGVcIj5cbiAgICAgIHt7bm90aWZpY2F0aW9uQmFubmVyQ29uZmlnLmhlYWRpbmdUZXh0fX1cbiAgICA8L2gyPlxuICA8L2Rpdj5cbiAgPGRpdiBjbGFzcz1cImdvdnVrLW5vdGlmaWNhdGlvbi1iYW5uZXJfX2NvbnRlbnRcIj5cbiAgICA8cCBjbGFzcz1cImdvdnVrLW5vdGlmaWNhdGlvbi1iYW5uZXJfX2hlYWRpbmdcIj5cbiAgICAgIDxuZy1jb250YWluZXIgW25nU3dpdGNoXT1cIm5vdGlmaWNhdGlvbkJhbm5lckNvbmZpZy5iYW5uZXJUeXBlXCI+XG4gICAgICAgIDxuZy1jb250YWluZXIgKm5nU3dpdGNoQ2FzZT1cIm5vdGlmaWNhdGlvbkJhbm5lclR5cGUuV0FSTklOR1wiPlxuICAgICAgICAgIDxzdmcgY2xhc3M9XCJobWN0cy1iYW5uZXJfX2ljb25cIiBmaWxsPVwiY3VycmVudENvbG9yXCIgcm9sZT1cInByZXNlbnRhdGlvblwiIGZvY3VzYWJsZT1cImZhbHNlXCJcbiAgICAgICAgICAgIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIiB2aWV3Qm94PVwiMCAwIDI1IDI1XCIgaGVpZ2h0PVwiMzZcIiB3aWR0aD1cIjM2XCI+XG4gICAgICAgICAgICA8cGF0aCBkPVwiTTEzLjYsMTUuNGgtMi4zdi00LjVoMi4zVjE1LjR6IE0xMy42LDE5LjhoLTIuM3YtMi4yaDIuM1YxOS44eiBNMCwyMy4yaDI1TDEyLjUsMkwwLDIzLjJ6XCI+PC9wYXRoPlxuICAgICAgICAgIDwvc3ZnPlxuICAgICAgICA8L25nLWNvbnRhaW5lcj5cbiAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdTd2l0Y2hDYXNlPVwibm90aWZpY2F0aW9uQmFubmVyVHlwZS5FUlJPUlwiPlxuICAgICAgICAgIDxzdmcgY2xhc3M9XCJobWN0cy1iYW5uZXJfX2ljb25cIiBmaWxsPVwiY3VycmVudENvbG9yXCIgcm9sZT1cInByZXNlbnRhdGlvblwiIGZvY3VzYWJsZT1cImZhbHNlXCJcbiAgICAgICAgICAgIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIiB2aWV3Qm94PVwiMCAwIDI1IDI1XCIgaGVpZ2h0PVwiMzZcIiB3aWR0aD1cIjM2XCI+XG4gICAgICAgICAgICA8cGF0aCBkPVwiTTEzLjYsMTUuNGgtMi4zdi00LjVoMi4zVjE1LjR6IE0xMy42LDE5LjhoLTIuM3YtMi4yaDIuM1YxOS44eiBNMCwyMy4yaDI1TDEyLjUsMkwwLDIzLjJ6XCI+PC9wYXRoPlxuICAgICAgICAgIDwvc3ZnPlxuICAgICAgICA8L25nLWNvbnRhaW5lcj5cbiAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdTd2l0Y2hDYXNlPVwibm90aWZpY2F0aW9uQmFubmVyVHlwZS5TVUNDRVNTXCI+XG4gICAgICAgICAgPHN2ZyBjbGFzcz1cImhtY3RzLWJhbm5lcl9faWNvblwiIGZpbGw9XCJjdXJyZW50Q29sb3JcIiByb2xlPVwicHJlc2VudGF0aW9uXCIgZm9jdXNhYmxlPVwiZmFsc2VcIlxuICAgICAgICAgICAgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiIHZpZXdCb3g9XCIwIDAgMjUgMjVcIiBoZWlnaHQ9XCIzNlwiIHdpZHRoPVwiMzZcIj5cbiAgICAgICAgICAgIDxwYXRoIGQ9XCJNMjUsNi4yTDguNywyMy4yTDAsMTQuMWw0LTQuMmw0LjcsNC45TDIxLDJMMjUsNi4yelwiPjwvcGF0aD5cbiAgICAgICAgICA8L3N2Zz5cbiAgICAgICAgPC9uZy1jb250YWluZXI+XG4gICAgICAgIDxuZy1jb250YWluZXIgKm5nU3dpdGNoQ2FzZT1cIm5vdGlmaWNhdGlvbkJhbm5lclR5cGUuSU5GT1JNQVRJT05cIj5cbiAgICAgICAgICA8c3ZnIGNsYXNzPVwiaG1jdHMtYmFubmVyX19pY29uXCIgZmlsbD1cImN1cnJlbnRDb2xvclwiIHJvbGU9XCJwcmVzZW50YXRpb25cIiBmb2N1c2FibGU9XCJmYWxzZVwiXG4gICAgICAgICAgICB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIgdmlld0JveD1cIjAgMCAyNSAyNVwiIGhlaWdodD1cIjM2XCIgd2lkdGg9XCIzNlwiPlxuICAgICAgICAgICAgPHBhdGggZD1cIk0xMy43LDE4LjVoLTIuNHYtMi40aDIuNFYxOC41eiBNMTIuNSwxMy43Yy0wLjcsMC0xLjItMC41LTEuMi0xLjJWNy43YzAtMC43LDAuNS0xLjIsMS4yLTEuMnMxLjIsMC41LDEuMiwxLjJ2NC44XG4gICAgICAgICAgQzEzLjcsMTMuMiwxMy4yLDEzLjcsMTIuNSwxMy43eiBNMTIuNSwwLjVjLTYuNiwwLTEyLDUuNC0xMiwxMnM1LjQsMTIsMTIsMTJzMTItNS40LDEyLTEyUzE5LjEsMC41LDEyLjUsMC41elwiPjwvcGF0aD5cbiAgICAgICAgICA8L3N2Zz5cbiAgICAgICAgPC9uZy1jb250YWluZXI+XG4gICAgICA8L25nLWNvbnRhaW5lcj5cbiAgICAgIHt7bm90aWZpY2F0aW9uQmFubmVyQ29uZmlnLmRlc2NyaXB0aW9ufX1cbiAgICAgIDxhICpuZ0lmPVwibm90aWZpY2F0aW9uQmFubmVyQ29uZmlnLnNob3dMaW5rICYmICFub3RpZmljYXRpb25CYW5uZXJDb25maWcudHJpZ2dlck91dHB1dEV2ZW50XCJcbiAgICAgICAgY2xhc3M9XCJnb3Z1ay1ub3RpZmljYXRpb24tYmFubmVyX19saW5rXCJcbiAgICAgICAgaHJlZj1cInt7bm90aWZpY2F0aW9uQmFubmVyQ29uZmlnLmxpbmtVcmx9fVwiPnt7bm90aWZpY2F0aW9uQmFubmVyQ29uZmlnLmxpbmtUZXh0fX08L2E+XG4gICAgICA8YSAqbmdJZj1cIm5vdGlmaWNhdGlvbkJhbm5lckNvbmZpZy5zaG93TGluayAmJiBub3RpZmljYXRpb25CYW5uZXJDb25maWcudHJpZ2dlck91dHB1dEV2ZW50XCJcbiAgICAgICAgY2xhc3M9XCJnb3Z1ay1ub3RpZmljYXRpb24tYmFubmVyX19saW5rXCJcbiAgICAgICAgaHJlZj1cImphdmFzY3JpcHQ6dm9pZCgwKVwiXG4gICAgICAgIChjbGljayk9XCJvbkxpbmtDbGljayhub3RpZmljYXRpb25CYW5uZXJDb25maWcudHJpZ2dlck91dHB1dEV2ZW50VGV4dClcIj57e25vdGlmaWNhdGlvbkJhbm5lckNvbmZpZy5saW5rVGV4dH19PC9hPlxuICAgIDwvcD5cbiAgPC9kaXY+XG48L2Rpdj5cbiJdfQ==