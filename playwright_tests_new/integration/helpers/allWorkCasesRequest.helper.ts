import type { Page, Request } from '@playwright/test';
import { allWorkCasesRoutePattern } from './manageTasksMockRoutes.helper';

export type AllWorkCasesSearchParameter = {
  key?: string;
  operator?: string;
  values?: unknown;
};

export type AllWorkCasesRequestBody = {
  searchRequest?: {
    search_parameters?: AllWorkCasesSearchParameter[];
    pagination_parameters?: { page_number?: number; page_size?: number };
  };
  view?: string;
};

export function parseAllWorkCasesRequest(request: Pick<Request, 'postDataJSON'>): AllWorkCasesRequestBody {
  return request.postDataJSON() as AllWorkCasesRequestBody;
}

export async function waitForFilteredAllWorkCasesRequest(page: Page, actorId: string): Promise<Request> {
  return page.waitForRequest((request) => {
    if (!allWorkCasesRoutePattern.exec(request.url()) || request.method() !== 'POST') {
      return false;
    }

    const requestBody = parseAllWorkCasesRequest(request);
    return requestBody.searchRequest?.search_parameters?.some(
      (parameter) => parameter.key === 'actorId' && parameter.values === actorId
    );
  });
}

export async function waitForAllWorkCasesPageRequest(page: Page, pageNumber: number): Promise<Request> {
  return page.waitForRequest((request) => {
    if (!allWorkCasesRoutePattern.exec(request.url()) || request.method() !== 'POST') {
      return false;
    }

    const requestBody = parseAllWorkCasesRequest(request);
    return requestBody.searchRequest?.pagination_parameters?.page_number === pageNumber;
  });
}
