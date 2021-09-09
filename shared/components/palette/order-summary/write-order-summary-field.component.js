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
var abstract_field_write_component_1 = require("../base-field/abstract-field-write.component");
var forms_1 = require("@angular/forms");
var WriteOrderSummaryFieldComponent = /** @class */ (function (_super) {
    __extends(WriteOrderSummaryFieldComponent, _super);
    function WriteOrderSummaryFieldComponent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /*
      These are implemented manually rather than using WriteComplexFieldComponent. The reason
      is because the view is readonly the tree of form controls is not being built automatically
      and has to be built manually.
    */
    WriteOrderSummaryFieldComponent.prototype.ngOnInit = function () {
        var _this = this;
        var orderSummaryGroup = this.registerControl(new forms_1.FormGroup({}), true);
        var paymentReference = new forms_1.FormControl(this.caseField.value.PaymentReference);
        orderSummaryGroup.addControl('PaymentReference', paymentReference);
        var paymentTotal = new forms_1.FormControl(this.caseField.value.PaymentTotal);
        orderSummaryGroup.addControl('PaymentTotal', paymentTotal);
        var feesArray = new forms_1.FormArray([]);
        this.caseField.value.Fees.forEach(function (fee) {
            feesArray.push(_this.getFeeValue(fee.value));
        });
        orderSummaryGroup.addControl('Fees', feesArray);
    };
    WriteOrderSummaryFieldComponent.prototype.getFeeValue = function (feeValue) {
        var feeGroup = new forms_1.FormGroup({});
        feeGroup.addControl('FeeCode', new forms_1.FormControl(feeValue.FeeCode));
        feeGroup.addControl('FeeAmount', new forms_1.FormControl(feeValue.FeeAmount));
        feeGroup.addControl('FeeDescription', new forms_1.FormControl(feeValue.FeeDescription));
        feeGroup.addControl('FeeVersion', new forms_1.FormControl(feeValue.FeeVersion));
        var feeValueGroup = new forms_1.FormGroup({});
        feeValueGroup.addControl('value', feeGroup);
        return feeValueGroup;
    };
    WriteOrderSummaryFieldComponent = __decorate([
        core_1.Component({
            selector: 'ccd-write-order-summary-field',
            template: "\n    <ccd-read-order-summary-field [caseField]=\"caseField\"></ccd-read-order-summary-field>\n  "
        })
    ], WriteOrderSummaryFieldComponent);
    return WriteOrderSummaryFieldComponent;
}(abstract_field_write_component_1.AbstractFieldWriteComponent));
exports.WriteOrderSummaryFieldComponent = WriteOrderSummaryFieldComponent;
//# sourceMappingURL=write-order-summary-field.component.js.map