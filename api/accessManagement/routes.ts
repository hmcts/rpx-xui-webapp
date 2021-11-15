import * as express from 'express';
import { getAuthHeaders, specificAccessRequest } from './index';
import authInterceptor from '../lib/middleware/auth';

const router = express.Router({ mergeParams: true });
router.use(authInterceptor);
router.use('/role-assignments/specific', specificAccessRequest);
router.use('/role-assignments/getAuth', getAuthHeaders);

export default router