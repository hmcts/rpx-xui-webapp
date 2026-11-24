import * as chai from 'chai';
import { expect } from 'chai';
import 'mocha';
import * as sinon from 'sinon';
import { UserInfo } from '../auth/interfaces/UserInfo';
import * as searchCases from './index';
import { ElasticSearchQuery } from './interfaces/ElasticSearchQuery';

// Import sinon-chai using require to avoid ES module issues
const sinonChai = require('sinon-chai');
chai.use(sinonChai);

describe('Search Cases Elastic Search', () => {
  let sandbox;
  // let result2;

  beforeEach(() => {
    sandbox = sinon.createSandbox();

    // result2 = {
    //   data: {
    //     cases: [{
    //       fields: [],
    //       fields_formatted: []
    //     }],
    //     headers: [{ fields: [] }],
    //     total: 0
    //   }
    // };
  });

  afterEach(() => {
    sandbox.restore();
  });

  describe('prepareElasticQuery', () => {
    it('should return elastic search query', async () => {
      const queryParams = {
        'case.param2': 'dummy2',
        page: 2,
        param: 'dummy',
      };
      const body = {
        size: 25,
        sort: {
          column: 'dummy',
          order: 0,
          type: 'Text',
        },
      };

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
      };

      const userInfo: UserInfo = {
        forename: 'Thomas',
        roles: ['case'],
        surname: 'Jones',
      };

      expect(searchCases.prepareElasticQuery(queryParams, body, userInfo)).to.deep.equal(expected);
    });

    it('should return elastic search query - with metadata', async () => {
      const queryParams = {
        'case.param2': 'dummy2',
        page: 2,
        param: 'dummy',
      };
      const body = {
        size: 25,
        sort: {
          column: '[CASE_REFERENCE]',
          order: 1,
          type: 'Text',
        },
      };

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
      };

      const userInfo: UserInfo = {
        forename: 'Thomas',
        roles: ['case'],
        surname: 'Jones',
      };

      expect(searchCases.prepareElasticQuery(queryParams, body, userInfo)).to.deep.equal(expected);
    });

    it('should perform a wildcard search on "generatedSurname" field ', async () => {
      const queryParams = {
        'case.generatedSurname': 'Beckham',
        ctid: 'Benefit',
        'ctid.param2': 'Demo',
        page: 1,
        param: 'dummy',
        use_case: 'WORKBASKET',
        view: 'WORKBASKET',
      };
      const body = {
        size: 25,
        sort: {
          column: '[CASE_REFERENCE]',
          order: 1,
          type: 'Text',
        },
      };

      const userInfo: UserInfo = {
        forename: 'Thomas',
        roles: ['caseworker'],
        surname: 'Jones',
      };

      const result: ElasticSearchQuery = searchCases.prepareElasticQuery(queryParams, body, userInfo);

      const wildCardSearchQuery = result.native_es_query.query.bool.must[2].wildcard['data.generatedSurname'];

      expect(wildCardSearchQuery).to.equal('*beckham*');
    });

    it('should not perform a wildcard search on "generatedSurname" field', async () => {
      const queryParams = {
        'case.generatedSurname': 'Beckham',
        'ctid.param2': 'Demo',
        page: 1,
        param: 'dummy',
        use_case: 'WORKBASKET',
        view: 'WORKBASKET',
      };
      const body = {
        size: 25,
        sort: {
          column: '[CASE_REFERENCE]',
          order: 1,
          type: 'Text',
        },
      };

      const userInfo: UserInfo = {
        forename: 'Thomas',
        roles: ['case'],
        surname: 'Jones',
      };
      const result: ElasticSearchQuery = searchCases.prepareElasticQuery(queryParams, body, userInfo);
      const wildCardSearchQuery = result.native_es_query.query.bool.must[2].match['data.generatedSurname'];
      expect(wildCardSearchQuery.query).to.equal('Beckham');
    });

    it('should not throw when the body is undefined', async () => {
      const queryParams = { ctid: 'PCS', page: 1, use_case: 'WORKBASKET', view: 'WORKBASKET' };
      const userInfo: UserInfo = {
        forename: 'Thomas',
        roles: ['case'],
        surname: 'Jones',
      };

      const result: ElasticSearchQuery = searchCases.prepareElasticQuery(queryParams, undefined, userInfo);

      expect(result.native_es_query.size).to.equal(10);
      expect(result.native_es_query.from).to.equal(0);
      expect(result.native_es_query.sort).to.deep.equal([]);
    });

    it('should create an inclusive last-modified date range from datetime filters', () => {
      const queryParams = {
        'case.dateFrom': '2026-11-18T00:00:00.000',
        'case.dateTo': '2026-11-20T00:00:00.000',
        page: 1,
      };
      const userInfo: UserInfo = {
        forename: 'Thomas',
        roles: ['case'],
        surname: 'Jones',
      };

      const result = searchCases.prepareElasticQuery(queryParams, undefined, userInfo);

      expect(result.native_es_query.query).to.deep.equal({
        bool: {
          filter: [
            {
              range: {
                last_modified: {
                  gte: '2026-11-18T00:00:00.000Z',
                  lt: '2026-11-21T00:00:00.000Z',
                },
              },
            },
          ],
        },
      });
    });

    it('should continue to accept date-only last-modified filters', () => {
      const queryParams = {
        'case.dateFrom': '2026-11-18',
        'case.dateTo': '2026-11-18',
      };
      const userInfo: UserInfo = {
        forename: 'Thomas',
        roles: ['case'],
        surname: 'Jones',
      };

      const result = searchCases.prepareElasticQuery(queryParams, undefined, userInfo);
      const filter = result.native_es_query.query.bool.filter[0] as {
        range: { last_modified: { gte: string; lt: string } };
      };

      expect(filter.range.last_modified).to.deep.equal({
        gte: '2026-11-18T00:00:00.000Z',
        lt: '2026-11-19T00:00:00.000Z',
      });
    });

    it('should reject invalid last-modified datetimes', () => {
      const queryParams = { 'case.dateFrom': '2026-11-18T24:00:00.000' };
      const userInfo: UserInfo = {
        forename: 'Thomas',
        roles: ['case'],
        surname: 'Jones',
      };

      expect(() => searchCases.prepareElasticQuery(queryParams, undefined, userInfo)).to.throw(
        'case.dateFrom must be a valid ISO date or datetime'
      );
    });

    it('should reject a last-modified range whose from date is after its to date', () => {
      const queryParams = {
        'case.dateFrom': '2026-11-20T00:00:00.000',
        'case.dateTo': '2026-11-18T00:00:00.000',
      };
      const userInfo: UserInfo = {
        forename: 'Thomas',
        roles: ['case'],
        surname: 'Jones',
      };

      expect(() => searchCases.prepareElasticQuery(queryParams, undefined, userInfo)).to.throw(
        'case.dateFrom must be on or before case.dateTo'
      );
    });
  });

  describe('modifyRequest', () => {
    const userInfo: UserInfo = {
      forename: 'Thomas',
      roles: ['case'],
      surname: 'Jones',
    };

    const buildReq = (body?: any) => ({
      body,
      query: { ctid: 'PCS', page: 1 },
      session: { passport: { user: { userinfo: userInfo } } },
    });

    const buildProxyReq = () => ({
      end: sinon.spy(),
      setHeader: sinon.spy(),
      write: sinon.spy(),
    });

    it('should write the rebuilt query and end the stream', async () => {
      const req: any = buildReq({ size: 25 });
      const proxyReq: any = buildProxyReq();

      searchCases.modifyRequest(proxyReq, req);

      expect(proxyReq.write).to.have.been.calledOnce;
      expect(proxyReq.end).to.have.been.calledOnce;
      expect(req.body).to.be.undefined;
    });

    it('should not throw when the request has no parsed body', async () => {
      const req: any = buildReq(undefined);
      const proxyReq: any = buildProxyReq();

      expect(() => searchCases.modifyRequest(proxyReq, req)).to.not.throw();
      expect(proxyReq.write).to.have.been.calledOnce;
      expect(proxyReq.end).to.have.been.calledOnce;
    });
  });
});
