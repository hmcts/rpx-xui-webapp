import * as chai from 'chai';
import { expect } from 'chai';
import 'mocha';
import * as lib from './index';

// Import sinon-chai using require to avoid ES module issues
const sinonChai = require('sinon-chai');
chai.use(sinonChai);

describe('lib', () => {
  it('should create an axios instance', () => {
    expect(lib.http).to.exist;
  });
});
