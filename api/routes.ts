import * as express from 'express'
import * as amendedJurisdictions from './amendedJurisdictions'
import * as auth from './auth'
import { router as keepAlive } from './keepalive'
// import authInterceptor from './lib/middleware/auth'
import * as proxy from './lib/proxy'

const router = express.Router({ mergeParams: true })

// router.use(authInterceptor)

router.get('/caseworkers/:uid/jurisdictions', amendedJurisdictions.getJurisdictions)

router.get('/*', proxy.get)
router.post('/*', proxy.post)
router.put('/*', proxy.put)

router.use('/logout', auth.logout)
router.use('/keepalive', keepAlive)

// @ts-ignore
export default router
