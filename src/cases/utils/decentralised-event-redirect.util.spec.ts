import { buildDecentralisedEventUrl, getExpectedSubFromUserDetails } from './decentralised-event-redirect.util';

describe('decentralised-event-redirect.util', () => {
  let consoleErrorSpy: jasmine.Spy;

  beforeEach(() => {
    consoleErrorSpy = spyOn(console, 'error');
  });

  it('should build an external URL for existing case events', () => {
    const url = buildDecentralisedEventUrl(
      {
        caseType: 'pcs',
        caseId: '1234567890',
        isCaseCreate: false,
        eventId: 'ext:fooEvent',
        queryParams: { tid: 'task-1', foo: 'bar' },
      },
      { PCS: 'https://pcs-frontend.service.gov.uk' },
      'user-123'
    );

    expect(url).toBe(
      'https://pcs-frontend.service.gov.uk/cases/1234567890/event/ext%3AfooEvent?tid=task-1&foo=bar&expected_sub=user-123'
    );
    expect(consoleErrorSpy).not.toHaveBeenCalled();
  });

  it('should build an external URL for case-create events', () => {
    const url = buildDecentralisedEventUrl(
      {
        caseType: 'PCS',
        jurisdiction: 'IA',
        eventId: 'ext:createCase',
        isCaseCreate: true,
      },
      { PCS: 'https://pcs-frontend.service.gov.uk' },
      'user-456'
    );

    expect(url).toBe('https://pcs-frontend.service.gov.uk/cases/case-create/IA/PCS/ext%3AcreateCase?expected_sub=user-456');
    expect(consoleErrorSpy).not.toHaveBeenCalled();
  });

  it('should return null when the event is not decentralised', () => {
    const url = buildDecentralisedEventUrl(
      {
        caseType: 'PCS',
        caseId: '1234567890',
        isCaseCreate: false,
        eventId: 'standardEvent',
      },
      { PCS: 'https://pcs-frontend.service.gov.uk' },
      'user-123'
    );

    expect(url).toBeNull();
    expect(consoleErrorSpy).not.toHaveBeenCalled();
  });

  it('should return null when case type is missing at runtime', () => {
    const url = buildDecentralisedEventUrl(
      {
        caseType: undefined,
        caseId: '1234567890',
        isCaseCreate: false,
        eventId: 'ext:fooEvent',
      } as any,
      { PCS: 'https://pcs-frontend.service.gov.uk' },
      'user-123'
    );

    expect(url).toBeNull();
    expect(consoleErrorSpy).not.toHaveBeenCalled();
  });

  it('should prefer the longest matching prefix for base URL resolution', () => {
    const url = buildDecentralisedEventUrl(
      {
        caseType: 'Prefix-Case',
        caseId: '123',
        isCaseCreate: false,
        eventId: 'ext:fooEvent',
      },
      {
        pre: 'https://one.test',
        prefix: 'https://two.test',
      },
      'user-123'
    );

    expect(url).toBe('https://two.test/cases/123/event/ext%3AfooEvent?expected_sub=user-123');
    expect(consoleErrorSpy).not.toHaveBeenCalled();
  });

  it('should resolve base URL from a template with %s placeholder', () => {
    const url = buildDecentralisedEventUrl(
      {
        caseType: 'PCS_PR_1234',
        caseId: '123',
        isCaseCreate: false,
        eventId: 'ext:fooEvent',
      },
      {
        PCS_PR_: 'https://pcs-xui-pr-%s.preview.platform',
      },
      'user-123'
    );

    expect(url).toBe('https://pcs-xui-pr-1234.preview.platform/cases/123/event/ext%3AfooEvent?expected_sub=user-123');
    expect(consoleErrorSpy).not.toHaveBeenCalled();
  });

  it('should return null when multiple longest prefixes match (ambiguous)', () => {
    const url = buildDecentralisedEventUrl(
      {
        caseType: 'AB123',
        caseId: '123',
        isCaseCreate: false,
        eventId: 'ext:fooEvent',
      },
      {
        ab: 'https://one.test',
        AB: 'https://two.test',
      },
      'user-123'
    );

    expect(url).toBeNull();
    expect(consoleErrorSpy).toHaveBeenCalled();
  });

  it('should return null when template has multiple %s placeholders', () => {
    const url = buildDecentralisedEventUrl(
      {
        caseType: 'PCS_PR_1234',
        caseId: '123',
        isCaseCreate: false,
        eventId: 'ext:fooEvent',
      },
      {
        PCS_PR_: 'https://%s.%s.preview.platform',
      },
      'user-123'
    );

    expect(url).toBeNull();
    expect(consoleErrorSpy).toHaveBeenCalled();
  });

  it('should return null when template substitution suffix is missing', () => {
    const url = buildDecentralisedEventUrl(
      {
        caseType: 'PCS_PR_',
        caseId: '123',
        isCaseCreate: false,
        eventId: 'ext:fooEvent',
      },
      {
        PCS_PR_: 'https://pcs-xui-pr-%s.preview.platform',
      },
      'user-123'
    );

    expect(url).toBeNull();
    expect(consoleErrorSpy).toHaveBeenCalled();
  });

  [
    { input: JSON.stringify({ id: 'user-123', uid: 'user-uid' }), expected: 'user-123', name: 'prefer id when present' },
    { input: JSON.stringify({ uid: 'user-uid' }), expected: 'user-uid', name: 'fallback to uid' },
    { input: null, expected: null, name: 'return null when userDetails missing' },
    { input: '{bad json', expected: null, name: 'return null for malformed JSON' },
  ].forEach(({ input, expected, name }) => {
    it(`should ${name} when reading expected sub from userDetails`, () => {
      expect(getExpectedSubFromUserDetails(input)).toBe(expected);
    });
  });
});
