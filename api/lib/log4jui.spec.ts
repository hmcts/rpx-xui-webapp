import * as chai from 'chai';
import { expect } from 'chai';
import * as log4js from 'log4js';
import 'mocha';
import * as sinon from 'sinon';
import * as log4jui from './log4jui';
import { isJUILogger } from './models';

// Import sinon-chai using require to avoid ES module issues
const sinonChai = require('sinon-chai');
chai.use(sinonChai);

describe('log4jui', () => {
  let sandbox;
  let spyObj;

  beforeEach(() => {
    sandbox = sinon.createSandbox();
    spyObj = {
      addContext: sandbox.spy(),
      error: sandbox.spy(),
      info: sandbox.spy(),
      warn: sandbox.spy()
    };
    sandbox.stub(log4js, 'getLogger').returns(spyObj);
  });

  afterEach(() => {
    sandbox.restore();
  });

  describe('getLogger', () => {
    beforeEach(() => {
      sandbox.restore();
      sandbox = sinon.createSandbox();
      spyObj = {
        addContext: sandbox.spy(),
        error: sandbox.spy(),
        info: sandbox.spy(),
        warn: sandbox.spy()
      };
      sandbox.stub(log4js, 'getLogger').callsFake((cat: string) => { spyObj.category = cat; return spyObj; });
    });

    it('Should return an instance of JUILogger', () => {
      expect(isJUILogger(log4jui.getLogger(''))).to.equal(true);
    });

    it('Should return an instance of JUILogger containing a log4jui logger ', () => {
      expect((log4jui.getLogger('test')._logger as any).category).to.equal('test');
    });

    it('should add padded category context (padStart) with trailing space', () => {
      const category = 'test'; // 4 chars
      const expectedPadded = '          test '; // 10 spaces + 'test' + trailing space

      const logger = log4jui.getLogger(category);

      expect(spyObj.addContext).to.have.been.calledWith('catFormatted', expectedPadded);
      expect((logger._logger as any).category).to.equal(category);
    });
  });

  describe('warn', () => {
    it('should log a warn with log4js', () => {
      const logger = log4jui.getLogger('test');
      logger.warn('warning');
      expect(spyObj.warn).to.be.calledWith('warning');
    });
  });

  describe('info', () => {
    it('should log an info with log4js', () => {
      const logger = log4jui.getLogger('test');
      logger.info('warning');
      expect(spyObj.info).to.be.calledWith('warning');
    });
  });

  describe('error', () => {
    it('should log an error with log4js', () => {
      const logger = log4jui.getLogger('test');
      logger.error('warning');
      expect(spyObj.error).to.be.calledWith('warning');
    });
  });

});
