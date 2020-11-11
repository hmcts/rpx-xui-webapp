import * as express from 'express'
import authInterceptor from '../lib/middleware/auth'
import { getTask, postTask } from './index'

const router = express.Router({ mergeParams: true })

router.use(authInterceptor)
router.use('/task/:taskId', getTask)
router.use('/task/:taskId/complete', postTask)

export default router
