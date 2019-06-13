export default {
    logging: 'debug',
    secureCookie: false,
    services: {
        ccd: {
            componentApi: 'https://ccd-api-gateway-web-prod.service.core-compute-prod.internal',
            dataApi: 'https://ccd-data-store-api-prod.service.core-compute-prod.internal',
        },
        coh: {
            corApi: 'https://coh-cor-prod.service.core-compute-prod.internal',
        },
        documents: {
            api: 'https://dm-store-prod.service.core-compute-prod.internal',
        },
        idam: {
            idamApiUrl: 'https://idam-api-pregolive.platform.hmcts.net',
            idamClientID: 'xuiwebapp',
            idamLoginUrl: 'https://idam-web-public.platform.hmcts.net',
            indexUrl: '/',
            oauthCallbackUrl: 'oauth2/callback',
        },
        s2s: 'https://rpe-service-auth-provider-prod.service.core-compute-prod.internal',
    },
    sessionSecret: 'secretSauce',
    useProxy: false,
}
