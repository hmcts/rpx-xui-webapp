import { AxiosResponse } from 'axios';
import { createSpecificAccessApprovalRole, deleteRoleByAssignmentId, restoreSpecificAccessRequestRole } from '../roleAccess';
import { postTaskCompletionForAccess } from '../workAllocation2';
import { RoleAssignment } from '../user/interfaces/roleAssignment';
import { refreshRoleAssignmentsSuccess } from './data/booking.mock.data';
// import { getConfigValue } from 'configuration';
import { setHeaders } from '../lib/proxy';
import { http } from '../lib/http';
// import { SERVICES_JUDICIAL_BOOKING_API_PATH } from 'configuration/references';

export async function getBookings(req, resp: Response, next: NextFunction): Promise<Response> {
  // req.body = {
  //   "queryRequest" : {
  //     "userIds" : [ "21334a2b-79ce-44eb-9168-2d49a744be9c" ]
  //   }
  // };

  // const basePath = getConfigValue(SERVICES_JUDICIAL_BOOKING_API_PATH);
  const basePath = `http://am-judicial-booking-service-demo.service.core-compute-demo.internal`;
  const fullPath = `${basePath}/am/bookings/query`;
  const headers = setHeaders(req);
  /* tslint:disable:no-string-literal */
  delete headers['accept'];

  try {
    const response = await http.post(fullPath, {"queryRequest" : {"userIds" : [req.body.userId]}}, { headers });
    return resp.status(response.status).send(response.data);
  } catch (error) {
      next(error)
  }
}

export async function createBooking(req, resp, next): Promise<Response> {
  // const basePath = getConfigValue(SERVICES_JUDICIAL_BOOKING_API_PATH);
  const basePath = `http://am-judicial-booking-service-demo.service.core-compute-demo.internal`;
  const fullPath = `${basePath}/am/bookings`;
  const headers = setHeaders(req);
  /* tslint:disable:no-string-literal */
  delete headers['accept'];

  try {
    const response = await http.post(fullPath, req.body, { headers });
    return resp.status(response.status).send(response.data);
  } catch (error) {
      next(error)
  }
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
    const deletionResponse = await deleteRoleByAssignmentId(req, res, next, req.body.specificAccessStateData.requestId);
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
