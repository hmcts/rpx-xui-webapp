import { Router } from 'express'

import { getTask, postTask, postTaskAction, postTaskUnClaim } from '.'
import authInterceptor from '../lib/middleware/auth'

const router = Router({ mergeParams: true })

router.use(authInterceptor)
router.use('/task/:taskId', getTask)
router.use('/task', postTask)
router.use('/task/:taskId/unclaim', postTaskUnClaim)
router.use('/task/:taskId/:action', postTaskAction)

export default router
