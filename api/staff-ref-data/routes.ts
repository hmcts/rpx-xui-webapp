import * as express from 'express';
import authInterceptor from '../lib/middleware/auth';
import {
  addNewUser,
  getFilteredUsers,
  getJobTitles,
  getServices,
  getSkills,
  getStaffRefUsersById,
  getUsersByPartialName,
  getUserTypes,
  updateUser,
} from './real-api';

const router = express.Router({ mergeParams: true });

router.use(authInterceptor);
router.get('/getFilteredUsers', getFilteredUsers);
router.get('/getUsersByPartialName', getUsersByPartialName);
router.post('/getStaffRefUsersById', getStaffRefUsersById);
router.get('/getUserTypes', getUserTypes);
router.get('/getJobTitles', getJobTitles);
router.get('/getSkills', getSkills);
router.get('/getServices', getServices);
router.post('/addNewUser', addNewUser);
router.post('/updateUser', updateUser);

export default router;
