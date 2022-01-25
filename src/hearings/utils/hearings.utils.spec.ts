import {HearingsUtils} from './hearings.utils';

describe('HearingsUtils', () => {

  it('should return true if has the right property', () => {
    const evaluateResult = HearingsUtils.hasPropertyAndValue({mode: 'create'}, 'mode', 'create');
    expect(evaluateResult).toBeTruthy();
  });

  it('should return false if has not the right property', () => {
    const evaluateResult = HearingsUtils.hasPropertyAndValue({mode: 'edit'}, 'mode', 'create');
    expect(evaluateResult).toBeFalsy();
  });

});
