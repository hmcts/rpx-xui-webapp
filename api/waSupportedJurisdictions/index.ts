import { fetchOrgServices } from '../ref-data/orgServices';
import { NextFunction, Response, Router } from 'express';
import { getConfigValue } from '../configuration';
import { WA_SUPPORTED_JURISDICTIONS } from '../configuration/references';
import { HMCTSServiceDetails } from '../interfaces/hmctsServiceDetails';
import { EnhancedRequest } from '../lib/models';
import { RefDataHMCTSService } from '../ref-data/models/ref-data-hmcts-service.model';
import { toTitleCase } from '../utils';
import * as log4jui from '../lib/log4jui';

const logger = log4jui.getLogger('wa-supported-jurisdictions');

// Used for all work - could be used for all in future?
export async function getDetailedWASupportedJurisdictions(req: EnhancedRequest, res: Response, next: NextFunction): Promise<any> {
  try {
    const response = await fetchOrgServices(req);
    const services: any = generateServices(response.data);
    res.send(services).status(200);
  } catch (error) {
    next(error);
  }
}

// used for angular layer (just list of services per config)
export async function getWASupportedJurisdictions(req: EnhancedRequest, res: Response, next: NextFunction): Promise<any> {
  try {
    const jurisdictions = getConfigValue(WA_SUPPORTED_JURISDICTIONS);
    const jurisdictionsArray = jurisdictions.split(',');
    res.send(jurisdictionsArray).status(200);
  } catch (error) {
    next(error);
  }
}

// Only used within node layer
export function getWASupportedJurisdictionsList(): any {
  try {
    const jurisdictions = getConfigValue(WA_SUPPORTED_JURISDICTIONS);
    const jurisdictionsArray = jurisdictions.split(',');
    return jurisdictionsArray;
  } catch (error) {
    logger.error(error);
  }
}

// Note: separate from global search services currently
// This is to allow more customisation - general generate services within utils
export function generateServices(refDataHMCTS: RefDataHMCTSService[]): HMCTSServiceDetails[] {
  const jurisdictions = getConfigValue(WA_SUPPORTED_JURISDICTIONS);
  const jurisdictionsArray = jurisdictions.split(',');
  const waSupportedServices: HMCTSServiceDetails[] = [];
  jurisdictionsArray.forEach((serviceId) => {
    // search for the service name based on the supported jursdiction
    const jurisdiction =
      refDataHMCTS?.length > 0 ? refDataHMCTS.filter((x) => x.ccd_service_name?.toLowerCase() === serviceId.toLowerCase()) : null;
    if (jurisdiction?.length > 0) {
      // handle Civil service which has different service_short_description
      if (jurisdiction.length > 1) {
        waSupportedServices.push({
          serviceId: jurisdiction[0].ccd_service_name,
          serviceName: toTitleCase(jurisdiction[0].ccd_service_name),
        });
      } else {
        waSupportedServices.push({
          serviceId: jurisdiction[0].ccd_service_name,
          serviceName: jurisdiction[0].service_short_description,
        });
      }
    } else {
      waSupportedServices.push({ serviceId, serviceName: serviceId });
    }
  });

  return waSupportedServices;
}

export const router = Router({ mergeParams: true });

router.get('/detail', getDetailedWASupportedJurisdictions);
router.get('/get', getWASupportedJurisdictions);

export default router;
