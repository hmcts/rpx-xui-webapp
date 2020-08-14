import * as applicationinsights from 'applicationinsights'
import * as express from 'express'
import {getConfigValue, showFeature} from '../configuration'
import {
    APP_INSIGHTS_KEY, FEATURE_APP_INSIGHTS_ENABLED,
} from '../configuration/references'

export let client

if (showFeature(FEATURE_APP_INSIGHTS_ENABLED)) {
    applicationinsights
        .setup(getConfigValue(APP_INSIGHTS_KEY))
        .setDistributedTracingMode(applicationinsights.DistributedTracingModes.AI_AND_W3C)
        .setSendLiveMetrics(true)
        .setAutoCollectConsole(true, true)
        .start()

    applicationinsights.defaultClient.context.tags[applicationinsights.defaultClient.context.keys.cloudRole] = "exuiWebApp"

    client = applicationinsights.defaultClient
    client.trackTrace({ message: 'App Insight Activated' })
} else {
    client = null
}

export function appInsights(req: express.Request, res: express.Response, next) {
    if (client) {
        client.trackNodeHttpRequest({ request: req, response: res })
    }

    next()
}
