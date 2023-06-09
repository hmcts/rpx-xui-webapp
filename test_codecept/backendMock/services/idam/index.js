
const { v4 } = require('uuid');

const crypto = require('crypto');

const { privateKey, publicKey } = crypto.generateKeyPairSync('rsa', {
    modulusLength: 2048,
    publicKeyEncoding: {
        type: 'spki',
        format: 'pem'
    },
    privateKeyEncoding: {
        type: 'pkcs8',
        format: 'pem',
        // cipher: 'aes-192-cbc',
        // passphrase: 'xui_webapp'
    }
}); 



class IdamApi{
  
    getOpenIdConfig(){
        return openIdConfig;
    }

}

module.exports = new IdamApi();

module.exports.publicKey = publicKey
module.exports.privateKey = privateKey


const openIdConfig = {
    claim_types_supported: ['normal'],
    claims_parameter_supported: false,
    grant_types_supported: ['authorization_code', 'implicit'],
    request_parameter_supported: true,
    request_uri_parameter_supported: true,
    require_request_uri_registration: false,
    response_modes_supported: ['query', 'fragment'],
    token_endpoint_auth_methods_supported: [
        'client_secret_post',
        'private_key_jwt',
        'self_signed_tls_client_auth',
        'tls_client_auth',
        'none',
        'client_secret_basic'
    ],
    scopes_supported: ['acr', 'openid', 'profile', 'roles', 'authorities', 'email'],
    issuer: 'https://forgerock-am.service.core-compute-idam-aat2.internal:8443/openam/oauth2/realms/root/realms/hmcts',
    id_token_encryption_enc_values_supported: [
        'A256GCM',
        'A192GCM',
        'A128GCM',
        'A128CBC-HS256',
        'A192CBC-HS384',
        'A256CBC-HS512'
    ],
    acr_values_supported: [],
    authorization_endpoint: 'https://idam-web-public.aat.platform.hmcts.net/o/authorize',
    request_object_encryption_enc_values_supported: [
        'A256GCM',
        'A192GCM',
        'A128GCM',
        'A128CBC-HS256',
        'A192CBC-HS384',
        'A256CBC-HS512'
    ],
    rcs_request_encryption_alg_values_supported: [
        'RSA-OAEP',
        'RSA-OAEP-256',
        'A128KW',
        'RSA1_5',
        'A256KW',
        'dir',
        'A192KW'
    ],
    claims_supported: [],
    rcs_request_signing_alg_values_supported: [
        'PS384', 'RS384',
        'HS256', 'HS512',
        'RS256', 'HS384',
        'PS256', 'PS512',
        'RS512'
    ],
    token_endpoint: 'https://idam-web-public.aat.platform.hmcts.net/o/token',
    response_types_supported: [
        'code token id_token',
        'code',
        'code id_token',
        'device_code',
        'id_token',
        'code token',
        'token',
        'token id_token'
    ],
    rcs_response_encryption_enc_values_supported: [
        'A256GCM',
        'A192GCM',
        'A128GCM',
        'A128CBC-HS256',
        'A192CBC-HS384',
        'A256CBC-HS512'
    ],
    end_session_endpoint: 'https://idam-web-public.aat.platform.hmcts.net/o/endSession',
    rcs_request_encryption_enc_values_supported: [
        'A256GCM',
        'A192GCM',
        'A128GCM',
        'A128CBC-HS256',
        'A192CBC-HS384',
        'A256CBC-HS512'
    ],
    version: '3.0',
    rcs_response_encryption_alg_values_supported: [
        'RSA-OAEP',
        'RSA-OAEP-256',
        'A128KW',
        'A256KW',
        'RSA1_5',
        'dir',
        'A192KW'
    ],
    userinfo_endpoint: 'https://idam-web-public.aat.platform.hmcts.net/o/userinfo',
    id_token_encryption_alg_values_supported: [
        'RSA-OAEP',
        'RSA-OAEP-256',
        'A128KW',
        'A256KW',
        'RSA1_5',
        'dir',
        'A192KW'
    ],
    jwks_uri: 'https://idam-web-public.aat.platform.hmcts.net/o/jwks',
    subject_types_supported: ['public'],
    id_token_signing_alg_values_supported: ['HS256', 'HS512', 'RS256', 'HS384'],
    request_object_signing_alg_values_supported: ['HS256', 'HS512', 'RS256', 'HS384'],
    request_object_encryption_alg_values_supported: [
        'RSA-OAEP',
        'RSA-OAEP-256',
        'A128KW',
        'RSA1_5',
        'A256KW',
        'dir',
        'A192KW'
    ],
    rcs_response_signing_alg_values_supported: [
        'PS384', 'RS384',
        'HS256', 'HS512',
        'RS256', 'HS384',
        'PS256', 'PS512',
        'RS512'
    ]
}