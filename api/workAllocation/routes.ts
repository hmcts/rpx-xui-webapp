import * as express from 'express'
import authInterceptor from '../lib/middleware/auth'
import { getTask } from './index'

const router = express.Router({ mergeParams: true })

router.use(authInterceptor)
router.use('/task/:taskId', getTask)

export default router
