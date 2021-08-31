import { Router } from 'express';
import authInterceptor from '../lib/middleware/auth';
import { confirmUserExclusion, deleteUserExclusion, getUserExclusions } from './exclusionService';
import { confirmAllocateRole, deleteRoleByCaseAndRoleId, reallocateRole } from './index';
import { getPossibleRoles } from './roleAssignmentService';

const router = Router({ mergeParams: true });
router.use(authInterceptor);

router.get('/exclusions/get', getUserExclusions);
router.post('/exclusions/confirm', confirmUserExclusion);
router.post('/exclusions/delete', deleteUserExclusion);

router.post('/allocate-role/confirm', confirmAllocateRole);
router.post('/allocate-role/reallocate', reallocateRole);
router.post('/allocate-role/delete', deleteRoleByCaseAndRoleId);

router.get('/allocate-role/valid-roles', getPossibleRoles);

export default router;
