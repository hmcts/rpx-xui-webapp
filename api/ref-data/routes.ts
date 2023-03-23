import { Router } from 'express';
import authInterceptor from '../lib/middleware/auth';
import { getRegions, getServices } from './index';

export const router = Router({mergeParams: true});
router.use(authInterceptor);

router.get('/services', getServices);
router.get('/regions', getRegions);

export default router;
