import * as chai from 'chai'
import { expect } from 'chai'
import 'mocha'
import * as sinon from 'sinon'
import * as sinonChai from 'sinon-chai'
import { mockReq, mockRes } from 'sinon-express-mock'
chai.use(sinonChai)

import {config} from '../config'
import {http} from '../lib/http'
import {postS2SLease} from './serviceAuth'

describe('serviceAuth', () => {
  let res

  const url = config.services.s2s

  let spyPost: any
  let sandbox: any

  beforeEach(() => {
    // this doesn't change much but it is different for createHearing
    // so is just set by default and overridden in that test, to be reset after
    res = {
      data: 'okay',
    }

    sandbox = sinon.createSandbox()

    spyPost = sandbox.stub(http, 'post').callsFake(() => {
      return Promise.resolve(res)
    })

  })

  afterEach(() => {
    sandbox.restore()
  })



})
