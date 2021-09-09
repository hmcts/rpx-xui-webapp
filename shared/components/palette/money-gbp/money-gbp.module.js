"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var forms_1 = require("@angular/forms");
var utils_module_1 = require("../utils/utils.module");
var read_money_gbp_field_component_1 = require("./read-money-gbp-field.component");
var write_money_gbp_field_component_1 = require("./write-money-gbp-field.component");
var money_gbp_input_component_1 = require("./money-gbp-input.component");
var markdown_module_1 = require("../../markdown/markdown.module");
var MoneyGbpModule = /** @class */ (function () {
    function MoneyGbpModule() {
    }
    MoneyGbpModule = __decorate([
        core_1.NgModule({
            imports: [
                common_1.CommonModule,
                forms_1.ReactiveFormsModule,
                utils_module_1.PaletteUtilsModule,
                markdown_module_1.MarkdownModule
            ],
            declarations: [
                read_money_gbp_field_component_1.ReadMoneyGbpFieldComponent,
                write_money_gbp_field_component_1.WriteMoneyGbpFieldComponent,
                money_gbp_input_component_1.MoneyGbpInputComponent
            ],
            entryComponents: [
                read_money_gbp_field_component_1.ReadMoneyGbpFieldComponent,
                write_money_gbp_field_component_1.WriteMoneyGbpFieldComponent
            ],
            exports: [
                read_money_gbp_field_component_1.ReadMoneyGbpFieldComponent
            ]
        })
    ], MoneyGbpModule);
    return MoneyGbpModule;
}());
exports.MoneyGbpModule = MoneyGbpModule;
//# sourceMappingURL=money-gbp.module.js.map