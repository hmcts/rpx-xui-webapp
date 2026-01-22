import { getConfigValue } from '../configuration';
import { JURISDICTIONS } from '../configuration/references';

const jurisdictions = /aggregated\/.+jurisdictions\?/;

/**
 * Manually filtering returned jurisdictions
 * to make available jurisdiction in filters array only
 * and reducing the data size by only keeping the required fields
 */
export const getJurisdictions = (proxyRes, req, res, data: any[]) => {
  if (!Array.isArray(data) || !jurisdictions.test(req.url)) {
    return data;
  }

  const filters = getConfigValue(JURISDICTIONS);
  const filteredJurisdictions = [...data]
    .filter((o) => filters.includes(o.id))
    .map((jurisdiction) => {
      const result: any = {
        id: jurisdiction.id
      };

      if (jurisdiction.name !== undefined) {
        result.name = jurisdiction.name;
      }

      // Include empty description to satisfy CCD toolkit types
      result.description = '';

      if (jurisdiction.caseTypes !== undefined) {
        result.caseTypes = jurisdiction.caseTypes.map((caseType) => {
          const mappedCaseType: any = {
            id: caseType.id,
            name: caseType.name,
            description: '', // Empty - not displayed in UI
            events: [], // Empty array to satisfy type requirement - not used in UI
            states: []
          };

          if (caseType.states) {
            mappedCaseType.states = caseType.states.map((state) => ({
              id: state.id,
              name: state.name,
              description: state.description || '' // Keep description as it's displayed in UI
            }));
          }

          return mappedCaseType;
        });
      }

      return result;
    });

  // Determine session key based on access type
  const params = new URLSearchParams(req.url.split('?')[1] || '');
  const access = params.get('access');
  let sessionKey: 'readJurisdictions' | 'createJurisdictions' | 'jurisdictions';
  if (access === 'read') {
    sessionKey = 'readJurisdictions';
  } else if (access === 'create') {
    sessionKey = 'createJurisdictions';
  } else {
    sessionKey = 'jurisdictions';
  }

  req.session[sessionKey] = filteredJurisdictions;
  return req.session[sessionKey];
};

/**
 * Utility to get cached jurisdictions from session.
 * Returns the cached jurisdictions array for the given access type, or undefined if not cached.
 */
export const checkCachedJurisdictions = (proxyReq, req) => {
  if (!jurisdictions.test(req.url)) {
    return undefined;
  }
  const params = new URLSearchParams(req.url.split('?')[1]);
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
