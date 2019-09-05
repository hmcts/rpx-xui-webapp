import * as express from 'express'
import { config } from '../config'
import * as log4jui from '../lib/log4jui'

const logger = log4jui.getLogger('service-token')

async function handleInstrumentationKeyRoute(req, res) {
    try {
        res.send({key: config.appInsightsInstrumentationKey})
    } catch (error) {
        const errReport = JSON.stringify({
            apiError: error,
            apiStatusCode: error.statusCode,
            message: 'List of users route error',
        })
        res.send(errReport).status(500)
    }
}

export const router = express.Router({ mergeParams: true })

router.get('/', handleInstrumentationKeyRoute)

export default router
