import { NextFunction } from 'express';
import { authenticator } from 'otplib';

import { getConfigValue } from '../configuration';
import { CASEWORKER_PAGE_SIZE, IDAM_SECRET, MICROSERVICE, S2S_SECRET, SERVICES_IDAM_API_URL, SERVICES_IDAM_CLIENT_ID, SERVICE_S2S_PATH, STAFF_SUPPORTED_JURISDICTIONS, SYSTEM_USER_NAME, SYSTEM_USER_PASSWORD } from '../configuration/references';
import { http } from '../lib/http';
import { EnhancedRequest } from '../lib/models';
import { getStaffSupportedJurisdictionsList } from '../staffSupportedJurisdictions';
import { handleNewUsersGet, handlePostRoleAssignments, handlePostRoleAssignmentsWithNewUsers, handleUsersGet } from './caseWorkerService';
import { FullUserDetailCache } from './fullUserDetailCache';
import { baseCaseWorkerRefUrl, baseRoleAssignmentUrl } from './index';
import { CachedCaseworker, LocationApi } from './interfaces/common';
import { StaffProfile, StaffUserDetails } from './interfaces/staffUserDetails';
import { mapUsersToCachedCaseworkers, prepareGetUsersUrl, prepareRoleApiRequest, prepareRoleApiUrl } from './util';

// Configuration
const TTL_IN_SECONDS = 600; // 10 minutes

// Cache state
interface CacheState {
  timestamp: Date | null;
  refreshRoles: boolean;
  cachedUsers: StaffUserDetails[];
  cachedUsersWithRoles: CachedCaseworker[];
}

// Auth tokens
interface AuthTokens {
  serviceAuthToken: string;
  userAuthToken: string;
}

// Module state
const state: CacheState = {
  timestamp: null,
  refreshRoles: false,
  cachedUsers: null,
  cachedUsersWithRoles: null
};

let authTokens: AuthTokens = {
  serviceAuthToken: null,
  userAuthToken: null
};

/**
 * User data fetching functions
 */
export async function fetchUserData(req?: EnhancedRequest, next?: NextFunction): Promise<StaffUserDetails[]> {
  try {
    if (hasTTLExpired() || (!state.cachedUsers || state.cachedUsers.length === 0)) {
      // Need to refresh cache
      state.refreshRoles = true;
      state.cachedUsers = [];
      const jurisdictions = getConfigValue(STAFF_SUPPORTED_JURISDICTIONS);

      let headers;
      if (!req) {
        await getAuthTokens();
        headers = getRequestHeaders();
      }

      // Fetch all user data with pagination
      const allUsers = await fetchAllUserPages(jurisdictions, req, headers);

      // Process and cache the results
      state.cachedUsers = getUniqueUsersFromResponse(allUsers);
    } else {
      state.refreshRoles = false;
    }

    return state.cachedUsers;
  } catch (error) {
    // Handle errors appropriately
    if (state.cachedUsers && state.cachedUsers.length > 0) {
      // Return cached data if available despite error
      return state.cachedUsers;
    }

    // Reset cache on critical errors with no request handler
    if (!next) {
      state.timestamp = null;
      state.refreshRoles = false;
      return null;
    }

    next(error);
  }
}

// Helper function to fetch all pages of user data
async function fetchAllUserPages(
  jurisdictions: string,
  req?: EnhancedRequest,
  headers?: Record<string, string>
): Promise<StaffUserDetails[]> {
  let pageNumber = 0;
  let hasMoreData = true;
  let allUsers: StaffUserDetails[] = [];
  const pageSize = parseInt(getConfigValue(CASEWORKER_PAGE_SIZE));

  while (hasMoreData) {
    const getUsersPath = prepareGetUsersUrl(baseCaseWorkerRefUrl, jurisdictions, pageNumber);

    // Use appropriate method based on context
    const userResponse = req
      ? await handleUsersGet(getUsersPath, req)
      : await handleNewUsersGet(getUsersPath, headers);

    if (!userResponse || userResponse.length === 0) {
      hasMoreData = false;
    } else {
      allUsers = [...allUsers, ...userResponse];

      // Check if this is the last page
      if (userResponse.length < pageSize) {
        hasMoreData = false;
      }
      pageNumber++;
    }
  }

  return allUsers;
}

// For backward compatibility
export async function fetchNewUserData(): Promise<StaffUserDetails[]> {
  return fetchUserData();
}

/**
 * Role assignment functions
 */
