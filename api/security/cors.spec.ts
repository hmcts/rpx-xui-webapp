import { expect } from 'chai';
import { isOriginAllowed } from './cors';

describe('CORS origin allowlist', () => {
  it('allows when origin is missing', () => {
    expect(isOriginAllowed(undefined, ['https://example.com'])).to.equal(true);
  });

  it('rejects null origin string', () => {
    expect(isOriginAllowed('null', ['https://example.com'])).to.equal(false);
  });

  it('allows exact origin matches', () => {
    expect(isOriginAllowed('https://manage-case.platform.hmcts.net', ['https://manage-case.platform.hmcts.net'])).to.equal(true);
  });

  it('rejects subdomains when only parent is allowed', () => {
    expect(
      isOriginAllowed('https://attacker.manage-case.platform.hmcts.net', ['https://manage-case.platform.hmcts.net'])
    ).to.equal(false);
  });

  it('rejects different protocol', () => {
    expect(isOriginAllowed('http://manage-case.platform.hmcts.net', ['https://manage-case.platform.hmcts.net'])).to.equal(false);
  });

  it('rejects when allowlist is empty', () => {
    expect(isOriginAllowed('https://manage-case.platform.hmcts.net', [])).to.equal(false);
  });
});
