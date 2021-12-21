import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { of } from 'rxjs';
import { RefDataModel } from '../../../../hearings/models/refData.model';
import { ACTION } from '../../../models/hearings.enum';
import { HearingsService } from '../../../services/hearings.service';
import { HearingJudgeComponent } from './hearing-judge.component';

describe('HearingJudgeComponent', () => {
  let component: HearingJudgeComponent;
  let fixture: ComponentFixture<HearingJudgeComponent>;
  const mockedHttpClient = jasmine.createSpyObj('HttpClient', ['get', 'post']);
  const hearingsService = new HearingsService(mockedHttpClient);
  hearingsService.navigateAction$ = of(ACTION.CONTINUE);
  const judgeTypes: RefDataModel[] = [
    {
      key: 'tribunalJudge',
      value_en: 'Tribunal Judge',
      value_cy: '',
      hintText_EN: 'Tribunal',
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
      imports: [ReactiveFormsModule, RouterTestingModule, HttpClientTestingModule],
      declarations: [HearingJudgeComponent],
      providers: [
        provideMockStore({ initialState }),
        { provide: HearingsService, useValue: hearingsService },
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              data: {
                hearingJudgeTypes: judgeTypes
              }
            },
          }
        },
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(HearingJudgeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  afterEach(() => {
    fixture.destroy();
  });
});
