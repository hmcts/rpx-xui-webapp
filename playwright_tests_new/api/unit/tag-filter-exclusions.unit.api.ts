import { expect, test } from '@playwright/test';
import { resolveWithConfig } from './tag-filter-exclusions.fixture';

const activeExclusion = { tag: '@feature-b', ticket: 'EXUI-1', owner: 'team-a', expires: '2026-12-31' };
const expiredExclusion = { tag: '@feature-c', ticket: 'EXUI-2', owner: 'team-b', expires: '2026-06-14' };

test.describe('tag filter exclusions', { tag: '@svc-internal' }, () => {
  test('merges exclusions with excludedTags without warning while they are current', () => {
    const { filters, warnings } = resolveWithConfig('current', { excludedTags: ['@feature-a'], exclusions: [activeExclusion] });

    expect(filters.excludedTags).toEqual(['@feature-a', '@feature-b']);
    expect(warnings).toEqual([]);
  });

  test('keeps the existing excludedTags-only format working', () => {
    const { filters, warnings } = resolveWithConfig('legacy', { excludedTags: ['@feature-a'] });

    expect(filters.excludedTags).toEqual(['@feature-a']);
    expect(warnings).toEqual([]);
  });

  test('treats the expiry day itself as still valid', () => {
    const { warnings } = resolveWithConfig('expires-today', {
      exclusions: [{ ...activeExclusion, expires: '2026-06-15' }],
    });

    expect(warnings).toEqual([]);
  });

  test('warns about expired exclusions but still applies them by default', () => {
    const { filters, warnings } = resolveWithConfig('expired-warn', { exclusions: [activeExclusion, expiredExclusion] });

    expect(filters.excludedTags).toEqual(['@feature-b', '@feature-c']);
    expect(warnings).toHaveLength(1);
    expect(warnings[0]).toContain('@feature-c (ticket EXUI-2, owner team-b, expired 2026-06-14)');
    expect(warnings[0]).not.toContain('@feature-b');
  });

  test('fails on expired exclusions only when PW_TAG_FILTER_ENFORCE_EXPIRY=true', () => {
    expect(() =>
      resolveWithConfig('expired-enforce', { exclusions: [expiredExclusion] }, { PW_TAG_FILTER_ENFORCE_EXPIRY: 'true' })
    ).toThrow(/past their expiry: @feature-c/);
    expect(() =>
      resolveWithConfig('expired-not-enforced', { exclusions: [expiredExclusion] }, { PW_TAG_FILTER_ENFORCE_EXPIRY: 'false' })
    ).not.toThrow();
  });

  test('does not report file exclusions that an env override replaces', () => {
    const { filters, warnings } = resolveWithConfig(
      'overridden',
      { exclusions: [expiredExclusion] },
      { E2E_PW_EXCLUDED_TAGS_OVERRIDE: '@feature-a', PW_TAG_FILTER_ENFORCE_EXPIRY: 'true' }
    );

    expect(filters.excludedTags).toEqual(['@feature-a']);
    expect(warnings).toEqual([]);
  });

  test('rejects exclusions that lack ownership details or use a bad date', () => {
    expect(() =>
      resolveWithConfig('missing-owner', { exclusions: [{ tag: '@feature-b', ticket: 'EXUI-1', expires: '2026-12-31' }] })
    ).toThrow(/exclusions\[0\] is missing owner/);
    expect(() => resolveWithConfig('bad-date', { exclusions: [{ ...activeExclusion, expires: '31/12/2026' }] })).toThrow(
      /must be a valid YYYY-MM-DD date/
    );
    expect(() => resolveWithConfig('not-array', { exclusions: '@feature-b' })).toThrow(/exclusions must be an array/);
  });

  test('rejects exclusions for tags that are not in the available tag list', () => {
    expect(() => resolveWithConfig('unknown-tag', { exclusions: [{ ...activeExclusion, tag: '@nope' }] })).toThrow(
      /unknown tag\(s\): @nope/
    );
  });

  for (const expires of ['2026-02-29', '2026-02-31', '2026-04-31']) {
    test(`rejects the impossible calendar date ${expires}`, () => {
      expect(() => resolveWithConfig(expires, { exclusions: [{ ...activeExclusion, expires }] })).toThrow(
        /must be a valid YYYY-MM-DD date/
      );
    });
  }

  test('accepts a leap day in a leap year', () => {
    expect(
      resolveWithConfig('leap-day', { exclusions: [{ ...activeExclusion, expires: '2028-02-29' }] }).filters.excludedTags
    ).toEqual(['@feature-b']);
  });
});
