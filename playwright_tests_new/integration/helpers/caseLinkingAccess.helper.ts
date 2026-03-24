export interface CaseLinkingAccessConfig {
  userIdentifier: string;
  userRoles: string[];
}

export const caseLinkingStaffAccess: CaseLinkingAccessConfig = {
  userIdentifier: 'STAFF_ADMIN',
  userRoles: ['hmcts-staff'],
};

export const caseLinkingJudiciaryAccess: CaseLinkingAccessConfig = {
  userIdentifier: 'IAC_Judge_WA_R1',
  userRoles: ['hmcts-judiciary'],
};
