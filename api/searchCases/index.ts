import { caseMetaDataFiledsMapping } from '../configuration/mappings'
import { fieldNameMapper } from '../lib/util'

/**
 * Manually creating Elastic search query
 */
export function modifyRequest(proxyReq, req) {
    const request = prepareElasticQuery(req.query, req.body)

    // Write out body changes to the proxyReq stream
    const body = JSON.stringify(request)

    // Update header
    proxyReq.setHeader('content-type', 'application/json')
    proxyReq.setHeader('content-length', body.length)

    // Write out body changes to the proxyReq stream
    proxyReq.write(body)

    // Remove body-parser body object from the request
    delete req.body
    proxyReq.end()
}

export function prepareElasticQuery(queryParams: {page?}, body: any): {} {
    const metaCriteria = queryParams
    let caseCriteria = {}
    let nativeEsQuery: {} = {}
    const matchList: any[] = []
    const size = body.size || 10
    const sort = body.sort ? prepareSort(body.sort) : []
    const page = (queryParams.page || 1) - 1
    const from = page * size

    Object.keys(metaCriteria).map(key => {
        if (key === 'ctid' || key === 'use_case' || key === 'view' || key === 'page') {
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

    nativeEsQuery = {
        from,
        query: {
            bool: {
                must: matchList,
            },
        },
        size,
        sort,
    }

    return {
        native_es_query: nativeEsQuery,
        supplementary_data: ['*'],
    }
}

function prepareSort(params) {
    const sortQuery = []
    if (params.hasOwnProperty('column') && params.hasOwnProperty('order') && params.hasOwnProperty('type')) {
        let columnName: string

        if (params.column.indexOf('[') === -1 ) {
            columnName = `data.${params.column}${isKeywordSuffixNeeded(params.column, params.type)}`
        } else {
            const mappedName = fieldNameMapper(
                params.column.replace('[', '').replace(']', '').toLowerCase(),
                caseMetaDataFiledsMapping
            )
            columnName = `${mappedName}${isKeywordSuffixNeeded(mappedName, params.type)}`
        }
        const orderDirection = params.order === 0 ? 'ASC' : 'DESC'
        sortQuery.push(
            {
                [columnName]: orderDirection,
            }
        )
    }
    return sortQuery
}

function isKeywordSuffixNeeded(columnName, type): string {
    const types = ['Text', 'TextArea', 'FixedList', 'FixedListEdit', 'MultiSelectList', 'FixedRadioList', 'DynamicList']
    const specialFields = ['reference', 'jurisdiction', 'state', 'case_type_id']
    const isText = types.includes(type) || specialFields.includes(columnName)
    return isText ? '.keyword' : ''
}

export function handleElasticSearchResponse(proxyRes, req, res, json): {} {

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
