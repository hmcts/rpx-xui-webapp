import * as process from 'process'
import { application } from './application.config'

import * as aat from './environments/aat.config'
import * as local from './environments/local.config'
import * as preview from './environments/preview.config'

export const configs = {
    aat,
    local,
    preview,
}

export const configEnv = process ? process.env.JUI_ENV || 'local' : 'local'
export const baseConfig = { ...application }
export const config = { ...baseConfig, ...configs[configEnv].default }

if (process) {
    config.appInsightsInstrumentationKey = process.env.APPINSIGHTS_INSTRUMENTATIONKEY || 'AAAAAAAAAAAAAAAA'
}
