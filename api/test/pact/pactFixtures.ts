
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

export interface S2SResponse {
  token?: string;
}

export interface CaseworkerUserDetailsDto {
  email_id: string;
  base_location: [
    {
      is_primary: boolean,
      location: string;
      location_id: number;
    }
  ];
  last_name: string;
  first_name: string;
  user_type:string;
}

export interface CourtLocationDetailsDto{
  court_venues: [
    {
      'site_name': string;
      'epimms_id': string;
      'court_name': string;
    }
  ];
  court_type: string;
  service_code: string;
  court_type_id: string;
}
export interface AccessRolesDto{
  roleAssignmentResponse: [
    {
      'id': string;
      'actorIdType': string;
      'actorId': string;
      'roleType': string;
      'roleName': string;
      'classification': string;
      'grantType': string;
      'roleCategory': string;
      'readOnly': boolean;
      'beginTime': string;
      'created': string;
      'attributes':{
        'substantive': string;
        'caseId': string;
        'jurisdiction': string;
        'caseType': string;
      }
    }
  ]
}
