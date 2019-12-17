export default {
    health: {
        ccdComponentApi: 'http://ccd-api-gateway-web-aat.service.core-compute-aat.internal/health',
        ccdDataApi: 'http://ccd-data-store-api-aat.service.core-compute-aat.internal/health',
        documentsApi: 'http://dm-store-aat.service.core-compute-aat.internal/health',
        em_anno_api: 'http://em-anno-aat.service.core-compute-aat.internal/health',
    },
    logging: 'debug',
    loginRoleMatcher: 'caseworker',
    secureCookie: false,
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
            idamApiUrl: 'https://idam-api.aat.platform.hmcts.net',
            idamClientID: 'xuiwebapp',
            idamLoginUrl: 'https://idam-web-public.aat.platform.hmcts.net',
            indexUrl: '/',
            oauthCallbackUrl: 'oauth2/callback',
        },
        payments: 'http://payment-api-aat.service.core-compute-aat.internal',
        s2s: 'http://rpe-service-auth-provider-aat.service.core-compute-aat.internal',
    },
    sessionSecret: 'secretSauce',
    useProxy: false,
}
