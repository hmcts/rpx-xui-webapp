import * as express from 'express';
import authInterceptor from '../lib/middleware/auth';
import {getLocations, getLocationsById} from './index';

export const router = express.Router({mergeParams: true});

router.use(authInterceptor);
router.get('/getLocationsById', getLocationsById);
router.get('/getLocations', getLocations);
