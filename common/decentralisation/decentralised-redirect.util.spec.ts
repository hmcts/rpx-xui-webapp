import * as assert from 'node:assert/strict';
import { augmentUrl, getMapEntry, getNocBaseUrlForCaseType, getWebUrlForCaseType } from './decentralised-redirect.util';

const caseTypeMap = {
  A11: {
    webUrl: 'http://localhost:8080/web/a11',
    nocBaseUrl: 'http://localhost:8080/noc/a11',
  },
  A1: {
    webUrl: 'http://localhost:8080/web/a',
    nocBaseUrl: 'http://localhost:8080/noc/a',
  },
  B2: { webUrl: 'http://localhost:8080/web/b' },
  C3: {
    webUrl: 'http://localhost:8080/web/prefix/%s/suffix/',
    nocBaseUrl: 'http://localhost:8080/noc/prefix/%s/suffix/',
  },
};

describe('getMapEntry', () => {
  it('returns null when there is no matching case type', () => {
    assert.equal(getMapEntry(caseTypeMap, 'A'), null);
  });

  it('returns null when there is no case type map or no case type', () => {
    assert.equal(getMapEntry({}, 'A'), null);
    assert.equal(getMapEntry({}, undefined), null);
  });

  it('returns the correct case type entry', () => {
    assert.deepStrictEqual(getMapEntry(caseTypeMap, 'A1'), {
      key: 'A1',
      value: caseTypeMap.A1,
    });

    assert.deepStrictEqual(getMapEntry(caseTypeMap, 'A11'), {
      key: 'A11',
      value: caseTypeMap.A11,
    });

    assert.deepStrictEqual(getMapEntry(caseTypeMap, 'B2'), {
      key: 'B2',
      value: caseTypeMap.B2,
    });

    assert.deepStrictEqual(getMapEntry(caseTypeMap, 'C345'), {
      key: 'C3',
      value: caseTypeMap.C3,
    });
  });
});

describe('augmentUrl', () => {
  it('returns null when the inputs are undefined', () => {
    assert.equal(augmentUrl(undefined, 'A', 'B'), null);
    assert.equal(augmentUrl('A', undefined, 'B'), null);
    assert.equal(augmentUrl('A', 'B', undefined), null);
  });

  it('augments the given URL with the case type', () => {
    // N.B. the placeholder is replaced with a substring of the given case type that excludes the part of the case type that is the caseTypeMap key
    assert.equal(
      augmentUrl('http://localhost:8080/web/prefix/%s/suffix/', 'C2', 'C345'),
      'http://localhost:8080/web/prefix/45/suffix'
    );
  });
});

describe('getting the webUrl for case types', () => {
  it('returns the URL for the given case type', () => {
    assert.equal(getWebUrlForCaseType(caseTypeMap, 'A1'), 'http://localhost:8080/web/a');
    assert.equal(getWebUrlForCaseType(caseTypeMap, 'A11'), 'http://localhost:8080/web/a11');
    assert.equal(getWebUrlForCaseType(caseTypeMap, 'B2'), 'http://localhost:8080/web/b');
    assert.equal(getWebUrlForCaseType(caseTypeMap, 'C345'), 'http://localhost:8080/web/prefix/45/suffix');
  });
});

describe('getting the nocBaseUrl for case types', () => {
  it('returns the URL for the given case type', () => {
    assert.equal(getNocBaseUrlForCaseType(caseTypeMap, 'A1'), 'http://localhost:8080/noc/a');
    assert.equal(getNocBaseUrlForCaseType(caseTypeMap, 'A11'), 'http://localhost:8080/noc/a11');
    assert.equal(getNocBaseUrlForCaseType(caseTypeMap, 'B2'), null);
    assert.equal(getNocBaseUrlForCaseType(caseTypeMap, 'C345'), 'http://localhost:8080/noc/prefix/45/suffix');
  });
});
