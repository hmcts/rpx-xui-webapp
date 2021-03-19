import * as chai from 'chai'
import { expect } from 'chai'
import 'mocha'
import * as sinon from 'sinon'
import * as sinonChai from 'sinon-chai'
import { UserInfo } from '../auth/interfaces/UserInfo'
import * as searchCases from './index'
import { ElasticSearchQuery } from './interfaces/ElasticSearchQuery'

chai.use(sinonChai)

describe('Search Cases Elastic Search', () => {

  let sandbox
  let result2

  beforeEach(() => {
    sandbox = sinon.createSandbox()

    result2 = {
      data: {
        cases: [{
          fields: [],
          fields_formatted: [],
        }],
        headers: [{ fields: [] }],
        total: 0,
      },
    }
  })

  afterEach(() => {
    sandbox.restore()
  })

  describe('prepareElasticQuery', () => {
    it('should return elastic search query', async () => {
      const queryParams = {
        'case.param2': 'dummy2',
        page: 2,
        param: 'dummy',
      }
      const body = {
        size: 25,
        sort: {
          column: 'dummy',
          order: 0,
          type: 'Text',
        },
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
                      query: 'dummy',
                    },
                  },
                },
                {
                  match: {
                    'data.param2': {
                      operator: 'and',
                      query: 'dummy2',
                    },
                  },
                },
              ],
            },
          },
          size: 25,
          sort: [
            {
              'data.dummy.keyword': 'ASC',
            },
          ],
        },
        supplementary_data: ['*'],
      }

      const userInfo: UserInfo = {
        forename: 'Thomas',
        roles: ['case'],
        surname: 'Jones',
      }

      expect(searchCases.prepareElasticQuery(queryParams, body, userInfo)).to.deep.equal(expected)
    })

    it('should return elastic search query - with metadata', async () => {
      const queryParams = {
        'case.param2': 'dummy2',
        page: 2,
        param: 'dummy',
      }
      const body = {
        size: 25,
        sort: {
          column: '[CASE_REFERENCE]',
          order: 1,
          type: 'Text',
        },
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
                      query: 'dummy',
                    },
                  },
                },
                {
                  match: {
                    'data.param2': {
                      operator: 'and',
                      query: 'dummy2',
                    },
                  },
                },
              ],
            },
          },
          size: 25,
          sort: [
            {
              'reference.keyword': 'DESC',
            },
          ],
        },
        supplementary_data: ['*'],
      }

      const userInfo: UserInfo = {
        forename: 'Thomas',
        roles: ['case'],
        surname: 'Jones',
      }

      expect(searchCases.prepareElasticQuery(queryParams, body, userInfo)).to.deep.equal(expected)
    })

    it('should perform a wildcard search on "generatedSurname" field ', async () => {

      const queryParams = {
        'case.generatedSurname': 'Beckham',
        'ctid': 'Benefit',
        'ctid.param2': 'Demo',
        page: 1,
        param: 'dummy',
        'use_case': 'WORKBASKET',
        view: 'WORKBASKET',
      }
      const body = {
        size: 25,
        sort: {
          column: '[CASE_REFERENCE]',
          order: 1,
          type: 'Text',
        },
      }

      const userInfo: UserInfo = {
        forename: 'Thomas',
        roles: ['caseworker'],
        surname: 'Jones',
      }

      const result: ElasticSearchQuery = searchCases.prepareElasticQuery(queryParams, body, userInfo)

      const wildCardSearchQuery = result.native_es_query.query.bool.must[2].wildcard['data.generatedSurname']

      expect(wildCardSearchQuery).to.equal('*beckham*')
    })

    it('should not perform a wildcard search on "generatedSurname" field', async () => {
      const queryParams = {
        'case.generatedSurname': 'Beckham',
        'ctid.param2': 'Demo',
        page: 1,
        param: 'dummy',
        'use_case': 'WORKBASKET',
        view: 'WORKBASKET',
      }
      const body = {
        size: 25,
        sort: {
          column: '[CASE_REFERENCE]',
          order: 1,
          type: 'Text',
        },
      }

      const userInfo: UserInfo = {
        forename: 'Thomas',
        roles: ['case'],
        surname: 'Jones',
      }
      const result: ElasticSearchQuery = searchCases.prepareElasticQuery(queryParams, body, userInfo)
      const wildCardSearchQuery = result.native_es_query.query.bool.must[2].match['data.generatedSurname']
      expect(wildCardSearchQuery.query).to.equal('Beckham')
    })
  })

})
