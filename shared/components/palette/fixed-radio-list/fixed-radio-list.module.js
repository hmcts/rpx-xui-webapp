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
var fixed_radio_list_pipe_1 = require("./fixed-radio-list.pipe");
var read_fixed_radio_list_field_component_1 = require("./read-fixed-radio-list-field.component");
var write_fixed_radio_list_field_component_1 = require("./write-fixed-radio-list-field.component");
var utils_module_1 = require("../utils/utils.module");
var forms_1 = require("@angular/forms");
var markdown_module_1 = require("../../markdown/markdown.module");
var FixedRadioListModule = /** @class */ (function () {
    function FixedRadioListModule() {
    }
    FixedRadioListModule = __decorate([
        core_1.NgModule({
            imports: [
                common_1.CommonModule,
                utils_module_1.PaletteUtilsModule,
                forms_1.ReactiveFormsModule,
                markdown_module_1.MarkdownModule
            ],
            declarations: [
                fixed_radio_list_pipe_1.FixedRadioListPipe,
                read_fixed_radio_list_field_component_1.ReadFixedRadioListFieldComponent,
                write_fixed_radio_list_field_component_1.WriteFixedRadioListFieldComponent
            ],
            entryComponents: [
                read_fixed_radio_list_field_component_1.ReadFixedRadioListFieldComponent,
                write_fixed_radio_list_field_component_1.WriteFixedRadioListFieldComponent
            ],
            exports: [
                fixed_radio_list_pipe_1.FixedRadioListPipe
            ]
        })
    ], FixedRadioListModule);
    return FixedRadioListModule;
}());
exports.FixedRadioListModule = FixedRadioListModule;
//# sourceMappingURL=fixed-radio-list.module.js.map