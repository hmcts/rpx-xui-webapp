import { expect } from 'chai';
import { allContainOnlySafeCharacters, hasUnacceptableCharacters, urlHasUnacceptableCharacters } from './utils';

describe('api utils', () => {
  describe('hasUnacceptableCharacters', () => {
    it('should match strings that contain dangerous characters', () => {
      expect(hasUnacceptableCharacters(null)).to.equal(false);
      const testString = '<script>alert("hello")</script>';
      expect(hasUnacceptableCharacters(testString)).to.equal(true);
      const testString2 = 'email@test.com';
      expect(hasUnacceptableCharacters(testString2)).to.equal(false);
      const testString3 = '&//?';
      expect(hasUnacceptableCharacters(testString3)).to.equal(true);
      const testString4 = '//https://www.google.com';
      expect(hasUnacceptableCharacters(testString4)).to.equal(true);
    });
  });

  describe('urlHasUnacceptableCharacters', () => {
    it('should match urls that do not contain dangerous characters', () => {
      expect(urlHasUnacceptableCharacters(null)).to.equal(false);
      const testString = '<script>alert("hello")</script>';
      expect(urlHasUnacceptableCharacters(testString)).to.equal(true);
      const testString2 = 'email@test.com';
      expect(urlHasUnacceptableCharacters(testString2)).to.equal(false);
      const testString3 = '&//?';
      expect(urlHasUnacceptableCharacters(testString3)).to.equal(false);
      const testString4 = '//https://www.google.com';
      expect(urlHasUnacceptableCharacters(testString4)).to.equal(false);
    });
  });

  describe('allContainOnlySafeCharacters', () => {
    it('should match lists with strings that do not contain dangerous characters', () => {
      expect(allContainOnlySafeCharacters([])).to.equal(true);
      const testList = ['ab', 'cd=ef', 'gh.jk'];
      expect(allContainOnlySafeCharacters(testList)).to.equal(true);
      testList.push('lm<n');
      expect(allContainOnlySafeCharacters(testList)).to.equal(false);
    });
  });
});
