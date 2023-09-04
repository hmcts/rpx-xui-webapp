import * as i0 from "@angular/core";
export declare class PlaceholderService {
    resolvePlaceholders(pageFormFields: object, stringToResolve: string): string;
    static ɵfac: i0.ɵɵFactoryDeclaration<PlaceholderService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<PlaceholderService>;
}
export declare namespace PlaceholderService {
    class PlaceholderSubstitutor {
        private static readonly PLACEHOLDER_CONTENT_PATTERN;
        private static readonly PLACEHOLDER_PATTERN;
        private static readonly STARTING_PLACEHOLDER;
        private static readonly CLOSING_PLACEHOLDER;
        private static readonly OPENING_PLACEHOLDER;
        private static readonly NEW_LINE;
        private static readonly PLACEHOLDER_START;
        private static readonly PLACEHOLDER_END;
        private stringToResolve;
        private scanIndex;
        private numberCollectionItemsAsPlaceholder;
        private collectionItemIndex;
        private fieldIdToSubstitute;
        private startSubstitutionIndex;
        private isCollecting;
        private readonly resolvedFormValues;
        private readonly pageFormFields;
        private readonly originalStringToResolve;
        private static wrapPlaceholder;
        constructor(values: {
            stringToResolve: string;
            pageFormFields: object;
        });
        resolvePlaceholders(): string;
        private isScanningStringToResolve;
        private doesPlaceholderContainCollectionItems;
        private hasUnresolvedPlaceholder;
        private isStartPlaceholderAndNotCollecting;
        private isOpeningPlaceholder;
        private isClosingPlaceholder;
        private resetPlaceholderSubstitutor;
        private substitute;
        private appendOriginalStringIfCollectionItemAsPlaceholder;
        private setStartCollecting;
        private appendCharacter;
        private isMatchingPlaceholderPattern;
        private isFieldIdInFormFields;
        private isFieldIdToSubstituteReferringItself;
        private getSubstitutionValueLengthOrZero;
        /**
         * Gets the value from `this` field, which could be any of a number of different types:
         *   string | number | object | string[] | object[] | maybe others...
         * @returns The value associated with `this` field.
         */
        private getFieldValue;
        private getSubstitutionValueOrEmpty;
        private getNumberOfCollectionItemsIfAny;
        private isStartingPlaceholder;
        private updateNumberOfCollectionItemsAsPlaceholder;
        private substituteFromFormFields;
        private substituteWithEmptyString;
        private doSubstitution;
        private resetScanIndexAfterSubstitution;
    }
}
//# sourceMappingURL=placeholder.service.d.ts.map