export const environment = {
  production: true,
  loggingLevel: 'OFF',
   idam: {
     idamApiUrl: 'https://idam-api.aat.platform.hmcts.net',
     idamClientID: 'juiwebapp',
     idamLoginUrl: 'https://idam-web-public.aat.platform.hmcts.net',
     indexUrl: '/',
     oauthCallbackUrl: 'oauth2/callback'
   },
   cookies: {
     token: '__auth__',
     userId: '__userid__',
   },
};
