import { ChallengedAccessRequest } from '../../../domain/case-view/challenged-access-request.model';
import { RoleCategory, RoleGrantTypeCategory, RoleRequestPayload } from '../../../domain/case-view/role-request.model';
import { SpecificAccessRequest } from '../../../domain/case-view/specific-access-request.model';
export declare class CaseAccessUtils {
    static readonly JUDGE_ROLE = "judge";
    static readonly JUDGE_ROLE_CATEGORY = "JUDICIAL";
    static readonly JUDGE_ROLE_NAME = "judiciary";
    static readonly ADMIN_ROLE = "admin";
    static readonly ADMIN_ROLE_CATEGORY = "ADMIN";
    static readonly ADMIN_ROLE_NAME = "admin";
    static readonly PROFESSIONAL_ROLE = "solicitor";
    static readonly PROFESSIONAL_ROLE_CATEGORY = "PROFESSIONAL";
    static readonly PROFESSIONAL_ROLE_NAME = "professional";
    static readonly LEGAL_OPERATIONS_ROLE = "caseworker";
    static readonly LEGAL_OPERATIONS_ROLE_CATEGORY = "LEGAL_OPERATIONS";
    static readonly LEGAL_OPERATIONS_ROLE_NAME = "legal-ops";
    static readonly CITIZEN_ROLE = "citizen";
    static readonly CITIZEN_ROLE_CATEGORY = "CITIZEN";
    static readonly CITIZEN_ROLE_NAME = "citizen";
    static readonly CTSC_ROLE = "ctsc";
    static readonly CTSC_ROLE_CATEGORY = "CTSC";
    static readonly CTSC_ROLE_NAME = "ctsc";
    getMappedRoleCategory(roles?: string[], roleCategories?: string[]): RoleCategory;
    roleOrCategoryExists(roleKeyword: string, roleCategory: string, roleKeywords: string[], roleCategories: string[]): boolean;
    getAMRoleName(accessType: string, aMRole: RoleCategory): string;
    getAMPayload(assignerId: string, actorId: string, roleName: string, roleCategory: RoleCategory, grantType: RoleGrantTypeCategory, caseId: string, details: ChallengedAccessRequest | SpecificAccessRequest, beginTime?: Date, endTime?: Date, isNew?: boolean): RoleRequestPayload;
}
//# sourceMappingURL=index.d.ts.map