"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
var abstract_field_write_component_1 = require("../base-field/abstract-field-write.component");
var write_complex_field_component_1 = require("../complex/write-complex-field.component");
var WriteCaseLinkFieldComponent = /** @class */ (function (_super) {
    __extends(WriteCaseLinkFieldComponent, _super);
    function WriteCaseLinkFieldComponent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    WriteCaseLinkFieldComponent.prototype.ngOnInit = function () {
        if (this.caseField.value) {
            this.caseLinkGroup = this.registerControl(new forms_1.FormGroup({
                'CaseReference': new forms_1.FormControl(this.caseField.value.CaseReference),
            }), true);
        }
        else {
            this.caseLinkGroup = this.registerControl(new forms_1.FormGroup({
                'CaseReference': new forms_1.FormControl(),
            }), true);
        }
        this.caseReferenceControl = this.caseLinkGroup.controls['CaseReference'];
        this.caseReferenceControl.setValidators(this.caseReferenceValidator());
        // Ensure that all sub-fields inherit the same value for retain_hidden_value as this parent; although a CaseLink
        // field uses the Complex type, it is meant to be treated as one field
        if (this.caseField && this.caseField.field_type.type === 'Complex') {
            for (var _i = 0, _a = this.caseField.field_type.complex_fields; _i < _a.length; _i++) {
                var caseLinkSubField = _a[_i];
                caseLinkSubField.retain_hidden_value = this.caseField.retain_hidden_value;
            }
        }
    };
    WriteCaseLinkFieldComponent.prototype.caseReferenceValidator = function () {
        var _this = this;
        return function (control) {
            if (control.value) {
                if (_this.validCaseReference(control.value)) {
                    return null;
                }
                return { 'error': 'Please use a valid 16 Digit Case Reference' };
            }
            return null;
        };
    };
    WriteCaseLinkFieldComponent.prototype.validCaseReference = function (valueString) {
        if (!valueString) {
            return false;
        }
        return new RegExp('^\\b\\d{4}[ -]?\\d{4}[ -]?\\d{4}[ -]?\\d{4}\\b$').test(valueString.trim());
    };
    __decorate([
        core_1.ViewChild('writeComplexFieldComponent'),
        __metadata("design:type", write_complex_field_component_1.WriteComplexFieldComponent)
    ], WriteCaseLinkFieldComponent.prototype, "writeComplexFieldComponent", void 0);
    WriteCaseLinkFieldComponent = __decorate([
        core_1.Component({
            selector: 'ccd-write-case-link-field',
            template: "\n    <div class=\"form-group\" [ngClass]=\"{'form-group-error': !caseReferenceControl.valid && caseReferenceControl.dirty}\">\n      <label [for]=\"id()\">\n        <span class=\"form-label\" *ngIf=\"caseField.label\">{{caseField | ccdFieldLabel}}</span>\n      </label>\n      <span class=\"form-hint\" *ngIf=\"caseField.hint_text\">{{caseField.hint_text}}</span>\n      <span class=\"error-message\" *ngIf=\"caseReferenceControl.errors && caseReferenceControl.dirty\">{{caseReferenceControl.errors | ccdFirstError:caseField.label}}</span>\n      <input class=\"form-control bottom-30\" [id]=\"id()\" type=\"text\" [formControl]=\"caseReferenceControl\">\n    </div>\n  "
        })
    ], WriteCaseLinkFieldComponent);
    return WriteCaseLinkFieldComponent;
}(abstract_field_write_component_1.AbstractFieldWriteComponent));
exports.WriteCaseLinkFieldComponent = WriteCaseLinkFieldComponent;
//# sourceMappingURL=write-case-link-field.component.js.map