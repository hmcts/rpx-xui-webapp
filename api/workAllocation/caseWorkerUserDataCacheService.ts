import { NextFunction } from 'express';
import { authenticator } from 'otplib';

import { getConfigValue } from '../configuration';
import {
  IDAM_SECRET,
  MICROSERVICE,
  S2S_SECRET,
  SERVICES_IDAM_API_URL,
  SERVICES_IDAM_CLIENT_ID,
  SERVICE_S2S_PATH,
  STAFF_SUPPORTED_JURISDICTIONS,
  SYSTEM_USER_NAME,
  SYSTEM_USER_PASSWORD,
} from '../configuration/references';
import { http } from '../lib/http';
import * as log4jui from '../lib/log4jui';
import { EnhancedRequest, JUILogger } from '../lib/models';
import {
  handleNewUsersGet,
  handlePostRoleAssignments,
  handlePostRoleAssignmentsWithNewUsers,
  handleUsersGet,
} from './caseWorkerService';
import { FullUserDetailCache } from './fullUserDetailCache';
import { baseCaseWorkerRefUrl, baseRoleAssignmentUrl } from './index';
import { CachedCaseworker, LocationApi } from './interfaces/common';
import { StaffProfile, StaffUserDetails } from './interfaces/staffUserDetails';
import { mapUsersToCachedCaseworkers, prepareGetUsersUrl, prepareRoleApiRequest, prepareRoleApiUrl } from './util';

// 10 minutes
const TTL = 600;
const logger: JUILogger = log4jui.getLogger('caseworker-cache');

interface RoleCacheSummary {
  roleCategoryAssignmentCount: number;
  roleCategoryCounts: Record<string, number>;
  userCount: number;
  usersWithMultipleRoleCategories: number;
}

let timestamp: Date;
let refreshRoles: boolean;
let initialServiceAuthToken: string;
let initialAuthToken: string;

let cachedUsers: StaffUserDetails[];
let cachedUsersWithRoles: CachedCaseworker[];
let cachedUsersRefreshPromise: Promise<StaffUserDetails[]>;
let cachedUsersWithRolesRefreshPromise: Promise<CachedCaseworker[]>;

function getCacheAgeSeconds(): number | null {
  return timestamp ? Math.floor((Date.now() - timestamp.getTime()) / 1000) : null;
}

function getRoleCacheSummary(users: CachedCaseworker[]): RoleCacheSummary {
  const roleCategoryCounts: Record<string, number> = {};
  const userCount = users?.length || 0;
  const roleCategoryAssignmentCount =
    users?.reduce((total, user) => total + (user.roleCategories?.length || (user.roleCategory ? 1 : 0)), 0) || 0;
  const usersWithMultipleRoleCategoriesList = users?.filter((user) => user.roleCategories?.length > 1) || [];
  const usersWithMultipleRoleCategories = usersWithMultipleRoleCategoriesList.length;
  users?.forEach((user) => {
    const roleCategories = user.roleCategories?.length
      ? user.roleCategories.map((role) => role.roleCategory)
      : [user.roleCategory];
    roleCategories
      .filter((roleCategory) => roleCategory)
      .forEach((roleCategory) => {
        roleCategoryCounts[roleCategory] = (roleCategoryCounts[roleCategory] || 0) + 1;
      });
  });
  return {
    roleCategoryAssignmentCount,
    roleCategoryCounts,
    userCount,
    usersWithMultipleRoleCategories,
  };
}

