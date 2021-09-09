"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var AlertMessageType;
(function (AlertMessageType) {
    AlertMessageType["WARNING"] = "warning";
    AlertMessageType["SUCCESS"] = "success";
    AlertMessageType["ERROR"] = "error";
})(AlertMessageType || (AlertMessageType = {}));
var AlertComponent = /** @class */ (function () {
    function AlertComponent() {
        this.alertMessageType = AlertMessageType;
        this.showIcon = true;
    }
    // confirmation type has been removed as per EUI-3232
    AlertComponent.TYPE_WARNING = 'warning';
    AlertComponent.TYPE_SUCCESS = 'success';
    AlertComponent.TYPE_ERROR = 'error';
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], AlertComponent.prototype, "type", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], AlertComponent.prototype, "showIcon", void 0);
    AlertComponent = __decorate([
        core_1.Component({
            selector: 'cut-alert',
            template: "\n    <div [ngClass]=\"{'hmcts-banner hmcts-banner--warning':type === alertMessageType.WARNING || type === alertMessageType.ERROR}\">\n      <div [ngClass]=\"{'hmcts-banner hmcts-banner--success':type === alertMessageType.SUCCESS}\">\n        <ng-container [ngSwitch]=\"type\">\n          <ng-container *ngSwitchCase=\"alertMessageType.WARNING\">\n            <svg class=\"hmcts-banner__icon\" fill=\"currentColor\" role=\"presentation\" focusable=\"false\"\n              xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 25 25\" height=\"25\" width=\"25\">\n              <path d=\"M13.6,15.4h-2.3v-4.5h2.3V15.4z M13.6,19.8h-2.3v-2.2h2.3V19.8z M0,23.2h25L12.5,2L0,23.2z\"></path>\n            </svg>\n          </ng-container>\n          <ng-container *ngSwitchCase=\"alertMessageType.ERROR\">\n            <svg class=\"hmcts-banner__icon\" fill=\"currentColor\" role=\"presentation\" focusable=\"false\"\n              xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 25 25\" height=\"25\" width=\"25\">\n              <path d=\"M13.6,15.4h-2.3v-4.5h2.3V15.4z M13.6,19.8h-2.3v-2.2h2.3V19.8z M0,23.2h25L12.5,2L0,23.2z\"></path>\n            </svg>\n          </ng-container>\n          <ng-container *ngSwitchCase=\"alertMessageType.SUCCESS\">\n            <svg class=\"hmcts-banner__icon\" fill=\"currentColor\" role=\"presentation\" focusable=\"false\"\n              xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 25 25\" height=\"25\" width=\"25\">\n              <path d=\"M25,6.2L8.7,23.2L0,14.1l4-4.2l4.7,4.9L21,2L25,6.2z\"></path>\n            </svg>\n          </ng-container>\n        </ng-container>\n        <div class=\"hmcts-banner__message\">\n          <span class=\"hmcts-banner__assistive\">{{type}}</span>\n          <ng-content></ng-content>\n        </div>\n      </div>\n    </div>\n  ",
            styles: ["\n    .alert:after{content:'';display:table;clear:both}.alert{color:#fff;padding:10px;font-size:16px;line-height:1.25}.alert-error{background-color:#df3034}.alert-warning{background-color:#912b88}.alert-success,.alert-confirmation{background-color:#006435}.alert-success .icon-tick,.alert-confirmation .icon-tick{height:20px;width:20px;background-size:cover}.alert-message{color:#fff;display:table-cell;font-weight:bold}.alert-message a,.alert-message a:visited{color:#fff;text-decoration:underline}.alert .icon{display:table-cell;vertical-align:top}.alert .icon+.alert-message{padding-left:10px}\n  "]
        })
    ], AlertComponent);
    return AlertComponent;
}());
exports.AlertComponent = AlertComponent;
//# sourceMappingURL=alert.component.js.map