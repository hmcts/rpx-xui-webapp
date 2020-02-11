import * as propertiesVolume from '@hmcts/properties-volume';
import { app } from './application'

import * as ejs from 'ejs'
import * as express from 'express'
import * as path from 'path'
import { appInsights } from './lib/appInsights'
import { getConfigValue, getS2sSecret, getAppInsightsSecret } from './configuration'
import {
  SERVICES_CCD_COMPONENT_API_PATH,
  SERVICES_CCD_DATA_STORE_API_PATH,
  SERVICES_DOCUMENTS_API_PATH,
  COOKIES_TOKEN,
  COOKIES_SESSION_ID,
  SERVICES_IDAM_API_URL,
  SERVICES_IDAM_CLIENT_ID,
  SERVICES_IDAM_LOGIN_URL,
  SERVICES_IDAM_INDEX_URL,
  SERVICES_IDAM_ISS_URL,
  SERVICES_IDAM_OAUTH_CALLBACK_URL,
  PROTOCOL,
  MAX_LOG_LINE,
  LOGGING,
  APP_INSIGHTS_KEY,
  SERVICES_TERMS_AND_CONDITIONS_PATH,
  HEALTH,
} from './configuration/references'

app.engine('html', ejs.renderFile)
app.set('view engine', 'html')
app.set('views', __dirname)

app.set('view engine', 'html')
app.set('views', __dirname)

app.use(express.static(path.join(__dirname, '..', 'assets'), { index: false }))
app.use(express.static(path.join(__dirname, '..'), { index: false }))

app.use('/*', (req, res) => {
    res.render('../index', {
        providers: [
            { provide: 'REQUEST', useValue: req },
            { provide: 'RESPONSE', useValue: res },
        ],
        req,
        res,
    })
})

const secrets = propertiesVolume.addTo({});

console.log('CHECK ENVIRONMENT VARIABLES:');
console.log(getConfigValue('environment'))
console.log(getConfigValue(SERVICES_CCD_COMPONENT_API_PATH))
console.log(getConfigValue(SERVICES_CCD_DATA_STORE_API_PATH))
console.log(getConfigValue(SERVICES_DOCUMENTS_API_PATH))
console.log(getConfigValue(COOKIES_TOKEN))
console.log(getConfigValue(COOKIES_SESSION_ID))
console.log(getConfigValue(SERVICES_IDAM_API_URL))
console.log(getConfigValue(SERVICES_IDAM_CLIENT_ID))
console.log(getConfigValue(SERVICES_IDAM_LOGIN_URL))
console.log(getConfigValue(SERVICES_IDAM_INDEX_URL))
console.log(getConfigValue(SERVICES_IDAM_ISS_URL))
console.log(getConfigValue(SERVICES_IDAM_OAUTH_CALLBACK_URL))
console.log(getConfigValue(PROTOCOL))
console.log(getConfigValue(MAX_LOG_LINE))
console.log(getConfigValue(LOGGING))
console.log(getConfigValue(APP_INSIGHTS_KEY))
console.log(getConfigValue(SERVICES_TERMS_AND_CONDITIONS_PATH))
console.log(getConfigValue(HEALTH))
console.log('END CHECK OF ENVIRONMENTAL VARIABLES');

// TODO: Let's get the secrets into here.
console.log('s2sSecret');
console.log(getS2sSecret(secrets));
console.log(getAppInsightsSecret(secrets));


app.use(appInsights)
app.listen(process.env.PORT || 3000, () => {
    console.log('Server listening on port 3000!')
})
