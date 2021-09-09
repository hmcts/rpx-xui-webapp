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
var workbasket_filters_component_1 = require("./workbasket-filters.component");
var palette_1 = require("../palette");
var services_1 = require("../../services");
var conditional_show_1 = require("../../directives/conditional-show");
var WorkbasketFiltersModule = /** @class */ (function () {
    function WorkbasketFiltersModule() {
    }
    WorkbasketFiltersModule = __decorate([
        core_1.NgModule({
            imports: [
                common_1.CommonModule,
                forms_1.FormsModule,
                forms_1.ReactiveFormsModule,
                palette_1.PaletteModule,
                conditional_show_1.ConditionalShowModule
            ],
            declarations: [
                workbasket_filters_component_1.WorkbasketFiltersComponent,
            ],
            exports: [
                workbasket_filters_component_1.WorkbasketFiltersComponent,
            ],
            providers: [
                services_1.WorkbasketInputFilterService,
                services_1.OrderService,
                services_1.JurisdictionService,
                services_1.AlertService,
                services_1.WindowService,
            ]
        })
    ], WorkbasketFiltersModule);
    return WorkbasketFiltersModule;
}());
exports.WorkbasketFiltersModule = WorkbasketFiltersModule;
//# sourceMappingURL=workbasket-filters.module.js.map