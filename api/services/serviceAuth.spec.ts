import { expect } from 'chai'
import 'mocha'
import * as sinon from 'sinon'
import { mockReq, mockRes } from 'sinon-express-mock'
import { getConfigValue } from '../configuration'
import {
  MICROSERVICE,
  SERVICE_S2S_PATH,
} from '../configuration/references'
import { http } from '../lib/http'
import * as serviceAuth from './serviceAuth'

describe('serviceAuth', () => {

  let res

  // const url = config.services.s2s
  const url = getConfigValue(SERVICE_S2S_PATH)
  // const microservice = config.microservice
  const microservice = getConfigValue(MICROSERVICE)
  const s2sSecret = process.env.S2S_SECRET || 'AAAAAAAAAAAAAAAA'

  let spy: any
  let spyPost: any

  beforeEach(() => {

    res = {
      data: 'okay',
    }

    spyPost = sinon.stub(http, 'post').callsFake(() => {
      return Promise.resolve(res)
    })
  })

  afterEach(() => {

    spyPost.restore()
  })

  describe('service Auth', async () => {

    xit('Should make a http.post call ', async () => {
      expect(await serviceAuth.postS2SLease()).to.equal('okay')
    })
  })
})
