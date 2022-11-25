import { AxiosResponse } from 'axios';
import { getConfigValue } from '../configuration';
import { SERVICES_LOCATION_API_PATH } from '../configuration/references';
import { http } from '../lib/http';
import { EnhancedRequest } from '../lib/models';
import { setHeaders } from '../lib/proxy';
import { getServiceRefDataMappingList } from '../serviceRefData';
import { prepareGetLocationsUrl } from './util';

export async function handleLocationGet(fullPath: string, req: EnhancedRequest): Promise<AxiosResponse<any>> {
  const headers = setHeaders(req);
  const response = await http.get<any>(fullPath, { headers });
  return response;
}

export async function commonGetFullLocation(req: EnhancedRequest) {
  let serviceCodes = [];
  let courtVenues = [];
  const services = req.query.serviceCodes.split(',');
  const basePath = getConfigValue(SERVICES_LOCATION_API_PATH);
  const serviceRefDataMapping = getServiceRefDataMappingList();

  serviceRefDataMapping.forEach(serviceRef => {
    if (services.includes(serviceRef.service)) {
      serviceCodes = [...serviceCodes, ...serviceRef.serviceCodes];
    }
  });
  for (const serviceCode of serviceCodes) {
    const path: string = prepareGetLocationsUrl(basePath, serviceCode);
    const response = await handleLocationGet(path, req);
    courtVenues = [...courtVenues, ...response.data.court_venues];
  }
  courtVenues = courtVenues.filter((value, index, self) =>
    index === self.findIndex(location => (
      location.epimms_id === value.epimms_id && location.site_name === value.site_name
    ))
  );
  return courtVenues;
}

export async function getFullLocationsForServices(req: EnhancedRequest) {
  const basePath = getConfigValue(SERVICES_LOCATION_API_PATH);
  const serviceRefDataMapping = getServiceRefDataMappingList();
  const services = req.body.bookableServices;
  let serviceCodes = [];
  // Note: will need to update mapping when more services are onboarded
  serviceRefDataMapping.forEach(serviceRef => {
    if (services.includes(serviceRef.service)) {
      serviceCodes = [...serviceCodes, ...serviceRef.serviceCodes];
    }
  });
  let courtVenues = [];
  for (const serviceCode of serviceCodes) {
    const path: string = prepareGetLocationsUrl(basePath, serviceCode);
    const response = await handleLocationGet(path, req);
    courtVenues = [...courtVenues, ...response.data.court_venues];
  }
  return courtVenues;
}
