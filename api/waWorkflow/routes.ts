import { Router } from 'express';
import { postCreateTask } from '../waWorkflow';
import authInterceptor from '../lib/middleware/auth';

export const router = Router({mergeParams: true});
router.use(authInterceptor);
router.use('/createTask', postCreateTask);

export default router;
