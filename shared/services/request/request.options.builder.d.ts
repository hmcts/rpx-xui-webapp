import { OptionsType } from '..';
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
}
export declare type SearchView = 'SEARCH' | 'WORKBASKET';
