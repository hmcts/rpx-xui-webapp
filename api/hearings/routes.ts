import * as express from 'express';
import authInterceptor from '../lib/middleware/auth';
import {
  cancelHearingRequest, getCaseFlagRefData, getHearings, getRefData,
  loadServiceHearingValues, submitHearingRequest
} from './index';

export const router = express.Router({ mergeParams: true });

router.use(authInterceptor);
router.get('/getHearings', getHearings);
router.get('/getCaseFlagRefData', getCaseFlagRefData);
router.get('/getRefData', getRefData);
router.post('/loadServiceHearingValues', loadServiceHearingValues);
router.post('/submitHearingRequest', submitHearingRequest);
router.delete('/cancelHearings', cancelHearingRequest);
router.get('/getHearingDetail', getHearingDetail);
