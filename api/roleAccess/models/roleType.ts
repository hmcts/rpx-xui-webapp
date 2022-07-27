export interface Role {
    id?: string;
    name: string;
    label: string;
    description: string;
    category: string;
    substantive: boolean;
    patterns: RoleTypePattern []
}
export interface RefinedRole {
    roleCategory: string;
    roleId: string;
    roleName: string;
    roleJurisdiction: RoleType;
}
export interface RolesByService {
    service: string;
    roles: RefinedRole[];
}
export interface RoleTypePattern {
    roleType: RoleType;
    grantType: RoleType;
    classification: RoleType;
    attributes: {
        jurisdiction: RoleType;
    }
}
export interface RoleType {
    mandatory: boolean;
    values: string [];
}
