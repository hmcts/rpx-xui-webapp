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
var dynamic_radio_list_pipe_1 = require("./dynamic-radio-list.pipe");
var read_dynamic_radio_list_field_component_1 = require("./read-dynamic-radio-list-field.component");
var write_dynamic_radio_list_field_component_1 = require("./write-dynamic-radio-list-field.component");
var utils_module_1 = require("../utils/utils.module");
var forms_1 = require("@angular/forms");
var markdown_module_1 = require("../../markdown/markdown.module");
var DynamicRadioListModule = /** @class */ (function () {
    function DynamicRadioListModule() {
    }
    DynamicRadioListModule = __decorate([
        core_1.NgModule({
            imports: [
                common_1.CommonModule,
                utils_module_1.PaletteUtilsModule,
                forms_1.ReactiveFormsModule,
                markdown_module_1.MarkdownModule
            ],
            declarations: [
                dynamic_radio_list_pipe_1.DynamicRadioListPipe,
                read_dynamic_radio_list_field_component_1.ReadDynamicRadioListFieldComponent,
                write_dynamic_radio_list_field_component_1.WriteDynamicRadioListFieldComponent
            ],
            entryComponents: [
                read_dynamic_radio_list_field_component_1.ReadDynamicRadioListFieldComponent,
                write_dynamic_radio_list_field_component_1.WriteDynamicRadioListFieldComponent
            ],
            exports: [
                dynamic_radio_list_pipe_1.DynamicRadioListPipe
            ]
        })
    ], DynamicRadioListModule);
    return DynamicRadioListModule;
}());
exports.DynamicRadioListModule = DynamicRadioListModule;
//# sourceMappingURL=dynamic-radio-list.module.js.map