import * as chai from 'chai'
import { expect } from 'chai'
import * as log4js from 'log4js'
import 'mocha'
import * as sinon from 'sinon'
import * as sinonChai from 'sinon-chai'

chai.use(sinonChai)

import { errorInterceptor, requestInterceptor, successInterceptor } from './interceptors'

describe('interceptors', () => {
  const response = {
    config: {
      metadata: {
        startTime: new Date(),
      },
      method: 'POST',
      url: 'http://test2.com',
    },
  }
  const request = {
    method: 'GET',
    url: 'http://test.com',
  }
  const error = {
    config: {
      data: {
        authenticated: false,
      },
      metadata: {},
      method: 'GET',
      response: {
        status: 500,
      },
      url: 'http://test.com',
    },
    request: {},
    response: {
      data: {
        details: {
          error: true,
        },
      },
    },
  }
  describe('requestInterceptor', () => {
    it('Should log outbound request', () => {
      const spy = sinon.spy()
      const getLoggerStub = sinon.stub(log4js, 'getLogger')
      getLoggerStub.returns({ info: spy, addContext: sinon.spy() })
      requestInterceptor(request)
      expect(spy).to.be.calledWith('GET to http://test.com')
      getLoggerStub.restore()
    })
    it('Should return request unmutilated', () => {
      const result = requestInterceptor(request)
      expect(result).to.be.equal(request)
    })
  })
  describe('successInterceptor', () => {
    it('Should log returned response', () => {
      const spy = sinon.spy()
      const getLoggerStub = sinon.stub(log4js, 'getLogger')
      getLoggerStub.returns({ info: spy, addContext: sinon.spy() })
      successInterceptor(response)
      expect(spy).to.be.called
      getLoggerStub.restore()
    })
    it('Should return response unmutilated', () => {
      const result = successInterceptor(response)
      expect(result).to.be.equal(response)
    })
  })
  describe('errorInterceptor', () => {
    it('Should log returned response', () => {
      const spy = sinon.spy()
      const getLoggerStub = sinon.stub(log4js, 'getLogger')
      getLoggerStub.returns({ error: spy, addContext: sinon.spy() })
      errorInterceptor(error).catch( () => {
        expect(spy).to.be.called
        getLoggerStub.restore()
      })
    })
  })
})
