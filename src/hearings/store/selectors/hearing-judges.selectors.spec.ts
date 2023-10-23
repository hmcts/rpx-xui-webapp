import { getHearingJudgeIds } from './hearing-judges.selectors';

describe('Hearing Judges selectors', () => {
  fdescribe('getHearingJudgeIds', () => {
    it('should return an empty array if state is undefined', () => {
      const state = undefined;
      const result = getHearingJudgeIds.projector(state);
      expect(result).toEqual([]);
    });
    it('should return an empty array if hearingList is undefined', () => {
      const state = { hearingList: undefined };
      const result = getHearingJudgeIds.projector(state);
      expect(result).toEqual([]);
    });
    it('should return an empty array if hearingListMainModel is undefined', () => {
      const state = { hearingList: { hearingListMainModel: undefined } };
      const result = getHearingJudgeIds.projector(state);
      expect(result).toEqual([]);
    });
    it('should return an empty array if caseHearings is undefined', () => {
      const state = { hearingList: { hearingListMainModel: { caseHearings: undefined } } };
      const result = getHearingJudgeIds.projector(state);
      expect(result).toEqual([]);
    });
    it('should return an empty array if caseHearings is empty', () => {
      const state = { hearingList: { hearingListMainModel: { caseHearings: [] } } };
      const result = getHearingJudgeIds.projector(state);
      expect(result).toEqual([]);
    });
    it('should return the correct judge ids for each hearing', () => {
      const state = {
        hearingList: {
          hearingListMainModel: {
            caseHearings: [
              { hearingDaySchedule: [{ hearingJudgeId: 1001 }, { hearingJudgeId: 1002 }] },
              { hearingDaySchedule: [{ hearingJudgeId: 1003 }] }
            ]
          }
        }
      };
      const result = getHearingJudgeIds.projector(state);
      expect(result).toEqual([1001, 1002, 1003]);
    });
  });
});
