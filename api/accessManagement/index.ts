import { NextFunction, Response } from 'express';
import { bookingResponse, bookings, refreshRoleAssignmentsSuccess } from './data/booking.mock.data';

export async function getBookings(req, res: Response, next: NextFunction): Promise<Response> {
  if (!bookings) {
    return res.status(404).send('{"errorMessage": "Resource Not found}"');
  } else {
    return res.send(bookings);
  }
}

export async function postBooking(req, res: Response, next: NextFunction): Promise<Response> {
  return res.send(bookingResponse);
}

export async function refreshRoleAssignments(req, res: Response, next: NextFunction): Promise<Response> {
  return res.send(refreshRoleAssignmentsSuccess);
}
