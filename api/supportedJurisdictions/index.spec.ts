import * as chai from 'chai'
import { expect } from 'chai'
import 'mocha'
import * as sinon from 'sinon'
import * as sinonChai from 'sinon-chai'
import { mockReq, mockRes } from 'sinon-express-mock'
import * as supportedJurisdictions from './index'

chai.use(sinonChai)

describe('Supported Jurisdictions', () => {

  let sandbox
  let res
  let req

  beforeEach(() => {
    sandbox = sinon.createSandbox()
    res = mockRes()
    req = mockReq({
      session: {
        supportedJurisdictions: ['IA'],
      },
  })

  })

  afterEach(() => {
    sandbox.restore()
  })

  it('should get supported jurisdictions', async() => {

    await supportedJurisdictions.getWASupportedJurisdictions(req, res, null);
    const response = ['IA'];
    expect(res.send).to.have.been.calledWith(sinon.match(response));
    req.session.supportedJurisdictions = null;
    await supportedJurisdictions.getWASupportedJurisdictions(req, res, null);
    expect(res.send).to.have.been.calledWith(sinon.match(response));
  })

})
