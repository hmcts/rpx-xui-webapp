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
  const userInfo = req.session.passport.user.userinfo as UserInfo;
  const request = prepareElasticQuery(req.query, req.body, userInfo);

  // Write out body changes to the proxyReq stream
  const body = JSON.stringify(request);

  // Update header
  proxyReq.setHeader('content-type', 'application/json');
  proxyReq.setHeader('content-length', body.length);

  // Write out body changes to the proxyReq stream
  proxyReq.write(body);

  // Remove body-parser body object from the request
  delete req.body;
  proxyReq.end();
}

export function userCanPerformWildCardSearch(userInfo: UserInfo): boolean {
  const allowedRoles = getConfigValue(WILDCARD_SEARCH_ROLES) as string[];
  return userInfo && userInfo.roles && userInfo.roles.filter((role: string) => allowedRoles
    .map((allowedRole: string) => allowedRole.toLowerCase())
    .indexOf(role.toLowerCase()) >= 0).length > 0;
}

export function prepareElasticQuery(queryParams: { page? }, body: any, user: UserInfo): ElasticSearchQuery {
  const metaCriteria: { [key: string]: string } = queryParams;
  let caseCriteria = {};
  let nativeEsQuery: {};
  const matchList: any[] = [];
  const size = body.size || 10;
  const sort = body.sort ? prepareSort(body.sort) : [];
  const page = (queryParams.page || 1) - 1;
  const from = page * size;
  const canPerformWildCardSearch: boolean = userCanPerformWildCardSearch(user);
  const caseType: string = metaCriteria.ctid;
  const fieldsToApplyWildCardSearchesTo = getConfigValue(WILDCARD_SEARCH_FIELDS) as { [key: string]: string[] };

  Object.keys(metaCriteria).map(key => {
    if (key === 'ctid' || key === 'use_case' || key === 'view' || key === 'page') {
      delete metaCriteria[key];
    }

    if (key.indexOf('case.') > -1) {
      const newKey = key.replace('case.', '');
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
        const keyName = fieldNameMapper(
          criterion.replace('[', '').replace(']', '').toLowerCase(),
          caseMetaDataFiledsMapping
        );
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

  nativeEsQuery = {
    from,
    query: {
      bool: {
        must: matchList,
      },
    },
    size,
    sort,
  };

  return {
    native_es_query: nativeEsQuery,
    supplementary_data: ['*'],
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
    const orderDirection = params.order === 0 ? 'ASC' : 'DESC';
    sortQuery.push(
      {
        [columnName]: orderDirection,
      }
    );
  }
  return sortQuery;
}

function isKeywordSuffixNeeded(columnName, type): string {
  const types = ['Text', 'TextArea', 'FixedList', 'FixedListEdit', 'MultiSelectList', 'FixedRadioList', 'DynamicList'];
  const specialFields = ['reference', 'jurisdiction', 'state', 'case_type_id'];
  const isText = types.includes(type) || specialFields.includes(columnName);
  return isText ? '.keyword' : '';
}

export function handleElasticSearchResponse(proxyRes, req, res, json): {} {
  if (json.cases) {
    const results = json.cases.map(caseObj => {
      caseObj.case_fields = caseObj.fields;
      caseObj.case_fields_formatted = caseObj.fields_formatted;
      delete caseObj.fields;
      delete caseObj.fields_formatted;
      return caseObj;
    });

    return {
      'columns': json.headers[0].fields,
      'results': results,
      'total': json.total,
    };
  }
  return {};
}

function canApplyWildCardSearch(wildcardSearchFields: { [key: string]: string[] }, caseType: string, criterion: string): boolean {
  return wildcardSearchFields
    && wildcardSearchFields.hasOwnProperty(caseType)
    && Array.isArray(wildcardSearchFields[caseType])
    && wildcardSearchFields[caseType].indexOf(criterion) >= 0;
}

function phraseHasSpecialCharacters(phrase: string): boolean {
  const specialCharacters: string[] = [' ', '-', '_'];
  return specialCharacters.filter((specialCharacter: string) => phrase.indexOf(specialCharacter) >= 0).length > 0;
}
