import * as chai from 'chai'
import { expect } from 'chai'
import 'mocha'
import * as sinon from 'sinon'
import * as sinonChai from 'sinon-chai'
import { mockReq } from 'sinon-express-mock'

chai.use(sinonChai)

import * as log4js from 'log4js'
import * as log4jui from './log4jui'
import { leftPad } from './log4jui'
import * as responseRequest from './middleware/responseRequest'
import { isJUILogger } from './models'

describe('log4jui', () => {
    let sandbox
    let spyObj

    beforeEach( () => {
      sandbox = sinon.createSandbox()
      spyObj = {
        addContext: sandbox.spy(),
        error: sandbox.spy(),
        info: sandbox.spy(),
        warn: sandbox.spy(),
      }
      sandbox.stub(log4js, 'getLogger').returns(spyObj)
    })

    afterEach( () => {
      sandbox.restore()
    })

    describe('getLogger', () => {
        beforeEach( () => {
            sandbox.restore()
        })
        it('Should  return an instance of JUILogger', () => {
            expect(isJUILogger(log4jui.getLogger(''))).to.equal(true)
        })
        it('Should return an instance of JUILogger containing a log4jui logger ', () => {
            expect((log4jui.getLogger('test')._logger as any).category).to.equal('test')
        })
    })

    describe('warn', () => {
        it('should log a warn with log4js', () => {
            const logger = log4jui.getLogger('test')
            logger.warn('warning')
            expect(spyObj.warn).to.be.calledWith('warning')
        })
    })

    describe('info', () => {
        it('should log an info with log4js', () => {
            const logger = log4jui.getLogger('test')
            logger.info('warning')
            expect(spyObj.info).to.be.calledWith('warning')
        })
    })

    describe('error', () => {
        it('should log an error with log4js',  () => {
            const logger = log4jui.getLogger('test')
            logger.error('warning')
            expect(spyObj.error).to.be.calledWith('warning')
        })
    })

    describe('prepareMessage', () => {
        it('prepare a message to be sent with userId and sessionId', () => {
            const req = mockReq({
                cookies: [],
                session: {
                    user: {
                        id: 'testId',
                    },
                },
            })

            req.cookies.__sessionId__ = 'testCookie'
            sandbox.stub(responseRequest, 'isReqResSet').returns(true)
            sandbox.stub(responseRequest, 'request').returns(req)

            expect(log4jui.prepareMessage('hello')).to.equal('[testId - testCookie] - hello')
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

})
