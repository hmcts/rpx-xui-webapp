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
var router_1 = require("@angular/router");
var palette_1 = require("../palette");
var case_history_component_1 = require("./case-history.component");
var services_1 = require("./services");
var case_header_1 = require("../case-header");
var directives_1 = require("../../directives");
var CaseHistoryModule = /** @class */ (function () {
    function CaseHistoryModule() {
    }
    CaseHistoryModule = __decorate([
        core_1.NgModule({
            imports: [
                common_1.CommonModule,
                router_1.RouterModule,
                palette_1.PaletteModule,
                case_header_1.CaseHeaderModule,
                directives_1.ConditionalShowModule,
                directives_1.LabelSubstitutorModule,
                palette_1.ComplexModule,
            ],
            declarations: [
                case_history_component_1.CaseHistoryComponent,
            ],
            providers: [
                services_1.CaseHistoryService,
            ],
            exports: [
                case_history_component_1.CaseHistoryComponent,
            ]
        })
    ], CaseHistoryModule);
    return CaseHistoryModule;
}());
exports.CaseHistoryModule = CaseHistoryModule;
//# sourceMappingURL=case-history.module.js.map