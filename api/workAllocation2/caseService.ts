import { AxiosResponse } from 'axios';
import { http } from '../lib/http';
import * as log4jui from '../lib/log4jui';
import { EnhancedRequest, JUILogger } from '../lib/models';
import { setHeaders } from '../lib/proxy';
import { SearchTaskParameter } from './interfaces/taskSearchParameter';
import { handlePost } from './util';

const logger: JUILogger = log4jui.getLogger('case-service');

export async function handleCaseGet(path: string, req: EnhancedRequest): Promise<any> {
  logger.info('getting cases for', path);
  const headers = setHeaders(req);
  const response: AxiosResponse = await http.get(path, {headers});
  return response.data;
}

export async function handleCaseSearch(path: string, payload: any, req: EnhancedRequest): Promise<any> {
  logger.info('search case for', payload);
  const response: AxiosResponse = await handlePost(path, payload, req);
  return response;
}

export async function handleCasePost(path: string, payload: any, req: EnhancedRequest): Promise<any> {
  logger.info('posting cases for', path);
  const response: AxiosResponse = await handlePost(path, payload, req);
  return response;
}

export const filterAllWorkCases = (cases: any[], parameters: SearchTaskParameter[]) => {
  if (!parameters) {
    return cases;
  }
  return cases.filter(item => {
    return parameters.every((param: SearchTaskParameter) => {
      const value: string = param.values as string;
      if (!value) {
        return true;
      }
      if (param.key === 'role') {
        if (value === 'Judicial') {
          return item[param.key] === 'Lead Judge' || item[param.key] === 'Hearing Judge';
        }
      }
      return item[param.key] === value;
    });
  });
};
