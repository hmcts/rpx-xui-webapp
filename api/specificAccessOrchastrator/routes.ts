// router.use('/specific-access-orchastrator', specificAccessOrcahastratorRouter);
import * as express from 'express';
import authInterceptor from '../lib/middleware/auth';
// import { specificAccessRequestCreateAmRole } from './index';

export const router = express.Router({mergeParams: true});
//router.use(authInterceptor);



//router.post('', specificAccessRequest);
// router.post('/', specificAccessRequestCreateAmRole);
// router.post('/specificAccessRequest', specificAccessRequest);
//router.post('/role-assignments1', specificAccessRequest);


