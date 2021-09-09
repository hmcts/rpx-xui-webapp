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
var palette_1 = require("../palette");
var services_1 = require("../../services");
var case_list_filters_component_1 = require("./case-list-filters.component");
var workbasket_filters_1 = require("../workbasket-filters");
var CaseListFiltersModule = /** @class */ (function () {
    function CaseListFiltersModule() {
    }
    CaseListFiltersModule = __decorate([
        core_1.NgModule({
            imports: [
                common_1.CommonModule,
                forms_1.FormsModule,
                forms_1.ReactiveFormsModule,
                palette_1.PaletteModule,
                services_1.DefinitionsModule,
                workbasket_filters_1.WorkbasketFiltersModule
            ],
            declarations: [
                case_list_filters_component_1.CaseListFiltersComponent,
            ],
            exports: [
                case_list_filters_component_1.CaseListFiltersComponent,
            ],
            providers: [
                services_1.WorkbasketInputFilterService,
                services_1.OrderService,
                services_1.JurisdictionService,
                services_1.AlertService,
                services_1.WindowService
            ]
        })
    ], CaseListFiltersModule);
    return CaseListFiltersModule;
}());
exports.CaseListFiltersModule = CaseListFiltersModule;
//# sourceMappingURL=case-list-filters.module.js.map