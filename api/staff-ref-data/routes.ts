import * as express from 'express';
import authInterceptor from '../lib/middleware/auth';
import { getFilteredUsers, getJobTitles, getSkills,
    getStaffRefUserDetails, getUsersByPartialName, getUserTypes, getServices } from './index';

const router = express.Router({ mergeParams: true });

router.use(authInterceptor);
router.post('/getFilteredUsers', getFilteredUsers);
router.get('/getUsersByPartialName', getUsersByPartialName);
router.get('/getStaffRefUserDetails/:id', getStaffRefUserDetails);
router.get('/getUserTypes', getUserTypes);
router.get('/getJobTitles', getJobTitles);
router.get('/getSkills', getSkills);
router.get('/getServices', getServices);

export default router;
