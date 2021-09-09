"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var focus_element_directive_1 = require("./focus-element.directive");
var FocusElementModule = /** @class */ (function () {
    function FocusElementModule() {
    }
    FocusElementModule = __decorate([
        core_1.NgModule({
            declarations: [
                focus_element_directive_1.FocusElementDirective
            ],
            exports: [
                focus_element_directive_1.FocusElementDirective
            ]
        })
    ], FocusElementModule);
    return FocusElementModule;
}());
exports.FocusElementModule = FocusElementModule;
//# sourceMappingURL=focus-element.module.js.map