import * as _ from 'lodash';
import { hearingActualsMainModel } from '../hearing.test.data';
import { ActualHearingsUtils } from './actual-hearings.utils';

describe('ActualHearingsUtils', () => {
  it('should return hearing days when hearingActuals are null', () => {
    const mainModel = _.cloneDeep(hearingActualsMainModel);
    mainModel.hearingActuals = null;
    const day = mainModel.hearingPlanned.plannedHearingDays[0];
    const obj1 = Object.assign({}, day, { plannedStartTime: '2021-03-13' });
    const obj2 = Object.assign({}, day, { plannedStartTime: '2021-03-15' });
    mainModel.hearingPlanned.plannedHearingDays.push(obj2);
    mainModel.hearingPlanned.plannedHearingDays.push(obj1);
    const hearingDays = ActualHearingsUtils.getActualHearingDays(mainModel, false);
    expect(hearingDays).toBeDefined();
  });

  it('should return hearing days when hearingActuals are available', () => {
    const mainModel = _.cloneDeep(hearingActualsMainModel);
    const hearingDays = ActualHearingsUtils.getActualHearingDays(mainModel, false);
    expect(hearingDays).toBeDefined();
  });

  it('should return hearing start and end times as undefined when hearingActuals are null on CYA page', () => {
    const mainModel = _.cloneDeep(hearingActualsMainModel);
    mainModel.hearingActuals = null;
    const day = mainModel.hearingPlanned.plannedHearingDays[0];
    const obj1 = Object.assign({}, day, { plannedStartTime: '2021-03-13' });
    const obj2 = Object.assign({}, day, { plannedStartTime: '2021-03-15' });
    mainModel.hearingPlanned.plannedHearingDays.push(obj2);
    mainModel.hearingPlanned.plannedHearingDays.push(obj1);
    const hearingDays = ActualHearingsUtils.getActualHearingDays(mainModel, true);
    console.log('HEARING DAYS', hearingDays);
    expect(hearingDays).toBeDefined();
    expect(hearingDays[0].hearingStartTime).toBeUndefined();
    expect(hearingDays[0].hearingEndTime).toBeUndefined();
  });

  it('should return attending representative', () => {
    const hearingDate = '2021-03-12';
    const attendingRepresentative1 = ActualHearingsUtils.getRepresentingAttendee('1', hearingActualsMainModel, hearingDate);
    expect(attendingRepresentative1).toEqual('Bob Jones');
    const attendingRepresentative2 = ActualHearingsUtils.getRepresentingAttendee('2', hearingActualsMainModel, hearingDate);
    expect(attendingRepresentative2).toEqual('DWP');
    const attendingRepresentative3 = ActualHearingsUtils.getRepresentingAttendee('3', hearingActualsMainModel, hearingDate);
    expect(attendingRepresentative3).toEqual('');
  });
});
