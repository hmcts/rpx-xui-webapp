import { NextFunction, Response } from 'express';
import { handleGet } from '../common/mockService';
import { getConfigValue } from '../configuration';
import { SERVICES_PRD_API_URL} from '../configuration/references';
import { EnhancedRequest } from '../lib/models';
import * as mock from '../locations/location.mock';

mock.init();

const url: string = getConfigValue(SERVICES_PRD_API_URL);

/**
 * getHearings from case ID
 */
export async function getLocations(req: EnhancedRequest, res: Response, next: NextFunction) {
  // @ts-ignore
  const searchTerm = req.query.searchTerm;
  const courtType = req.query.courtType;
  // tslint:disable-next-line:max-line-length
  const markupPath: string = `${url}/refdata/location/court-venues/venue-search?search-string=${searchTerm}&court-type-id=${courtType}`;

  try {
    const {status, data}: { status: number, data: any } = await handleGet(markupPath, req);
    res.status(status).send(data);
  } catch (error) {
    next(error);
  }
}
