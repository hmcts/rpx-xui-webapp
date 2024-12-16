import { expect } from 'chai';
import { allDoNotContainDangerousCharacters, hasNoDangerousCharacters, urlHasNoDangerousCharacters } from './utils';

describe('api utils', () => {
  describe('hasNoDangerousCharacters', () => {
    it('should match strings that do not contain dangerous characters', () => {
      expect(hasNoDangerousCharacters(null)).to.equal(true);
      const testString = '<script>alert("hello")</script>';
      expect(hasNoDangerousCharacters(testString)).to.equal(false);
      const testString2 = 'email@test.com';
      expect(hasNoDangerousCharacters(testString2)).to.equal(true);
      const testString3 = '&//?';
      expect(hasNoDangerousCharacters(testString3)).to.equal(false);
      const testString4 = '//https://www.google.com';
      expect(hasNoDangerousCharacters(testString4)).to.equal(false);
    });
  });

  describe('urlHasNoDangerousCharacters', () => {
    it('should match urls that do not contain dangerous characters', () => {
      expect(urlHasNoDangerousCharacters(null)).to.equal(true);
      const testString = '<script>alert("hello")</script>';
      expect(urlHasNoDangerousCharacters(testString)).to.equal(false);
      const testString2 = 'email@test.com';
      expect(urlHasNoDangerousCharacters(testString2)).to.equal(true);
      const testString3 = '&//?';
      expect(urlHasNoDangerousCharacters(testString3)).to.equal(true);
      const testString4 = '//https://www.google.com';
      expect(urlHasNoDangerousCharacters(testString4)).to.equal(true);
    });
  });

  describe('allDoNotContainDangerousCharacters', () => {
    it('should match lists with strings that do not contain dangerous characters', () => {
      expect(allDoNotContainDangerousCharacters([])).to.equal(true);
      const testList = ['ab', 'cd=ef', 'gh.jk'];
      expect(allDoNotContainDangerousCharacters(testList)).to.equal(true);
      testList.push('lm<n');
      expect(allDoNotContainDangerousCharacters(testList)).to.equal(false);
    });
  });
});
