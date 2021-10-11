import { NextFunction, Response } from 'express';
import { handleGet } from '../common/mockService';
import { getConfigValue } from '../configuration';
import { SERVICES_HEARINGS_COMPONENT_API } from '../configuration/references';
import * as mock from '../hearings/hearing.mock';
import { EnhancedRequest } from '../lib/models';
import { generateErrorMessageWithCode } from '../noc/errorCodeConverter';
import { NoCQuestions } from '../noc/models/noCQuestions.interface';

mock.init();

const url: string = getConfigValue(SERVICES_HEARINGS_COMPONENT_API);

/**
 * getHearings from case ID
 */
export async function getHearings(req: EnhancedRequest, res: Response, next: NextFunction) {
  // @ts-ignore
  const caseId = req.query.caseId;
  const markupPath: string = `${url}/hearings/${caseId}`;

  try {
    const {status, data}: { status: number, data: NoCQuestions } = await handleGet(markupPath, req);
    res.status(status).send(data);
  } catch (error) {
    next(generateErrorMessageWithCode(error));
  }
}
