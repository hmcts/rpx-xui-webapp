import * as chai from 'chai';
import { expect } from 'chai';
import 'mocha';
import * as sinon from 'sinon';
import * as sinonChai from 'sinon-chai';
import { mockReq, mockRes } from 'sinon-express-mock';
import { getConfigValue } from '../configuration';
import {
  SERVICES_CCD_COMPONENT_API_PATH
} from '../configuration/references';
import { http } from './http';
import * as proxy from './proxy';

chai.use(sinonChai);

describe('proxy', () => {
  let next;
  let sandbox;
  let req;
  let res;
  let result;
  let spy: any;
  let spyPost: any;
  let spyPut: any;

  beforeEach(() => {
    sandbox = sinon.createSandbox();

    result = {
      data: 'okay'
    };

    spy = sandbox.stub(http, 'get').resolves(result);
    spyPost = sandbox.stub(http, 'post').resolves(result);
    spyPut = sandbox.stub(http, 'put').resolves(result);

    next = sandbox.spy();
    res = mockRes();
    req = mockReq({
      url: 'fdafu4543543/binary',
      baseUrl: '/api/documents/',
      cookies: [],
      headers: {
        'accept': '*/*',
        'content-type': 'text/test',
        'experimental': 'experiment/test'
      },
      session: {
        save: (fun) => {
          fun();
        }
      }
    });
  });

  afterEach(() => {
    sandbox.restore();
  });

  it('should set content type', () => {
    req.headers.accept = false;
    req.headers.experimental = false;
    const headers = proxy.setHeaders(req);
    expect(headers).to.deep.equal({ 'content-type': 'text/test' });
  });

  it('should return a headers object from request', () => {
    const headers = proxy.setHeaders(req);
    expect(headers).to.deep.equal(req.headers);
  });

  it('should proxy a get request', async () => {
    const url = `${getConfigValue(SERVICES_CCD_COMPONENT_API_PATH)}${req.baseUrl}${req.url}`;
    await proxy.get(req, res, next);
    expect(spy).to.have.been.calledWith(url);
    expect(res.send).to.have.been.calledWith(result.data);
  });

  it('should catch any errors upon proxy get request', async () => {
    spy.restore();
    spy = sandbox.stub(http, 'get').throws({ data: 'error occurred' });
    await proxy.get(req, res, next);
    expect(next).to.have.been.calledWith({ data: 'error occurred' });
  });

  it('should proxy a put request', async () => {
    const url = `${getConfigValue(SERVICES_CCD_COMPONENT_API_PATH)}${req.baseUrl}${req.url}`;
    await proxy.put(req, res, next);
    expect(spyPut).to.have.been.calledWith(url);
    expect(res.send).to.have.been.calledWith(result.data);
  });

  it('should catch any errors upon proxy put request', async () => {
    spyPut.restore();
    spyPut = sandbox.stub(http, 'put').throws({ data: 'error occurred' });
    await proxy.put(req, res, next);
    expect(next).to.have.been.calledWith({ data: 'error occurred' });
  });

  it('should proxy a post request', async () => {
    const url = `${getConfigValue(SERVICES_CCD_COMPONENT_API_PATH)}${req.baseUrl}${req.url}`;
    await proxy.post(req, res, next);
    expect(spyPost).to.have.been.calledWith(url);
    expect(res.send).to.have.been.calledWith(result.data);
  });

  it('should catch any errors upon proxy post request', async () => {
    spyPost.restore();
    spyPost = sandbox.stub(http, 'post').throws({ data: 'error occurred' });
    await proxy.post(req, res, next);
    expect(next).to.have.been.calledWith({ data: 'error occurred' });
  });
});
