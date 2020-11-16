import { Router } from 'express'
import { getTask, postTask, postTaskAction } from '.'
import authInterceptor from '../lib/middleware/auth'

const router = Router({ mergeParams: true })

router.use(authInterceptor)
router.use('/task/:taskId/:action', postTaskAction)
router.use('/task/:taskId', getTask)
router.use('/task', postTask)

export default router
