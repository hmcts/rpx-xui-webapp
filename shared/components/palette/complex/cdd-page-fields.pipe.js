"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var class_transformer_1 = require("class-transformer");
var definition_1 = require("../../../domain/definition");
var CcdPageFieldsPipe = /** @class */ (function () {
    function CcdPageFieldsPipe() {
    }
    CcdPageFieldsPipe.prototype.transform = function (page, dataFormGroup) {
        var complex_fields = Object.keys(dataFormGroup.controls).map(function (key) {
            var control = dataFormGroup.controls[key];
            return control['caseField'];
        }).filter(function (field) {
            return !!page.case_fields.find(function (pcf) { return pcf.id === field.id; });
        });
        var rawValue = dataFormGroup.value;
        var value = page.case_fields.reduce(function (acc, field) {
            var _a;
            var fieldValue = rawValue[field.id] || field.value;
            return __assign({}, acc, (_a = {}, _a[field.id] = fieldValue, _a));
        }, {});
        return class_transformer_1.plainToClassFromExist(new definition_1.CaseField(), {
            id: page.id,
            label: page.label,
            display_context: 'READONLY',
            value: value,
            field_type: {
                id: page.id,
                type: 'Complex',
                complex_fields: complex_fields
            }
        });
    };
    CcdPageFieldsPipe = __decorate([
        core_1.Pipe({
            name: 'ccdPageFields'
        })
    ], CcdPageFieldsPipe);
    return CcdPageFieldsPipe;
}());
exports.CcdPageFieldsPipe = CcdPageFieldsPipe;
//# sourceMappingURL=cdd-page-fields.pipe.js.map