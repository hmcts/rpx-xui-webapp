import { NextFunction, Response } from 'express';
import { handleGet } from 'common/crudService';
import { getConfigValue } from 'configuration';
import {
    SERVICES_PRD_API_URL,
    GLOBAL_SEARCH_JURISDICTIONS
} from 'configuration/references';
import { EnhancedRequest } from 'lib/models';
import { GlobalSearchJurisdiction } from 'interfaces/globalSearchJurisdictions';

/**
 * Get jurisdictions
 * api/jurisdictions
 */
export async function getJurisdictions(req: EnhancedRequest, res: Response, next: NextFunction) {
    try {
        if (req.session.jurisdictions) {
            res.send(req.session.jurisdictions);
        }

        const path = `${getConfigValue(SERVICES_PRD_API_URL)}/aggregated/caseworkers/:uid/jurisdictions?access=read`;
        const response = await handleGet(path, req, next);

        req.session.jurisdictions = response.data;
        return res.send(response.data);
    } catch (error) {
        next(error);
    }
}


/**
 * Get global search jurisdictions
 * api/globalsearch/services
 */
export async function getGlobalSearchJurisdictions(req: EnhancedRequest, res: Response, next: NextFunction) {
    try {
        const jurisdictions = await getJurisdictions(req, res, next);
        
        const globalSearchJurisdictionIds = getConfigValue(GLOBAL_SEARCH_JURISDICTIONS);

        const globalSearchJurisdictions: GlobalSearchJurisdiction[] = [];
        globalSearchJurisdictions.push({ serviceId: 'PROBATE', serviceName: 'Manage probate application' });
        globalSearchJurisdictions.push({ serviceId: 'PUBLICLAW', serviceName: 'Public Law' });
        globalSearchJurisdictions.push({ serviceId: 'DIVORCE', serviceName: 'Family Divorce' });
        
        return globalSearchJurisdictions;
    } catch (error) {
        next(error);
    }
}
