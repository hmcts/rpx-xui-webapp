import {Router} from 'express';

import {searchTask} from '.';
import authInterceptor from '../lib/middleware/auth';

const router = Router({mergeParams: true});

router.use(authInterceptor);

router.use('/activity', searchTask);

export default router;
