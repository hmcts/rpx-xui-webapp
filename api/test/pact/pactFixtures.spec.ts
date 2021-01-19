

/**
 *
 * A Utility Class that holds all Request and Responses that get used in the pact-tests .
 * Request usually represent the body.Request and Responses are those that are returned from the downstream call.
 * @see
 * http://rd-professional-api-aat.service.core-compute-aat.internal/swagger-ui.html#
 * for Swagger docs [VPN + FOXY PROXY 'On']
 *
 */


export interface organisation {
  companyNumber: string,
  companyUrl: string,
  name: string,
  organisationIdentifier: string,
  sraId: string,
  sraRegulated: boolean,
  status: string,
  contactInformation: contactInformation,
  superUser: superUser,
  paymentAccount: Array<string>
}
