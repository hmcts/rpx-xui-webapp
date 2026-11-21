import { expect } from 'chai';
import * as express from 'express';
import { Server } from 'http';
import { AddressInfo } from 'net';
import * as sinon from 'sinon';
import * as configuration from './configuration';
import * as proxy from './lib/middleware/proxy';
import { initProxy } from './proxy.config';

describe('Address proxy content type', () => {
  const servers: Server[] = [];

  async function listen(app: express.Express): Promise<string> {
    const server = await new Promise<Server>((resolve) => {
      const listening = app.listen(0, '127.0.0.1', () => resolve(listening));
    });
    servers.push(server);
    return `http://127.0.0.1:${(server.address() as AddressInfo).port}`;
  }

  afterEach(async () => {
    sinon.restore();
    await Promise.all(
      servers.splice(0).map(
        (server) =>
          new Promise<void>((resolve, reject) => {
            server.close((error) => (error ? reject(error) : resolve()));
            server.closeAllConnections();
          })
      )
    );
  });

  for (const status of [200, 502]) {
    it(`overrides upstream HTML content type on HTTP ${status} without changing address data`, async () => {
      const upstream = express();
      const body = JSON.stringify({ organisation: '<script>alert(1)</script>' });
      upstream.get('/addresses', (req, res) => {
        expect(req.query.postcode).to.equal('E1');
        res.status(status).type('html').send(body);
      });
      const upstreamUrl = await listen(upstream);
      sinon.stub(configuration, 'getConfigValue').returns(upstreamUrl);
      const applyProxyStub = sinon.stub(proxy, 'applyProxy');
      initProxy(express());
      const addressConfig = applyProxyStub
        .getCalls()
        .map((call) => call.args[1])
        .find((config) => config.source === '/api/addresses');
      expect(addressConfig).not.to.equal(undefined);
      applyProxyStub.restore();

      const app = express();
      proxy.applyProxy(
        {
          use: (source, _middlewares, middleware) => app.use(source, middleware),
        },
        addressConfig!
      );
      const baseUrl = await listen(app);
      const response = await fetch(`${baseUrl}/api/addresses?postcode=E1`);

      expect(response.status).to.equal(status);
      expect(response.headers.get('content-type')).to.equal('application/json; charset=utf-8');
      expect(response.headers.get('x-content-type-options')).to.equal('nosniff');
      expect(await response.text()).to.equal(body);
    });
  }
});
