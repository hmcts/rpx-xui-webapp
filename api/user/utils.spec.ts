import { expect } from 'chai';

import { isCurrentUserCaseAllocator } from './utils';
  import { mockReq } from 'sinon-express-mock';
import { CASE_ALLOCATOR_ROLE } from './constants';

describe('user.utils', () => {

  describe('isCurrentUserCaseAllocator', () => {

    it('should return true if all conditions are met', () => {
      const ROLE_ASSIGNMENT_EXAMPLE = {attributes: {primaryLocation: {location: '123'} } , authorisations: [CASE_ALLOCATOR_ROLE]}
      expect(isCurrentUserCaseAllocator(ROLE_ASSIGNMENT_EXAMPLE)).to.equal(true);
    });

    it('should return false if some conditions are not met', () => {
      const ROLE_ASSIGNMENT_EXAMPLE_1 = {};
      const ROLE_ASSIGNMENT_EXAMPLE_2 = {attributes: {primaryLocation: {location: '123'} } }
      const ROLE_ASSIGNMENT_EXAMPLE_3 = {attributes: {primaryLocation: {location: '123'} } , authorisations: []}
      const ROLE_ASSIGNMENT_EXAMPLE_4 = {attributes: {primaryLocation: {location: '123'} } , authorisations: ['random-role']}
      expect(isCurrentUserCaseAllocator(ROLE_ASSIGNMENT_EXAMPLE_1)).to.equal(false);
      expect(isCurrentUserCaseAllocator(ROLE_ASSIGNMENT_EXAMPLE_2)).to.equal(false);
      expect(isCurrentUserCaseAllocator(ROLE_ASSIGNMENT_EXAMPLE_3)).to.equal(false);
      expect(isCurrentUserCaseAllocator(ROLE_ASSIGNMENT_EXAMPLE_4)).to.equal(false);
    });

  });

});
