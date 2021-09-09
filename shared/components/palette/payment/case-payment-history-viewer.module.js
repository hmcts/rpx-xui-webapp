"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var case_payment_history_viewer_field_component_1 = require("./case-payment-history-viewer-field.component");
var common_1 = require("@angular/common");
var forms_1 = require("@angular/forms");
var utils_module_1 = require("../utils/utils.module");
var ccpay_web_component_1 = require("@hmcts/ccpay-web-component");
var CasePaymentHistoryViewerModule = /** @class */ (function () {
    function CasePaymentHistoryViewerModule() {
    }
    CasePaymentHistoryViewerModule = __decorate([
        core_1.NgModule({
            imports: [
                common_1.CommonModule,
                forms_1.ReactiveFormsModule,
                utils_module_1.PaletteUtilsModule,
                ccpay_web_component_1.PaymentLibModule,
            ],
            declarations: [
                case_payment_history_viewer_field_component_1.CasePaymentHistoryViewerFieldComponent
            ],
            entryComponents: [
                case_payment_history_viewer_field_component_1.CasePaymentHistoryViewerFieldComponent,
            ]
        })
    ], CasePaymentHistoryViewerModule);
    return CasePaymentHistoryViewerModule;
}());
exports.CasePaymentHistoryViewerModule = CasePaymentHistoryViewerModule;
//# sourceMappingURL=case-payment-history-viewer.module.js.map