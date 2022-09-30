import * as express from 'express';
import authInterceptor from '../lib/middleware/auth';
import { challengedAccessRouter, challengedAccessSetIsNewFalse } from './index';

export const router = express.Router({mergeParams: true});

router.use(authInterceptor);
router.post('/', challengedAccessRouter);
router.patch('/setIsNewFalse', challengedAccessSetIsNewFalse);
