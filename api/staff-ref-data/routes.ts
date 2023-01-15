import * as express from 'express';
import authInterceptor from '../lib/middleware/auth';
import { getFilteredUsers, getStaffRefUserDetails, addNewUser, getSkills, getJobTitles, getServices, getUsersByPartialName, getUserTypes } from './staff-ref-data.controller';

const router = express.Router({ mergeParams: true });

router.use(authInterceptor);
router.get('/getFilteredUsers', getFilteredUsers);
router.get('/getUsersByPartialName', getUsersByPartialName);
router.get('/getStaffRefUserDetails/:id', getStaffRefUserDetails);
router.get('/getUserTypes', getUserTypes);
router.get('/getJobTitles', getJobTitles);
router.get('/getSkills', getSkills);
router.get('/getServices', getServices);
router.post('/addNewUser', addNewUser);

export default router;
