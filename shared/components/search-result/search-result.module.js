"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var search_result_component_1 = require("./search-result.component");
var services_1 = require("../../services");
var common_1 = require("@angular/common");
var ngx_pagination_1 = require("ngx-pagination");
var pipes_1 = require("../../pipes");
var router_1 = require("@angular/router");
var palette_1 = require("../palette");
var forms_1 = require("@angular/forms");
var activity_1 = require("../activity");
var directives_1 = require("../../directives");
var pagination_module_1 = require("../pagination/pagination.module");
var SearchResultModule = /** @class */ (function () {
    function SearchResultModule() {
    }
    SearchResultModule = __decorate([
        core_1.NgModule({
            imports: [
                common_1.CommonModule,
                ngx_pagination_1.NgxPaginationModule,
                pipes_1.PipesModule,
                router_1.RouterModule,
                forms_1.FormsModule,
                forms_1.ReactiveFormsModule,
                palette_1.PaletteModule,
                activity_1.ActivityModule,
                directives_1.LabelSubstitutorModule,
                pagination_module_1.PaginationModule
            ],
            declarations: [
                search_result_component_1.SearchResultComponent,
            ],
            exports: [
                search_result_component_1.SearchResultComponent,
            ],
            providers: [
                services_1.SearchResultViewItemComparatorFactory,
                services_1.BrowserService
            ]
        })
    ], SearchResultModule);
    return SearchResultModule;
}());
exports.SearchResultModule = SearchResultModule;
//# sourceMappingURL=search-result.module.js.map