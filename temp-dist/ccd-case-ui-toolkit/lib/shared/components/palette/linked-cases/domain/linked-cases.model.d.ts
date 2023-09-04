export declare class LinkCaseReason {
    key: string;
    value_en: string;
    value_cy: string;
    hint_text_en: string;
    hint_text_cy: string;
    lov_order: number;
    parent_key: string;
    category_key: string;
    parent_category: string;
    active_flag: string;
    child_nodes: string;
    from: string;
    selected?: boolean;
}
export declare class CCDCaseLinkType {
    CaseReference: string;
    CaseType: string;
    CreatedDateTime: string;
    ReasonForLink: LinkReason[];
}
export declare class CaseLink {
    caseReference: string;
    reasons: LinkReason[];
    createdDateTime: string;
    caseType: string;
    caseTypeDescription: string;
    caseState: string;
    caseStateDescription: string;
    caseService: string;
    caseName: string;
    unlink?: boolean;
}
export declare class LinkReason {
    Reason: string;
    OtherDescription?: string;
}
export declare class LinkFromReason {
    reasonCode: string;
    otherDescription?: string;
}
export declare class LinkedCasesResponse {
    linkedCases: CaseLinkResponse[];
}
export declare class CaseLinkResponse {
    caseNameHmctsInternal: string;
    caseReference: string;
    ccdCaseType: string;
    ccdCaseTypeDescription: string;
    ccdJurisdiction: string;
    state: string;
    stateDescription: string;
    linkDetails: LinkDetails[];
}
export declare class LinkDetails {
    createdDateTime: Date;
    reasons: LinkFromReason[];
}
export declare class Terms {
    terms: {
        reference: any[];
    };
}
export declare class ESQueryType {
    query: Terms;
    size: number;
}
//# sourceMappingURL=linked-cases.model.d.ts.map