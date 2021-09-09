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
var utils_module_1 = require("../utils/utils.module");
var forms_1 = require("@angular/forms");
var markdown_module_1 = require("../../markdown/markdown.module");
var write_dynamic_list_field_component_1 = require("./write-dynamic-list-field.component");
var read_dynamic_list_field_component_1 = require("./read-dynamic-list-field.component");
var dynamic_list_pipe_1 = require("./dynamic-list.pipe");
var DynamicListModule = /** @class */ (function () {
    function DynamicListModule() {
    }
    DynamicListModule = __decorate([
        core_1.NgModule({
            imports: [
                common_1.CommonModule,
                utils_module_1.PaletteUtilsModule,
                forms_1.ReactiveFormsModule,
                markdown_module_1.MarkdownModule,
                forms_1.FormsModule
            ],
            declarations: [
                dynamic_list_pipe_1.DynamicListPipe,
                read_dynamic_list_field_component_1.ReadDynamicListFieldComponent,
                write_dynamic_list_field_component_1.WriteDynamicListFieldComponent
            ],
            entryComponents: [
                read_dynamic_list_field_component_1.ReadDynamicListFieldComponent,
                write_dynamic_list_field_component_1.WriteDynamicListFieldComponent
            ],
            exports: [
                dynamic_list_pipe_1.DynamicListPipe
            ]
        })
    ], DynamicListModule);
    return DynamicListModule;
}());
exports.DynamicListModule = DynamicListModule;
//# sourceMappingURL=dynamic-list.module.js.map