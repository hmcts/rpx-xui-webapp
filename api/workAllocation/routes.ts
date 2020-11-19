import { Router } from 'express'

import { getTask, postTaskAction, searchTask } from '.'
import authInterceptor from '../lib/middleware/auth'
import { handleCaseWorkerGetAll } from './caseWorkerService'

const router = Router({ mergeParams: true })

router.use(authInterceptor)
router.use('/task/:taskId/:action', postTaskAction)
router.use('/task/:taskId', getTask)
router.use('/task', searchTask)
router.use('/caseworker', handleCaseWorkerGetAll)
router.use('/task', searchTask)

export default router
