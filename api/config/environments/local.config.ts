export default {
    health: {
        ccdComponentApi: 'https://ccd-api-gateway-web-perftest.service.core-compute-perftest.internal/health',
        ccdDataApi: 'https://ccd-data-store-api-perftest.service.core-compute-perftest.internal/health',
        documentsApi: 'https://dm-store-perftest.service.core-compute-perftest.internal/health',
    },
    logging: 'debug',
    protocol: 'http',
    proxy: {
        host: '172.16.0.7',
        port: 8080,
    },
    secureCookie: false,
    services: {
        ccd: {
            componentApi: 'https://ccd-api-gateway-web-perftest.service.core-compute-perftest.internal',
            dataApi: 'https://ccd-data-store-api-perftest.service.core-compute-perftest.internal',
        },
        documents: {
            api: 'https://dm-store-perftest.service.core-compute-perftest.internal',
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
}
