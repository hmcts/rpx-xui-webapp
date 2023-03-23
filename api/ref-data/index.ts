import { NextFunction } from 'express';
import { sendGet } from '../common/crudService';
import { getConfigValue } from '../configuration';
import { SERVICES_LOCATION_REF_API_URL } from '../configuration/references';
import { RefDataService } from './models/ref-data-service.model';

const baseLocationRefUrl = getConfigValue(SERVICES_LOCATION_REF_API_URL);

export async function getServicesRefData(req, res, next: NextFunction) {
  const apiPath = `${baseLocationRefUrl}/refdata/location/orgServices`;
  const queryParams = new URLSearchParams(req.query).toString();

  try {
    const {status, data}: { status: number; data: RefDataService[] } = await sendGet(`${apiPath}?${queryParams}`, req);
    res.status(status).send(data);
  } catch (error) {
    next(error);
  }
}
