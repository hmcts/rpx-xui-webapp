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
var phase_component_1 = require("./phase/phase.component");
var header_bar_component_1 = require("./header-bar/header-bar.component");
var navigation_component_1 = require("./navigation/navigation.component");
var navigation_item_component_1 = require("./navigation/navigation-item.component");
var HeadersModule = /** @class */ (function () {
    function HeadersModule() {
    }
    HeadersModule = __decorate([
        core_1.NgModule({
            imports: [common_1.CommonModule, router_1.RouterModule],
            declarations: [phase_component_1.PhaseComponent, header_bar_component_1.HeaderBarComponent, navigation_component_1.NavigationComponent, navigation_item_component_1.NavigationItemComponent],
            exports: [phase_component_1.PhaseComponent, header_bar_component_1.HeaderBarComponent, navigation_component_1.NavigationComponent, navigation_item_component_1.NavigationItemComponent]
        })
    ], HeadersModule);
    return HeadersModule;
}());
exports.HeadersModule = HeadersModule;
//# sourceMappingURL=headers.module.js.map