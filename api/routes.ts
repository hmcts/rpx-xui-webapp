
import * as express from 'express'
import * as auth from './auth'
import * as proxy from './lib/proxy'

const router = express.Router({ mergeParams: true })

router.get('/ccd/*', proxy.get)
router.post('/ccd/*', proxy.post)
router.put('/ccd/*', proxy.put)

router.use('/logout', auth.logout)

export default router
