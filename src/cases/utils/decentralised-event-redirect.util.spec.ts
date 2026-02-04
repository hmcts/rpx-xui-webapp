import { buildDecentralisedEventUrl } from './decentralised-event-redirect.util';

describe('decentralised-event-redirect.util', () => {
  it('should build an external URL for existing case events', () => {
    const url = buildDecentralisedEventUrl({
      baseUrls: { PCS: 'https://pcs-frontend.service.gov.uk' },
      caseType: 'pcs',
      caseId: '1234567890',
      eventId: 'ext:fooEvent',
      queryParams: { tid: 'task-1', foo: 'bar' },
      expectedSub: 'user-123',
    });

    expect(url).toBe(
      'https://pcs-frontend.service.gov.uk/cases/1234567890/event/ext%3AfooEvent?tid=task-1&foo=bar&expected_sub=user-123'
    );
  });

  it('should build an external URL for case-create events', () => {
    const url = buildDecentralisedEventUrl({
      baseUrls: { PCS: 'https://pcs-frontend.service.gov.uk' },
      caseType: 'PCS',
      jurisdiction: 'IA',
      eventId: 'ext:createCase',
      expectedSub: 'user-456',
      isCaseCreate: true,
    });

    expect(url).toBe('https://pcs-frontend.service.gov.uk/cases/case-create/IA/PCS/ext%3AcreateCase?expected_sub=user-456');
  });

  it('should return null when the event is not decentralised', () => {
    const url = buildDecentralisedEventUrl({
      baseUrls: { PCS: 'https://pcs-frontend.service.gov.uk' },
      caseType: 'PCS',
      caseId: '1234567890',
      eventId: 'standardEvent',
      expectedSub: 'user-123',
    });

    expect(url).toBeNull();
  });
});
