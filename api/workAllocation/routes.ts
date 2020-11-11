import { Router } from 'express'

import { getTask, postTask } from '.'
import authInterceptor from '../lib/middleware/auth'

const router = Router({ mergeParams: true })

router.use(authInterceptor)
router.use('/task/:taskId', getTask)
router.use('/task/:taskId/:action', postTask)

export default router
