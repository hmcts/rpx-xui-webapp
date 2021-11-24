import { Component, Input, NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { ErrorMessage } from '../../../../app/models';
import { RefDataModel } from '../../../../hearings/models/refData.model';
import { DatePriorityHearingComponent } from './date-priority-hearing.component';

@Component({
  selector: 'exui-hearing-parties-title',
  template: '',
})
class MockHearingPartiesComponent {
  @Input() public error: ErrorMessage;
}

describe('DatePriorityHearingComponent', () => {
  let component: DatePriorityHearingComponent;
  let fixture: ComponentFixture<DatePriorityHearingComponent>;
  let router: Router;
  const priorities: RefDataModel[] = [
    {
      key: 'urgent',
      value_en: 'Urgent',
      value_cy: '',
      hintText_EN: 'Urgent',
      hintTextCY: '',
      order: 1,
      parentKey: null,
    }];

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, RouterTestingModule],
      declarations: [DatePriorityHearingComponent, MockHearingPartiesComponent],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              data: {
                hearingPriorities: priorities
              }
            },
          }
        },
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DatePriorityHearingComponent);
    component = fixture.componentInstance;
    router = TestBed.get(Router);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set checkedHearingAvailability', () => {
    const hearingAvailability = component.priorityForm.controls.hearingAvailability;
    component.showDateAvailability();
    expect(component.checkedHearingAvailability).toBe(null);
    hearingAvailability.setValue('yes');
    component.showDateAvailability();
    expect(component.checkedHearingAvailability).toBe('yes');
  });
});
