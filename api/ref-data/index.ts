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

  try {
    const { status, data }: { status: number; data: LocationByServiceCodeResponse }
      = await http.get(`${apiPath}?${queryParams}`, { headers: setHeaders(req) });
    data.court_venues.map((court_venue) => {
      // EUI-8051 - List value as we want to store all services with that location
      court_venue.serviceCodes = [queryParams.substring(queryParams.indexOf('=')+1)];
    });
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
