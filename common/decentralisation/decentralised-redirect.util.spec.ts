import * as assert from 'node:assert/strict';
import { getUrlForCaseType } from './decentralised-redirect.util';

describe('getUrlForCaseType', () => {
  const caseTypeMap = {
    A11: { webUrl: 'http://localhost:8080/a11' },
    A1: { webUrl: 'http://localhost:8080/a' },
    B2: { webUrl: 'http://localhost:8080/b' },
    C3: { webUrl: 'http://localhost:8080/prefix/%s/suffix/' },
  };

  it('returns the URL for the given case type', () => {
    assert.equal(getUrlForCaseType(caseTypeMap, 'A1'), 'http://localhost:8080/a');
    assert.equal(getUrlForCaseType(caseTypeMap, 'A11'), 'http://localhost:8080/a11');
    assert.equal(getUrlForCaseType(caseTypeMap, 'B2'), 'http://localhost:8080/b');

    // N.B. the placeholder is replaced with a substring of the given case type that excludes the part of the case type that is the caseTypeMap key
    assert.equal(getUrlForCaseType(caseTypeMap, 'C345'), 'http://localhost:8080/prefix/45/suffix');
  });

  it('returns null when there is no matching case type', () => {
    assert.equal(getUrlForCaseType(caseTypeMap, 'A'), null);
  });

  it('returns null when there is no case type map or no case tpye', () => {
    assert.equal(getUrlForCaseType({}, 'A'), null);
    assert.equal(getUrlForCaseType({}, undefined), null);
  });
});
