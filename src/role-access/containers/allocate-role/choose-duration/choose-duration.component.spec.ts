import { async, ComponentFixture } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';

import { DurationOfRole } from '../../../../role-access/models';
import { ChooseDurationComponent } from './choose-duration.component';

describe('ChooseDurationComponent', () => {
  let component: ChooseDurationComponent;
  let mockStore: any;
  let formBuilder: FormBuilder;

  beforeEach(async(() => {
    mockStore = jasmine.createSpyObj('mockStore', ['pipe']);
    formBuilder = new FormBuilder();
  }));

  beforeEach(() => {
    component = new ChooseDurationComponent(mockStore, formBuilder);
  });

  it('should create component and initialise durations', () => {
    expect(component).toBeTruthy();
    expect(component.allDurations).not.toBeNull();
    expect(component.allDurations.length).toEqual(3);
    expect(component.allDurations[0].duration).toEqual(DurationOfRole.SEVEN_DAYS);
    expect(component.allDurations[0].description).toEqual(ChooseDurationComponent.sevenDaysDesc);

    expect(component.allDurations[1].duration).toEqual(DurationOfRole.INDEFINITE);
    expect(component.allDurations[1].description).toEqual(ChooseDurationComponent.indefiniteDesc);

    expect(component.allDurations[2].duration).toEqual(DurationOfRole.ANOTHER_PERIOD);
    expect(component.allDurations[2].description).toEqual(ChooseDurationComponent.anotherPeriodDesc);
  });

  it('getPeriod should return correct period for 7 days', () => {
    const period = component.getPeriod(DurationOfRole.SEVEN_DAYS);
    expect(period.startDate.getMonth()).toEqual(new Date().getMonth());
    expect(period.startDate.getFullYear()).toEqual(new Date().getFullYear());
    expect(period.startDate.getDate()).toEqual(new Date().getDate());

    expect(period.endDate).not.toBeNull();
    const nextDate = new Date().setDate(new Date().getDate() + 7);
    expect(period.endDate.getMonth()).toEqual(new Date(nextDate).getMonth());
    expect(period.endDate.getFullYear()).toEqual(new Date(nextDate).getFullYear());
    expect(period.endDate.getDate()).toEqual(new Date(nextDate).getDate());
  });

  it('getPeriod should return correct period for Indefinite', () => {
    const period = component.getPeriod(DurationOfRole.INDEFINITE);
    expect(period.startDate.getMonth()).toEqual(new Date().getMonth());
    expect(period.startDate.getFullYear()).toEqual(new Date().getFullYear());
    expect(period.startDate.getDate()).toEqual(new Date().getDate());

    expect(period.endDate).toBeNull();
  });

  it('startDateLessThanEndDate truthy', () => {
    component.yearStartDate.setValue(2021);
    component.monthStartDate.setValue(12);
    component.dayStartDate.setValue(7);

    component.yearEndDate.setValue(2021);
    component.monthEndDate.setValue(12);
    component.yearEndDate.setValue(2021);
    const result = component.startDateLessThanEndDate();
    expect(result).toBeTruthy();
  });

  it('startDateLessThanEndDate falsy', () => {
    component.yearStartDate.setValue(2021);
    component.monthStartDate.setValue(12);
    component.dayStartDate.setValue(7);

    component.yearEndDate.setValue(2021);
    component.monthEndDate.setValue(12);
    component.dayEndDate.setValue(6);
    const result = component.startDateLessThanEndDate();
    expect(result).toBeFalsy();
  });

  it('getStartDate', () => {
    component.yearStartDate.setValue(2021);
    component.monthStartDate.setValue(12);
    component.dayStartDate.setValue(7);
    const startDate = component.getStartDate();
    expect(startDate).toEqual(new Date(2021, 11, 7, 0, 0, 0, 0));
  });

  it('getEndDate', () => {
    component.yearEndDate.setValue(2021);
    component.monthEndDate.setValue(12);
    component.dayEndDate.setValue(6);
    const endDate = component.getEndDate();
    expect(endDate).toEqual(new Date(2021, 11, 6, 0, 0, 0, 0));
  });

  it('getTodayDate', () => {
    const currentDate = component.getTodayDate();
    expect(currentDate.getFullYear()).toEqual(new Date().getFullYear());
    expect(currentDate.getDate()).toEqual(new Date().getDate());
    expect(currentDate.getMonth()).toEqual(new Date().getMonth());
  });

  it('invalid StartDate', () => {
    component.yearStartDate.setValue(2021);
    component.monthStartDate.setValue(2);
    component.dayStartDate.setValue(30);

    component.yearEndDate.setValue(2020);
    component.monthEndDate.setValue(2);
    component.dayEndDate.setValue(29);
    const startDateValid = component.isDateValid();
    expect(component.startDateErrorMessage).toEqual('Invalid Start date');
    expect(startDateValid).toBeFalsy();
  });

  it('valid date', () => {
    component.yearStartDate.setValue(2020);
    component.monthStartDate.setValue(2);
    component.dayStartDate.setValue(29);

    component.yearEndDate.setValue(2020);
    component.monthEndDate.setValue(2);
    component.dayEndDate.setValue(29);
    const startDateValid = component.isDateValid();
    expect(startDateValid).toBeTruthy();
  });

  it('valid date', () => {
    component.yearStartDate.setValue(2020);
    component.monthStartDate.setValue(1);
    component.dayStartDate.setValue(10);

    component.yearEndDate.setValue(2020);
    component.monthEndDate.setValue(1);
    component.dayEndDate.setValue(10);
    const startDateValid = component.isDateValid();
    expect(startDateValid).toBeTruthy();
  });

  it('valid date', () => {
    component.yearStartDate.setValue(2020);
    component.monthStartDate.setValue(10);
    component.dayStartDate.setValue(29);

    component.yearEndDate.setValue(2020);
    component.monthEndDate.setValue(10);
    component.dayEndDate.setValue(29);
    const startDateValid = component.isDateValid();
    expect(startDateValid).toBeTruthy();
  });

  it('valid date', () => {
    component.yearStartDate.setValue(2020);
    component.monthStartDate.setValue(11);
    component.dayStartDate.setValue(29);

    component.yearEndDate.setValue(2020);
    component.monthEndDate.setValue(11);
    component.dayEndDate.setValue(29);
    const startDateValid = component.isDateValid();
    expect(startDateValid).toBeTruthy();
  });

  it('isStartDateValid to be falsy', () => {
    component.yearStartDate.setValue(2020);
    component.monthStartDate.setValue(12);
    component.dayStartDate.setValue(32);

    component.yearEndDate.setValue(2020);
    component.monthEndDate.setValue(2);
    component.dayEndDate.setValue(29);
    const startDateValid = component.isDateValid();
    expect(startDateValid).toBeFalsy();
  });
  it('isEndDateValid to be false', () => {
    component.yearStartDate.setValue(2020);
    component.monthStartDate.setValue(2);
    component.dayStartDate.setValue(29);

    component.yearEndDate.setValue(2020);
    component.monthEndDate.setValue(2);
    component.dayEndDate.setValue(30);
    const startDateValid = component.isDateValid();
    expect(startDateValid).toBeFalsy();
  });
  it('isEndDateValid to be false', () => {
    component.yearStartDate.setValue(2020);
    component.monthStartDate.setValue(2);
    component.dayStartDate.setValue(29);

    component.yearEndDate.setValue(2022);
    component.monthEndDate.setValue(12);
    component.dayEndDate.setValue(32);
    const startDateValid = component.isDateValid();
    expect(startDateValid).toBeFalsy();
  });
  it('isEndDateValid to be true', () => {
    component.yearStartDate.setValue(2020);
    component.monthStartDate.setValue(2);
    component.dayStartDate.setValue(29);

    component.yearEndDate.setValue(2020);
    component.monthEndDate.setValue(2);
    component.dayEndDate.setValue(29);
    const startDateValid = component.isDateValid();
    expect(startDateValid).toBeTruthy();
  });
  it('isStartDateValid to be falsy with invalid month', () => {
    component.yearStartDate.setValue(2020);
    component.monthStartDate.setValue(13);
    component.dayStartDate.setValue(10);

    component.yearEndDate.setValue(2020);
    component.monthEndDate.setValue(2);
    component.dayEndDate.setValue(29);
    const startDateValid = component.isDateValid();
    expect(startDateValid).toBeFalsy();
  });
  it('isEndDateValid to be falsy with invalid month', () => {
    component.yearStartDate.setValue(2020);
    component.monthStartDate.setValue(1);
    component.dayStartDate.setValue(10);

    component.yearEndDate.setValue(2020);
    component.monthEndDate.setValue(13);
    component.dayEndDate.setValue(29);
    const startDateValid = component.isDateValid();
    expect(startDateValid).toBeFalsy();
  });
  it('isStartDateValid to be falsy with invalid year', () => {
    component.yearStartDate.setValue(20201);
    component.monthStartDate.setValue(12);
    component.dayStartDate.setValue(10);

    component.yearEndDate.setValue(2020);
    component.monthEndDate.setValue(2);
    component.dayEndDate.setValue(10);
    const startDateValid = component.isDateValid();
    expect(startDateValid).toBeFalsy();
  });
  it('isEndDateValid to be falsy with invalid year', () => {
    component.yearStartDate.setValue(2020);
    component.monthStartDate.setValue(1);
    component.dayStartDate.setValue(10);

    component.yearEndDate.setValue(20201);
    component.monthEndDate.setValue(12);
    component.dayEndDate.setValue(10);
    const startDateValid = component.isDateValid();
    expect(startDateValid).toBeFalsy();
  });
  it('isDateValid to be falsy with invalid start and end date', () => {
    component.yearStartDate.setValue(2020);
    component.monthStartDate.setValue(13);
    component.dayStartDate.setValue(10);

    component.yearEndDate.setValue(20201);
    component.monthEndDate.setValue(13);
    component.dayEndDate.setValue(10);
    const startDateValid = component.isDateValid();
    expect(startDateValid).toBeFalsy();
  });

});
