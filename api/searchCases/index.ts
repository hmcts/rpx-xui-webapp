import { UserInfo } from '../auth/interfaces/UserInfo';
import { getConfigValue } from '../configuration';
import { caseMetaDataFiledsMapping } from '../configuration/mappings';
import { WILDCARD_SEARCH_FIELDS, WILDCARD_SEARCH_ROLES } from '../configuration/references';
import { fieldNameMapper } from '../lib/util';
import { ElasticSearchQuery } from './interfaces/ElasticSearchQuery';

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
  const allowedRoles: string[] = getConfigValue(WILDCARD_SEARCH_ROLES) as string[];
  return userInfo && userInfo.roles && userInfo.roles.filter((role: string) => allowedRoles
    .map((allowedRole: string) => allowedRole.toLowerCase())
    .indexOf(role.toLowerCase()) >= 0).length > 0;
}

export function prepareElasticQuery(queryParams: { page?}, body: any, user: UserInfo): ElasticSearchQuery {
  const metaCriteria: { [key: string]: string } = queryParams;
  let caseCriteria: object = {};
  const matchList: any[] = [];
  const size = body.size || 10;
  const sort = body.sort ? prepareSort(body.sort) : [];
  const page: number = (queryParams.page || 1) - 1;
  const from: number = page * size;
  const canPerformWildCardSearch: boolean = userCanPerformWildCardSearch(user);
  const caseType: string = metaCriteria.ctid;
  const fieldsToApplyWildCardSearchesTo = getConfigValue(WILDCARD_SEARCH_FIELDS) as { [key: string]: string[] };

  Object.keys(metaCriteria).map((key: string): void => {
    if (key === 'ctid' || key === 'use_case' || key === 'view' || key === 'page') {
      delete metaCriteria[key];
    }

    if (key.indexOf('case.') > -1) {
      const newKey: string = key.replace('case.', '');
      caseCriteria = {
        ...caseCriteria,
        [newKey]: metaCriteria[key]
      };
      delete metaCriteria[key];
    }
  });

  if (metaCriteria) {
    for (const criterion of Object.keys(metaCriteria)) {
      if (metaCriteria[criterion]) {
        const keyName = fieldNameMapper(
          criterion.replace('[', '').replace(']', '').toLowerCase(),
          caseMetaDataFiledsMapping
        );
        const match: any = {
          match: {
            [keyName]: {
              operator: 'and',
              query: metaCriteria[criterion]
            }
          }
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
                [field]: searchTerm
              }
            };
          } else {
            match = {
              wildcard: {
                [field]: `*${searchTerm.toLowerCase()}*`
              }
            };
          }
        } else {
          match = {
            match: {
              [field]: {
                operator: 'and',
                query: searchTerm
              }
            }
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
        boolQuery.must.push(...must);
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

  const nativeEsQuery: any = {
    from,
    size,
    sort,
    query: (boolQuery.filter || boolQuery.must || boolQuery.should || boolQuery.must_not) // This is a guard to avoid returning an empty bool query when nothing was added
      ? { bool: boolQuery }
      : { match_all: {} }
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
    supplementary_data: ['*']
  };
}

function prepareSort(params) {
  const sortQuery = [];
  if (params.hasOwnProperty('column') && params.hasOwnProperty('order') && params.hasOwnProperty('type')) {
    let columnName: string;

    if (params.column.indexOf('[') === -1) {
      columnName = `data.${params.column}${isKeywordSuffixNeeded(params.column, params.type)}`;
    } else {
      const mappedName = fieldNameMapper(
        params.column.replace('[', '').replace(']', '').toLowerCase(),
        caseMetaDataFiledsMapping
      );
      columnName = `${mappedName}${isKeywordSuffixNeeded(mappedName, params.type)}`;
    }
    const orderDirection: 'ASC' | 'DESC' = params.order === 0 ? 'ASC' : 'DESC';
    sortQuery.push(
      {
        [columnName]: orderDirection
      }
    );
  }
  return sortQuery;
}

function isKeywordSuffixNeeded(columnName, type): string {
  const types: string[] = ['Text', 'TextArea', 'FixedList', 'FixedListEdit', 'MultiSelectList', 'FixedRadioList', 'DynamicList'];
  const specialFields: string[] = ['reference', 'jurisdiction', 'state', 'case_type_id'];
  const isText: boolean = types.includes(type) || specialFields.includes(columnName);
  return isText ? '.keyword' : '';
}

export function handleElasticSearchResponse(proxyRes, req, res, json): object {
  if (json.cases) {
    const results = json.cases.map((caseObj) => {
      caseObj.case_fields = caseObj.fields;
      caseObj.case_fields_formatted = caseObj.fields_formatted;
      delete caseObj.fields;
      delete caseObj.fields_formatted;
      return caseObj;
    });

    return {
      'columns': json.headers[0].fields,
      'results': results,
      'total': json.total
    };
  }
  return {};
}

function canApplyWildCardSearch(
  wildcardSearchFields: { [key: string]: string[] },
  caseType: string,
  criterion: string
): boolean {
  return wildcardSearchFields
    && wildcardSearchFields.hasOwnProperty(caseType)
    && Array.isArray(wildcardSearchFields[caseType])
    && wildcardSearchFields[caseType].indexOf(criterion) >= 0;
}

function phraseHasSpecialCharacters(phrase: string): boolean {
  const specialCharacters: string[] = [' ', '-', '_'];
  return specialCharacters.filter((specialCharacter: string): boolean => phrase.indexOf(specialCharacter) >= 0).length > 0;
}

function getUserInfoFromRequest(req: any): UserInfo {
  try {
    return req.session.passport.user.userinfo as UserInfo;
  } catch (error) {
    return null;
  }
}
