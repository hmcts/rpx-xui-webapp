"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var FormErrorService = /** @class */ (function () {
    function FormErrorService() {
    }
    FormErrorService.prototype.mapFieldErrors = function (errors, form, errorKey) {
        var _this = this;
        errors.forEach(function (error) {
            var _a;
            var formControl = _this.getFormControl(form, error.id);
            if (formControl) {
                formControl.setErrors((_a = {},
                    _a[errorKey] = error.message,
                    _a));
            }
        });
    };
    FormErrorService.prototype.getFormControl = function (form, fieldId) {
        var fields = fieldId.split('.');
        var group = form;
        var inArray = false;
        var control;
        fields.every(function (field, index) {
            if (index === fields.length - 1) {
                control = group.controls[field];
            }
            else {
                group = group.controls[field];
                if (inArray && group.controls['value']) {
                    group = group.controls['value'];
                }
                if (group && group.constructor && forms_1.FormArray.name === group.constructor.name) {
                    inArray = true;
                }
                else {
                    inArray = false;
                }
            }
            return !!group;
        });
        return control;
    };
    FormErrorService = __decorate([
        core_1.Injectable()
    ], FormErrorService);
    return FormErrorService;
}());
exports.FormErrorService = FormErrorService;
//# sourceMappingURL=form-error.service.js.map