import * as express from 'express';
import authInterceptor from '../lib/middleware/auth';
import {
  cancelHearingRequest,
  getHearing,
  getHearingActuals,
  getHearings,
  loadServiceHearingValues,
  submitHearingRequest
} from './index';

export const router = express.Router({mergeParams: true});

router.use(authInterceptor);
// request-amend journey
router.post('/loadServiceHearingValues', loadServiceHearingValues);
router.get('/getHearings', getHearings);
router.get('/getHearing', getHearing);
router.post('/submitHearingRequest', submitHearingRequest);
router.delete('/cancelHearings', cancelHearingRequest);
// actual journey
router.get('/hearingActuals/:hearingId', getHearingActuals);
