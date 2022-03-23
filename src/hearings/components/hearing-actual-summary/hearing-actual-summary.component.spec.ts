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
      key: 'Fax',
      value_en: 'Fax',
      value_cy: '',
      hintText_EN: 'Fax',
      hintTextCY: '',
      order: 1,
      parentKey: null,
    }, {
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
          parentKey: 'byVideo'
        },
      ]
    }];

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
    expect(component.getChannelInfo('Fax')).toEqual({ channel: 'Fax', subChannel: '' });
    expect(component.getChannelInfo('video-conference')).toEqual({ channel: 'By video', subChannel: 'Video Conference' });
  });

  afterEach(() => {
    fixture.destroy();
  });
});
