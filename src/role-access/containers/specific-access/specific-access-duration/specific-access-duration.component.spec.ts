import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { StoreModule } from '@ngrx/store';
import { SpecificAccessDurationComponent } from './specific-access-duration.component';
import { DurationHelperService } from '../../../services/duration-helper.service';
import { DurationType } from '../../../models/enums';
import createSpyObj = jasmine.createSpyObj;

describe('SpecificAccessDurationComponent', () => {
  let component: SpecificAccessDurationComponent;
  let fixture: ComponentFixture<SpecificAccessDurationComponent>;
  let durationHelperService: DurationHelperService;

  beforeEach(async(() => {
    durationHelperService = createSpyObj('durationHelperService', ['getInputClass']);
    TestBed.configureTestingModule({
      imports: [FormsModule, ReactiveFormsModule, StoreModule.forRoot({})],
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
      component.startDateErrorMessage = 'Start date error message';
      component.endDateErrorMessage = 'End date error message';
      component.isStartDateError = true;
      component.isEndDateError = true;

      component.resetPreviousErrors();
      expect(component.isStartDateError).toBe(false);
      expect(component.isEndDateError).toBe(false);
      expect(component.startDateErrorMessage).toBe('');
      expect(component.endDateErrorMessage).toBe('');
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

  describe('getInputClass', () => {

    it('should call durationHelperService getInputClass method', () => {
      component.getInputClass(false);
      expect(durationHelperService.getInputClass).toHaveBeenCalledWith(false, false);
    });

  });

  afterEach(() => {
    component = null;
    fixture.destroy();
  });

});
