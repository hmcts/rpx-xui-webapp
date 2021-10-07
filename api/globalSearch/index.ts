import { NextFunction, Response } from 'express';
import { handleGet } from '../common/crudService';
import { getConfigValue } from '../configuration';
import {
    SERVICES_PRD_API_URL,
    GLOBAL_SEARCH_SERVICES
} from '../configuration/references';
import { EnhancedRequest } from 'lib/models';
import { GlobalSearchService } from 'interfaces/globalSearchService';
import { Jurisdiction } from '@hmcts/ccd-case-ui-toolkit';

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
            const path = `https://manage-case.aat.platform.hmcts.net/aggregated/caseworkers/:uid/jurisdictions?access=read`;
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
 * Generate global search services from jurisdictions and global search service ids
 * @param jurisdictions 
 * @returns 
 */
function generateServices(jurisdictions: Jurisdiction[]): GlobalSearchService[] {
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
