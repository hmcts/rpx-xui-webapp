import * as chai from 'chai'
import { expect } from 'chai'
import 'mocha'
import * as sinon from 'sinon'
import * as sinonChai from 'sinon-chai'
chai.use(sinonChai)

import { http } from '../lib/http'

import {getConfigValue} from '../configuration'
import {
  SERVICES_IDAM_API_URL,
} from '../configuration/references'
import * as idam from './idam'


describe('cohQA', () => {
    let res

    const url = getConfigValue(SERVICES_IDAM_API_URL)

    let spy: any
    let spyDelete: any
    let spyPost: any
    let spyPut: any

    beforeEach(() => {
        // this doesn't change much but it is different for createHearing
        // so is just set by default and overridden in that test, to be reset after
        res = {
            data: 'okay',
        }

        spy = sinon.stub(http, 'get').callsFake(() => {
            return Promise.resolve(res)
        })

        spyDelete = sinon.stub(http, 'delete').callsFake(() => {
            return Promise.resolve(res)
        })

        spyPost = sinon.stub(http, 'post').callsFake(() => {
            return Promise.resolve(res)
        })

        spyPut = sinon.stub(http, 'put').callsFake(() => {
            return Promise.resolve(res)
        })
    })

    afterEach(() => {
        spy.restore()
        spyPost.restore()
        spyPut.restore()
        spyDelete.restore()
    })

    describe('getDetails', () => {
        it('If no cached session details should make a http.get call based on a given token', async () => {
            await idam.getDetails(url, 'token')

            expect(spy).to.be.calledWith(`${url}/details`, { headers: { Authorization: `Bearer token` } })
        })
    })

    describe('getUser', () => {
        it('for a given user email it should request details for that user', async () => {
            await idam.getUser('token')

            const response = await idam.getUser('test@test.com')
            expect(response.data).to.equal('okay')
        })
    })

})
