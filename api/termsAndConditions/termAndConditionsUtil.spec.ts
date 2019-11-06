import { expect } from 'chai'
import { getTermsAndConditionsUrl, postTermsAndConditionsUrl } from './termsAndConditionsUtil'

describe('terms And Conditions ', () => {
    it('should getTermsAndConditionsUrl', () => {
        const url = getTermsAndConditionsUrl('http://base', 'userId1234')
        expect(url).to.equal('http://base/api/v1/termsAndConditions/managecases/users/userId1234/1')
    })

    it('should postTermsAndConditionsUrl', () => {
        const url = postTermsAndConditionsUrl('http://base')
        expect(url).to.equal('http://base/api/v1/termsAndConditions/managecases/users/1')
    })
})
