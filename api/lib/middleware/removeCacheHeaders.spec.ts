import { expect } from 'chai';
import * as sinon from 'sinon';
import { mockReq, mockRes } from 'sinon-express-mock';
import { removeCacheHeaders } from './removeCacheHeaders';

describe('removeCacheHeaders', () => {
  let sandbox: sinon.SinonSandbox;
  let req: any;
  let res: any;
  let next: sinon.SinonStub;

  beforeEach(() => {
    sandbox = sinon.createSandbox();
    req = mockReq();
    res = mockRes();
    res.removeHeader = sandbox.stub();
    next = sandbox.stub();
  });

  afterEach(() => {
    sandbox.restore();
  });

  it('should remove Cache-Control header', () => {
    removeCacheHeaders(req, res, next);
    expect(res.removeHeader).to.have.been.calledWith('Cache-Control');
  });

  it('should remove Pragma header', () => {
    removeCacheHeaders(req, res, next);
    expect(res.removeHeader).to.have.been.calledWith('Pragma');
  });

  it('should remove Expires header', () => {
    removeCacheHeaders(req, res, next);
    expect(res.removeHeader).to.have.been.calledWith('Expires');
  });

  it('should remove Surrogate-Control header', () => {
    removeCacheHeaders(req, res, next);
    expect(res.removeHeader).to.have.been.calledWith('Surrogate-Control');
  });

  it('should call next middleware function', () => {
    removeCacheHeaders(req, res, next);
    expect(next).to.have.been.calledOnce;
    expect(next).to.have.been.calledWithExactly();
  });

  it('should remove all cache headers in the expected order', () => {
    removeCacheHeaders(req, res, next);
    
    const callOrder = res.removeHeader.getCalls().map((call: any) => call.args[0]);
    expect(callOrder).to.deep.equal([
      'Cache-Control',
      'Pragma',
      'Expires',
      'Surrogate-Control'
    ]);
  });
});
