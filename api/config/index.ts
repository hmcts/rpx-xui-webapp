import * as process from 'process'
import { application } from './application.config'
import * as aat from './environments/aat.config'
import * as demo from './environments/demo.config'
import * as ithc from './environments/ithc.config'
import * as local from './environments/local.config'
import * as localdocker from './environments/localdocker.config'
import * as perftest from './environments/perftest.config'
import * as preview from './environments/preview.config'
import * as prod from './environments/prod.config'

export const configs = {
    aat,
    demo,
    ithc,
    local,
    localdocker,
    perftest,
    preview,
    prod,
}

export const configEnv = process ? process.env.XUI_ENV || 'local' : 'local'
export const baseConfig = { ...application }
export const config = { ...baseConfig, ...configs[configEnv].default }

if (process) {
    config.appInsightsInstrumentationKey =
        process.env.APPINSIGHTS_INSTRUMENTATIONKEY || 'AAAAAAAAAAAAAAAA'
}
