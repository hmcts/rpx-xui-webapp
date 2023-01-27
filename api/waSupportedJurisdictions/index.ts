import { NextFunction, Response, Router } from 'express';
import { getConfigValue } from '../configuration';
import { WA_SUPPORTED_JURISDICTIONS } from '../configuration/references';
import { EnhancedRequest } from '../lib/models';

export async function getWASupportedJurisdictions(req: EnhancedRequest, res: Response, next: NextFunction): Promise<any> {
  try {
    const jurisdictions = getConfigValue(WA_SUPPORTED_JURISDICTIONS);
    const jurisdictionsArray = getSupportedJurisdictionsListFromString(jurisdictions);
    res.send(jurisdictionsArray).status(200);
  } catch (error) {
    next(error);
  }
}

export function getWASupportedJurisdictionsList(): any {
  try {
    const jurisdictions = getConfigValue(WA_SUPPORTED_JURISDICTIONS);
    const jurisdictionsArray = getSupportedJurisdictionsListFromString(jurisdictions);
    return jurisdictionsArray;
  } catch (error) {
    console.log(error);
  }
}

export function getSupportedJurisdictionsListFromString(jurisdictionString:string): string[] {
  let jurisdictionsArray = [];
  if (jurisdictionString && jurisdictionString.includes(',')) {
    jurisdictionsArray = jurisdictionString.split(',');
  } else {
    jurisdictionsArray = jurisdictionString ? [jurisdictionString] : [];
  }
  return jurisdictionsArray;
}

export const router = Router({mergeParams: true});

router.get('/get', getWASupportedJurisdictions);

export default router;
