import * as express from 'express'
import * as auth from './auth'
import * as proxy from './lib/proxy'

const router = express.Router({ mergeParams: true })

router.get('/*', proxy.get)
router.post('/*', proxy.post)
router.put('/*', proxy.put)

router.use('/logout', auth.logout)

export default router
