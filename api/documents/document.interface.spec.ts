/* tslint:disable:no-unused-expression no-var-requires */
import * as chai from 'chai'
import { expect } from 'chai'
import 'mocha'
import * as sinonChai from 'sinon-chai'
import {Classification} from './document.interface'

chai.use(sinonChai)
describe('Document Interface', () => {
    it('should define the enums correctly for classification', () => {
        expect(Classification.Private).to.equal('PRIVATE')
        expect(Classification.Public).to.equal('PUBLIC')
        expect(Classification.Restricted).to.equal('RESTRICTED')
    })
})
