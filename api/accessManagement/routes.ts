import * as express from 'express';
import { approveSpecificAccessRequest, createBooking, getBookings, refreshRoleAssignments } from '.';
import authInterceptor from '../lib/middleware/auth';

const router = express.Router({ mergeParams: true });
router.use(authInterceptor);

router.post('/createBooking', createBooking);
router.post('/getBookings', getBookings);
router.post('/role-mapping/judicial/refresh', refreshRoleAssignments);
router.post('/specific-access-approval', approveSpecificAccessRequest);

export default router;
