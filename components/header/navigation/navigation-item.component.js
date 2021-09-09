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
var NavigationItemComponent = /** @class */ (function () {
    function NavigationItemComponent() {
    }
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], NavigationItemComponent.prototype, "label", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], NavigationItemComponent.prototype, "link", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], NavigationItemComponent.prototype, "imageLink", void 0);
    NavigationItemComponent = __decorate([
        core_1.Component({
            selector: 'cut-nav-item',
            template: "\n      <div>\n        <a [routerLinkActive]=\"'item-bold'\" [routerLink]=\"link\">{{label}}</a>\n        <input type=\"image\" alt=\"{{label}} button\" *ngIf=\"imageLink\" src=\"{{imageLink}}\"/>\n      </div>\n    ",
            styles: ["\n      a{color:#fff;text-decoration:none;padding-right:10px;font-size:18px}a.active{color:#fff}a:focus{background-color:#005ea5;color:#fff}input{float:right;background-color:#00823b;margin-top:-3px}.item-bold{font-size:18px;font-weight:bold}\n    "]
        })
    ], NavigationItemComponent);
    return NavigationItemComponent;
}());
exports.NavigationItemComponent = NavigationItemComponent;
//# sourceMappingURL=navigation-item.component.js.map