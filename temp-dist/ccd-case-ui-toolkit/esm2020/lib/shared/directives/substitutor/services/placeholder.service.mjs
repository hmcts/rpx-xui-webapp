import { Injectable } from '@angular/core';
import { FieldsUtils } from '../../../services/fields/fields.utils';
import { FormValueService } from '../../../services/form/form-value.service';
import * as i0 from "@angular/core";
// @dynamic
export class PlaceholderService {
    resolvePlaceholders(pageFormFields, stringToResolve) {
        const ps = new PlaceholderService.PlaceholderSubstitutor({ pageFormFields, stringToResolve });
        return ps.resolvePlaceholders();
    }
}
PlaceholderService.ɵfac = function PlaceholderService_Factory(t) { return new (t || PlaceholderService)(); };
PlaceholderService.ɵprov = /*@__PURE__*/ i0.ɵɵdefineInjectable({ token: PlaceholderService, factory: PlaceholderService.ɵfac });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(PlaceholderService, [{
        type: Injectable
    }], null, null); })();
(function (PlaceholderService) {
    class PlaceholderSubstitutor {
        constructor(values) {
            this.resolvedFormValues = [];
            this.stringToResolve = values.stringToResolve;
            this.originalStringToResolve = values.stringToResolve;
            this.pageFormFields = values.pageFormFields;
        }
        static wrapPlaceholder(str) {
            return `${this.PLACEHOLDER_START}${str}${this.PLACEHOLDER_END}`;
        }
        resolvePlaceholders() {
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
        }
        isScanningStringToResolve() {
            return this.scanIndex < this.stringToResolve.length;
        }
        doesPlaceholderContainCollectionItems() {
            return this.numberCollectionItemsAsPlaceholder-- > 0;
        }
        hasUnresolvedPlaceholder() {
            return this.stringToResolve
                && typeof this.stringToResolve === 'string'
                && !!this.stringToResolve.match(PlaceholderSubstitutor.PLACEHOLDER_PATTERN);
        }
        isStartPlaceholderAndNotCollecting() {
            return this.isStartingPlaceholder() && !this.isCollecting;
        }
        isOpeningPlaceholder() {
            return this.stringToResolve.charAt(this.scanIndex) === PlaceholderSubstitutor.OPENING_PLACEHOLDER;
        }
        isClosingPlaceholder() {
            return this.stringToResolve.charAt(this.scanIndex) === PlaceholderSubstitutor.CLOSING_PLACEHOLDER;
        }
        resetPlaceholderSubstitutor() {
            this.scanIndex = 0;
            this.numberCollectionItemsAsPlaceholder = 1;
            this.collectionItemIndex = 0;
            this.fieldIdToSubstitute = '';
            this.startSubstitutionIndex = -1;
            this.isCollecting = false;
            this.resolvedFormValues[this.collectionItemIndex] = {};
        }
        substitute() {
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
        }
        appendOriginalStringIfCollectionItemAsPlaceholder() {
            if (this.collectionItemIndex < this.numberCollectionItemsAsPlaceholder - 1) {
                this.stringToResolve += PlaceholderSubstitutor.NEW_LINE + this.originalStringToResolve;
                this.collectionItemIndex += 1;
                this.resolvedFormValues[this.collectionItemIndex] = {};
            }
        }
        setStartCollecting() {
            this.isCollecting = true;
            this.startSubstitutionIndex = this.scanIndex;
        }
        appendCharacter() {
            this.fieldIdToSubstitute += this.stringToResolve.charAt(this.scanIndex);
        }
        isMatchingPlaceholderPattern() {
            return !!this.fieldIdToSubstitute.match(PlaceholderSubstitutor.PLACEHOLDER_CONTENT_PATTERN);
        }
        isFieldIdInFormFields() {
            return this.getFieldValue() !== undefined;
        }
        isFieldIdToSubstituteReferringItself() {
            const placeholder = PlaceholderSubstitutor.wrapPlaceholder(this.fieldIdToSubstitute);
            const value = this.getSubstitutionValueOrEmpty();
            return placeholder === value;
        }
        getSubstitutionValueLengthOrZero() {
            return this.pageFormFields[this.fieldIdToSubstitute] ? this.getSubstitutionValueOrEmpty().toString().length : 0;
        }
        /**
         * Gets the value from `this` field, which could be any of a number of different types:
         *   string | number | object | string[] | object[] | maybe others...
         * @returns The value associated with `this` field.
         */
        getFieldValue() {
            if (this.resolvedFormValues[this.collectionItemIndex][this.fieldIdToSubstitute]) {
                return this.resolvedFormValues[this.collectionItemIndex][this.fieldIdToSubstitute];
            }
            else {
                const fieldValue = FormValueService.getFieldValue(this.pageFormFields, this.fieldIdToSubstitute, this.collectionItemIndex);
                this.resolvedFormValues[this.collectionItemIndex][this.fieldIdToSubstitute] = fieldValue;
                return this.resolvedFormValues[this.collectionItemIndex][this.fieldIdToSubstitute];
            }
        }
        getSubstitutionValueOrEmpty() {
            const fieldValue = this.getFieldValue();
            return fieldValue ? fieldValue : '';
        }
        getNumberOfCollectionItemsIfAny() {
            const fieldIds = this.fieldIdToSubstitute.split('.');
            let pageFormFieldsClone = FieldsUtils.cloneObject(this.pageFormFields);
            let numberCollectionItemsAsPlaceholder = 1;
            // tslint:disable-next-line
            for (let index = 0; index < fieldIds.length; index++) {
                if (FieldsUtils.isCollection(pageFormFieldsClone)) {
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
        }
        isStartingPlaceholder() {
            return this.stringToResolve.charAt(this.scanIndex) === PlaceholderSubstitutor.STARTING_PLACEHOLDER;
        }
        updateNumberOfCollectionItemsAsPlaceholder() {
            if (this.fieldIdToSubstitute.split('.').length > 1) {
                const newNumber = this.getNumberOfCollectionItemsIfAny();
                this.numberCollectionItemsAsPlaceholder = Math.max(newNumber, this.numberCollectionItemsAsPlaceholder);
            }
        }
        substituteFromFormFields() {
            this.doSubstitution(this.getSubstitutionValueOrEmpty());
            this.resetScanIndexAfterSubstitution();
        }
        substituteWithEmptyString() {
            this.doSubstitution('');
            this.scanIndex = this.startSubstitutionIndex;
        }
        doSubstitution(value) {
            const placeholder = PlaceholderSubstitutor.wrapPlaceholder(this.fieldIdToSubstitute);
            const replacedString = this.stringToResolve.substring(this.startSubstitutionIndex).replace(placeholder, value);
            this.stringToResolve = this.stringToResolve.substring(0, this.startSubstitutionIndex).concat(replacedString);
        }
        resetScanIndexAfterSubstitution() {
            this.scanIndex = this.startSubstitutionIndex + this.getSubstitutionValueLengthOrZero();
        }
    }
    PlaceholderSubstitutor.PLACEHOLDER_CONTENT_PATTERN = /^[a-zA-Z0-9_.\]\[]+$/;
    PlaceholderSubstitutor.PLACEHOLDER_PATTERN = /\$\{[a-zA-Z0-9_.\]\[]+\}/;
    PlaceholderSubstitutor.STARTING_PLACEHOLDER = '$';
    PlaceholderSubstitutor.CLOSING_PLACEHOLDER = '}';
    PlaceholderSubstitutor.OPENING_PLACEHOLDER = '{';
    PlaceholderSubstitutor.NEW_LINE = `
___
`;
    PlaceholderSubstitutor.PLACEHOLDER_START = PlaceholderSubstitutor.STARTING_PLACEHOLDER + PlaceholderSubstitutor.OPENING_PLACEHOLDER;
    PlaceholderSubstitutor.PLACEHOLDER_END = PlaceholderSubstitutor.CLOSING_PLACEHOLDER;
    PlaceholderService.PlaceholderSubstitutor = PlaceholderSubstitutor;
})(PlaceholderService || (PlaceholderService = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGxhY2Vob2xkZXIuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2NjZC1jYXNlLXVpLXRvb2xraXQvc3JjL2xpYi9zaGFyZWQvZGlyZWN0aXZlcy9zdWJzdGl0dXRvci9zZXJ2aWNlcy9wbGFjZWhvbGRlci5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFM0MsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLHVDQUF1QyxDQUFDO0FBQ3BFLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLDJDQUEyQyxDQUFDOztBQUU3RSxXQUFXO0FBRVgsTUFBTSxPQUFPLGtCQUFrQjtJQUVwQixtQkFBbUIsQ0FBQyxjQUFzQixFQUFFLGVBQXVCO1FBQ3RFLE1BQU0sRUFBRSxHQUFHLElBQUksa0JBQWtCLENBQUMsc0JBQXNCLENBQUMsRUFBQyxjQUFjLEVBQUUsZUFBZSxFQUFDLENBQUMsQ0FBQztRQUM1RixPQUFPLEVBQUUsQ0FBQyxtQkFBbUIsRUFBRSxDQUFDO0lBQ3BDLENBQUM7O29GQUxRLGtCQUFrQjt3RUFBbEIsa0JBQWtCLFdBQWxCLGtCQUFrQjt1RkFBbEIsa0JBQWtCO2NBRDlCLFVBQVU7O0FBVVgsV0FBaUIsa0JBQWtCO0lBQy9CLE1BQWEsc0JBQXNCO1FBNkIvQixZQUFZLE1BQTJEO1lBUnRELHVCQUFrQixHQUFHLEVBQUUsQ0FBQztZQVNyQyxJQUFJLENBQUMsZUFBZSxHQUFHLE1BQU0sQ0FBQyxlQUFlLENBQUM7WUFDOUMsSUFBSSxDQUFDLHVCQUF1QixHQUFHLE1BQU0sQ0FBQyxlQUFlLENBQUM7WUFDdEQsSUFBSSxDQUFDLGNBQWMsR0FBRyxNQUFNLENBQUMsY0FBYyxDQUFDO1FBQ2hELENBQUM7UUFSTyxNQUFNLENBQUMsZUFBZSxDQUFDLEdBQVc7WUFDdEMsT0FBTyxHQUFHLElB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bUIsQ0FBQztJQUNyRSxzQ0FBZSxHQUFHLHNCQUFzQixDQUFDLG1CQUFtQixDQUFDO0lBWjVFLHlDQUFzQix5QkFvTmxDLENBQUE7QUFDTCxDQUFDLEVBdE5nQixrQkFBa0IsS0FBbEIsa0JBQWtCLFFBc05sQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHsgRmllbGRzVXRpbHMgfSBmcm9tICcuLi8uLi8uLi9zZXJ2aWNlcy9maWVsZHMvZmllbGRzLnV0aWxzJztcbmltcG9ydCB7IEZvcm1WYWx1ZVNlcnZpY2UgfSBmcm9tICcuLi8uLi8uLi9zZXJ2aWNlcy9mb3JtL2Zvcm0tdmFsdWUuc2VydmljZSc7XG5cbi8vIEBkeW5hbWljXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgUGxhY2Vob2xkZXJTZXJ2aWNlIHtcblxuICAgIHB1YmxpYyByZXNvbHZlUGxhY2Vob2xkZXJzKHBhZ2VGb3JtRmllbGRzOiBvYmplY3QsIHN0cmluZ1RvUmVzb2x2ZTogc3RyaW5nKTogc3RyaW5nIHtcbiAgICAgICAgY29uc3QgcHMgPSBuZXcgUGxhY2Vob2xkZXJTZXJ2aWNlLlBsYWNlaG9sZGVyU3Vic3RpdHV0b3Ioe3BhZ2VGb3JtRmllbGRzLCBzdHJpbmdUb1Jlc29sdmV9KTtcbiAgICAgICAgcmV0dXJuIHBzLnJlc29sdmVQbGFjZWhvbGRlcnMoKTtcbiAgICB9XG5cbn1cblxuZXhwb3J0IG5hbWVzcGFjZSBQbGFjZWhvbGRlclNlcnZpY2Uge1xuICAgIGV4cG9ydCBjbGFzcyBQbGFjZWhvbGRlclN1YnN0aXR1dG9yIHtcbiAgICAgICAgcHJpdmF0ZSBzdGF0aWMgcmVhZG9ubHkgUExBQ0VIT0xERVJfQ09OVEVOVF9QQVRURVJOID0gL15bYS16QS1aMC05Xy5cXF1cXFtdKyQvO1xuICAgICAgICBwcml2YXRlIHN0YXRpYyByZWFkb25seSBQTEFDRUhPTERFUl9QQVRURVJOID0gL1xcJFxce1thLXpBLVowLTlfLlxcXVxcW10rXFx9LztcbiAgICAgICAgcHJpdmF0ZSBzdGF0aWMgcmVhZG9ubHkgU1RBUlRJTkdfUExBQ0VIT0xERVIgPSAnJCc7XG4gICAgICAgIHByaXZhdGUgc3RhdGljIHJlYWRvbmx5IENMT1NJTkdfUExBQ0VIT0xERVIgPSAnfSc7XG4gICAgICAgIHByaXZhdGUgc3RhdGljIHJlYWRvbmx5IE9QRU5JTkdfUExBQ0VIT0xERVIgPSAneyc7XG4gICAgICAgIHByaXZhdGUgc3RhdGljIHJlYWRvbmx5IE5FV19MSU5FID0gYFxuX19fXG5gO1xuXG4gICAgICAgIHByaXZhdGUgc3RhdGljIHJlYWRvbmx5IFBMQUNFSE9MREVSX1NUQVJUID1cbiAgICAgICAgICAgIFBsYWNlaG9sZGVyU3Vic3RpdHV0b3IuU1RBUlRJTkdfUExBQ0VIT0xERVIgKyBQbGFjZWhvbGRlclN1YnN0aXR1dG9yLk9QRU5JTkdfUExBQ0VIT0xERVI7XG4gICAgICAgIHByaXZhdGUgc3RhdGljIHJlYWRvbmx5IFBMQUNFSE9MREVSX0VORCA9IFBsYWNlaG9sZGVyU3Vic3RpdHV0b3IuQ0xPU0lOR19QTEFDRUhPTERFUjtcblxuICAgICAgICBwcml2YXRlIHN0cmluZ1RvUmVzb2x2ZTogc3RyaW5nO1xuICAgICAgICBwcml2YXRlIHNjYW5JbmRleDogbnVtYmVyO1xuICAgICAgICBwcml2YXRlIG51bWJlckNvbGxlY3Rpb25JdGVtc0FzUGxhY2Vob2xkZXI6IG51bWJlcjtcbiAgICAgICAgcHJpdmF0ZSBjb2xsZWN0aW9uSXRlbUluZGV4OiBudW1iZXI7XG4gICAgICAgIHByaXZhdGUgZmllbGRJZFRvU3Vic3RpdHV0ZTogc3RyaW5nO1xuICAgICAgICBwcml2YXRlIHN0YXJ0U3Vic3RpdHV0aW9uSW5kZXg6IG51bWJlcjtcbiAgICAgICAgcHJpdmF0ZSBpc0NvbGxlY3Rpbmc6IGJvb2xlYW47XG4gICAgICAgIHByaXZhdGUgcmVhZG9ubHkgcmVzb2x2ZWRGb3JtVmFsdWVzID0gW107XG4gICAgICAgIHByaXZhdGUgcmVhZG9ubHkgcGFnZUZvcm1GaWVsZHM6IG9iamVjdDtcbiAgICAgICAgcHJpdmF0ZSByZWFkb25seSBvcmlnaW5hbFN0cmluZ1RvUmVzb2x2ZTogc3RyaW5nO1xuXG4gICAgICAgIHByaXZhdGUgc3RhdGljIHdyYXBQbGFjZWhvbGRlcihzdHI6IHN0cmluZyk6IHN0cmluZyB7XG4gICAgICAgICAgICByZXR1cm4gYCR7dGhpcy5QTEFDRUhPTERFUl9TVEFSVH0ke3N0cn0ke3RoaXMuUExBQ0VIT0xERVJfRU5EfWA7XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdHJ1Y3Rvcih2YWx1ZXM6IHsgc3RyaW5nVG9SZXNvbHZlOiBzdHJpbmcsIHBhZ2VGb3JtRmllbGRzOiBvYmplY3QgfSkge1xuICAgICAgICAgICAgdGhpcy5zdHJpbmdUb1Jlc29sdmUgPSB2YWx1ZXMuc3RyaW5nVG9SZXNvbHZlO1xuICAgICAgICAgICAgdGhpcy5vcmlnaW5hbFN0cmluZ1RvUmVzb2x2ZSA9IHZhbHVlcy5zdHJpbmdUb1Jlc29sdmU7XG4gICAgICAgICAgICB0aGlzLnBhZ2VGb3JtRmllbGRzID0gdmFsdWVzLnBhZ2VGb3JtRmllbGRzO1xuICAgICAgICB9XG5cbiAgICAgICAgcHVibGljIHJlc29sdmVQbGFjZWhvbGRlcnMoKTogc3RyaW5nIHtcbiAgICAgICAgICAgIHdoaWxlICh0aGlzLmhhc1VucmVzb2x2ZWRQbGFjZWhvbGRlcigpKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5yZXNldFBsYWNlaG9sZGVyU3Vic3RpdHV0b3IoKTtcbiAgICAgICAgICAgICAgICB3aGlsZSAodGhpcy5kb2VzUGxhY2Vob2xkZXJDb250YWluQ29sbGVjdGlvbkl0ZW1zKCkpIHtcbiAgICAgICAgICAgICAgICAgICAgd2hpbGUgKHRoaXMuaXNTY2FubmluZ1N0cmluZ1RvUmVzb2x2ZSgpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5pc1N0YXJ0UGxhY2Vob2xkZXJBbmROb3RDb2xsZWN0aW5nKCkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNldFN0YXJ0Q29sbGVjdGluZygpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmICh0aGlzLmlzQ29sbGVjdGluZykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLmlzQ2xvc2luZ1BsYWNlaG9sZGVyKCkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zdWJzdGl0dXRlKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmICghdGhpcy5pc09wZW5pbmdQbGFjZWhvbGRlcigpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuYXBwZW5kQ2hhcmFjdGVyKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zY2FuSW5kZXgrKztcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB0aGlzLmFwcGVuZE9yaWdpbmFsU3RyaW5nSWZDb2xsZWN0aW9uSXRlbUFzUGxhY2Vob2xkZXIoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5zdHJpbmdUb1Jlc29sdmU7XG4gICAgICAgIH1cblxuICAgICAgICBwcml2YXRlIGlzU2Nhbm5pbmdTdHJpbmdUb1Jlc29sdmUoKTogYm9vbGVhbiB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5zY2FuSW5kZXggPCB0aGlzLnN0cmluZ1RvUmVzb2x2ZS5sZW5ndGg7XG4gICAgICAgIH1cblxuICAgICAgICBwcml2YXRlIGRvZXNQbGFjZWhvbGRlckNvbnRhaW5Db2xsZWN0aW9uSXRlbXMoKTogYm9vbGVhbiB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5udW1iZXJDb2xsZWN0aW9uSXRlbXNBc1BsYWNlaG9sZGVyLS0gPiAwO1xuICAgICAgICB9XG5cbiAgICAgICAgcHJpdmF0ZSBoYXNVbnJlc29sdmVkUGxhY2Vob2xkZXIoKTogYm9vbGVhbiB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5zdHJpbmdUb1Jlc29sdmVcbiAgICAgICAgICAgICAgICAmJiB0eXBlb2YgdGhpcy5zdHJpbmdUb1Jlc29sdmUgPT09ICdzdHJpbmcnXG4gICAgICAgICAgICAgICAgJiYgISF0aGlzLnN0cmluZ1RvUmVzb2x2ZS5tYXRjaChQbGFjZWhvbGRlclN1YnN0aXR1dG9yLlBMQUNFSE9MREVSX1BBVFRFUk4pO1xuICAgICAgICB9XG5cbiAgICAgICAgcHJpdmF0ZSBpc1N0YXJ0UGxhY2Vob2xkZXJBbmROb3RDb2xsZWN0aW5nKCk6IGJvb2xlYW4ge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuaXNTdGFydGluZ1BsYWNlaG9sZGVyKCkgJiYgIXRoaXMuaXNDb2xsZWN0aW5nO1xuICAgICAgICB9XG5cbiAgICAgICAgcHJpdmF0ZSBpc09wZW5pbmdQbGFjZWhvbGRlcigpOiBib29sZWFuIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnN0cmluZ1RvUmVzb2x2ZS5jaGFyQXQodGhpcy5zY2FuSW5kZXgpID09PSBQbGFjZWhvbGRlclN1YnN0aXR1dG9yLk9QRU5JTkdfUExBQ0VIT0xERVI7XG4gICAgICAgIH1cblxuICAgICAgICBwcml2YXRlIGlzQ2xvc2luZ1BsYWNlaG9sZGVyKCk6IGJvb2xlYW4ge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuc3RyaW5nVG9SZXNvbHZlLmNoYXJBdCh0aGlzLnNjYW5JbmRleCkgPT09IFBsYWNlaG9sZGVyU3Vic3RpdHV0b3IuQ0xPU0lOR19QTEFDRUhPTERFUjtcbiAgICAgICAgfVxuXG4gICAgICAgIHByaXZhdGUgcmVzZXRQbGFjZWhvbGRlclN1YnN0aXR1dG9yKCk6IHZvaWQge1xuICAgICAgICAgICAgdGhpcy5zY2FuSW5kZXggPSAwO1xuICAgICAgICAgICAgdGhpcy5udW1iZXJDb2xsZWN0aW9uSXRlbXNBc1BsYWNlaG9sZGVyID0gMTtcbiAgICAgICAgICAgIHRoaXMuY29sbGVjdGlvbkl0ZW1JbmRleCA9IDA7XG4gICAgICAgICAgICB0aGlzLmZpZWxkSWRUb1N1YnN0aXR1dGUgPSAnJztcbiAgICAgICAgICAgIHRoaXMuc3RhcnRTdWJzdGl0dXRpb25JbmRleCA9IC0xO1xuICAgICAgICAgICAgdGhpcy5pc0NvbGxlY3RpbmcgPSBmYWxzZTtcbiAgICAgICAgICAgIHRoaXMucmVzb2x2ZWRGb3JtVmFsdWVzW3RoaXMuY29sbGVjdGlvbkl0ZW1JbmRleF0gPSB7fTtcbiAgICAgICAgfVxuXG4gICAgICAgIHByaXZhdGUgc3Vic3RpdHV0ZSgpOiB2b2lkIHtcbiAgICAgICAgICAgIGlmICh0aGlzLmlzTWF0Y2hpbmdQbGFjZWhvbGRlclBhdHRlcm4oKSAmJiB0aGlzLmlzRmllbGRJZEluRm9ybUZpZWxkcygpKSB7XG4gICAgICAgICAgICAgICAgdGhpcy51cGRhdGVOdW1iZXJPZkNvbGxlY3Rpb25JdGVtc0FzUGxhY2Vob2xkZXIoKTtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5pc0ZpZWxkSWRUb1N1YnN0aXR1dGVSZWZlcnJpbmdJdHNlbGYoKSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnN1YnN0aXR1dGVXaXRoRW1wdHlTdHJpbmcoKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnN1YnN0aXR1dGVGcm9tRm9ybUZpZWxkcygpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zdWJzdGl0dXRlV2l0aEVtcHR5U3RyaW5nKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLmlzQ29sbGVjdGluZyA9IGZhbHNlO1xuICAgICAgICAgICAgdGhpcy5maWVsZElkVG9TdWJzdGl0dXRlID0gJyc7XG4gICAgICAgIH1cblxuICAgICAgICBwcml2YXRlIGFwcGVuZE9yaWdpbmFsU3RyaW5nSWZDb2xsZWN0aW9uSXRlbUFzUGxhY2Vob2xkZXIoKTogdm9pZCB7XG4gICAgICAgICAgICBpZiAodGhpcy5jb2xsZWN0aW9uSXRlbUluZGV4IDwgdGhpcy5udW1iZXJDb2xsZWN0aW9uSXRlbXNBc1BsYWNlaG9sZGVyIC0gMSkge1xuICAgICAgICAgICAgICAgIHRoaXMuc3RyaW5nVG9SZXNvbHZlICs9IFBsYWNlaG9sZGVyU3Vic3RpdHV0b3IuTkVXX0xJTkUgKyB0aGlzLm9yaWdpbmFsU3RyaW5nVG9SZXNvbHZlO1xuICAgICAgICAgICAgICAgIHRoaXMuY29sbGVjdGlvbkl0ZW1JbmRleCArPSAxO1xuICAgICAgICAgICAgICAgIHRoaXMucmVzb2x2ZWRGb3JtVmFsdWVzW3RoaXMuY29sbGVjdGlvbkl0ZW1JbmRleF0gPSB7fTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHByaXZhdGUgc2V0U3RhcnRDb2xsZWN0aW5nKCk6IHZvaWQge1xuICAgICAgICAgICAgdGhpcy5pc0NvbGxlY3RpbmcgPSB0cnVlO1xuICAgICAgICAgICAgdGhpcy5zdGFydFN1YnN0aXR1dGlvbkluZGV4ID0gdGhpcy5zY2FuSW5kZXg7XG4gICAgICAgIH1cblxuICAgICAgICBwcml2YXRlIGFwcGVuZENoYXJhY3RlcigpOiB2b2lkIHtcbiAgICAgICAgICAgIHRoaXMuZmllbGRJZFRvU3Vic3RpdHV0ZSArPSB0aGlzLnN0cmluZ1RvUmVzb2x2ZS5jaGFyQXQodGhpcy5zY2FuSW5kZXgpO1xuICAgICAgICB9XG5cbiAgICAgICAgcHJpdmF0ZSBpc01hdGNoaW5nUGxhY2Vob2xkZXJQYXR0ZXJuKCk6IGJvb2xlYW4ge1xuICAgICAgICAgICAgcmV0dXJuICEhdGhpcy5maWVsZElkVG9TdWJzdGl0dXRlLm1hdGNoKFBsYWNlaG9sZGVyU3Vic3RpdHV0b3IuUExBQ0VIT0xERVJfQ09OVEVOVF9QQVRURVJOKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHByaXZhdGUgaXNGaWVsZElkSW5Gb3JtRmllbGRzKCk6IGJvb2xlYW4ge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZ2V0RmllbGRWYWx1ZSgpICE9PSB1bmRlZmluZWQ7XG4gICAgICAgIH1cblxuICAgICAgICBwcml2YXRlIGlzRmllbGRJZFRvU3Vic3RpdHV0ZVJlZmVycmluZ0l0c2VsZigpOiBib29sZWFuIHtcbiAgICAgICAgICAgIGNvbnN0IHBsYWNlaG9sZGVyID0gUGxhY2Vob2xkZXJTdWJzdGl0dXRvci53cmFwUGxhY2Vob2xkZXIodGhpcy5maWVsZElkVG9TdWJzdGl0dXRlKTtcbiAgICAgICAgICAgIGNvbnN0IHZhbHVlID0gdGhpcy5nZXRTdWJzdGl0dXRpb25WYWx1ZU9yRW1wdHkoKTtcbiAgICAgICAgICAgIHJldHVybiBwbGFjZWhvbGRlciA9PT0gdmFsdWU7XG4gICAgICAgIH1cblxuICAgICAgICBwcml2YXRlIGdldFN1YnN0aXR1dGlvblZhbHVlTGVuZ3RoT3JaZXJvKCk6IG51bWJlciB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5wYWdlRm9ybUZpZWxkc1t0aGlzLmZpZWxkSWRUb1N1YnN0aXR1dGVdID8gdGhpcy5nZXRTdWJzdGl0dXRpb25WYWx1ZU9yRW1wdHkoKS50b1N0cmluZygpLmxlbmd0aCA6IDA7XG4gICAgICAgIH1cblxuICAgICAgICAvKipcbiAgICAgICAgICogR2V0cyB0aGUgdmFsdWUgZnJvbSBgdGhpc2AgZmllbGQsIHdoaWNoIGNvdWxkIGJlIGFueSBvZiBhIG51bWJlciBvZiBkaWZmZXJlbnQgdHlwZXM6XG4gICAgICAgICAqICAgc3RyaW5nIHwgbnVtYmVyIHwgb2JqZWN0IHwgc3RyaW5nW10gfCBvYmplY3RbXSB8IG1heWJlIG90aGVycy4uLlxuICAgICAgICAgKiBAcmV0dXJucyBUaGUgdmFsdWUgYXNzb2NpYXRlZCB3aXRoIGB0aGlzYCBmaWVsZC5cbiAgICAgICAgICovXG4gICAgICAgIHByaXZhdGUgZ2V0RmllbGRWYWx1ZSgpOiBhbnkge1xuICAgICAgICAgICAgaWYgKHRoaXMucmVzb2x2ZWRGb3JtVmFsdWVzW3RoaXMuY29sbGVjdGlvbkl0ZW1JbmRleF1bdGhpcy5maWVsZElkVG9TdWJzdGl0dXRlXSkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLnJlc29sdmVkRm9ybVZhbHVlc1t0aGlzLmNvbGxlY3Rpb25JdGVtSW5kZXhdW3RoaXMuZmllbGRJZFRvU3Vic3RpdHV0ZV07XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGNvbnN0IGZpZWxkVmFsdWUgPSBGb3JtVmFsdWVTZXJ2aWNlLmdldEZpZWxkVmFsdWUodGhpcy5wYWdlRm9ybUZpZWxkcywgdGhpcy5maWVsZElkVG9TdWJzdGl0dXRlLCB0aGlzLmNvbGxlY3Rpb25JdGVtSW5kZXgpO1xuICAgICAgICAgICAgICAgIHRoaXMucmVzb2x2ZWRGb3JtVmFsdWVzW3RoaXMuY29sbGVjdGlvbkl0ZW1JbmRleF1bdGhpcy5maWVsZElkVG9TdWJzdGl0dXRlXSA9IGZpZWxkVmFsdWU7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMucmVzb2x2ZWRGb3JtVmFsdWVzW3RoaXMuY29sbGVjdGlvbkl0ZW1JbmRleF1bdGhpcy5maWVsZElkVG9TdWJzdGl0dXRlXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHByaXZhdGUgZ2V0U3Vic3RpdHV0aW9uVmFsdWVPckVtcHR5KCk6IHN0cmluZyB7XG4gICAgICAgICAgICBjb25zdCBmaWVsZFZhbHVlID0gdGhpcy5nZXRGaWVsZFZhbHVlKCk7XG4gICAgICAgICAgICByZXR1cm4gZmllbGRWYWx1ZSA/IGZpZWxkVmFsdWUgOiAnJztcbiAgICAgICAgfVxuXG4gICAgICAgIHByaXZhdGUgZ2V0TnVtYmVyT2ZDb2xsZWN0aW9uSXRlbXNJZkFueSgpOiBudW1iZXIge1xuICAgICAgICAgICAgY29uc3QgZmllbGRJZHMgPSB0aGlzLmZpZWxkSWRUb1N1YnN0aXR1dGUuc3BsaXQoJy4nKTtcbiAgICAgICAgICAgIGxldCBwYWdlRm9ybUZpZWxkc0Nsb25lID0gRmllbGRzVXRpbHMuY2xvbmVPYmplY3QodGhpcy5wYWdlRm9ybUZpZWxkcyk7XG4gICAgICAgICAgICBsZXQgbnVtYmVyQ29sbGVjdGlvbkl0ZW1zQXNQbGFjZWhvbGRlciA9IDE7XG5cbiAgICAgICAgICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZVxuICAgICAgICAgICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IGZpZWxkSWRzLmxlbmd0aDsgaW5kZXgrKykge1xuICAgICAgICAgICAgICAgIGlmIChGaWVsZHNVdGlscy5pc0NvbGxlY3Rpb24ocGFnZUZvcm1GaWVsZHNDbG9uZSkpIHtcbiAgICAgICAgICAgICAgICAgICAgbnVtYmVyQ29sbGVjdGlvbkl0ZW1zQXNQbGFjZWhvbGRlciA9IHBhZ2VGb3JtRmllbGRzQ2xvbmUubGVuZ3RoO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHBhZ2VGb3JtRmllbGRzQ2xvbmVbZmllbGRJZHNbaW5kZXhdXSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHBhZ2VGb3JtRmllbGRzQ2xvbmUgPSBwYWdlRm9ybUZpZWxkc0Nsb25lW2ZpZWxkSWRzW2luZGV4XV07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIG51bWJlckNvbGxlY3Rpb25JdGVtc0FzUGxhY2Vob2xkZXI7XG4gICAgICAgIH1cblxuICAgICAgICBwcml2YXRlIGlzU3RhcnRpbmdQbGFjZWhvbGRlcigpOiBib29sZWFuIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnN0cmluZ1RvUmVzb2x2ZS5jaGFyQXQodGhpcy5zY2FuSW5kZXgpID09PSBQbGFjZWhvbGRlclN1YnN0aXR1dG9yLlNUQVJUSU5HX1BMQUNFSE9MREVSO1xuICAgICAgICB9XG5cbiAgICAgICAgcHJpdmF0ZSB1cGRhdGVOdW1iZXJPZkNvbGxlY3Rpb25JdGVtc0FzUGxhY2Vob2xkZXIoKTogdm9pZCB7XG4gICAgICAgICAgICBpZiAodGhpcy5maWVsZElkVG9TdWJzdGl0dXRlLnNwbGl0KCcuJykubGVuZ3RoID4gMSkge1xuICAgICAgICAgICAgICAgIGNvbnN0IG5ld051bWJlciA9IHRoaXMuZ2V0TnVtYmVyT2ZDb2xsZWN0aW9uSXRlbXNJZkFueSgpO1xuICAgICAgICAgICAgICAgIHRoaXMubnVtYmVyQ29sbGVjdGlvbkl0ZW1zQXNQbGFjZWhvbGRlciA9IE1hdGgubWF4KG5ld051bWJlciwgdGhpcy5udW1iZXJDb2xsZWN0aW9uSXRlbXNBc1BsYWNlaG9sZGVyKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHByaXZhdGUgc3Vic3RpdHV0ZUZyb21Gb3JtRmllbGRzKCk6IHZvaWQge1xuICAgICAgICAgICAgdGhpcy5kb1N1YnN0aXR1dGlvbih0aGlzLmdldFN1YnN0aXR1dGlvblZhbHVlT3JFbXB0eSgpKTtcbiAgICAgICAgICAgIHRoaXMucmVzZXRTY2FuSW5kZXhBZnRlclN1YnN0aXR1dGlvbigpO1xuICAgICAgICB9XG5cbiAgICAgICAgcHJpdmF0ZSBzdWJzdGl0dXRlV2l0aEVtcHR5U3RyaW5nKCk6IHZvaWQge1xuICAgICAgICAgICAgdGhpcy5kb1N1YnN0aXR1dGlvbignJyk7XG4gICAgICAgICAgICB0aGlzLnNjYW5JbmRleCA9IHRoaXMuc3RhcnRTdWJzdGl0dXRpb25JbmRleDtcbiAgICAgICAgfVxuXG4gICAgICAgIHByaXZhdGUgZG9TdWJzdGl0dXRpb24odmFsdWU6IHN0cmluZyk6IHZvaWQge1xuICAgICAgICAgICAgY29uc3QgcGxhY2Vob2xkZXIgPSBQbGFjZWhvbGRlclN1YnN0aXR1dG9yLndyYXBQbGFjZWhvbGRlcih0aGlzLmZpZWxkSWRUb1N1YnN0aXR1dGUpO1xuICAgICAgICAgICAgY29uc3QgcmVwbGFjZWRTdHJpbmcgPSB0aGlzLnN0cmluZ1RvUmVzb2x2ZS5zdWJzdHJpbmcodGhpcy5zdGFydFN1YnN0aXR1dGlvbkluZGV4KS5yZXBsYWNlKHBsYWNlaG9sZGVyLCB2YWx1ZSk7XG4gICAgICAgICAgICB0aGlzLnN0cmluZ1RvUmVzb2x2ZSA9IHRoaXMuc3RyaW5nVG9SZXNvbHZlLnN1YnN0cmluZygwLCB0aGlzLnN0YXJ0U3Vic3RpdHV0aW9uSW5kZXgpLmNvbmNhdChyZXBsYWNlZFN0cmluZyk7XG4gICAgICAgIH1cblxuICAgICAgICBwcml2YXRlIHJlc2V0U2NhbkluZGV4QWZ0ZXJTdWJzdGl0dXRpb24oKTogdm9pZCB7XG4gICAgICAgICAgICB0aGlzLnNjYW5JbmRleCA9IHRoaXMuc3RhcnRTdWJzdGl0dXRpb25JbmRleCArIHRoaXMuZ2V0U3Vic3RpdHV0aW9uVmFsdWVMZW5ndGhPclplcm8oKTtcbiAgICAgICAgfVxuICAgIH1cbn1cbiJdfQ==