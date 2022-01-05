import { Component, CUSTOM_ELEMENTS_SCHEMA, Input } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ErrorMessage } from '@hmcts/ccd-case-ui-toolkit/dist/shared/domain';
import { provideMockStore } from '@ngrx/store/testing';
import { of } from 'rxjs';
import { RefDataModel } from '../../../../../api/hearings/models/refData.model';
import { ACTION } from '../../../models/hearings.enum';
import { HearingsRefDataService } from '../../../services/hearings-ref-data.service';
import { HearingsService } from '../../../services/hearings.service';
import { ValidatorsUtils } from '../../../utils/validators.utils';
import { HearingAttendanceComponent } from './hearing-attendance.component';
@Component({
  selector: 'exui-hearing-parties-title',
  template: '',
})
class MockHearingPartiesComponent {
  @Input() public error: ErrorMessage;
}

describe('HearingAttendanceComponent', () => {
  let component: HearingAttendanceComponent;
  let fixture: ComponentFixture<HearingAttendanceComponent>;
  const mockedHttpClient = jasmine.createSpyObj('HttpClient', ['get', 'post']);
  const hearingsService = new HearingsService(mockedHttpClient);
  const hearingsRefDataService = new HearingsRefDataService(mockedHttpClient);
  hearingsService.navigateAction$ = of(ACTION.CONTINUE);

  const initialState = {
    hearings: {
      hearingList: {
        caseHearingMainModel: [
          {
            hmctsServiceID: 'SSCS'
          }
        ]
      },
      hearingValues: {
        serviceHearingValuesModel: {
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
                flagId: 'PF0015',
                flagDescription: 'Spanish interpreter required',
                flagStatus: 'ACTIVE'
              },
              {
                partyName: 'Jane and Smith',
                flagId: 'RA0042',
                flagDescription: 'Sign language interpreter required',
                flagStatus: 'ACTIVE'
              },
              {
                partyName: 'Jane and Smith',
                flagId: 'RA0001',
                flagDescription: 'Hearing loop required',
                flagStatus: 'ACTIVE'
              },
              {
                partyName: 'DWP',
                flagId: 'RA0005',
                flagDescription: 'Physical access and facilities',
                flagStatus: 'ACTIVE'
              }
            ],
            flagAmendURL: '/'
          },
          screenFlow: [
            {
              screenName: 'hearing-requirements',
              navigation: [
                {
                  resultValue: 'hearing-facilities'
                }
              ]
            },
            {
              screenName: 'hearing-facilities',
              navigation: [
                {
                  resultValue: 'hearing-stage'
                }
              ]
            },
            {
              screenName: 'hearing-stage',
              navigation: [
                {
                  resultValue: 'hearing-attendance'
                }
              ]
            },
            {
              screenName: 'hearing-attendance',
              navigation: [
                {
                  resultValue: 'hearing-venue'
                }
              ]
            },
            {
              screenName: 'hearing-venue',
              conditionKey: 'region',
              navigation: [
                {
                  conditionOperator: 'INCLUDE',
                  conditionValue: 'Wales',
                  resultValue: 'hearing-welsh'
                },
                {
                  conditionOperator: 'NOT INCLUDE',
                  conditionValue: 'Wales',
                  resultValue: 'hearing-judge'
                }
              ]
            },
            {
              screenName: 'hearing-welsh',
              navigation: [
                {
                  resultValue: 'hearing-judge'
                }
              ]
            },
            {
              screenName: 'hearing-judge',
              navigation: [
                {
                  resultValue: 'hearing-panel'
                }
              ]
            },
            {
              screenName: 'hearing-panel',
              navigation: [
                {
                  resultValue: 'hearing-timing'
                }
              ]
            },
            {
              screenName: 'hearing-timing',
              navigation: [
                {
                  resultValue: 'hearing-additional-instructions'
                }
              ]
            },
            {
              screenName: 'hearing-additional-instructions',
              navigation: [
                {
                  resultValue: 'hearing-check-answers'
                }
              ]
            }
          ],
          vocabulary: [
            {
              word1: ''
            }
          ]
        },
        lastError: null
      },
      hearingRequest: {
        hearingRequestMainModel: {
          requestDetails: {
            requestTimeStamp: null
          },
          hearingDetails: {
            duration: null,
            hearingType: null,
            hearingLocations: [],
            hearingIsLinkedFlag: false,
            hearingWindow: null,
            privateHearingRequiredFlag: false,
            panelRequirements: null,
            autolistFlag: false,
            nonStandardHearingDurationReasons: [],
            hearingPriorityType: null,
            numberOfPhysicalAttendees: null,
            hearingInWelshFlag: false,
            facilitiesRequired: [],
            listingComments: null,
            hearingRequester: null,
            leadJudgeContractType: null,
            totalParticipantAttendingHearing: 3
          },
          caseDetails: {
            hmctsServiceCode: null,
            caseRef: null,
            requestTimeStamp: null,
            hearingID: null,
            externalCaseReference: null,
            caseDeepLink: null,
            hmctsInternalCaseName: null,
            publicCaseName: null,
            caseAdditionalSecurityFlag: false,
            caseInterpreterRequiredFlag: false,
            caseCategories: [],
            caseManagementLocationCode: null,
            caserestrictedFlag: false,
            caseSLAStartDate: null
          },
          partyDetails: [
            {
              partyName: 'Jane and Smith',
              partyChannel: 'inperson'
            },
            {
              partyName: 'DWP',
              partyChannel: 'bymobile'
            }
          ]
        },
        lastError: null
      },
      hearingConditions: null,
    }
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      declarations: [HearingAttendanceComponent, MockHearingPartiesComponent],
      providers: [
        provideMockStore({ initialState }),
        { provide: HearingsService, useValue: hearingsService },
        { provide: HearingsRefDataService, useValue: hearingsRefDataService },
        ValidatorsUtils,
        FormBuilder
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();


    fixture = TestBed.createComponent(HearingAttendanceComponent);
    component = fixture.componentInstance;
    spyOn(component, 'initialiseFromHearingValues').and.callThrough();
    spyOn(component, 'prepareHearingRequestData').and.callThrough();
    spyOn(component, 'isFormValid').and.callThrough();
    fixture.detectChanges();
  });
  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should call prepareHearingRequestData when executeAction is called with a valid form', () => {
    component.attendanceFormGroup.controls.estimation.setValue(1);
    (component.attendanceFormGroup.controls.parties as FormArray).controls.forEach(element => {
      (element as FormGroup).value.partyChannel = {
        key: 'inperson',
        value_en: 'In person',
      } as RefDataModel;
    });
    component.executeAction(ACTION.CONTINUE);
    expect(component.prepareHearingRequestData).toHaveBeenCalled();
  });
  it('should true when calling isFormValid with partyChannel', () => {
    component.attendanceFormGroup.controls.estimation.setValue(1);
    (component.attendanceFormGroup.controls.parties as FormArray).controls.forEach(element => {
      (element as FormGroup).value.partyChannel = {
        key: 'inperson',
        value_en: 'In person',
      } as RefDataModel;
    });
    const formValid = component.isFormValid();
    expect((component.attendanceFormGroup.controls.parties as FormArray).length).toBeGreaterThan(0);
    expect(formValid).toEqual(true);
  });
  it('should false when calling isFormValid without partyChannel', () => {
    component.attendanceFormGroup.controls.estimation.setValue(1);
    (component.attendanceFormGroup.controls.parties as FormArray).controls.forEach(element => {
      (element as FormGroup).controls.partyChannel.setValue(undefined);
    });
    const formValid = component.isFormValid();
    expect((component.attendanceFormGroup.controls.parties as FormArray).length).toBeGreaterThan(0);
    expect(formValid).toEqual(false);
  });
  it('should render parties from the hearingvaluemodel', () => {
    const store = jasmine.createSpyObj('store', ['pipe', 'dispatch', 'select']);
    const noneNaviationInitialState = initialState;
    noneNaviationInitialState.hearings.hearingRequest.hearingRequestMainModel.partyDetails = [];
    store.select.and.returnValue(of(noneNaviationInitialState));
    component = fixture.componentInstance;
    fixture.detectChanges();
    component.initialiseFromHearingValues();
    expect(component.initialiseFromHearingValues).toHaveBeenCalled();
    expect((component.attendanceFormGroup.controls.parties as FormArray).length).toBeGreaterThan(0);
  });

  afterEach(() => {
    fixture.destroy();
  });
});
