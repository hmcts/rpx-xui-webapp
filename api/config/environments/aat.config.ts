export default {
    health: {
        ccdComponentApi: 'https://gateway-ccd.aat.platform.hmcts.net/health',
        ccdDataApi: 'http://ccd-data-store-api-aat.service.core-compute-aat.internal/health',
        documentsApi: 'http://dm-store-aat.service.core-compute-aat.internal/health',
        em_anno_api: 'http://em-anno-aat.service.core-compute-aat.internal/health',
    },
    logging: 'debug',
    loginRoleMatcher: 'caseworker',
    secureCookie: true,
    services: {
        ccd: {
            componentApi: 'https://gateway-ccd.aat.platform.hmcts.net',
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
        s2s: 'http://rpe-service-auth-provider-aat.service.core-compute-aat.internal',
    },
    sessionSecret: 'secretSauce',
    useProxy: false,
}
