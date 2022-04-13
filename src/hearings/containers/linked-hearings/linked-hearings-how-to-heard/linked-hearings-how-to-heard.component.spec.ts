import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { of } from 'rxjs';
import { initialState } from '../../../hearing.test.data';
import { HMCStatus } from '../../../models/hearings.enum';
import { ServiceLinkedCasesModel } from '../../../models/linkHearings.model';
import { HearingsPipesModule } from '../../../pipes/hearings.pipes.module';
import { HearingsService } from '../../../services/hearings.service';
import { HowLinkedHearingsBeHeardComponent } from './linked-hearings-how-to-heard.component';

describe('HowLinkedHearingsBeHeardComponent', () => {
  let component: HowLinkedHearingsBeHeardComponent;
  let fixture: ComponentFixture<HowLinkedHearingsBeHeardComponent>;
  const mockedHttpClient = jasmine.createSpyObj('HttpClient', ['get', 'post']);
  const hearingsService = new HearingsService(mockedHttpClient);
  const mockStore = jasmine.createSpyObj('Store', ['pipe', 'dispatch']);

  const source: ServiceLinkedCasesModel[] = [
    {
      caseReference: '4652724902696213',
      caseName: 'Smith vs Peterson',
      reasonsForLink: [
        'Linked for a hearing'
      ],
      hearings: [{
        hearingId: 'h100001',
        hearingStage: HMCStatus.UPDATE_REQUESTED,
        isSelected: true,
        hearingStatus: HMCStatus.AWAITING_LISTING,
        hearingIsLinkedFlag: false
      }]
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
        isSelected: true,
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
      declarations: [HowLinkedHearingsBeHeardComponent],
      imports: [ReactiveFormsModule, RouterTestingModule,
        HearingsPipesModule],
      providers: [
        provideMockStore({initialState}),
        { provide: HearingsService, useValue: hearingsService },
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              data: {
                linkedCase: { serviceLinkedCases: source }
              },
              params: {
                caseId: '8254902572336147'
              }
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
    fixture = TestBed.createComponent(HowLinkedHearingsBeHeardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have validation errors mapped when nothing selected', () => {
    mockStore.pipe.and.returnValue(of(source));
    component.onSubmit();
    expect(component.validationErrors.length).toBe(1);
  });

  it('should able to submit when form particularOrder radio is selected', () => {
    const nativeElement = fixture.debugElement.nativeElement;
    const firstRadioButtonElement = nativeElement.querySelector('#particularOrder');
    firstRadioButtonElement.click();
    fixture.detectChanges();
    component.form.patchValue({hearingGroup: 'particularOrder'});
    component.onOrderChange(0);
    component.onOrderChange(1);
    expect(component.validationErrors.length).toBe(0);
  });

  it('should able to submit when form together radio is selected', () => {
    const nativeElement = fixture.debugElement.nativeElement;
    const firstRadioButtonElement = nativeElement.querySelector('#heardTogether');
    firstRadioButtonElement.click();
    fixture.detectChanges();
    expect(component.validationErrors.length).toBe(0);
  });

  afterEach(() => {
    fixture.destroy();
  });
});
