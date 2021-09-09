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
var WriteFixedRadioListFieldComponent = /** @class */ (function (_super) {
    __extends(WriteFixedRadioListFieldComponent, _super);
    function WriteFixedRadioListFieldComponent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    WriteFixedRadioListFieldComponent.prototype.ngOnInit = function () {
        var notEmpty = this.caseField.value !== null && this.caseField.value !== undefined;
        this.fixedRadioListControl = this.registerControl(new forms_1.FormControl(notEmpty ? this.caseField.value : null));
    };
    WriteFixedRadioListFieldComponent = __decorate([
        core_1.Component({
            selector: 'ccd-write-fixed-radio-list-field',
            template: "\n    <div class=\"form-group bottom-30\" [ngClass]=\"{'form-group-error': !fixedRadioListControl.valid && fixedRadioListControl.dirty}\" [id]=\"id()\">\n      <fieldset>\n        <legend>\n          <label [for]=\"id()\">\n            <span class=\"form-label\" *ngIf=\"caseField.label\">{{caseField | ccdFieldLabel}}</span>\n          </label>\n          <span class=\"form-hint\" *ngIf=\"caseField.hint_text\">{{caseField.hint_text}}</span>\n          <span class=\"error-message\" *ngIf=\"fixedRadioListControl.errors && fixedRadioListControl.dirty\">{{fixedRadioListControl.errors | ccdFirstError:caseField.label}}</span>\n        </legend>\n        <ng-container>\n          <div class=\"multiple-choice\" *ngFor=\"let radioButton of caseField.field_type.fixed_list_items\" [ngClass]=\"{selected: fixedRadioListControl.value === radioButton.code}\">\n            <input class=\"form-control\" [id]=\"id()+'-'+radioButton.code\" [name]=\"id()\" type=\"radio\" [formControl]=\"fixedRadioListControl\" [value]=\"radioButton.code\">\n            <label class=\"form-label\" [for]=\"id()+'-'+radioButton.code\">{{radioButton.label}}</label>\n          </div>\n        </ng-container>\n      </fieldset>\n    </div>\n  "
        })
    ], WriteFixedRadioListFieldComponent);
    return WriteFixedRadioListFieldComponent;
}(abstract_field_write_component_1.AbstractFieldWriteComponent));
exports.WriteFixedRadioListFieldComponent = WriteFixedRadioListFieldComponent;
//# sourceMappingURL=write-fixed-radio-list-field.component.js.map