import * as chai from 'chai'
import { expect } from 'chai'
import 'mocha'
import * as sinon from 'sinon'
import * as sinonChai from 'sinon-chai'
import { mockReq, mockRes } from 'sinon-express-mock'
import * as serviceRefData from './index'

chai.use(sinonChai)

describe('Service Ref Data', () => {

  let sandbox
  let res
  let req

  beforeEach(() => {
    sandbox = sinon.createSandbox()
    res = mockRes()
    req = mockReq({})

  })

  afterEach(() => {
    sandbox.restore()
  })

  it('should get service ref data mapping', async() => {

    await serviceRefData.getServiceRefDataMapping(req, res, null);
    const response = [{service: 'IA', serviceCodes: ['BFA1']}, { service: 'CIVIL', serviceCodes: ["AAA6" , 'AAA7']}, {"service": "PRIVATELAW", "serviceCodes": ["ABA5"]}];
    expect(res.send).to.have.been.calledWith(sinon.match(response));
  })

  it('should get only the list of service ref data mapping', async() => {

    const serviceRefDataList = serviceRefData.getServiceRefDataMappingList();
    expect(serviceRefDataList).to.deep.equal([{service: 'IA', serviceCodes: ['BFA1']}, { service: 'CIVIL', serviceCodes: ["AAA6" , 'AAA7']}, {"service": "PRIVATELAW", "serviceCodes": ["ABA5"]}]);
  })

})
