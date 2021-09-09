"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var directives_1 = require("../../../directives");
var fields_1 = require("../../../services/fields");
var ReadFieldsFilterPipe = /** @class */ (function () {
    function ReadFieldsFilterPipe() {
    }
    ReadFieldsFilterPipe_1 = ReadFieldsFilterPipe;
    /**
     * Complex type should have at least on simple field descendant with a value.
     *
     * @param field
     * @param values
     * @returns {boolean}
     */
    ReadFieldsFilterPipe.isValidComplex = function (field, values) {
        values = values || {};
        var type = field.field_type;
        var value = ReadFieldsFilterPipe_1.getValue(field, values);
        var hasChildrenWithValue = type.complex_fields.find(function (f) {
            return ReadFieldsFilterPipe_1.keepField(f, value);
        });
        return !!hasChildrenWithValue;
    };
    ReadFieldsFilterPipe.isEmpty = function (value) {
        return ReadFieldsFilterPipe_1.EMPTY_VALUES.indexOf(value) !== -1
            || value.length === 0;
    };
    ReadFieldsFilterPipe.isCompound = function (field) {
        return ReadFieldsFilterPipe_1.NESTED_TYPES[field.field_type.type];
    };
    ReadFieldsFilterPipe.isValidCompound = function (field, value) {
        return ReadFieldsFilterPipe_1.isCompound(field)
            && ReadFieldsFilterPipe_1.NESTED_TYPES[field.field_type.type](field, value);
    };
    ReadFieldsFilterPipe.keepField = function (field, value) {
        // We shouldn't ditch labels.
        if (field.field_type.type === 'Label' && (field.label || '').length > 0) {
            return true;
        }
        // We also shouldn't ditch CasePaymentHistoryViewer fields.
        if (field.field_type.type === 'CasePaymentHistoryViewer') {
            return true;
        }
        value = value || {};
        if (ReadFieldsFilterPipe_1.isCompound(field)) {
            return ReadFieldsFilterPipe_1.isValidCompound(field, value);
        }
        return !ReadFieldsFilterPipe_1.isEmpty(field.value)
            || !ReadFieldsFilterPipe_1.isEmpty(value[field.id]);
    };
    ReadFieldsFilterPipe.getValue = function (field, values, index) {
        var value;
        if (index >= 0) {
            value = values[index].value[field.id];
        }
        else {
            value = values[field.id];
        }
        return ReadFieldsFilterPipe_1.isEmpty(field.value) ? value : field.value;
    };
    ReadFieldsFilterPipe.evaluateConditionalShow = function (field, formValue, path) {
        if (field.display_context === 'HIDDEN') {
            field.hidden = true;
        }
        else if (field.show_condition) {
            var cond = directives_1.ShowCondition.getInstance(field.show_condition);
            field.hidden = !cond.match(formValue, path);
        }
        else {
            field.hidden = false;
        }
        return field;
    };
    /**
     * Filter out fields having no data to display and harmonise field values coming parent's value.
     *
     * @param complexField A complex field, containing other fields we want to extract
     * @param keepEmpty Whether or not we should filter out empty fields.
     * @param index The index within an array.
     * @param setupHidden Whether or not we should evaluate the show/hide conditions on the fields.
     * @param formGroup The top-level FormGroup that contains the data for show/hide evaluation.
     * @param path The current path to this field.
     * @returns CaseField[]
     */
    ReadFieldsFilterPipe.prototype.transform = function (complexField, keepEmpty, index, setupHidden, formGroup, path) {
        if (setupHidden === void 0) { setupHidden = false; }
        if (!complexField || !complexField.field_type) {
            return [];
        }
        var fields = complexField.field_type.complex_fields || [];
        var values = complexField.value || {};
        var checkConditionalShowAgainst = values;
        if (formGroup) {
            checkConditionalShowAgainst = formGroup.value;
        }
        return fields
            .map(function (f) {
            var clone = fields_1.FieldsUtils.cloneObject(f);
            var value = ReadFieldsFilterPipe_1.getValue(f, values, index);
            if (!ReadFieldsFilterPipe_1.isEmpty(value)) {
                clone.value = value;
            }
            return clone;
        })
            .map(function (f) {
            if (!f.display_context) {
                f.display_context = complexField.display_context;
            }
            if (setupHidden) {
                ReadFieldsFilterPipe_1.evaluateConditionalShow(f, checkConditionalShowAgainst, path);
            }
            return f;
        })
            .filter(function (f) { return keepEmpty || ReadFieldsFilterPipe_1.keepField(f); });
    };
    var ReadFieldsFilterPipe_1;
    ReadFieldsFilterPipe.EMPTY_VALUES = [
        undefined,
        null,
        '',
        {}
    ];
    ReadFieldsFilterPipe.NESTED_TYPES = {
        'Complex': ReadFieldsFilterPipe_1.isValidComplex
    };
    ReadFieldsFilterPipe = ReadFieldsFilterPipe_1 = __decorate([
        core_1.Pipe({
            name: 'ccdReadFieldsFilter'
        })
    ], ReadFieldsFilterPipe);
    return ReadFieldsFilterPipe;
}());
exports.ReadFieldsFilterPipe = ReadFieldsFilterPipe;
//# sourceMappingURL=ccd-read-fields-filter.pipe.js.map