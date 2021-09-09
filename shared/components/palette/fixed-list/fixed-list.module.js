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
var fixed_list_pipe_1 = require("./fixed-list.pipe");
var read_fixed_list_field_component_1 = require("./read-fixed-list-field.component");
var write_fixed_list_field_component_1 = require("./write-fixed-list-field.component");
var utils_module_1 = require("../utils/utils.module");
var forms_1 = require("@angular/forms");
var markdown_module_1 = require("../../markdown/markdown.module");
var FixedListModule = /** @class */ (function () {
    function FixedListModule() {
    }
    FixedListModule = __decorate([
        core_1.NgModule({
            imports: [
                common_1.CommonModule,
                utils_module_1.PaletteUtilsModule,
                forms_1.ReactiveFormsModule,
                markdown_module_1.MarkdownModule,
                forms_1.FormsModule
            ],
            declarations: [
                fixed_list_pipe_1.FixedListPipe,
                read_fixed_list_field_component_1.ReadFixedListFieldComponent,
                write_fixed_list_field_component_1.WriteFixedListFieldComponent
            ],
            entryComponents: [
                read_fixed_list_field_component_1.ReadFixedListFieldComponent,
                write_fixed_list_field_component_1.WriteFixedListFieldComponent
            ],
            exports: [
                fixed_list_pipe_1.FixedListPipe
            ]
        })
    ], FixedListModule);
    return FixedListModule;
}());
exports.FixedListModule = FixedListModule;
//# sourceMappingURL=fixed-list.module.js.map