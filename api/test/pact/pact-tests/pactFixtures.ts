/**
 *
 * A Fixture Util class that holds all Request and Responses that get used in the pact-tests .
 * Request usually represent the body.Request and Responses are those that are returned from the API call.
 * @see
 * https://hmcts.github.io/reform-api-docs/swagger.html?url=https://hmcts.github.io/reform-api-docs/specs/aac-manage-case-assignment.json#/case-assignment-controller#
 * Note : Swagger docs may need  [VPN + FOXY PROXY 'On']
 */

export interface CaseAssignmentResponseDto{
  status_message: string,
  case_assignments: caseAssignmentDto[]

}

export interface caseAssignmentDto{
  case_id: string,
  sharedWith: sharedWithDto[]
}

export interface sharedWithDto{
  idamId:string,
  first_name:string,
  last_name:string,
  email:string,
  case_roles:string[]
}

export interface AssignAccessWithinOrganisationDto{
  status_message: string
}
