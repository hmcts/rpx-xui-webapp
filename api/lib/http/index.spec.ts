import * as chai from 'chai';
import { expect } from 'chai';
import 'mocha';
import * as sinonChai from 'sinon-chai';

chai.use(sinonChai);

import * as lib from './index';

describe('lib', () => {
  it('should create an axios instance', () => {
    expect(lib.http).to.exist;
  });
});
