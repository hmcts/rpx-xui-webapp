import { HearingListingStatusEnum } from '../models/hearings.enum';
import { HearingsBadgePipe } from './hearings.pipe';

describe('HearingsBadgePipe', () => {

  let hearingsBadgePipe: HearingsBadgePipe;

  beforeEach(() => {
    hearingsBadgePipe = new HearingsBadgePipe();
  });

  it('should return RED badge if cancelled', () => {
    const badge = hearingsBadgePipe.transform(HearingListingStatusEnum.CANCELLED);
    expect(badge).toBe('govuk-tag govuk-tag--red');
  });

  it('should return PURPLE badge if completed', () => {
    const badge = hearingsBadgePipe.transform(HearingListingStatusEnum.COMPLETED);
    expect(badge).toBe('govuk-tag govuk-tag--purple');
  });

  it('should return GREEN badge if listed', () => {
    const badge = hearingsBadgePipe.transform(HearingListingStatusEnum.LISTED);
    expect(badge).toBe('govuk-tag govuk-tag--green');
  });

  it('should return GREY badge if to be listed', () => {
    const badge = hearingsBadgePipe.transform(HearingListingStatusEnum.WAITING_TO_BE_LISTED);
    expect(badge).toBe('govuk-tag govuk-tag--grey');
  });

  it('should return nothing if no matched status', () => {
    const badge = hearingsBadgePipe.transform(null);
    expect(badge).toBe('');
  });
});
