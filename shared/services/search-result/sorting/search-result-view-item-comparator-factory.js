"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var util_1 = require("util");
var SearchResultViewItemComparatorFactory = /** @class */ (function () {
    function SearchResultViewItemComparatorFactory() {
    }
    SearchResultViewItemComparatorFactory.prototype.createSearchResultViewItemComparator = function (column) {
        var fieldId = column.case_field_id;
        switch (column.case_field_type.type) {
            case ('MultiSelectList'): {
                return this.textArrayComparator(fieldId);
            }
            case ('Number'):
            case ('MoneyGBP'): {
                return this.numberComparator(fieldId);
            }
            case ('Text'):
            case ('TextArea'):
            case ('Email'):
            case ('Date'):
            case ('DateTime'):
            case ('Label'):
            case ('Postcode'):
            case ('YesOrNo'):
            case ('PhoneUK'):
            case ('FixedList'): {
                return this.stringComparator(fieldId);
            }
            default: {
                return undefined;
            }
        }
    };
    SearchResultViewItemComparatorFactory.prototype.numberComparator = function (fieldId) {
        return {
            compare: function (a, b) {
                var fieldA = a.case_fields[fieldId];
                var fieldB = b.case_fields[fieldId];
                fieldA = util_1.isUndefined(fieldA) || fieldA === null ? 0 : fieldA;
                fieldB = util_1.isUndefined(fieldB) || fieldB === null ? 0 : fieldB;
                return fieldA - fieldB;
            }
        };
    };
    SearchResultViewItemComparatorFactory.prototype.stringComparator = function (fieldId) {
        return {
            compare: function (a, b) {
                var fieldA = a.case_fields[fieldId];
                var fieldB = b.case_fields[fieldId];
                fieldA = util_1.isUndefined(fieldA) || fieldA == null ? '' : fieldA.toLowerCase();
                fieldB = util_1.isUndefined(fieldB) || fieldB == null ? '' : fieldB.toLowerCase();
                return fieldA === fieldB ? 0 : fieldA > fieldB ? 1 : -1;
            }
        };
    };
    SearchResultViewItemComparatorFactory.prototype.textArrayComparator = function (fieldId) {
        return {
            compare: function (a, b) {
                var fieldA = a.case_fields[fieldId];
                var fieldB = b.case_fields[fieldId];
                fieldA = util_1.isUndefined(fieldA) || fieldA == null ? '' : fieldA.join().toLowerCase();
                fieldB = util_1.isUndefined(fieldB) || fieldB == null ? '' : fieldB.join().toLowerCase();
                return fieldA === fieldB ? 0 : fieldA > fieldB ? 1 : -1;
            }
        };
    };
    SearchResultViewItemComparatorFactory = __decorate([
        core_1.Injectable()
    ], SearchResultViewItemComparatorFactory);
    return SearchResultViewItemComparatorFactory;
}());
exports.SearchResultViewItemComparatorFactory = SearchResultViewItemComparatorFactory;
//# sourceMappingURL=search-result-view-item-comparator-factory.js.map