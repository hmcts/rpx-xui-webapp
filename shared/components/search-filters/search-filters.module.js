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
var services_1 = require("../../services");
var search_filters_component_1 = require("./search-filters.component");
var palette_1 = require("../palette");
var forms_1 = require("@angular/forms");
var definitions_1 = require("../../services/definitions");
var search_filters_wrapper_component_1 = require("./search-filters-wrapper.component");
var conditional_show_1 = require("../../directives/conditional-show");
var SearchFiltersModule = /** @class */ (function () {
    function SearchFiltersModule() {
    }
    SearchFiltersModule = __decorate([
        core_1.NgModule({
            imports: [
                common_1.CommonModule,
                forms_1.FormsModule,
                forms_1.ReactiveFormsModule,
                palette_1.PaletteModule,
                definitions_1.DefinitionsModule,
                conditional_show_1.ConditionalShowModule
            ],
            declarations: [
                search_filters_component_1.SearchFiltersComponent,
                search_filters_wrapper_component_1.SearchFiltersWrapperComponent
            ],
            exports: [
                search_filters_component_1.SearchFiltersComponent,
                search_filters_wrapper_component_1.SearchFiltersWrapperComponent
            ],
            providers: [
                services_1.SearchService,
                services_1.OrderService,
                services_1.JurisdictionService,
                services_1.WindowService
            ]
        })
    ], SearchFiltersModule);
    return SearchFiltersModule;
}());
exports.SearchFiltersModule = SearchFiltersModule;
//# sourceMappingURL=search-filters.module.js.map