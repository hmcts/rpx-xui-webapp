import * as express from 'express';
import { getUserDetails } from './index';

const router = express.Router({ mergeParams: true });

router.use('/o/userinfo', getUserDetails);

export default router;
