import * as express from 'express';
import authInterceptor from '../lib/middleware/auth';
import { getFilteredUsers, getJobTitles, getSkills, getUserTypes } from './index';

const router = express.Router({ mergeParams: true });

router.use(authInterceptor);
router.post('/getFilteredUsers', getFilteredUsers);

router.get('/getUserTypes', getUserTypes);
router.get('/getJobTitles', getJobTitles);
router.get('/getSkills', getSkills);

export default router;
