import * as chai from 'chai'
import { expect } from 'chai'
import 'mocha'
import * as sinon from 'sinon'
import * as sinonChai from 'sinon-chai'
chai.use(sinonChai)

import { http } from '../lib/http'
import { request } from '../lib/middleware/responseRequest'

import {getConfigValue} from '../configuration'
import {
  COOKIES_TOKEN,
  PROTOCOL,
  SERVICES_IDAM_API_URL,
  SERVICES_IDAM_CLIENT_ID,
  SERVICES_IDAM_OAUTH_CALLBACK_URL
} from '../configuration/references'
import * as idam from './idam'

const idamSecret = process.env.IDAM_SECRET || 'AAAAAAAAAAAAAAAA'
const idamClient = getConfigValue(SERVICES_IDAM_CLIENT_ID)

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
            request().session.user = null
            await idam.getDetails(url, 'token')

            expect(spy).to.be.calledWith(`${url}/details`, { headers: { Authorization: `Bearer token` } })
        })

        it('If no cached session details should make a http.get call based on token stored in the request', async () => {
            request().session.user = null
            request().cookies[getConfigValue(COOKIES_TOKEN)] = 'test'
            await idam.getDetails(url)

            expect(spy).to.be.calledWith(`${url}/details`, { headers: { Authorization: `Bearer test` } })
        })

        it('If cached session details exist it should return those', async () => {
            request().session.user = 'data'
            await idam.getDetails(url, 'token')

            expect(await idam.getDetails(url, 'token')).to.equal('data')
        })
    })

    describe('getUser', () => {
        it('for a given user email it should request details for that user', async () => {
            request().session.user = 'data'
            await idam.getUser('token')

            const response = await idam.getUser('test@test.com')
            expect(response.data).to.equal('okay')
        })

        it('it should retrieve data for the current user', async () => {
            request().session.user = 'data'
            const response = await idam.getUser()

            expect(await idam.getUser()).to.equal('data')
        })
    })

    describe('postOauthToken', () => {
        it('for a given host and code it should request an idam token', async () => {
            const oauthCallbackUrl = getConfigValue(SERVICES_IDAM_OAUTH_CALLBACK_URL)

            request().session.user = 'data'

            await idam.getUser('token')

            idam.postOauthToken('testcode', 'test')

            expect(spyPost).to.be.calledWith(
                sinon.match(
                    `${url
                    }/oauth2/token?grant_type=authorization_code&code=testcode&redirect_uri=http://test/${
                    oauthCallbackUrl}`))

        })
    })

})
