import { Router } from 'express'

import { getAllCaseWorkers, getAllCaseWorkersForLocation, getCaseWorkersForLocationAndService,
        getCaseWorkersForService, getTask, postTaskAction, searchCaseWorker, searchTask } from '.'
import authInterceptor from '../lib/middleware/auth'
import { getLocationById, getLocations } from './locationController'

const router = Router({ mergeParams: true })

router.use(authInterceptor)

router.use('/task/:taskId/:action', postTaskAction)
router.use('/task/:taskId', getTask)
router.use('/task', searchTask)

router.use('/location/:locationId', getLocationById)
router.use('/location', getLocations)

router.use('/caseworker/location/:locationId/service/:serviceId', getCaseWorkersForLocationAndService)
router.use('/caseworker/location/:locationId', getAllCaseWorkersForLocation)
router.use('/caseworker/service/:serviceId', getCaseWorkersForService)
router.use('/caseworker/search', searchCaseWorker)
router.use('/caseworker', getAllCaseWorkers)

export default router
