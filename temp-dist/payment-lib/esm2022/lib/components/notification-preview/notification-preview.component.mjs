import { Component, Input } from '@angular/core';
import { NotificationPreviewRequest } from '../../interfaces/NotificationPreviewRequest';
import { NotificationService } from '../../services/notification/notification.service';
import { ErrorHandlerService } from '../../services/shared/error-handler.service';
import { Output, EventEmitter } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "../../services/shared/error-handler.service";
import * as i2 from "../../services/notification/notification.service";
import * as i3 from "@angular/common";
function NotificationPreviewComponent_ng_container_3_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementContainerStart(0);
    i0.ɵɵelementStart(1, "tr", 4)(2, "td", 5)(3, "span", 6);
    i0.ɵɵtext(4, "From:");
    i0.ɵɵelementEnd();
    i0.ɵɵtext(5);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(6, "tr", 4)(7, "td", 5)(8, "span", 6);
    i0.ɵɵtext(9, "To:");
    i0.ɵɵelementEnd();
    i0.ɵɵtext(10);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(11, "tr", 4)(12, "td", 5)(13, "span", 6);
    i0.ɵɵtext(14, "Subject:");
    i0.ɵɵelementEnd();
    i0.ɵɵtext(15);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(16, "tr", 4)(17, "td", 5);
    i0.ɵɵelement(18, "div", 7);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementContainerEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate1(" ", ctx_r0.notification == null ? null : ctx_r0.notification.from == null ? null : ctx_r0.notification.from.from_email_address, "");
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate1(" ", ctx_r0.notification == null ? null : ctx_r0.notification.recipient_contact == null ? null : ctx_r0.notification.recipient_contact.recipient_email_address, "");
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate1(" ", ctx_r0.notification == null ? null : ctx_r0.notification.subject, "");
    i0.ɵɵadvance(3);
    i0.ɵɵproperty("innerHTML", ctx_r0.notification == null ? null : ctx_r0.notification.html, i0.ɵɵsanitizeHtml);
} }
function NotificationPreviewComponent_ng_container_4_ng_container_3_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementContainerStart(0);
    i0.ɵɵtext(1);
    i0.ɵɵelement(2, "br");
    i0.ɵɵelementContainerEnd();
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate1(" ", ctx_r2.notification == null ? null : ctx_r2.notification.recipient_contact == null ? null : ctx_r2.notification.recipient_contact.recipient_mail_address == null ? null : ctx_r2.notification.recipient_contact.recipient_mail_address.address_line, "");
} }
function NotificationPreviewComponent_ng_container_4_ng_container_4_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementContainerStart(0);
    i0.ɵɵtext(1);
    i0.ɵɵelement(2, "br");
    i0.ɵɵelementContainerEnd();
} if (rf & 2) {
    const ctx_r3 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate1(" ", ctx_r3.notification == null ? null : ctx_r3.notification.recipient_contact == null ? null : ctx_r3.notification.recipient_contact.recipient_mail_address == null ? null : ctx_r3.notification.recipient_contact.recipient_mail_address.city, "");
} }
function NotificationPreviewComponent_ng_container_4_ng_container_5_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementContainerStart(0);
    i0.ɵɵtext(1);
    i0.ɵɵelement(2, "br");
    i0.ɵɵelementContainerEnd();
} if (rf & 2) {
    const ctx_r4 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate1(" ", ctx_r4.notification == null ? null : ctx_r4.notification.recipient_contact == null ? null : ctx_r4.notification.recipient_contact.recipient_mail_address == null ? null : ctx_r4.notification.recipient_contact.recipient_mail_address.county, "");
} }
function NotificationPreviewComponent_ng_container_4_ng_container_6_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementContainerStart(0);
    i0.ɵɵtext(1);
    i0.ɵɵelement(2, "br");
    i0.ɵɵelementContainerEnd();
} if (rf & 2) {
    const ctx_r5 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate1(" ", ctx_r5.notification == null ? null : ctx_r5.notification.recipient_contact == null ? null : ctx_r5.notification.recipient_contact.recipient_mail_address == null ? null : ctx_r5.notification.recipient_contact.recipient_mail_address.country, "");
} }
function NotificationPreviewComponent_ng_container_4_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementContainerStart(0);
    i0.ɵɵelementStart(1, "tr", 4)(2, "td", 8);
    i0.ɵɵtemplate(3, NotificationPreviewComponent_ng_container_4_ng_container_3_Template, 3, 1, "ng-container", 3);
    i0.ɵɵtemplate(4, NotificationPreviewComponent_ng_container_4_ng_container_4_Template, 3, 1, "ng-container", 3);
    i0.ɵɵtemplate(5, NotificationPreviewComponent_ng_container_4_ng_container_5_Template, 3, 1, "ng-container", 3);
    i0.ɵɵtemplate(6, NotificationPreviewComponent_ng_container_4_ng_container_6_Template, 3, 1, "ng-container", 3);
    i0.ɵɵtext(7);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(8, "tr", 4)(9, "td", 8);
    i0.ɵɵtext(10);
    i0.ɵɵpipe(11, "date");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(12, "tr", 4)(13, "td", 8)(14, "span", 6);
    i0.ɵɵtext(15);
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(16, "tr", 4)(17, "td", 5);
    i0.ɵɵelement(18, "div", 7);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementContainerEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance(3);
    i0.ɵɵproperty("ngIf", ctx_r1.notification == null ? null : ctx_r1.notification.recipient_contact == null ? null : ctx_r1.notification.recipient_contact.recipient_mail_address == null ? null : ctx_r1.notification.recipient_contact.recipient_mail_address.address_line);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", ctx_r1.notification == null ? null : ctx_r1.notification.recipient_contact == null ? null : ctx_r1.notification.recipient_contact.recipient_mail_address == null ? null : ctx_r1.notification.recipient_contact.recipient_mail_address.city);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", ctx_r1.notification == null ? null : ctx_r1.notification.recipient_contact == null ? null : ctx_r1.notification.recipient_contact.recipient_mail_address == null ? null : ctx_r1.notification.recipient_contact.recipient_mail_address.county);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", ctx_r1.notification == null ? null : ctx_r1.notification.recipient_contact == null ? null : ctx_r1.notification.recipient_contact.recipient_mail_address == null ? null : ctx_r1.notification.recipient_contact.recipient_mail_address.country);
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate1(" ", ctx_r1.notification == null ? null : ctx_r1.notification.recipient_contact == null ? null : ctx_r1.notification.recipient_contact.recipient_mail_address == null ? null : ctx_r1.notification.recipient_contact.recipient_mail_address.postal_code, " ");
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind2(11, 8, ctx_r1.today, "d MMMM y"));
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate(ctx_r1.notification == null ? null : ctx_r1.notification.subject);
    i0.ɵɵadvance(3);
    i0.ɵɵproperty("innerHTML", ctx_r1.notification == null ? null : ctx_r1.notification.body, i0.ɵɵsanitizeHtml);
} }
export class NotificationPreviewComponent {
    errorHandlerService;
    notificationService;
    payment;
    contactDetails;
    refundReason;
    refundAmount;
    paymentReference;
    refundReference;
    previewJourney;
    notificationSent;
    notificationPreviewEvent = new EventEmitter();
    notification;
    notificationPreviewRequest;
    today = Date.now();
    //   errorMessage = this.errorHandlerService.getServerErrorMessage(false, false, '');
    errorMessage = null;
    constructor(errorHandlerService, notificationService) {
        this.errorHandlerService = errorHandlerService;
        this.notificationService = notificationService;
    }
    ngOnInit() {
        if (this.previewJourney != undefined && this.previewJourney != null && this.previewJourney === 'Notifications sent') {
            this.notification = this.notificationSent;
            if (this.notification != undefined && this.notification != null && this.notification.template_type === 'letter') {
                this.notification.body = this.notification.body.replace(/\r\n/g, '<br/>');
            }
        }
        else {
            const notficationPreviewRequestBody = new NotificationPreviewRequest(this.payment, this.contactDetails, this.refundReason, this.refundAmount, this.refundReference, this.paymentReference);
            this.notificationService.getNotificationPreview(notficationPreviewRequestBody).subscribe(res => {
                this.errorMessage = this.errorHandlerService.getServerErrorMessage(false, false, '');
                this.notification = JSON.parse(res);
                if (this.notification != undefined && this.notification != null && this.notification.template_type === 'letter') {
                    this.notification.body = this.notification.body.replace(/\r\n/g, '<br/>');
                }
            }, (error) => {
                this.errorMessage = this.errorHandlerService.getServerErrorMessage(true, false, '');
                console.log(this.errorMessage);
            });
            this.notificationPreviewEvent.emit(this.notification);
        }
    }
    static ɵfac = function NotificationPreviewComponent_Factory(t) { return new (t || NotificationPreviewComponent)(i0.ɵɵdirectiveInject(i1.ErrorHandlerService), i0.ɵɵdirectiveInject(i2.NotificationService)); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: NotificationPreviewComponent, selectors: [["app-notification-preview"]], inputs: { payment: "payment", contactDetails: "contactDetails", refundReason: "refundReason", refundAmount: "refundAmount", paymentReference: "paymentReference", refundReference: "refundReference", previewJourney: "previewJourney", notificationSent: "notificationSent" }, outputs: { notificationPreviewEvent: "notificationPreviewEvent" }, decls: 5, vars: 2, consts: [[1, "govuk-grid-column-full"], [1, "govuk-table"], [1, "govuk-table__body"], [4, "ngIf"], [1, "govuk-table__row"], [1, "govuk-table__cell", "whitespace-inherit"], [1, "govuk-!-font-weight-bold"], [3, "innerHTML"], [1, "letter-row-border"]], template: function NotificationPreviewComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "div", 0)(1, "table", 1)(2, "tbody", 2);
            i0.ɵɵtemplate(3, NotificationPreviewComponent_ng_container_3_Template, 19, 4, "ng-container", 3);
            i0.ɵɵtemplate(4, NotificationPreviewComponent_ng_container_4_Template, 19, 11, "ng-container", 3);
            i0.ɵɵelementEnd()()();
        } if (rf & 2) {
            i0.ɵɵadvance(3);
            i0.ɵɵproperty("ngIf", (ctx.notification == null ? null : ctx.notification.template_type) === "email");
            i0.ɵɵadvance(1);
            i0.ɵɵproperty("ngIf", (ctx.notification == null ? null : ctx.notification.template_type) === "letter");
        } }, dependencies: [i3.NgIf, i3.DatePipe], styles: [".right[_ngcontent-%COMP%]{float:right}.letter-row-border[_ngcontent-%COMP%]{border-bottom:none}"] });
}
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(NotificationPreviewComponent, [{
        type: Component,
        args: [{ selector: 'app-notification-preview', template: "<div class=\"govuk-grid-column-full\">\n  <table class=\"govuk-table\">\n    <tbody class=\"govuk-table__body\">\n      <ng-container *ngIf=\"notification?.template_type === 'email'\">\n        <tr class=\"govuk-table__row\">\n          <td class=\"govuk-table__cell whitespace-inherit\"><span class=\"govuk-!-font-weight-bold\">From:</span>\n            {{notification?.from?.from_email_address}}</td>\n        </tr>\n        <tr class=\"govuk-table__row\">\n          <td class=\"govuk-table__cell whitespace-inherit\"><span class=\"govuk-!-font-weight-bold\">To:</span>\n            {{notification?.recipient_contact?.recipient_email_address}}</td>\n        </tr>\n        <tr class=\"govuk-table__row\">\n          <td class=\"govuk-table__cell whitespace-inherit\"><span class=\"govuk-!-font-weight-bold\">Subject:</span>\n            {{notification?.subject}}</td>\n        </tr>\n        <tr class=\"govuk-table__row\">\n          <td class=\"govuk-table__cell whitespace-inherit\">\n            <div [innerHTML]=\"notification?.html\"></div>\n          </td>\n        </tr>\n      </ng-container>\n      <ng-container *ngIf=\"notification?.template_type === 'letter'\">\n        <tr class=\"govuk-table__row\">\n          <td class=\"letter-row-border\">\n            <ng-container *ngIf=\"notification?.recipient_contact?.recipient_mail_address?.address_line\">\n              {{notification?.recipient_contact?.recipient_mail_address?.address_line}}<br /></ng-container>\n            <ng-container *ngIf=\"notification?.recipient_contact?.recipient_mail_address?.city\">\n              {{notification?.recipient_contact?.recipient_mail_address?.city}}<br /></ng-container>\n            <ng-container *ngIf=\"notification?.recipient_contact?.recipient_mail_address?.county\">\n              {{notification?.recipient_contact?.recipient_mail_address?.county}}<br /></ng-container>\n            <ng-container *ngIf=\"notification?.recipient_contact?.recipient_mail_address?.country\">\n              {{notification?.recipient_contact?.recipient_mail_address?.country}}<br /></ng-container>\n            {{notification?.recipient_contact?.recipient_mail_address?.postal_code}}\n          </td>\n        </tr>\n        <tr class=\"govuk-table__row\">\n          <td class=\"letter-row-border\">{{ today | date:'d MMMM y' }}</td>\n        </tr>\n        <tr class=\"govuk-table__row\">\n          <td class=\"letter-row-border\"><span class=\"govuk-!-font-weight-bold\">{{notification?.subject}}</span></td>\n        </tr>\n        <tr class=\"govuk-table__row\">\n          <td class=\"govuk-table__cell whitespace-inherit\">\n            <div [innerHTML]=\"notification?.body\"></div>\n          </td>\n        </tr>\n      </ng-container>\n  \n    </tbody>\n  </table>\n</div>\n", styles: [".right{float:right}.letter-row-border{border-bottom:none}\n"] }]
    }], function () { return [{ type: i1.ErrorHandlerService }, { type: i2.NotificationService }]; }, { payment: [{
            type: Input
        }], contactDetails: [{
            type: Input
        }], refundReason: [{
            type: Input
        }], refundAmount: [{
            type: Input
        }], paymentReference: [{
            type: Input
        }], refundReference: [{
            type: Input
        }], previewJourney: [{
            type: Input
        }], notificationSent: [{
            type: Input
        }], notificationPreviewEvent: [{
            type: Output
        }] }); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibm90aWZpY2F0aW9uLXByZXZpZXcuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvcGF5bWVudC1saWIvc3JjL2xpYi9jb21wb25lbnRzL25vdGlmaWNhdGlvbi1wcmV2aWV3L25vdGlmaWNhdGlvbi1wcmV2aWV3LmNvbXBvbmVudC50cyIsIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL3BheW1lbnQtbGliL3NyYy9saWIvY29tcG9uZW50cy9ub3RpZmljYXRpb24tcHJldmlldy9ub3RpZmljYXRpb24tcHJldmlldy5jb21wb25lbnQuaHRtbCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBVSxNQUFNLGVBQWUsQ0FBQztBQUl6RCxPQUFPLEVBQUUsMEJBQTBCLEVBQUUsTUFBTSw2Q0FBNkMsQ0FBQztBQUN6RixPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSxrREFBa0QsQ0FBQztBQUN2RixPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSw2Q0FBNkMsQ0FBQztBQUNsRixPQUFPLEVBQUUsTUFBTSxFQUFFLFlBQVksRUFBRSxNQUFNLGVBQWUsQ0FBQzs7Ozs7O0lDSi9DLDZCQUE4RDtJQUM1RCw2QkFBNkIsWUFBQSxjQUFBO0lBQzZELHFCQUFLO0lBQUEsaUJBQU87SUFDbEcsWUFBMEM7SUFBQSxpQkFBSyxFQUFBO0lBRW5ELDZCQUE2QixZQUFBLGNBQUE7SUFDNkQsbUJBQUc7SUFBQSxpQkFBTztJQUNoRyxhQUE0RDtJQUFBLGlCQUFLLEVBQUE7SUFFckUsOEJBQTZCLGFBQUEsZUFBQTtJQUM2RCx5QkFBUTtJQUFBLGlCQUFPO0lBQ3JHLGFBQXlCO0lBQUEsaUJBQUssRUFBQTtJQUVsQyw4QkFBNkIsYUFBQTtJQUV6QiwwQkFBNEM7SUFDOUMsaUJBQUssRUFBQTtJQUVULDBCQUFlOzs7SUFmVCxlQUEwQztJQUExQywwSkFBMEM7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QTZDO1lBbUI3QyxlQUE4QztZQUE5QyxzR0FBOEM7Ozt1RkRSdEQsNEJBQTRCO2NBTHhDLFNBQVM7MkJBQ0UsMEJBQTBCO3dHQUszQixPQUFPO2tCQUFmLEtBQUs7WUFDRyxjQUFjO2tCQUF0QixLQUFLO1lBQ0csWUFBWTtrQkFBcEIsS0FBSztZQUNHLFlBQVk7a0JBQXBCLEtBQUs7WUFDRyxnQkFBZ0I7a0JBQXhCLEtBQUs7WUFDRyxlQUFlO2tCQUF2QixLQUFLO1lBQ0csY0FBYztrQkFBdEIsS0FBSztZQUNHLGdCQUFnQjtrQkFBeEIsS0FBSztZQUVJLHdCQUF3QjtrQkFBakMsTUFBTSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgSW5wdXQsIE9uSW5pdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgSVBheW1lbnQgfSBmcm9tICcuLi8uLi9pbnRlcmZhY2VzL0lQYXltZW50JztcbmltcG9ydCB7IElOb3RpZmljYXRpb25QcmV2aWV3IH0gZnJvbSAnLi4vLi4vaW50ZXJmYWNlcy9JTm90aWZpY2F0aW9uUHJldmlldyc7XG5pbXBvcnQgeyBJUmVmdW5kQ29udGFjdERldGFpbHMgfSBmcm9tICcuLi8uLi9pbnRlcmZhY2VzL0lSZWZ1bmRDb250YWN0RGV0YWlscyc7XG5pbXBvcnQgeyBOb3RpZmljYXRpb25QcmV2aWV3UmVxdWVzdCB9IGZyb20gJy4uLy4uL2ludGVyZmFjZXMvTm90aWZpY2F0aW9uUHJldmlld1JlcXVlc3QnO1xuaW1wb3J0IHsgTm90aWZpY2F0aW9uU2VydmljZSB9IGZyb20gJy4uLy4uL3NlcnZpY2VzL25vdGlmaWNhdGlvbi9ub3RpZmljYXRpb24uc2VydmljZSc7XG5pbXBvcnQgeyBFcnJvckhhbmRsZXJTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vc2VydmljZXMvc2hhcmVkL2Vycm9yLWhhbmRsZXIuc2VydmljZSc7XG5pbXBvcnQgeyBPdXRwdXQsIEV2ZW50RW1pdHRlciB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdhcHAtbm90aWZpY2F0aW9uLXByZXZpZXcnLFxuICB0ZW1wbGF0ZVVybDogJy4vbm90aWZpY2F0aW9uLXByZXZpZXcuY29tcG9uZW50Lmh0bWwnLFxuICBzdHlsZVVybHM6IFsnLi9ub3RpZmljYXRpb24tcHJldmlldy5jb21wb25lbnQuc2NzcyddXG59KVxuZXhwb3J0IGNsYXNzIE5vdGlmaWNhdGlvblByZXZpZXdDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuICBASW5wdXQoKSBwYXltZW50OiBJUGF5bWVudDtcbiAgQElucHV0KCkgY29udGFjdERldGFpbHM6IElSZWZ1bmRDb250YWN0RGV0YWlscztcbiAgQElucHV0KCkgcmVmdW5kUmVhc29uOiBzdHJpbmc7XG4gIEBJbnB1dCgpIHJlZnVuZEFtb3VudDogbnVtYmVyO1xuICBASW5wdXQoKSBwYXltZW50UmVmZXJlbmNlOiBzdHJpbmc7XG4gIEBJbnB1dCgpIHJlZnVuZFJlZmVyZW5jZTogc3RyaW5nO1xuICBASW5wdXQoKSBwcmV2aWV3Sm91cm5leTogc3RyaW5nO1xuICBASW5wdXQoKSBub3RpZmljYXRpb25TZW50OiBJTm90aWZpY2F0aW9uUHJldmlldztcblxuICBAT3V0cHV0KCkgbm90aWZpY2F0aW9uUHJldmlld0V2ZW50ID0gbmV3IEV2ZW50RW1pdHRlcjxJTm90aWZpY2F0aW9uUHJldmlldz4oKTtcblxuICBub3RpZmljYXRpb246IElOb3RpZmljYXRpb25QcmV2aWV3O1xuICBub3RpZmljYXRpb25QcmV2aWV3UmVxdWVzdDogTm90aWZpY2F0aW9uUHJldmlld1JlcXVlc3Q7XG4gIHRvZGF5OiBudW1iZXIgPSBEYXRlLm5vdygpO1xuLy8gICBlcnJvck1lc3NhZ2UgPSB0aGlzLmVycm9ySGFuZGxlclNlcnZpY2UuZ2V0U2VydmVyRXJyb3JNZXNzYWdlKGZhbHNlLCBmYWxzZSwgJycpO1xuICBlcnJvck1lc3NhZ2UgPSBudWxsXG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBlcnJvckhhbmRsZXJTZXJ2aWNlOiBFcnJvckhhbmRsZXJTZXJ2aWNlLFxuICAgIHByaXZhdGUgbm90aWZpY2F0aW9uU2VydmljZTogTm90aWZpY2F0aW9uU2VydmljZSkgeyB9XG5cbiAgbmdPbkluaXQoKSB7XG5cbiAgICBpZiAodGhpcy5wcmV2aWV3Sm91cm5leSAhPSB1bmRlZmluZWQgJiYgdGhpcy5wcmV2aWV3Sm91cm5leSAhPSBudWxsICYmIHRoaXMucHJldmlld0pvdXJuZXkgPT09ICdOb3RpZmljYXRpb25zIHNlbnQnKSB7XG5cbiAgICAgIHRoaXMubm90aWZpY2F0aW9uID0gdGhpcy5ub3RpZmljYXRpb25TZW50O1xuXG4gICAgICBpZiAodGhpcy5ub3RpZmljYXRpb24gIT0gdW5kZWZpbmVkICYmIHRoaXMubm90aWZpY2F0aW9uICE9IG51bGwgJiYgdGhpcy5ub3RpZmljYXRpb24udGVtcGxhdGVfdHlwZSA9PT0gJ2xldHRlcicpIHtcbiAgICAgICAgdGhpcy5ub3RpZmljYXRpb24uYm9keSA9IHRoaXMubm90aWZpY2F0aW9uLmJvZHkucmVwbGFjZSgvXFxyXFxuL2csICc8YnIvPicpO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG5cbiAgICAgIGNvbnN0IG5vdGZpY2F0aW9uUHJldmlld1JlcXVlc3RCb2R5ID0gbmV3IE5vdGlmaWNhdGlvblByZXZpZXdSZXF1ZXN0KHRoaXMucGF5bWVudCwgdGhpcy5jb250YWN0RGV0YWlscyxcbiAgICAgICAgdGhpcy5yZWZ1bmRSZWFzb24sIHRoaXMucmVmdW5kQW1vdW50LCB0aGlzLnJlZnVuZFJlZmVyZW5jZSwgdGhpcy5wYXltZW50UmVmZXJlbmNlKTtcblxuICAgICAgdGhpcy5ub3RpZmljYXRpb25TZXJ2aWNlLmdldE5vdGlmaWNhdGlvblByZXZpZXcobm90ZmljYXRpb25QcmV2aWV3UmVxdWVzdEJvZHkpLnN1YnNjcmliZShcbiAgICAgICAgcmVzID0+IHtcbiAgICAgICAgICB0aGlzLmVycm9yTWVzc2FnZSA9IHRoaXMuZXJyb3JIYW5kbGVyU2VydmljZS5nZXRTZXJ2ZXJFcnJvck1lc3NhZ2UoZmFsc2UsIGZhbHNlLCAnJyk7XG4gICAgICAgICAgdGhpcy5ub3RpZmljYXRpb24gPSBKU09OLnBhcnNlKHJlcyk7XG5cbiAgICAgICAgICBpZiAodGhpcy5ub3RpZmljYXRpb24gIT0gdW5kZWZpbmVkICYmIHRoaXMubm90aWZpY2F0aW9uICE9IG51bGwgJiYgdGhpcy5ub3RpZmljYXRpb24udGVtcGxhdGVfdHlwZSA9PT0gJ2xldHRlcicpIHtcbiAgICAgICAgICAgIHRoaXMubm90aWZpY2F0aW9uLmJvZHkgPSB0aGlzLm5vdGlmaWNhdGlvbi5ib2R5LnJlcGxhY2UoL1xcclxcbi9nLCAnPGJyLz4nKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIChlcnJvcjogYW55KSA9PiB7XG4gICAgICAgICAgdGhpcy5lcnJvck1lc3NhZ2UgPSB0aGlzLmVycm9ySGFuZGxlclNlcnZpY2UuZ2V0U2VydmVyRXJyb3JNZXNzYWdlKHRydWUsIGZhbHNlLCAnJyk7XG4gICAgICAgICAgY29uc29sZS5sb2codGhpcy5lcnJvck1lc3NhZ2UpO1xuICAgICAgICB9XG4gICAgICApO1xuXG4gICAgICB0aGlzLm5vdGlmaWNhdGlvblByZXZpZXdFdmVudC5lbWl0KHRoaXMubm90aWZpY2F0aW9uKTtcblxuICAgIH1cbiAgfVxuXG59XG4iLCI8ZGl2IGNsYXNzPVwiZ292dWstZ3JpZC1jb2x1bW4tZnVsbFwiPlxuICA8dGFibGUgY2xhc3M9XCJnb3Z1ay10YWJsZVwiPlxuICAgIDx0Ym9keSBjbGFzcz1cImdvdnVrLXRhYmxlX19ib2R5XCI+XG4gICAgICA8bmctY29udGFpbmVyICpuZ0lmPVwibm90aWZpY2F0aW9uPy50ZW1wbGF0ZV90eXBlID09PSAnZW1haWwnXCI+XG4gICAgICAgIDx0ciBjbGFzcz1cImdvdnVrLXRhYmxlX19yb3dcIj5cbiAgICAgICAgICA8dGQgY2xhc3M9XCJnb3Z1ay10YWJsZV9fY2VsbCB3aGl0ZXNwYWNlLWluaGVyaXRcIj48c3BhbiBjbGFzcz1cImdvdnVrLSEtZm9udC13ZWlnaHQtYm9sZFwiPkZyb206PC9zcGFuPlxuICAgICAgICAgICAge3tub3RpZmljYXRpb24/LmZyb20/LmZyb21fZW1haWxfYWRkcmVzc319PC90ZD5cbiAgICAgICAgPC90cj5cbiAgICAgICAgPHRyIGNsYXNzPVwiZ292dWstdGFibGVfX3Jvd1wiPlxuICAgICAgICAgIDx0ZCBjbGFzcz1cImdvdnVrLXRhYmxlX19jZWxsIHdoaXRlc3BhY2UtaW5oZXJpdFwiPjxzcGFuIGNsYXNzPVwiZ292dWstIS1mb250LXdlaWdodC1ib2xkXCI+VG86PC9zcGFuPlxuICAgICAgICAgICAge3tub3RpZmljYXRpb24/LnJlY2lwaWVudF9jb250YWN0Py5yZWNpcGllbnRfZW1haWxfYWRkcmVzc319PC90ZD5cbiAgICAgICAgPC90cj5cbiAgICAgICAgPHRyIGNsYXNzPVwiZ292dWstdGFibGVfX3Jvd1wiPlxuICAgICAgICAgIDx0ZCBjbGFzcz1cImdvdnVrLXRhYmxlX19jZWxsIHdoaXRlc3BhY2UtaW5oZXJpdFwiPjxzcGFuIGNsYXNzPVwiZ292dWstIS1mb250LXdlaWdodC1ib2xkXCI+U3ViamVjdDo8L3NwYW4+XG4gICAgICAgICAgICB7e25vdGlmaWNhdGlvbj8uc3ViamVjdH19PC90ZD5cbiAgICAgICAgPC90cj5cbiAgICAgICAgPHRyIGNsYXNzPVwiZ292dWstdGFibGVfX3Jvd1wiPlxuICAgICAgICAgIDx0ZCBjbGFzcz1cImdvdnVrLXRhYmxlX19jZWxsIHdoaXRlc3BhY2UtaW5oZXJpdFwiPlxuICAgICAgICAgICAgPGRpdiBbaW5uZXJIVE1MXT1cIm5vdGlmaWNhdGlvbj8uaHRtbFwiPjwvZGl2PlxuICAgICAgICAgIDwvdGQ+XG4gICAgICAgIDwvdHI+XG4gICAgICA8L25nLWNvbnRhaW5lcj5cbiAgICAgIDxuZy1jb250YWluZXIgKm5nSWY9XCJub3RpZmljYXRpb24/LnRlbXBsYXRlX3R5cGUgPT09ICdsZXR0ZXInXCI+XG4gICAgICAgIDx0ciBjbGFzcz1cImdvdnVrLXRhYmxlX19yb3dcIj5cbiAgICAgICAgICA8dGQgY2xhc3M9XCJsZXR0ZXItcm93LWJvcmRlclwiPlxuICAgICAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdJZj1cIm5vdGlmaWNhdGlvbj8ucmVjaXBpZW50X2NvbnRhY3Q/LnJlY2lwaWVudF9tYWlsX2FkZHJlc3M/LmFkZHJlc3NfbGluZVwiPlxuICAgICAgICAgICAgICB7e25vdGlmaWNhdGlvbj8ucmVjaXBpZW50X2NvbnRhY3Q/LnJlY2lwaWVudF9tYWlsX2FkZHJlc3M/LmFkZHJlc3NfbGluZX19PGJyIC8+PC9uZy1jb250YWluZXI+XG4gICAgICAgICAgICA8bmctY29udGFpbmVyICpuZ0lmPVwibm90aWZpY2F0aW9uPy5yZWNpcGllbnRfY29udGFjdD8ucmVjaXBpZW50X21haWxfYWRkcmVzcz8uY2l0eVwiPlxuICAgICAgICAgICAgICB7e25vdGlmaWNhdGlvbj8ucmVjaXBpZW50X2NvbnRhY3Q/LnJlY2lwaWVudF9tYWlsX2FkZHJlc3M/LmNpdHl9fTxiciAvPjwvbmctY29udGFpbmVyPlxuICAgICAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdJZj1cIm5vdGlmaWNhdGlvbj8ucmVjaXBpZW50X2NvbnRhY3Q/LnJlY2lwaWVudF9tYWlsX2FkZHJlc3M/LmNvdW50eVwiPlxuICAgICAgICAgICAgICB7e25vdGlmaWNhdGlvbj8ucmVjaXBpZW50X2NvbnRhY3Q/LnJlY2lwaWVudF9tYWlsX2FkZHJlc3M/LmNvdW50eX19PGJyIC8+PC9uZy1jb250YWluZXI+XG4gICAgICAgICAgICA8bmctY29udGFpbmVyICpuZ0lmPVwibm90aWZpY2F0aW9uPy5yZWNpcGllbnRfY29udGFjdD8ucmVjaXBpZW50X21haWxfYWRkcmVzcz8uY291bnRyeVwiPlxuICAgICAgICAgICAgICB7e25vdGlmaWNhdGlvbj8ucmVjaXBpZW50X2NvbnRhY3Q/LnJlY2lwaWVudF9tYWlsX2FkZHJlc3M/LmNvdW50cnl9fTxiciAvPjwvbmctY29udGFpbmVyPlxuICAgICAgICAgICAge3tub3RpZmljYXRpb24/LnJlY2lwaWVudF9jb250YWN0Py5yZWNpcGllbnRfbWFpbF9hZGRyZXNzPy5wb3N0YWxfY29kZX19XG4gICAgICAgICAgPC90ZD5cbiAgICAgICAgPC90cj5cbiAgICAgICAgPHRyIGNsYXNzPVwiZ292dWstdGFibGVfX3Jvd1wiPlxuICAgICAgICAgIDx0ZCBjbGFzcz1cImxldHRlci1yb3ctYm9yZGVyXCI+e3sgdG9kYXkgfCBkYXRlOidkIE1NTU0geScgfX08L3RkPlxuICAgICAgICA8L3RyPlxuICAgICAgICA8dHIgY2xhc3M9XCJnb3Z1ay10YWJsZV9fcm93XCI+XG4gICAgICAgICAgPHRkIGNsYXNzPVwibGV0dGVyLXJvdy1ib3JkZXJcIj48c3BhbiBjbGFzcz1cImdvdnVrLSEtZm9udC13ZWlnaHQtYm9sZFwiPnt7bm90aWZpY2F0aW9uPy5zdWJqZWN0fX08L3NwYW4+PC90ZD5cbiAgICAgICAgPC90cj5cbiAgICAgICAgPHRyIGNsYXNzPVwiZ292dWstdGFibGVfX3Jvd1wiPlxuICAgICAgICAgIDx0ZCBjbGFzcz1cImdvdnVrLXRhYmxlX19jZWxsIHdoaXRlc3BhY2UtaW5oZXJpdFwiPlxuICAgICAgICAgICAgPGRpdiBbaW5uZXJIVE1MXT1cIm5vdGlmaWNhdGlvbj8uYm9keVwiPjwvZGl2PlxuICAgICAgICAgIDwvdGQ+XG4gICAgICAgIDwvdHI+XG4gICAgICA8L25nLWNvbnRhaW5lcj5cbiAgXG4gICAgPC90Ym9keT5cbiAgPC90YWJsZT5cbjwvZGl2PlxuIl19