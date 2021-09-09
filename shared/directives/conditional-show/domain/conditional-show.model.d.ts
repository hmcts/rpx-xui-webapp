import { CaseField } from '../../../domain/definition/case-field.model';
export declare class ShowCondition {
    condition: string;
    private static readonly AND_CONDITION_REGEXP;
    private static readonly OR_CONDITION_REGEXP;
    private static readonly CONDITION_NOT_EQUALS;
    private static readonly CONDITION_EQUALS;
    private static readonly CONTAINS;
    private static instanceCache;
    private orConditions;
    private andConditions;
    static addPathPrefixToCondition(showCondition: string, pathPrefix: string): string;
    private static extractConditions;
    static getInstance(condition: string): ShowCondition;
    private static getField;
    /**
     * Determine whether a ShowCondition model is affected by fields that have
     * a display_context of HIDDEN or READONLY, which means they aren't able to
     * be changed by the user's actions.
     *
     * @param showCondition The ShowCondition model to evaluate.
     * @param caseFields Inspected to see appropriate display_contexts.
     */
    static hiddenCannotChange(showCondition: ShowCondition, caseFields: CaseField[]): boolean;
    constructor(condition: string);
    match(fields: object, path?: string): boolean;
    matchByContextFields(contextFields: CaseField[]): boolean;
    /**
     * Determine whether this is affected by fields that have a display_context
     * of HIDDEN or READONLY, which means they aren't able to be changed by the
     * user's actions.
     *
     * @param caseFields Inspected to see appropriate display_contexts.
     */
    hiddenCannotChange(caseFields: CaseField[]): boolean;
    private matchAndConditions;
    private matchEqualityCondition;
    private checkValueEquals;
    private checkValueNotEquals;
    private checkMultiSelectListEquals;
    private checkValueContains;
    private findValueForComplexCondition;
    private findValueForComplexConditionForPathIfAny;
    private findValueForComplexConditionInArray;
    private getValue;
    private isDynamicList;
    private unquoted;
    private removeStarChar;
    private okIfBothEmpty;
}
