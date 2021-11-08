import * as express from 'express';
import authInterceptor from '../lib/middleware/auth';
import {getHearings, getStages} from './index';

export const router = express.Router({mergeParams: true});

router.use(authInterceptor);
router.get('/getHearings', getHearings);
router.get('/getStages', getStages);
