"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var tab_component_1 = require("./tab.component");
var router_1 = require("@angular/router");
var TabsComponent = /** @class */ (function () {
    function TabsComponent(route) {
        this.route = route;
        this.panelIds = [];
    }
    TabsComponent.prototype.ngAfterContentInit = function () {
        var _this = this;
        this.panels.forEach(function (panel) { return _this.panelIds.push(panel.id); });
        this.show(this.route.snapshot.fragment);
    };
    TabsComponent.prototype.show = function (id) {
        var panels = this.panels.toArray();
        id = id || panels[0].id;
        if (0 > this.panelIds.indexOf(id)) {
            id = panels[0].id;
        }
        panels.forEach(function (panel) { return panel.selected = id === panel.id; });
    };
    __decorate([
        core_1.ViewChildren('tab'),
        __metadata("design:type", core_1.QueryList)
    ], TabsComponent.prototype, "tabs", void 0);
    __decorate([
        core_1.ContentChildren(tab_component_1.TabComponent),
        __metadata("design:type", core_1.QueryList)
    ], TabsComponent.prototype, "panels", void 0);
    TabsComponent = __decorate([
        core_1.Component({
            selector: 'cut-tabs',
            template: "\n    <div class=\"tabs\">\n\n      <ul class=\"tabs-list\" role=\"list\">\n        <li class=\"tabs-list-item\" *ngFor=\"let panel of panels\">\n          <a\n            class=\"tabs-toggle\"\n            [routerLink]=\"['.']\"\n            [fragment]=\"panel.id\"\n            role=\"tab\"\n            (click)=\"show(panel.id)\"\n            [attr.aria-controls]=\"panel.id\"\n            [attr.aria-selected]=\"panel.selected\"\n            tabindex=\"0\"\n            [ngClass]=\"{\n              'tabs-toggle-selected': panel.selected\n            }\"\n            #tab\n          >{{panel.title}}</a>\n        </li>\n      </ul>\n\n      <div class=\"tabs-content\">\n        <ng-content></ng-content>\n      </div>\n\n    </div>\n  ",
            styles: ["\n    .tabs-toggle{display:block;padding-right:15px;padding-left:15px;padding-top:10px;padding-bottom:3px;margin-bottom:8px}.tabs-toggle[aria-selected=true]{color:#0b0c0c;text-decoration:none;border-bottom:none}.tabs-toggle a{color:#005ea5}@media (max-width: 640px){.tabs-list{border-bottom:1px solid #bfc1c3;margin-left:-15px;margin-right:-15px}.tabs-toggle{border-top:1px solid #bfc1c3}.tabs-toggle:focus{color:#0b0c0c;outline:none}}@media (min-width: 641px){.tabs-panel{border-top:1px solid #bfc1c3;clear:both;overflow:hidden}.tabs-list{float:left}.tabs-list-item{float:left;position:relative;bottom:-1px;padding-top:10px}.tabs-toggle{background-color:#dee0e2;border:1px solid transparent;float:left;margin-top:0px;margin-bottom:0px;margin-right:6px;margin-left:0px;text-decoration:none}.tabs-toggle:visited{color:#005ea5}.tabs-toggle-selected,.tabs-toggle[aria-selected=true]{background-color:#fff;border-bottom:0px;border-color:#bfc1c3;padding-bottom:11px;margin-bottom:0px;color:#0b0c0c}}\n  "],
        }),
        __metadata("design:paramtypes", [router_1.ActivatedRoute])
    ], TabsComponent);
    return TabsComponent;
}());
exports.TabsComponent = TabsComponent;
//# sourceMappingURL=tabs.component.js.map