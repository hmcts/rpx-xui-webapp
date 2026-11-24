import { RequestHandler } from 'express';
import { UserInfo } from '../auth/interfaces/UserInfo';
import { getConfigValue } from '../configuration';
import { caseMetaDataFiledsMapping } from '../configuration/mappings';
import { WILDCARD_SEARCH_FIELDS, WILDCARD_SEARCH_ROLES } from '../configuration/references';
import { fieldNameMapper } from '../lib/util';
import { ElasticSearchQuery, DateRangeBounds } from './interfaces/ElasticSearchQuery';

/**
 * Manually creating Elastic search query
 */
export function modifyRequest(proxyReq, req) {
  const userInfo: UserInfo = getUserInfoFromRequest(req);

  if (userInfo) {
    const request: ElasticSearchQuery = prepareElasticQuery(req.query, req.body, userInfo);

    // Write out body changes to the proxyReq stream
    const body: string = JSON.stringify(request);

    // Update header
    proxyReq.setHeader('content-type', 'application/json');
    proxyReq.setHeader('content-length', body.length);

    // Write out body changes to the proxyReq stream
    proxyReq.write(body);
  }

  // Remove body-parser body object from the request
  delete req.body;
  proxyReq.end();
}

export function userCanPerformWildCardSearch(userInfo: UserInfo): boolean {
  const allowedRoles: string[] = getConfigValue(WILDCARD_SEARCH_ROLES);
  return (
    userInfo &&
    userInfo.roles &&
    userInfo.roles.filter((role: string) =>
      allowedRoles.map((allowedRole: string) => allowedRole.toLowerCase()).includes(role.toLowerCase())
    ).length > 0
  );
}

