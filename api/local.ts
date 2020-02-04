import { app } from './application'
import config from 'config'
import * as secretsConfig from 'config'
import {
  hasConfigValue, getPostgresSecret,
  getEnvironment,
  getAppInsightsSecret
} from './configuration'
import * as propertiesVolume from '@hmcts/properties-volume'
import { appInsights } from './lib/appInsights'

app.use(appInsights)

propertiesVolume.addTo(secretsConfig)

console.log(`POSTGRES_DB_NAME: ${config.get('environment')}`)
console.log(`POSTGRES_DB_NAME: ${config.get('health.ccdComponentApi')}`)

app.listen(3001, () => console.log('Dev server listening on port 3001!'))
