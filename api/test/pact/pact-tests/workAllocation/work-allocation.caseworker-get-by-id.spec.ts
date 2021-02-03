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
      dir: path.resolve(__dirname, '../../pacts'),
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

  for (const key in CASEWORKERS) {
    describe(`when requested to get a caseworker with id of ${CASEWORKERS[key].idamId}`, () => {
      before(() =>
        provider.addInteraction({
          state: `${CASEWORKERS[key].firstName} ${CASEWORKERS[key].lastName} is returned`,
          uponReceiving: `a request for a caseworker with an id of ${CASEWORKERS[key].idamId}`,
          withRequest: {
            method: 'GET',
            path: `/caseworker/${CASEWORKERS[key].idamId}`
          },
          willRespondWith: {
            status: 200,
            headers: {'Content-Type': 'application/json'},
            body: CASEWORKERS[key]
          }
        })
      )

      it(`returns ${CASEWORKERS[key].firstName} ${CASEWORKERS[key].lastName}`, async () => {
          const caseworkerUrl = `${provider.mockService.baseUrl}/caseworker/${CASEWORKERS[key].idamId}`;
          assert.isDefined(handleCaseWorkerDetails(caseworkerUrl, {} as EnhancedRequest));
      })
    })
  }
})
