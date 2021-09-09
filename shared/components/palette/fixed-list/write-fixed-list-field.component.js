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
var WriteFixedListFieldComponent = /** @class */ (function (_super) {
    __extends(WriteFixedListFieldComponent, _super);
    function WriteFixedListFieldComponent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(WriteFixedListFieldComponent.prototype, "listItems", {
        get: function () {
            if (this.caseField) {
                if (this.caseField.list_items) {
                    return this.caseField.list_items;
                }
                if (this.caseField.formatted_value && this.caseField.formatted_value.list_items) {
                    return this.caseField.formatted_value.list_items;
                }
            }
            return [];
        },
        enumerable: true,
        configurable: true
    });
    WriteFixedListFieldComponent.prototype.ngOnInit = function () {
        var isNull = this.caseField.value === undefined || this.caseField.value === '';
        if (isNull) {
            this.caseField.value = null;
        }
        this.fixedListFormControl = this.registerControl(new forms_1.FormControl(this.caseField.value));
        this.fixedListFormControl.setValue(this.caseField.value);
    };
    WriteFixedListFieldComponent = __decorate([
        core_1.Component({
            selector: 'ccd-write-fixed-list-field',
            template: "\n    <div class=\"form-group\" [ngClass]=\"{'form-group-error': !fixedListFormControl.valid && fixedListFormControl.dirty}\">\n\n      <label [for]=\"id()\">\n        <span class=\"form-label\" *ngIf=\"caseField.label\">{{caseField | ccdFieldLabel}}</span>\n      </label>\n      <span class=\"form-hint\" *ngIf=\"caseField.hint_text\">{{caseField.hint_text}}</span>\n      <span class=\"error-message\" *ngIf=\"fixedListFormControl.errors && fixedListFormControl.dirty\">{{fixedListFormControl.errors | ccdFirstError:caseField.label}}</span>\n\n      <select class=\"form-control ccd-dropdown bottom-30\" [id]=\"id()\" [formControl]=\"fixedListFormControl\">\n        <option [ngValue]=null>--Select a value--</option>\n        <option [ngValue]=\"type.code\" *ngFor=\"let type of listItems\">{{type.label}}</option>\n      </select>\n\n    </div>\n  "
        })
    ], WriteFixedListFieldComponent);
    return WriteFixedListFieldComponent;
}(abstract_field_write_component_1.AbstractFieldWriteComponent));
exports.WriteFixedListFieldComponent = WriteFixedListFieldComponent;
//# sourceMappingURL=write-fixed-list-field.component.js.map