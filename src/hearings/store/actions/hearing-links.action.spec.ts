import * as fromHearingLinksAction from './hearing-links.action';

describe('Hearing Links Actions', () => {

  it('should reset hearing links', () => {
    const action = new fromHearingLinksAction.ResetHearingLinks();
    expect(action.type).toBe(fromHearingLinksAction.RESET_HEARING_LINKS);
  });

  it('should load service linked cases', () => {
    const action = new fromHearingLinksAction.LoadServiceLinkedCases({ caseReference: '1111222233334444', hearingId: 'h1000000' });
    expect(action.type).toBe(fromHearingLinksAction.LOAD_SERVICE_LINKED_CASES);
  });

  it('should load service linked cases success', () => {
    const action = new fromHearingLinksAction.LoadServiceLinkedCasesSuccess([]);
    expect(action.type).toBe(fromHearingLinksAction.LOAD_SERVICE_LINKED_CASES_SUCCESS);
  });

  it('should load service linked cases success', () => {
    const action = new fromHearingLinksAction.LoadServiceLinkedCasesFailure({
      status: 500,
      message: 'failed',
    });
    expect(action.type).toBe(fromHearingLinksAction.LOAD_SERVICE_LINKED_CASES_FAILURE);
  });

});
