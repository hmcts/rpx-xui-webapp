export default {
    health: {
        ccdComponentApi: 'https://ccd-api-gateway-web-perftest.service.core-compute-perftest.internal/health',
        ccdDataApi: 'https://ccd-data-store-api-perftest.service.core-compute-perftest.internal/health',
        documentsApi: 'https://dm-store-perftest.service.core-compute-perftest.internal/health',
        em_anno_api: 'http://em-anno-perftest.service.core-compute-perftest.internal',
    },
    logging: 'debug',
    loginRoleMatcher: 'caseworker',
    secureCookie: false,
    services: {
        ccd: {
            componentApi: 'https://ccd-api-gateway-web-perftest.service.core-compute-perftest.internal',
            dataApi: 'https://ccd-data-store-api-perftest.service.core-compute-perftest.internal',
        },
        documents: {
            api: 'https://dm-store-perftest.service.core-compute-perftest.internal',
        },
        em_anno_api: 'http://em-anno-perftest.service.core-compute-perftest.internal',
        idam: {
            idamApiUrl: 'https://idam-api.perftest.platform.hmcts.net',
            idamClientID: 'xuiwebapp',
            idamLoginUrl: 'https://idam-web-public.perftest.platform.hmcts.net',
            indexUrl: '/',
            iss: 'https://forgerock-am.service.core-compute-idam-perftest.internal:8443/openam/oauth2/hmcts',
            oauthCallbackUrl: 'oauth2/callback',
        },
        s2s: 'http://rpe-service-auth-provider-perftest.service.core-compute-perftest.internal',
    },
    sessionSecret: 'secretSauce',
    useProxy: false,
}
