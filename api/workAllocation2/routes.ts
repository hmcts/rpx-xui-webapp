import { Router } from 'express';

import {
  getAllCaseWorkers,
  getAllCaseWorkersForLocation,
  getCases,
  getCaseWorkersForLocationAndService,
  getCaseWorkersForService, getMyCases,
  getRolesCategory,
  getTask,
  getTaskRoles,
  getTasksByCaseId,
  getTypesOfWork,
  postTaskAction,
  postTaskSearchForCompletable,
  searchCaseWorker,
  searchTask,
  showAllocateRoleLink
} from '.';
import authInterceptor from '../lib/middleware/auth';
import { getLocationById, getLocations } from './locationController';
import { postFindPersonSearch } from './personService';

const router = Router({mergeParams: true});

router.use(authInterceptor);

router.use('/caseworker/location/:locationId/service/:serviceId', getCaseWorkersForLocationAndService);
router.use('/caseworker/location/:locationId', getAllCaseWorkersForLocation);
router.use('/caseworker/service/:serviceId', getCaseWorkersForService);
router.use('/caseworker/search', searchCaseWorker);
router.use('/caseworker', getAllCaseWorkers);

router.use('/findPerson', postFindPersonSearch);

router.use('/location/:locationId', getLocationById);
router.use('/location', getLocations);

router.use('/searchForCompletable', postTaskSearchForCompletable);

router.use('/task/types-of-work', getTypesOfWork);
router.use('/task/:taskId/roles', getTaskRoles);
router.use('/task/:taskId/:action', postTaskAction);
router.use('/task/:taskId', getTask);
router.use('/task', searchTask);

router.use('/case/task/:caseId', getTasksByCaseId);

router.use('/exclusion/rolesCategory', getRolesCategory);

router.use('/roles/:caseId/show-allocate-role-link', showAllocateRoleLink);

router.use('/my-work/cases', getMyCases);
router.use('/all-work/cases', getCases);

export default router;
