import * as chai from 'chai';
import { expect } from 'chai';
import 'mocha';
import * as sinonChai from 'sinon-chai';
import * as lib from './index';

chai.use(sinonChai);


describe('lib', () => {
  it('should create an axios instance', () => {
    expect(lib.http).to.exist;
  });
});
