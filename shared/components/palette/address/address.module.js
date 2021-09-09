"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var write_address_field_component_1 = require("./write-address-field.component");
var conditional_show_module_1 = require("../../../directives/conditional-show/conditional-show.module");
var complex_module_1 = require("../complex/complex.module");
var common_1 = require("@angular/common");
var forms_1 = require("@angular/forms");
var markdown_module_1 = require("../../markdown/markdown.module");
var utils_module_1 = require("../utils/utils.module");
var focus_element_1 = require("../../../directives/focus-element");
var AddressModule = /** @class */ (function () {
    function AddressModule() {
    }
    AddressModule = __decorate([
        core_1.NgModule({
            imports: [
                conditional_show_module_1.ConditionalShowModule,
                common_1.CommonModule,
                complex_module_1.ComplexModule,
                forms_1.ReactiveFormsModule,
                markdown_module_1.MarkdownModule,
                utils_module_1.PaletteUtilsModule,
                focus_element_1.FocusElementModule
            ],
            declarations: [
                write_address_field_component_1.WriteAddressFieldComponent
            ],
            entryComponents: [
                write_address_field_component_1.WriteAddressFieldComponent,
            ]
        })
    ], AddressModule);
    return AddressModule;
}());
exports.AddressModule = AddressModule;
//# sourceMappingURL=address.module.js.map