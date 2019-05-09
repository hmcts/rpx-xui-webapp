import * as chai from 'chai'
import { expect } from 'chai'
import 'mocha'
import * as sinon from 'sinon'
import * as sinonChai from 'sinon-chai'
import { mockReq, mockRes } from 'sinon-express-mock'

chai.use(sinonChai)

import * as log4js from 'log4js'
import * as log4jui from '../lib/log4jui'
import { leftPad } from '../lib/log4jui'
import { isJUILogger, JUILogger } from '../lib/models'
import * as responseRequest from './middleware/responseRequest'

describe('log4jui', () => {
    describe('getLogger', () => {
        it('Should  return an instance of JUILogger', () => {
            expect(isJUILogger(log4jui.getLogger(''))).to.equal(true)
        })
        it('Should return an instance of JUILogger containing a log4jui logger ', () => {
            expect((log4jui.getLogger('test')._logger as any).category).to.equal('test')
        })
    })

    describe('warn', () => {
        it('should log a warn with log4js', async () => {
            const spy = sinon.spy()
            const stub = sinon.stub(log4js, 'getLogger')
            stub.returns({ warn: spy, addContext: sinon.spy() })

            const logger = log4jui.getLogger('test')
            logger.warn('warning')

            expect(spy).to.be.calledWith('warning')
            stub.restore()
        })
    })

    describe('info', () => {
        it('should log an info with log4js', async () => {
            const spy = sinon.spy()
            const stub = sinon.stub(log4js, 'getLogger')
            stub.returns({ info: spy, addContext: sinon.spy() })

            const logger = log4jui.getLogger('test')
            logger.info('warning')

            expect(spy).to.be.calledWith('warning')
            stub.restore()
        })
    })
})

describe('error', () => {
    it('should log an error with log4js', async () => {
        const spy = sinon.spy()
        const stub = sinon.stub(log4js, 'getLogger')
        stub.returns({ error: spy, addContext: sinon.spy() })

        const logger = log4jui.getLogger('test')
        logger.error('warning')

        expect(spy).to.be.calledWith('warning')
        stub.restore()
    })
})

describe('prepareMessage', () => {
    it('prepare a message to be sent with userId and sessionId', async () => {
        const req = mockReq({
            cookies: [],
            session: {
                user: {
                    id: 'testId',
                },
            },
        })
        const res = mockRes()

        req.cookies.__sessionId__ = 'testCookie'
        const stub = sinon.stub(responseRequest, 'isReqResSet')
        const stub2 = sinon.stub(responseRequest, 'request')
        stub.returns(true)
        stub2.returns(req)

        expect(log4jui.prepareMessage('hello')).to.equal('[testId - testCookie] - hello')

        stub.restore()
        stub2.restore()
    })
})

describe('leftPad', () => {
    it('should not left pad a string if string length is same as param length', () => {
        const str = 'test'
        const result = `    ${str}`
        expect(leftPad(str, 4)).not.to.equal(result)
    })

    it('should left pad a string if param length is greater than string length', () => {
        const str = 'test'
        const result = `    ${str}`
        expect(leftPad(str, 8)).to.equal(result)
    })
})
