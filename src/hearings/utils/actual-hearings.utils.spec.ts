import { ActualHearingsUtils } from './actual-hearings.utils';
import { hearingActualsMainModel } from '../hearing.test.data';
import * as _ from 'lodash';

describe('ActualHearingsUtils', () => {

  it('should return ActualHearings Timing length', () => {
    ActualHearingsUtils.isHearingDaysUpdated = true;
    expect(ActualHearingsUtils.isHearingDaysUpdated).toBe(true);
  });

  it('should return hearing days when hearingActuals are null', () => {
    const mainModel = _.cloneDeep(hearingActualsMainModel);
    mainModel.hearingActuals = null;
    const day = mainModel.hearingPlanned.plannedHearingDays[0];
    const obj1 = Object.assign({}, day, {plannedStartTime: '2021-03-13'});
    const obj2 = Object.assign({}, day, {plannedStartTime: '2021-03-15'});
    mainModel.hearingPlanned.plannedHearingDays.push(obj2);
    mainModel.hearingPlanned.plannedHearingDays.push(obj1);
    const hearingDays = ActualHearingsUtils.getActualHearingDay(mainModel);
    expect(hearingDays).toBeDefined();
  });

  it('should return hearing days when hearingActuals are available', () => {
    const mainModel = _.cloneDeep(hearingActualsMainModel);
    const hearingDays = ActualHearingsUtils.getActualHearingDay(mainModel);
    expect(hearingDays).toBeDefined();
  });

});
