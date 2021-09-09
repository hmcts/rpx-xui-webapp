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
var core_1 = require("@angular/core");
var abstract_field_read_component_1 = require("../base-field/abstract-field-read.component");
var fee_value_model_1 = require("./fee-value.model");
var ReadOrderSummaryRowComponent = /** @class */ (function (_super) {
    __extends(ReadOrderSummaryRowComponent, _super);
    function ReadOrderSummaryRowComponent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ReadOrderSummaryRowComponent.prototype.ngOnInit = function () {
        // We don't want to register this if we don't have a caseField
        if (this.caseField) {
            _super.prototype.ngOnInit.call(this);
        }
    };
    ReadOrderSummaryRowComponent.prototype.getFeeAmount = function () {
        return this.feeValue.value ? this.feeValue.value.FeeAmount : '';
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", fee_value_model_1.FeeValue)
    ], ReadOrderSummaryRowComponent.prototype, "feeValue", void 0);
    ReadOrderSummaryRowComponent = __decorate([
        core_1.Component({
            // tslint:disable-next-line
            selector: '[ccdReadOrderSummaryRow]',
            template: "\n    <td>{{feeValue.value.FeeCode}}</td>\n    <td>{{feeValue.value.FeeDescription}}</td>\n    <td><ccd-read-money-gbp-field [amount]=\"getFeeAmount()\"></ccd-read-money-gbp-field></td>\n  ",
            styles: ["\n    td{padding-top:12px;padding-bottom:12px;margin:0;border-bottom:1px solid #0b0c0c;font-family:\"nta\",Arial,sans-serif;font-weight:400;text-transform:none;font-size:14px;line-height:1.14286}@media (min-width: 641px){td{font-size:16px;line-height:1.25}}td:nth-child(1){width:20px}td:nth-child(2){width:70%}td:nth-child(3){text-align:right;width:10%}\n  "],
        })
    ], ReadOrderSummaryRowComponent);
    return ReadOrderSummaryRowComponent;
}(abstract_field_read_component_1.AbstractFieldReadComponent));
exports.ReadOrderSummaryRowComponent = ReadOrderSummaryRowComponent;
//# sourceMappingURL=read-order-summary-row.component.js.map