export async function fetchUserData(req: EnhancedRequest, next: NextFunction): Promise<StaffUserDetails[]> {
  try {
    if (cachedUsersRefreshPromise) {
      logger.debug('Waiting for in-flight caseworker user cache refresh', {
        cachedUsersCount: cachedUsers?.length || 0,
      });
      return await cachedUsersRefreshPromise;
    }

    const ttlExpired = hasTTLExpired();
    const isCacheEmpty = !cachedUsers || cachedUsers.length === 0;
    if (ttlExpired || isCacheEmpty) {
      // hasTTLExpired to determine whether roles require refreshing
      // cachedUsers to ensure rerun if user restarts request early
      refreshRoles = true;
      cachedUsersRefreshPromise = refreshUserData(req, isCacheEmpty, ttlExpired).finally(() => {
        cachedUsersRefreshPromise = null;
      });
      return await cachedUsersRefreshPromise;
    } else {
      refreshRoles = false;
      logger.debug('Using caseworker user cache', {
        cacheAgeSeconds: getCacheAgeSeconds(),
        cachedUsersCount: cachedUsers.length,
      });
    }
    return cachedUsers;
  } catch (error) {
    if (cachedUsers) {
      logger.warn('Using stale caseworker user cache after refresh failure', {
        cachedUsersCount: cachedUsers.length,
        error: error?.message,
      });
      return cachedUsers;
    }
    next(error);
  }
}

async function refreshUserData(req: EnhancedRequest, isCacheEmpty: boolean, ttlExpired: boolean): Promise<StaffUserDetails[]> {
  logger.info('Refreshing caseworker user cache', { cachedUsersCount: cachedUsers?.length || 0, isCacheEmpty, ttlExpired });
  const jurisdictions = getConfigValue(STAFF_SUPPORTED_JURISDICTIONS);
  const getUsersPath: string = prepareGetUsersUrl(baseCaseWorkerRefUrl, jurisdictions);
  const userResponse = await handleUsersGet(getUsersPath, req);
  // EXUI-3967 - Caching may be removed in future in favour of API caching
  cachedUsers = getUniqueUsersFromResponse(userResponse);
  logger.info('Caseworker user cache refreshed', {
    cacheAgeSeconds: getCacheAgeSeconds(),
    rawUserCount: userResponse?.length || 0,
    uniqueUserCount: cachedUsers.length,
  });
  return cachedUsers;
}

// Note: May not be needed once API caching is in effect
export async function fetchNewUserData(): Promise<StaffUserDetails[]> {
  try {
    if (cachedUsersRefreshPromise) {
      logger.debug('Waiting for in-flight caseworker user cache refresh before sign-in', {
        cachedUsersCount: cachedUsers?.length || 0,
      });
      return await cachedUsersRefreshPromise;
    }

    // first ensure that there is no immediate re-caching
    timestamp = new Date();
    refreshRoles = true;
    cachedUsersRefreshPromise = refreshNewUserData().finally(() => {
      cachedUsersRefreshPromise = null;
    });
    return await cachedUsersRefreshPromise;
  } catch (error) {
    if (cachedUsers) {
      logger.warn('Using stale caseworker user cache before sign-in after refresh failure', {
        cachedUsersCount: cachedUsers.length,
        error: error?.message,
      });
      return cachedUsers;
    }
    // in case of error, reset the cache on application start up
    timestamp = null;
    refreshRoles = false;
  }
}

async function refreshNewUserData(): Promise<StaffUserDetails[]> {
  logger.info('Refreshing caseworker user cache before sign-in');
  await getAuthTokens();
  // add the tokens to the request headers
  const caseworkerHeaders = getRequestHeaders();
  const jurisdictions = getConfigValue(STAFF_SUPPORTED_JURISDICTIONS);
  const getUsersPath: string = prepareGetUsersUrl(baseCaseWorkerRefUrl, jurisdictions);
  const userResponse = await handleNewUsersGet(getUsersPath, caseworkerHeaders);
  cachedUsers = getUniqueUsersFromResponse(userResponse);
  logger.info('Caseworker user cache refreshed before sign-in', {
    rawUserCount: userResponse?.length || 0,
    uniqueUserCount: cachedUsers.length,
  });
  return cachedUsers;
}

