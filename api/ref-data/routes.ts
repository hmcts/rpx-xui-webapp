import { Router } from 'express';
import authInterceptor from '../lib/middleware/auth';
import { getLocations, getLocationsByServiceCode, getRegions, getServices } from './index';

export const router = Router({ mergeParams: true });
router.use(authInterceptor);

router.get('/services', getServices);
router.get('/regions', getRegions);
router.get('/locations-by-service-code', getLocationsByServiceCode);
router.get('/locations', getLocations);

export default router;
