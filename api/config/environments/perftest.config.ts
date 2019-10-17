export default {
    health: {
        ccdComponentApi: 'http://ccd-api-gateway-web-perftest.service.core-compute-perftest.internal/health',
        ccdDataApi: 'http://ccd-data-store-api-perftest.service.core-compute-perftest.internal/health',
        documentsApi: 'http://dm-store-perftest.service.core-compute-perftest.internal/health',
    },
    logging: 'debug',
    secureCookie: false,
    services: {
        ccd: {
            componentApi: 'http://ccd-api-gateway-web-perftest.service.core-compute-perftest.internal',
            dataApi: 'http://ccd-data-store-api-perftest.service.core-compute-perftest.internal',
        },
        documents: {
            api: 'http://dm-store-perftest.service.core-compute-perftest.internal',
        },
        idam: {
            idamApiUrl: 'https://idam-api.perftest.platform.hmcts.net',
            idamClientID: 'xuiwebapp',
            idamLoginUrl: 'https://idam-web-public.perftest.platform.hmcts.net',
            indexUrl: '/',
            oauthCallbackUrl: 'oauth2/callback',
        },
        s2s: 'http://rpe-service-auth-provider-perftest.service.core-compute-perftest.internal',
    },
    sessionSecret: 'secretSauce',
    useProxy: false,
}