export async function fetchRoleAssignments(
  cachedUserData: StaffUserDetails[],
  req: EnhancedRequest,
  next: NextFunction
): Promise<CachedCaseworker[]> {
  // note: this has been done to cache role categories
  // it is separate from the above as above caching will be done by backend
  try {
    if (cachedUsersWithRolesRefreshPromise) {
      logger.debug(
        'Waiting for in-flight caseworker role cache refresh',
        getRoleCacheSummary(FullUserDetailCache.getAllUserDetails())
      );
      return await cachedUsersWithRolesRefreshPromise;
    }

    if (refreshRoles || !cachedUsersWithRoles) {
      // refreshRoles to determine whether roles require refreshing
      // cachedUsersWithRoles to ensure rerun if user restarts request early
      cachedUsersWithRolesRefreshPromise = refreshRoleAssignments(cachedUserData, req).finally(() => {
        cachedUsersWithRolesRefreshPromise = null;
      });
      return await cachedUsersWithRolesRefreshPromise;
    } else {
      logger.debug('Using caseworker role cache', getRoleCacheSummary(FullUserDetailCache.getAllUserDetails()));
    }
    return FullUserDetailCache.getAllUserDetails();
  } catch (error) {
    if (FullUserDetailCache.getAllUserDetails()) {
      logger.warn('Using stale caseworker role cache after refresh failure', {
        error: error?.message,
        ...getRoleCacheSummary(FullUserDetailCache.getAllUserDetails()),
      });
      return FullUserDetailCache.getAllUserDetails();
    }
    next(error);
  }
}

async function refreshRoleAssignments(cachedUserData: StaffUserDetails[], req: EnhancedRequest): Promise<CachedCaseworker[]> {
  logger.info('Refreshing caseworker role cache', {
    cachedUsersCount: cachedUserData?.length || 0,
    hasRoleCache: !!cachedUsersWithRoles,
    refreshRoles,
  });
  const roleApiPath: string = prepareRoleApiUrl(baseRoleAssignmentUrl);
  const payload = prepareRoleApiRequest();
  const { data } = await handlePostRoleAssignments(roleApiPath, payload, req);
  const roleAssignments = data.roleAssignmentResponse;
  cachedUsersWithRoles = mapUsersToCachedCaseworkers(cachedUserData, roleAssignments);
  FullUserDetailCache.setUserDetails(cachedUsersWithRoles);
  refreshRoles = false;
  logger.info('Caseworker role cache refreshed', {
    roleAssignmentResponseCount: roleAssignments?.length || 0,
    ...getRoleCacheSummary(cachedUsersWithRoles),
  });
  return FullUserDetailCache.getAllUserDetails();
}

export async function fetchRoleAssignmentsForNewUsers(cachedUserData: StaffUserDetails[]): Promise<CachedCaseworker[]> {
  // note: this has been done to cache role categories
  // it is separate from the above as above caching will be done by backend
  try {
    if (cachedUsersWithRolesRefreshPromise) {
      logger.debug(
        'Waiting for in-flight caseworker role cache refresh before sign-in',
        getRoleCacheSummary(FullUserDetailCache.getAllUserDetails())
      );
      return await cachedUsersWithRolesRefreshPromise;
    }

    if (refreshRoles && !cachedUsersWithRoles) {
      // refreshRoles to determine whether roles require refreshing
      // cachedUsersWithRoles to ensure rerun if user restarts request early
      cachedUsersWithRolesRefreshPromise = refreshRoleAssignmentsForNewUsers(cachedUserData).finally(() => {
        cachedUsersWithRolesRefreshPromise = null;
      });
      return await cachedUsersWithRolesRefreshPromise;
    } else {
      logger.debug('Using caseworker role cache before sign-in', getRoleCacheSummary(FullUserDetailCache.getAllUserDetails()));
    }
    return FullUserDetailCache.getAllUserDetails();
  } catch (error) {
    if (FullUserDetailCache.getAllUserDetails()) {
      logger.warn('Using stale caseworker role cache before sign-in after refresh failure', {
        error: error?.message,
        ...getRoleCacheSummary(FullUserDetailCache.getAllUserDetails()),
      });
      return FullUserDetailCache.getAllUserDetails();
    }
  }
}

