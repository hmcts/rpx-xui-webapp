import { OptionsType } from '..';
import * as i0 from "@angular/core";
export declare class RequestOptionsBuilder {
    static readonly FIELD_PREFIX = "case.";
    /**
     * Assess the value to see if it should be included in the request options.
     * If it's null or an "empty" string, it shouldn't be.
     *
     * @param value The value to be assessed.
     */
    private static includeParam;
    buildOptions(metaCriteria: object, caseCriteria: object, view?: SearchView): OptionsType;
    static ɵfac: i0.ɵɵFactoryDeclaration<RequestOptionsBuilder, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<RequestOptionsBuilder>;
}
export declare type SearchView = 'SEARCH' | 'WORKBASKET';
//# sourceMappingURL=request.options.builder.d.ts.map