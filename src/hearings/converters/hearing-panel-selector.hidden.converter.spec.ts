import { cold } from 'jasmine-marbles';
import { of } from 'rxjs';
import { State } from '../store';
import { HearingPanelSelectorHiddenConverter } from './hearing-panel-selector.hidden.converter';

describe('HearingPanelSelectorHiddenConverter', () => {
  let hearingPanelSelectorHiddenConverter: HearingPanelSelectorHiddenConverter;

  beforeEach(() => {
    hearingPanelSelectorHiddenConverter = new HearingPanelSelectorHiddenConverter();
  });

  it('should transform hidden to true when hearing-panel-required is not in screenFlow', () => {
    const STATE: State = {
      hearingValues: {
        serviceHearingValuesModel: {
          screenFlow: []
        }
      }
    } as any;
    const result$ = hearingPanelSelectorHiddenConverter.transformHidden(of(STATE));
    const expected = cold('(b|)', { b: true });
    expect(result$).toBeObservable(expected);
  });

  it('should transform hidden to false when hearing-panel-required is in screenFlow', () => {
    const STATE: State = {
      hearingValues: {
        serviceHearingValuesModel: {
          screenFlow: [
            { screenName: 'hearing-panel-required' }
          ]
        }
      }
    } as any;
    const result$ = hearingPanelSelectorHiddenConverter.transformHidden(of(STATE));
    const expected = cold('(b|)', { b: false });
    expect(result$).toBeObservable(expected);
  });
});
