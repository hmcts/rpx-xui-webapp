import { Component, Input, NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { RefDataModel } from 'api/hearings/models/refData.model';
import { Observable } from 'rxjs';
import { ErrorMessage } from 'src/app/models';
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
  const PRIORITIES: RefDataModel[] = [
    {
      key: 'string',
      value_en: 'string',
      value_cy: 'string',
      hintText_EN: 'string',
      hintTextCY: 'string',
      order: 123,
      parentKey: 'string'
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
                priorities: PRIORITIES
              }
            },
            params: Observable.of({ priorities: PRIORITIES })
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
});
