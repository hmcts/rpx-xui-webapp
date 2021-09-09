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
var CcdTabFieldsPipe = /** @class */ (function () {
    function CcdTabFieldsPipe() {
    }
    CcdTabFieldsPipe.prototype.transform = function (tab) {
        var value = tab.fields.reduce(function (acc, field) {
            var _a;
            return __assign({}, acc, (_a = {}, _a[field.id] = field.value, _a));
        }, {});
        return class_transformer_1.plainToClassFromExist(new definition_1.CaseField(), {
            id: tab.id,
            label: tab.label,
            display_context: 'READONLY',
            value: value,
            field_type: {
                id: tab.id,
                type: 'Complex',
                complex_fields: tab.fields
            }
        });
    };
    CcdTabFieldsPipe = __decorate([
        core_1.Pipe({
            name: 'ccdTabFields'
        })
    ], CcdTabFieldsPipe);
    return CcdTabFieldsPipe;
}());
exports.CcdTabFieldsPipe = CcdTabFieldsPipe;
//# sourceMappingURL=ccd-tab-fields.pipe.js.map