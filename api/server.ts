import { app } from './application'

import * as ejs from 'ejs'
import * as express from 'express'
import * as path from 'path'
import { appInsights } from './lib/appInsights'
import { config } from 'config'
import * as secretsConfig from 'config'
import {
  hasConfigValue, getPostgresSecret,
  getEnvironment,
  getAppInsightsSecret
} from './configuration'
import * as propertiesVolume from '@hmcts/properties-volume'

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
app.use(appInsights)

propertiesVolume.addTo(secretsConfig)

console.log(`POSTGRES_DB_NAME: ${config.get('environment')}`)
console.log(`POSTGRES_DB_NAME: ${config.get('health.ccdComponentApi')}`)

app.listen(process.env.PORT || 3000, () => {
    console.log('Server listening on port 3000!')
})
