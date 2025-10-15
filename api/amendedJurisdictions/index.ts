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

      if (jurisdiction.caseTypes !== undefined) {
        result.caseTypes = jurisdiction.caseTypes.map((caseType) => {
          const mappedCaseType: any = {
            id: caseType.id,
            name: caseType.name
          };

          if (caseType.events) {
            mappedCaseType.events = caseType.events.map((event) => ({
              id: event.id,
              name: event.name
            }));
          }

          if (caseType.states) {
            mappedCaseType.states = caseType.states.map((state) => ({
              id: state.id,
              name: state.name
            }));
          }

          return mappedCaseType;
        });
      }

      return result;
    });

  req.session.jurisdictions = filteredJurisdictions;
  return req.session.jurisdictions;
};

export const checkCachedJurisdictions = (proxyReq, req, res) => {
  if (jurisdictions.test(req.url)) {
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
      res.send(cached);
      proxyReq.end();
    }
  }
};
