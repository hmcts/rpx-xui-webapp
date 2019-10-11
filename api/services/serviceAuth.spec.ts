import { expect } from 'chai'
import * as sinon from 'sinon'
import { http } from '../lib/http'
import * as serviceAuth from './serviceAuth'

describe('serviceAuth', () => {

  let spyPost: any

  beforeEach(() => {
    // @ts-ignore
    spyPost = sinon.stub(http, 'post').resolves({
      data: 'okay',
    })
  })

  afterEach(() => {

    spyPost.restore()
  })

  describe('service Auth',  () => {

    it('Should make a http.post call ', async () => {
      expect(await serviceAuth.postS2SLease()).to.equal('okay')
    })
  })
})
