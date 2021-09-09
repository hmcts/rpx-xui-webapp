"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var conditional_show_directive_1 = require("./conditional-show.directive");
var fields_utils_1 = require("../../services/fields/fields.utils");
var conditional_show_registrar_service_1 = require("./services/conditional-show-registrar.service");
var grey_bar_service_1 = require("./services/grey-bar.service");
var conditional_show_form_directive_1 = require("./conditional-show-form.directive");
var ConditionalShowModule = /** @class */ (function () {
    function ConditionalShowModule() {
    }
    ConditionalShowModule = __decorate([
        core_1.NgModule({
            declarations: [
                conditional_show_directive_1.ConditionalShowDirective,
                conditional_show_form_directive_1.ConditionalShowFormDirective
            ],
            exports: [
                conditional_show_directive_1.ConditionalShowDirective,
                conditional_show_form_directive_1.ConditionalShowFormDirective
            ],
            providers: [
                fields_utils_1.FieldsUtils,
                conditional_show_registrar_service_1.ConditionalShowRegistrarService,
                grey_bar_service_1.GreyBarService
            ]
        })
    ], ConditionalShowModule);
    return ConditionalShowModule;
}());
exports.ConditionalShowModule = ConditionalShowModule;
//# sourceMappingURL=conditional-show.module.js.map