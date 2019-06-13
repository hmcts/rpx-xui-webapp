export const application = {
    cookies: {
        sessionId: '__sessionId__',
        token: '__auth__',
        userId: '__userid__',
    },
    idamClient: 'xuiwebapp',
    juiJudgeRole: 'jui-judge',
    juiPanelMember: 'jui-panelmember',
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
    microservice: 'jui_webapp',
    oauthCallbackUrl: 'oauth2/callback',
    platformCookie: 'platform',
    protocol: 'https',
}
