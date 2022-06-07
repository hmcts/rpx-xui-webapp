import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormArray, FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { Store } from '@ngrx/store';
import { provideMockStore } from '@ngrx/store/testing';
import { of } from 'rxjs';
import { initialState } from '../../../hearing.test.data';
import { ACTION, HearingLinkedSelectionEnum, HMCStatus } from '../../../models/hearings.enum';
import { ServiceLinkedCasesModel } from '../../../models/linkHearings.model';
import { HearingsPipesModule } from '../../../pipes/hearings.pipes.module';
import { HearingsService } from '../../../services/hearings.service';
import { LinkedHearingsWithCaseComponent } from './linked-hearings-with-case.component';

describe('LinkedHearingsWithCaseComponent', () => {
  let component: LinkedHearingsWithCaseComponent;
  let fixture: ComponentFixture<LinkedHearingsWithCaseComponent>;
  let store: any;
  const mockedHttpClient = jasmine.createSpyObj('HttpClient', ['get', 'post']);
  const hearingsService = new HearingsService(mockedHttpClient);
  hearingsService.navigateAction$ = of(ACTION.CONTINUE);
  const mockStore = jasmine.createSpyObj('Store', ['pipe', 'dispatch']);

  const source: ServiceLinkedCasesModel[] = [
    {
      caseReference: '4652724902696213',
      caseName: 'Smith vs Peterson',
      reasonsForLink: [
        'Linked for a hearing'
      ]
    },
    {
      caseReference: '5283819672542864',
      caseName: 'Smith vs Peterson',
      reasonsForLink: [
        'Linked for a hearing',
        'Progressed as part of lead case'
      ]
    },
    {
      caseReference: '8254902572336147',
      caseName: 'Smith vs Peterson',
      reasonsForLink: [
        'Familial',
        'Guardian',
        'Linked for a hearing'
      ],
      hearings: [{
        hearingId: 'h100010',
        hearingStage: HMCStatus.UPDATE_REQUESTED,
        isSelected: false,
        hearingStatus: HMCStatus.AWAITING_LISTING,
        hearingIsLinkedFlag: false
      }, {
        hearingId: 'h100012',
        hearingStage: HMCStatus.UPDATE_REQUESTED,
        isSelected: false,
        hearingStatus: HMCStatus.AWAITING_LISTING,
        hearingIsLinkedFlag: false
      }]
    }
  ];
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LinkedHearingsWithCaseComponent],
      imports: [ReactiveFormsModule, RouterTestingModule,
        HearingsPipesModule,
        RouterModule,
        RouterTestingModule.withRoutes([])],
      providers: [
        provideMockStore({ initialState }),
        { provide: HearingsService, useValue: hearingsService },
        {
          provide: ActivatedRoute,
          useValue: {
            queryParams: of(),
            snapshot: {
              data: {
                linkedCase: { serviceLinkedCases: source }
              },
              params: {caseId: '4652724902696211', hearingId: 'h000001'},
            },
            fragment: of('point-to-me'),
          }
        },
        FormBuilder
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LinkedHearingsWithCaseComponent);
    store = TestBed.get(Store);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should check on submit', () => {
    (component.linkHearingForm.get('hearings') as FormArray).push(component.addHearingFormGroup('8254902572336147'));
    (component.linkHearingForm.get('hearings') as FormArray).patchValue([
      { caseReference: '8254902572336147', hearingReference: 'h100010' }
    ]);
    component.linkedCases = source;
    component.onSubmit();
    expect(component.linkHearingForm.valid).toBeTruthy();
    expect(component.linkedCases[2].hearings[0].isSelected).toBe(true);
  });

  it('should check on submit error', () => {
    component.onSubmit();
    expect(component.linkHearingForm.valid).toBeFalsy();
    expect(component.linkedHearingSelectionError).toBe(HearingLinkedSelectionEnum.ValidSelectionError);
  });

  afterEach(() => {
    fixture.destroy();
  });
});
