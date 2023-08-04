
/**
 * A Utility Class that holds all Request and Responses that get used in the pact-tests .
 * Request usually represent the body.Request and Responses are those that are returned from the downstream call.
 * @see http://rd-professional-api-aat.service.core-compute-aat.internal/swagger-ui.html#
 */

export interface Organisation {
  name: string;
  organisationIdentifier: string;
  contactInformation: {
    addressLine1: string,
    addressLine2: string,
    addressLine3: string,
    country: string,
    county: string,
    postCode: string,
    townCity: string,
  };
}

export interface ProfessionalUserResponse {
  organisationIdentifier: string;
  users: ProfessionalUserDetails[];
}

export interface ProfessionalUserDetails {
  userIdentifier: string;
  firstName: string;
  lastName: string;
  email: string;
  idamStatus: string;
  roles: string[];
}

export interface CaseAssignmentResponseDto {
  status_message: string;
  case_assignments: CaseAssignmentDto[];
}

export interface CaseAssignmentDto {
  case_id: string;
  sharedWith: SharedWithDto[];
}

export interface SharedWithDto {
  idamId: string;
  first_name: string;
  last_name: string;
  email: string;
  case_roles: string[];
}

export interface AssignAccessWithinOrganisationDto {
  status_message: string;
}

export interface OrgServicesDto {
    jurisdiction: string;
    service_id: number;
    org_unit: string;
    business_area: string;
    sub_business_area: string;
    service_description: string;
    service_code: string;
    service_short_description: string;
    ccd_service_name: string;
    last_update: string;
    ccd_case_types: string[]
}

export interface flagsDto {
  flags: flags[];
}

export interface flags {
  FlagDetails: flagDetails[];
}

export interface flagDetails {
    name: string;
    hearingRelevant: boolean;
    flagComment: boolean;
    defaultStatus: string;
    externallyAvailable: boolean;
    flagCode: string;
    childFlags: childFlags[];
}

export interface childFlags {
    name: string;
    hearingRelevant: boolean;
    flagComment: boolean;
    defaultStatus: string;
    externallyAvailable: boolean;
    flagCode: string;
    childFlags: childFlags[];
    isParent?: boolean;
    Path?: string[];
}
