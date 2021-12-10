import { Component, Input } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ErrorMessage } from '@hmcts/ccd-case-ui-toolkit/dist/shared/domain';
import { provideMockStore } from '@ngrx/store/testing';
import { ServiceHearingValuesModel } from '../../../../../api/hearings/models/serviceHearingValues.model';
import { HearingRequirementsComponent } from './hearing-requirements.component';
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

  const hearingValueModel: ServiceHearingValuesModel = {
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
        caseHearingMainModel: [
          {
            hmctsServiceID: 'TEST'
          }
        ]
      },
        hearingValues:  {
          serviceHearingValuesModel: hearingValueModel,
          lastError: null,
      },
    }
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [],
      declarations: [ HearingRequirementsComponent, MockHearingPartiesComponent ],
      providers: [
        provideMockStore({initialState}),
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HearingRequirementsComponent);
    component = fixture.componentInstance;
    spyOn(component, 'convertMapToArray').and.callThrough();
    spyOn(component, 'assignHearingValue').and.callThrough();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set option collection', async (done) => {
    expect(component).toBeDefined();
    done();
    expect(component.hearingValueModel).toEqual(hearingValueModel);
  });

  it('should call convertMapToArray during onint call', () => {
    component.ngOnInit();
    expect(component).toBeDefined();
    expect(component.convertMapToArray).toHaveBeenCalled();
  });

  it('should call caseFlags count to be 4', async (done) => {
    component.ngOnInit();
    done();
    expect(component.assignHearingValue).toHaveBeenCalled();
  });

  it('should assign values to caseFlags once convertMapToArray is called', () => {
    component.assignHearingValue(hearingValueModel);
    expect(component.caseFlags.length).toEqual(2);
  });

  it('should call unsubscribe', () => {
    component.ngOnInit();
    spyOn(component.hearingStoreSub, 'unsubscribe');
    fixture.detectChanges();
    component.ngOnDestroy();
    expect(component.hearingStoreSub.unsubscribe).toHaveBeenCalled();
  });
});
