import { handleGet } from "common/crudService";
import { getConfigValue } from "configuration";
import {
    SERVICES_PRD_API_URL,
    GLOBAL_SEARCH_JURISDICTIONS
} from "configuration/references";
import { NextFunction, Response } from "express"
import { EnhancedRequest } from "lib/models"

/**
 * Get global search jurisdictions
 * api/globalsearch/services
 */
export async function getGlobalSearchJurisdictions(req: EnhancedRequest, res: Response, next: NextFunction) {
    try {
        const path = `${getConfigValue(SERVICES_PRD_API_URL)}/aggregated/caseworkers/:uid/jurisdictions?access=read`;
        const { status, data }: { status: number, data: any } = await handleGet(path, req, next);

        const globalSearchJurisdictionsFromConfig = getConfigValue(GLOBAL_SEARCH_JURISDICTIONS);

        

    } catch (error) {
        next(error);
    }
}