import { NextFunction, Response } from 'express';
import {
  bookingResponse,
  bookingResponseError,
  bookings, createRoleAssignmentResponse,
  createRoleAssignmentsError,
  refreshRoleAssignmentsSuccess
} from './data/booking.mock.data';

export async function getBookings(req, res: Response, next: NextFunction): Promise<Response> {
  if (!bookings) {
    return res.status(404).send('{"errorMessage": "Resource Not found}"');
  } else {
    return res.send(bookings);
  }
}

export async function postBooking(req, res: Response, next: NextFunction): Promise<Response> {
  // Unhappy paths are part of https://tools.hmcts.net/jira/browse/EUI-4783
  // return res.status(402).send(bookingResponseError);
  return res.send(bookingResponse);
}

export async function refreshRoleAssignments(req, res: Response, next: NextFunction): Promise<Response> {
  return res.send(refreshRoleAssignmentsSuccess);
}

export const createRoleAssignments = async (req, res: Response, next: NextFunction): Promise<Response> => {
  // return res.status(400).send(createRoleAssignmentsError);
  return res.send(createRoleAssignmentResponse);
};

/**
 * Manually creating Elastic search query
 */
export function removeAcceptHeader(proxyReq, req) {
    proxyReq.removeHeader('accept');
}
