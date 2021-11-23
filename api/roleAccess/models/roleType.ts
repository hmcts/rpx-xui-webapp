export interface Role {
    name: string;
    label: string;
    description: string;
    category: string;
    substantive: boolean;
    patterns: RoleTypePattern []
}
export interface RoleTypePattern {
    roleType: RoleType;
    grantType: RoleType;
    classification: RoleType;
}
export interface RoleType {
    mandatory: boolean;
    values: string [];
}
