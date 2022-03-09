import * as express from 'express';
import authInterceptor from '../lib/middleware/auth';
import {
  cancelHearingRequest,
  deleteLinkedHearingGroup,
  getHearing,
  getHearingActuals,
  getHearings,
  getLinkedHearingGroup,
  loadServiceHearingValues,
  loadServiceLinkedCases,
  postLinkedHearingGroup,
  putLinkedHearingGroup,
  submitHearingActuals,
  submitHearingRequest,
  updateHearingActuals,
  updateHearingRequest
} from './index';

export const router = express.Router({mergeParams: true});

router.use(authInterceptor);
// request-amend hearing journey
router.post('/loadServiceHearingValues', loadServiceHearingValues);
router.get('/getHearings', getHearings);
router.get('/getHearing', getHearing);
router.post('/submitHearingRequest', submitHearingRequest);
router.put('/updateHearingRequest', updateHearingRequest);
router.delete('/cancelHearings', cancelHearingRequest);
// actual hearing journey
router.get('/hearingActuals/:hearingId', getHearingActuals);
router.put('/hearingActuals/:hearingId', updateHearingActuals);
router.post('/hearingActualsCompletion/:hearingId', submitHearingActuals);
// link hearing journey
router.post('/loadServiceLinkedCases', loadServiceLinkedCases);
router.get('/getLinkedHearingGroup', getLinkedHearingGroup);
router.post('/postLinkedHearingGroup', postLinkedHearingGroup);
router.put('/putLinkedHearingGroup', putLinkedHearingGroup);
router.delete('/deleteLinkedHearingGroup', deleteLinkedHearingGroup);
