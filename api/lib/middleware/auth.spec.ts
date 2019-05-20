import * as chai from 'chai'
import { expect } from 'chai'
import 'mocha'
import * as sinon from 'sinon'
import * as sinonChai from 'sinon-chai'
import { mockReq, mockRes } from 'sinon-express-mock'

import * as jwt from 'jsonwebtoken'

chai.use(sinonChai)

import * as authController from '../../auth'
import * as idam from '../../services/idam'
import * as auth from './auth'

describe('auth', () => {
    //TODO commenting out as not clear if restricted roles apply to xui

    // describe('validRoles', () => {
    //     it('should return true if a give roles match jui pannel member or judge roles', () => {
    //         expect(auth.validRoles(['jui-judge'])).to.equal(true)
    //         expect(auth.validRoles(['jui-panelmember'])).to.equal(true)
    //     })
    //     it('should return false if given roles do not match jui pannel member or judge roles', () => {
    //         expect(auth.validRoles(['test'])).to.equal(false)
    //     })
    // })

    describe('default', () => {
        it('should call user details if session  does not contain user details', async () => {
            const req = mockReq({
                cookies: [],
                headers: [],
                session: {
                    save: fun => {
                        fun()
                    },
                },
            })

            const res = mockRes()

            // lets set the expiry to be tomorrow
            const expiry = new Date()
            expiry.setDate(expiry.getDate() + 1)
            // this should be able to decoded by jwtdecode
            const token = jwt.sign({ exp: expiry.getTime() / 1000 }, 'test')
            req.headers.authorization = token
            const stub = sinon.stub(idam, 'getDetails')
            const stub2 = sinon.stub(auth, 'validRoles')

            stub.returns(
                Promise.resolve({
                    roles: [],
                })
            )

            stub2.returns(true)

            await auth.default(req, res, () => {})
            expect(stub).to.be.called
            stub.restore()
        })
        it('should log the user out if token has expired', async () => {
            const req = mockReq({
                cookies: [],
                headers: [],
                session: {
                    user: {
                        id: 'testId',
                        roles: [],
                    },
                },
            })

            const res = mockRes()

            // lets set the expiry to be tomorrow
            const expiry = new Date()
            expiry.setDate(expiry.getDate() - 1)
            // this should be able to decoded by jwtdecode
            const token = jwt.sign({ exp: expiry.getTime() / 1000 }, 'test')
            req.headers.authorization = token
            const stub = sinon.stub(authController, 'doLogout')

            await auth.default(req, res, () => {})
            expect(stub).to.be.called
            stub.restore()
        })

        //TODO commenting out as not clear if restricted roles apply to xui

        //     it('should log out users without correct roles', async () => {
        //         const req = mockReq({
        //             cookies: [],
        //             headers: [],
        //             session: {
        //                 user: {
        //                     id: 'testId',
        //                     roles: [],
        //                 },
        //             },
        //         })

        //         const res = mockRes()

        //         // lets set the expiry to be tomorrow
        //         const expiry = new Date()
        //         expiry.setDate(expiry.getDate() + 1)
        //         // this should be able to decoded by jwtdecode
        //         const token = jwt.sign({ exp: expiry.getTime() / 1000 }, 'test')
        //         req.headers.authorization = token
        //         const stub = sinon.stub(authController, 'doLogout')

        //         await auth.default(req, res, () => {})
        //         expect(stub).to.be.called
        //         stub.restore()
        //     })
    })

    it('should not log out users with correct roles', async () => {
        const req = mockReq({
            cookies: [],
            headers: [],
            session: {
                user: {
                    id: 'testId',
                    roles: ['jui-judge'],
                },
            },
        })

        const res = mockRes()

        // lets set the expiry to be tomorrow
        const expiry = new Date()
        expiry.setDate(expiry.getDate() + 1)
        // this should be able to decoded by jwtdecode
        const token = jwt.sign({ exp: expiry.getTime() / 1000 }, 'test')
        req.headers.authorization = token
        const spy = sinon.spy()

        // the spy in this context is the middleware next function  which
        // will be  called right at the end if everything is successful

        await auth.default(req, res, spy)
        expect(spy).to.be.called
    })
})
