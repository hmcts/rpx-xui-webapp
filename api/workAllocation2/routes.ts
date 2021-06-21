import { Router } from 'express';

import {
  getAllCaseWorkers,
  getAllCaseWorkersForLocation,
  getAllJudicialWorkers,
  getCaseWorkersForLocationAndService,
  getCaseWorkersForService,
  getTask,
  postTaskAction,
  postTaskSearchForCompletable,
  searchCaseWorker,
  searchTask
} from '.';
import authInterceptor from '../lib/middleware/auth';
import { getLocationById, getLocations } from './locationController';
import { postFindPersonSearch } from './personService';

const router = Router({ mergeParams: true });

router.use(authInterceptor);

router.use('/task/:taskId/:action', postTaskAction);
router.use('/task/:taskId', getTask);
router.use('/task', searchTask);
router.use('/taskWithPagination', searchTask);

router.use('/location/:locationId', getLocationById);
router.use('/location', getLocations);

router.use('/caseworker/location/:locationId/service/:serviceId', getCaseWorkersForLocationAndService);
router.use('/caseworker/location/:locationId', getAllCaseWorkersForLocation);
router.use('/caseworker/service/:serviceId', getCaseWorkersForService);
router.use('/caseworker/search', searchCaseWorker);
router.use('/caseworker', getAllCaseWorkers);

router.use('/judicialworker', getAllJudicialWorkers);

router.use('/searchForCompletable', postTaskSearchForCompletable);

router.use('/findPerson', postFindPersonSearch);

export default router;
