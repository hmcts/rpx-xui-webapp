import { CaseDetails } from './case-details.model';
export declare const DRAFT_PREFIX = "DRAFT";
export declare const DRAFT_QUERY_PARAM = "draft";
export declare class Draft {
    id: string;
    document?: CaseDetails;
    type?: string;
    created?: string;
    updated?: string;
    static stripDraftId(draftId: string): string;
    static isDraft(id: string): boolean;
}
//# sourceMappingURL=draft.model.d.ts.map