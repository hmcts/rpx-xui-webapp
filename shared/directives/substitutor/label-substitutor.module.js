"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var label_substitutor_directive_1 = require("./label-substitutor.directive");
var fields_utils_1 = require("../../services/fields/fields.utils");
var common_1 = require("@angular/common");
var LabelSubstitutorModule = /** @class */ (function () {
    function LabelSubstitutorModule() {
    }
    LabelSubstitutorModule = __decorate([
        core_1.NgModule({
            declarations: [
                label_substitutor_directive_1.LabelSubstitutorDirective
            ],
            exports: [
                label_substitutor_directive_1.LabelSubstitutorDirective
            ],
            providers: [
                fields_utils_1.FieldsUtils,
                common_1.CurrencyPipe,
            ]
        })
    ], LabelSubstitutorModule);
    return LabelSubstitutorModule;
}());
exports.LabelSubstitutorModule = LabelSubstitutorModule;
//# sourceMappingURL=label-substitutor.module.js.map