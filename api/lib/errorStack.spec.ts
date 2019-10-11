import * as chai from 'chai'
import { expect } from 'chai'
import * as sinon from 'sinon'
import * as sinonChai from 'sinon-chai'
import { mockReq, mockRes } from 'sinon-express-mock'

chai.use(sinonChai)

import * as errorStack from './errorStack'

describe('errorStack', () => {
  let next
  let sandbox
  let req
  let res

  beforeEach(() => {
    sandbox = sinon.createSandbox()
    next = sandbox.spy()
    res = mockRes()
    req = mockReq({
      cookies: [],
      headers: [],
      session: {
        save: fun => {
          fun()
        },
      },
    })
  })

  afterEach(() => {
    sandbox.restore()
  })

  it('should set the errorStack if session exists', () => {
    errorStack.errorStack(req, res, next)
    expect(req.session.errorStack).to.deep.equal([])
    expect(next).to.have.been.called
  })

  it('should not set an errorStack if session does not exist', () => {
    const request = mockReq({})
    request.session = false
    errorStack.errorStack(request, res, next)
    expect(request.session.errorStack).to.be.undefined
    expect(next).to.have.been.called
  })

  it('should push data onto the stack', () => {
    const data = { test: 'one' }
    errorStack.errorStack(req, res, next)
    errorStack.push(data)
    expect(req.session.errorStack.pop()).to.equal(data)
  })

  it('should pop data off the stack', () => {
    const data = { test: 'one' }
    errorStack.errorStack(req, res, next)
    errorStack.push(data)
    expect(errorStack.pop()).to.equal(data)
  })

  it('should return an empty object if popping data when no session exists', () => {
    const data = { test: 'one' }
    const request = mockReq({})
    request.session = false
    errorStack.errorStack(request, res, next)
    errorStack.push(data)
    expect(errorStack.pop()).not.to.equal(data)
  })

  it('should get a formatted object', () => {
    const data = { test: 'one' }
    const data2 = { error: '404' }
    const data3 = ['error', 'stack']
    errorStack.errorStack(req, res, next)
    errorStack.push(data)
    errorStack.push(data2)
    errorStack.push(data3)
    const outArray = errorStack.get()
    expect(outArray).to.deep.equal({ 0: data2, 1: data, error: 'stack'})
  })
})
