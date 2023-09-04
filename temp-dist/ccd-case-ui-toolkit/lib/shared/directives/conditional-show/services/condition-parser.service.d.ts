export declare class ConditionParser {
    /**
     * Parse the raw formula and output structured condition data
     * that can be used in evaluating show/hide logic
     * @param condition raw formula e.g. TextField = "Hello"
     */
    static parse(condition: string): any;
    /**
     * Evaluate the current fields against the conditions
     * @param fields the current page fields and their value
     * @param conditions The PegJS formula output
     */
    static evaluate(fields: any, conditions: any[], path?: string): boolean;
    private static evaluateJoin;
    private static matchEqualityCondition;
    private static getValue;
    private static isDynamicList;
    private static getField;
    private static checkValueEquals;
    private static checkValueNotEquals;
    private static checkMultiSelectListEquals;
    private static checkValueContains;
    private static unquoted;
    private static findValueForComplexCondition;
    private static findValueForComplexConditionForPathIfAny;
    private static findValueForComplexConditionInArray;
    private static removeStarChar;
    private static okIfBothEmpty;
}
//# sourceMappingURL=condition-parser.service.d.ts.map