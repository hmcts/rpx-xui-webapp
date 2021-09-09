"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var services_1 = require("../../../services");
var fields_utils_1 = require("../../../services/fields/fields.utils");
// @dynamic
var PlaceholderService = /** @class */ (function () {
    function PlaceholderService() {
    }
    PlaceholderService_1 = PlaceholderService;
    PlaceholderService.prototype.resolvePlaceholders = function (pageFormFields, stringToResolve) {
        var ps = new PlaceholderService_1.PlaceholderSubstitutor({ pageFormFields: pageFormFields, stringToResolve: stringToResolve });
        return ps.resolvePlaceholders();
    };
    var PlaceholderService_1;
    PlaceholderService = PlaceholderService_1 = __decorate([
        core_1.Injectable()
    ], PlaceholderService);
    return PlaceholderService;
}());
exports.PlaceholderService = PlaceholderService;
(function (PlaceholderService) {
    var PlaceholderSubstitutor = /** @class */ (function () {
        function PlaceholderSubstitutor(values) {
            this.resolvedFormValues = [];
            this.stringToResolve = values.stringToResolve;
            this.originalStringToResolve = values.stringToResolve;
            this.pageFormFields = values.pageFormFields;
        }
        PlaceholderSubstitutor.wrapPlaceholder = function (str) {
            return "" + this.PLACEHOLDER_START + str + this.PLACEHOLDER_END;
        };
        PlaceholderSubstitutor.prototype.resolvePlaceholders = function () {
            while (this.hasUnresolvedPlaceholder()) {
                this.resetPlaceholderSubstitutor();
                while (this.doesPlaceholderContainCollectionItems()) {
                    while (this.isScanningStringToResolve()) {
                        if (this.isStartPlaceholderAndNotCollecting()) {
                            this.setStartCollecting();
                        }
                        else if (this.isCollecting) {
                            if (this.isClosingPlaceholder()) {
                                this.substitute();
                            }
                            else if (!this.isOpeningPlaceholder()) {
                                this.appendCharacter();
                            }
                        }
                        this.scanIndex++;
                    }
                    this.appendOriginalStringIfCollectionItemAsPlaceholder();
                }
            }
            return this.stringToResolve;
        };
        PlaceholderSubstitutor.prototype.isScanningStringToResolve = function () {
            return this.scanIndex < this.stringToResolve.length;
        };
        PlaceholderSubstitutor.prototype.doesPlaceholderContainCollectionItems = function () {
            return this.numberCollectionItemsAsPlaceholder-- > 0;
        };
        PlaceholderSubstitutor.prototype.hasUnresolvedPlaceholder = function () {
            return this.stringToResolve
                && typeof this.stringToResolve === 'string'
                && !!this.stringToResolve.match(PlaceholderSubstitutor.PLACEHOLDER_PATTERN);
        };
        PlaceholderSubstitutor.prototype.isStartPlaceholderAndNotCollecting = function () {
            return this.isStartingPlaceholder() && !this.isCollecting;
        };
        PlaceholderSubstitutor.prototype.isOpeningPlaceholder = function () {
            return this.stringToResolve.charAt(this.scanIndex) === PlaceholderSubstitutor.OPENING_PLACEHOLDER;
        };
        PlaceholderSubstitutor.prototype.isClosingPlaceholder = function () {
            return this.stringToResolve.charAt(this.scanIndex) === PlaceholderSubstitutor.CLOSING_PLACEHOLDER;
        };
        PlaceholderSubstitutor.prototype.resetPlaceholderSubstitutor = function () {
            this.scanIndex = 0;
            this.numberCollectionItemsAsPlaceholder = 1;
            this.collectionItemIndex = 0;
            this.fieldIdToSubstitute = '';
            this.startSubstitutionIndex = -1;
            this.isCollecting = false;
            this.resolvedFormValues[this.collectionItemIndex] = {};
        };
        PlaceholderSubstitutor.prototype.substitute = function () {
            if (this.isMatchingPlaceholderPattern() && this.isFieldIdInFormFields()) {
                this.updateNumberOfCollectionItemsAsPlaceholder();
                if (this.isFieldIdToSubstituteReferringItself()) {
                    this.substituteWithEmptyString();
                }
                else {
                    this.substituteFromFormFields();
                }
            }
            else {
                this.substituteWithEmptyString();
            }
            this.isCollecting = false;
            this.fieldIdToSubstitute = '';
        };
        PlaceholderSubstitutor.prototype.appendOriginalStringIfCollectionItemAsPlaceholder = function () {
            if (this.collectionItemIndex < this.numberCollectionItemsAsPlaceholder - 1) {
                this.stringToResolve += PlaceholderSubstitutor.NEW_LINE + this.originalStringToResolve;
                this.collectionItemIndex += 1;
                this.resolvedFormValues[this.collectionItemIndex] = {};
            }
        };
        PlaceholderSubstitutor.prototype.setStartCollecting = function () {
            this.isCollecting = true;
            this.startSubstitutionIndex = this.scanIndex;
        };
        PlaceholderSubstitutor.prototype.appendCharacter = function () {
            this.fieldIdToSubstitute += this.stringToResolve.charAt(this.scanIndex);
        };
        PlaceholderSubstitutor.prototype.isMatchingPlaceholderPattern = function () {
            return !!this.fieldIdToSubstitute.match(PlaceholderSubstitutor.PLACEHOLDER_CONTENT_PATTERN);
        };
        PlaceholderSubstitutor.prototype.isFieldIdInFormFields = function () {
            return this.getFieldValue() !== undefined;
        };
        PlaceholderSubstitutor.prototype.isFieldIdToSubstituteReferringItself = function () {
            var placeholder = PlaceholderSubstitutor.wrapPlaceholder(this.fieldIdToSubstitute);
            var value = this.getSubstitutionValueOrEmpty();
            return placeholder === value;
        };
        PlaceholderSubstitutor.prototype.getSubstitutionValueLengthOrZero = function () {
            return this.pageFormFields[this.fieldIdToSubstitute] ? this.getSubstitutionValueOrEmpty().toString().length : 0;
        };
        /**
         * Gets the value from `this` field, which could be any of a number of different types:
         *   string | number | object | string[] | object[] | maybe others...
         * @returns The value associated with `this` field.
         */
        PlaceholderSubstitutor.prototype.getFieldValue = function () {
            if (this.resolvedFormValues[this.collectionItemIndex][this.fieldIdToSubstitute]) {
                return this.resolvedFormValues[this.collectionItemIndex][this.fieldIdToSubstitute];
            }
            else {
                var fieldValue = services_1.FormValueService.getFieldValue(this.pageFormFields, this.fieldIdToSubstitute, this.collectionItemIndex);
                this.resolvedFormValues[this.collectionItemIndex][this.fieldIdToSubstitute] = fieldValue;
                return this.resolvedFormValues[this.collectionItemIndex][this.fieldIdToSubstitute];
            }
        };
        PlaceholderSubstitutor.prototype.getSubstitutionValueOrEmpty = function () {
            var fieldValue = this.getFieldValue();
            return fieldValue ? fieldValue : '';
        };
        PlaceholderSubstitutor.prototype.getNumberOfCollectionItemsIfAny = function () {
            var fieldIds = this.fieldIdToSubstitute.split('.');
            var pageFormFieldsClone = fields_utils_1.FieldsUtils.cloneObject(this.pageFormFields);
            var numberCollectionItemsAsPlaceholder = 1;
            for (var index = 0; index < fieldIds.length; index++) {
                if (fields_utils_1.FieldsUtils.isCollection(pageFormFieldsClone)) {
                    numberCollectionItemsAsPlaceholder = pageFormFieldsClone.length;
                    break;
                }
                else if (pageFormFieldsClone[fieldIds[index]] === undefined) {
                    break;
                }
                else {
                    pageFormFieldsClone = pageFormFieldsClone[fieldIds[index]];
                }
            }
            return numberCollectionItemsAsPlaceholder;
        };
        PlaceholderSubstitutor.prototype.isStartingPlaceholder = function () {
            return this.stringToResolve.charAt(this.scanIndex) === PlaceholderSubstitutor.STARTING_PLACEHOLDER;
        };
        PlaceholderSubstitutor.prototype.updateNumberOfCollectionItemsAsPlaceholder = function () {
            if (this.fieldIdToSubstitute.split('.').length > 1) {
                var newNumber = this.getNumberOfCollectionItemsIfAny();
                this.numberCollectionItemsAsPlaceholder = Math.max(newNumber, this.numberCollectionItemsAsPlaceholder);
            }
        };
        PlaceholderSubstitutor.prototype.substituteFromFormFields = function () {
            this.doSubstitution(this.getSubstitutionValueOrEmpty());
            this.resetScanIndexAfterSubstitution();
        };
        PlaceholderSubstitutor.prototype.substituteWithEmptyString = function () {
            this.doSubstitution('');
            this.scanIndex = this.startSubstitutionIndex;
        };
        PlaceholderSubstitutor.prototype.doSubstitution = function (value) {
            var placeholder = PlaceholderSubstitutor.wrapPlaceholder(this.fieldIdToSubstitute);
            var replacedString = this.stringToResolve.substring(this.startSubstitutionIndex).replace(placeholder, value);
            this.stringToResolve = this.stringToResolve.substring(0, this.startSubstitutionIndex).concat(replacedString);
        };
        PlaceholderSubstitutor.prototype.resetScanIndexAfterSubstitution = function () {
            this.scanIndex = this.startSubstitutionIndex + this.getSubstitutionValueLengthOrZero();
        };
        PlaceholderSubstitutor.PLACEHOLDER_CONTENT_PATTERN = /^[a-zA-Z0-9_.\]\[]+$/;
        PlaceholderSubstitutor.PLACEHOLDER_PATTERN = /\$\{[a-zA-Z0-9_.\]\[]+\}/;
        PlaceholderSubstitutor.STARTING_PLACEHOLDER = '$';
        PlaceholderSubstitutor.CLOSING_PLACEHOLDER = '}';
        PlaceholderSubstitutor.OPENING_PLACEHOLDER = '{';
        PlaceholderSubstitutor.NEW_LINE = "\n___\n";
        PlaceholderSubstitutor.PLACEHOLDER_START = PlaceholderSubstitutor.STARTING_PLACEHOLDER + PlaceholderSubstitutor.OPENING_PLACEHOLDER;
        PlaceholderSubstitutor.PLACEHOLDER_END = PlaceholderSubstitutor.CLOSING_PLACEHOLDER;
        return PlaceholderSubstitutor;
    }());
    PlaceholderService.PlaceholderSubstitutor = PlaceholderSubstitutor;
    ;
})(PlaceholderService = exports.PlaceholderService || (exports.PlaceholderService = {}));
exports.PlaceholderService = PlaceholderService;
//# sourceMappingURL=placeholder.service.js.map