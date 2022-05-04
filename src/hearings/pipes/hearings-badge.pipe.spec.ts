import {EXUIDisplayStatusEnum} from '../models/hearings.enum';
import {HearingsBadgePipe} from './hearings-badge.pipe';

describe('HearingsBadgePipe', () => {

  let hearingsBadgePipe: HearingsBadgePipe;

  beforeEach(() => {
    hearingsBadgePipe = new HearingsBadgePipe();
  });

  it('should return RED badge if vacated', () => {
    const badge = hearingsBadgePipe.transform(EXUIDisplayStatusEnum.VACATED);
    expect(badge).toBe('govuk-tag govuk-tag--red');
  });

  it('should return RED badge if cancelled', () => {
    const badge = hearingsBadgePipe.transform(EXUIDisplayStatusEnum.CANCELLED);
    expect(badge).toBe('govuk-tag govuk-tag--red');
  });

  it('should return PURPLE badge if completed', () => {
    const badge = hearingsBadgePipe.transform(EXUIDisplayStatusEnum.COMPLETED);
    expect(badge).toBe('govuk-tag govuk-tag--purple');
  });

  it('should return GREEN badge if listed', () => {
    const badge = hearingsBadgePipe.transform(EXUIDisplayStatusEnum.LISTED);
    expect(badge).toBe('govuk-tag govuk-tag--green');
  });

  it('should return GREY badge if awaiting listing', () => {
    const badge = hearingsBadgePipe.transform(EXUIDisplayStatusEnum.AWAITING_LISTING);
    expect(badge).toBe('govuk-tag govuk-tag--grey');
  });

  it('should return GREY badge if update requested', () => {
    const badge = hearingsBadgePipe.transform(EXUIDisplayStatusEnum.UPDATE_REQUESTED);
    expect(badge).toBe('govuk-tag govuk-tag--grey');
  });

  it('should return GREY badge if cancellation requested', () => {
    const badge = hearingsBadgePipe.transform(EXUIDisplayStatusEnum.CANCELLATION_REQUESTED);
    expect(badge).toBe('govuk-tag govuk-tag--grey');
  });

  it('should return ORANGE badge if failure', () => {
    const badge = hearingsBadgePipe.transform(EXUIDisplayStatusEnum.FAILURE);
    expect(badge).toBe('govuk-tag govuk-tag--orange');
  });

  it('should return BLUE badge if awaiting actual', () => {
    const badge = hearingsBadgePipe.transform(EXUIDisplayStatusEnum.AWAITING_ACTUALS);
    expect(badge).toBe('govuk-tag govuk-tag--blue');
  });

  it('should return YELLOW badge if adjourned', () => {
    const badge = hearingsBadgePipe.transform(EXUIDisplayStatusEnum.ADJOURNED);
    expect(badge).toBe('govuk-tag govuk-tag--yellow');
  });

  it('should return nothing if no matched status', () => {
    const badge = hearingsBadgePipe.transform(null);
    expect(badge).toBe('govuk-tag');
  });
});
