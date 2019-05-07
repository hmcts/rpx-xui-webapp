export const config = {
    cookies: {
        token: '__auth__',
        sessionId: '__sessionId__',
    },

    exceptionOptions: {
        maxLines: 1,
    },

    indexUrl: '/',
    logging: 'info',
    log4jui: {
        appenders: {
            out: {
                layout: {
                    pattern: '%[%d | %p |%X{catFormatted}|%] %m%n',
                    type: 'pattern',
                },
                type: 'stdout',
            },
        },
        categories: {
            default: { appenders: ['out'], level: 'info' },
        },
    },
    maxLogLine: 160,
    microservice: 'jui_webapp',
    port: 3000,
    protocol: 'http',
    proxy: {
        host: '172.16.0.7',
        port: 8080,
    },
    s2s: 'http://rpe-service-auth-provider-aat.service.core-compute-aat.internal',
    secureCookie: false, // this needs to be 'true' in prod and needs https encryption to be used
    services: {
        ccd: {
            componentApi: 'https://ccd-api-gateway-web-aat.service.core-compute-aat.internal',
            dataApi: 'https://ccd-data-store-api-aat.service.core-compute-aat.internal',
        },
        coh: {
            corApi: 'http://coh-cor-aat.service.core-compute-aat.internal',
        },
        documents: {
            api: 'https://dm-store-aat.service.core-compute-aat.internal',
        },
        idam: {
            idamApiUrl: 'https://preprod-idamapi.reform.hmcts.net:3511',
            idamClientID: 'juiwebapp',
            idamLoginUrl: 'https://idam.preprod.ccidam.reform.hmcts.net/login',
            indexUrl: '/',
            oauthCallbackUrl: '/oauth2/callback',
        },
    },
    sessionSecret: 's3cretSauc3',
}
