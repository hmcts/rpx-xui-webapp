import { expect } from 'chai'
import { getTermsAndConditionsUrl } from './termsAndConditionsUtil'

describe('terms And Conditions ', () => {
    it('should getTermsAndConditionsUrl', () => {
        const url = getTermsAndConditionsUrl('http://base')
        expect(url).to.equal('http://base/api/v1/termsAndConditions/1')
    })
})
