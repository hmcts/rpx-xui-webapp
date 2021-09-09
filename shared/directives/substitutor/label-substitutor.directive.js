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
var forms_1 = require("@angular/forms");
var case_field_model_1 = require("../../domain/definition/case-field.model");
var fields_utils_1 = require("../../services/fields/fields.utils");
var services_1 = require("./services");
var LabelSubstitutorDirective = /** @class */ (function () {
    function LabelSubstitutorDirective(fieldsUtils, placeholderService) {
        this.fieldsUtils = fieldsUtils;
        this.placeholderService = placeholderService;
        this.contextFields = [];
        this.elementsToSubstitute = ['label', 'hint_text'];
    }
    LabelSubstitutorDirective.prototype.ngOnInit = function () {
        this.initialLabel = this.caseField.label;
        this.initialHintText = this.caseField.hint_text;
        this.formGroup = this.formGroup || new forms_1.FormGroup({});
        var fields = this.getReadOnlyAndFormFields();
        if (this.shouldSubstitute('label')) {
            this.caseField.label = this.resolvePlaceholders(fields, this.caseField.label);
        }
        if (this.shouldSubstitute('hint_text')) {
            this.caseField.hint_text = this.resolvePlaceholders(fields, this.caseField.hint_text);
        }
        if (this.shouldSubstitute('value')) {
            this.caseField.value = this.resolvePlaceholders(fields, this.caseField.value);
        }
    };
    LabelSubstitutorDirective.prototype.ngOnDestroy = function () {
        this.caseField.label = this.initialLabel;
        this.caseField.hint_text = this.initialHintText;
    };
    LabelSubstitutorDirective.prototype.shouldSubstitute = function (element) {
        return this.elementsToSubstitute.find(function (e) { return e === element; }) !== undefined;
    };
    LabelSubstitutorDirective.prototype.getReadOnlyAndFormFields = function () {
        var formFields = this.getFormFieldsValuesIncludingDisabled();
        // TODO: Delete following line when @Input contextFields is fixed - https://tools.hmcts.net/jira/browse/RDM-3504
        var uniqueContextFields = this.removeDuplicates(this.contextFields);
        return this.fieldsUtils.mergeLabelCaseFieldsAndFormFields(uniqueContextFields, formFields);
    };
    LabelSubstitutorDirective.prototype.removeDuplicates = function (original) {
        var unique = [];
        original.forEach(function (caseField) {
            var isUnique = unique.filter(function (e) { return e.id === caseField.id; }).length === 0;
            if (isUnique) {
                unique.push(caseField);
            }
        });
        return unique;
    };
    LabelSubstitutorDirective.prototype.getFormFieldsValuesIncludingDisabled = function () {
        return this.formGroup.getRawValue();
    };
    LabelSubstitutorDirective.prototype.resolvePlaceholders = function (fields, stringToResolve) {
        return this.placeholderService.resolvePlaceholders(fields, stringToResolve);
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", case_field_model_1.CaseField)
    ], LabelSubstitutorDirective.prototype, "caseField", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Array)
    ], LabelSubstitutorDirective.prototype, "contextFields", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", forms_1.FormGroup)
    ], LabelSubstitutorDirective.prototype, "formGroup", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Array)
    ], LabelSubstitutorDirective.prototype, "elementsToSubstitute", void 0);
    LabelSubstitutorDirective = __decorate([
        core_1.Directive({ selector: '[ccdLabelSubstitutor]' })
        /**
         * Checks all labels and substitutes any placholders that reference other fields values.
         */
        ,
        __metadata("design:paramtypes", [fields_utils_1.FieldsUtils,
            services_1.PlaceholderService])
    ], LabelSubstitutorDirective);
    return LabelSubstitutorDirective;
}());
exports.LabelSubstitutorDirective = LabelSubstitutorDirective;
//# sourceMappingURL=label-substitutor.directive.js.map