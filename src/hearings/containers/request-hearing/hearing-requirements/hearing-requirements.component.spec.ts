import { Component, CUSTOM_ELEMENTS_SCHEMA, Input } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ErrorMessage } from '@hmcts/ccd-case-ui-toolkit/dist/shared/domain';
import { provideMockStore } from '@ngrx/store/testing';
import * as _ from 'underscore';
import { ServiceHearingValuesModel } from '../../../../../api/hearings/models/serviceHearingValues.model';
import { HearingRequirementsComponent } from './hearing-requirements.component';
@Component({
  selector: 'exui-hearing-parties-title',
  template: '',
})
class MockHearingPartiesComponent {
  @Input() public error: ErrorMessage;
}

fdescribe('HearingRequirementsComponent', () => {
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

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      declarations: [ HearingRequirementsComponent, MockHearingPartiesComponent ],
      providers: [
        provideMockStore({initialState}),
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HearingRequirementsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    spyOn(component, 'convertMapToArray').and.callThrough();
    spyOn(component, 'assignHearingValue').and.callThrough();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set option collection', () => {
    expect(component).toBeDefined();
    expect(component.hearingValueModel).toEqual(hearingValueModel);
  });

  it('should call convertMapToArray during onint call', () => {
    expect(component).toBeDefined();
    const caseFlags = _.groupBy(component.hearingValueModel.caseFlags.flags, 'partyName');
    const caseFlagConverted = component.convertMapToArray(caseFlags);
    expect(caseFlagConverted.length).toBeGreaterThan(0);
  });

  it('should assign values to caseFlags once convertMapToArray is called', () => {
    component.assignHearingValue(hearingValueModel);
    expect(component.hearingValueModel).toEqual(hearingValueModel);
    expect(component.caseFlags.length).toEqual(2);
    expect(component.convertMapToArray).toHaveBeenCalled();
  });

  it('should call unsubscribe', () => {
    spyOn(component.hearingStoreSub, 'unsubscribe');
    fixture.detectChanges();
    component.ngOnDestroy();
    expect(component.hearingStoreSub.unsubscribe).toHaveBeenCalled();
  });

  afterEach(() => {
    fixture.destroy();
  });
});
