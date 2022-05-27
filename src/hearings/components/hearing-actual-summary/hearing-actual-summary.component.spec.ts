import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { Store } from '@ngrx/store';
import { provideMockStore } from '@ngrx/store/testing';
import { of } from 'rxjs';
import { hearingActualsMainModel, initialState } from '../../hearing.test.data';
import { LovRefDataModel } from '../../models/lovRefData.model';
import { HearingActualSummaryComponent } from './hearing-actual-summary.component';

describe('HearingActualSummaryComponent', () => {
  let component: HearingActualSummaryComponent;
  let fixture: ComponentFixture<HearingActualSummaryComponent>;
  let router: Router;
  let mockStore: any;
  const partyChannels: LovRefDataModel[] = [
    {
      key: 'inPerson',
      value_en: 'In person',
      value_cy: '',
      hint_text_en: 'in person',
      hint_text_cy: 'Wyneb yn wyneb',
      lov_order: 1,
      parent_key: null,
      category_key: 'HearingChannel',
      parent_category: '',
      active_flag: 'Y',
      child_nodes: null,
    },
    {
      key: 'byPhone',
      value_en: 'By phone',
      value_cy: '',
      hint_text_en: 'By Phone',
      hint_text_cy: 'Ffôn',
      lov_order: 2,
      parent_key: null,
      category_key: 'HearingChannel',
      parent_category: '',
      active_flag: 'Y',
      child_nodes: [
        {
          key: 'telephone-btMeetMe',
          value_en: 'Telephone - BTMeetme',
          value_cy: '',
          hint_text_en: 'By Phone bTMeetme',
          hint_text_cy: '',
          lov_order: 1,
          parent_key: 'byPhone',
          category_key: 'HearingChannel',
          parent_category: 'byPhone',
          active_flag: 'Y',
          child_nodes: null,
        },
        {
          key: 'telephone-CVP',
          value_en: 'Telephone - CVP',
          value_cy: '',
          hint_text_en: 'By Phone CVP',
          hint_text_cy: '',
          lov_order: 2,
          parent_key: 'byPhone',
          category_key: 'HearingChannel',
          parent_category: 'byPhone',
          active_flag: 'Y',
          child_nodes: null,
        },
        {
          key: 'telephone-other',
          value_en: 'Telephone - Other',
          value_cy: '',
          hint_text_en: 'By Phone Other',
          hint_text_cy: '',
          lov_order: 3,
          parent_key: 'byPhone',
          category_key: 'HearingChannel',
          parent_category: 'byPhone',
          active_flag: 'Y',
          child_nodes: null,
        },
        {
          key: 'telephone-skype',
          value_en: 'Telephone - Skype',
          value_cy: '',
          hint_text_en: 'By Phone Skype',
          hint_text_cy: '',
          lov_order: 4,
          parent_key: 'byPhone',
          category_key: 'HearingChannel',
          parent_category: 'byPhone',
          active_flag: 'Y',
          child_nodes: null,
        },
      ],
    },
    {
      key: 'byVideo',
      value_en: 'By video',
      value_cy: 'Fideo',
      hint_text_en: 'By video',
      hint_text_cy: '',
      lov_order: 4,
      parent_key: null,
      category_key: 'HearingChannel',
      parent_category: '',
      active_flag: 'Y',
      child_nodes: [
        {
          key: 'video-conference',
          value_en: 'Video Conference',
          value_cy: '',
          hint_text_en: 'By video conference',
          hint_text_cy: '',
          lov_order: 4,
          parent_key: 'byVideo',
          category_key: 'HearingChannel',
          parent_category: 'byVideo',
          active_flag: 'Y',
          child_nodes: null,
        },
        {
          key: 'video-other',
          value_en: 'Video - Other',
          value_cy: '',
          hint_text_en: 'By video other',
          hint_text_cy: '',
          lov_order: 4,
          parent_key: 'byVideo',
          category_key: 'HearingChannel',
          parent_category: 'byVideo',
          active_flag: 'Y',
          child_nodes: null,
        },
        {
          key: 'video-skype',
          value_en: 'Video - Skype',
          value_cy: '',
          hint_text_en: 'By video skype',
          hint_text_cy: '',
          lov_order: 4,
          parent_key: 'byVideo',
          category_key: 'HearingChannel',
          parent_category: 'byVideo',
          active_flag: 'Y',
          child_nodes: null,
        },
        {
          key: 'video-teams',
          value_en: 'Video - Teams',
          value_cy: '',
          hint_text_en: 'By video teams',
          hint_text_cy: '',
          lov_order: 4,
          parent_key: 'byVideo',
          category_key: 'HearingChannel',
          parent_category: 'byVideo',
          active_flag: 'Y',
          child_nodes: null,
        },
      ],
    },
    {
      key: 'notAttending',
      value_en: 'Not attending',
      value_cy: '',
      hint_text_en: 'not attending',
      hint_text_cy: '',
      lov_order: 5,
      parent_key: null,
      category_key: 'HearingChannel',
      parent_category: '',
      active_flag: 'Y',
      child_nodes: null,
    },
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, RouterTestingModule,
        HttpClientTestingModule],
      declarations: [HearingActualSummaryComponent],
      providers: [
        provideMockStore({ initialState }),
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              data: {
                partyChannels
              }
            },
            fragment: of('point-to-me'),
          }
        },
      ],
      schemas: [NO_ERRORS_SCHEMA],
    })
      .compileComponents();
    mockStore = TestBed.get(Store);
    mockStore = jasmine.createSpyObj('Store', ['pipe', 'dispatch']);
    fixture = TestBed.createComponent(HearingActualSummaryComponent);
    component = fixture.componentInstance;
    component.hearingActualsMainModel = hearingActualsMainModel;
    router = TestBed.get(Router);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should check getChannelInfo', () => {
    expect(component.getChannelInfo('inPerson')).toEqual({ channel: 'In person', subChannel: '' });
    expect(component.getChannelInfo('video-teams')).toEqual({ channel: 'By video', subChannel: 'Video - Teams' });
  });

  afterEach(() => {
    fixture.destroy();
  });
});
