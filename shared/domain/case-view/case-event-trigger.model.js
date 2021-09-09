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
var case_field_model_1 = require("../definition/case-field.model");
var wizard_page_model_1 = require("../../components/case-editor/domain/wizard-page.model");
var class_transformer_1 = require("class-transformer");
var ɵ0 = function () { return case_field_model_1.CaseField; }, ɵ1 = function () { return wizard_page_model_1.WizardPage; };
exports.ɵ0 = ɵ0;
exports.ɵ1 = ɵ1;
// @dynamic
var CaseEventTrigger = /** @class */ (function () {
    function CaseEventTrigger() {
    }
    CaseEventTrigger.prototype.hasFields = function () {
        return this.case_fields && this.case_fields.length !== 0;
    };
    CaseEventTrigger.prototype.hasPages = function () {
        return this.wizard_pages && this.wizard_pages.length !== 0;
    };
    __decorate([
        class_transformer_1.Type(ɵ0),
        __metadata("design:type", Array)
    ], CaseEventTrigger.prototype, "case_fields", void 0);
    __decorate([
        class_transformer_1.Type(ɵ1),
        __metadata("design:type", Array)
    ], CaseEventTrigger.prototype, "wizard_pages", void 0);
    return CaseEventTrigger;
}());
exports.CaseEventTrigger = CaseEventTrigger;
//# sourceMappingURL=case-event-trigger.model.js.map