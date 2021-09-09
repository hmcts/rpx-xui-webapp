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
var FieldsFilterPipe = /** @class */ (function () {
    function FieldsFilterPipe() {
    }
    FieldsFilterPipe_1 = FieldsFilterPipe;
    /**
     * Complex type should have at least on simple field descendant with a value.
     *
     * @param field
     * @param values
     * @returns {boolean}
     */
    FieldsFilterPipe.isValidComplex = function (field, values) {
        values = values || {};
        var type = field.field_type;
        var value = FieldsFilterPipe_1.getValue(field, values);
        var hasChildrenWithValue = type.complex_fields.find(function (f) {
            return FieldsFilterPipe_1.keepField(f, value);
        });
        return !!hasChildrenWithValue;
    };
    FieldsFilterPipe.isEmpty = function (value) {
        return FieldsFilterPipe_1.EMPTY_VALUES.indexOf(value) !== -1
            || value.length === 0;
    };
    FieldsFilterPipe.isCompound = function (field) {
        return FieldsFilterPipe_1.NESTED_TYPES[field.field_type.type];
    };
    FieldsFilterPipe.isValidCompound = function (field, value) {
        return FieldsFilterPipe_1.isCompound(field)
            && FieldsFilterPipe_1.NESTED_TYPES[field.field_type.type](field, value);
    };
    FieldsFilterPipe.keepField = function (field, value) {
        // We shouldn't ditch labels.
        if (field.field_type.type === 'Label' && (field.label || '').length > 0) {
            return true;
        }
        value = value || {};
        if (FieldsFilterPipe_1.isCompound(field)) {
            return FieldsFilterPipe_1.isValidCompound(field, value);
        }
        return !FieldsFilterPipe_1.isEmpty(field.value)
            || !FieldsFilterPipe_1.isEmpty(value[field.id]);
    };
    FieldsFilterPipe.getValue = function (field, values, index) {
        var value;
        if (index >= 0) {
            value = values[index].value[field.id];
        }
        else {
            value = values[field.id];
        }
        return FieldsFilterPipe_1.isEmpty(field.value) ? value : field.value;
    };
    /**
     * Filter out fields having no data to display and harmonise field values coming parent's value.
     *
     * @param complexField
     * @param keepEmpty
     * @param index
     * @param stripHidden
     * @returns {any}
     */
    FieldsFilterPipe.prototype.transform = function (complexField, keepEmpty, index, stripHidden) {
        if (stripHidden === void 0) { stripHidden = false; }
        var _a;
        if (!complexField || !complexField.field_type) {
            return [];
        }
        var fields = complexField.field_type.complex_fields || [];
        var values = complexField.value || {};
        var checkConditionsAgainst = (_a = {}, _a[complexField.id] = values, _a);
        return fields
            .filter(function (f) {
            if (stripHidden && f.show_condition) {
                var cond = directives_1.ShowCondition.getInstance(f.show_condition);
                return cond.match(checkConditionsAgainst);
            }
            return true;
        })
            .map(function (f) {
            var clone = fields_1.FieldsUtils.cloneObject(f);
            var value = FieldsFilterPipe_1.getValue(f, values, index);
            if (!FieldsFilterPipe_1.isEmpty(value)) {
                clone.value = value;
            }
            return clone;
        })
            .filter(function (f) { return keepEmpty || FieldsFilterPipe_1.keepField(f); })
            .map(function (f) {
            if (!f.display_context) {
                f.display_context = complexField.display_context;
            }
            return f;
        });
    };
    var FieldsFilterPipe_1;
    FieldsFilterPipe.EMPTY_VALUES = [
        undefined,
        null,
        '',
        {}
    ];
    FieldsFilterPipe.NESTED_TYPES = {
        'Complex': FieldsFilterPipe_1.isValidComplex
    };
    FieldsFilterPipe = FieldsFilterPipe_1 = __decorate([
        core_1.Pipe({
            name: 'ccdFieldsFilter'
        })
    ], FieldsFilterPipe);
    return FieldsFilterPipe;
}());
exports.FieldsFilterPipe = FieldsFilterPipe;
//# sourceMappingURL=fields-filter.pipe.js.map