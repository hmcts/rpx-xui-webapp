import { NextFunction, Response, Router } from 'express';
import { getConfigValue } from '../configuration';
import { WA_SUPPORTED_JURISDICTIONS } from '../configuration/references';
import { EnhancedRequest } from '../lib/models';

export async function getWASupportedJurisdictions(req: EnhancedRequest, res: Response, next: NextFunction): Promise<any> {
  try {
    if (!req.session.supportedJurisdictions) {
      const jurisdictions = getConfigValue(WA_SUPPORTED_JURISDICTIONS);
      req.session.supportedJurisdictions = jurisdictions;
    }
    return res.send(req.session.supportedJurisdictions).status(200);
  } catch (error) {
    next(error);
  }
}

export const router = Router({mergeParams: true});

router.get('/get', getWASupportedJurisdictions);

export default router;
