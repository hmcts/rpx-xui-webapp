import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { Store } from '@ngrx/store';
import { provideMockStore } from '@ngrx/store/testing';
import { initialState } from '../../../hearing.test.data';
import { HearingsService } from '../../../services/hearings.service';
import { ValidatorsUtils } from '../../../utils/validators.utils';

import { HearingActualsTimingComponent } from './hearing-actuals-timing.component';

describe('HearingTimingComponent', () => {
  const hearingsService = jasmine.createSpyObj('HearingsService', ['updateHearingActuals']);
  let store: Store<any>;
  let component: HearingActualsTimingComponent;
  let fixture: ComponentFixture<HearingActualsTimingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, RouterTestingModule, HttpClientTestingModule],
      providers: [
        provideMockStore({ initialState }),
        { provide: HearingsService, useValue: hearingsService },
        ValidatorsUtils
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      declarations: [HearingActualsTimingComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HearingActualsTimingComponent);
    store = TestBed.get(Store);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create form ', () => {
    expect(component.form.value.hearingStartTime).toBe('09:00');
    expect(component.form.value.hearingEndTime).toBe('10:00');
  });

  it('should submit form ', () => {
    spyOn(store, 'dispatch');
    component.form.patchValue({
      hearingStartTime: '09:00',
      hearingEndTime: '10:00',
      recordTimes: 'no'
    });
    component.submit(component.form.value, component.form.valid);
    expect(store.dispatch).toHaveBeenCalled();
  });
});
