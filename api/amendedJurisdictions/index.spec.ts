import * as chai from 'chai'
import { expect } from 'chai'
import 'mocha'
import * as sinon from 'sinon'
import * as sinonChai from 'sinon-chai'
import { mockReq, mockRes } from 'sinon-express-mock'
import * as amendedJurisdictions from './index'

chai.use(sinonChai)

describe('Amended Jurisdiction', () => {

  let sandbox
  let result0
  let result1
  let res
  let req
  let proxyRes

  beforeEach(() => {
    sandbox = sinon.createSandbox()

    proxyRes = {}
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
      url: 'aggregated/caseworkers/:uid/jurisdictions?access=read',
  })

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

    const response = amendedJurisdictions.getJurisdictions(proxyRes, req, res, expected)
    expect(response).to.eql(expected)
  })

  it('should send empty array', () => {
    const expected = []

    const response = amendedJurisdictions.getJurisdictions(proxyRes, req, res, expected)
    expect(response).to.eql(expected)
  })

})