export async function fetchRoleAssignments(
  cachedUserData: StaffUserDetails[],
  req: EnhancedRequest,
  next: NextFunction
): Promise<CachedCaseworker[]> {
  try {
    if (state.refreshRoles || !state.cachedUsersWithRoles) {
      const roleAssignments = await fetchRoleAssignmentsFromApi(req);
      state.cachedUsersWithRoles = mapUsersToCachedCaseworkers(cachedUserData, roleAssignments);
      FullUserDetailCache.setUserDetails(state.cachedUsersWithRoles);
    }

    return FullUserDetailCache.getAllUserDetails();
  } catch (error) {
    if (FullUserDetailCache.getAllUserDetails()) {
      return FullUserDetailCache.getAllUserDetails();
    }
    next(error);
  }
}

export async function fetchRoleAssignmentsForNewUsers(
  cachedUserData: StaffUserDetails[]
): Promise<CachedCaseworker[]> {
  try {
    if (state.refreshRoles && !state.cachedUsersWithRoles) {
      const roleAssignments = await fetchRoleAssignmentsWithHeaders();
      state.cachedUsersWithRoles = mapUsersToCachedCaseworkers(cachedUserData, roleAssignments);
      FullUserDetailCache.setUserDetails(state.cachedUsersWithRoles);
    }

    return FullUserDetailCache.getAllUserDetails();
  } catch (error) {
    if (FullUserDetailCache.getAllUserDetails()) {
      return FullUserDetailCache.getAllUserDetails();
    }
    return null;
  }
}

/**
 * Authentication functions
 */
export async function getAuthTokens(): Promise<AuthTokens> {
  try {
    // Get config values for auth tokens
    const microservice = getConfigValue(MICROSERVICE);
    const s2sEndpointUrl = `${getConfigValue(SERVICE_S2S_PATH)}/lease`;
    const s2sSecret = getConfigValue(S2S_SECRET).trim();
    const oneTimePassword = authenticator.generate(s2sSecret);
    const idamPath = getConfigValue(SERVICES_IDAM_API_URL);
    const authURL = `${idamPath}/o/token`;
    const axiosConfig = {
      headers: { 'content-type': 'application/x-www-form-urlencoded' }
    };

    // Get auth token for service-to-service call
    const serviceAuthResponse = await http.post(`${s2sEndpointUrl}`, {
      microservice,
      oneTimePassword
    });

    // Get user auth token
    const authBody = getRequestBody();
    const authResponse = await http.post(authURL, authBody, axiosConfig);

    // Update the module's auth tokens
    authTokens = {
      serviceAuthToken: serviceAuthResponse.data,
      userAuthToken: authResponse.data.access_token
    };

    return authTokens;
  } catch (error) {
    console.log('Cannot get auth tokens', error);
    throw new Error('Failed to obtain authentication tokens');
  }
}

export function hasTTLExpired(): boolean {
  if (!state.timestamp) {
    // Cache not yet initialized
    state.timestamp = new Date();
    return true;
  }

  const hasExpired = Date.now() > state.timestamp.getTime() + (TTL_IN_SECONDS * 1000);

  if (hasExpired) {
    state.timestamp = new Date();
  }

  return hasExpired;
}

export function timestampExists(): boolean {
  return !!state.timestamp;
}

// Helper function for fetching role assignments with request
async function fetchRoleAssignmentsFromApi(req: EnhancedRequest): Promise<any[]> {
  const roleApiPath = prepareRoleApiUrl(baseRoleAssignmentUrl);
  const jurisdictions = getStaffSupportedJurisdictionsList();
  const payload = prepareRoleApiRequest(jurisdictions, null, true);
  const { data } = await handlePostRoleAssignments(roleApiPath, payload, req);
  return data.roleAssignmentResponse;
}

// Helper function for fetching role assignments with headers
async function fetchRoleAssignmentsWithHeaders(): Promise<any[]> {
  const roleApiPath = prepareRoleApiUrl(baseRoleAssignmentUrl);
  const jurisdictions = getStaffSupportedJurisdictionsList();
  const payload = prepareRoleApiRequest(jurisdictions, null, true);
  const roleAssignmentHeaders = {
    ...getRequestHeaders(),
    pageNumber: 0,
    size: 10000
  };
  const { data } = await handlePostRoleAssignmentsWithNewUsers(roleApiPath, payload, roleAssignmentHeaders);
  return data.roleAssignmentResponse;
}

/**
 * User data processing functions
 */
