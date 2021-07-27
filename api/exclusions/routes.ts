import { Router } from 'express';
import authInterceptor from '../lib/middleware/auth';
import { confirmUserExclusion, getUserExclusions } from './exclusionService';

const router = Router({ mergeParams: true });
router.use(authInterceptor);

router.get('/exclusions', getUserExclusions);
router.post('/exclusions/confirm', confirmUserExclusion);

export default router;
