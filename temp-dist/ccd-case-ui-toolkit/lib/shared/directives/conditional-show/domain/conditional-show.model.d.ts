import { CaseField } from '../../../domain/definition/case-field.model';
export declare class ShowCondition {
    condition: string;
    static readonly CONDITION_NOT_EQUALS = "!=";
    static readonly CONDITION_EQUALS = "=";
    static readonly CONTAINS = "CONTAINS";
    private static instanceCache;
    private static readonly validJoinComparators;
    private static processedList;
    private conditions;
    static addPathPrefixToCondition(showCondition: string, pathPrefix: string): string;
    private static processAddPathPrefixToCondition;
    private static extractConditions;
    static getInstance(condition: string): ShowCondition;
    private static getField;
    private static getConditions;
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
    private updatePathName;
    matchByContextFields(contextFields: CaseField[]): boolean;
    /**
     * Determine whether this is affected by fields that have a display_context
     * of HIDDEN or READONLY, which means they aren't able to be changed by the
     * user's actions.
     *
     * @param caseFields Inspected to see appropriate display_contexts.
     */
    hiddenCannotChange(caseFields: CaseField[]): boolean;
}
//# sourceMappingURL=conditional-show.model.d.ts.map