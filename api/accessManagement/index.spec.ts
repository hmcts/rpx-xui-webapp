import * as chai from 'chai';
import 'mocha';
import * as sinonChai from 'sinon-chai';
chai.use(sinonChai);
import 'mocha';
import * as sinon from 'sinon';
import { mockReq, mockRes } from 'sinon-express-mock';

describe('Judicial Booking', () => {
    let res;
    let req;
    let sandbox;
    const next = () => {
      return;
    };

    beforeEach(() => {
      req = mockReq({
        userId: 'userId',
      });
      res = mockRes();
      sandbox = sinon.createSandbox();
    });

    afterEach(() => {
      sandbox.restore();
    });
});
