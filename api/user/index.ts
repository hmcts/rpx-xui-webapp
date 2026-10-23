import { getUserSessionTimeout, RoleGroupSessionTimeout } from '@hmcts/rpx-xui-node-lib';
import { AxiosResponse } from 'axios';
import { NextFunction, Response } from 'express';
import { UserInfo } from '../auth/interfaces/UserInfo';
import { getConfigValue } from '../configuration';
import { CASE_SHARE_PERMISSIONS, SERVICES_ROLE_ASSIGNMENT_API_PATH, SESSION_TIMEOUTS } from '../configuration/references';
import { http } from '../lib/http';
import { setHeaders } from '../lib/proxy';
import { exists } from '../lib/util';
import { LocationInfo, RoleAssignment } from './interfaces/roleAssignment';
import {
  getOrganisationRoles,
  getRoleCategoriesFromRoleAssignments,
  getUserRoleCategories,
  isCurrentUserCaseAllocator,
  userDetailsValid,
} from './utils';
import { trackTrace } from '../lib/appInsights';
import { containsDangerousCode } from '../utils';

export async function getUserDetails(req, res: Response, next: NextFunction): Promise<Response> {
  if (!exists(req, 'session.passport.user')) {
    return res.send({}).status(200);
  }
  try {
    const rawUserInfo = req.session.passport.user.userinfo;
    if (!userDetailsValid(rawUserInfo)) {
      return res.send('User details are invalid. This needs to be investigated').status(400);
    }
    const { roles } = rawUserInfo;
    const permissions = CASE_SHARE_PERMISSIONS.split(',');
    const canShareCases = roles?.some((role) => permissions.includes(role));
    const sessionTimeouts = getConfigValue<RoleGroupSessionTimeout[]>(SESSION_TIMEOUTS);
    const sessionTimeout = getUserSessionTimeout(roles, sessionTimeouts);
    const roleAssignmentInfo = await getUserRoleAssignments(rawUserInfo, req);
    const bearerToken = req.session.passport.user.tokenset.accessToken;
    if (containsDangerousCode(bearerToken)) {
      return res.send('Invalid bearer token').status(400);
    }
    const userInfo = { ...rawUserInfo, token: `Bearer ${bearerToken}` };
    const syntheticRoles = getSyntheticRoles(roleAssignmentInfo);
    const allRoles = [...new Set([...userInfo.roles, ...syntheticRoles])];
    userInfo.roles = allRoles;
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

export function getSyntheticRoles(roleAssignments: RoleAssignment[]): string[] {
  let syntheticRoles = [];
  const activeRoleAssignments = getActiveRoleAssignments(roleAssignments, new Date());
  activeRoleAssignments?.forEach((roleAssignment) => {
    if (
      roleAssignment?.substantive === 'Y' &&
      roleAssignment?.jurisdiction &&
      roleAssignment?.roleName &&
      roleAssignment?.roleType &&
      roleAssignment?.roleType.toUpperCase() === 'ORGANISATION'
    ) {
      syntheticRoles = [...syntheticRoles, getSyntheticRole(roleAssignment.jurisdiction, roleAssignment.roleName)];
    }
  });
  syntheticRoles = [...new Set(syntheticRoles)];
  return syntheticRoles;
}

export function getSyntheticRole(jurisdiction: string, roleName: string): string {
  return jurisdiction && roleName ? `${jurisdiction.toLocaleLowerCase()}-${roleName.toLocaleLowerCase()}` : '';
}

export async function refreshRoleAssignmentForUser(userInfo: UserInfo, req: any): Promise<any[]> {
  let userRoleAssignments = [];
  if (userInfo) {
    const baseUrl = getConfigValue(SERVICES_ROLE_ASSIGNMENT_API_PATH);
    const id = userInfo.id ? userInfo.id : userInfo.uid;
    const path = `${baseUrl}/am/role-assignments/actors/${id}`;
    const headers = setHeaders(req);
    if (req.session.roleRequestEtag) {
      // add the last etag (note: could re-use more etags but requires storing of more data)
      headers['If-None-Match'] = req.session.roleRequestEtag;
    }
    delete headers.accept;
    try {
      const response: AxiosResponse = await http.get(path, {
        headers,
        validateStatus: (status) => (status >= 200 && status < 300) || status === 304,
      });

      if (response.status === 304) {
        // as user role assignments are not returned use session to send expected results
        trackTrace('Role assignment service returned 304; using session assignments', {
          functionCall: 'refreshRoleAssignmentForUser',
        });
        userRoleAssignments = setUserRoles(userInfo, req);
        return userRoleAssignments;
      }

      const activeRoleAssignments = getActiveRoleAssignments(response?.data?.roleAssignmentResponse, new Date());
      req.session.roleAssignmentResponse = activeRoleAssignments;
      userRoleAssignments = setUserRoles(userInfo, req);
      req.session.roleRequestEtag = response?.headers?.etag;
    } catch (error) {
      const status = error?.status ?? error?.response?.status;
      trackTrace(`Role assignment refresh failed (HTTP ${status ?? 'unavailable'})`, {
        functionCall: 'refreshRoleAssignmentForUser',
      });
    }
  } else {
    trackTrace('userInfo is null', { functionCall: 'refreshRoleAssignmentForUser' });
  }
  return userRoleAssignments;
}

export function setUserRoles(userInfo: UserInfo, req: any): any[] {
  userInfo.roles = userInfo.roles ? userInfo.roles : [];
  trackTrace('Preparing role assignments', { functionCall: 'setUserRoles' });
  const activeRoleAssignments = req.session.roleAssignmentResponse;
  const userRoleAssignments = getRoleAssignmentInfo(activeRoleAssignments);
  const amRoles = getOrganisationRoles(activeRoleAssignments);
  trackTrace('Organisation roles resolved', { functionCall: 'setUserRoles' });
  addUserRolesIfUnique(userInfo, amRoles);
  trackTrace('Role assignments applied to user info', { functionCall: 'setUserRoles' });
  if (!userInfo.roleCategories || userInfo.roleCategories.length === 0) {
    // only set the role category if not already set
    // this means user will not have to log out and log in to be assigned it properly
    const roleCategories = extractRoleCategories(userRoleAssignments);
    // We assign the role category via the role assignments assigned to user. If not we try IDAM roles
    // getUserRoleCategories is a fallback that appears to rarely, if ever, be used
    const userRoleCategories = getRoleCategoriesFromRoleAssignments(roleCategories);
    userInfo.roleCategories = userRoleCategories.length > 0 ? userRoleCategories : getUserRoleCategories(userInfo.roles);
  }
  return userRoleAssignments;
}

// this will only add roles to userinfo.roles if not present
export function addUserRolesIfUnique(userInfo: UserInfo, amRoles: string[]): void {
  for (const role of amRoles) {
    if (!userInfo.roles.includes(role)) {
      userInfo.roles.push(role);
    }
  }
}

// EXUI-4758 - get all unique role categories from userInfo.roles
export function extractRoleCategories(userRoleAssignments: any[]): string[] {
  return userRoleAssignments
    ? [...new Set(userRoleAssignments.filter((role) => role && !!role.roleCategory).map((role) => role.roleCategory))]
    : [];
}

export function getActiveRoleAssignments(roleAssignments: RoleAssignment[], filterDate: Date): RoleAssignment[] {
  const activeRoleAssignments = (roleAssignments || []).filter((rm) => {
    return rm?.endTime ? filterDate <= new Date(rm.endTime) : true;
  });
  return activeRoleAssignments;
}

export function getRoleAssignmentInfo(roleAssignmentResponse: RoleAssignment[]): LocationInfo[] {
  const roleAssignmentInfo = [];
  roleAssignmentResponse?.forEach((roleAssignment) => {
    const isCaseAllocator = isCurrentUserCaseAllocator(roleAssignment);
    const attributes = { ...roleAssignment?.attributes };
    attributes.isCaseAllocator = isCaseAllocator;
    attributes.roleType = roleAssignment?.roleType;
    attributes.roleName = roleAssignment?.roleName;
    attributes.roleCategory = roleAssignment?.roleCategory;
    attributes.beginTime = roleAssignment?.beginTime;
    attributes.endTime = roleAssignment?.endTime;
    roleAssignmentInfo.push(attributes);
  });
  return roleAssignmentInfo;
}

export async function getUserRoleAssignments(userInfo: UserInfo, req): Promise<any[]> {
  const refreshRoleAssignments = req?.query?.refreshRoleAssignments ? req.query.refreshRoleAssignments === 'true' : false;
  const roleAssignmentInfo =
    req?.session?.roleAssignmentResponse && !refreshRoleAssignments
      ? getRoleAssignmentInfo(req.session.roleAssignmentResponse)
      : await refreshRoleAssignmentForUser(userInfo, req);
  return roleAssignmentInfo;
}
