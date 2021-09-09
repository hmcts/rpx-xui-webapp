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
var WriteDynamicListFieldComponent = /** @class */ (function (_super) {
    __extends(WriteDynamicListFieldComponent, _super);
    function WriteDynamicListFieldComponent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    WriteDynamicListFieldComponent.prototype.ngOnInit = function () {
        /**
         * Reassigning list_items from formatted_value when list_items is empty
         */
        if (!this.caseField.list_items && this.caseField.formatted_value && this.caseField.formatted_value.list_items) {
            this.caseField.list_items = this.caseField.formatted_value.list_items;
        }
        /**
         * Reassigning value from formatted_value when value is empty
         */
        if (!this.caseField.value) {
            if (this.caseField.formatted_value && this.caseField.formatted_value.value && this.caseField.formatted_value.value.code) {
                this.caseField.value = this.caseField.formatted_value.value.code;
            }
        }
        var isNull = this.caseField.value === undefined || this.caseField.value === '';
        if (isNull || typeof this.caseField.value === 'object') {
            this.caseField.value = null;
        }
        this.dynamicListFormControl = this.registerControl(new forms_1.FormControl(this.caseField.value));
        this.dynamicListFormControl.setValue(this.caseField.value);
    };
    WriteDynamicListFieldComponent = __decorate([
        core_1.Component({
            selector: 'ccd-write-dynamic-list-field',
            template: "\n    <div class=\"form-group\"\n      [ngClass]=\"{'form-group-error': !dynamicListFormControl.valid && dynamicListFormControl.dirty}\">\n\n      <label [for]=\"id()\">\n        <span class=\"form-label\" *ngIf=\"caseField.label\">{{caseField | ccdFieldLabel}}</span>\n      </label>\n      <span class=\"form-hint\" *ngIf=\"caseField.hint_text\">{{caseField.hint_text}}</span>\n      <span class=\"form-label\" *ngIf=\"!caseField.label && !caseField.hint_text\">Select an option from the\n          dropdown</span>\n      <span class=\"error-message\"\n        *ngIf=\"dynamicListFormControl.errors && dynamicListFormControl.dirty\">{{dynamicListFormControl.errors |\n        ccdFirstError:caseField.label}}</span>\n\n      <select class=\"form-control ccd-dropdown bottom-30\" [id]=\"id()\"\n        [formControl]=\"dynamicListFormControl\">\n        <option [ngValue]=null>--Select a value--</option>\n        <option [ngValue]=\"type.code\" *ngFor=\"let type of caseField.list_items\" role=\"option\">{{type.label}}</option>\n      </select>\n\n    </div>\n  "
        })
    ], WriteDynamicListFieldComponent);
    return WriteDynamicListFieldComponent;
}(abstract_field_write_component_1.AbstractFieldWriteComponent));
exports.WriteDynamicListFieldComponent = WriteDynamicListFieldComponent;
//# sourceMappingURL=write-dynamic-list-field.component.js.map