import { EnhancedRequest } from 'lib/models';
import { getConfigValue } from '../configuration';
import { HEADER_CONFIG } from '../configuration/references';
import { NextFunction, Response } from 'express';

const headerConfig = getConfigValue(HEADER_CONFIG);

export async function getHeaderConfig(req: EnhancedRequest, res: Response, next: NextFunction): Promise<Response> {
  try {
    return res.json(headerConfig);
  } catch (error) {
    next(error);
  }
}
