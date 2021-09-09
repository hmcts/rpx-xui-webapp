"use strict";
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
var wizard_page_field_model_1 = require("../../components/case-editor/domain/wizard-page-field.model");
var class_transformer_1 = require("class-transformer");
var _ = require("underscore");
var fixed_list_item_model_1 = require("./fixed-list-item.model");
var ɵ0 = function () { return FieldType; }, ɵ1 = function () { return wizard_page_field_model_1.WizardPageField; };
exports.ɵ0 = ɵ0;
exports.ɵ1 = ɵ1;
// @dynamic
var CaseField = /** @class */ (function () {
    function CaseField() {
        this._list_items = [];
    }
    Object.defineProperty(CaseField.prototype, "value", {
        get: function () {
            if (this.isDynamic()) {
                return this._value && this._value.value ? this._value.value.code : this._value;
            }
            else {
                return this._value;
            }
        },
        set: function (value) {
            if (this.isDynamic()) {
                if (value && value instanceof Object && value.list_items) {
                    this._list_items = value.list_items;
                }
                else if (!this._list_items || this._list_items.length === 0) {
                    // Extract the list items from the current value if that's the only place they exist.
                    this._list_items = this.list_items;
                    if (!value || !value.value) {
                        value = null;
                    }
                }
            }
            this._value = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CaseField.prototype, "list_items", {
        get: function () {
            if (this.isDynamic()) {
                return this._value && this._value.list_items ? this._value.list_items : this._list_items;
            }
            else {
                return this.field_type.fixed_list_items;
            }
        },
        set: function (items) {
            this._list_items = items;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CaseField.prototype, "dateTimeEntryFormat", {
        get: function () {
            if (this.isComplexDisplay()) {
                return null;
            }
            if (this.display_context_parameter) {
                return this.extractBracketValue(this.display_context_parameter, '#DATETIMEENTRY');
            }
            return null;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CaseField.prototype, "dateTimeDisplayFormat", {
        get: function () {
            if (this.isComplexEntry()) {
                return null;
            }
            if (this.display_context_parameter) {
                return this.extractBracketValue(this.display_context_parameter, '#DATETIMEDISPLAY');
            }
            return null;
        },
        enumerable: true,
        configurable: true
    });
    CaseField.prototype.isComplexDisplay = function () {
        return (this.isComplex() || this.isCollection()) && this.isReadonly();
    };
    CaseField.prototype.isComplexEntry = function () {
        return (this.isComplex() || this.isCollection()) && (this.isOptional() || this.isMandatory());
    };
    CaseField.prototype.isReadonly = function () {
        return !_.isEmpty(this.display_context)
            && this.display_context.toUpperCase() === 'READONLY';
    };
    CaseField.prototype.isOptional = function () {
        return !_.isEmpty(this.display_context)
            && this.display_context.toUpperCase() === 'OPTIONAL';
    };
    CaseField.prototype.isMandatory = function () {
        return !_.isEmpty(this.display_context)
            && this.display_context.toUpperCase() === 'MANDATORY';
    };
    CaseField.prototype.isCollection = function () {
        return this.field_type && this.field_type.type === 'Collection';
    };
    CaseField.prototype.isComplex = function () {
        return this.field_type && this.field_type.type === 'Complex';
    };
    CaseField.prototype.isDynamic = function () {
        var _this = this;
        var dynamicFieldTypes = ['DynamicList', 'DynamicRadioList'];
        if (!this.field_type) {
            return false;
        }
        return dynamicFieldTypes.some(function (t) { return t === _this.field_type.type; });
    };
    CaseField.prototype.isCaseLink = function () {
        return this.isComplex()
            && this.field_type.id === 'CaseLink'
            && this.field_type.complex_fields.some(function (cf) { return cf.id === 'CaseReference'; });
    };
    CaseField.prototype.extractBracketValue = function (fmt, paramName, leftBracket, rightBracket) {
        if (leftBracket === void 0) { leftBracket = '('; }
        if (rightBracket === void 0) { rightBracket = ')'; }
        fmt = fmt.split(',')
            .find(function (a) { return a.trim().startsWith(paramName); });
        if (fmt) {
            var s = fmt.indexOf(leftBracket) + 1;
            var e = fmt.indexOf(rightBracket, s);
            if (e > s && s >= 0) {
                return fmt.substr(s, (e - s));
            }
        }
        return null;
    };
    __decorate([
        class_transformer_1.Type(ɵ0),
        __metadata("design:type", FieldType)
    ], CaseField.prototype, "field_type", void 0);
    __decorate([
        class_transformer_1.Type(ɵ1),
        __metadata("design:type", wizard_page_field_model_1.WizardPageField)
    ], CaseField.prototype, "wizardProps", void 0);
    __decorate([
        class_transformer_1.Expose(),
        __metadata("design:type", Object),
        __metadata("design:paramtypes", [Object])
    ], CaseField.prototype, "value", null);
    __decorate([
        class_transformer_1.Expose(),
        __metadata("design:type", Object),
        __metadata("design:paramtypes", [Object])
    ], CaseField.prototype, "list_items", null);
    __decorate([
        class_transformer_1.Expose(),
        __metadata("design:type", String),
        __metadata("design:paramtypes", [])
    ], CaseField.prototype, "dateTimeEntryFormat", null);
    __decorate([
        class_transformer_1.Expose(),
        __metadata("design:type", String),
        __metadata("design:paramtypes", [])
    ], CaseField.prototype, "dateTimeDisplayFormat", null);
    __decorate([
        class_transformer_1.Expose(),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], CaseField.prototype, "isComplexDisplay", null);
    __decorate([
        class_transformer_1.Expose(),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], CaseField.prototype, "isComplexEntry", null);
    __decorate([
        class_transformer_1.Expose(),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], CaseField.prototype, "isReadonly", null);
    __decorate([
        class_transformer_1.Expose(),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], CaseField.prototype, "isOptional", null);
    __decorate([
        class_transformer_1.Expose(),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], CaseField.prototype, "isMandatory", null);
    __decorate([
        class_transformer_1.Expose(),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", Boolean)
    ], CaseField.prototype, "isCollection", null);
    __decorate([
        class_transformer_1.Expose(),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", Boolean)
    ], CaseField.prototype, "isComplex", null);
    __decorate([
        class_transformer_1.Expose(),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", Boolean)
    ], CaseField.prototype, "isDynamic", null);
    __decorate([
        class_transformer_1.Expose(),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", Boolean)
    ], CaseField.prototype, "isCaseLink", null);
    return CaseField;
}());
exports.CaseField = CaseField;
var ɵ2 = function () { return fixed_list_item_model_1.FixedListItem; }, ɵ3 = function () { return CaseField; }, ɵ4 = function () { return FieldType; };
exports.ɵ2 = ɵ2;
exports.ɵ3 = ɵ3;
exports.ɵ4 = ɵ4;
// @dynamic
var FieldType = /** @class */ (function () {
    function FieldType() {
    }
    __decorate([
        class_transformer_1.Type(ɵ2),
        __metadata("design:type", Array)
    ], FieldType.prototype, "fixed_list_items", void 0);
    __decorate([
        class_transformer_1.Type(ɵ3),
        __metadata("design:type", Array)
    ], FieldType.prototype, "complex_fields", void 0);
    __decorate([
        class_transformer_1.Type(ɵ4),
        __metadata("design:type", FieldType)
    ], FieldType.prototype, "collection_field_type", void 0);
    return FieldType;
}());
exports.FieldType = FieldType;
//# sourceMappingURL=case-field.model.js.map