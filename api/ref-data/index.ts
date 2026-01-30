import { NextFunction } from 'express';
import { getConfigValue } from '../configuration';
import { SERVICES_LOCATION_REF_API_URL, SERVICE_REF_DATA_MAPPING } from '../configuration/references';
import { http } from '../lib/http';
import { setHeaders } from '../lib/proxy';
import { Service } from '../staff-ref-data/models/staff-filter-option.model';
import { RefDataHMCTSService } from './models/ref-data-hmcts-service.model';
import { LocationByServiceCodeResponse } from './models/ref-data-location-response.model';
import { RefDataRegion } from './models/ref-data-region.model';

const baseLocationRefUrl = getConfigValue(SERVICES_LOCATION_REF_API_URL);

export async function getServices(req, res, next: NextFunction) {
  const apiPath = `${baseLocationRefUrl}/refdata/location/orgServices`;
  const enabledServiceCodes = (getConfigValue(SERVICE_REF_DATA_MAPPING) as Service[])
    .reduce((prevValue, currentValue) => [...prevValue, ...currentValue.serviceCodes], [] as string[]);

  try {
    const { status, data }: { status: number; data: RefDataHMCTSService[] } =
      await http.get(`${apiPath}`, { headers: setHeaders(req) });
    const enabledServicesData = data.filter((service) => enabledServiceCodes.includes(service.service_code));
    enabledServicesData.push({
      jurisdiction: 'HRS',
      service_id: 1,
      org_unit: 'HMCTS',
      business_area: 'HRS',
      sub_business_area: 'HRS',
      service_description: 'HRS',
      service_code: 'HRS',
      service_short_description: 'HRS',
      ccd_service_name: 'HRS',
      last_update: new Date().toISOString(),
      ccd_case_types: []
    });
    res.status(status).send(enabledServicesData);
  } catch (error) {
    next(error);
  }
}

export async function getRegions(req, res, next: NextFunction) {
  const apiPath: string = `${baseLocationRefUrl}/refdata/location/regions`;
  const urlSearchParams = new URLSearchParams();
  urlSearchParams.append('regionId', 'ALL');

  try {
    const { status, data }: { status: number; data: RefDataRegion[] } =
      await http.get(`${apiPath}?${urlSearchParams}`, { headers: setHeaders(req) });

    res.status(status).send(data);
  } catch (error) {
    next(error);
  }
}

export async function getLocationsByServiceCode(req, res, next: NextFunction) {
  const apiPath: string = `${baseLocationRefUrl}/refdata/location/court-venues/services`;
  const queryParams = new URLSearchParams(req.query).toString();
  console.log('location API path', apiPath);
  console.log('location API queryParams', queryParams);

  // Return mock data for HRS service
  if (queryParams.includes('service_code=HRS')) {
    const mockData: LocationByServiceCodeResponse = {
      court_type: '',
      court_type_id: '',
      service_code: 'HRS',
      welsh_court_type: '',
      court_venues: [
        {
          court_venue_id: '',
          site_name: '',
          region_id: '',
          region: '',
          cluster_id: '',
          cluster_name: '',
          open_for_public: 'Yes',
          court_type_id: '',
          court_type: '',
          court_name: '',
          venue_name: 'Birmingham CTSC',
          epimms_id: '815833',
          is_hearing_location: '',
          is_case_management_location: '',
          welsh_site_name: '',
          welsh_court_address: '',
          court_address: '',
          court_location_code: '',
          court_open_date: '',
          court_status: 'Open',
          closed_date: '',
          dx_address: '',
          phone_number: '',
          postcode: '',
          serviceCodes: ['HRS']
        }
      ]
    };
    return res.status(200).send(mockData);
  }

  try {
    const { status, data }: { status: number; data: LocationByServiceCodeResponse }
      = await http.get(`${apiPath}?${queryParams}`, { headers: setHeaders(req) });
      console.log('court venue before:', data.court_venues.map(cv => cv.serviceCodes));
    data.court_venues.map((court_venue) => {
      // EUI-8051 - List value as we want to store all services with that location
      court_venue.serviceCodes = [queryParams.substring(queryParams.indexOf('=')+1)];
    });
    console.log('court venue after:', data.court_venues.map(cv => cv.serviceCodes));
    res.status(status).send(data);
  } catch (error) {
    next(error);
  }
}

export async function getLocations(req, res, next: NextFunction) {
  const apiPath: string = `${baseLocationRefUrl}/refdata/location/court-venues`;
  const queryParams = new URLSearchParams(req.query).toString();
  try {
    const { status, data }: { status: number; data: LocationByServiceCodeResponse }
      = await http.get(`${apiPath}?${queryParams}`, { headers: setHeaders(req) });

    res.status(status).send(data);
  } catch (error) {
    next(error);
  }
}
