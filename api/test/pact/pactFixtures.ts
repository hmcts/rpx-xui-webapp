
/**
 *
 * A Utility Class that holds all Request and Responses that get used in the pact-tests .
 * Request usually represent the body.Request and Responses are those that are returned from the downstream call.
 * @see
 * http://rd-professional-api-aat.service.core-compute-aat.internal/swagger-ui.html#
 *
 */

export interface Organisation {
  name: string,
  organisationIdentifier: string,
  companyNumber: string,
  companyUrl: string,
  sraId: string,
  sraRegulated: boolean,
  status: string,
  contactInformation: {
    addressLine1: string,
    addressLine2: string,
    addressLine3: string,
    country: string,
    county: string,
    postCode: string,
    townCity: string,
  }
  superUser: {
    firstName: string,
    lastName: string,
    email: string
  },
  paymentAccount: [
    string
  ]
}

export interface CaseAssignmentResponseDto {
  status_message: string,
  case_assignments: CaseAssignmentDto[]

}

export interface CaseAssignmentDto {
  case_id: string,
  sharedWith: SharedWithDto[]
}

export interface SharedWithDto {
  idamId: string,
  first_name: string,
  last_name: string,
  email: string,
  case_roles: string[]
}

export interface AssignAccessWithinOrganisationDto {
  status_message: string
}
