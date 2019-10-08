export default {
    health: {
        ccdComponentApi: 'https://ccd-api-gateway-web-ithc.service.core-compute-ithc.internal/health',
        ccdDataApi: 'https://ccd-data-store-api-ithc.service.core-compute-ithc.internal/health',
        documentsApi: 'https://dm-store-ithc.service.core-compute-ithc.internal/health',
    },
    logging: 'debug',
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
        s2s: 'http://rpe-service-auth-provider-aat.service.core-compute-aat.internal',
    },
    sessionSecret: 'secretSauce',
    useProxy: false,
}
