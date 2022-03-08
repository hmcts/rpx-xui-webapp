import { RoleAssignment } from "../../user/interfaces/roleAssignment";

export interface CaseworkerPayload {
    attributes: any;
    roleName: string [];
    roleType: string [];
    validAt: any;
}

export interface ServiceCaseworkerData {
    jurisdiction: string;
    data: {
        roleAssignmentResponse: RoleAssignment[];
    };
}
