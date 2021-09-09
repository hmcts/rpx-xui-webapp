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
var read_yes_no_field_component_1 = require("./read-yes-no-field.component");
var yes_no_service_1 = require("./yes-no.service");
var write_yes_no_field_component_1 = require("./write-yes-no-field.component");
var forms_1 = require("@angular/forms");
var utils_module_1 = require("../utils/utils.module");
var markdown_module_1 = require("../../markdown/markdown.module");
var YesNoModule = /** @class */ (function () {
    function YesNoModule() {
    }
    YesNoModule = __decorate([
        core_1.NgModule({
            imports: [
                common_1.CommonModule,
                forms_1.ReactiveFormsModule,
                utils_module_1.PaletteUtilsModule,
                markdown_module_1.MarkdownModule
            ],
            declarations: [
                read_yes_no_field_component_1.ReadYesNoFieldComponent,
                write_yes_no_field_component_1.WriteYesNoFieldComponent
            ],
            entryComponents: [
                read_yes_no_field_component_1.ReadYesNoFieldComponent,
                write_yes_no_field_component_1.WriteYesNoFieldComponent
            ],
            providers: [
                yes_no_service_1.YesNoService
            ]
        })
    ], YesNoModule);
    return YesNoModule;
}());
exports.YesNoModule = YesNoModule;
//# sourceMappingURL=yes-no.module.js.map