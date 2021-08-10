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
});
