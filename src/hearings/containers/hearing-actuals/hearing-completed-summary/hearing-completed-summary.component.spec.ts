import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Component, Input, NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { Store } from '@ngrx/store';
import { provideMockStore } from '@ngrx/store/testing';
import { of } from 'rxjs';
import { ErrorMessage } from '../../../../app/models';
import { initialState } from '../../../hearing.test.data';
import { ACTION } from '../../../models/hearings.enum';
import { LovRefDataModel } from '../../../models/lovRefData.model';
import { HearingsService } from '../../../services/hearings.service';
import { ValidatorsUtils } from '../../../utils/validators.utils';
import { HearingCompletedSummaryComponent } from './hearing-completed-summary.component';

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

  let component: HearingCompletedSummaryComponent;
  let fixture: ComponentFixture<HearingCompletedSummaryComponent>;
  let router: Router;
  let mockStore: any;
  const partyChannels: LovRefDataModel[] = [
    {
      key: 'inPhone',
      value_en: 'Phone',
      value_cy: '',
      hintText_EN: 'Phone',
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
      declarations: [HearingCompletedSummaryComponent, MockHearingPartiesComponent],
      providers: [
        provideMockStore({ initialState }),
        { provide: HearingsService, useValue: hearingsService },
        ValidatorsUtils,
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
    fixture = TestBed.createComponent(HearingCompletedSummaryComponent);
    component = fixture.componentInstance;
    router = TestBed.get(Router);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should check getChannelInfo', () => {
    expect(component.getChannelInfo('inPhone')).toEqual({ channel: 'Phone', subChannel: '' });
    expect(component.getChannelInfo('video-conference')).toEqual({ channel: 'By video', subChannel: 'Video Conference' });
  });

  afterEach(() => {
    fixture.destroy();
  });
});
