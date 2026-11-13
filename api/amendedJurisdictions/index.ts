import { getConfigValue } from '../configuration';
import { JURISDICTIONS } from '../configuration/references';

const jurisdictions = /aggregated\/.+jurisdictions\?/;
const caseworkerUidPlaceholder = /(\/caseworkers\/):uid(?=\/)/;

/**
 * Replace the UI route placeholder with the authenticated user's UID before
 * forwarding the request to CCD Data Store. Data Store validates the UID in
 * the path against the authenticated user.
 */
export const rewriteCaseworkerUid = (proxyReq, req) => {
  const userInfo = req.session?.passport?.user?.userinfo;
  const userId = userInfo?.uid || userInfo?.id;

  if (userId && proxyReq.path) {
    proxyReq.path = proxyReq.path.replace(caseworkerUidPlaceholder, (_match, prefix) => `${prefix}${encodeURIComponent(userId)}`);
  }
};

/**
 * Manually filtering returned jurisdictions
 * to make available jurisdiction in filters array only
 */
export const getJurisdictions = (data, req) => {
  const url = req.originalUrl ?? req.url;
  if (!jurisdictions.test(url)) {
    return data;
  }

  let jurisdictionData = data;
  if (typeof data === 'string') {
    try {
      jurisdictionData = JSON.parse(data);
    } catch {
      return data;
    }
  }
  if (!Array.isArray(jurisdictionData)) {
    return data;
  }

  const filters = getConfigValue(JURISDICTIONS);
  const params = new URLSearchParams(url.split('?')[1]);
  const access = params.get('access');
  const filtered = jurisdictionData.filter((o) => filters.includes(o.id));

  let sessionKey: 'readJurisdictions' | 'createJurisdictions' | 'jurisdictions';
  if (access === 'read') {
    sessionKey = 'readJurisdictions';
  } else if (access === 'create') {
    sessionKey = 'createJurisdictions';
  } else {
    sessionKey = 'jurisdictions';
  }

  if (!req.session[sessionKey]) {
    req.session[sessionKey] = filtered;
  }

  return req.session[sessionKey];
};

/**
 * Utility to get cached jurisdictions from session.
 * Returns the cached jurisdictions array for the given access type, or undefined if not cached.
 */
export const checkCachedJurisdictions = (proxyReq, req) => {
  const url = req.originalUrl ?? req.url;
  if (!jurisdictions.test(url)) {
    return undefined;
  }
  const params = new URLSearchParams(url.split('?')[1]);
  const access = params.get('access');
  let sessionKey: 'readJurisdictions' | 'createJurisdictions' | 'jurisdictions';
  if (access === 'read') {
    sessionKey = 'readJurisdictions';
  } else if (access === 'create') {
    sessionKey = 'createJurisdictions';
  } else {
    sessionKey = 'jurisdictions';
  }
  const cached = req.session[sessionKey];
  if (cached) {
    return cached;
  }
};
