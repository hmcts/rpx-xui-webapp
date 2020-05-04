import * as express from 'express'
import {getConfigValue} from '../configuration'
import {
  HEALTH,
} from '../configuration/references'
import { http } from '../lib/http'
export const router = express.Router({ mergeParams: true })

router.get('/', healthCheckRoute)

/*
    Any feature that requires a health check
    will need to have its path declared as a
    property in the healthCheckEndpointDictionary.
    Then this property will need to have an array
    of api url's assigned to it.
*/

const healthCheckEndpointDictionary = {
    '/cases': ['ccdComponentApi'], // keep parent paths on top of children
    '/cases/case-create': ['ccdComponentApi'],
    '/cases/case-details': ['ccdComponentApi'],
    '/cases/case-filter': ['ccdComponentApi'],
    '/cases/case-search': ['ccdComponentApi'],
}

/*
    Health check endpoints are retrieved from
    environment json files. The "health" property
    inside an environment file is the exact copy
    of the "service" property, apart from the fact
    that an "/health" path is added at the end of
    each api url. The "service" property is not used
    in health check, because the url for a healthcheck
    endpoint may be different from a regular endpoint
*/

export function getPromises(path): any[] {
    const Promises = []

    /* Checking whether path can be simplified, ie route has parameters*/
    const dictionaryKeys = Object.keys(healthCheckEndpointDictionary).reverse()
    for (const key of dictionaryKeys)  {
        if (path.indexOf(key) > -1) {
            path = key
            break
        }
    }

    const health = getConfigValue(HEALTH)

    if (healthCheckEndpointDictionary[path]) {
        healthCheckEndpointDictionary[path].forEach(endpoint => {
            Promises.push(http.get(health[endpoint]))
        })
    }
    return Promises
}

export async function healthCheckRoute(req, res) {
    res.send({ healthState: true })
    /*try {
        const path = req.query.path
        let PromiseArr = []
        let response = { healthState: true }

        if (path !== '') {
            PromiseArr = that.getPromises(path)
        }

        // comment out following block to bypass actual check
        await Promise.all(PromiseArr).then().catch(() => {
            response = { healthState: false }
        })

        logger.info('response::', response)
        res.send(response)
    } catch (error) {
        console.log(error)
        logger.info('error', { healthState: false })
        res.status(error.status).send({ healthState: false })
    }*/
}
export default router
