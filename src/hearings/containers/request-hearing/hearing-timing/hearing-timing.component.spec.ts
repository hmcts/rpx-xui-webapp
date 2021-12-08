import {Component, CUSTOM_ELEMENTS_SCHEMA, Input} from '@angular/core';
import {ComponentFixture, TestBed} from '@angular/core/testing';
import {ReactiveFormsModule} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {RouterTestingModule} from '@angular/router/testing';
import {Store} from '@ngrx/store';
import {provideMockStore} from '@ngrx/store/testing';
import {of} from 'rxjs';
import {ErrorMessage} from '../../../../app/models';
import {ACTION} from '../../../models/hearings.enum';
import {PartyUnavailabilityRange} from '../../../models/partyUnavilabilityRange.model';
import {RefDataModel} from '../../../models/refData.model';
import {HearingsService} from '../../../services/hearings.service';
import {HearingTimingComponent} from './hearing-timing.component';

@Component({
  selector: 'exui-hearing-parties-title',
  template: '',
})
class MockHearingPartiesComponent {
  @Input() public error: ErrorMessage;
}

describe('HearingTimingComponent', () => {
  const mockedHttpClient = jasmine.createSpyObj('HttpClient', ['get', 'post']);
  const hearingsService = new HearingsService(mockedHttpClient);
  hearingsService.navigateAction$ = of(ACTION.CONTINUE);

  let component: HearingTimingComponent;
  let fixture: ComponentFixture<HearingTimingComponent>;
  let router: Router;
  let mockStore: any;
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

  const initialState = {
    hearings: {
      hearingList: {
        caseHearingMainModel: [
          {
            hmctsServiceID: 'SSCS'
          }
        ]
      },
      hearingValues: null,
      hearingRequest: null,
      hearingConditions: null,
    }
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, RouterTestingModule],
      declarations: [HearingTimingComponent, MockHearingPartiesComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [
        provideMockStore({initialState}),
        {provide: HearingsService, useValue: hearingsService},
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
      ],
    })
      .compileComponents();
  });

  beforeEach(() => {
    mockStore = TestBed.get(Store);
    mockStore = jasmine.createSpyObj('Store', ['pipe', 'dispatch']);
    fixture = TestBed.createComponent(HearingTimingComponent);
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

  it('should check unavailable dates list', () => {
    component.partiesNotAvailableDates = [];
    const unavailabilityDates: PartyUnavailabilityRange[] = [
      {
        start: '2021-12-10T09:00:00.000+0000',
        end: '2021-12-31T09:00:00.000+0000',
      },
      {
        start: '2021-12-10T09:00:00.000+0000',
        end: '2021-12-31T09:00:00.000+0000',
      },
    ];
    component.checkUnavailableDatesList(unavailabilityDates);
    expect(component.partiesNotAvailableDates[2]).toBe('14 December 2021');
    expect(component.partiesNotAvailableDates.length).toBe(16);
  });

  it('should set unavailable dates', () => {
    component.partiesNotAvailableDates = [];
    const unavailabilityDate: PartyUnavailabilityRange = {
      start: '2021-12-10T09:00:00.000+0000',
      end: '2021-12-11T09:00:00.000+0000',
    };
    component.checkUnavailableDatesList([unavailabilityDate]);
    expect(component.partiesNotAvailableDates[0]).toBe('10 December 2021');
  });

  afterEach(() => {
    fixture.destroy();
  });
});
