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

  return req.session[sessionKey];
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

    if (cached && typeof cached === 'object') {
      console.log(`From object cached data for ${sessionKey}:`, cached);
      return res.json(cached), proxyReq.end();
    }

    if (cached && typeof cached === 'string') {
      console.log(`From string cached data for ${sessionKey}:`, cached);
      const cleaned = cached.replace(/\p{C}+$/u, '');
      // If the above line throws a lint or parsing error, use double backslashes:
      // const cleaned = cached.replace(/[\u0000-\\u001F]+$/g, '');
      try {
        const parsed = JSON.parse(cleaned);
        // self-heal: store parsed so future reads are safe
        req.session[sessionKey] = parsed;
        return res.json(parsed), proxyReq.end();
      } catch {
        console.warn(`[jurisdictions] Corrupt cached JSON string for ${sessionKey}:`, cleaned);
        delete req.session[sessionKey];
        // fall through to proxy
      }
    }
  }
};
