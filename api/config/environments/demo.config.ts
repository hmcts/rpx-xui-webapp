export default {
  health: {
    ccdComponentApi: 'http://ccd-api-gateway-web-demo.service.core-compute-demo.internal/health',
    ccdDataApi: 'http://ccd-data-store-api-demo.service.core-compute-demo.internal/health',
    documentsApi: 'http://dm-store-demo.service.core-compute-demo.internal/health',
    em_anno_api: 'http://em-anno-demo.service.core-compute-demo.internal/health',
  },
  logging: 'debug',
  loginRoleMatcher: 'caseworker',
  protocol: 'http',
  proxy: {
    host: '172.16.0.7',
    port: 8080,
  },
  secureCookie: true,
  services: {
    ccd: {
      componentApi: 'http://ccd-api-gateway-web-demo.service.core-compute-demo.internal',
      dataApi: 'http://ccd-data-store-api-demo.service.core-compute-demo.internal',
    },
    documents: {
      api: 'http://dm-store-demo.service.core-compute-demo.internal',
    },
    em_anno_api: 'http://em-anno-demo.service.core-compute-demo.internal',
    idam: {
      idamApiUrl: 'https://idam-api.demo.platform.hmcts.net',
      idamClientID: 'xuiwebapp',
      idamLoginUrl: 'https://idam-web-public.demo.platform.hmcts.net',
      indexUrl: '/',
      iss: 'https://forgerock-am.service.core-compute-idam-demo.internal:8443/openam/oauth2/hmcts',
      oauthCallbackUrl: 'oauth2/callback',
    },
    payments: 'http://payment-api-demo.service.core-compute-demo.internal',
    s2s: 'http://rpe-service-auth-provider-demo.service.core-compute-demo.internal',
  },
  sessionSecret: 'secretSauce',
}
