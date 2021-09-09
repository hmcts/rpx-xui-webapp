"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var read_case_link_field_component_1 = require("./read-case-link-field.component");
var write_case_link_field_component_1 = require("./write-case-link-field.component");
var common_1 = require("@angular/common");
var forms_1 = require("@angular/forms");
var pipes_1 = require("../../../pipes");
var utils_module_1 = require("../utils/utils.module");
var CaseLinkModule = /** @class */ (function () {
    function CaseLinkModule() {
    }
    CaseLinkModule = __decorate([
        core_1.NgModule({
            imports: [
                common_1.CommonModule,
                forms_1.ReactiveFormsModule,
                pipes_1.PipesModule,
                utils_module_1.PaletteUtilsModule,
            ],
            declarations: [
                read_case_link_field_component_1.ReadCaseLinkFieldComponent,
                write_case_link_field_component_1.WriteCaseLinkFieldComponent,
            ],
            exports: [
                read_case_link_field_component_1.ReadCaseLinkFieldComponent,
                write_case_link_field_component_1.WriteCaseLinkFieldComponent,
            ]
        })
    ], CaseLinkModule);
    return CaseLinkModule;
}());
exports.CaseLinkModule = CaseLinkModule;
//# sourceMappingURL=case-link.module.js.map