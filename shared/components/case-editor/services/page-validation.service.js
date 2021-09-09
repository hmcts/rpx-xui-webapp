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
var conditional_show_model_1 = require("../../../directives/conditional-show/domain/conditional-show.model");
var case_field_service_1 = require("../../../services/case-fields/case-field.service");
var PageValidationService = /** @class */ (function () {
    function PageValidationService(caseFieldService) {
        this.caseFieldService = caseFieldService;
    }
    PageValidationService.prototype.isPageValid = function (page, editForm) {
        var _this = this;
        return page.case_fields
            .filter(function (caseField) { return !_this.caseFieldService.isReadOnly(caseField); })
            .filter(function (caseField) { return !_this.isHidden(caseField, editForm); })
            .every(function (caseField) {
            var theControl = editForm.controls['data'].get(caseField.id);
            return _this.checkDocumentField(caseField, theControl) && _this.checkOptionalField(caseField, theControl);
        });
    };
    PageValidationService.prototype.checkDocumentField = function (caseField, theControl) {
        if (caseField.field_type.id !== 'Document') {
            return true;
        }
        return !(this.checkMandatoryField(caseField, theControl));
    };
    PageValidationService.prototype.isHidden = function (caseField, editForm) {
        var formFields = editForm.getRawValue();
        var condition = conditional_show_model_1.ShowCondition.getInstance(caseField.show_condition);
        return !condition.match(formFields.data);
    };
    PageValidationService.prototype.checkOptionalField = function (caseField, theControl) {
        if (!theControl) {
            return this.caseFieldService.isOptional(caseField);
        }
        else {
            return theControl.valid || theControl.disabled;
        }
    };
    PageValidationService.prototype.checkMandatoryField = function (caseField, theControl) {
        return this.caseFieldService.isMandatory(caseField) && theControl === null;
    };
    PageValidationService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [case_field_service_1.CaseFieldService])
    ], PageValidationService);
    return PageValidationService;
}());
exports.PageValidationService = PageValidationService;
//# sourceMappingURL=page-validation.service.js.map