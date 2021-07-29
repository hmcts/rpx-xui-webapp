import * as express from 'express';
import { confirmUserExclusion, deleteUserExclusion, getUserExclusions } from '../exclusions/exclusionService';
import { getUserDetails } from './index';

const router = express.Router({ mergeParams: true });

router.use('/details', getUserDetails);
router.get('/exclusions', getUserExclusions);
router.post('/exclusions/confirm', confirmUserExclusion);
router.post('/exclusions/delete', deleteUserExclusion);

export default router;
