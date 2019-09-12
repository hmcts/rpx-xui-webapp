export default {
    logging: 'debug',
    secureCookie: false,
    services: {
        ccd: {
            componentApi: 'https://ccd-api-gateway-web-ithc.service.core-compute-ithc.internal',
            dataApi: 'https://ccd-data-store-api-ithc.service.core-compute-ithc.internal',
        },
        documents: {
            api: 'https://dm-store-ithc.service.core-compute-ithc.internal',
        },
        idam: {
            idamApiUrl: 'https://idam-api.ithc.platform.hmcts.net',
            idamClientID: 'xuiwebapp',
            idamLoginUrl: 'https://idam-web-public.ithc.platform.hmcts.net',
            indexUrl: '/',
            oauthCallbackUrl: 'oauth2/callback',
        },
    },
    sessionSecret: 'secretSauce',
    useProxy: false,
}
