import * as chai from 'chai';
import 'mocha';
import * as sinonChai from 'sinon-chai';
chai.use(sinonChai);
import 'mocha';
import * as sinon from 'sinon';
import { mockReq, mockRes } from 'sinon-express-mock';

describe('Judicial Booking', (): void => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  let res;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  let req;
  let sandbox;

  beforeEach(() => {
    req = mockReq({
      userId: 'userId'
    });
    res = mockRes();
    sandbox = sinon.createSandbox();
  });

  afterEach(() => {
    sandbox.restore();
  });
});
