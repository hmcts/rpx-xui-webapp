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
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var abstract_field_write_component_1 = require("../base-field/abstract-field-write.component");
var WriteMultiSelectListFieldComponent = /** @class */ (function (_super) {
    __extends(WriteMultiSelectListFieldComponent, _super);
    function WriteMultiSelectListFieldComponent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    WriteMultiSelectListFieldComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.checkboxes = new forms_1.FormArray([]);
        // Initialise array with existing values
        if (this.caseField.value && Array.isArray(this.caseField.value)) {
            var values = this.caseField.value;
            values.forEach(function (value) {
                _this.checkboxes.push(new forms_1.FormControl(value));
            });
        }
        this.registerControl(this.checkboxes, true);
    };
    WriteMultiSelectListFieldComponent.prototype.onCheckChange = function (event) {
        var _this = this;
        if (!this.isSelected(event.target.value)) {
            // Add a new control in the FormArray
            this.checkboxes.push(new forms_1.FormControl(event.target.value));
        }
        else {
            // Remove the control form the FormArray
            this.checkboxes.controls.forEach(function (ctrl, i) {
                if (ctrl.value === event.target.value) {
                    _this.checkboxes.removeAt(i);
                    return;
                }
            });
        }
    };
    WriteMultiSelectListFieldComponent.prototype.isSelected = function (code) {
        if (this.checkboxes && this.checkboxes.controls) {
            return this.checkboxes.controls.find(function (control) { return control.value === code; });
        }
    };
    WriteMultiSelectListFieldComponent = __decorate([
        core_1.Component({
            selector: 'ccd-write-multi-select-list-field',
            template: "\n    <div class=\"form-group bottom-30\" [ngClass]=\"{'error': !checkboxes.valid && checkboxes.dirty}\" [id]=\"id()\">\n\n      <fieldset>\n\n        <legend>\n          <span class=\"form-label\" *ngIf=\"caseField.label\">{{caseField | ccdFieldLabel}}</span>\n        </legend>\n        <span *ngIf=\"caseField.hint_text\" class=\"form-hint\">{{caseField.hint_text}}</span>\n        <span *ngIf=\"checkboxes.errors && checkboxes.dirty\" class=\"error-message\">{{checkboxes.errors | ccdFirstError:caseField.label}}</span>\n\n        <ng-container *ngFor=\"let checkbox of caseField.field_type.fixed_list_items\">\n\n          <div class=\"multiple-choice\">\n            <input class=\"form-control\" [id]=\"id()+'-'+checkbox.code\" [name]=\"id()\" type=\"checkbox\" [value]=\"checkbox.code\" [checked]=\"isSelected(checkbox.code)\" (change)=\"onCheckChange($event)\">\n            <label class=\"form-label\" [for]=\"id()+'-'+checkbox.code\">{{checkbox.label}}</label>\n          </div>\n\n        </ng-container>\n\n      </fieldset>\n\n    </div>\n  "
        })
    ], WriteMultiSelectListFieldComponent);
    return WriteMultiSelectListFieldComponent;
}(abstract_field_write_component_1.AbstractFieldWriteComponent));
exports.WriteMultiSelectListFieldComponent = WriteMultiSelectListFieldComponent;
//# sourceMappingURL=write-multi-select-list-field.component.js.map