import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { StoreModule } from '@ngrx/store';
import { ExuiCommonLibModule } from '@hmcts/rpx-xui-common-lib';
import { SpecificAccessDurationComponent } from './specific-access-duration.component';
import { DurationType } from '../../../models/enums';
import { DurationHelperService } from '../../../services';

import createSpyObj = jasmine.createSpyObj;

describe('SpecificAccessDurationComponent', () => {
  let component: SpecificAccessDurationComponent;
  let fixture: ComponentFixture<SpecificAccessDurationComponent>;
  let durationHelperService: DurationHelperService;

  beforeEach(async(() => {
    durationHelperService = createSpyObj('durationHelperService', ['getInputClass']);
    TestBed.configureTestingModule({
      imports: [
        ExuiCommonLibModule,
        FormsModule,
        ReactiveFormsModule,
        StoreModule.forRoot({})
      ],
      declarations: [SpecificAccessDurationComponent],
      providers: [
        FormBuilder,
        { provide: DurationHelperService, useValue: durationHelperService }
      ]
    });
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpecificAccessDurationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('resetPreviousErrors', () => {

    it('should reset the component properties as expected', () => {
      component.startDateErrorMessage = { isInvalid: true, messages: ['Start date error message'] };
      component.endDateErrorMessage = { isInvalid: true, messages: ['End date error message'] };
      component.resetPreviousErrors();
      expect(component.startDateErrorMessage).toEqual({ isInvalid: false, messages: [] });
      expect(component.endDateErrorMessage).toEqual({ isInvalid: false, messages: [] });
    });

  });

  describe('onDurationChange', () => {

    it('should set component properties as expected for duration: 7 Days', () => {
      const duration = DurationType.SEVEN_DAYS;
      component.onDurationChange(duration);
      expect(component.selectedDuration).toEqual(duration);
      expect(component.anotherPeriod).toEqual(false);
    });

    it('should set component properties as expected for duration: Indefinite', () => {
      const duration = DurationType.INDEFINITE;
      component.onDurationChange(duration);
      expect(component.selectedDuration).toEqual(duration);
      expect(component.anotherPeriod).toEqual(false);
    });

    it('should set component properties as expected for duration: Another Period', () => {
      const duration = DurationType.ANOTHER_PERIOD;
      component.onDurationChange(duration);
      expect(component.selectedDuration).toEqual(duration);
      expect(component.anotherPeriod).toEqual(true);
    });

  });

  afterEach(() => {
    component = null;
    fixture.destroy();
  });

});
