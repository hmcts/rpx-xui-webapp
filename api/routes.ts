
import * as express from 'express'
import * as auth from './auth'
import authInterceptor from './lib/middleware/auth'
import serviceTokenMiddleware from './lib/middleware/serviceToken'
import * as proxy from './lib/proxy'

const router = express.Router({ mergeParams: true })

router.use(serviceTokenMiddleware)
router.use(authInterceptor)

/**
 * These wildcard routes are leveraged by the CCD components.
 *
 * Calls to /aggregated and /data are routed through here.
 *
 * @see ccd-case-ui-toolkit project
 * @see application.ts
 */
router.get('/*', proxy.get)
router.post('/*', proxy.post)
router.put('/*', proxy.put)

router.use('/logout', auth.logout)

export default router
