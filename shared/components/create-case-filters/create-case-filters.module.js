"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var create_case_filters_component_1 = require("./create-case-filters.component");
var common_1 = require("@angular/common");
var errors_module_1 = require("../error/errors.module");
var forms_1 = require("@angular/forms");
var services_1 = require("../../services");
var CreateCaseFiltersModule = /** @class */ (function () {
    function CreateCaseFiltersModule() {
    }
    CreateCaseFiltersModule = __decorate([
        core_1.NgModule({
            imports: [
                common_1.CommonModule,
                errors_module_1.ErrorsModule,
                forms_1.FormsModule,
                forms_1.ReactiveFormsModule,
                services_1.DefinitionsModule
            ],
            declarations: [
                create_case_filters_component_1.CreateCaseFiltersComponent
            ],
            exports: [
                create_case_filters_component_1.CreateCaseFiltersComponent
            ]
        })
    ], CreateCaseFiltersModule);
    return CreateCaseFiltersModule;
}());
exports.CreateCaseFiltersModule = CreateCaseFiltersModule;
//# sourceMappingURL=create-case-filters.module.js.map