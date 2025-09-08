import { ClientRequest } from 'http';
import { getConfigValue } from '../configuration';
import { JURISDICTIONS } from '../configuration/references';
import { Request, Response } from 'express';

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
  console.log(`caching data ${sessionKey}`, req.session[sessionKey]);
  return req.session[sessionKey];
};

/*export const checkCachedJurisdictions = (
  proxyReq: ClientRequest,
  req: Request & { session?: Record<string, any> },
  res: Response
) => {
  if (jurisdictions.test(req.url) && req.session) {
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
      console.log(`cached data ${sessionKey}`, cached);
      if (typeof cached === 'object') {
        console.log('h1');
        return res.json(cached), proxyReq.end();
      }

      if (isValidJsonArrayString(cached)) {
        console.log('h2');
        res.type('application/json');
        return res.send(cached), proxyReq.end();
      }
    }
  }
};

function isValidJsonArrayString(s: unknown): boolean {
  if (typeof s !== 'string') {
    return false;
  }
  try {
    const v = JSON.parse(s);
    return Array.isArray(v);
  } catch {
    return false;
  }
}*/
export const checkCachedJurisdictions = (
  proxyReq: ClientRequest,
  req: Request & { session?: Record<string, any> },
  res: Response
) => {
  if (jurisdictions.test(req.url) && req.session) {
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
    // if (cached == null) return next();

    try {
      // If it’s already an object/array, send it
      if (typeof cached === 'object') {
        console.log(`From object cached data for ${sessionKey}:`, cached);
        res.json(cached);
        proxyReq.end();
        return;
      }

      // If it’s a string, parse -> send via res.json (never res.send for JSON)
      if (typeof cached === 'string') {
        const parsed = JSON.parse(cached); // throws on truncated JSON
        console.log(`From string cached data for ${sessionKey}:`, parsed);
        res.json(parsed);
        proxyReq.end();
        return;
      }

      // Anything else → treat as corrupt
      console.warn(`[jurisdictions] Unexpected cached type for ${sessionKey}:`, typeof cached);
      delete req.session[sessionKey];
    } catch (e) {
      // If parse fails, the cache is corrupt/truncated; evict and fall through
      console.warn(`[jurisdictions] Evicting corrupt cache for ${sessionKey}:`, (e as Error).message);
      delete req.session[sessionKey];
    }
  }
};
