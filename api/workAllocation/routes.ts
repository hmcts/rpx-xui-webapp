import { Router } from 'express'

import { getTask, postTaskAction, searchTask } from '.'
import { getLocationById, getLocations } from './locationController'
import authInterceptor from '../lib/middleware/auth'

const router = Router({ mergeParams: true })

router.use(authInterceptor)
router.use('/task/:taskId/:action', postTaskAction)
router.use('/task/:taskId', getTask)
router.use('/task', searchTask)

router.use('/location/:locationId', getLocationById)
router.use('/location', getLocations)

export default router
