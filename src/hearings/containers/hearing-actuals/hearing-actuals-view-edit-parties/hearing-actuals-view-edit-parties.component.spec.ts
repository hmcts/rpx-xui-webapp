import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {ComponentFixture, TestBed} from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import {ActivatedRoute} from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import {provideMockStore} from '@ngrx/store/testing';
import {initialState} from '../../../hearing.test.data';
import {LovRefDataService} from '../../../services/lov-ref-data.service';
import { HearingActualsViewEditPartiesComponent } from './hearing-actuals-view-edit-parties.component';

describe('HearingViewEditSummaryComponent', () => {
  let component: HearingActualsViewEditPartiesComponent;
  let fixture: ComponentFixture<HearingActualsViewEditPartiesComponent>;
  const mockedHttpClient = jasmine.createSpyObj('HttpClient', ['get', 'post']);
  const lovRefDataService = new LovRefDataService(mockedHttpClient);
  const hearingRole = [
    {
      key: 'appellant',
      value_en: 'Appellant',
      value_cy: '',
      hintText_EN: 'Appellant',
      hintTextCY: '',
      order: 1,
      parentKey: null,
    },
    {
      key: 'claimant',
      value_en: 'Claimant',
      value_cy: '',
      hintText_EN: 'Claimant',
      hintTextCY: '',
      order: 2,
      parentKey: null,
    },
    {
      key: 'interpreter',
      value_en: 'Interpreter',
      value_cy: '',
      hintText_EN: 'Interpreter',
      hintTextCY: '',
      order: 3,
      parentKey: null,
    },
    {
      key: 'solicitor',
      value_en: 'Solicitor',
      value_cy: '',
      hintText_EN: 'Solicitor',
      hintTextCY: '',
      order: 4,
      parentKey: null,
    },
    {
      key: 'barrister',
      value_en: 'Barrister',
      value_cy: '',
      hintText_EN: 'Barrister',
      hintTextCY: '',
      order: 5,
      parentKey: null,
    },
  ];
  const partyChannel = [
    {
      key: 'inPerson',
      value_en: 'In person',
      value_cy: '',
      hintText_EN: 'in person',
      hintTextCY: 'Wyneb yn wyneb',
      order: 1,
      parentKey: null,
    },
    {
      key: 'byPhone',
      value_en: 'By phone',
      value_cy: '',
      hintText_EN: 'By Phone',
      hintTextCY: 'Ffôn',
      order: 2,
      parentKey: null,
      child_nodes: [
        {
          key: 'telephone-btMeetMe',
          value_en: 'Telephone - BTMeetme',
          value_cy: '',
          hintText_EN: 'By Phone bTMeetme',
          hintTextCY: '',
          order: 1,
          parentKey: null,
        },
        {
          key: 'telephone-CVP',
          value_en: 'Telephone - CVP',
          value_cy: '',
          hintText_EN: 'By Phone CVP',
          hintTextCY: '',
          order: 2,
          parentKey: null,
        },
        {
          key: 'telephone-other',
          value_en: 'Telephone - Other',
          value_cy: '',
          hintText_EN: 'By Phone Other',
          hintTextCY: '',
          order: 3,
          parentKey: null,
        },
        {
          key: 'telephone-skype',
          value_en: 'Telephone - Skype',
          value_cy: '',
          hintText_EN: 'By Phone Skype',
          hintTextCY: '',
          order: 4,
          parentKey: null,
        },
      ],
    },
    {
      key: 'byVideo',
      value_en: 'By video',
      value_cy: 'Fideo',
      hintText_EN: 'By video',
      hintTextCY: '',
      order: 4,
      parentKey: null,
      child_nodes: [
        {
          key: 'video-conference',
          value_en: 'Video Conference',
          value_cy: '',
          hintText_EN: 'By video conference',
          hintTextCY: '',
          order: 4,
          parentKey: null,
        },
        {
          key: 'video-other',
          value_en: 'Video - Other',
          value_cy: '',
          hintText_EN: 'By video other',
          hintTextCY: '',
          order: 4,
          parentKey: null,
        },
        {
          key: 'video-skype',
          value_en: 'Video - Skype',
          value_cy: '',
          hintText_EN: 'By video skype',
          hintTextCY: '',
          order: 4,
          parentKey: null,
        },
        {
          key: 'video-teams',
          value_en: 'Video - Teams',
          value_cy: '',
          hintText_EN: 'By video teams',
          hintTextCY: '',
          order: 4,
          parentKey: null,
        },
      ],
    },
    {
      key: 'notAttending',
      value_en: 'Not attending',
      value_cy: '',
      hintText_EN: 'not attending',
      hintTextCY: '',
      order: 5,
      parentKey: null,
    },
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HearingActualsViewEditPartiesComponent],
      imports: [
        RouterTestingModule,
        ReactiveFormsModule
      ],
      providers: [
        provideMockStore({initialState}),
        {provide: LovRefDataService, useValue: lovRefDataService},
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              data: {
                partyChannel,
                hearingRole,
              },
            },
          },
        },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(HearingActualsViewEditPartiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('getRole should return the correct english role value', () => {
    expect(component.getRole('barrister')).toEqual('Barrister');
  });

  it('getRole should return the provided key if role not found', () => {
    expect(component.getRole('test')).toEqual('test');
  });

  afterEach(() => {
    fixture.destroy();
  });
});
