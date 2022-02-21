import * as express from 'express';
import authInterceptor from '../lib/middleware/auth';
import {
  cancelHearingRequest,
  getCaseFlagRefData,
  getHearing,
  getHearingActuals,
  getHearings,
  getRefData,
  loadServiceHearingValues,
  submitHearingRequest,
  updateHearingActuals
} from './index';

export const router = express.Router({ mergeParams: true });

router.use(authInterceptor);
router.get('/hearingActuals/:hearingId', getHearingActuals);
router.get('/updateHearingActuals', updateHearingActuals);
router.get('/getHearings', getHearings);
router.get('/getHearing', getHearing);
router.get('/getCaseFlagRefData', getCaseFlagRefData);
router.get('/getRefData', getRefData);
router.post('/loadServiceHearingValues', loadServiceHearingValues);
router.post('/submitHearingRequest', submitHearingRequest);
router.delete('/cancelHearings', cancelHearingRequest);
