import * as express from 'express';
import { confirmUserExclusion, getUserExclusions } from '../exclusions/exclusionService';
import { getUserDetails } from './index';

const router = express.Router({ mergeParams: true });

router.use('/details', getUserDetails);
router.get('/exclusions', getUserExclusions);
router.post('/exclusions/confirm', confirmUserExclusion);

export default router;
