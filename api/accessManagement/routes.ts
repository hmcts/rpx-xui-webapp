import * as express from 'express';
import { getBookings, postBooking, postCreateRoleAssignment, refreshRoleAssignments } from '.';
import authInterceptor from '../lib/middleware/auth';

const router = express.Router({ mergeParams: true });
router.use(authInterceptor);

// bookings
router.post('/booking', postBooking);
router.get('/bookings', getBookings);
router.post('/role-mapping/judicial/refresh', refreshRoleAssignments);

// Access Case Role Assignment
router.post('/access-management/role-assignment/create', postCreateRoleAssignment);

export default router;
