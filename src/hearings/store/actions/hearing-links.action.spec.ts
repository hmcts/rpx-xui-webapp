import * as fromHearingLinksAction from './hearing-links.action';

describe('Hearing Links Actions', () => {
  it('should reset hearing links', () => {
    const action = new fromHearingLinksAction.ResetHearingLinks();
    expect(action.type).toBe(fromHearingLinksAction.RESET_HEARING_LINKS);
  });

  it('should load service linked cases', () => {
    const action = new fromHearingLinksAction.LoadServiceLinkedCases({ jurisdictionId: 'JURISDICTION', caseReference: '1111222233334444', hearingId: 'h1000000' });
    expect(action.type).toBe(fromHearingLinksAction.LOAD_SERVICE_LINKED_CASES);
  });

  it('should load service linked cases success', () => {
    const action = new fromHearingLinksAction.LoadServiceLinkedCasesSuccess([]);
    expect(action.type).toBe(fromHearingLinksAction.LOAD_SERVICE_LINKED_CASES_SUCCESS);
  });

  it('should load service linked cases success', () => {
    const action = new fromHearingLinksAction.LoadServiceLinkedCasesFailure({
      status: 500,
      message: 'failed'
    });
    expect(action.type).toBe(fromHearingLinksAction.LOAD_SERVICE_LINKED_CASES_FAILURE);
  });

  it('should submit linked hearing group action', () => {
    const payload = {
      linkedHearingGroup: null,
      caseId: null,
      hearingGroupRequestId: null,
      hearingId: null,
      isManageLink: null
    };
    const action = new fromHearingLinksAction.SubmitLinkedHearingGroup(payload);
    expect(action.type).toBe(fromHearingLinksAction.SUBMIT_LINKED_HEARING_GROUP);
  });

  it('should submit linked hearing group failure action', () => {
    const payload = {
      status: 403,
      errors: null,
      message: 'Http failure response: 403 Forbidden'
    };
    const action = new fromHearingLinksAction.SubmitLinkedHearingGroupFailure(payload);
    expect(action.type).toBe(fromHearingLinksAction.SUBMIT_LINKED_HEARING_GROUP_FAILURE);
  });

  it('should reset linked hearing last error action', () => {
    const action = new fromHearingLinksAction.ResetLinkedHearingLastError();
    expect(action.type).toBe(fromHearingLinksAction.RESET_LINKED_HEARING_LAST_ERROR);
  });
});
