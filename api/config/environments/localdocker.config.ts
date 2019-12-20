export default {
    health: {
      ccdComponentApi: 'http://ccd-api-gateway-web:3453/health',
    },
    logging: 'debug',
    loginRoleMatcher: 'caseworker',
    microservice: 'xui_webapp',
    protocol: 'http',
    secureCookie: false,
    services: {
        ccd: {
            componentApi: 'http://ccd-api-gateway-web:3453',
            dataApi: 'http://ccd-case-management-web:3451',
        },
        documents: {
            api: 'http://ccd-api-gateway-web:3453',
        },
        idam: {
            idamApiUrl: 'http://idam-api:5000',
            idamClientID: 'xuiwebapp',
            idamLoginUrl: 'http://idam-web-public:3501',
            indexUrl: '/',
            oauthCallbackUrl: 'oauth2/callback',
        },
        s2s: 'http://service-auth-provider-api:8080',
    },
    sessionSecret: 'secretSauce',
    useProxy: false,
}
