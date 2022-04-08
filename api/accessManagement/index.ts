import { AxiosResponse } from 'axios';
import { NextFunction, Response } from 'express';
import { getConfigValue } from '../configuration';
import { SERVICES_ROLE_ASSIGNMENT_API_PATH, SERVICES_WORK_FLOW_API_PATH } from '../configuration/references';
import { EnhancedRequest } from '../lib/models';
import { handlePost } from '../workAllocation2/util';
import { bookingResponse, bookings, refreshRoleAssignmentsSuccess } from './data/booking.mock.data';
import { ActorType, Classification, GrantType, MainSectionResponse, RoleCategory, RoleType } from './models';
import { MainSectionRequest } from './models/role-assignment/request';
import { WorkFlowRequest } from './models/work-flow/work-flow-request.model';

export async function getBookings(req, res: Response, next: NextFunction): Promise<Response> {
  if (!bookings) {
    return res.status(404).send('{"errorMessage": "Resource Not found}"');
  } else {
    return res.send(bookings);
  }
}

export async function postBooking(req, res: Response, next: NextFunction): Promise<Response> {
  // Unhappy paths are part of https://tools.hmcts.net/jira/browse/EUI-4783
  // return res.status(400).send(refreshRoleAssignmentsError);
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

export async function postCreateRoleAssignment(req: EnhancedRequest, res: Response, next: NextFunction) {
    const mainSectionRequest: MainSectionRequest = req.body;
    const currentUser = req.session.passport.user.userinfo;
    mainSectionRequest.roleRequest.assignerId = currentUser.id ? currentUser.id : currentUser.uid;
    // const date = new Date();
    // const dateEnd = new Date();
    mainSectionRequest.roleRequest.replaceExisting = false;
    // mainSectionRequest.requestedRoles = [
    //   {
    //     actorIdType: ActorType.IDAM,
    //     actorId: '85ade811-71c6-4cca-9356-59f7ecc1ccb5',
    //     roleType: RoleType.CASE,
    //     roleName: 'caseworker',
    //     classification: Classification.PUBLIC,
    //     grantType: GrantType.CHALLENGED,
    //     roleCategory: RoleCategory.LEGAL_OPERATIONS,
    //     readOnly: false,
    //     beginTime: date.toISOString(),
    //     endTime: dateEnd.toISOString(),
    //   }
  // ];
    const basePath = getConfigValue(SERVICES_ROLE_ASSIGNMENT_API_PATH);
    const fullPath = `${basePath}/am/role-assignments`;
    try {
      const response: AxiosResponse<MainSectionResponse> = await handlePost(fullPath, mainSectionRequest, req);
      if (response.data) {
        res.send(response);
      }
    } catch (error) {
      next(error);
    }
}


export async function postWorkFlow(req: EnhancedRequest, res: Response, next: NextFunction) {
  const workFlowRequest: WorkFlowRequest = req.body;
  const currentUser = req.session.passport.user.userinfo;
  if (workFlowRequest) {
    if (workFlowRequest.key) {
      // TODO: THROW ERROR
    }
    if (workFlowRequest.tenantId) {
      // TODO: THROW ERROR
    }

    const basePath = getConfigValue(SERVICES_WORK_FLOW_API_PATH);
    const fullPath = `${basePath}/am/role-assignments`;

    try {
      const response: AxiosResponse<any> = await handlePost(fullPath, workFlowRequest, req);
      if (response.data) {
        res.send(response);
      }
    } catch (error) {
      next(error);
    }
  }
}
