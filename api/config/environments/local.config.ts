export default {
    logging: 'debug',
    protocol: 'http',
    proxy: {
        host: '172.16.0.7',
        port: 8080,
    },
    secureCookie: false,
    services: {
        ccdDataApi:
            'https://ccd-data-store-api-aat.service.core-compute-aat.internal',
        ccdDefApi:
            'https://ccd-definition-store-api-aat.service.core-compute-aat.internal',
        cohCorApi: 'https://coh-cor-aat.service.core-compute-aat.internal',
        dmStoreApi: 'https://dm-store-aat.service.core-compute-aat.internal',
        draftStoreApi:
            'https://draft-store-service-aat.service.core-compute-aat.internal',

        emAnnoApi: 'https://em-anno-aat.service.core-compute-aat.internal',
        emNpaApi: 'https://em-npa-aat.service.core-compute-aat.internal',
        idamApi: 'https://idam-api.aat.platform.hmcts.net',
        idamWeb: 'https://idam-web-public.aat.platform.hmcts.net',
        s2s:
            'https://rpe-service-auth-provider-aat.service.core-compute-aat.internal',

    },

    sessionSecret: 'secretSauce',
}
