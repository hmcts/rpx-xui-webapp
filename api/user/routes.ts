import * as express from 'express';
import { getUserExclusions } from '../exclusions/exclusionService';
import { getUserDetails } from './index';

const router = express.Router({ mergeParams: true });

router.use('/details', getUserDetails);
router.use('/exclusions', getUserExclusions);

export default router;
