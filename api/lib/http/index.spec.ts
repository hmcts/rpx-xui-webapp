
import * as chai from 'chai';
import { expect } from 'chai';
import * as sinonChai from 'sinon-chai';
import 'mocha';
import * as lib from './index';

chai.use(sinonChai);

describe('lib', () => {
  it('should create an axios instance', () => {
    // eslint-disable-next-line no-unused-expressions
    expect(lib.http).to.exist;
  });
});
