export default {
    health: {
        ccdComponentApi: 'http://ccd-api-gateway-web-aat.service.core-compute-aat.internal/health',
        ccdDataApi: 'http://ccd-data-store-api-aat.service.core-compute-aat.internal/health',
        documentsApi: 'http://dm-store-aat.service.core-compute-aat.internal/health',
        em_anno_api: 'http://em-anno-aat.service.core-compute-aat.internal/health',
    },
    logging: 'debug',
    loginRoleMatcher: 'caseworker',
    secureCookie: true,
    services: {
        ccd: {
            componentApi: 'http://ccd-api-gateway-web-aat.service.core-compute-aat.internal',
            dataApi: 'http://ccd-data-store-api-aat.service.core-compute-aat.internal',
        },
        documents: {
            api: 'http://dm-store-aat.service.core-compute-aat.internal',
        },
        em_anno_api: 'http://em-anno-aat.service.core-compute-aat.internal',
        idam: {
            idamApiUrl: 'https://idam-api.ithc.platform.hmcts.net',
            idamClientID: 'xuiwebapp',
            idamLoginUrl: 'https://idam-web-public.ithc.platform.hmcts.net',
            indexUrl: '/',
            iss: 'https://forgerock-am.service.core-compute-idam-aat.internal:8443/openam/oauth2/hmcts',
            oauthCallbackUrl: 'oauth2/callback',
        },
        s2s: 'http://rpe-service-auth-provider-aat.service.core-compute-aat.internal',
    },
    sessionSecret: 'secretSauce',
    useProxy: false,
}
