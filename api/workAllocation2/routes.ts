import { Router } from 'express';
import { getJudicialUsers } from '../roleAccess';

import {
  getAllCaseWorkers,
  getAllCaseWorkersForLocation,
  getCases,
  getMyAccess,
  getCaseWorkersForLocationAndService,
  getCaseWorkersForService,
  getCaseWorkersFromServices,
  getMyCases,
  getRolesCategory,
  getTask,
  getTaskRoles,
  getTasksByCaseId,
  getTasksByCaseIdAndEventId,
  getTypesOfWork,
  postTaskAction,
  postTaskSearchForCompletable,
  searchCaseWorker,
  searchTask,
  showAllocateRoleLink
} from '.';
import authInterceptor from '../lib/middleware/auth';
import { getFullLocations, getLocationById, getLocations } from './locationController';
import { postFindPersonSearch } from './personService';

const router = Router({mergeParams: true});

router.use(authInterceptor);

router.use('/caseworker/location/:locationId/service/:serviceId', getCaseWorkersForLocationAndService);
router.use('/caseworker/location/:locationId', getAllCaseWorkersForLocation);
router.use('/caseworker/service/:serviceId', getCaseWorkersForService);
router.use('/caseworker/search', searchCaseWorker);
router.use('/caseworker', getAllCaseWorkers);
router.use('/retrieveCaseWorkersForServices', getCaseWorkersFromServices);

router.use('/findPerson', postFindPersonSearch);

router.use('/location/:locationId', getLocationById);
router.use('/location', getLocations);
router.use('/full-location', getFullLocations);

router.use('/searchForCompletable', postTaskSearchForCompletable);

router.use('/task/types-of-work', getTypesOfWork);
router.use('/task/:taskId/roles', getTaskRoles);
router.use('/task/:taskId/:action', postTaskAction);
router.use('/task/:taskId', getTask);
router.use('/task', searchTask);

router.use('/case/task/:caseId', getTasksByCaseId);
router.use('/case/tasks/:caseId/event/:eventId/caseType/:caseType/jurisdiction/:jurisdiction', getTasksByCaseIdAndEventId);

router.use('/exclusion/rolesCategory', getRolesCategory);

router.use('/roles/:caseId/show-allocate-role-link', showAllocateRoleLink);

router.use('/my-work/cases', getMyCases);
router.use('/all-work/cases', getCases);

router.use('/getJudicialUsers', getJudicialUsers);
router.use('/my-work/myaccess', getMyAccess);

export default router;
