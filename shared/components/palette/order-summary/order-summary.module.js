"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var write_order_summary_field_component_1 = require("./write-order-summary-field.component");
var complex_module_1 = require("../complex/complex.module");
var common_1 = require("@angular/common");
var forms_1 = require("@angular/forms");
var utils_module_1 = require("../utils/utils.module");
var money_gbp_module_1 = require("../money-gbp/money-gbp.module");
var read_order_summary_field_component_1 = require("./read-order-summary-field.component");
var read_order_summary_row_component_1 = require("./read-order-summary-row.component");
var OrderSummaryModule = /** @class */ (function () {
    function OrderSummaryModule() {
    }
    OrderSummaryModule = __decorate([
        core_1.NgModule({
            imports: [
                common_1.CommonModule,
                complex_module_1.ComplexModule,
                forms_1.ReactiveFormsModule,
                utils_module_1.PaletteUtilsModule,
                money_gbp_module_1.MoneyGbpModule
            ],
            declarations: [
                write_order_summary_field_component_1.WriteOrderSummaryFieldComponent,
                read_order_summary_field_component_1.ReadOrderSummaryFieldComponent,
                read_order_summary_row_component_1.ReadOrderSummaryRowComponent,
            ],
            entryComponents: [
                write_order_summary_field_component_1.WriteOrderSummaryFieldComponent,
                read_order_summary_field_component_1.ReadOrderSummaryFieldComponent,
                read_order_summary_row_component_1.ReadOrderSummaryRowComponent,
            ],
        })
    ], OrderSummaryModule);
    return OrderSummaryModule;
}());
exports.OrderSummaryModule = OrderSummaryModule;
//# sourceMappingURL=order-summary.module.js.map