"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var FieldTypeSanitiser = /** @class */ (function () {
    function FieldTypeSanitiser() {
    }
    FieldTypeSanitiser_1 = FieldTypeSanitiser;
    /**
     * This method finds dynamiclists in a form and replaces their string
     * values, with a JSON object, as below:
     * From: 'xyz'
     * To  : {
     *   value: { code:'xyz', label:'XYZ' },
     *   list_items: [
     *     { code:'xyz', label:'XYZ'},
     *     { code:'abc', label:'ABC'}
     *   ]
     * }
     * @param caseFields The CaseFields to assess.
     * @param data The data in the form.
     */
    FieldTypeSanitiser.prototype.sanitiseLists = function (caseFields, data) {
        var _this = this;
        if (!data || !caseFields) {
            return;
        }
        caseFields.forEach(function (caseField) {
            switch (caseField.field_type.type) {
                case FieldTypeSanitiser_1.FIELD_TYPE_DYNAMIC_RADIO_LIST:
                case FieldTypeSanitiser_1.FIELD_TYPE_DYNAMIC_LIST:
                    _this.convertStringToDynamicListOutput(caseField, data);
                    break;
                case FieldTypeSanitiser_1.FIELD_TYPE_COMPLEX:
                    _this.sanitiseLists(caseField.field_type.complex_fields, data[caseField.id]);
                    break;
                case FieldTypeSanitiser_1.FIELD_TYPE_COLLECTION:
                    if (Array.isArray(data[caseField.id])) {
                        data[caseField.id].forEach(function (formElement) {
                            _this.sanitiseLists(caseField.field_type.collection_field_type.complex_fields, formElement.value);
                        });
                    }
                    break;
            }
        });
    };
    FieldTypeSanitiser.prototype.convertStringToDynamicListOutput = function (field, data) {
        var stringValue = data[field.id];
        if (typeof stringValue === 'string') {
            var listItems = this.getListItems(field);
            var matches = listItems.filter(function (value) { return value.code === stringValue; });
            if (matches && matches.length > 0) {
                data[field.id] = {
                    value: matches[0],
                    list_items: listItems
                };
            }
        }
    };
    FieldTypeSanitiser.prototype.getListItems = function (field) {
        if (field) {
            if (field.list_items) {
                return field.list_items;
            }
            if (field.formatted_value && field.formatted_value.list_items) {
                return field.formatted_value.list_items;
            }
        }
        return [];
    };
    var FieldTypeSanitiser_1;
    FieldTypeSanitiser.FIELD_TYPE_COMPLEX = 'Complex';
    FieldTypeSanitiser.FIELD_TYPE_COLLECTION = 'Collection';
    FieldTypeSanitiser.FIELD_TYPE_DYNAMIC_LIST = 'DynamicList';
    FieldTypeSanitiser.FIELD_TYPE_DYNAMIC_RADIO_LIST = 'DynamicRadioList';
    FieldTypeSanitiser = FieldTypeSanitiser_1 = __decorate([
        core_1.Injectable()
    ], FieldTypeSanitiser);
    return FieldTypeSanitiser;
}());
exports.FieldTypeSanitiser = FieldTypeSanitiser;
//# sourceMappingURL=field-type-sanitiser.js.map