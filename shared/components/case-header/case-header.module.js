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
var case_header_component_1 = require("./case-header.component");
var palette_1 = require("../palette");
var pipes_1 = require("../../pipes");
var CaseHeaderModule = /** @class */ (function () {
    function CaseHeaderModule() {
    }
    CaseHeaderModule = __decorate([
        core_1.NgModule({
            imports: [
                common_1.CommonModule,
                router_1.RouterModule,
                palette_1.PaletteModule,
                pipes_1.PipesModule,
            ],
            declarations: [
                case_header_component_1.CaseHeaderComponent,
            ],
            exports: [
                case_header_component_1.CaseHeaderComponent,
            ]
        })
    ], CaseHeaderModule);
    return CaseHeaderModule;
}());
exports.CaseHeaderModule = CaseHeaderModule;
//# sourceMappingURL=case-header.module.js.map