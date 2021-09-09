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
var constants_1 = require("../../commons/constants");
var FormValidatorsService = /** @class */ (function () {
    function FormValidatorsService() {
    }
    FormValidatorsService_1 = FormValidatorsService;
    FormValidatorsService.addValidators = function (caseField, control) {
        if (caseField.display_context === constants_1.Constants.MANDATORY &&
            FormValidatorsService_1.CUSTOM_VALIDATED_TYPES.indexOf(caseField.field_type.type) === -1) {
            var validators = [forms_1.Validators.required];
            if (caseField.field_type.type === 'Text') {
                if (caseField.field_type.regular_expression) {
                    validators.push(forms_1.Validators.pattern(caseField.field_type.regular_expression));
                }
                else {
                    validators.push(forms_1.Validators.pattern(constants_1.Constants.REGEX_WHITESPACES));
                }
                if (caseField.field_type.min && (typeof caseField.field_type.min === 'number')) {
                    validators.push(forms_1.Validators.minLength(caseField.field_type.min));
                }
                if (caseField.field_type.max && (typeof caseField.field_type.max === 'number')) {
                    validators.push(forms_1.Validators.maxLength(caseField.field_type.max));
                }
            }
            if (control.validator) {
                validators.push(control.validator);
            }
            control.setValidators(validators);
        }
        return control;
    };
    // TODO: Strip this out as it's only here for the moment because
    // the service is being injected all over the place but it doesn't
    // need to be as FormValidatorsService.addValidators is perfectly
    // happy being static.
    FormValidatorsService.prototype.addValidators = function (caseField, control) {
        return FormValidatorsService_1.addValidators(caseField, control);
    };
    var FormValidatorsService_1;
    FormValidatorsService.CUSTOM_VALIDATED_TYPES = [
        'Date', 'MoneyGBP', 'Label'
    ];
    FormValidatorsService = FormValidatorsService_1 = __decorate([
        core_1.Injectable()
    ], FormValidatorsService);
    return FormValidatorsService;
}());
exports.FormValidatorsService = FormValidatorsService;
//# sourceMappingURL=form-validators.service.js.map