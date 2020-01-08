import * as express from 'express'
import * as amendedJurisdictions from './amendedJurisdictions'
import authInterceptor from './lib/middleware/auth'
import * as proxy from './lib/proxy'

const router = express.Router({ mergeParams: true })

router.use(authInterceptor)

router.get('/caseworkers/:uid/jurisdictions', amendedJurisdictions.getJurisdictions)

router.get('/*', proxy.get)
router.post('/*', proxy.post)
router.put('/*', proxy.put)

// @ts-ignore
export default router
