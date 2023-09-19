import { NextFunction, Response, Router } from 'express';
import { getConfigValue } from '../configuration';
import { SERVICE_NAME_MAPPINGS, WA_SUPPORTED_JURISDICTIONS } from '../configuration/references';
import { EnhancedRequest } from '../lib/models';

export async function getWASupportedJurisdictions(req: EnhancedRequest, res: Response, next: NextFunction): Promise<any> {
  try {
    const jurisdictions = getConfigValue(WA_SUPPORTED_JURISDICTIONS);
    const jurisdictionsArray = jurisdictions.split(',');
    res.send(jurisdictionsArray).status(200);
  } catch (error) {
    next(error);
  }
}

export function getWASupportedJurisdictionsList(): any {
  try {
    const jurisdictions = getConfigValue(WA_SUPPORTED_JURISDICTIONS);
    const jurisdictionsArray = jurisdictions.split(',');
    return jurisdictionsArray;
  } catch (error) {
    console.log(error);
  }
}

export async function getServiceNamesList(req: EnhancedRequest, res: Response, next: NextFunction): Promise<any> {
  try {
    const globalSearchServiceIds = getConfigValue(SERVICE_NAME_MAPPINGS);
    res.send(globalSearchServiceIds).status(200);
  } catch (error) {
    next(error);
  }
}

export const router = Router({ mergeParams: true });

router.get('/get', getWASupportedJurisdictions);

router.get('/serviceNames', getServiceNamesList);

export default router;
