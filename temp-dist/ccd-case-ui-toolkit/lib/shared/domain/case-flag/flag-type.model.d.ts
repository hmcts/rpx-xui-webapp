/**
 * DTO to provide typing of the response from the Reference Data Common API for Case Flags data.
 *
 * @see {@link https://tools.hmcts.net/confluence/pages/viewpage.action?pageId=1525476616#CaseFlagsHLDVersion1.0-Output}
 * for full details
 */
export declare class FlagType {
    name: string;
    hearingRelevant: boolean;
    flagComment: boolean;
    flagCode: string;
    isParent: boolean;
    Path: string[];
    childFlags: FlagType[];
    listOfValuesLength: number;
    listOfValues: {
        key: string;
        value: string;
    }[];
}
//# sourceMappingURL=flag-type.model.d.ts.map