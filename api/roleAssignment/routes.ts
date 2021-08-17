import { Router } from 'express';
import authInterceptor from '../lib/middleware/auth';
import { getJudicialRoles, getLegalOpsRoles } from './roleAssignmentService';

const router = Router({ mergeParams: true });
router.use(authInterceptor);

router.get('/judiciary/get', getJudicialRoles);
router.get('/legal-ops/get', getLegalOpsRoles);

export default router;
