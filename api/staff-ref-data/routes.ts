import * as express from 'express';
import authInterceptor from '../lib/middleware/auth';
import { addNewUser } from './index';
import { getFilteredUsers,
         getJobTitles,
         getServices,
         getSkills,
         getStaffRefUserDetails,
         getUsersByPartialName,
         getUserTypes,
         updateUser,
         updateUserStatus

} from './real-api';

const router = express.Router({ mergeParams: true });

router.use(authInterceptor);
router.get('/getFilteredUsers', getFilteredUsers);
router.get('/getUsersByPartialName', getUsersByPartialName);
router.post('/getStaffRefUserDetails', getStaffRefUserDetails);
router.get('/getUserTypes', getUserTypes);
router.get('/getJobTitles', getJobTitles);
router.get('/getSkills', getSkills);
router.get('/getServices', getServices);
router.post('/addNewUser', addNewUser);
router.put('/updateUserStatus/:id', updateUserStatus);
router.post('/updateUser', updateUser);

export default router;
