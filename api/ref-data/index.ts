import { NextFunction } from 'express';
import { sendGet } from '../common/crudService';
import { getConfigValue } from '../configuration';
import { SERVICES_LOCATION_REF_API_URL, SERVICE_REF_DATA_MAPPING } from '../configuration/references';
import { Service } from '../staff-ref-data/models/staff-filter-option.model';
import { RefDataRegion } from './models/ref-data-region.model';
import { RefDataHMCTSService } from './models/ref-data-service.model';

const baseLocationRefUrl = getConfigValue(SERVICES_LOCATION_REF_API_URL);

export async function getServices(req, res, next: NextFunction) {
  const apiPath = `${baseLocationRefUrl}/refdata/location/orgServices`;
  const enabledServiceCodes = (getConfigValue(SERVICE_REF_DATA_MAPPING) as Service[])
    .reduce((prevValue, currentValue) => [...prevValue, ...currentValue.serviceCodes], [] as string[]);

  try {
    const {status, data}: { status: number; data: RefDataHMCTSService[] } = await sendGet(`${apiPath}`, req);
    const enabledServicesData = data.filter(service => enabledServiceCodes.includes(service.service_code));

    res.status(status).send(enabledServicesData);
  } catch (error) {
    next(error);
  }
}

export async function getRegions(req, res, next: NextFunction) {
  const apiPath: string = `${baseLocationRefUrl}/refdata/location/regions`;

  try {
    const {status, data}: { status: number; data: RefDataRegion[] } = await sendGet(`${apiPath}`, req);
    res.status(status).send(data);
  } catch (error) {
    next(error);
  }
}
