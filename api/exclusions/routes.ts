import { Router } from 'express';
import authInterceptor from '../lib/middleware/auth';
import { confirmUserExclusion, deleteUserExclusion, getUserExclusions } from './exclusionService';

const router = Router({ mergeParams: true });
router.use(authInterceptor);

router.get('/get', getUserExclusions);
router.post('/confirm', confirmUserExclusion);
router.post('/delete', deleteUserExclusion);

export default router;
