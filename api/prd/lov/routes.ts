import * as express from 'express';
import authInterceptor from '../../lib/middleware/auth';
import { getLovRefData } from './index';

export const router = express.Router({ mergeParams: true });

router.use(authInterceptor);
router.get('/getLovRefData', getLovRefData);
