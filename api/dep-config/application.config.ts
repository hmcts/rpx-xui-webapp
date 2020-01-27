export const application = {
    cookies: {
        sessionId: '__sessionId__',
        token: '__auth__',
        userId: '__userid__',
    },
    idamClient: 'xuiwebapp',
    localEnv: 'local',
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
    maxCCDRetries: 3,
    microservice: 'xui_webapp',
    oauthCallbackUrl: 'oauth2/callback',
    platformCookie: 'platform',
    protocol: 'https',
}