export function getUniqueUsersFromResponse(userResponse: StaffUserDetails[]): StaffUserDetails[] {
  const userIdList = new Set<string>();
  const uniqueUsers: StaffUserDetails[] = [];

  // Process each user
  for (let userIndex = 0; userIndex < userResponse.length; userIndex++) {
    const thisUser = userResponse[userIndex];
    // Normalize service name to uppercase
    thisUser.ccd_service_name = thisUser.ccd_service_name.toUpperCase();
    const memberProfile = thisUser.staff_profile;
    const userServices = [thisUser.ccd_service_name];
    const baseLocationList = [];

    // Skip if we've already processed this user
    if (userIdList.has(memberProfile.id)) {
      continue;
    }

    // Find and merge duplicate user entries with different services
    for (let matchIndex = userIndex + 1; matchIndex < userResponse.length; matchIndex++) {
      const matchingUser = userResponse[matchIndex];
      const isOfSameUser = matchingUser.staff_profile.id === memberProfile.id &&
        !userServices.includes(matchingUser.ccd_service_name.toUpperCase());

      if (isOfSameUser) {
        // Add base location if this is the first match
        if (baseLocationList.length === 0 && memberProfile.base_location?.length > 0) {
          const firstBaseLocation = getFirstBaseLocation(memberProfile, thisUser);
          if (firstBaseLocation) {
            baseLocationList.push(firstBaseLocation);
          }
        }

        userServices.push(matchingUser.ccd_service_name);

        // Add additional base locations
        if (matchingUser.staff_profile.base_location?.length > 0) {
          const newBaseLocation = getNewBaseLocation(baseLocationList, matchingUser);
          if (newBaseLocation) {
            baseLocationList.push(newBaseLocation);
          }
        }
      }
    }

    // Update the user with combined data
    thisUser.ccd_service_names = userServices;
    memberProfile.base_location = baseLocationList?.length > 0 ? baseLocationList : memberProfile.base_location;

    // Save the unique user
    uniqueUsers.push(thisUser);
    userIdList.add(thisUser.staff_profile.id);
  }

  return uniqueUsers;
}

export function getFirstBaseLocation(memberProfile: StaffProfile, matchingUser: StaffUserDetails): LocationApi {
  for (const location of memberProfile.base_location) {
    if (location.is_primary) {
      return {
        location_id: location.location_id,
        location: location.location,
        is_primary: true,
        services: [matchingUser.ccd_service_name]
      };
    }
  }
  return null;
}

export function getNewBaseLocation(baseLocationList: LocationApi[], matchingUser: StaffUserDetails): LocationApi {
  // Find primary location for new service
  let newBaseLocation: LocationApi = null;
  for (const location of matchingUser.staff_profile.base_location) {
    if (location.is_primary) {
      newBaseLocation = {
        location_id: location.location_id,
        location: location.location,
        is_primary: true,
        services: [matchingUser.ccd_service_name]
      };
      break;
    }
  }

  // No primary location found
  if (!newBaseLocation) {
    return null;
  }

  // Check if location already exists with another service
  if (baseLocationList.length > 0) {
    for (let locationIndex = 0; locationIndex < baseLocationList.length; locationIndex++) {
      const currentBaseLocation = baseLocationList[locationIndex];
      if (currentBaseLocation.location_id === newBaseLocation.location_id) {
        currentBaseLocation.services.push(matchingUser.ccd_service_name);
        baseLocationList[locationIndex] = currentBaseLocation;
        return null; // We updated existing location, so don't return a new one
      }
    }
  }

  // Return new location if not found in the list
  return newBaseLocation;
}

export function getRequestHeaders(): Record<string, string> {
  return {
    'content-type': 'application/json',
    'serviceAuthorization': `Bearer ${authTokens.serviceAuthToken}`,
    'authorization': `Bearer ${authTokens.userAuthToken}`
  };
}

// Get the request information from config
export const getRequestBody = (): string => {
  const userName = getConfigValue(SYSTEM_USER_NAME);
  const userPassword = encodeURIComponent(getConfigValue(SYSTEM_USER_PASSWORD));
  const scope = 'openid profile roles manage-user create-user search-user';
  const clientSecret = getConfigValue(IDAM_SECRET);
  const idamClient = getConfigValue(SERVICES_IDAM_CLIENT_ID);
  return `grant_type=password&password=${userPassword}&username=${userName}&scope=${scope}&client_id=${idamClient}&client_secret=${clientSecret}`;
};
