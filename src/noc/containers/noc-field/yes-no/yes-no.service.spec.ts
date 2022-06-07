import { YesNoService } from './yes-no.service';

describe('YesNoService', () => {

  const YES = 'Yes';
  const NO = 'No';
  const EMPTY = null;

  let yesNoService: YesNoService;

  beforeEach(() => {
    yesNoService = new YesNoService();
  });

  describe(YES, () => {
    it('should return "Yes" when value is `true`', () => {
      expect(yesNoService.format(true)).toBe(YES);
    });

    it('should return "Yes" when value is "Yes"', () => {
      expect(yesNoService.format('Yes')).toBe(YES);
    });

    it('should return "Yes" when value is "yes"', () => {
      expect(yesNoService.format('yes')).toBe(YES);
    });

    it('should return "Yes" when value is "YES"', () => {
      expect(yesNoService.format('YES')).toBe(YES);
    });

    it('should return "Yes" when value is "yeS"', () => {
      expect(yesNoService.format('yeS')).toBe(YES);
    });

    it('should return "Yes" when value is "y"', () => {
      expect(yesNoService.format('y')).toBe(YES);
    });

    it('should return "Yes" when value is "Y"', () => {
      expect(yesNoService.format('Y')).toBe(YES);
    });
  });

  describe(NO, () => {
    it('should return "No" when value is `false`', () => {
      expect(yesNoService.format(false)).toBe(NO);
    });

    it('should return "No" when value is "No"', () => {
      expect(yesNoService.format('No')).toBe(NO);
    });

    it('should return "No" when value is "no"', () => {
      expect(yesNoService.format('no')).toBe(NO);
    });

    it('should return "No" when value is "NO"', () => {
      expect(yesNoService.format('NO')).toBe(NO);
    });

    it('should return "No" when value is "n"', () => {
      expect(yesNoService.format('n')).toBe(NO);
    });

    it('should return "No" when value is "N"', () => {
      expect(yesNoService.format('N')).toBe(NO);
    });
  });

  describe('empty', () => {
    it('should return null when value is undefined', () => {
      expect(yesNoService.format(undefined)).toBe(EMPTY);
    });

    it('should return null when value is null', () => {
      expect(yesNoService.format(null)).toBe(EMPTY);
    });

    it('should return null when value is not a supported value', () => {
      expect(yesNoService.format('plop')).toBe(EMPTY);
      expect(yesNoService.format('yesno')).toBe(EMPTY);
      expect(yesNoService.format('nop')).toBe(EMPTY);
    });
  });
});
