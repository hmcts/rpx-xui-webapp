import * as express from 'express';
import authInterceptor from '../../lib/middleware/auth';
import { getCaseFlagRefData } from './index';

export const router = express.Router({ mergeParams: true });

router.use(authInterceptor);
router.get('/getCaseFlagRefData', getCaseFlagRefData);
