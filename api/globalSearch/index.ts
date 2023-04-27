import { Jurisdiction } from '@hmcts/ccd-case-ui-toolkit';
import { NextFunction, Response } from 'express';
import { handlePost } from '../common/crudService';
import { getConfigValue } from '../configuration';
import {
  GLOBAL_SEARCH_SERVICES,
  SERVICES_CCD_DATA_STORE_API_PATH
} from '../configuration/references';
import { GlobalSearchService } from '../interfaces/globalSearchService';
import { EnhancedRequest } from '../lib/models';

/**
 * Get global search services
 * api/globalsearch/services
 */
export async function getServices(req: EnhancedRequest, res: Response, next: NextFunction): Promise<Response> {
  try {
    // Return global search services from session if available
    if (req.session.globalSearchServices && req.session.globalSearchServices.length !== 0) {
      return res.json(req.session.globalSearchServices);
    }

    // Retrieve jurisdictions from session if available
    // Else perform api call to get jurisdictions
    const services: any = generateServices(req.session.jurisdictions as Jurisdiction[]);

    // Store generated global search services to session
    req.session.globalSearchServices = services;

    // Return json response of generated global search services
    return res.json(services);
  } catch (error) {
    next(error);
  }
}

/**
 * Get global search results
 * api/globalsearch/results
 */
export async function getSearchResults(req: EnhancedRequest, res: Response, next: NextFunction): Promise<Response> {
  try {
    const path = `${getConfigValue(SERVICES_CCD_DATA_STORE_API_PATH)}/globalSearch`;
    const response = await handlePost(path, req.body, req, next);
    return res.status(response.status).send(response.data);
  } catch (error) {
    next(error);
  }
}

/**
 * Generate global search services from jurisdictions and global search service ids
 * @param jurisdictions
 * @returns
 */
export function generateServices(jurisdictions: Jurisdiction[]): GlobalSearchService[] {
  // Retrieve global search services id from config
  const globalSearchServiceIds = getConfigValue(GLOBAL_SEARCH_SERVICES);
  const globalSearchServiceIdsArray = globalSearchServiceIds.split(',');

  // Generate global search services
  const globalSearchServices: GlobalSearchService[] = [];
  globalSearchServiceIdsArray.forEach((serviceId) => {
    const jurisdiction = jurisdictions ? jurisdictions.find((x) => x.id === serviceId) : null;
    if (jurisdiction) {
      globalSearchServices.push({ serviceId: jurisdiction.id, serviceName: jurisdiction.name });
    } else {
      globalSearchServices.push({ serviceId, serviceName: serviceId });
    }
  });

  // Return generated global search services
  return globalSearchServices;
}
