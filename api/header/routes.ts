import * as express from 'express';
import { getHeaderConfig } from './index';

export const router = express.Router({ mergeParams: true });

router.get('/config', getHeaderConfig);
