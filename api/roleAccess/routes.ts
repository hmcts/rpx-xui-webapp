import { Router } from 'express';
import authInterceptor from '../lib/middleware/auth';
import { confirmUserExclusion, deleteUserExclusion, findExclusionsForCaseId } from './exclusionService';
import { confirmAllocateRole,
  createSpecificAccessApprovalRole,
  deleteRoleByCaseAndRoleId,
  getJudicialUsers,
  getRolesByCaseId,
  reallocateRole } from './index';
import { getPossibleRoles } from './roleAssignmentService';

const router = Router({ mergeParams: true });
router.use(authInterceptor);

router.post('/exclusions/post', findExclusionsForCaseId);
router.post('/exclusions/confirm', confirmUserExclusion);
router.post('/exclusions/delete', deleteUserExclusion);

router.post('/allocate-role/confirm', confirmAllocateRole);
router.post('/allocate-role/reallocate', reallocateRole);
router.post('/allocate-role/delete', deleteRoleByCaseAndRoleId);

router.post('/allocate-role/valid-roles', getPossibleRoles);
router.post('/roles/post', getRolesByCaseId);
router.post('/roles/getJudicialUsers', getJudicialUsers);

router.post('/allocate-role/specific-access-approval', createSpecificAccessApprovalRole);

export default router;
