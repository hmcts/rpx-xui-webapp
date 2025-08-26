import { ClientRequest } from 'http';
import { getConfigValue } from '../configuration';
import { JURISDICTIONS } from '../configuration/references';
import { Request, Response } from 'express';
import { trackTrace } from '../lib/appInsights';

const jurisdictions = /aggregated\/.+jurisdictions\?/;

/**
 * Manually filtering returned jurisdictions
 * to make available jurisdiction in filters array only
 */
export const getJurisdictions = (proxyRes, req, res, data: any[]) => {
  if (!Array.isArray(data) || !jurisdictions.test(req.url)) {
    return data;
  }

  const filters = getConfigValue(JURISDICTIONS);
  const params = new URLSearchParams(req.url.split('?')[1]);
  const access = params.get('access');
  const filtered = data.filter((o) => filters.includes(o.id));

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

export const checkCachedJurisdictions = (
  proxyReq: ClientRequest,
  req: Request & { session: Record<string, any> },
  res: Response
) => {
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
      trackTrace(`checkCachedJurisdictions ${sessionKey}:-`, cached);
      res.send(cached);
      res.end();
      trackTrace('checkCachedJurisdictions close');
      proxyReq.end();
    }
  }
};
