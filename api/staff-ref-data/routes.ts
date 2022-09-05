import * as express from 'express';
import authInterceptor from '../lib/middleware/auth';
import { getFilteredUsers } from './index';

const router = express.Router({ mergeParams: true });

router.use(authInterceptor);
router.post('/getFilteredUsers', getFilteredUsers);

export default router;
