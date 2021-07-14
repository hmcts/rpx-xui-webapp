import { Router } from 'express';
import authInterceptor from '../lib/middleware/auth';
import { getUserExclusions } from './exclusionService';

const router = Router({ mergeParams: true });
router.use(authInterceptor);

router.use('/exclusions', getUserExclusions);

export default router;
