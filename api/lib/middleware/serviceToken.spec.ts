import * as chai from 'chai'
import { expect } from 'chai'
import * as sinon from 'sinon'
import * as sinonChai from 'sinon-chai'
import { mockReq, mockRes } from 'sinon-express-mock'

chai.use(sinonChai)

import * as serviceAuth from '../../services/serviceAuth'
import * as serviceToken from './serviceToken'

import axios from 'axios'
import {generateToken} from './serviceToken'

describe('serviceToken', () => {
  // tslint:disable-next-line:max-line-length
  const token = `eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE1Njk0MTc2OTQsImp0aSI6IjZiMmJhMzZmLTYyMTktNDJkNi05Mjc1LTIzOWUwMjcxZTM2MCIsImlhdCI6MTU2OTQxNDA5NH0.FlW379B-WKJe3jBg7fB3XfZtbiTSPkNnpiIK_MviGMY`
  const tokenExpires = 1569417694

  describe('validateCache', () => {

    let sandbox

    beforeEach( () => {
      sandbox = sinon.createSandbox()
      sandbox.stub(serviceAuth, 'postS2SLease').resolves(token)
    })

    afterEach( () => {
      sandbox.restore()
    })

    it('Should return false if microservice is not in cache', () => {
      expect(serviceToken.validateCache()).to.be.false
    })
    it('should return false if microservice is expired', async () => {
      const clock = sinon.useFakeTimers(tokenExpires * 1000)
      await serviceToken.generateToken()
      expect(serviceToken.validateCache()).to.be.false
      clock.restore()
    })

    it('should return true if microservice has not expired', async () => {
      const clock = sinon.useFakeTimers((tokenExpires - 1) * 1000)
      await serviceToken.generateToken()
      expect(serviceToken.validateCache()).to.be.true
      clock.restore()
    })
  })
  describe('getToken', () => {

    let sandbox

    beforeEach( () => {
      sandbox = sinon.createSandbox()
      sandbox.stub(serviceAuth, 'postS2SLease').resolves(token)
    })

    afterEach( () => {
      sandbox.restore()
    })

    it('Should return cache microservice', async () => {
      const clock = sinon.useFakeTimers(tokenExpires * 1000)
      await serviceToken.generateToken()
      const s2sToken = serviceToken.getToken()
      expect(s2sToken.expiresAt).to.be.equal(tokenExpires)
      expect(s2sToken.token).to.be.equal(token)
      clock.restore()
    })
  })
  describe('generateToken', () => {
    it('Should call postS2SLease so that it generates token. ', async () => {
      const sandbox = sinon.createSandbox()
      sandbox.stub(serviceAuth, 'postS2SLease').resolves(token)
      await serviceToken.generateToken()
      expect(serviceAuth.postS2SLease).to.be.called
      sandbox.restore()
    })
    it('Should call jwtDecode so that decodes', async () => {
      const sandbox = sinon.createSandbox()
      sandbox.stub(serviceAuth, 'postS2SLease').resolves(token)
      const retValue = await serviceToken.generateToken()
      expect(retValue).to.equal(token)
      sandbox.restore()
    })
  });
  describe('serviceTokenGenerator',  () =>{
    it('Method should be called with validate value TRUE so that it return token', async () => {
      const sandbox = sinon.createSandbox()
      sandbox.stub(serviceToken, 'validateCache').returns(true)
      sandbox.stub(serviceToken, 'getToken').returns({
        token: token
      })
      const retValue = await serviceToken.serviceTokenGenerator()
      expect(retValue).to.equal(token)
      sandbox.restore()
    })
    it('Method should be called with validate value FALSE so that and return token', async () => {
      const sandbox = sinon.createSandbox()
      sandbox.stub(serviceToken, 'validateCache').returns(false)
      sandbox.stub(serviceToken, 'generateToken').resolves(token)
      const retValue = await serviceToken.serviceTokenGenerator()
      expect(retValue).to.equal(token)
      sandbox.restore()
    })
  })

  describe('serviceToken default',  () => {
    it('should set the ServiceAuthorization on request header', async () => {
      const sandbox = sinon.createSandbox()
      const req = mockReq({
        headers: {}
      })
      const res = mockRes()
      const next = sandbox.spy()
      sandbox.stub(serviceToken, 'serviceTokenGenerator').resolves(token)
      await serviceToken.default(req, res, next)
      expect(axios.defaults.headers.common.ServiceAuthorization).to.be.equal(token)
      expect(next).to.have.been.called
    })
  })
})
