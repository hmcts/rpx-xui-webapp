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
var class_transformer_1 = require("class-transformer");
var constants_1 = require("../../../commons/constants");
var definition_1 = require("../../../domain/definition");
var services_1 = require("../../../services");
var abstract_field_write_component_1 = require("../base-field/abstract-field-write.component");
var is_compound_pipe_1 = require("../utils/is-compound.pipe");
var fields_filter_pipe_1 = require("./fields-filter.pipe");
var ADDRESS_FIELD_TYPES = ['AddressUK', 'AddressGlobalUK', 'AddressGlobal'];
var WriteComplexFieldComponent = /** @class */ (function (_super) {
    __extends(WriteComplexFieldComponent, _super);
    function WriteComplexFieldComponent(isCompoundPipe, formValidatorsService) {
        var _this = _super.call(this) || this;
        _this.isCompoundPipe = isCompoundPipe;
        _this.formValidatorsService = formValidatorsService;
        _this.caseFields = [];
        _this.renderLabel = true;
        _this.ignoreMandatory = false;
        _this.complexGroup = new forms_1.FormGroup({});
        return _this;
    }
    WriteComplexFieldComponent.prototype.ngOnInit = function () {
        // Are we inside of a collection? If so, the parent is the complexGroup we want.
        if (this.isTopLevelWithinCollection()) {
            this.complexGroup = this.parent;
            services_1.FieldsUtils.addCaseFieldAndComponentReferences(this.complexGroup, this.caseField, this);
        }
        else {
            this.complexGroup = this.registerControl(this.complexGroup, true);
        }
        // Add validators for the complex field.
        this.formValidatorsService.addValidators(this.caseField, this.complexGroup);
        this.setupFields();
        this.complexGroup.updateValueAndValidity({ emitEvent: true });
    };
    WriteComplexFieldComponent.prototype.buildField = function (caseField) {
        var control = this.complexGroup.get(caseField.id);
        if (!control) {
            control = new forms_1.FormControl(caseField.value);
            this.complexGroup.addControl(caseField.id, control);
        }
        // Add validators for addresses, if appropriate.
        if (this.isAddressUK()) {
            if (this.addressValidatorsRequired(caseField)) {
                this.formValidatorsService.addValidators(caseField, control);
            }
        }
        else {
            // It's not an address so set it up according to its own display_context.
            this.formValidatorsService.addValidators(caseField, control);
        }
        // For Address-type fields, ensure that all sub-fields inherit the same value for retain_hidden_value as this
        // parent; although address fields use the Complex type, each of them is meant to be treated as one field
        if (this.isAddressUK() && this.caseField) {
            for (var _i = 0, _a = this.caseField.field_type.complex_fields; _i < _a.length; _i++) {
                var addressSubField = _a[_i];
                addressSubField.retain_hidden_value = this.caseField.retain_hidden_value;
            }
        }
        services_1.FieldsUtils.addCaseFieldAndComponentReferences(control, caseField, this);
        return caseField;
    };
    WriteComplexFieldComponent.prototype.buildIdPrefix = function (field) {
        return this.isCompoundPipe.transform(field) ? "" + this.idPrefix + field.id + "_" : "" + this.idPrefix;
    };
    WriteComplexFieldComponent.prototype.addressValidatorsRequired = function (caseField) {
        return this.isSmallAddressLine1(caseField) && this.isMandatory(caseField);
    };
    WriteComplexFieldComponent.prototype.isSmallAddressLine1 = function (caseField) {
        return caseField.id === 'AddressLine1' && caseField.field_type.id === 'TextMax150';
    };
    WriteComplexFieldComponent.prototype.isMandatory = function (caseField) {
        return (constants_1.Constants.MANDATORY === caseField.display_context || !this.ignoreMandatory);
    };
    WriteComplexFieldComponent.prototype.isAddressUK = function () {
        return ADDRESS_FIELD_TYPES.indexOf(this.caseField.field_type.id) > -1;
    };
    WriteComplexFieldComponent.prototype.isTopLevelWithinCollection = function () {
        if (this.parent) {
            var parentCaseField = this.parent['caseField'];
            if (parentCaseField && parentCaseField.id === this.caseField.id) {
                var parentComponent = this.parent['component'];
                if (parentComponent) {
                    var parentComponentCaseField = parentComponent.caseField;
                    if (parentComponentCaseField.field_type) {
                        return parentComponentCaseField.field_type.type === 'Collection';
                    }
                }
            }
        }
        return false;
    };
    WriteComplexFieldComponent.prototype.setupFields = function () {
        var _this = this;
        var fieldsFilterPipe = new fields_filter_pipe_1.FieldsFilterPipe();
        this.complexFields = fieldsFilterPipe.transform(this.caseField, true).map(function (field) {
            if (field && field.id) {
                if (!(field instanceof definition_1.CaseField)) {
                    return _this.buildField(class_transformer_1.plainToClassFromExist(new definition_1.CaseField(), field));
                }
            }
            return _this.buildField(field);
        });
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", Array)
    ], WriteComplexFieldComponent.prototype, "caseFields", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", forms_1.FormGroup)
    ], WriteComplexFieldComponent.prototype, "formGroup", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], WriteComplexFieldComponent.prototype, "renderLabel", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], WriteComplexFieldComponent.prototype, "ignoreMandatory", void 0);
    WriteComplexFieldComponent = __decorate([
        core_1.Component({
            selector: 'ccd-write-complex-type-field',
            template: "\n    <div class=\"form-group\" [id]=\"id()\">\n\n      <h2 *ngIf=\"renderLabel\" class=\"heading-h2\">{{caseField | ccdFieldLabel}}</h2>\n      <ng-container *ngFor=\"let field of complexFields\">\n        <ng-container [ngSwitch]=\"field | ccdIsReadOnlyAndNotCollection\">\n          <ccd-field-read *ngSwitchCase=\"true\"\n                          ccdLabelSubstitutor\n                          [caseField]=\"buildField(field)\"\n                          [caseFields]=\"caseFields\"\n                          [formGroup]=\"formGroup\"\n                          [withLabel]=\"true\">\n          </ccd-field-read>\n          <ccd-field-write *ngSwitchCase=\"false\"\n                           ccdLabelSubstitutor\n                           [caseField]=\"field\"\n                           [caseFields]=\"caseFields\"\n                           [formGroup]=\"formGroup\"\n                           [parent]=\"complexGroup\"\n                           [idPrefix]=\"buildIdPrefix(field)\"\n                           [hidden]=\"field.hidden\"\n                           [isExpanded]=\"isExpanded\"\n                           [isInSearchBlock]=\"isInSearchBlock\">\n          </ccd-field-write>\n        </ng-container>\n      </ng-container>\n    </div>\n  ",
            styles: ["\n    .complex-panel{margin:13px 0px;border:1px solid #bfc1c3}.complex-panel .complex-panel-title{background-color:#dee0e2;padding:5px;border-bottom:1px solid #bfc1c3;font-weight:bold;display:block;color:#0b0c0c;padding-bottom:2px;font-family:\"nta\",Arial,sans-serif;font-weight:700;text-transform:none;font-size:16px;line-height:1.25}@media (min-width: 641px){.complex-panel .complex-panel-title{font-size:19px;line-height:1.31579}}.complex-panel .complex-panel-table>tbody>tr>th{vertical-align:top}.complex-panel .complex-panel-table>tbody>tr:last-child>th,.complex-panel .complex-panel-table>tbody>tr:last-child>td{border-bottom:none}.complex-panel .complex-panel-simple-field th{padding-left:5px;width:295px}.complex-panel .complex-panel-compound-field td{padding:5px}\n  "]
        }),
        __metadata("design:paramtypes", [is_compound_pipe_1.IsCompoundPipe, services_1.FormValidatorsService])
    ], WriteComplexFieldComponent);
    return WriteComplexFieldComponent;
}(abstract_field_write_component_1.AbstractFieldWriteComponent));
exports.WriteComplexFieldComponent = WriteComplexFieldComponent;
//# sourceMappingURL=write-complex-field.component.js.map