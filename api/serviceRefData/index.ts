import { NextFunction, Response, Router } from 'express';
import { getConfigValue } from '../configuration';
import { SERVICE_REF_DATA_MAPPING } from '../configuration/references';
import { EnhancedRequest } from '../lib/models';

export async function getServiceRefDataMapping(req: EnhancedRequest, res: Response, next: NextFunction): Promise<any> {
  try {
    const serviceRefData = getConfigValue(SERVICE_REF_DATA_MAPPING);
    res.send(serviceRefData).status(200);
  } catch (error) {
    next(error);
  }
}

export function getServiceRefDataMappingList(): any {
  try {
    const serviceRefData = getConfigValue(SERVICE_REF_DATA_MAPPING);
    return serviceRefData;
  } catch (error) {
    console.log(error);
  }
}

export const router = Router({ mergeParams: true });

router.get('/get', getServiceRefDataMapping);

export default router;
