import { expect } from '@playwright/test';

export const normalizeCaseNumber = (value: string): string => value.replaceAll(/\D/g, '');

export const getCaseBannerInfo = (bannerText: string): { message: string; digits: string } => {
  const message = bannerText.trim();
  return {
    message,
    digits: normalizeCaseNumber(message),
  };
};

export const caseBannerMatches = (bannerText: string, caseNumber: string, expectedMessage: string): boolean => {
  const { message, digits } = getCaseBannerInfo(bannerText);
  return digits === caseNumber && message.includes(expectedMessage);
};

type ExpectFunction = <T>(actual: T) => ReturnType<typeof expect<T>>;

export const expectCaseBanner = (
  bannerText: string,
  caseNumber: string,
  expectedMessage: string,
  expectFn: ExpectFunction = expect as ExpectFunction
) => {
  const { message, digits } = getCaseBannerInfo(bannerText);
  expectFn(digits).toBe(caseNumber);
  expectFn(message).toContain(expectedMessage);
};
