import * as chai from 'chai'
import { expect } from 'chai'
import 'mocha'
import * as sinon from 'sinon'
import * as sinonChai from 'sinon-chai'
import { mockReq, mockRes } from 'sinon-express-mock'

chai.use(sinonChai)

import * as proxy from './proxy'

describe('proxy', () => {

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
      headers: {
        'accept': '*/*',
        'content-type': 'text/test',
        'experimental': 'experiment/test'
      },
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

  it('should set content type', () => {
    req.headers.accept = false
    req.headers.experimental = false
    const headers = proxy.setHeaders(req)
    /*?*/
    expect(headers).to.deep.equal({ 'content-type': 'text/test' })
  })

  it('should return a headers object from request', () => {
    const headers = proxy.setHeaders(req)
    expect(headers).to.deep.equal(req.headers)
  })

})
