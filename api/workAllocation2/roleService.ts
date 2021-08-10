import { AxiosResponse } from 'axios';
import { httpMock } from '../common/httpMock';
import * as log4jui from '../lib/log4jui';
import { EnhancedRequest, JUILogger } from '../lib/models';
import { setHeaders } from '../lib/proxy';
import { CaseRole } from './interfaces/caseRole';

const logger: JUILogger = log4jui.getLogger('role-service');

export async function handleGetRolesByCaseId(path: string, req: EnhancedRequest): Promise<AxiosResponse<CaseRole>> {
  logger.info('handle get method', path);
  const headers = setHeaders(req);
  return await httpMock.get<CaseRole>(path, {headers});
}
