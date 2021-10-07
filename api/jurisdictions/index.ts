import { NextFunction, Response } from 'express';
import { handleGet } from '../common/crudService';
import { getConfigValue } from '../configuration';
import {
    SERVICES_PRD_API_URL
} from '../configuration/references';
import { EnhancedRequest } from 'lib/models';

/**
 * Get jurisdictions
 * api/jurisdictions
 */
export async function getJurisdictions(req: EnhancedRequest, res: Response, next: NextFunction) {
    try {
        if (req.session.jurisdictions) {
            res.send(req.session.jurisdictions);
        } else {
            // const path = `${getConfigValue(SERVICES_PRD_API_URL)}/aggregated/caseworkers/:uid/jurisdictions?access=read`;
            const path = `https://manage-case.aat.platform.hmcts.net/aggregated/caseworkers/:uid/jurisdictions?access=read`;
            const response = await handleGet(path, req, next);

            req.session.jurisdictions = response.data;
            return res.send(response.data);
        }
    } catch (error) {
        next(error);
    }
}
