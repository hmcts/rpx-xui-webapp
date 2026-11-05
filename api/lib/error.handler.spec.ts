import * as chai from 'chai';
import { expect } from 'chai';
import * as express from 'express';
import { get } from 'http';
import { AddressInfo } from 'net';
import 'mocha';
import * as sinon from 'sinon';
import { mockReq, mockRes } from 'sinon-express-mock';
import * as errorHandler from './error.handler';
import * as log4jui from './log4jui';
import { propsExist } from './objectUtilities';

// Import sinon-chai using require to avoid ES module issues
const sinonChai = require('sinon-chai');
chai.use(sinonChai);

describe('errorHandler', () => {
  let next;
  let sandbox;
  let req;
  let res;

  beforeEach(() => {
    sandbox = sinon.createSandbox();
    next = sandbox.spy();
    res = mockRes();
    req = mockReq({
      cookies: [],
      headers: [],
      session: {
        save: (fun) => {
          fun();
        },
      },
    });
  });

  afterEach(() => {
    sandbox.restore();
  });

  it('should empty headers if it exists', () => {
    const err = {
      config: {
        headers: {},
      },
    };
    errorHandler.default(err, req, res, next);

    expect(propsExist(err, ['config', 'headers'])).to.be.false;
  });

  it('should return default response', () => {
    const err = {};
    errorHandler.default(err, req, res, next);
    expect(res.status).to.have.been.calledWith(500);
    expect(res.send).to.have.been.calledWith({ message: 'Internal Server Error' });
  });

  it('should preserve the status without exposing upstream content', () => {
    const err = {
      status: 404,
      data: {
        test: 'dummy',
      },
    };
    errorHandler.default(err, req, res, next);
    expect(res.status).to.have.been.calledWith(404);
    expect(res.send).to.have.been.calledWith({ message: 'Not Found' });
  });

  for (const [status, message] of [
    [400, 'Bad Request'],
    [401, 'Unauthorized'],
    [403, 'Forbidden'],
    [500, 'Internal Server Error'],
    [502, 'Bad Gateway'],
    [503, 'Service Unavailable'],
  ] as const) {
    it(`should return a generic ${status} response and log upstream details`, () => {
      const errorLog = sandbox.spy(Object.getPrototypeOf(log4jui.getLogger('errorHandler')._logger), 'error');
      const data = {
        message: 'Java backend failure at /opt/internal/service.js',
        stack: 'Error: failure\n    at /opt/internal/service.js:12:3',
        version: 'Express 5.3.0',
      };

      errorHandler.default({ status, data }, req, res, next);

      expect(res.status).to.have.been.calledWith(status);
      expect(res.send).to.have.been.calledWithExactly({ message });
      expect(errorLog).to.have.been.calledWith(data);
    });
  }

  it('should log the stack without returning it for native errors', () => {
    const errorLog = sandbox.spy(Object.getPrototypeOf(log4jui.getLogger('errorHandler')._logger), 'error');
    const error = new Error('Failure at /opt/internal/service.js');

    errorHandler.default(error, req, res, next);

    expect(errorLog).to.have.been.calledWith(error.stack);
    expect(res.send).to.have.been.calledWithExactly({ message: 'Internal Server Error' });
  });

  it('should handle an absent error safely', () => {
    errorHandler.default(undefined, req, res, next);

    expect(res.status).to.have.been.calledWith(500);
    expect(res.send).to.have.been.calledWithExactly({ message: 'Internal Server Error' });
  });

  it('should preserve middleware statusCode errors', () => {
    errorHandler.default({ statusCode: 413, data: 'Sensitive parser details' }, req, res, next);

    expect(res.status).to.have.been.calledWith(413);
    expect(res.send).to.have.been.calledWithExactly({ message: 'Payload Too Large' });
  });

  it('should not disclose verbose errors to an unauthenticated task request', async () => {
    const app = express();
    app.set('env', 'development');
    app.use('/workallocation/task', (_req, _res, nextHandler) => {
      nextHandler({
        status: 500,
        data: '<pre>Error: Java backend failure at /opt/internal/service.js:12:3 (Express 5.3.0)</pre>',
      });
    });
    app.use(errorHandler.default);

    const server = app.listen(0, '127.0.0.1');
    try {
      await new Promise<void>((resolve, reject) => {
        server.once('listening', resolve);
        server.once('error', reject);
      });
      const { port } = server.address() as AddressInfo;
      const response = await new Promise<{ status: number; text: string }>((resolve, reject) => {
        get(`http://127.0.0.1:${port}/workallocation/task`, (incoming) => {
          let text = '';
          incoming.setEncoding('utf8');
          incoming.on('data', (chunk) => {
            text += chunk;
          });
          incoming.on('error', reject);
          incoming.on('end', () => resolve({ status: incoming.statusCode, text }));
        }).on('error', reject);
      });

      expect(response.status).to.equal(500);
      expect(JSON.parse(response.text)).to.deep.equal({ message: 'Internal Server Error' });
      expect(response.text).not.to.include('/opt/internal');
      expect(response.text).not.to.include('Express');
      expect(response.text).not.to.include('Java');
    } finally {
      await new Promise<void>((resolve, reject) => server.close((error) => (error ? reject(error) : resolve())));
    }
  });

  it('should empty _header if it exists', () => {
    const err = {
      request: {
        _header: {},
      },
    };
    errorHandler.default(err, req, res, next);

    expect(propsExist(err, ['request', '_header'])).to.be.false;
  });
});
