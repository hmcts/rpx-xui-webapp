
import * as chai from 'chai';
import { expect } from 'chai';
import 'mocha';
import * as sinon from 'sinon';
import * as sinonChai from 'sinon-chai';
import { mockRes } from 'sinon-express-mock';
import { http } from '../lib/http';
import { EnhancedRequest } from '../lib/models';
import { getLocations } from '.';


// Mock data , service stub and spy is created and 2 test implimented (Tests need to be finetuned according to expected logic)
chai.use(sinonChai);
describe('locations', () => {

  let sandbox: sinon.SinonSandbox;
  let spy: any;
  let res: any;
  let next: any;
  const SUCCESS_RESPONSE = { status: {}, data: 'ok' };
  let req = {
    body: {
      searchTerm: 'gla',
      serviceIds: 'IA,SSCS,Divorce',
      locationType: null ,
      userLocations: [{service: 'IA', locations: [{id: '1', name: 'Manchester'}, {id: '2', name: 'Birmingham'}]}]
    }
  }

  beforeEach(() => {
    sandbox = sinon.createSandbox();
    next = sandbox.spy();
    res = mockRes(SUCCESS_RESPONSE);
  });

  afterEach(() => {
    sandbox.restore();
  });

    it('should getLocations work properly', async () => {
    spy = sandbox.stub(http, 'get').resolves({
      status: 201,
      data: [
        {
          court_type_id: 4,
          epimms_id: 1
        },
        {
          court_type_id : 23,
          epimms_id: 2
        }

      ]
    });
      const result = [{ court_type_id: 4, epimms_id: 1 }, { court_type_id: 23, epimms_id: 2 }];
      const response = mockRes();
      let req = {
        body: {
          searchTerm: 'gla',
          serviceIds: 'IA,SSCS,Divorce',
          locationType: null ,
          userLocations: [{service: 'IA', locations: []}]
        }
      }
      await getLocations(req as EnhancedRequest, response, next);
      expect(response.send).to.have.been.calledWith(sinon.match(result));
    });

    it('should getLocations work properly', async () => {
      spy = sandbox.stub(http, 'get').resolves({
        status: 201,
        data: [
          {
            court_type_id: 4,
            epimms_id: 1
          },
          {
            court_type_id : 23,
            epimms_id: 2
          }
        ]
      });

      const result = [{ court_type_id: 4, epimms_id: 1 }, { court_type_id: 23, epimms_id: 2 }];
      const response = mockRes();

      await getLocations(req as EnhancedRequest, response, next);
      expect(response.send).to.have.been.calledWith(sinon.match(result));
    });
});
// Scenario 1: User searches for Glasgow, 'gla' - no userLocations - user should be able to search all 'gla' locations in all services, e.g. Glastonbury, Glacier bay
// Scenario 2: User searches for Glasgow, 'gla' - userLocation 'Glasgow' in 'IA' - user should be able to search only Glasgow for IA, 'gla' locations for other services
// Scenario 3: User searches for Glasgoq, 'gla' - userLocations 'Glastonbury' in 'IA', 'Glacier bay' in 'SSCS' - user should be able to search only for Glastonbury in IA, Glacier bay in SSCS
