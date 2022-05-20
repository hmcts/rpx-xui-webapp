import * as express from 'express';
import { approveSpecificAccessRequest, getBookings, postBooking, refreshRoleAssignments } from '.';
import authInterceptor from '../lib/middleware/auth';

const router = express.Router({ mergeParams: true });
router.use(authInterceptor);

router.post('/booking', postBooking);
router.get('/bookings', getBookings);
router.post('/role-mapping/judicial/refresh', refreshRoleAssignments);
router.post('/specific-access-approval', approveSpecificAccessRequest);

export default router;
