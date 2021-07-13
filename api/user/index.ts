import { getUserSessionTimeout, RoleGroupSessionTimeout } from '@hmcts/rpx-xui-node-lib'
import { UserInfo } from 'auth/interfaces/UserInfo'
import { AxiosResponse } from 'axios'
import { NextFunction, Response } from 'express'
import { getConfigValue } from '../configuration'
import { CASE_SHARE_PERMISSIONS, SERVICES_ROLE_ASSIGNMENT_API_PATH, SESSION_TIMEOUTS } from '../configuration/references'
import { http } from '../lib/http'
import { setHeaders } from '../lib/proxy'
import { isCurrentUserCaseAllocator } from './utils'

export async function getUserDetails(req, res: Response, next: NextFunction) {

  try {
    const { roles } = req.session.passport.user.userinfo

    const permissions = CASE_SHARE_PERMISSIONS.split(',')
    const canShareCases = roles.some(role => permissions.includes(role))
    const sessionTimeouts = getConfigValue(SESSION_TIMEOUTS) as RoleGroupSessionTimeout[]
    const sessionTimeout = getUserSessionTimeout(roles, sessionTimeouts)
    const locationInfo = await getUserRoleAssignments(req.session.passport.user.userinfo, req)
    const userInfo = {...req.session.passport.user.userinfo, token: `Bearer ${req.session.passport.user.tokenset.accessToken}`}
    res.send({
      canShareCases,
      locationInfo,
      sessionTimeout,
      userInfo,
    })
  } catch (error) {
    next(error)
  }
}

export async function getUserRoleAssignments(userInfo: UserInfo, req): Promise<any []> {
  const locationInfo = req.session.roleAssignmentResponse ?
                      getLocationInfo(req.session.roleAssignmentResponse) :
                      await getRoleAssignmentForUser(userInfo, req);
  return locationInfo
}

export async function getRoleAssignmentForUser(userInfo: UserInfo, req: any): Promise<any []> {
  let locationInfo = []
  const baseUrl = getConfigValue(SERVICES_ROLE_ASSIGNMENT_API_PATH)
  const id = userInfo.id ? userInfo.id : userInfo.uid
  const path = `${baseUrl}/am/role-assignments/actors/${id}`
  const headers = setHeaders(req)
  try {
    const response: AxiosResponse = await http.get(path, { headers })
    locationInfo = getLocationInfo(response.data.roleAssignmentResponse)
    req.session.roleAssignmentResponse = response.data.roleAssignmentResponse
  } catch (error) {
    console.log(error)
  }
  return locationInfo
}

export function getLocationInfo(roleAssignmentResponse: any): any [] {
  const locationInfo = [];
  roleAssignmentResponse.forEach(roleAssignment => {
    if (roleAssignment.attributes.primaryLocation) {
      const isCaseAllocator = isCurrentUserCaseAllocator(roleAssignment);
      const attributes = {...roleAssignment.attributes}
      attributes.isCaseAllocator = isCaseAllocator
      locationInfo.push(attributes)
    }
  });
  return locationInfo
}
