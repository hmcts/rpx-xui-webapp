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
var WriteDynamicRadioListFieldComponent = /** @class */ (function (_super) {
    __extends(WriteDynamicRadioListFieldComponent, _super);
    function WriteDynamicRadioListFieldComponent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    WriteDynamicRadioListFieldComponent.prototype.ngOnInit = function () {
        /**
         *
         * Reassigning list_items from formatted_list when list_items is empty
         */
        if (!this.caseField.list_items && this.caseField.formatted_value && this.caseField.formatted_value.list_items) {
            this.caseField.list_items = this.caseField.formatted_value.list_items;
        }
        if (!this.caseField.value && this.caseField.formatted_value && this.caseField.formatted_value.value) {
            this.caseField.value = this.caseField.formatted_value.value.code;
        }
        var isNull = this.caseField.value === undefined || this.caseField.value === '';
        if (isNull || typeof this.caseField.value === 'object') {
            this.caseField.value = [];
        }
        this.dynamicRadioListControl = this.registerControl(new forms_1.FormControl(this.caseField.value));
        this.dynamicRadioListControl.setValue(this.caseField.value);
    };
    WriteDynamicRadioListFieldComponent.prototype.buildElementId = function (name) {
        return this.id() + "-" + name;
    };
    WriteDynamicRadioListFieldComponent = __decorate([
        core_1.Component({
            selector: 'ccd-write-dynamic-radio-list-field',
            template: "\n    <div class=\"form-group bottom-30\"\n        [ngClass]=\"{'form-group-error': !dynamicRadioListControl.valid && dynamicRadioListControl.dirty}\" [id]=\"id()\">\n      <fieldset>\n        <label [for]=\"id()\">\n            <span class=\"form-label\" *ngIf=\"caseField.label\">{{caseField | ccdFieldLabel}}</span>\n            <span class=\"form-hint\" *ngIf=\"caseField.hint_text\">{{caseField.hint_text}}</span>\n            <span class=\"form-label\" *ngIf=\"!caseField.label && !caseField.hint_text\">Select an option below</span>\n            <span class=\"error-message\"\n                *ngIf=\"dynamicRadioListControl.errors && dynamicRadioListControl.dirty\">{{dynamicRadioListControl.errors |\n                ccdFirstError}}</span>\n        </label>\n\n        <ng-container>\n          <div class=\"multiple-choice\" *ngFor=\"let radioButton of caseField.list_items\" [ngClass]=\"{selected: dynamicRadioListControl.value === radioButton.code}\">\n              <input class=\"form-control\" [id]=\"buildElementId(radioButton.code)\" name=\"{{id()}}\" type=\"radio\" [formControl]=\"dynamicRadioListControl\" [value]=\"radioButton.code\">\n              <label class=\"form-label\" [for]=\"buildElementId(radioButton.code)\">{{radioButton.label}}</label>\n          </div>\n        </ng-container>\n      </fieldset>\n    </div>\n  "
        })
    ], WriteDynamicRadioListFieldComponent);
    return WriteDynamicRadioListFieldComponent;
}(abstract_field_write_component_1.AbstractFieldWriteComponent));
exports.WriteDynamicRadioListFieldComponent = WriteDynamicRadioListFieldComponent;
//# sourceMappingURL=write-dynamic-radio-list-field.component.js.map