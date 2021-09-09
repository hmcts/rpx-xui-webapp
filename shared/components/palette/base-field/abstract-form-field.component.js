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
var domain_1 = require("../../../domain");
var services_1 = require("../../../services");
var AbstractFormFieldComponent = /** @class */ (function () {
    function AbstractFormFieldComponent() {
        this.idPrefix = '';
    }
    AbstractFormFieldComponent.prototype.id = function () {
        return this.idPrefix + this.caseField.id;
    };
    AbstractFormFieldComponent.prototype.registerControl = function (control, replace) {
        if (replace === void 0) { replace = false; }
        var container = this.parent || this.formGroup;
        if (!container) {
            return control;
        }
        var existing = container.controls[this.caseField.id];
        if (existing) {
            if (replace) {
                // Set the validators on the replacement with what already exists.
                control.setValidators(existing.validator);
            }
            else {
                return existing;
            }
        }
        this.addValidators(this.caseField, control);
        services_1.FieldsUtils.addCaseFieldAndComponentReferences(control, this.caseField, this);
        return this.addControlToParent(control, container, replace);
    };
    AbstractFormFieldComponent.prototype.addValidators = function (caseField, control) {
        // No validators by default, override this method to add validators to the form control
    };
    AbstractFormFieldComponent.prototype.addControlToParent = function (control, parent, replace) {
        if (parent instanceof forms_1.FormArray) {
            return this.addControlToFormArray(control, parent, replace);
        }
        return this.addControlToFormGroup(control, parent, replace);
    };
    AbstractFormFieldComponent.prototype.addControlToFormArray = function (control, parent, replace) {
        var index = parseInt(this.caseField.id, 10);
        if (replace && !isNaN(index)) {
            parent.setControl(index, control);
        }
        else {
            parent.push(control);
        }
        return control;
    };
    AbstractFormFieldComponent.prototype.addControlToFormGroup = function (control, parent, replace) {
        if (replace) {
            parent.setControl(this.caseField.id, control);
        }
        else {
            parent.addControl(this.caseField.id, control);
        }
        return control;
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", domain_1.CaseField)
    ], AbstractFormFieldComponent.prototype, "caseField", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", forms_1.FormGroup)
    ], AbstractFormFieldComponent.prototype, "formGroup", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], AbstractFormFieldComponent.prototype, "parent", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], AbstractFormFieldComponent.prototype, "idPrefix", void 0);
    return AbstractFormFieldComponent;
}());
exports.AbstractFormFieldComponent = AbstractFormFieldComponent;
//# sourceMappingURL=abstract-form-field.component.js.map