export default {
    health: {
        ccdComponentApi: 'http://ccd-api-gateway-web-prod.service.core-compute-prod.internal/health',
        ccdDataApi: 'http://ccd-data-store-api-prod.service.core-compute-prod.internal/health',
        documentsApi: 'http://dm-store-prod.service.core-compute-prod.internal/health',
        em_anno_api: 'http://em-anno-prod.service.core-compute-prod.internal',
    },
    logging: 'debug',
    secureCookie: false,
    services: {
        ccd: {
            componentApi: 'http://ccd-api-gateway-web-prod.service.core-compute-prod.internal',
            dataApi: 'http://ccd-data-store-api-prod.service.core-compute-prod.internal',
        },
        documents: {
            api: 'http://dm-store-prod.service.core-compute-prod.internal',
        },
        em_anno_api: 'http://em-anno-prod.service.core-compute-prod.internal',
        idam: {
            idamApiUrl: 'https://idam-api.platform.hmcts.net',
            idamClientID: 'xuiwebapp',
            idamLoginUrl: 'https://hmcts-access.service.gov.uk',
            indexUrl: '/',
            oauthCallbackUrl: 'oauth2/callback',
        },
        s2s: 'http://rpe-service-auth-provider-prod.service.core-compute-prod.internal',
    },
    sessionSecret: 'secretSauce',
    useProxy: false,
}
