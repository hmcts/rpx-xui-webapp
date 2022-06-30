import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { of } from 'rxjs';
import { initialState } from '../../../hearing.test.data';
import { HMCStatus, Mode } from '../../../models/hearings.enum';
import { ServiceLinkedCasesModel } from '../../../models/linkHearings.model';
import { HearingsPipesModule } from '../../../pipes/hearings.pipes.module';
import { HearingsService } from '../../../services/hearings.service';
import { HowLinkedHearingsBeHeardComponent } from './linked-hearings-how-to-heard.component';

const mockLinkedHearingGroup = {
  linkedHearingGroup: {
    groupDetails: {
      groupName: 'Group A',
      groupReason: 'Reason 1',
      groupLinkType: 'Ordered',
      groupComments: 'Comment 1',
    },
    hearingsInGroup: [
      { hearingId: 'h100001', hearingOrder: 2, caseRef: '4652724902696213' },
      { hearingId: 'h100003', hearingOrder: 1, caseRef: '8254902572336147' },
    ],
  },
  lastError: null,
};
const mockResponse: ServiceLinkedCasesModel[] = [
  {
    caseReference: '4652724902696213',
    caseName: 'Smith vs Peterson',
    reasonsForLink: ['Linked for a hearing'],
    hearings: [
      {
        hearingId: 'h100001',
        hearingStage: HMCStatus.UPDATE_REQUESTED,
        isSelected: true,
        hearingStatus: HMCStatus.AWAITING_LISTING,
        hearingIsInLinkedGroup: false,
      },
    ],
  },
  {
    caseReference: '5283819672542864',
    caseName: 'Smith vs Peterson',
    reasonsForLink: ['Linked for a hearing', 'Progressed as part of lead case'],
  },
  {
    caseReference: '8254902572336147',
    caseName: 'Smith vs Peterson',
    reasonsForLink: ['Familial', 'Guardian', 'Linked for a hearing'],
    hearings: [
      {
        hearingId: 'h100010',
        hearingStage: HMCStatus.UPDATE_REQUESTED,
        isSelected: true,
        hearingStatus: HMCStatus.AWAITING_LISTING,
        hearingIsInLinkedGroup: false,
      },
      {
        hearingId: 'h100012',
        hearingStage: HMCStatus.UPDATE_REQUESTED,
        isSelected: false,
        hearingStatus: HMCStatus.AWAITING_LISTING,
        hearingIsInLinkedGroup: false,
      },
    ],
  },
];

const hearingLinksMock = {
  ...mockLinkedHearingGroup,
  ...mockResponse
};

let component: HowLinkedHearingsBeHeardComponent;
let fixture: ComponentFixture<HowLinkedHearingsBeHeardComponent>;
const mockedHttpClient = jasmine.createSpyObj('HttpClient', ['get', 'post']);
const hearingsService = new HearingsService(mockedHttpClient);
const mockStore = jasmine.createSpyObj('Store', ['pipe', 'dispatch']);
const mockRouter = jasmine.createSpyObj('Router', ['navigate']);

describe('Linking - HowLinkedHearingsBeHeardComponent', () => {

  beforeEach(async(() => {
    ConfigureTestBedModule(hearingsService, mockRouter, Mode.LINK_HEARINGS);
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
    mockStore.pipe.and.returnValue(of(mockResponse));
    component.onSubmit();
    expect(component.validationErrors.length).toBe(1);
  });

  it('should able to submit when form particularOrder radio is selected', () => {
    const nativeElement = fixture.debugElement.nativeElement;
    const firstRadioButtonElement =
      nativeElement.querySelector('#particularOrder');
    firstRadioButtonElement.click();
    fixture.detectChanges();
    component.form.patchValue({ hearingGroup: 'particularOrder' });
    component.onOrderChange(0);
    component.onOrderChange(1);
    expect(component.validationErrors.length).toBe(0);
  });

  it('should able to submit when form together radio is selected', () => {
    const nativeElement = fixture.debugElement.nativeElement;
    const firstRadioButtonElement =
      nativeElement.querySelector('#heardTogether');
    firstRadioButtonElement.click();
    fixture.detectChanges();
    expect(component.validationErrors.length).toBe(0);
  });

  it('should navigate to previous page', () => {
    component.caseId = '8254902572336147';
    component.hearingId = 'h100010';
    component.onBack();
    expect(mockRouter.navigate).toHaveBeenCalledWith([
      '/',
      'hearings',
      'link',
      '8254902572336147',
      'h100010',
    ]);
  });

  afterEach(() => {
    fixture.destroy();
  });
});

describe('Manage Linking - HowLinkedHearingsBeHeardComponent', () => {
  beforeEach(async(() => {
    ConfigureTestBedModule(hearingsService, mockRouter, Mode.MANAGE_HEARINGS);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HowLinkedHearingsBeHeardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a same slot group preselected', () => {
    const nativeElement = fixture.debugElement.nativeElement;
    mockLinkedHearingGroup.linkedHearingGroup.groupDetails.groupLinkType = 'Same Slot';
    const firstRadioButtonElement = nativeElement.querySelector('input[name=hearingGroup]:checked');
    expect(firstRadioButtonElement).not.toBeNull();
    mockStore.pipe.and.returnValue(of(hearingLinksMock));
    component.onSubmit();
    expect(component.validationErrors.length).toBe(0);
  });

  it('should have a order group preselected', () => {
    const nativeElement = fixture.debugElement.nativeElement;
    mockLinkedHearingGroup.linkedHearingGroup.groupDetails.groupLinkType = 'Ordered';
    const firstRadioButtonElement = nativeElement.querySelector('input[name=hearingGroup]:checked');
    expect(firstRadioButtonElement).not.toBeNull();
    mockStore.pipe.and.returnValue(of(hearingLinksMock));
    component.onSubmit();
    expect(component.validationErrors.length).toBe(0);
  });

  afterEach(() => {
    fixture.destroy();
  });
});

function ConfigureTestBedModule(hearingMockService: HearingsService, mockRouterService: any, modeOfLinking: Mode) {
  TestBed.configureTestingModule({
    declarations: [HowLinkedHearingsBeHeardComponent],
    imports: [ReactiveFormsModule, RouterTestingModule, HearingsPipesModule],
    providers: [
      provideMockStore({ initialState }),
      { provide: HearingsService, useValue: hearingMockService },
      { provide: Router, useValue: mockRouterService },
      {
        provide: ActivatedRoute,
        useValue: {
          snapshot: {
            data: {
              mode: modeOfLinking
            },
            params: {
              caseId: '8254902572336147',
              hearingId: 'h100001'
            },
          },
          fragment: of('point-to-me'),
        },
      },
      FormBuilder,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
  }).compileComponents();
}

