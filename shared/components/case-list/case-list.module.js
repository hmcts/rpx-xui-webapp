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
var router_1 = require("@angular/router");
var case_list_component_1 = require("./case-list.component");
var services_1 = require("../../services");
var CaseListModule = /** @class */ (function () {
    function CaseListModule() {
    }
    CaseListModule = __decorate([
        core_1.NgModule({
            imports: [
                common_1.CommonModule,
                forms_1.FormsModule,
                router_1.RouterModule
            ],
            declarations: [case_list_component_1.CaseListComponent],
            exports: [case_list_component_1.CaseListComponent],
            providers: [
                services_1.BrowserService
            ]
        })
    ], CaseListModule);
    return CaseListModule;
}());
exports.CaseListModule = CaseListModule;
//# sourceMappingURL=case-list.module.js.map