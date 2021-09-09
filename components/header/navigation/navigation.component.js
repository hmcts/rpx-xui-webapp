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
var NavigationComponent = /** @class */ (function () {
    function NavigationComponent() {
    }
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], NavigationComponent.prototype, "isSolicitor", void 0);
    NavigationComponent = __decorate([
        core_1.Component({
            selector: 'cut-nav-bar',
            template: "\n      <div>\n        <nav [class.full-screen]=\"!isSolicitor\" class=\"cut-nav-bar\">\n            <ng-content select=\"[leftNavLinks]\"></ng-content>\n            <ng-content select=\"[rightNavLinks]\"></ng-content>\n        </nav>\n      </div>\n    ",
            styles: ["\n      .cut-nav-bar:after{content:\"\";display:block;clear:both}.cut-nav-bar{background-color:#005ea5;max-width:990px;margin:0 auto;height:55px;padding:0 15px 0 15px}.full-screen{max-width:100%}\n    "]
        })
    ], NavigationComponent);
    return NavigationComponent;
}());
exports.NavigationComponent = NavigationComponent;
//# sourceMappingURL=navigation.component.js.map