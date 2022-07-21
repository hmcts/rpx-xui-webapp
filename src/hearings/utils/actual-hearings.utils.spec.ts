import { hearingActualsMainModel } from '../hearing.test.data';
import { ActualHearingsUtils } from './actual-hearings.utils';
import * as _ from 'lodash';

describe('ActualHearingsUtils', () => {

  it('should return ActualHearings Timing length', () => {
    ActualHearingsUtils.isHearingDaysUpdated = true;
    expect(ActualHearingsUtils.isHearingDaysUpdated).toBe(true);
  });

  it('should return hearing days when hearingActuals are null', () => {
    const mainModel = _.cloneDeep(hearingActualsMainModel);
    mainModel.hearingActuals = null;
    const hearingDays = ActualHearingsUtils.getActualHearingDay(mainModel);
    expect(hearingDays).toBeDefined();
  })

  it('should return hearing days when hearingActuals are available', () => {
    const mainModel = _.cloneDeep(hearingActualsMainModel);
    const hearingDays = ActualHearingsUtils.getActualHearingDay(mainModel);
    expect(hearingDays).toBeDefined();
  })

});
