import { Router } from 'express';
import authInterceptor from '../lib/middleware/auth';
import { getAllExclusions } from './exclusionService';

const router = Router({ mergeParams: true });
router.use(authInterceptor);

router.use('/exclusions', getAllExclusions);

export default router;
