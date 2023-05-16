import * as express from 'express';
import authInterceptor from '../lib/middleware/auth';
import {
  addNewUser,
  fetchSingleUserById,
  fetchUsersById,
  getFilteredUsers,
  getJobTitles,
  getSkills,
  getUsersByPartialName,
  getUserTypes,
  updateUser
} from './staff-ref-data.controller';

const router = express.Router({ mergeParams: true });

router.use(authInterceptor);
router.get('/getFilteredUsers', getFilteredUsers);
router.get('/getUsersByPartialName', getUsersByPartialName);
router.post('/fetchUsersById', fetchUsersById);
router.get('/fetchSingleUserById', fetchSingleUserById);
router.get('/getUserTypes', getUserTypes);
router.get('/getJobTitles', getJobTitles);
router.get('/getSkills', getSkills);
router.post('/addNewUser', addNewUser);
router.post('/updateUser', updateUser);

export default router;
