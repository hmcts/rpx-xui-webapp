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
var domain_1 = require("../../../domain");
var form_validators_service_1 = require("../../../services/form/form-validators.service");
var abstract_form_field_component_1 = require("./abstract-form-field.component");
var AbstractFieldWriteComponent = /** @class */ (function (_super) {
    __extends(AbstractFieldWriteComponent, _super);
    function AbstractFieldWriteComponent() {
        var _this = _super.call(this) || this;
        _this.isExpanded = false;
        _this.isInSearchBlock = false;
        _this.fixCaseField();
        return _this;
    }
    AbstractFieldWriteComponent.prototype.ngOnChanges = function (changes) {
        var change = changes['caseField'];
        if (change) {
            var cfNew = change.currentValue;
            if (!(cfNew instanceof domain_1.CaseField)) {
                this.fixCaseField();
            }
        }
    };
    AbstractFieldWriteComponent.prototype.addValidators = function (caseField, control) {
        form_validators_service_1.FormValidatorsService.addValidators(caseField, control);
    };
    AbstractFieldWriteComponent.prototype.fixCaseField = function () {
        if (this.caseField && !(this.caseField instanceof domain_1.CaseField)) {
            this.caseField = class_transformer_1.plainToClassFromExist(new domain_1.CaseField(), this.caseField);
        }
    };
    AbstractFieldWriteComponent.prototype.createElementId = function (elementId) {
        return this.id() + "_" + elementId;
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], AbstractFieldWriteComponent.prototype, "isExpanded", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], AbstractFieldWriteComponent.prototype, "isInSearchBlock", void 0);
    return AbstractFieldWriteComponent;
}(abstract_form_field_component_1.AbstractFormFieldComponent));
exports.AbstractFieldWriteComponent = AbstractFieldWriteComponent;
//# sourceMappingURL=abstract-field-write.component.js.map