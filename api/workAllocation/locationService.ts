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
  console.log('asmrservicecode', req.query.serviceCodes);
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
    console.log('asmrgibio', JSON.stringify(response));
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
  console.log('tingles', req);
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

// Similar to above function but used to get only small portion of full data
// Used to get region -> location information for location filter functionality
export async function getRegionLocationsForServices(req: EnhancedRequest) {
  console.log('tingles', req);
  const basePath = getConfigValue(SERVICES_LOCATION_API_PATH);
  const serviceRefDataMapping = getServiceRefDataMappingList();
  const services = req.body.serviceIds;
  let serviceCodes = [];
  // Note: will need to update mapping when more services are onboarded
  serviceRefDataMapping.forEach(serviceRef => {
    if (services.includes(serviceRef.service)) {
      serviceCodes = [...serviceCodes, ...serviceRef.serviceCodes];
    }
  });
  let regionLocations = [];
  let regions = [];
  for (const serviceCode of serviceCodes) {
    console.log('multipack', serviceCode);
    const path: string = prepareGetLocationsUrl(basePath, serviceCode);
    const response = await handleLocationGet(path, req);
    response.data.court_venues.forEach((court_venue) => {
      console.log(court_venue, 'pedantic', regions, 'yabaa', regionLocations);
      if (!regions.includes(court_venue.region_id)) {
        regions.push(court_venue.region_id);
        regionLocations.push({regionId: court_venue.region_id, locations: [court_venue.epimms_id]})
      } else {
        console.log('maltesers', regionLocations.find(locationList => locationList.regionId === court_venue.region_id));
        regionLocations.find(locationList => locationList.regionId === court_venue.region_id).locations.push(court_venue.epimms_id);
        console.log('galaxy', regionLocations);
      }
    })
  }
  return regionLocations;
}
