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
var yes_no_service_1 = require("./yes-no.service");
var WriteYesNoFieldComponent = /** @class */ (function (_super) {
    __extends(WriteYesNoFieldComponent, _super);
    function WriteYesNoFieldComponent(yesNoService) {
        var _this = _super.call(this) || this;
        _this.yesNoService = yesNoService;
        _this.yesNoValues = ['Yes', 'No'];
        return _this;
    }
    WriteYesNoFieldComponent.prototype.ngOnInit = function () {
        this.yesNoControl = this.registerControl(new forms_1.FormControl(this.yesNoService.format(this.caseField.value)));
    };
    WriteYesNoFieldComponent = __decorate([
        core_1.Component({
            selector: 'ccd-write-yes-no-field',
            template: "\n    <div [id]=\"id()\" class=\"form-group bottom-30\" [ngClass]=\"{'form-group-error': !yesNoControl.valid && yesNoControl.dirty}\">\n\n    \t<fieldset class=\"inline\">\n\n        <legend>\n          <span class=\"form-label\" *ngIf=\"caseField.label\">{{caseField | ccdFieldLabel}}</span>\n        </legend>\n        <span class=\"form-hint\" *ngIf=\"caseField.hint_text\">{{caseField.hint_text}}</span>\n        <span class=\"error-message\" *ngIf=\"yesNoControl.errors && yesNoControl.dirty\">{{yesNoControl.errors | ccdFirstError:caseField.label}}</span>\n\n        <div [id]=\"createElementId('radio')\">\n\n      \t  <div class=\"multiple-choice\" *ngFor=\"let value of yesNoValues\" [ngClass]=\"{selected: yesNoControl.value === value}\">\n      \t    <input class=\"form-control\" [id]=\"createElementId(value)\" [attr.name]=\"id()\" [name]=\"id()\" type=\"radio\" [formControl]=\"yesNoControl\" [value]=\"value\">\n      \t    <label class=\"form-label\" [for]=\"createElementId(value)\">{{value}}</label>\n      \t  </div>\n\n        </div>\n\n    \t</fieldset>\n\n    </div>\n  "
        }),
        __metadata("design:paramtypes", [yes_no_service_1.YesNoService])
    ], WriteYesNoFieldComponent);
    return WriteYesNoFieldComponent;
}(abstract_field_write_component_1.AbstractFieldWriteComponent));
exports.WriteYesNoFieldComponent = WriteYesNoFieldComponent;
//# sourceMappingURL=write-yes-no-field.component.js.map