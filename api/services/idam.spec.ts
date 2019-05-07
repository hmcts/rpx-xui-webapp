import * as chai from 'chai'
import { expect } from 'chai'
import 'mocha'
import * as sinon from 'sinon'
import * as sinonChai from 'sinon-chai'
import { mockReq, mockRes } from 'sinon-express-mock'
chai.use(sinonChai)

import { http } from '../lib/http'
import { request } from '../lib/middleware/responseRequest'

import * as idam from './idam'

import { config } from '../config'

const idamSecret = process.env.IDAM_SECRET || 'AAAAAAAAAAAAAAAA'
const idamClient = config.services.idam.idamClientID

describe('cohQA', () => {
    let res

    const url = config.services.idam.idamApiUrl

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
            await idam.getDetails('token')

            expect(spy).to.be.calledWith(`${url}/details`, { headers: { Authorization: `Bearer token` } })
        })

        it('If no cached session details should make a http.get call based on token stored in the request', async () => {
            request().session.user = null
            request().cookies[config.cookies.token] = 'test'
            await idam.getDetails()

            expect(spy).to.be.calledWith(`${url}/details`, { headers: { Authorization: `Bearer test` } })
        })

        it('If cached session details exist it should return those', async () => {
            request().session.user = 'data'
            await idam.getDetails('token')

            expect(await idam.getDetails('token')).to.equal('data')
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
            const oauthCallbackUrl = config.services.idam.oauthCallbackUrl

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
