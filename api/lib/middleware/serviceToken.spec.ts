import * as chai from 'chai'
import { expect } from 'chai'
import 'mocha'
import * as sinon from 'sinon'
import * as sinonChai from 'sinon-chai'
import { mockReq, mockRes } from 'sinon-express-mock'

chai.use(sinonChai)

import * as serviceToken from './serviceToken'
import * as serviceAuth from '../../services/serviceAuth'

import {generateToken} from './serviceToken'

describe('serviceToken', () => {
  const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c'

  describe('validateCache', () => {
    it('Should load currentTime', () => {

    })
  });
  describe('getToken', () => {
    it('Should return cache microservice', () => {

    })
  });
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
      sandbox.stub(serviceToken, 'generateToken').returns(token)
      const retValue = await serviceToken.serviceTokenGenerator()
      expect(retValue).to.equal(token)
      sandbox.restore()
    })
  })
})
