import { Jurisdiction } from '@hmcts/ccd-case-ui-toolkit';
import { AxiosResponse } from 'axios';
import { NextFunction, Response } from 'express';
import { handlePost } from 'workAllocation2/util';
import { EnhancedRequest } from '../lib/models';
import { bookingResponse, bookings, refreshRoleAssignmentsSuccess } from './data/booking.mock.data';
import { ActorType, Classification, GrantType, RoleCategory, RoleType } from './models';
import { MainSectionRequest } from './models/role-assignment/request';

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
    const mainSectionRequest: MainSectionRequest = req.body.mainSection;
    const currentUser = req.session.passport.user.userinfo;
    mainSectionRequest.roleRequest.assignerId = currentUser.id ? currentUser.id : currentUser.uid;
    mainSectionRequest.roleRequest.replaceExisting = false;
    mainSectionRequest.requestedRoles = [
      {
        actorIdType: ActorType.IDAM,
        actorId: 'guid',
        roleType: RoleType.ORGANISATION,
        roleName: 'name',
        classification: Classification.PUBLIC,
        grantType: GrantType.BASIC,
        roleCategory: RoleCategory.LEGAL_OPERATIONS,
        readOnly: false,
        beginTime: Date.now.toString(),
        endTime: Date.now.toString(),
      }
    ];
    const path = '';
    try {
      const response: AxiosResponse<MainSectionRequest> = await handlePost(path, mainSectionRequest, req);
      if (response.data) {
        res.send(response);
      }
    } catch (error) {
      next(error);
    }
}
