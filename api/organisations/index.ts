import { NextFunction, Response, Router } from 'express';
import { handleGet } from '../common/crudService';
import { getConfigValue } from '../configuration';
import { SERVICES_PRD_API_URL } from '../configuration/references';
import { EnhancedRequest } from '../lib/models';
import { exists } from '../lib/util';

export async function handleGetOrganisationsRoute(req: EnhancedRequest, res: Response, next: NextFunction) {
  try {
    const path = getOrganisationUri();
    const response = await handleGet(path, req, next);

    if (response.data.organisations) {
      res.send(response.data.organisations);
    } else {
      res.send(response.data);
    }
  } catch (error) {
    next(error);
  }
}

export async function handleOrganisationRoute(req: EnhancedRequest, res: Response) {
  try {
    const path = `${getConfigValue(SERVICES_PRD_API_URL)}/refdata/external/v1/organisations`;
    const response = await handleGet(path, req, ((err) => {
      throw err;
    }));
    res.send(response.data);
  } catch (error) {
    const errReport = {
      apiError: exists(error, 'data.message') ? error.data.message : 'Unknown Error Occurred',
      apiStatusCode: exists(error, 'status') ? error.status : 500,
      message: 'Organisation route error'
    };
    res.status(errReport.apiStatusCode).send(errReport);
  }
}

function getOrganisationUri(): string {
  return `${getConfigValue(SERVICES_PRD_API_URL)}/refdata/external/v1/organisations/status/ACTIVE?address=true`;
}

export const router = Router({ mergeParams: true });

router.get('', handleOrganisationRoute);

export default router;