async function refreshRoleAssignmentsForNewUsers(cachedUserData: StaffUserDetails[]): Promise<CachedCaseworker[]> {
  logger.info('Refreshing caseworker role cache before sign-in', {
    cachedUsersCount: cachedUserData?.length || 0,
    refreshRoles,
  });
  const roleApiPath: string = prepareRoleApiUrl(baseRoleAssignmentUrl);
  const payload = prepareRoleApiRequest();
  const roleAssignmentHeaders = {
    ...getRequestHeaders(),
    pageNumber: 0,
    size: 10000,
  };
  const { data } = await handlePostRoleAssignmentsWithNewUsers(roleApiPath, payload, roleAssignmentHeaders);
  const roleAssignments = data.roleAssignmentResponse;
  cachedUsersWithRoles = mapUsersToCachedCaseworkers(cachedUserData, roleAssignments);
  FullUserDetailCache.setUserDetails(cachedUsersWithRoles);
  refreshRoles = false;
  logger.info('Caseworker role cache refreshed before sign-in', {
    roleAssignmentResponseCount: roleAssignments?.length || 0,
    ...getRoleCacheSummary(cachedUsersWithRoles),
  });
  return FullUserDetailCache.getAllUserDetails();
}

export async function getAuthTokens(): Promise<void> {
  try {
    // get config values for getting auth tokens
    const microservice = getConfigValue(MICROSERVICE);
    const s2sEndpointUrl = `${getConfigValue(SERVICE_S2S_PATH)}/lease`;
    const s2sSecret = getConfigValue(S2S_SECRET).trim();
    const oneTimePassword = authenticator.generate(s2sSecret);
    const idamPath = getConfigValue(SERVICES_IDAM_API_URL);
    const authURL = `${idamPath}/o/token`;
    const axiosConfig = {
      headers: { 'content-type': 'application/x-www-form-urlencoded' },
    };
    const authBody = getRequestBody();
    // get auth token to use for pre-sign-in API calls
    const serviceAuthResponse = await http.post(`${s2sEndpointUrl}`, {
      microservice,
      oneTimePassword,
    });
    initialServiceAuthToken = serviceAuthResponse.data;
    const authResponse = await http.post(authURL, authBody, axiosConfig);
    initialAuthToken = authResponse.data.access_token;
  } catch (error) {
    logger.warn('Cannot get auth tokens', { error: error?.message });
  }
}

export function hasTTLExpired(): boolean {
  if (!timestamp) {
    // started caching
    timestamp = new Date();
    return true;
  } else if (Date.now() < timestamp.getTime() + TTL * 1000) {
    // use cache if the time is not more than the TTL
    return false;
  }
  // if timestamp has expired then refresh cache
  timestamp = new Date();
  return true;
}

export function timestampExists(): boolean {
  return !!timestamp;
}

