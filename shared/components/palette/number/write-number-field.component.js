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
var WriteNumberFieldComponent = /** @class */ (function (_super) {
    __extends(WriteNumberFieldComponent, _super);
    function WriteNumberFieldComponent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    WriteNumberFieldComponent.prototype.ngOnInit = function () {
        this.numberControl = this.registerControl(new forms_1.FormControl(this.caseField.value));
    };
    WriteNumberFieldComponent = __decorate([
        core_1.Component({
            selector: 'ccd-write-number-field',
            template: "\n    <div class=\"form-group\" [ngClass]=\"{'form-group-error': !numberControl.valid && numberControl.dirty}\">\n\n      <label [for]=\"id()\">\n        <span class=\"form-label\" *ngIf=\"caseField.label\">{{caseField | ccdFieldLabel}}</span>\n      </label>\n      <span class=\"form-hint\" *ngIf=\"caseField.hint_text\">{{caseField.hint_text}}</span>\n      <span class=\"error-message\" *ngIf=\"numberControl.errors && numberControl.dirty\">{{numberControl.errors | ccdFirstError:caseField.label}}</span>\n\n      <input class=\"form-control bottom-30\" [ngClass]=\"{'govuk-input--error': numberControl.errors && numberControl.dirty}\"\n       [id]=\"id()\" type=\"number\" [formControl]=\"numberControl\">\n\n    </div>\n  "
        })
    ], WriteNumberFieldComponent);
    return WriteNumberFieldComponent;
}(abstract_field_write_component_1.AbstractFieldWriteComponent));
exports.WriteNumberFieldComponent = WriteNumberFieldComponent;
//# sourceMappingURL=write-number-field.component.js.map