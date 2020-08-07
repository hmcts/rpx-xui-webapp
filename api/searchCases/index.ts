import * as express from 'express'
import * as striptags from 'striptags'
import {getConfigValue} from '../configuration'
import { caseMetaDataFiledsMapping } from '../configuration/mappings'
import {
  SERVICES_CCD_COMPONENT_API_PATH,
} from '../configuration/references'
import { http } from '../lib/http'
import { setHeaders } from '../lib/proxy'
import { fieldNameMapper } from '../lib/util'

/**
 * Manually creating Elastic search query
 */
export async function getCases(req: express.Request, res: express.Response, next: express.NextFunction) {
    let url = striptags(req.url)
    url = req.baseUrl  + url
    const headers: any = setHeaders(req)

    try {
        const body = prepareElasticQuery(req.query, req.body)
        console.log(JSON.stringify(body))
        const response = await http.post(`${getConfigValue(SERVICES_CCD_COMPONENT_API_PATH)}${url}`, body, { headers })

        res.status(response.status)

        res.send(handleElasticSearchResponse(response.data))
    } catch (e) {
        next(e)
    }
}

export function prepareElasticQuery(queryParams: {page?}, body: {size?, sort?}): {} {
    const metaCriteria = queryParams
    let caseCriteria = {}
    let query: {} = {}
    const matchList: any[] = []
    const size = body.size || 10
    const sort = body.sort ? prepareSort(body.sort) : []
    const page = (queryParams.page || 1) - 1
    const from = page * size

    Object.keys(metaCriteria).map(key => {
        if (key === 'ctid' || key === 'usecase' || key === 'view' || key === 'page') {
            delete metaCriteria[key]
        }

        if (key.indexOf('case.') > -1) {
            const newKey = key.replace('case.', '')
            caseCriteria = {
                ...caseCriteria,
                [newKey]: metaCriteria[key],
            }
            delete metaCriteria[key]
        }
    })

    if (metaCriteria) {
        for (const criterion of Object.keys(metaCriteria)) {

            if (metaCriteria[criterion]) {
                const keyName = fieldNameMapper(
                    criterion.replace('[', '').replace(']', '').toLowerCase(),
                    caseMetaDataFiledsMapping
                )
                const match = {
                    match: {
                        [keyName]: {
                            operator: 'and',
                            query: metaCriteria[criterion],
                        },
                    },
                }
                matchList.push(match)
            }
        }

    }

    if (caseCriteria) {
        for (const criterion of Object.keys(caseCriteria)) {

            if (caseCriteria[criterion]) {
                const match = {
                    match: {
                        ['data.' + criterion]: {
                            operator: 'and',
                            query: caseCriteria[criterion],
                        },
                    },
                }
                matchList.push(match)
            }
        }
    }

    query = {
        bool: {
            must: matchList,
        },
    }

    return {
        from,
        query,
        size,
        sort,
    }
}

function prepareSort(params) {
    const sortQuery = []
    if (params.hasOwnProperty('column') && params.hasOwnProperty('order')) {
        const columnName = params.column.indexOf('[') === -1 ?
                            `data.${params.column}.keyword` :
                            `${fieldNameMapper(
                                params.column.replace('[', '').replace(']', '').toLowerCase(),
                                caseMetaDataFiledsMapping
                            )}.keyword`
        const orderDirection = params.order === 0 ? 'ASC' : 'DESC'
        sortQuery.push(
            {
                [columnName]: orderDirection,
            }
        )
    }
    return sortQuery
}

function handleElasticSearchResponse(json): {} {

    const results = json.cases.map(caseObj => {
      caseObj.case_fields = caseObj.fields
      caseObj.case_fields_formatted = caseObj.fields_formatted
      delete caseObj.fields
      delete caseObj.fields_formatted
      return caseObj
    })

    const handledResponse = {
        'columns': json.headers[0].fields,
        'results': results,
        'total': json.total,
    }

    return handledResponse
}
