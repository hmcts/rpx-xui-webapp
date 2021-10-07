import { NextFunction, response, Response } from 'express';
import { handleGet } from '../common/crudService';
import { getConfigValue } from '../configuration';
import {
    SERVICES_PRD_API_URL,
    GLOBAL_SEARCH_SERVICES
} from '../configuration/references';
import { EnhancedRequest } from 'lib/models';
import { GlobalSearchService } from 'interfaces/globalSearchService';

/**
 * Get global search services
 * api/globalsearch/services
 */
export async function getServices(req: EnhancedRequest, res: Response, next: NextFunction) {
    try {
        let jurisdictions: any;
        console.log('test');
        if (req.session.jurisdictions) {
            jurisdictions = req.session.jurisdictions;
        } else {
            const path = `https://manage-case.aat.platform.hmcts.net/aggregated/caseworkers/:uid/jurisdictions?access=read`;
            const response = await handleGet(path, req, next);
            jurisdictions = response.data;
        }

        console.log('juriiii', jurisdictions);
        
        const globalSearchServiceIds = getConfigValue(GLOBAL_SEARCH_SERVICES);

        const globalSearchServices: GlobalSearchService[] = [];
        globalSearchServices.push({ serviceId: 'PROBATE', serviceName: 'Manage probate application' });
        globalSearchServices.push({ serviceId: 'PUBLICLAW', serviceName: 'Public Law' });
        globalSearchServices.push({ serviceId: 'DIVORCE', serviceName: 'Family Divorce' });

        console.log(globalSearchServiceIds);
        console.log(globalSearchServices);

        return res.json(globalSearchServices);

    } catch (error) {
        next(error);
    }
}
