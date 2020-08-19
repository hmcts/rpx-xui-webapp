import { Matchers } from '@pact-foundation/pact'

// tslint:disable-next-line:variable-name
const { term, string, boolean, eachLike } = Matchers

/* tslint:disable:object-literal-sort-keys */
export default {
  "request_parameter_supported": boolean(true),
  "claims_parameter_supported": boolean(false),
  "scopes_supported": eachLike('openid'),
  "issuer": term({
      generate: "https://idam-web-public.aat.platform.hmcts.net/o",
      matcher: "\/o$",
    }),
  "id_token_encryption_enc_values_supported": eachLike('A256GCM'),
  "acr_values_supported": [],
  "authorization_endpoint": term({
    generate: "https://idam-web-public.aat.platform.hmcts.net/o/authorize",
    matcher: "\/o\/authorize$",
  }),
  "request_object_encryption_enc_values_supported": eachLike('A256GCM'),
  "rcs_request_encryption_alg_values_supported": eachLike('RSA-OAEP'),
  "claims_supported": [],
  "rcs_request_signing_alg_values_supported": eachLike('PS384'),
  "token_endpoint_auth_methods_supported": eachLike('client_secret_post'),
  "token_endpoint": term({
    generate: "https://idam-web-public.aat.platform.hmcts.net/o/token",
    matcher: "\/o\/token$",
  }),
  "response_types_supported": eachLike('code'),
  "request_uri_parameter_supported": boolean(true),
  "rcs_response_encryption_enc_values_supported": eachLike('A256GCM'),
  "end_session_endpoint": term({
    generate: "https://idam-web-public.aat.platform.hmcts.net/o/endSession",
    matcher: "\/o\/endSession$",
  }),
  "rcs_request_encryption_enc_values_supported": eachLike('A256GCM'),
  "version": string("3.0"),
  "rcs_response_encryption_alg_values_supported": eachLike('RSA-OAEP'),
  "userinfo_endpoint": term({
    generate: "https://idam-web-public.aat.platform.hmcts.net/o/userinfo",
    matcher: "\/o\/userinfo$",
  }),
  "id_token_encryption_alg_values_supported": eachLike('RSA-OAEP'),
  "jwks_uri": term({
    generate: "https://idam-web-public.aat.platform.hmcts.net/o/jwks",
    matcher: "\/o\/jwks$",
  }),
  "subject_types_supported": eachLike('public'),
  "id_token_signing_alg_values_supported": eachLike('ES384'),
  "request_object_signing_alg_values_supported": eachLike('ES384'),
  "request_object_encryption_alg_values_supported": eachLike('RSA-OAEP'),
  "rcs_response_signing_alg_values_supported": eachLike('PS384'),
}
/* tslint:enable:object-literal-sort-keys */