// This ensures there are no duplicates
export function getUniqueUsersFromResponse(userResponse: StaffUserDetails[]): StaffUserDetails[] {
  const userIdList = new Set<string>();
  const uniqueUsers: StaffUserDetails[] = [];
  // go through all users
  for (let userIndex = 0; userIndex < userResponse.length; userIndex++) {
    const thisUser = userResponse[userIndex];
    // line below for Civil -> CIVIL to ensure no issues
    thisUser.ccd_service_name = thisUser.ccd_service_name.toUpperCase();
    const memberProfile = thisUser.staff_profile;
    const userServices = [thisUser.ccd_service_name];
    const baseLocationList = [];
    if (!userIdList.has(memberProfile.id)) {
      // if the user is not the same as a previous user, loop through remaining users
      // this should find all duplicates
      for (let matchIndex = userIndex + 1; matchIndex < userResponse.length; matchIndex++) {
        const matchingUser = userResponse[matchIndex];
        const isOfSameUser =
          matchingUser.staff_profile.id === memberProfile.id &&
          !userServices.includes(matchingUser.ccd_service_name.toUpperCase());
        if (isOfSameUser) {
          // putting this here to avoid checking base location unless absolutely necessary
          // will add a first combined base location of first two differing services (iff the user is the same)
          if (baseLocationList.length === 0 && memberProfile.base_location?.length > 0) {
            const firstBaseLocation = getFirstBaseLocation(memberProfile, thisUser);
            if (firstBaseLocation) {
              baseLocationList.push(firstBaseLocation);
            }
          }
          userServices.push(matchingUser.ccd_service_name);
          // will add more combined base locations
          if (matchingUser.staff_profile.base_location?.length > 0) {
            const newBaseLocation = getNewBaseLocation(baseLocationList, matchingUser);
            if (newBaseLocation) {
              baseLocationList.push(newBaseLocation);
            }
          }
        }
      }
      // user has all related services and combined locations
      // note: non-combined locations have services undefined
      thisUser.ccd_service_names = userServices;
      memberProfile.base_location = baseLocationList?.length > 0 ? baseLocationList : memberProfile.base_location;
      // ensure user is not reused
      uniqueUsers.push(thisUser);
      userIdList.add(thisUser.staff_profile.id);
    }
  }
  return uniqueUsers;
}

export function getFirstBaseLocation(memberProfile: StaffProfile, matchingUser: StaffUserDetails): LocationApi {
  for (const location of memberProfile.base_location) {
    if (location.is_primary) {
      const firstBaseLocation = {
        location_id: location.location_id,
        location: location.location,
        is_primary: true,
        services: [matchingUser.ccd_service_name],
      };
      return firstBaseLocation;
    }
  }
  return null;
}

export function getNewBaseLocation(baseLocationList: LocationApi[], matchingUser: StaffUserDetails) {
  let newBaseLocation;
  // first loop finds primary location for new service
  for (const location of matchingUser.staff_profile.base_location) {
    if (location.is_primary) {
      newBaseLocation = {
        location_id: location.location_id,
        location: location.location,
        is_primary: true,
        services: [matchingUser.ccd_service_name],
      };
      break;
    }
  }
  let matchFound = false;
  // check if location exists with another service
  if (baseLocationList.length > 0 && newBaseLocation) {
    for (let locationIndex = 0; locationIndex < baseLocationList.length; locationIndex++) {
      const currentBaseLocation = baseLocationList[locationIndex];
      if (currentBaseLocation.location_id === newBaseLocation.location_id) {
        currentBaseLocation.services.push(matchingUser.ccd_service_name);
        baseLocationList[locationIndex] = currentBaseLocation;
        matchFound = true;
        break;
      }
    }
  }
  // if location does not already exist in user locations, add it
  if (!matchFound && newBaseLocation) {
    return newBaseLocation;
  }
}

export function getRequestHeaders(): any {
  return {
    'content-type': 'application/json',
    serviceAuthorization: `Bearer ${initialServiceAuthToken}`,
    authorization: `Bearer ${initialAuthToken}`,
  };
}

// get the request information from config - similarly in node-lib
export const getRequestBody = (): string => {
  const userName = getConfigValue(SYSTEM_USER_NAME);
  const userPassword = encodeURIComponent(getConfigValue(SYSTEM_USER_PASSWORD));
  const scope = 'openid profile roles manage-user create-user search-user';
  const clientSecret = getConfigValue(IDAM_SECRET);
  const idamClient = getConfigValue(SERVICES_IDAM_CLIENT_ID);
  return `grant_type=password&password=${userPassword}&username=${userName}&scope=${scope}&client_id=${idamClient}&client_secret=${clientSecret}`;
};
