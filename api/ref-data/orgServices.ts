import { NextFunction, Request, Response } from 'express';
import { getConfigValue } from '../configuration';
import { SERVICES_LOCATION_REF_API_URL } from '../configuration/references';
import { http } from '../lib/http';
import { trackTrace } from '../lib/appInsights';
import { setHeaders } from '../lib/proxy';
import { RefDataHMCTSService } from './models/ref-data-hmcts-service.model';

import { OrgServicesCache, OrgServicesResponse } from './orgServicesCache';

/** Filter a full response; leave validation and unmatched lookups to the upstream API. */
function filterServices(data: RefDataHMCTSService[], params: URLSearchParams): RefDataHMCTSService[] | undefined {
  const filters = [...params.entries()].filter(([, value]) => value.trim());
  if (!filters.length) {
    return data;
  }
  // Repeated parameter names remain ambiguous; let the API validate those requests.
  if (new Set(filters.map(([name]) => name)).size !== filters.length) {
    return undefined;
  }
  let filtered = data;
  for (const [name, value] of filters) {
    const normalized = value.trim().toUpperCase();
    if (name === 'ccdServiceNames') {
      const names = normalized.split(',').map((item) => item.trim());
      if (names.some((item) => !item)) {
        return undefined;
      }
      if (!names.includes('ALL')) {
        filtered = filtered.filter((service) => names.includes(service.ccd_service_name?.toUpperCase()));
      }
    } else if (name === 'ccdCaseType') {
      filtered = filtered.filter((service) => service.ccd_case_types?.some((caseType) => caseType.toUpperCase() === normalized));
    } else if (name === 'serviceCode') {
      filtered = filtered.filter((service) => service.service_code?.toUpperCase() === normalized);
    } else {
      return undefined;
    }
  }
  return filtered;
}

/** Cache the common full list, then filter a copy for each request. */
export async function fetchOrgServices(req: Request, query = ''): Promise<OrgServicesResponse> {
  const baseUrl = getConfigValue(SERVICES_LOCATION_REF_API_URL);
  const url = `${baseUrl}/refdata/location/orgServices`;
  const params = new URLSearchParams(query);
  const headers = setHeaders(req);
  let result = OrgServicesCache.getServices();
  const cacheHit = !!result;
  if (!result) {
    const { status, data } = await http.get<RefDataHMCTSService[]>(url, { headers });
    result = { status, data };
    if (status === 200 && Array.isArray(data)) {
      OrgServicesCache.setServices(result);
      trackTrace(
        'Organisation services: freshly fetched the full list from the Location Reference API and stored it in the application cache'
      );
    }
  }

  if (!params.size || result.status !== 200 || !Array.isArray(result.data)) {
    if (cacheHit) {
      trackTrace('Organisation services: returning the full list from the application cache without an upstream API call');
    }
    return result;
  }
  const filtered = filterServices(result.data, params);
  if (filtered?.length) {
    if (cacheHit) {
      trackTrace('Organisation services: returning matching services from the application cache without an upstream API call');
    }
    return { status: result.status, data: filtered };
  }
  if (filtered && [...params.values()].filter((value) => value.trim()).length > 1) {
    // Combined filters are a local extension: the upstream API cannot evaluate them together.
    throw Object.assign(new Error('No service matches the supplied filters'), {
      status: 404,
      data: { message: 'No service matches the supplied filters' },
    });
  }
  // Preserve upstream validation and 404 responses (which trigger toolkit's fallback lookup).
  const { status, data } = await http.get<RefDataHMCTSService[]>(`${url}?${params.toString()}`, { headers });
  if (cacheHit) {
    trackTrace(
      'Organisation services: returning the Location Reference API response after forwarding query filters for validation or lookup'
    );
  }
  return { status, data };
}

/** Toolkit uses this route; all other location endpoints continue through the proxy. */
export async function getOrgServices(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const query = req.originalUrl.split('?').slice(1).join('?');
    const { status, data } = await fetchOrgServices(req, query);
    res.status(status).send(data);
  } catch (error) {
    next(error);
  }
}
