import { Router } from 'express';
import authInterceptor from '../lib/middleware/auth';
import { getServicesRefData } from './index';

export const router = Router({mergeParams: true});
router.use(authInterceptor);

router.get('/services', getServicesRefData);

export default router;
