import { getConfigValue } from '../configuration';
import { JURISDICTIONS } from '../configuration/references';

const jurisdictions = /aggregated\/.+jurisdictions\?/;

/**
 * Manually filtering returned jurisdictions
 * to make available jurisdiction in filters array only
 * and reducing the data size by only keeping the required fields
 */
export const getJurisdictions = (proxyRes, req, res, data: any[]): any[] | any => {
  if (!Array.isArray(data)
        || !jurisdictions.test(req.url)) {
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
          return {
            id: caseType.id,
            name: caseType.name,
            states: (caseType.states || []).map((state) => ({
              id: state.id,
              name: state.name
            }))
          };
        });
      }

      return result;
    });

  req.session.jurisdictions = filteredJurisdictions;
  return req.session.jurisdictions;
};

export const checkCachedJurisdictions = (proxyReq, req, res) => {
  if (jurisdictions.test(req.url)) {
    if (req.session.jurisdictions) {
      res.send(req.session.jurisdictions);
      proxyReq.end();
    }
  }
};
