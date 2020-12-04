import * as chai from 'chai'
import { expect } from 'chai'
import 'mocha'
import * as sinon from 'sinon'
import * as sinonChai from 'sinon-chai'
import * as searchCases from './index'

chai.use(sinonChai)

describe('Search Cases Elastic Search', () => {

  let sandbox
  let result2

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
  })

  afterEach(() => {
    sandbox.restore()
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
            native_es_query: {
              from: 25,
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
              },
              size: 25,
              sort: [
                {
                  'data.dummy.keyword': 'ASC'
                }
              ],
            },
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
          native_es_query: {
            from: 25,
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
            },
            size: 25,
            sort: [
              {
                'reference.keyword': 'DESC'
              }
            ],
          },
          supplementary_data: ['*']
      }

      expect(searchCases.prepareElasticQuery(queryParams, body)).to.deep.equal(expected)
    })
  })

})
