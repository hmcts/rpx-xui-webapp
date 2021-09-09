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
var class_transformer_1 = require("class-transformer");
var case_field_model_1 = require("../../../domain/definition/case-field.model");
var abstract_field_read_component_1 = require("./abstract-field-read.component");
var FieldReadLabelComponent = /** @class */ (function (_super) {
    __extends(FieldReadLabelComponent, _super);
    function FieldReadLabelComponent() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        // EUI-3267. Flag for whether or not this can have a grey bar.
        _this.canHaveGreyBar = false;
        return _this;
    }
    FieldReadLabelComponent.prototype.isLabel = function () {
        return this.caseField.field_type && this.caseField.field_type.type === 'Label';
    };
    FieldReadLabelComponent.prototype.isComplex = function () {
        return this.caseField.isComplex();
    };
    FieldReadLabelComponent.prototype.isCaseLink = function () {
        return this.caseField.isCaseLink();
    };
    FieldReadLabelComponent.prototype.ngOnChanges = function (changes) {
        var change = changes['caseField'];
        if (change) {
            var cfNew = change.currentValue;
            if (!(cfNew instanceof case_field_model_1.CaseField)) {
                this.fixCaseField();
            }
            // EUI-3267.
            // Set up the flag for whether this can have a grey bar.
            this.canHaveGreyBar = !!this.caseField.show_condition;
        }
    };
    FieldReadLabelComponent.prototype.fixCaseField = function () {
        if (this.caseField && !(this.caseField instanceof case_field_model_1.CaseField)) {
            this.caseField = class_transformer_1.plainToClassFromExist(new case_field_model_1.CaseField(), this.caseField);
        }
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], FieldReadLabelComponent.prototype, "withLabel", void 0);
    FieldReadLabelComponent = __decorate([
        core_1.Component({
            selector: 'ccd-field-read-label',
            template: "\n    <div [hidden]=\"caseField.hidden\" [class.grey-bar]=\"canHaveGreyBar && !caseField.hiddenCannotChange\">\n      <dl class=\"case-field\" *ngIf=\"withLabel && !isLabel() && (!isComplex() || isCaseLink()); else caseFieldValue\">\n        <dt class=\"case-field__label\">{{caseField.label}}</dt>\n        <dd class=\"case-field__value\">\n          <ng-container *ngTemplateOutlet=\"caseFieldValue\"></ng-container>\n        </dd>\n      </dl>\n      <ng-template #caseFieldValue>\n        <ng-content></ng-content>\n      </ng-template>\n    </div>\n  ",
            styles: ["\n    .case-field:after{content:\"\";display:block;clear:both}.case-field{-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;margin-bottom:15px}@media (min-width: 641px){.case-field{margin-bottom:30px}}.case-field .case-field__label{display:block;color:#0b0c0c;padding-bottom:2px;font-family:\"nta\",Arial,sans-serif;font-weight:700;text-transform:none;font-size:16px;line-height:1.25}@media (min-width: 641px){.case-field .case-field__label{font-size:19px;line-height:1.31579}}.case-field .case-field__value{font-family:\"nta\",Arial,sans-serif;font-weight:400;text-transform:none;font-size:16px;line-height:1.25}@media (min-width: 641px){.case-field .case-field__value{font-size:19px;line-height:1.31579}}.form :host::ng-deep .grey-bar>*>.form-group,.form :host::ng-deep .grey-bar>*>dl.case-field{margin-left:15px;padding-left:15px}.form :host::ng-deep .grey-bar>*>.form-group:not(.form-group-error),.form :host::ng-deep .grey-bar>*>dl.case-field:not(.form-group-error){border-left:solid 5px #b1b4b6}.form :host::ng-deep .grey-bar>*>.form-group input:not(.inline-block),.form :host::ng-deep .grey-bar>*>.form-group select:not(.inline-block),.form :host::ng-deep .grey-bar>*>.form-group textarea:not(.inline-block),.form :host::ng-deep .grey-bar>*>dl.case-field input:not(.inline-block),.form :host::ng-deep .grey-bar>*>dl.case-field select:not(.inline-block),.form :host::ng-deep .grey-bar>*>dl.case-field textarea:not(.inline-block){display:block}\n  "]
        })
    ], FieldReadLabelComponent);
    return FieldReadLabelComponent;
}(abstract_field_read_component_1.AbstractFieldReadComponent));
exports.FieldReadLabelComponent = FieldReadLabelComponent;
//# sourceMappingURL=field-read-label.component.js.map