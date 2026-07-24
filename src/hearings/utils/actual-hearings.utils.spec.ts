import * as _ from 'lodash';
import { hearingActualsMainModel } from '../hearing.test.data';
import { ActualHearingDayModel } from '../models/hearingActualsMainModel';
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

  it('should create a not required actual hearing day with null timings', () => {
    const mainModel = _.cloneDeep(hearingActualsMainModel);
    mainModel.hearingPlanned.plannedHearingDays.push({
      ...mainModel.hearingPlanned.plannedHearingDays[0],
      plannedStartTime: '2021-03-16T09:00:00.000Z',
      plannedEndTime: '2021-03-16T10:00:00.000Z',
    });

    const result = ActualHearingsUtils.mergeSingleHearingPartActuals(mainModel, '2021-03-16', {
      notRequired: true,
    } as ActualHearingDayModel);

    const actualDay = result.actualHearingDays.find((day) => day.hearingDate === '2021-03-16');
    expect(actualDay).toEqual(
      jasmine.objectContaining({
        hearingDate: '2021-03-16',
        hearingStartTime: null,
        hearingEndTime: null,
        actualDayParties: [],
        pauseDateTimes: [],
        notRequired: true,
      })
    );
    expect(result.hearingOutcome).toEqual(mainModel.hearingActuals.hearingOutcome);
  });

  it('should create a required actual hearing day with planned timings', () => {
    const mainModel = _.cloneDeep(hearingActualsMainModel);
    mainModel.hearingPlanned.plannedHearingDays.push({
      ...mainModel.hearingPlanned.plannedHearingDays[0],
      plannedStartTime: '2021-03-16T09:00:00.000Z',
      plannedEndTime: '2021-03-16T10:00:00.000Z',
    });

    const result = ActualHearingsUtils.mergeSingleHearingPartActuals(mainModel, '2021-03-16', {
      notRequired: false,
    } as ActualHearingDayModel);

    const actualDay = result.actualHearingDays.find((day) => day.hearingDate === '2021-03-16');
    expect(actualDay).toEqual(
      jasmine.objectContaining({
        hearingDate: '2021-03-16',
        hearingStartTime: '2021-03-16T09:00:00.000Z',
        hearingEndTime: '2021-03-16T10:00:00.000Z',
        actualDayParties: [],
        pauseDateTimes: [],
        notRequired: false,
      })
    );
  });

  it('should keep actual data only for not required days on the check your answers page', () => {
    const mainModel = _.cloneDeep(hearingActualsMainModel);
    mainModel.hearingActuals.actualHearingDays[1] = {
      ...mainModel.hearingActuals.actualHearingDays[1],
      hearingStartTime: null,
      hearingEndTime: null,
      actualDayParties: [],
      notRequired: true,
    };

    const hearingDays = ActualHearingsUtils.getActualHearingDays(mainModel, true);

    expect(hearingDays[1]).toEqual(
      jasmine.objectContaining({
        hearingDate: '2021-03-14',
        hearingStartTime: null,
        hearingEndTime: null,
        actualDayParties: [],
        notRequired: true,
      })
    );
  });

  it('should return the correct pause start time when state is "start"', () => {
    const mainModel = _.cloneDeep(hearingActualsMainModel);
    const day = mainModel.hearingActuals.actualHearingDays[0];
    day.pauseDateTimes = [
      {
        pauseStartTime: '2021-03-12T09:20:00.000Z',
        pauseEndTime: '2021-03-12T09:30:00.000Z',
      },
    ];
    const result = ActualHearingsUtils.getPauseDateTime(day, 'start');
    expect(result).toBe('2021-03-12T09:20:00.000Z');
  });

  it('should return the correct pause end time when state is "end"', () => {
    const mainModel = _.cloneDeep(hearingActualsMainModel);
    const day = mainModel.hearingActuals.actualHearingDays[0];
    day.pauseDateTimes = [
      {
        pauseStartTime: '2021-03-12T09:20:00.000Z',
        pauseEndTime: '2021-03-12T09:30:00.000Z',
      },
    ];
    const result = ActualHearingsUtils.getPauseDateTime(day, 'end');
    expect(result).toBe('2021-03-12T09:30:00.000Z');
  });

  it('should return null when pauseDateTimes is undefined', () => {
    const mainModel = _.cloneDeep(hearingActualsMainModel);
    const day = mainModel.hearingActuals.actualHearingDays[0];
    day.pauseDateTimes = null;
    const result = ActualHearingsUtils.getPauseDateTime(day, 'start');
    expect(result).toBeNull();
  });

  it('should return null when pauseDateTimes is an empty array', () => {
    const mainModel = _.cloneDeep(hearingActualsMainModel);
    const day = mainModel.hearingActuals.actualHearingDays[0];
    day.pauseDateTimes = [];
    const result = ActualHearingsUtils.getPauseDateTime(day, 'start');
    expect(result).toBeNull();
  });

  it('should format time with custom format', () => {
    const time = '2021-03-12T09:30:00.000Z';
    const result = ActualHearingsUtils.formatTime(time, 'h:mm A');
    expect(result).toBe('9:30 AM');
  });

  it('should format time with default format', () => {
    const time = '2021-03-12T09:30:00.000Z';
    const result = ActualHearingsUtils.formatTime(time);
    expect(result).toBe('09:30');
  });

  it('should handle invalid time input', () => {
    const time = 'invalidTime';
    const result = ActualHearingsUtils.formatTime(time);
    expect(result).toBe('Invalid date');
  });
});
