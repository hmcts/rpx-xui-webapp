import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { provideMockStore } from '@ngrx/store/testing/index';
import { RefDataModel } from '../../../models/refData.model';
import { HearingsRefDataService } from '../../../services/hearings-ref-data.service';
import { HearingStageComponent } from './hearing-stage.component';

fdescribe('HearingStageComponent', () => {
  let component: HearingStageComponent;
  let fixture: ComponentFixture<HearingStageComponent>;
  let hearingsRefDataService: any;
  const hearingsRefDataServiceMock = jasmine.createSpyObj('HearingsRefDataService', ['getRefData']);

  const source: RefDataModel[] = [
    {
      key: 'initial',
      value_en: 'Initial',
      value_cy: '',
      hintText_EN: 'Initial',
      hintTextCY: '',
      order: 1,
      parentKey: null,
    },
    {
      key: 'final',
      value_en: 'Final',
      value_cy: '',
      hintText_EN: 'Final',
      hintTextCY: '',
      order: 2,
      parentKey: null,
    },
    {
      key: 'substantial',
      value_en: 'Substantial',
      value_cy: '',
      hintText_EN: 'Substantial',
      hintTextCY: '',
      order: 3,
      parentKey: null,
    },
    {
      key: 'case-management',
      value_en: 'Case management',
      value_cy: '',
      hintText_EN: 'Case management',
      hintTextCY: '',
      order: 4,
      parentKey: null,
    },
  ];

  const initialState = {
    hearings: {
      hearingList: {
        caseHearingMainModel: [
          {
            hmctsServiceID: 'TEST'
          }
        ]
      },
        hearingValues:  {
          serviceHearingValuesModel: {
            autoListFlag: false,
            hearingType: 'Final',
            lastError: null,
          },
          lastError: null,
      },
    }
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HearingStageComponent ],
      providers: [
        provideMockStore({initialState}),
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              data: {
                hearingStages: hearingsRefDataServiceMock
              }
            },
          }
        },
        FormBuilder
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HearingStageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    expect(hearingsRefDataService.hearingStageOptions).toEqual(source);
  });

  // it('should be in the same order as service', () => {
  //   const radioLabels = fixture.debugElement.queryAll(By.css('.govuk-radios__item label'));
  //   expect(radioLabels.length).toBeGreaterThan(0);

  //   for (let index = 0; index < radioLabels.length; index++) {
  //     expect(radioLabels[index].nativeElement.innerText).toEqual(source[index].value_en);
  //   }
  // });
});
