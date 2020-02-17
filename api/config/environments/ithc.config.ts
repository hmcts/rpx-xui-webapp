export default {
    health: {
        ccdComponentApi: 'http://ccd-api-gateway-web-ithc.service.core-compute-ithc.internal/health',
        ccdDataApi: 'http://ccd-data-store-api-ithc.service.core-compute-ithc.internal/health',
        documentsApi: 'http://dm-store-ithc.service.core-compute-ithc.internal/health',
        em_anno_api: 'http://em-anno-ithc.service.core-compute-ithc.internal/health',
    },
    logging: 'debug',
    loginRoleMatcher: 'caseworker',
    secureCookie: true,
    services: {
        ccd: {
            componentApi: 'http://ccd-api-gateway-web-ithc.service.core-compute-ithc.internal',
            dataApi: 'http://ccd-data-store-api-ithc.service.core-compute-ithc.internal',
        },
        documents: {
            api: 'http://dm-store-ithc.service.core-compute-ithc.internal',
        },
        em_anno_api: 'http://em-anno-ithc.service.core-compute-ithc.internal',
        idam: {
            idamApiUrl: 'http://idam-api-ithc.service.core-compute-ithc.internal',
            idamClientID: 'xuiwebapp',
            idamLoginUrl: 'https://idam-web-public-aks.ithc.platform.hmcts.net',
            indexUrl: '/',
            oauthCallbackUrl: 'oauth2/callback',
        },
        s2s: 'http://rpe-service-auth-provider-ithc.service.core-compute-ithc.internal',
    },
    sessionSecret: 'secretSauce',
    useProxy: false,
}
