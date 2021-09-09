"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
var abstract_field_read_component_1 = require("../base-field/abstract-field-read.component");
var core_1 = require("@angular/core");
var app_config_1 = require("../../../../app.config");
var CasePaymentHistoryViewerFieldComponent = /** @class */ (function (_super) {
    __extends(CasePaymentHistoryViewerFieldComponent, _super);
    function CasePaymentHistoryViewerFieldComponent(appConfig) {
        var _this = _super.call(this) || this;
        _this.appConfig = appConfig;
        return _this;
    }
    CasePaymentHistoryViewerFieldComponent.prototype.getBaseURL = function () {
        return this.appConfig.getPaymentsUrl();
    };
    CasePaymentHistoryViewerFieldComponent.prototype.getPayBulkScanBaseURL = function () {
        return this.appConfig.getPayBulkScanBaseUrl();
    };
    CasePaymentHistoryViewerFieldComponent = __decorate([
        core_1.Component({
            selector: 'ccd-case-payment-history-viewer-field',
            template: "\n    <ccpay-payment-lib [API_ROOT]=\"getBaseURL()\" [CCD_CASE_NUMBER]=\"caseReference\" [BULKSCAN_API_ROOT]=\"getPayBulkScanBaseURL()\" [SELECTED_OPTION]=\"'CCDorException'\" [ISBSENABLE]=\"'true'\"></ccpay-payment-lib>\n  ",
        }),
        __metadata("design:paramtypes", [app_config_1.AbstractAppConfig])
    ], CasePaymentHistoryViewerFieldComponent);
    return CasePaymentHistoryViewerFieldComponent;
}(abstract_field_read_component_1.AbstractFieldReadComponent));
exports.CasePaymentHistoryViewerFieldComponent = CasePaymentHistoryViewerFieldComponent;
//# sourceMappingURL=case-payment-history-viewer-field.component.js.map