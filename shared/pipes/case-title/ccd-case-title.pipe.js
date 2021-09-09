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
var placeholder_service_1 = require("../../directives/substitutor/services/placeholder.service");
var fields_utils_1 = require("../../services/fields/fields.utils");
var CcdCaseTitlePipe = /** @class */ (function () {
    function CcdCaseTitlePipe(placeholderService, fieldsUtils) {
        this.placeholderService = placeholderService;
        this.fieldsUtils = fieldsUtils;
    }
    CcdCaseTitlePipe.prototype.transform = function (caseTitle, caseFields, values) {
        var caseFieldValues = this.getReadOnlyAndFormFields(values, caseFields);
        var result = this.placeholderService.resolvePlaceholders(caseFieldValues, caseTitle);
        return result.replace(/\n/g, '<br>').replace(/#/g, '');
    };
    CcdCaseTitlePipe.prototype.getReadOnlyAndFormFields = function (formGroup, caseFields) {
        return this.fieldsUtils.mergeLabelCaseFieldsAndFormFields(caseFields, formGroup.getRawValue());
    };
    CcdCaseTitlePipe = __decorate([
        core_1.Pipe({
            name: 'ccdCaseTitle'
        }),
        __metadata("design:paramtypes", [placeholder_service_1.PlaceholderService, fields_utils_1.FieldsUtils])
    ], CcdCaseTitlePipe);
    return CcdCaseTitlePipe;
}());
exports.CcdCaseTitlePipe = CcdCaseTitlePipe;
//# sourceMappingURL=ccd-case-title.pipe.js.map