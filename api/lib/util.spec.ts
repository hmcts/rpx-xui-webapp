import * as chai from 'chai'
import {expect} from 'chai'
import 'mocha'
import * as sinon from 'sinon'
import * as sinonChai from 'sinon-chai'
import * as log4jui from './log4jui'
chai.use(sinonChai)

import {asyncReturnOrError, dotNotation, exists, isObject, isUserTandCPostSuccessful, shorten, some, valueOrNull, fieldNameMapper} from './util'

describe('util', () => {
    describe('isUserTandCPostSuccessful', () => {
        expect(isUserTandCPostSuccessful({userId: 'userId123'}, 'userId123')).to.equal(true)
        expect(isUserTandCPostSuccessful({userId: 'SomethingElse'}, 'userId123')).to.equal(false)
    })
    describe('isObject', () => {
        it('Should return true if object is passed', () => {
            const anObject = {k: 'v'}
            const result = isObject(anObject)
            expect(result).to.equal(true)
        })
        it('Should return false if array is passed', () => {
            const result = isObject(['k', 'v'])
            expect(result).to.equal(false)
        })
        it('Should return false if string is passed', () => {
            const result = isObject('hello')
            expect(result).to.equal(false)
        })
        it('Should return false if null is passed', () => {
            const result = isObject(null)
            expect(result).to.equal(false)
        })
    })
    describe('shorten', () => {
        it('Should return shortened string with suffixed ellipses if string is longer than maxLen', () => {
            const str = 'qwertyuiop'
            const maxLength = 3
            const result = shorten(str, maxLength)
            expect(result).to.equal('qwe...')
        })
        it('Should return full string if string equals maxLen', () => {
            const str = '123'
            const maxLength = 3
            const result = shorten(str, maxLength)
            expect(result).to.equal('123')
        })
        it('Should return full string if string is less than maxLen', () => {
            const str = '12'
            const maxLength = 3
            const result = shorten(str, maxLength)
            expect(result).to.equal('12')
        })
    })
    describe('dotNotation', () => {
        it('Should replace straight brackets for object key with dot notation', () => {
            const object = 'theObject\[key1\]\[key2\]'
            const result = dotNotation(object)
            // @todo - does this need work? Should it return better dot notation - verify this is desired
            expect(result).to.equal('theObject.key1..key2.')
        })
    })
    describe('valueOrNull', () => {
        it('Should return a value if string is present in object', () => {
            const object = {'a': 'b', 'c': 'd'}
            const nestled = 'a'
            const result = valueOrNull(object, nestled)
            expect(result).to.equal('b')
        })
        it('Should return null if string is not present in object', () => {
            const object = {'a': 'b', 'c': 'd'}
            const nestled = 'z'
            const result = valueOrNull(object, nestled)
            expect(result).to.equal(null)
        })
    })
    describe('some', () => {
        it('Should return true if predicate matches array value', () => {
            const array = [{1: 0}, {1: 1}]
            const predicate = x => {
                return x[1] === 1
            }
            const result = some(array, predicate)
            expect(result).to.equal(true)
        })
        it('Should return null if predicate does not match array value', () => {
            const array = [{1: 0}, {1: 2}]
            const predicate = x => {
                return x[1] === 1
            }
            const result = some(array, predicate)
            expect(result).to.equal(null)
        })
    })
    describe('exists', () => {
        // @todo take a look at this - what values are intended to be passed in?
        it('Should return false if object is null', () => {
            const result = exists(null, 'string')
            expect(result).to.equal(false)
        })
        it('Should return false if object[current] does not exist', () => {
            const object = {access_token: '123', bearer_token: '321'}
            const result = exists(object, 'object[access_token]')
            expect(result).to.equal(false)
        })
        it('Should return true if object does not match object', () => {
            const object = {access_token: '123', bearer_token: '321'}
            const result = exists(object, '[access_token]')
            expect(result).to.equal(true)
        })
        it('Should be recursive if object[current] does exist and eventually return true', () => {
            const object = {access_token: '123', bearer_token: '321'}
            const result = exists(object, 'access_token')
            expect(result).to.equal(true)
        })
    })
    describe('asyncReturnOrError', () => {

        let sandbox
        let spyObj

        beforeEach( () => {
            sandbox = sinon.createSandbox()
            spyObj = {
                error: sandbox.spy(),
            }
            sandbox.stub(log4jui, 'getLogger').returns(spyObj)
        })

        afterEach( () => {
            sandbox.restore()
        })

        it('Should return data if promise is returned', async () => {
            const promise = Promise.resolve(1)

            const result = await asyncReturnOrError(promise, 'string', null, null, true)
            expect(result).to.equal(1)
        })

        it('should log the error and return null on error, with response.status if setResponse is false', async () => {
            const promise = Promise.reject({
                response: {
                    status: 403
                }
            })
            const logger = log4jui.getLogger('util')
            const result = await asyncReturnOrError(promise, 'string', null, logger, false)
            expect(logger.error).to.have.been.calledWith('string')
            expect(result).to.be.null
        })
    })
    describe('fieldNameMapper', () => {
        // @todo take a look at this - what values are intended to be passed in?
        it('Should return mapped value if it is in mapping', () => {
            const result = fieldNameMapper('dummy', {'dummy': 'singer'})
            expect(result).to.equal('singer')
        })
        it('Should return itself it is not in mapping', () => {
            const result = fieldNameMapper('dummy', {'dummy2': 'drummer'})
            expect(result).to.equal('dummy')
        })
    })
})
