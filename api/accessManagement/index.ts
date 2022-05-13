import { AxiosResponse } from 'axios';
import { NextFunction, Response } from 'express';
import { createSpecificAccessApprovalRole, deleteRoleByAssignmentId } from '../roleAccess';
import { postTaskActionForAccess } from '../workAllocation2';
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
  return res.send(bookingResponse);
}

export async function refreshRoleAssignments(req, res: Response, next: NextFunction): Promise<Response> {
  return res.send(refreshRoleAssignmentsSuccess);
}

// node layer logic for approving specific access request
export async function approveSpecificAccessRequest(req, res: Response, next: NextFunction): Promise<Response> {
  // create the specific access approval role
  const firstRoleResponse: AxiosResponse = await createSpecificAccessApprovalRole(req, res, next);
  let deletionStatus = null;
  if (firstRoleResponse) {
    deletionStatus = await deleteRoleByAssignmentId(req, res, next);
    /* const assignmentId = req.requestIid;
    const baseRoleAccessUrl = getConfigValue(SERVICES_ROLE_ASSIGNMENT_API_PATH);
        const basePath = `${baseRoleAccessUrl}/am/role-assignments`;
        const deleteBody = { assigmentId: assignmentId };
        const deleteResponse =   await sendDelete(`${basePath}/${assignmentId}`, deleteBody, req);
        if (!deleteResponse || deleteResponse.status !== 204) {
          return res.status(deleteResponse.status).send(deleteResponse);
        } */
    if (deletionStatus) {
      req.body.hasNoAssigneeOnComplete = true;
      req.params.action = 'complete';
      req.params.taskId = req.body.taskId;
      const taskResponse: AxiosResponse = await postTaskActionForAccess(req, res, next);
      return res.send(taskResponse.data).status(firstRoleResponse.status);
    } else {
      // check failures - remove reviewed roles
    }
  } else {
    return;
  }
  // create the actual role with e.g. specific-access-caseworker
  return res.send(firstRoleResponse.data).status(firstRoleResponse.status);
}

/**
 * Manually creating Elastic search query
 */
export function removeAcceptHeader(proxyReq, req) {
    proxyReq.removeHeader('accept');
}
