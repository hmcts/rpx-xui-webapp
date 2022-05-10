import * as express from 'express';
import authInterceptor from '../lib/middleware/auth';
import { OrchastrationSpecificAccessRequest } from './index';

export const router = express.Router({mergeParams: true});

router.use(authInterceptor);
router.post('/', OrchastrationSpecificAccessRequest);
