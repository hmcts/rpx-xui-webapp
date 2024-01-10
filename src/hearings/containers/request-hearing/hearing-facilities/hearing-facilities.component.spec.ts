import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { provideMockStore } from '@ngrx/store/testing';
import { of } from 'rxjs';
import { caseFlagsRefData, initialState } from '../../../hearing.test.data';
import { ACTION } from '../../../models/hearings.enum';
import { PartyFlagsModel } from '../../../models/partyFlags.model';
import { HearingsService } from '../../../services/hearings.service';
import { HearingFacilitiesComponent } from './hearing-facilities.component';

describe('HearingFacilitiesComponent', () => {
  let component: HearingFacilitiesComponent;
  let fixture: ComponentFixture<HearingFacilitiesComponent>;
  const mockedHttpClient = jasmine.createSpyObj('HttpClient', ['get', 'post']);
  const hearingsService = new HearingsService(mockedHttpClient);
  hearingsService.navigateAction$ = of(ACTION.CONTINUE);
  const ADDITIONAL_FACILITIES_OPTIONS = [
    {
      key: 'immigrationDetentionCentre',
      value_en: 'immigration detention centre',
      value_cy: '',
      hintText_EN: 'Immigration detention centre',
      hintTextCY: '',
      order: 1,
      parentKey: null
    },
    {
      key: 'inCameraCourt',
      value_en: 'in camera court',
      value_cy: '',
      hintText_EN: 'In camera court',
      hintTextCY: '',
      order: 2,
      parentKey: null
    },
    {
      key: 'sameSexCourtroom',
      value_en: 'same sex courtroom',
      value_cy: '',
      hintText_EN: 'Same sex courtroom',
      hintTextCY: '',
      order: 3,
      parentKey: null
    },
    {
      key: 'secureDock',
      value_en: 'secure dock',
      value_cy: '',
      hintText_EN: 'Secure Dock',
      hintTextCY: '',
      order: 4,
      parentKey: null
    },
    {
      key: 'witnessScreen',
      value_en: 'witness screen',
      value_cy: '',
      hintText_EN: 'Witness Screen',
      hintTextCY: '',
      order: 4,
      parentKey: null
    },
    {
      key: 'witnessRoom',
      value_en: 'witness room',
      value_cy: '',
      hintText_EN: 'Witness Room',
      hintTextCY: '',
      order: 5,
      parentKey: null
    },
    {
      key: 'videoConferencing',
      value_en: 'video conferencing',
      value_cy: '',
      hintText_EN: 'Video Conferencing',
      hintTextCY: '',
      order: 5,
      parentKey: null
    },
    {
      key: 'VideoFacility',
      value_en: 'videoFacility',
      value_cy: '',
      hintText_EN: 'Video Facility',
      hintTextCY: '',
      order: 5,
      parentKey: null
    },
    {
      key: 'prisonVideoLink',
      value_en: 'prison video link',
      value_cy: '',
      hintText_EN: 'Prison Video Link',
      hintTextCY: '',
      order: 5,
      parentKey: null
    }
  ];

  const caseFlagsFromLatestSHV: PartyFlagsModel[] = [
    {
      partyId: 'P1',
      partyName: 'Jane Smith',
      flagParentId: 'RA0008',
      flagId: 'RA0042',
      flagDescription: 'Sign language interpreter required',
      flagStatus: 'ACTIVE'
    },
    {
      partyId: 'P2',
      partyName: 'Jane Smith vs DWP',
      flagParentId: 'CF0001',
      flagId: 'CF0006',
      flagDescription: 'Potential fraud',
      flagStatus: 'ACTIVE'
    },
    {
      partyId: 'P3',
      partyName: 'Jane Smith vs DWP',
      flagParentId: 'CF0001',
      flagId: 'CF0007',
      flagDescription: 'Urgent flag',
      flagStatus: 'ACTIVE'
    }
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      declarations: [HearingFacilitiesComponent],
      providers: [
        provideMockStore({ initialState }),
        { provide: HearingsService, useValue: hearingsService },
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              data: {
                caseFlags: caseFlagsRefData,
                additionFacilitiesOptions: ADDITIONAL_FACILITIES_OPTIONS
              }
            },
            fragment: of('point-to-me')
          }
        }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(HearingFacilitiesComponent);
    component = fixture.componentInstance;
    spyOn(component, 'prepareHearingRequestData').and.callThrough();
    spyOn(component, 'isFormValid').and.callThrough();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    expect(component.hearingFactilitiesForm).toBeTruthy();
  });

  it('should call getHearingFacilitiesFormArray method', () => {
    expect(component.getHearingFacilitiesFormArray).toBeTruthy();
  });

  it('should call prepareHearingRequestData when executeAction is called with a valid form', () => {
    component.hearingFactilitiesForm.controls['addition-security-required'].setValue('Yes');
    component.hearingFactilitiesForm.controls['addition-security-required'].markAsPristine();
    component.executeAction(ACTION.CONTINUE);
    expect(component.hearingFactilitiesForm.controls['addition-security-required'].dirty).toEqual(true);
    expect(component.prepareHearingRequestData).toHaveBeenCalled();
  });

  it('should be true when calling isFormValid when security is selected', () => {
    component.hearingFactilitiesForm.controls['addition-security-required'].setValue('Yes');
    const formValid = component.isFormValid();
    expect(formValid).toEqual(true);
  });

  it('should false when calling isFormValid when security required not selected', () => {
    component.hearingFactilitiesForm.controls['addition-security-required'].setValue(undefined);
    const formValid = component.isFormValid();
    expect(formValid).toEqual(false);
  });

  it('should filter selection from previous values', () => {
    component.hearingRequestMainModel.caseDetails.caseAdditionalSecurityFlag = true;

    const swapValue = component.hearingRequestMainModel.hearingDetails.facilitiesRequired;
    component.hearingRequestMainModel.hearingDetails.facilitiesRequired = ['secureDock', 'witnessScreen'];
    component = fixture.componentInstance;
    component.ngOnInit();
    fixture.detectChanges();

    expect(component.hearingFactilitiesForm.controls['addition-security-required'].value).toEqual('Yes');
    component.hearingRequestMainModel.hearingDetails.facilitiesRequired = swapValue;
  });

  it('should not consider the case flags from in-memory object for create new hearing request journey', () => {
    component.hearingCondition = {
      mode: 'create'
    };
    hearingsService.propertiesUpdatedOnPageVisit = {
      caseFlags: { flags: caseFlagsFromLatestSHV, flagAmendURL: '/' },
      parties: null,
      hearingWindow: null,
      afterPageVisit: {
        reasonableAdjustmentChangesRequired: true,
        partyDetailsChangesRequired: true,
        hearingWindowFirstDateMustBeChangesRequired: true
      }
    };
    component.ngOnInit();
    expect(component.nonReasonableAdjustmentFlags.length).toEqual(3);
  });

  it('should set the case flags from in-memory object when viewing or editing existing hearing request', () => {
    component.hearingCondition = {
      mode: 'view-edit'
    };
    hearingsService.propertiesUpdatedOnPageVisit = {
      caseFlags: { flags: caseFlagsFromLatestSHV, flagAmendURL: '/' },
      parties: null,
      hearingWindow: null,
      afterPageVisit: {
        reasonableAdjustmentChangesRequired: true,
        partyDetailsChangesRequired: true,
        hearingWindowFirstDateMustBeChangesRequired: true
      }
    };
    component.ngOnInit();
    expect(component.nonReasonableAdjustmentFlags.length).toEqual(1);
  });

  afterEach(() => {
    fixture.destroy();
  });
});
