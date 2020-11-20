import * as chai from 'chai'
import { expect } from 'chai'
import 'mocha'
import * as sinon from 'sinon'
import * as sinonChai from 'sinon-chai'
import { mockReq, mockRes } from 'sinon-express-mock'
import * as amendedJurisdictions from './index'

chai.use(sinonChai)

describe('Amended Jurisdiction', () => {

  let next
  let sandbox
  let req
  let res
  let result0
  let result1

  beforeEach(() => {
    sandbox = sinon.createSandbox()

    result0 = {
        data: [
            {
                id: 'PROBATE',
            },
            {
                id: 'data',
            },
        ],
    }

    result1 = {
        data: [

        ],
    }

    next = sandbox.spy()
    res = mockRes()
    req = mockReq({
      baseUrl: '/api/documents/',
      cookies: [],
      headers: {
        'accept': '*/*',
        'content-type': 'text/test',
        'experimental': 'experiment/test',
      },
      session: {
        save: fun => {
          fun()
        },
      },
      url: 'fdafu4543543/binary',
    })

  })

  afterEach(() => {
    sandbox.restore()
  })

  it('should send PROBATE array',  () => {
    const expected = [
        {
            id: 'PROBATE',
        },
    ]

    amendedJurisdictions.getJurisdictions(expected, req, res)
    expect(res.send).to.have.been.calledWith(expected)
  })

  it('should send empty array', () => {
    const expected = []

    amendedJurisdictions.getJurisdictions(expected, req, res)
    expect(res.send).to.have.been.calledWith(expected)
  })

})
