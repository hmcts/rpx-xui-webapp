import { Pact } from '@pact-foundation/pact';
import { assert } from 'chai';
import * as getPort from 'get-port';
import * as path from 'path';

import { EnhancedRequest } from '../../../../lib/models';
import { handleCaseWorkerDetails } from '../../../../workAllocation/caseWorkerService';
import { CASEWORKERS } from '../../constants/work-allocation/caseworkers.spec';

describe('Work Allocation for location and service Caseworker API', () => {

  let mockServerPort: number;
  let provider: Pact;

  before(async () => {
    mockServerPort = await getPort()
    provider = new Pact({
      consumer: 'xui_work_allocation_caseworker_get_by_id',
      dir: path.resolve(__dirname, '../pacts'),
      log: path.resolve(__dirname, '../logs', 'work-allocation.log'),
      logLevel: 'info',
      port: mockServerPort,
      provider: 'WorkAllocation_api_caseworker',
      spec: 2,
    })
    return provider.setup()
  })

  // Write Pact when all tests done
  after(() => provider.finalize())

  describe('when requested to get a caseworker with id of 1', () => {
    before(() =>
      provider.addInteraction({
        state: 'John Smith is returned',
        uponReceiving: 'a request for a caseworker with an id of 1',
        withRequest: {
          method: 'GET',
          path: '/caseworker/1'
        },
        willRespondWith: {
          status: 200,
          headers: {'Content-Type': 'application/json'},
          body: CASEWORKERS.JOHN_SMITH
        }
      })
    )

    it('returns John Smith', async () => {
        const caseworkerUrl = `${provider.mockService.baseUrl}/caseworker/1`;
        assert.isDefined(handleCaseWorkerDetails(caseworkerUrl, {} as EnhancedRequest));
    })
  })

  describe('when requested to get a caseworker with id of 2', () => {
    before(() =>
      provider.addInteraction({
        state: 'Jane Doe is returned',
        uponReceiving: 'a request for a caseworker with an id of 2',
        withRequest: {
          method: 'GET',
          path: '/caseworker/2'
        },
        willRespondWith: {
          status: 200,
          headers: {'Content-Type': 'application/json'},
          body: CASEWORKERS.JANE_DOE
        }
      })
    )

    it('returns Jane Doe', async () => {
        const caseworkerUrl = `${provider.mockService.baseUrl}/caseworker/2`;
        assert.isDefined(handleCaseWorkerDetails(caseworkerUrl, {} as EnhancedRequest));
    })
  })

  describe('when requested to get a caseworker with id of 3', () => {
    before(() =>
      provider.addInteraction({
        state: 'Joseph Bloggs is returned',
        uponReceiving: 'a request for a caseworker with an id of 3',
        withRequest: {
          method: 'GET',
          path: '/caseworker/3'
        },
        willRespondWith: {
          status: 200,
          headers: {'Content-Type': 'application/json'},
          body: CASEWORKERS.JOSEPH_BLOGGS
        }
      })
    )

    it('returns Joseph Bloggs', async () => {
        const caseworkerUrl = `${provider.mockService.baseUrl}/caseworker/3`;
        assert.isDefined(handleCaseWorkerDetails(caseworkerUrl, {} as EnhancedRequest));
    })
  })

  describe('when requested to get a caseworker with id of 4', () => {
    before(() =>
      provider.addInteraction({
        state: 'Noah Body is returned',
        uponReceiving: 'a request for a caseworker with an id of 4',
        withRequest: {
          method: 'GET',
          path: '/caseworker/4'
        },
        willRespondWith: {
          status: 200,
          headers: {'Content-Type': 'application/json'},
          body: CASEWORKERS.NOAH_BODY
        }
      })
    )

    it('returns Noah Body', async () => {
        const caseworkerUrl = `${provider.mockService.baseUrl}/caseworker/4`;
        assert.isDefined(handleCaseWorkerDetails(caseworkerUrl, {} as EnhancedRequest));
    })
  })
})
