import { AxiosResponse } from 'axios';
import { NextFunction, Response } from 'express';
import { createSpecificAccessApprovalRole, deleteRoleByAssignmentId, restoreSpecificAccessRequestRole } from '../roleAccess';
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
  try {
    // attempted to find specific requested role previously to get data but not neccessary
    /* const caseRoles = await getRoleAssignmentForUser(req.body.person.id, req);
    if (!caseRoles) {
      return res.status(400);
    }
    req.body.restoreRole = caseRoles.find(role => role.id === req.body.requestId); */
    // create the specific access approval role
    const firstRoleResponse: AxiosResponse = await createSpecificAccessApprovalRole(req, res, next);
    // 201
    if (!firstRoleResponse || firstRoleResponse.status !== 201) {
      return firstRoleResponse && firstRoleResponse.status ? res.status(firstRoleResponse.status).send(firstRoleResponse) : res.status(400);
    }
    const deletionResponse = await deleteRoleByAssignmentId(req, res, next);
    req.body.rolesToDelete = firstRoleResponse.data.roleAssignmentResponse.requestedRoles;
    if (!deletionResponse || deletionResponse.status !== 204) {
      // delete the roles created previously
      return deleteSpecificAccessRoles(req, res, next, deletionResponse);
    }
    req.body.hasNoAssigneeOnComplete = true;
    req.params.action = 'complete';
    req.params.taskId = req.body.taskId;
    // 204
    const taskResponse: AxiosResponse = await postTaskActionForAccess(req, res, next);
    if (!taskResponse || taskResponse.status !== 204) {
      // restore specific access requested role and delete two created roles
      return restoreDeletedRole(req, res, next, taskResponse);
    }
    // if everything has worked send the last response back to the user
    return res.send(taskResponse.data).status(taskResponse.status);
  }
  catch (error) {
    next(error);
    return res.status(error.status).send(error);
  }
}

// attempts to delete 
export async function deleteSpecificAccessRoles(req, res: Response, next: NextFunction, previousResponse: AxiosResponse<any>): Promise<Response> {
  try {
    req.body.requestId = req.body.rolesToDelete[1].id;
    const specificAccessDeletionResponse = await deleteRoleByAssignmentId(req, res, next);
    if (!specificAccessDeletionResponse || specificAccessDeletionResponse.status !== 204) {
      // retry x 3
      return previousResponse && previousResponse.status ? res.status(previousResponse.status).send(previousResponse) : res.status(400);
    }
    req.body.requestId = req.body.rolesToDelete[0].id;
    const grantedDeletionResponse = await deleteRoleByAssignmentId(req, res, next);
    if (!grantedDeletionResponse || grantedDeletionResponse.status !== 204) {
      // retry x 3
      return previousResponse && previousResponse.status ? res.status(previousResponse.status).send(previousResponse) : res.status(400);
    }
    return previousResponse && previousResponse.status ? res.status(previousResponse.status).send(previousResponse) : res.status(400);
  }
  catch (error) {
    next(error);
    return res.status(error.status).send(error);
  }
}

// attempts to restore the deleted specific access requested role on task completion failure
export async function restoreDeletedRole(req, res: Response, next: NextFunction, previousResponse: AxiosResponse<any>): Promise<Response> {
  try {
    const restoreResponse = await restoreSpecificAccessRequestRole(req, res, next);
    if (!restoreResponse || restoreResponse.status !== 201) {
      // retry x 3
      return previousResponse && previousResponse.status ? res.status(previousResponse.status).send(previousResponse) : res.status(400);
    }
    return deleteSpecificAccessRoles(req, res, next, previousResponse);
  }
  catch (error) {

    next(error);
    return res.status(error.status).send(error);
  }
}

/**
 * Manually creating Elastic search query
 */
export function removeAcceptHeader(proxyReq, req) {
    proxyReq.removeHeader('accept');
}
