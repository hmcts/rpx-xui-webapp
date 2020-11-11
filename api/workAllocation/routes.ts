import * as express from 'express'
import authInterceptor from '../lib/middleware/auth'
import { getTask, postTask, postTaskUnClaim } from './index'

const router = express.Router({ mergeParams: true })

router.use(authInterceptor)
router.use('/task/:taskId', getTask)
router.use('/task', postTask)
router.use('/task/:taskId/unclaim', postTaskUnClaim)

export default router
