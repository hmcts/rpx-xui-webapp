import { NextFunction, Response } from 'express';
import { bookingResponse, bookings, refreshRoleAssignmentsSuccess } from './data/booking.mock.data';

export async function getBookings(req, res: Response, next: NextFunction): Promise<Response> {

  // Please Uncomment for each scenario for test, This part will not be merged only test puposes for QA
  // test case 1:
  // bookings = null
  // return res.status(404).send('{"errorMessage": "Resource Not found}"');

  // test case 2:
  // bookings = null
  // return res.send(null);

  // test case 3:
  // bookings = null
  // return res.status(500).send('{"errorMessage": "Internal Server Error}"');

  // test case 4:
  // bookings = null
  // return res.status(401).send('{"errorMessage": "Unauthorized}"');
  // return res.status(403).send('{"errorMessage": "Forbidden}"');

  // Succesfull Case
   return res.send(bookings);
}

export async function postBooking(req, res: Response, next: NextFunction): Promise<Response> {
  // Unhappy paths are part of https://tools.hmcts.net/jira/browse/EUI-4783

  return res.send(bookingResponse);
}

export async function refreshRoleAssignments(req, res: Response, next: NextFunction): Promise<Response> {
  return res.send(refreshRoleAssignmentsSuccess);
}

/**
 * Manually creating Elastic search query
 */
export function removeAcceptHeader(proxyReq, req) {
    proxyReq.removeHeader('accept');
}

