import * as express from 'express';
import authInterceptor from '../lib/middleware/auth';
import {getLocations, getLocationsById} from './index';

export const router = express.Router({mergeParams: true});

router.use(authInterceptor);
router.post('/getLocationsById', getLocationsById);
router.post('/getLocations', getLocations);
