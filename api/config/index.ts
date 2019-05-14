
import * as process from 'process'
import { application } from './application.config'

import * as aat from './environments/aat.config'
import * as local from './environments/local.config'

export const configs = {
    aat,
    local,
}

export const configEnv = process ? process.env.JUI_ENV || 'local' : 'local'
export const baseConfig = { ...application }
export const config = { ...baseConfig, ...configs[configEnv].default }

if (process) {
    config.appInsightsInstrumentationKey =
        process.env.APPINSIGHTS_INSTRUMENTATIONKEY || 'AAAAAAAAAAAAAAAA'
}
