import { expect } from 'chai';
import * as express from 'express';
import { createServer, Server } from 'node:http';
import { AddressInfo } from 'node:net';
import * as sinon from 'sinon';
import * as configuration from '../configuration';
import { JURISDICTIONS } from '../configuration/references';
import * as auth from '../lib/middleware/auth';
import * as proxy from '../lib/middleware/proxy';
import { initProxy } from '../proxy.config';

describe('Mounted jurisdiction proxy', () => {
  let sandbox: sinon.SinonSandbox;
  let upstream: Server;
  let server: Server;
  let baseUrl: string;
  let responseBody: string;
  let responseStatus: number;
  let session: any;
  let upstreamPaths: string[];
  let mountedUrls: Array<{ url: string; originalUrl: string }>;

  beforeEach(async () => {
    sandbox = sinon.createSandbox();
    responseBody = JSON.stringify([{ id: 'PROBATE' }, { id: 'UNCONFIGURED' }]);
    responseStatus = 200;
    session = { passport: { user: { userinfo: { uid: 'synthetic-user' } } } };
    upstreamPaths = [];
    mountedUrls = [];
    upstream = createServer((req, res) => {
      upstreamPaths.push(req.url);
      res.writeHead(responseStatus, { 'content-type': 'application/json' });
      res.end(responseBody);
    });
    await new Promise<void>((resolve) => upstream.listen(0, '127.0.0.1', resolve));

    // Select the real aggregated configuration, retaining its request/response hooks.
    const captureProxy = sandbox.stub(proxy, 'applyProxy');
    initProxy({} as express.Express);
    const config = captureProxy.getCalls().find((call) => call.args[1].source === '/aggregated').args[1];
    captureProxy.restore();
    sandbox
      .stub(configuration, 'getConfigValue')
      .callThrough()
      .withArgs(JURISDICTIONS)
      .returns(['PROBATE'] as any);
    sandbox.stub(auth, 'default').callsFake((req, _res, next) => {
      req.session = session;
      mountedUrls.push({ url: req.url, originalUrl: req.originalUrl });
      next();
    });
    const app = express();
    proxy.applyProxy(app, { ...config, target: `http://127.0.0.1:${(upstream.address() as AddressInfo).port}` });
    server = createServer(app);
    await new Promise<void>((resolve) => server.listen(0, '127.0.0.1', resolve));
    baseUrl = `http://127.0.0.1:${(server.address() as AddressInfo).port}`;
  });

  afterEach(async () => {
    sandbox.restore();
    await Promise.all(
      [server, upstream].filter(Boolean).map((listener) => new Promise<void>((resolve) => listener.close(() => resolve())))
    );
  });

  for (const [query, sessionKey] of [
    ['access=read', 'readJurisdictions'],
    ['access=create', 'createJurisdictions'],
    ['other=value', 'jurisdictions'],
  ]) {
    it(`filters mounted JSON responses and retains the ${sessionKey} cache`, async () => {
      const path = `/aggregated/caseworkers/:uid/jurisdictions?${query}`;
      const response = await fetch(baseUrl + path);

      expect(response.status).to.equal(200);
      expect(mountedUrls).to.deep.equal([{ url: path.replace('/aggregated', ''), originalUrl: path }]);
      expect(upstreamPaths).to.deep.equal([path.replace(':uid', 'synthetic-user')]);
      expect(await response.json()).to.deep.equal([{ id: 'PROBATE' }]);
      expect(session[sessionKey]).to.deep.equal([{ id: 'PROBATE' }]);

      responseBody = JSON.stringify([{ id: 'UNCONFIGURED' }]);
      const repeatedResponse = await fetch(baseUrl + path);
      expect(await repeatedResponse.json()).to.deep.equal([{ id: 'PROBATE' }]);
      expect(Object.keys(session).filter((key) => key !== 'passport')).to.deep.equal([sessionKey]);
    });
  }

  it('leaves other aggregated responses unchanged', async () => {
    const response = await fetch(`${baseUrl}/aggregated/caseworkers/:uid/case-types?access=read`);
    expect(await response.text()).to.equal(responseBody);
    expect(session.readJurisdictions).to.equal(undefined);
  });

  it('preserves an upstream JSON error and status without caching it', async () => {
    responseStatus = 503;
    responseBody = JSON.stringify({ message: 'synthetic-upstream-unavailable' });
    const response = await fetch(`${baseUrl}/aggregated/caseworkers/:uid/jurisdictions?access=read`);
    expect(response.status).to.equal(503);
    expect(await response.text()).to.equal(responseBody);
    expect(session.readJurisdictions).to.equal(undefined);
  });

  it('preserves a non-JSON response without caching it', async () => {
    responseBody = 'synthetic-upstream-unavailable';
    const response = await fetch(`${baseUrl}/aggregated/caseworkers/:uid/jurisdictions?access=read`);
    expect(await response.text()).to.equal(responseBody);
    expect(session.readJurisdictions).to.equal(undefined);
  });
});
