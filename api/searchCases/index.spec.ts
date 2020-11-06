import * as chai from 'chai'
import { expect } from 'chai'
import 'mocha'
import * as sinon from 'sinon'
import * as sinonChai from 'sinon-chai'
import { mockReq, mockRes } from 'sinon-express-mock'
import { getConfigValue } from '../configuration'
import { SERVICES_CCD_COMPONENT_API_PATH } from '../configuration/references'
import { http } from '../lib/http'
import * as searchCases from './index'

chai.use(sinonChai)

describe('Search Cases Elastic Search', () => {

  let next
  let sandbox
  let req
  let res
  let result0
  let result1
  let result2
  let spy: any

  beforeEach(() => {
    sandbox = sinon.createSandbox()

    result2 = {
        data: {
            headers: [{fields: []}],
            cases: [{
                fields: [],
                fields_formatted: [],
            }],
            total: 0
        }
    }

    next = sandbox.spy()
    res = mockRes()
    req = mockReq({
      baseUrl: '/api/documents/',
      cookies: [],
      headers: {
        'accept': '*/*',
        'content-type': 'text/test',
        'experimental': 'experiment/test',
      },
      session: {
        save: fun => {
          fun()
        },
      },
      url: 'fdafu4543543/binary',
      query: {},
      body: {},
    })

  })

  afterEach(() => {
    sandbox.restore()
  })

  describe('getCases', () => {
    it('should make a post request', async () => {
        const url = `${getConfigValue(SERVICES_CCD_COMPONENT_API_PATH)}${req.baseUrl}${req.url}`
        const expected = {
            columns: [],
            results: [{ case_fields: [], case_fields_formatted: [] }],
            total: 0
        }

        const expectedParams = {
          from: 0,
          native_es_query: {query: { bool: { must: [] } }},
          size: 10,
          sort: [],
          supplementary_data: ['*'],
        }

        spy = sandbox.stub(http, 'post').resolves(result2)
        await searchCases.getCases(req, res, next)
        expect(spy).to.have.been.calledWith(url, expectedParams)
        expect(res.send).to.have.been.calledWith(expected)
    })

    it('should catch an error', async () => {
        sandbox.restore()
        const error = {
            data: {
                errorDescription: 'You do not have sufficient privileges',
            },
            message: 'access denied',
            status: 403,
        }
        const errReport = {
            apiError: error.message,
            apiErrorDescription: error.data.errorDescription,
            statusCode: error.status,
        }
        spy = sandbox.stub(http, 'post').throws(error)
        await searchCases.getCases(req, res, next)
        expect(next).to.have.been.called
    })
  })

  describe('prepareElasticQuery', () => {
    it('should return elastic search query', async () => {
        const queryParams = {
            page: 2,
            param: 'dummy',
            'case.param2': 'dummy2'
        }
        const body = {
            size: 25,
            sort: {
              column: 'dummy',
              order: 0,
              type: 'Text'
            }
        }

        const expected = {
            from: 25,
            native_es_query: {
              query: {
                  bool: {
                      must: [
                          {
                              match: {
                                  param: {
                                      operator: 'and',
                                      query: 'dummy'
                                  }
                              }
                          },
                          {
                              match: {
                                  'data.param2': {
                                      operator: 'and',
                                      query: 'dummy2'
                                  }
                              }
                          }
                      ]
                  }
              }
            },
            size: 25,
            sort: [
              {
                'data.dummy.keyword': 'ASC'
              }
            ],
            supplementary_data: ['*']
        }

        expect(searchCases.prepareElasticQuery(queryParams, body)).to.deep.equal(expected)
    })
 
    it('should return elastic search query - with metadata', async () => {
      const queryParams = {
        page: 2,
        param: 'dummy',
        'case.param2': 'dummy2'
      }
      const body = {
          size: 25,
          sort: {
            column: '[CASE_REFERENCE]',
            order: 1,
            type: 'Text'
          }
      }

      const expected = {
          from: 25,
          native_es_query: {
            query: {
                bool: {
                    must: [
                        {
                            match: {
                                param: {
                                    operator: 'and',
                                    query: 'dummy'
                                }
                            }
                        },
                        {
                            match: {
                                'data.param2': {
                                    operator: 'and',
                                    query: 'dummy2'
                                }
                            }
                        }
                    ]
                }
            }
          },
          size: 25,
          sort: [
            {
              'reference.keyword': 'DESC'
            }
          ],
          supplementary_data: ['*']
      }

      expect(searchCases.prepareElasticQuery(queryParams, body)).to.deep.equal(expected)
    })
  })

})
