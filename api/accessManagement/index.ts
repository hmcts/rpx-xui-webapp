import { AxiosResponse } from 'axios';
import { NextFunction, Response } from 'express';
import { createSpecificAccessApprovalRole, deleteRoleByAssignmentId, restoreSpecificAccessRequestRole } from '../roleAccess';
import { postTaskCompletionForAccess } from '../workAllocation2';
import { RoleAssignment } from '../user/interfaces/roleAssignment';
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
    // create the specific access approval role
    const firstRoleResponse: AxiosResponse = await createSpecificAccessApprovalRole(req, res, next);
    // 201
    if (!firstRoleResponse || firstRoleResponse.status !== 201) {
      return firstRoleResponse && firstRoleResponse.status
       ? res.status(firstRoleResponse.status).send(firstRoleResponse) : res.status(400);
    }
    const deletionResponse = await deleteRoleByAssignmentId(req, res, next, req.body.requestId);
    const rolesToDelete: RoleAssignment[] = firstRoleResponse.data.roleAssignmentResponse.requestedRoles;
    if (!deletionResponse || deletionResponse.status !== 204) {
      // delete the roles created previously
      return deleteSpecificAccessRoles(req, res, next, deletionResponse, rolesToDelete);
    }
    // 204
    const taskResponse: AxiosResponse = await postTaskCompletionForAccess(req, res, next);
    if (!taskResponse || taskResponse.status !== 204) {
      // restore specific access requested role and delete two created roles
      return restoreDeletedRole(req, res, next, taskResponse, rolesToDelete);
    }
    // if everything has worked send the last response back to the user
    return res.send(taskResponse.data).status(taskResponse.status);
  } catch (error) {
    next(error);
    return res.status(error.status).send(error);
  }
}

// attempts to delete
// tslint:disable-next-line:max-line-length
export async function deleteSpecificAccessRoles(req, res: Response, next: NextFunction, previousResponse: AxiosResponse<any>, rolesToDelete: RoleAssignment[]): Promise<Response> {
  try {
    const specificAccessDeletionResponse = await deleteRoleByAssignmentId(req, res, next, rolesToDelete[1].id);
    if (!specificAccessDeletionResponse || specificAccessDeletionResponse.status !== 204) {
      // TODO: retry x 3
      return previousResponse && previousResponse.status
       ? res.status(previousResponse.status).send(previousResponse) : res.status(400);
    }
    // Note - the functionality is present but this does not currently work due to AM team restrictions - gives 422 error
    const grantedDeletionResponse = await deleteRoleByAssignmentId(req, res, next, rolesToDelete[0].id);
    if (!grantedDeletionResponse || grantedDeletionResponse.status !== 204) {
      // TODO: retry x 3
      return previousResponse && previousResponse.status
       ? res.status(previousResponse.status).send(previousResponse) : res.status(400);
    }
    return previousResponse && previousResponse.status
     ? res.status(previousResponse.status).send(previousResponse) : res.status(400);
  } catch (error) {
    next(error);
    return res.status(error.status).send(error);
  }
}

// attempts to restore the deleted specific access requested role on task completion failure
// tslint:disable-next-line:max-line-length
export async function restoreDeletedRole(req, res: Response, next: NextFunction, previousResponse: AxiosResponse<any>, rolesToDelete: RoleAssignment[]): Promise<Response> {
  try {
    const restoreResponse = await restoreSpecificAccessRequestRole(req, res, next);
    if (!restoreResponse || restoreResponse.status !== 201) {
      // TODO: retry x 3
      return previousResponse && previousResponse.status
       ? res.status(previousResponse.status).send(previousResponse) : res.status(400);
    }
    return deleteSpecificAccessRoles(req, res, next, previousResponse, rolesToDelete);
  } catch (error) {
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
