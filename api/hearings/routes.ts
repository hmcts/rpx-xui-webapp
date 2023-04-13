import * as express from 'express';
import authInterceptor from '../lib/middleware/auth';
import {
  cancelHearingRequest,
  deleteLinkedHearingGroup,
  getHearing,
  getHearingActuals,
  getHearings,
  getLinkedHearingGroup,
  postLinkedHearingGroup,
  putLinkedHearingGroup,
  submitHearingActuals,
  submitHearingRequest,
  updateHearingActuals,
  updateHearingRequest
} from './hmc.index';
import {
  loadLinkedCasesWithHearings,
  loadServiceHearingValues,
  loadServiceLinkedCases
} from './services.index';

export const router = express.Router({ mergeParams: true });

router.use(authInterceptor);
// ------request-amend hearing APIs start------
router.post('/loadServiceHearingValues', loadServiceHearingValues);
router.get('/getHearings', getHearings);
router.get('/getHearing', getHearing);
router.post('/submitHearingRequest', submitHearingRequest);
router.put('/updateHearingRequest', updateHearingRequest);
router.delete('/cancelHearings', cancelHearingRequest);
// ------request-amend hearing APIs end------
// ------actual hearing APIs start------
router.get('/hearingActuals/:hearingId', getHearingActuals);
router.put('/hearingActuals', updateHearingActuals);
router.post('/hearingActualsCompletion/:hearingId', submitHearingActuals);
// ------actual hearing APIs end------
// ------link hearing APIs start------
router.post('/loadServiceLinkedCases', loadServiceLinkedCases);
router.post('/loadLinkedCasesWithHearings', loadLinkedCasesWithHearings);
router.get('/getLinkedHearingGroup', getLinkedHearingGroup);
router.post('/postLinkedHearingGroup', postLinkedHearingGroup);
router.put('/putLinkedHearingGroup', putLinkedHearingGroup);
router.delete('/deleteLinkedHearingGroup', deleteLinkedHearingGroup);
// ------link hearing APIs end------
