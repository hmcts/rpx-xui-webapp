import * as chai from 'chai';
import { expect } from 'chai';
import * as sinonChai from 'sinon-chai';

import { toTitleCase } from './utils';

chai.use(sinonChai);

describe('general-utils', () => {
  describe('toTitleCase', () => {
    it('should correctly set a service name to title case', () => {
      expect(toTitleCase('')).to.equal('');
      expect(toTitleCase('ia')).to.equal('Ia');
      expect(toTitleCase('IA')).to.equal('Ia');
      expect(toTitleCase('iA')).to.equal('Ia');
      expect(toTitleCase(' iA ')).to.equal(' Ia ');
      expect(toTitleCase('4 cIvIL 14')).to.equal('4 Civil 14');
    });
  });
});
