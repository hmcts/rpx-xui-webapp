import { Router } from 'express'
import authInterceptor from '../lib/middleware/auth'
import { getTask, postTask, postTaskClaim, postTaskUnClaim } from './index'

const router = Router({ mergeParams: true })

router.use(authInterceptor)
router.use('/task/:taskId', getTask)
router.use('/task', postTask)
router.use('/task/:taskId/unclaim', postTaskUnClaim)
router.use('/task/:taskId/claim', postTaskClaim)
router.use('/task/:taskId/:action', postTask)

export default router
