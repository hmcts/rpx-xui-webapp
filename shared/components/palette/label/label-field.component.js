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
var case_field_model_1 = require("../../../domain/definition/case-field.model");
var LabelFieldComponent = /** @class */ (function () {
    function LabelFieldComponent() {
        this.caseFields = [];
    }
    __decorate([
        core_1.Input(),
        __metadata("design:type", case_field_model_1.CaseField)
    ], LabelFieldComponent.prototype, "caseField", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Array)
    ], LabelFieldComponent.prototype, "caseFields", void 0);
    LabelFieldComponent = __decorate([
        core_1.Component({
            selector: 'ccd-label-field',
            template: "\n    <dl [hidden]=\"caseField.hidden\" class=\"case-field\" ccdLabelSubstitutor [caseField]=\"caseField\" [contextFields]=\"caseFields\" [id]=\"caseField.id\">\n      <dt>\n        <ccd-markdown [content]=\"caseField.value || caseField.label\"></ccd-markdown>\n      </dt>\n      <dd></dd>\n    </dl>\n  "
        })
    ], LabelFieldComponent);
    return LabelFieldComponent;
}());
exports.LabelFieldComponent = LabelFieldComponent;
//# sourceMappingURL=label-field.component.js.map