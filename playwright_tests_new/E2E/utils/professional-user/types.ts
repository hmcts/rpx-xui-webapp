export type ProfessionalUserInfo = {
  id?: string;
  email: string;
  password: string;
  forename: string;
  surname: string;
  roleNames: string[];
};

export type UserPropagationOutcome = {
  verified: boolean;
  degraded: boolean;
  reason: 'idam-api-and-userinfo-probe' | 'idam-api-only' | 'no-probe-token';
};

export type OrganisationAssignmentMode = 'internal' | 'external';
export type OrganisationAssignmentStrategy = OrganisationAssignmentMode | 'auto';

export type OrganisationAssignmentResult = {
  organisationId: string;
  mode: OrganisationAssignmentMode;
  requestedMode: OrganisationAssignmentStrategy;
  attemptedModes: OrganisationAssignmentMode[];
  roles: string[];
  status: number;
  userIdentifier?: string;
  responseBody?: unknown;
};

export type ProvisionedProfessionalUser = ProfessionalUserInfo & {
  organisationAssignment: OrganisationAssignmentResult;
};
