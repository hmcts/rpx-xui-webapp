export interface CaseRoleRequestPayload {
    queryRequests: CaseRoleQueryRequest []
}

export interface CaseRoleQueryRequest {
    attributes: {
        caseId?: string[];
        jurisdiction?: string[];
        caseType?: string[];
    };
    grantType?: string [];
    roleCategory?: string [];
    roleName?: string [];
}

export interface RoleExclusion {
    id: string;
    type: string;
    name: string;
    userType: string;
    notes?: string;
    added: Date;
    email?: string;
}
