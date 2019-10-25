export default {
  health: {
    ccdComponentApi: 'http://ccd-api-gateway-web-demo.service.core-compute-demo.internal/health',
    ccdDataApi: 'http://ccd-data-store-api-demo.service.core-compute-demo.internal/health',
    documentsApi: 'http://dm-store-demo.service.core-compute-demo.internal/health',
  },
    logging: 'debug',
    secureCookie: false,
    services: {
        ccd: {
            componentApi: 'http://ccd-api-gateway-web-demo.service.core-compute-demo.internal',
            dataApi: 'http://ccd-data-store-api-demo.service.core-compute-demo.internal',
        },
        coh: {
            corApi: 'http://coh-cor-demo.service.core-compute-demo.internal',
        },
        documents: {
            api: 'http://dm-store-demo.service.core-compute-demo.internal',
        },
        idam: {
            idamApiUrl: 'https://idam-api.demo.platform.hmcts.net',
            idamClientID: 'xuiwebapp',
            idamLoginUrl: 'https://idam-web-public.demo.platform.hmcts.net',
            indexUrl: '/',
            oauthCallbackUrl: 'oauth2/callback',
        },
        s2s:
            'http://rpe-service-auth-provider-demo.service.core-compute-demo.internal',
    },
    sessionSecret: 'secretSauce',
    useProxy: false,
}
