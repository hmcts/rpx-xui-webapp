import { Router } from 'express';

import {
  getAllCaseWorkers,
  getAllCaseWorkersForLocation,
  getAllJudicialWorkers,
  getCaseWorkersForLocationAndService,
  getCaseWorkersForService, getPersonRoles,
  getTask,
  postTaskAction,
  postTaskSearchForCompletable,
  searchCase,
  searchCaseWorker,
  searchTask
} from '.';
import authInterceptor from '../lib/middleware/auth';
import { getLocationById, getLocations } from './locationController';
import { postFindPersonSearch } from './personService';

const router = Router({ mergeParams: true });

router.use(authInterceptor);

router.use('/caseWithPagination', searchCase);

router.use('/caseworker/location/:locationId/service/:serviceId', getCaseWorkersForLocationAndService);
router.use('/caseworker/location/:locationId', getAllCaseWorkersForLocation);
router.use('/caseworker/service/:serviceId', getCaseWorkersForService);
router.use('/caseworker/search', searchCaseWorker);
router.use('/caseworker', getAllCaseWorkers);

router.use('/findPerson', postFindPersonSearch);

router.use('/judicialworker', getAllJudicialWorkers);

router.use('/location/:locationId', getLocationById);
router.use('/location', getLocations);

router.use('/searchForCompletable', postTaskSearchForCompletable);

router.use('/task/:taskId/:action', postTaskAction);
router.use('/task/:taskId', getTask);
router.use('/task', searchTask);
router.use('/taskWithPagination', searchTask);

router.use('/exclusion/personRoles', getPersonRoles);

export default router;
