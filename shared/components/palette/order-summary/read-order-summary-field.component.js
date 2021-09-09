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
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var abstract_field_read_component_1 = require("../base-field/abstract-field-read.component");
var ReadOrderSummaryFieldComponent = /** @class */ (function (_super) {
    __extends(ReadOrderSummaryFieldComponent, _super);
    function ReadOrderSummaryFieldComponent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ReadOrderSummaryFieldComponent.prototype.getFees = function () {
        return this.caseField.value ? this.caseField.value.Fees : [];
    };
    ReadOrderSummaryFieldComponent.prototype.getPaymentTotal = function () {
        return this.caseField.value ? this.caseField.value.PaymentTotal : '';
    };
    ReadOrderSummaryFieldComponent = __decorate([
        core_1.Component({
            selector: 'ccd-read-order-summary-field',
            template: "\n    <div class=\"order-summary-title\">Order Summary</div>\n    <table>\n        <thead>\n          <tr><td>Code</td><td>Description</td><td>Amount</td></tr>\n        </thead>\n        <tbody>\n            <tr ccdReadOrderSummaryRow *ngFor=\"let feeValue of getFees()\" [feeValue]=\"feeValue\"></tr>\n            <tr>\n                <td></td>\n                <td class=\"payment-total\">Total</td>\n                <td><ccd-read-money-gbp-field [amount]=\"getPaymentTotal()\"></ccd-read-money-gbp-field></td>\n            </tr>\n        </tbody>\n    </table>\n  ",
            styles: ["\n    .order-summary-title{border:0;font-family:\"nta\",Arial,sans-serif;font-weight:700;text-transform:none;font-size:18px;line-height:1.2}@media (min-width: 641px){.order-summary-title{font-size:24px;line-height:1.25}}table{margin-bottom:23px}table thead tr td{margin:0;border-bottom:1px solid #0b0c0c;padding-top:41px;padding-bottom:36px;font-family:\"nta\",Arial,sans-serif;font-weight:700;text-transform:none;font-size:14px;line-height:1.14286}@media (min-width: 641px){table thead tr td{font-size:16px;line-height:1.25}}table thead tr td:nth-child(3){text-align:right}table tbody tr td{padding-top:12px;padding-bottom:12px;margin:0;border-bottom:1px solid #0b0c0c;font-family:\"nta\",Arial,sans-serif;font-weight:400;text-transform:none;font-size:14px;line-height:1.14286}@media (min-width: 641px){table tbody tr td{font-size:16px;line-height:1.25}}table tbody tr td:nth-child(1){width:20px}table tbody tr td:nth-child(2){width:70%}table tbody tr td:nth-child(3){text-align:right;width:10%}table tbody tr:last-child td:nth-child(1){border-bottom:0px}table tbody tr:last-child td:nth-child(2){font-family:\"nta\",Arial,sans-serif;font-weight:700;text-transform:none;font-size:14px;line-height:1.14286;text-align:right;border-bottom:0px}@media (min-width: 641px){table tbody tr:last-child td:nth-child(2){font-size:16px;line-height:1.25}}\n  "],
        })
    ], ReadOrderSummaryFieldComponent);
    return ReadOrderSummaryFieldComponent;
}(abstract_field_read_component_1.AbstractFieldReadComponent));
exports.ReadOrderSummaryFieldComponent = ReadOrderSummaryFieldComponent;
//# sourceMappingURL=read-order-summary-field.component.js.map