export function prepareElasticQuery(
  queryParams: { [key: string]: unknown; page?: number },
  body: any,
  user: UserInfo
): ElasticSearchQuery {
  const metaCriteria = queryParams as { [key: string]: string };
  const { bounds, error } = readLastModifiedBounds(metaCriteria);
  if (error !== undefined) {
    throw new Error(error);
  }
  let caseCriteria: object = {};
  const matchList: any[] = [];
  const size = body?.size || 10;
  const sort = body?.sort ? prepareSort(body.sort) : [];
  const page: number = (queryParams.page || 1) - 1;
  const from: number = page * size;
  const canPerformWildCardSearch: boolean = userCanPerformWildCardSearch(user);
  const caseType: string = metaCriteria.ctid;
  const fieldsToApplyWildCardSearchesTo = getConfigValue(WILDCARD_SEARCH_FIELDS) as { [key: string]: string[] };

  Object.keys(metaCriteria).map((key: string): void => {
    if (
      key === 'ctid' ||
      key === 'use_case' ||
      key === 'view' ||
      key === 'page' ||
      key === 'case.dateFrom' ||
      key === 'case.dateTo'
    ) {
      delete metaCriteria[key];
    }

    // date fields are handled separately, so skipped
    if (key.includes('case.') && key !== 'case.dateFrom' && key !== 'case.dateTo') {
      const newKey: string = key.replace('case.', '');
      caseCriteria = {
        ...caseCriteria,
        [newKey]: metaCriteria[key],
      };
      delete metaCriteria[key];
    }
  });

  if (metaCriteria) {
    for (const criterion of Object.keys(metaCriteria)) {
      if (metaCriteria[criterion]) {
        const keyName = fieldNameMapper(criterion.replace('[', '').replace(']', '').toLowerCase(), caseMetaDataFiledsMapping);
        const match: any = {
          match: {
            [keyName]: {
              operator: 'and',
              query: metaCriteria[criterion],
            },
          },
        };
        matchList.push(match);
      }
    }
  }

  if (caseCriteria) {
    for (const criterion of Object.keys(caseCriteria)) {
      const field: string = `data.${criterion}`;
      const searchTerm: string = caseCriteria[criterion] as string;
      if (searchTerm) {
        let match: any;
        // if criterion is in the list of configured fields to apply wild card search use should query
        if (canPerformWildCardSearch && canApplyWildCardSearch(fieldsToApplyWildCardSearchesTo, caseType, criterion)) {
          if (phraseHasSpecialCharacters(searchTerm)) {
            match = {
              match_phrase: {
                [field]: searchTerm,
              },
            };
          } else {
            match = {
              wildcard: {
                [field]: `*${searchTerm.toLowerCase()}*`,
              },
            };
          }
        } else {
          match = {
            match: {
              [field]: {
                operator: 'and',
                query: searchTerm,
              },
            },
          };
        }
        matchList.push(match);
      }
    }
  }

  // =========================
  // Merge client native ES parts into rebuilt query
  // =========================
  const aggs = body?.aggs;
  const post_filter = body?.post_filter;
  const collapse = body?.collapse;
  const indices_boost = body?.indices_boost;

  const boolQuery: any = { must: [] };
  if (matchList.length) {
    boolQuery.must.push(...matchList);
  }

  // Merge client's query (preserve bool internals if present)
  if (body?.query) {
    const q = body.query;
    if (q.bool && typeof q.bool === 'object') {
      const { must, filter, should, must_not } = q.bool;
      if (Array.isArray(must)) {
        (boolQuery.must ||= []).push(...must);
      }
      if (Array.isArray(filter)) {
        (boolQuery.filter ||= []).push(...filter);
      }
      if (Array.isArray(should) && should.length) {
        (boolQuery.should ||= []).push(...should);
      }
      if (Array.isArray(must_not) && must_not.length) {
        (boolQuery.must_not ||= []).push(...must_not);
      }
    } else {
      (boolQuery.must ||= []).push(q);
    }
  }

  const isEmptyArr = (v: any) => !Array.isArray(v) || v.length === 0;
  if (isEmptyArr(boolQuery.must)) {
    delete boolQuery.must;
  }
  if (isEmptyArr(boolQuery.filter)) {
    delete boolQuery.filter;
  }
  if (isEmptyArr(boolQuery.should)) {
    delete boolQuery.should;
  }
  if (isEmptyArr(boolQuery.must_not)) {
    delete boolQuery.must_not;
  }

  // Add optional date range filter based on bounds
  if (bounds && (bounds.startBound || bounds.endBound)) {
    if (boolQuery.should?.length) {
      // Safe guard to prevent all shoulds from being ignored when a filter is added
      boolQuery.minimum_should_match = body?.query?.bool?.minimum_should_match ?? (boolQuery.must || boolQuery.filter ? 0 : 1);
    }

    (boolQuery.filter ||= []).push({
      // add last_modified range filter based on bounds
      range: { last_modified: { gte: bounds.startBound, lt: bounds.endBound } },
    });
  }

  const nativeEsQuery: any = {
    from,
    size,
    sort,
    query:
      boolQuery.filter || boolQuery.must || boolQuery.should || boolQuery.must_not // This is a guard to avoid returning an empty bool query when nothing was added
        ? { bool: boolQuery }
        : { match_all: {} },
  };

  // Attach other native parts if present
  if (aggs) {
    nativeEsQuery.aggs = aggs;
  }
  if (post_filter) {
    nativeEsQuery.post_filter = post_filter;
  }
  if (collapse) {
    nativeEsQuery.collapse = collapse;
  }
  if (indices_boost) {
    nativeEsQuery.indices_boost = indices_boost;
  }

  return {
    native_es_query: nativeEsQuery,
    supplementary_data: ['*'],
  };
}

function prepareSort(params) {
  const sortQuery = [];
  if (params.hasOwnProperty('column') && params.hasOwnProperty('order') && params.hasOwnProperty('type')) {
    let columnName: string;

    if (params.column.includes('[')) {
      const mappedName = fieldNameMapper(
        params.column.replace('[', '').replace(']', '').toLowerCase(),
        caseMetaDataFiledsMapping
      );
      columnName = `${mappedName}${isKeywordSuffixNeeded(mappedName, params.type)}`;
    } else {
      columnName = `data.${params.column}${isKeywordSuffixNeeded(params.column, params.type)}`;
    }
    const orderDirection: 'ASC' | 'DESC' = params.order === 0 ? 'ASC' : 'DESC';
    sortQuery.push({
      [columnName]: orderDirection,
    });
  }
  return sortQuery;
}

function isKeywordSuffixNeeded(columnName, type): string {
  const types: string[] = ['Text', 'TextArea', 'FixedList', 'FixedListEdit', 'MultiSelectList', 'FixedRadioList', 'DynamicList'];
  const specialFields: string[] = ['reference', 'jurisdiction', 'state', 'case_type_id'];
  const isText: boolean = types.includes(type) || specialFields.includes(columnName);
  return isText ? '.keyword' : '';
}

