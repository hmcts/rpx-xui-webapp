import { LovRefDataModel } from '../models/lovRefData.model';
import { HearingStageDisplayValuePipe } from './stage-display-value.pipe';

describe('HearingStageDisplayValuePipe', () => {
  const STAGES: LovRefDataModel[] = [{
    key: 'BBA3-SUB',
    value_en: 'Substantive',
    value_cy: '',
    hint_text_en: 'Substantive',
    hint_text_cy: '',
    lov_order: 1,
    parent_key: null,
    category_key: 'HearingType',
    parent_category: '',
    active_flag: 'Y',
    child_nodes: null,
    from: 'exui-default'
  }];
  let hearingStageDisplay: HearingStageDisplayValuePipe;

  beforeEach(() => {
    hearingStageDisplay = new HearingStageDisplayValuePipe();
  });

  it('should transform is welsh page hidden', () => {
    expect(hearingStageDisplay.transform('BBA3-SUB', STAGES)).toBe('Substantive');
  });
});
