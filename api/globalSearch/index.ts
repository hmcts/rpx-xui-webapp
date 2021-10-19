import { Jurisdiction } from '@hmcts/ccd-case-ui-toolkit';
import { NextFunction, Response } from 'express';
import { GlobalSearchService } from 'interfaces/globalSearchService';
import { EnhancedRequest } from 'lib/models';
import { handleGet, handlePost } from '../common/crudService';
import { getConfigValue } from '../configuration';
import { 
  GLOBAL_SEARCH_SERVICES, 
  SERVICES_CCD_COMPONENT_API_PATH, 
  SERVICES_CCD_DATA_STORE_API_PATH 
} from '../configuration/references';

/**
 * Get global search services
 * api/globalsearch/services
 */
export async function getServices(req: EnhancedRequest, res: Response, next: NextFunction) {
  try {
    // Return global search services from session if available
    if (req.session.globalSearchServices) {
      return res.json(req.session.globalSearchServices);
    }

    // Retrieve jurisdictions from session if available
    // Else perform api call to get jurisdictions
    let services: any;
    if (req.session.jurisdictions) {
      services = generateServices(req.session.jurisdictions as Jurisdiction[]);
    } else {
      const domain = `${getConfigValue(SERVICES_CCD_COMPONENT_API_PATH)}`;
      const path = `${domain}/aggregated/caseworkers/:uid/jurisdictions?access=read`;
      const response = await handleGet(path, req, next);
      services = generateServices(response.data as Jurisdiction[]);
    }

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
export async function getSearchResults(req: EnhancedRequest, res: Response, next: NextFunction) {
  try {
    const searchRequest = req.body;
    console.log('request body', req.body);
    const path = `${getConfigValue(SERVICES_CCD_DATA_STORE_API_PATH)}/globalsearch`;
    console.log(path);
    const response = await handlePost(path, searchRequest, req, next);
    return response.data;
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
  globalSearchServiceIdsArray.forEach(serviceId => {
    const jurisdiction = jurisdictions.find(x => x.id === serviceId);
    globalSearchServices.push({ serviceId: jurisdiction.id, serviceName: jurisdiction.name });
  });

  // Return generated global search services
  return globalSearchServices;
}