export function handleElasticSearchResponse(json): object {
  if (typeof json === 'string') {
    try {
      const parsed = JSON.parse(json);
      json = parsed;
    } catch (e) {
      console.warn('handleElasticSearchResponse: failed to parse JSON string', e);
      return {};
    }
  }
  if (json.cases) {
    const results = json.cases.map((caseObj) => {
      caseObj.case_fields = caseObj.fields;
      caseObj.case_fields_formatted = caseObj.fields_formatted;
      delete caseObj.fields;
      delete caseObj.fields_formatted;
      return caseObj;
    });
    return {
      columns: json.headers[0].fields,
      results: results,
      total: json.total,
    };
  }
  return {};
}

// confirm last modified dates are valid
export const validateLastModifiedDates: RequestHandler = (req, res, next) => {
  const { error } = readLastModifiedBounds(req.query);

  if (error !== undefined) {
    res.status(400).json({ message: error });
    return;
  }

  next();
};

function canApplyWildCardSearch(wildcardSearchFields: { [key: string]: string[] }, caseType: string, criterion: string): boolean {
  return (
    wildcardSearchFields &&
    wildcardSearchFields.hasOwnProperty(caseType) &&
    Array.isArray(wildcardSearchFields[caseType]) &&
    wildcardSearchFields[caseType].includes(criterion)
  );
}

function phraseHasSpecialCharacters(phrase: string): boolean {
  const specialCharacters: string[] = [' ', '-', '_'];
  return specialCharacters.filter((specialCharacter: string): boolean => phrase.includes(specialCharacter)).length > 0;
}

function getUserInfoFromRequest(req: any): UserInfo {
  try {
    return req.session.passport.user.userinfo as UserInfo;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return null;
  }
}

// additional validation of calendar date strings
// not required because the data should be in correct format and set but a just in case to ensure data correctness
function readCalendarDate(value: unknown): string | null {
  if (typeof value !== 'string') {
    return null;
  }

  // RegEx matches expectation from datetime picker component
  const match = value.match(/^(\d{4}-\d{2}-\d{2})(?:T(\d{2}):(\d{2}):(\d{2})(?:\.\d+)?(?:Z|[+-](\d{2}):(\d{2}))?)?$/);
  if (!match) {
    return null;
  }

  const [, calendarDate, hours, minutes, seconds, offsetHours, offsetMinutes] = match;
  const date = new Date(`${calendarDate}T00:00:00.000Z`);
  const hasValidDate = Number.isFinite(date.getTime()) && date.toISOString().slice(0, 10) === calendarDate;
  const hasValidTime =
    hours === undefined ||
    (Number(hours) <= 23 &&
      Number(minutes) <= 59 &&
      Number(seconds) <= 59 &&
      (offsetHours === undefined || (Number(offsetHours) <= 23 && Number(offsetMinutes) <= 59)));

  return hasValidDate && hasValidTime ? calendarDate : null;
}

function startOfUtcDay(calendarDate: string): string {
  return `${calendarDate}T00:00:00.000Z`;
}

// In the context of setting the bounds for the date range filter, the end date is exclusive, hence startOfNextUtcDay is used
// Even though on the child component, the date is set as 23:59 of the end date chosen
function startOfNextUtcDay(calendarDate: string): string {
  const date = new Date(startOfUtcDay(calendarDate));
  date.setUTCDate(date.getUTCDate() + 1);
  return date.toISOString();
}

// set the bounds for the date range filter
// Note - currently only applicable to the last modified date of cases
function readLastModifiedBounds(
  query: Record<string, unknown>
): { bounds: DateRangeBounds; error?: never } | { bounds?: never; error: string } {
  const from = query['case.dateFrom'];
  const to = query['case.dateTo'];
  const fromDate = from === undefined || from === '' ? undefined : readCalendarDate(from);
  const toDate = to === undefined || to === '' ? undefined : readCalendarDate(to);
  const bounds: DateRangeBounds = {};

  if (fromDate !== undefined) {
    if (fromDate === null) {
      return { error: 'case.dateFrom must be a valid ISO date or datetime' };
    }
    bounds.startBound = startOfUtcDay(fromDate);
  }

  if (toDate !== undefined) {
    if (toDate === null) {
      return { error: 'case.dateTo must be a valid ISO date or datetime' };
    }
    if (fromDate && fromDate > toDate) {
      return { error: 'case.dateFrom must be on or before case.dateTo' };
    }
    bounds.endBound = startOfNextUtcDay(toDate);
  }

  return { bounds };
}
