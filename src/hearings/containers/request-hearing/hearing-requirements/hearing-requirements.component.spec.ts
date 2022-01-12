import {Component, CUSTOM_ELEMENTS_SCHEMA, Input} from '@angular/core';
import {ComponentFixture, TestBed} from '@angular/core/testing';
import {ActivatedRoute} from '@angular/router';
import {ErrorMessage} from '@hmcts/ccd-case-ui-toolkit/dist/shared/domain';
import {provideMockStore} from '@ngrx/store/testing';
import {of} from 'rxjs';
import {ACTION} from '../../../models/hearings.enum';
import {ServiceHearingValuesModel} from '../../../models/serviceHearingValues.model';
import {HearingsService} from '../../../services/hearings.service';
import {HearingRequirementsComponent} from './hearing-requirements.component';

@Component({
  selector: 'exui-hearing-parties-title',
  template: '',
})
class MockHearingPartiesComponent {
  @Input() public error: ErrorMessage;
}

describe('HearingRequirementsComponent', () => {
  let component: HearingRequirementsComponent;
  let fixture: ComponentFixture<HearingRequirementsComponent>;
  const mockedHttpClient = jasmine.createSpyObj('HttpClient', ['get', 'post']);
  const hearingsService = new HearingsService(mockedHttpClient);
  hearingsService.navigateAction$ = of(ACTION.CONTINUE);

  const serviceHearingValuesModel: ServiceHearingValuesModel = {
    autoListFlag: false,
    hearingType: 'Final',
    caseType: 'Personal Independence Payment',
    caseSubTypes: [
      'Conditions of Entitlement',
      'Good cause',
      'Rate of Assessment / Payability Issues - complex'
    ],
    hearingWindow: {
      range: {
        start: '2021-11-23T09:00:00.000+0000',
        end: '2021-11-30T09:00:00.000+0000'
      },
      firstDateTimeMustBe: ''
    },
    duration: 45,
    hearingPriorityType: 'Standard',
    numberOfPhysicalAttendees: 2,
    hearingInWelshFlag: false,
    hearingLocations: [
      '196538'
    ],
    facilitiesRequired: [],
    listingComments: '',
    hearingRequester: '',
    privateHearingRequiredFlag: false,
    leadJudgeContractType: '',
    judiciary: {
      roleType: [
        ''
      ],
      authorisationTypes: [
        ''
      ],
      authorisationSubType: [
        ''
      ],
      panelComposition: [
        {
          memberType: '',
          count: 1
        }
      ],
      judiciaryPreferences: [
        {
          memberID: '',
          memberType: '',
          requirementType: 'EXCLUDE'
        }
      ],
      judiciarySpecialisms: [
        ''
      ]
    },
    hearingIsLinkedFlag: false,
    parties: [
      {
        partyName: 'Jane and Smith',
        partyChannel: '',
        unavailability: [
          {
            start: '2021-12-10T09:00:00.000+0000',
            end: '2021-12-31T09:00:00.000+0000'
          }
        ]
      },
      {
        partyName: 'DWP',
        partyChannel: '',
        unavailability: [
          {
            start: '2021-12-20T09:00:00.000+0000',
            end: '2021-12-31T09:00:00.000+0000'
          }
        ]
      }
    ],
    caseFlags: {
      flags: [
        {
          partyName: 'Jane and Smith',
          flagId: 'Language Interpreter',
          flagDescription: 'Spanish interpreter required',
          flagStatus: 'ACTIVE'
        },
        {
          partyName: 'Jane and Smith',
          flagId: 'Sign language interpreter',
          flagDescription: 'Sign language interpreter required',
          flagStatus: 'ACTIVE'
        },
        {
          partyName: 'Jane and Smith',
          flagId: 'Reasonable adjustment',
          flagDescription: 'Hearing loop required',
          flagStatus: 'ACTIVE'
        },
        {
          partyName: 'DWP',
          flagId: 'case flag 1',
          flagDescription: 'case flag 1 description',
          flagStatus: 'ACTIVE'
        }
      ],
      flagAmendURL: '/'
    },
  } as ServiceHearingValuesModel;

  const initialState = {
    hearings: {
      hearingList: {
        hearingListMainModel: [
          {
            hmctsServiceID: 'SSCS'
          }
        ]
      },
      hearingValues: {
        serviceHearingValuesModel,
        lastError: null,
      },
      hearingRequest: null,
      hearingConditions: null,
    }
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HearingRequirementsComponent, MockHearingPartiesComponent],
      providers: [
        provideMockStore({initialState}),
        {provide: HearingsService, useValue: hearingsService},
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              data: {
                caseFlags: null,
              },
            },
          },
        }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
      .compileComponents();
    fixture = TestBed.createComponent(HearingRequirementsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set option collection', () => {
    expect(component).toBeDefined();
    expect(component.serviceHearingValuesModel).toEqual(serviceHearingValuesModel);
  });

  it('should call unsubscribe', () => {
    spyOn(component.hearingStateSub, 'unsubscribe');
    component.ngOnDestroy();
    expect(component.hearingStateSub.unsubscribe).toHaveBeenCalled();
  });

  afterEach(() => {
    fixture.destroy();
  });
});
