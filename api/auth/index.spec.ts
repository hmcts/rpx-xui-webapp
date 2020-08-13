import * as chai from 'chai'
import { expect } from 'chai'
import 'mocha'
import * as sinon from 'sinon'
import * as sinonChai from 'sinon-chai'
import { mockReq, mockRes } from 'sinon-express-mock'
chai.use(sinonChai)

import {getConfigValue} from '../configuration'
import {
    COOKIES_TOKEN,
    COOKIES_USER_ID,
} from '../configuration/references'
import * as auth from './index'

describe('Auth', () => {

    describe('successCallback', () => {
        let req
        let res
        let next
        let sandbox
        const accessToken = 'access'
        const details = {
            name: 'testuser',
            roles: [
                'pui-case-manager',
                'caseworker-probate',
            ],
            uid: 1,
        }
        beforeEach(() => {
            sandbox = sinon.createSandbox()
            req = mockReq({
                get: () => 'localhost',
                query: {
                    code: 1,
                },
                session: {
                    passport: {
                        user: {
                            tokenset: {
                                accessToken,
                            },
                            userinfo: details,
                        },
                    },
                    save: fun => {
                        fun()
                    },
                },
            })
            res = mockRes()
            next = sandbox.stub()
        })

        afterEach(() => {
            sandbox.restore()
        })

        it('should set the cookies and redirect the user if not a refresh', () => {

            auth.successCallback(req, res, next)
            expect(res.cookie).to.be.calledWith(getConfigValue(COOKIES_TOKEN), accessToken)
            expect(res.cookie).to.be.calledWith(getConfigValue(COOKIES_USER_ID), details.uid)
            expect(res.redirect).to.be.calledWith('/')
        })

        it('should set the cookies and call next if a refresh', () => {
            req.isRefresh = true
            auth.successCallback(req, res, next)
            expect(res.cookie).to.be.calledWith(getConfigValue(COOKIES_TOKEN), accessToken)
            expect(res.cookie).to.be.calledWith(getConfigValue(COOKIES_USER_ID), details.uid)
            expect(next).to.have.been.called
        })
    })

})

/*
import * as chai from 'chai'
import { expect } from 'chai'
import 'mocha'
import * as sinon from 'sinon'
import * as sinonChai from 'sinon-chai'
import { mockReq, mockRes } from 'sinon-express-mock'
chai.use(sinonChai)

import {getConfigValue} from '../configuration'
import {
  COOKIES_TOKEN,
  COOKIES_USER_ID,
} from '../configuration/references'
import * as idam from '../services/idam'
import { authenticateUser, logout } from './index'

describe('Auth', () => {

    describe('logOut', () => {
        it('should delete auth cookie', () => {
            const req = mockReq({
                session: {
                    save: fun => { fun() },
                },
            })

            const res = mockRes()
            logout(req, res)
            expect(res.clearCookie).to.be.calledWith(getConfigValue(COOKIES_TOKEN))
        })

        it('should redirect to index page', () => {
            const req = mockReq({
                session: {
                    save: fun => { fun() },
                },
            })

            const res = mockRes()
            logout(req, res)
            expect(res.redirect).to.be.calledWith(302, '/')
        })
    })

    describe('authenticate user', () => {
        let req
        let res
        let sandbox
        const accessToken = 'access'
        const details = { id: 1, name: 'testuser', roles: [
            'pui-case-manager',
            'caseworker-probate',
          ] }
        beforeEach(() => {
            sandbox = sinon.createSandbox()
            sandbox.stub(idam, 'postOauthToken').resolves({ access_token: `${accessToken}` })
            sandbox.stub(idam, 'getDetails').resolves(details)
            req = mockReq({
                get: () => 'localhost',
                query: {
                    code: 1,
                },
                session: {
                    save: fun => { fun() },
                    user: null,

                },
            })
            res = mockRes()
        })

        afterEach(() => {
            sandbox.restore()
        })

        it('should set the authorisation header', async () => {
            await authenticateUser(req, res, () => { })
            expect(idam.postOauthToken).to.be.calledWith(1, 'localhost')
            // expect(idam.getDetails).to.have.been.calledWith({ headers: { Authorization: `Bearer ${accessToken}` } })
        })

        it('should set the session, cookies and redirect the user', async () => {

            await authenticateUser(req, res, () => { })
            expect(req.session.user).to.be.equals(details)
            expect(res.cookie).to.be.calledWith(getConfigValue(COOKIES_TOKEN), accessToken)
            expect(res.cookie).to.be.calledWith(getConfigValue(COOKIES_USER_ID), details.id)
            expect(res.redirect).to.be.calledWith('/')
        })

        it('should redirect the user if an error occurs in getting access token', async () => {
            // @ts-ignore
            idam.postOauthToken.restore()
            sandbox.stub(idam, 'postOauthToken').resolves({ error: `${accessToken}` })
            await authenticateUser(req, res, () => { })
            expect(req.session.user).not.to.be.equals(details)
            expect(res.cookie).not.to.be.calledWith(getConfigValue(COOKIES_TOKEN), accessToken)
            expect(res.cookie).not.to.be.calledWith(getConfigValue(COOKIES_USER_ID), details.id)
            expect(res.redirect).to.be.calledWith('/')
        })

        it('should redirect the user if cannot get user details', async () => {
            // @ts-ignore
            idam.getDetails.restore()
            sandbox.stub(idam, 'getDetails').resolves(null)
            await authenticateUser(req, res, () => { })

            expect(req.session.user).not.to.be.equals(details)
            expect(res.cookie).not.to.be.calledWith(getConfigValue(COOKIES_USER_ID), details.id)
            expect(res.redirect).to.be.calledWith(302, '/')
        })
    })
})
*/
