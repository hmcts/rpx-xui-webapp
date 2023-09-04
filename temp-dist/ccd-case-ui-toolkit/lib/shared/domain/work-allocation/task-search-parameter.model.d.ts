export interface TaskSearchParameter {
    ccdId?: string;
    eventId?: string;
    jurisdiction?: string;
    location?: string[];
    postEventState?: string;
    preEventState?: string;
    state?: string[];
    user?: string[];
    caseTypeId?: string;
}
export interface TaskSearchParameters {
    parameters: TaskSearchParameter[];
}
//# sourceMappingURL=task-search-parameter.model.d.ts.map