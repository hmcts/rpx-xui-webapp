import { getUserSessionTimeout, RoleGroupSessionTimeout } from '@hmcts/rpx-xui-node-lib';
import { AxiosResponse } from 'axios';
import { NextFunction, Response } from 'express';
import { UserInfo } from '../auth/interfaces/UserInfo';
import { getConfigValue } from '../configuration';
import { CASE_SHARE_PERMISSIONS, SERVICES_ROLE_ASSIGNMENT_API_PATH, SESSION_TIMEOUTS } from '../configuration/references';
import { http } from '../lib/http';
import { setHeaders } from '../lib/proxy';
import { LocationInfo, RoleAssignment } from './interfaces/roleAssignment';
import { getMappedRoleCategory, getOrganisationRoles, isCurrentUserCaseAllocator } from './utils';

export async function getUserDetails(req, res: Response, next: NextFunction): Promise<Response> {
  if (!req.session || !req.session.passport || !req.session.passport.user) {
    return res.send({}).status(200);
  }

  try {
    const { roles } = req.session.passport.user.userinfo;

    const permissions = CASE_SHARE_PERMISSIONS.split(',');
    const canShareCases = roles.some(role => permissions.includes(role));
    const sessionTimeouts = getConfigValue(SESSION_TIMEOUTS) as RoleGroupSessionTimeout[];
    const sessionTimeout = getUserSessionTimeout(roles, sessionTimeouts);
    const roleAssignmentInfo = await getUserRoleAssignments(req.session.passport.user.userinfo, req);
    const userInfo = {...req.session.passport.user.userinfo, token: `Bearer ${req.session.passport.user.tokenset.accessToken}`};
    res.send({
      canShareCases,
      roleAssignmentInfo,
      sessionTimeout,
      userInfo,
    });
  } catch (error) {
    next(error);
  }
}

export async function refreshRoleAssignmentForUser(userInfo: UserInfo, req: any): Promise<any []> {
  let locationInfo = [];
  const baseUrl = getConfigValue(SERVICES_ROLE_ASSIGNMENT_API_PATH);
  const id = userInfo.id ? userInfo.id : userInfo.uid;
  const path = `${baseUrl}/am/role-assignments/actors/${id}`;
  const headers = setHeaders(req);
  try {
    const response: AxiosResponse = await http.get(path, { headers });
    locationInfo = getRoleAssignmentInfo(response.data.roleAssignmentResponse);
    const roles = getOrganisationRoles(response.data.roleAssignmentResponse);
    userInfo.roles = userInfo.roles.concat(roles);
    userInfo.roleCategory = getMappedRoleCategory(userInfo.roles, ['LEGAL_OPERATIONS']);
    req.session.roleAssignmentResponse = response.data.roleAssignmentResponse;
  } catch (error) {
    console.log(error);
  }
  return locationInfo;
}

export function getRoleAssignmentInfo(roleAssignmentResponse: RoleAssignment[]): LocationInfo[] {
  const roleAssignmentInfo = [];
  roleAssignmentResponse.forEach(roleAssignment => {
    const isCaseAllocator = isCurrentUserCaseAllocator(roleAssignment);
    const attributes = {...roleAssignment.attributes};
    attributes.isCaseAllocator = isCaseAllocator;
    roleAssignmentInfo.push(attributes);
  });
  return roleAssignmentInfo;
}

export async function getUserRoleAssignments(userInfo: UserInfo, req): Promise<any []> {
  const roleAssignmentInfo = req.session.roleAssignmentResponse ?
                      getRoleAssignmentInfo(req.session.roleAssignmentResponse) :
                      await refreshRoleAssignmentForUser(userInfo, req);
  return roleAssignmentInfo;
}
