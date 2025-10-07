import { expect } from 'chai';

import { propsExist } from './objectUtilities';

describe('Object Utilities ', () => {
  describe('propsExist()', () => {
    it('Should return true if all the properties exist on an object.', () => {
      const object = { level1: { level2: { level3: 'level3' } } };

      // eslint-disable-next-line no-unused-expressions
      expect(propsExist(object, ['level1', 'level2', 'level3'])).to.be.true;
    });

    it('Should return false if a property does not exist on an object.', () => {
      const object = { level1: { level2: { level3: 'level3' } } };

      // eslint-disable-next-line no-unused-expressions
      expect(propsExist(object, ['level1', 'breakingProperty', 'level3'])).to.be.false;
    });

    it('Should return false if the object is undefined.', () => {
      const object = undefined;

      // eslint-disable-next-line no-unused-expressions
      expect(propsExist(object, ['level1', 'level2', 'level3'])).to.be.false;
    });

    it('Should return false if the object is null.', () => {
      const object = null;

      // eslint-disable-next-line no-unused-expressions
      expect(propsExist(object, ['level1', 'level2', 'level3'])).to.be.false;
    });
  });
});
