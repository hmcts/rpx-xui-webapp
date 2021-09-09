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
var wizard_page_field_model_1 = require("./wizard-page-field.model");
var case_field_model_1 = require("../../../domain/definition/case-field.model");
var class_transformer_1 = require("class-transformer");
var ɵ0 = function () { return wizard_page_field_model_1.WizardPageField; }, ɵ1 = function () { return case_field_model_1.CaseField; };
exports.ɵ0 = ɵ0;
exports.ɵ1 = ɵ1;
// @dynamic
var WizardPage = /** @class */ (function () {
    function WizardPage() {
    }
    WizardPage.prototype.getCol1Fields = function () {
        return this.case_fields.filter(function (f) {
            return !f.wizardProps.page_column_no || f.wizardProps.page_column_no === 1;
        });
    };
    WizardPage.prototype.getCol2Fields = function () {
        return this.case_fields.filter(function (f) { return f.wizardProps.page_column_no === 2; });
    };
    WizardPage.prototype.isMultiColumn = function () {
        return this.getCol2Fields().length > 0;
    };
    __decorate([
        class_transformer_1.Type(ɵ0),
        __metadata("design:type", Array)
    ], WizardPage.prototype, "wizard_page_fields", void 0);
    __decorate([
        class_transformer_1.Type(ɵ1),
        __metadata("design:type", Array)
    ], WizardPage.prototype, "case_fields", void 0);
    return WizardPage;
}());
exports.WizardPage = WizardPage;
//# sourceMappingURL=wizard-page.model.js.map