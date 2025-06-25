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

  // Debug information to measure the size reduction
  const originalDataSize = JSON.stringify(data).length;
  console.log(`[Jurisdictions] Original data size: ${originalDataSize} bytes`);

  const filters = getConfigValue(JURISDICTIONS);
  const filteredJurisdictions = [...data]
    .filter((o) => filters.includes(o.id))
    .map((jurisdiction) => {
      return {
        id: jurisdiction.id,
        name: jurisdiction.name,
        caseTypes: (jurisdiction.caseTypes || []).map((caseType) => {
          return {
            id: caseType.id,
            name: caseType.name,
            states: (caseType.states || []).map((state) => ({
              id: state.id,
              name: state.name
            }))
          };
        })
      };
    });

  // Log the size reduction achieved
  const optimizedDataSize = JSON.stringify(filteredJurisdictions).length;
  console.log(`[Jurisdictions] Optimized data size: ${optimizedDataSize} bytes`);
  console.log(`[Jurisdictions] Size reduction: ${(((originalDataSize - optimizedDataSize) / originalDataSize) * 100).toFixed(2)}%`);

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
