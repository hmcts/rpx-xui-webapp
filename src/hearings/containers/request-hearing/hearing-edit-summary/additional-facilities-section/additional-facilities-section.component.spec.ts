import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideMockStore } from '@ngrx/store/testing';
import * as _ from 'lodash';
import { HearingsService } from '../../../../../hearings/services/hearings.service';
import { initialState } from '../../../../hearing.test.data';
import { AmendmentLabelStatus } from '../../../../models/hearingsUpdateMode.enum';
import { LovRefDataModel } from '../../../../models/lovRefData.model';
import { AdditionalFacilitiesSectionComponent } from './additional-facilities-section.component';

describe('AdditionalFacilitiesSectionComponent', () => {
  let component: AdditionalFacilitiesSectionComponent;
  let fixture: ComponentFixture<AdditionalFacilitiesSectionComponent>;
  const mockedHttpClient = jasmine.createSpyObj('HttpClient', ['get', 'post', 'delete']);
  const hearingsService = new HearingsService(mockedHttpClient);

  const additionalFacilitiesRefData: LovRefDataModel[] = [
    {
      key: 'immigrationDetentionCentre',
      value_en: 'immigration detention centre',
      value_cy: '',
      hint_text_en: 'Immigration detention centre',
      hint_text_cy: '',
      lov_order: 1,
      parent_key: null,
      category_key: 'facilities',
      parent_category: '',
      active_flag: 'Y'
    },
    {
      key: 'inCameraCourt',
      value_en: 'in camera court',
      value_cy: '',
      hint_text_en: 'In camera court',
      hint_text_cy: '',
      lov_order: 2,
      parent_key: null,
      category_key: 'facilities',
      parent_category: '',
      active_flag: 'Y'
    },
    {
      key: 'sameSexCourtroom',
      value_en: 'same sex courtroom',
      value_cy: '',
      hint_text_en: 'Same sex courtroom',
      hint_text_cy: '',
      lov_order: 3,
      parent_key: null,
      category_key: 'facilities',
      parent_category: '',
      active_flag: 'Y'
    },
    {
      key: 'secureDock',
      value_en: 'secure dock',
      value_cy: '',
      hint_text_en: 'Secure Dock',
      hint_text_cy: '',
      lov_order: 4,
      parent_key: null,
      category_key: 'facilities',
      parent_category: '',
      active_flag: 'Y'
    },
    {
      key: 'witnessScreen',
      value_en: 'witness screen',
      value_cy: '',
      hint_text_en: 'Witness Screen',
      hint_text_cy: '',
      lov_order: 4,
      parent_key: null,
      category_key: 'facilities',
      parent_category: '',
      active_flag: 'Y'
    },
    {
      key: 'witnessRoom',
      value_en: 'witness room',
      value_cy: '',
      hint_text_en: 'Witness Room',
      hint_text_cy: '',
      lov_order: 5,
      parent_key: null,
      category_key: 'facilities',
      parent_category: '',
      active_flag: 'Y'
    },
    {
      key: 'videoConferencing',
      value_en: 'video conferencing',
      value_cy: '',
      hint_text_en: 'Video Conferencing',
      hint_text_cy: '',
      lov_order: 5,
      parent_key: null,
      category_key: 'facilities',
      parent_category: '',
      active_flag: 'Y'
    },
    {
      key: 'VideoFacility',
      value_en: 'videoFacility',
      value_cy: '',
      hint_text_en: 'Video Facility',
      hint_text_cy: '',
      lov_order: 5,
      parent_key: null,
      category_key: 'facilities',
      parent_category: '',
      active_flag: 'Y'
    },
    {
      key: 'prisonVideoLink',
      value_en: 'prison video link',
      value_cy: '',
      hint_text_en: 'Prison Video Link',
      hint_text_cy: '',
      lov_order: 5,
      parent_key: null,
      category_key: 'facilities',
      parent_category: '',
      active_flag: 'Y'
    }
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      declarations: [
        AdditionalFacilitiesSectionComponent
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [
        provideMockStore({ initialState }),
        { provide: HearingsService, useValue: hearingsService }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(AdditionalFacilitiesSectionComponent);
    component = fixture.componentInstance;
    component.additionalFacilitiesRefData = additionalFacilitiesRefData;
    component.hearingRequestMainModel = initialState.hearings.hearingRequest.hearingRequestMainModel;
    component.hearingRequestToCompareMainModel = initialState.hearings.hearingRequestToCompare.hearingRequestMainModel;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set additional factilities required as no', () => {
    const hearingRequestMainModel = _.cloneDeep(initialState.hearings.hearingRequest.hearingRequestMainModel);
    hearingRequestMainModel.caseDetails.caseAdditionalSecurityFlag = false;
    component.hearingRequestMainModel = hearingRequestMainModel;
    component.ngOnInit();
    expect(component.additionalFacilitiesRequiredText).toEqual('No');
  });

  it('should set additional factilities required as yes', () => {
    const hearingRequestMainModel = _.cloneDeep(initialState.hearings.hearingRequest.hearingRequestMainModel);
    hearingRequestMainModel.caseDetails.caseAdditionalSecurityFlag = true;
    component.hearingRequestMainModel = hearingRequestMainModel;
    component.ngOnInit();
    expect(component.additionalFacilitiesRequiredText).toEqual('Yes');
  });

  it('should populate the additional facilities', () => {
    component.ngOnInit();
    expect(component.additionalFacilities.length).toEqual(4);
  });

  it('should verify onChange', () => {
    spyOn(component.changeEditHearing, 'emit');
    component.onChange('additionalSecurityRequired');
    expect(component.changeEditHearing.emit).toHaveBeenCalledWith({
      fragmentId: 'additionalSecurityRequired', changeLink: '/hearings/request/hearing-facilities#addition-security-confirmation'
    });
    component.onChange('additionalFacilitiesRequired');
    expect(component.changeEditHearing.emit).toHaveBeenCalledWith({
      fragmentId: 'additionalFacilitiesRequired', changeLink: '/hearings/request/hearing-facilities#immigrationDetentionCentre'
    });
  });

  describe('pageTitleDisplayLabel', () => {
    xit('should not set pageTitleDisplayLabel', () => {
      hearingsService.propertiesUpdatedOnPageVisit = {
        hearingId: 'h000001',
        caseFlags: initialState.hearings.hearingValues.serviceHearingValuesModel.caseFlags,
        parties: initialState.hearings.hearingValues.serviceHearingValuesModel.parties,
        hearingWindow: initialState.hearings.hearingValues.serviceHearingValuesModel.hearingWindow,
        afterPageVisit: {
          reasonableAdjustmentChangesRequired: false,
          nonReasonableAdjustmentChangesRequired: false,
          participantAttendanceChangesRequired: false,
          hearingWindowChangesRequired: false,
          hearingFacilitiesChangesRequired: false,
          hearingUnavailabilityDatesChanged: false
        }
      };
      component.ngOnInit();
      expect(component.pageTitleDisplayLabel).toBeUndefined();
    });

    it('should set pageTitleDisplayLabel to amended if case additional security flag value is manually amended by user', () => {
      hearingsService.propertiesUpdatedOnPageVisit = {
        hearingId: 'h000001',
        caseFlags: initialState.hearings.hearingValues.serviceHearingValuesModel.caseFlags,
        parties: initialState.hearings.hearingValues.serviceHearingValuesModel.parties,
        hearingWindow: initialState.hearings.hearingValues.serviceHearingValuesModel.hearingWindow,
        afterPageVisit: {
          reasonableAdjustmentChangesRequired: false,
          nonReasonableAdjustmentChangesRequired: false,
          participantAttendanceChangesRequired: false,
          hearingWindowChangesRequired: false,
          hearingFacilitiesChangesRequired: false,
          hearingUnavailabilityDatesChanged: false
        }
      };
      component.hearingRequestMainModel = {
        ...initialState.hearings.hearingRequest.hearingRequestMainModel,
        caseDetails: {
          ...initialState.hearings.hearingRequest.hearingRequestMainModel.caseDetails,
          caseAdditionalSecurityFlag: true
        }
      };
      component.hearingRequestMainModel.caseDetails.caseAdditionalSecurityFlag = true;
      component.ngOnInit();
      expect(component.pageTitleDisplayLabel).toEqual(AmendmentLabelStatus.AMENDED);
    });

    it('should set pageTitleDisplayLabel to amended if facilities manually amended by user', () => {
      hearingsService.propertiesUpdatedOnPageVisit = {
        hearingId: 'h000001',
        caseFlags: initialState.hearings.hearingValues.serviceHearingValuesModel.caseFlags,
        parties: initialState.hearings.hearingValues.serviceHearingValuesModel.parties,
        hearingWindow: initialState.hearings.hearingValues.serviceHearingValuesModel.hearingWindow,
        afterPageVisit: {
          reasonableAdjustmentChangesRequired: false,
          nonReasonableAdjustmentChangesRequired: false,
          participantAttendanceChangesRequired: false,
          hearingWindowChangesRequired: false,
          hearingFacilitiesChangesRequired: false,
          hearingUnavailabilityDatesChanged: false
        }
      };
      component.hearingRequestMainModel = {
        ...initialState.hearings.hearingRequest.hearingRequestMainModel,
        hearingDetails: {
          ...initialState.hearings.hearingRequest.hearingRequestMainModel.hearingDetails,
          facilitiesRequired: ['some facility']
        }
      };
      component.ngOnInit();
      expect(component.pageTitleDisplayLabel).toEqual(AmendmentLabelStatus.AMENDED);
    });

    it('should set pageTitleDisplayLabel to action needed if manual amendment changes exists for non reasonable adjustment changes but not confirmed', () => {
      hearingsService.propertiesUpdatedOnPageVisit = {
        hearingId: 'h000001',
        caseFlags: initialState.hearings.hearingValues.serviceHearingValuesModel.caseFlags,
        parties: initialState.hearings.hearingValues.serviceHearingValuesModel.parties,
        hearingWindow: initialState.hearings.hearingValues.serviceHearingValuesModel.hearingWindow,
        afterPageVisit: {
          reasonableAdjustmentChangesRequired: false,
          nonReasonableAdjustmentChangesRequired: true,
          nonReasonableAdjustmentChangesConfirmed: false,
          participantAttendanceChangesRequired: false,
          hearingWindowChangesRequired: false,
          hearingFacilitiesChangesRequired: false,
          hearingUnavailabilityDatesChanged: false
        }
      };
      component.ngOnInit();
      expect(component.pageTitleDisplayLabel).toEqual(AmendmentLabelStatus.ACTION_NEEDED);
    });

    it('should set pageTitleDisplayLabel to amended if manual amendment changes exists for non reasonable adjustment changes and confirmed', () => {
      hearingsService.propertiesUpdatedOnPageVisit = {
        hearingId: 'h000001',
        caseFlags: initialState.hearings.hearingValues.serviceHearingValuesModel.caseFlags,
        parties: initialState.hearings.hearingValues.serviceHearingValuesModel.parties,
        hearingWindow: initialState.hearings.hearingValues.serviceHearingValuesModel.hearingWindow,
        afterPageVisit: {
          reasonableAdjustmentChangesRequired: false,
          nonReasonableAdjustmentChangesRequired: true,
          nonReasonableAdjustmentChangesConfirmed: true,
          participantAttendanceChangesRequired: false,
          hearingWindowChangesRequired: false,
          hearingFacilitiesChangesRequired: false,
          hearingUnavailabilityDatesChanged: false
        }
      };
      component.ngOnInit();
      expect(component.pageTitleDisplayLabel).toEqual(AmendmentLabelStatus.AMENDED);
    });

    it('should set pageTitleDisplayLabel to action needed if manual amendment changes exists for hearing facilities and not confirmed', () => {
      hearingsService.propertiesUpdatedOnPageVisit = {
        hearingId: 'h000001',
        caseFlags: initialState.hearings.hearingValues.serviceHearingValuesModel.caseFlags,
        parties: initialState.hearings.hearingValues.serviceHearingValuesModel.parties,
        hearingWindow: initialState.hearings.hearingValues.serviceHearingValuesModel.hearingWindow,
        afterPageVisit: {
          reasonableAdjustmentChangesRequired: false,
          nonReasonableAdjustmentChangesRequired: false,
          nonReasonableAdjustmentChangesConfirmed: false,
          participantAttendanceChangesRequired: false,
          hearingWindowChangesRequired: false,
          hearingFacilitiesChangesRequired: true,
          hearingUnavailabilityDatesChanged: false
        }
      };
      component.ngOnInit();
      expect(component.pageTitleDisplayLabel).toEqual(AmendmentLabelStatus.ACTION_NEEDED);
    });

    it('should set pageTitleDisplayLabel to amended if manual amendment changes exists for hearing facilities and confirmed', () => {
      hearingsService.propertiesUpdatedOnPageVisit = {
        hearingId: 'h000001',
        caseFlags: initialState.hearings.hearingValues.serviceHearingValuesModel.caseFlags,
        parties: initialState.hearings.hearingValues.serviceHearingValuesModel.parties,
        hearingWindow: initialState.hearings.hearingValues.serviceHearingValuesModel.hearingWindow,
        afterPageVisit: {
          reasonableAdjustmentChangesRequired: false,
          nonReasonableAdjustmentChangesRequired: false,
          nonReasonableAdjustmentChangesConfirmed: false,
          participantAttendanceChangesRequired: false,
          hearingWindowChangesRequired: false,
          hearingFacilitiesChangesRequired: true,
          hearingFacilitiesChangesConfirmed: true,
          hearingUnavailabilityDatesChanged: false
        }
      };
      component.ngOnInit();
      expect(component.pageTitleDisplayLabel).toEqual(AmendmentLabelStatus.AMENDED);
    });
  });
  describe('setAmendmentLabels', () => {
    beforeEach(() => {
      // Reset properties that might be affected by previous tests
      component.pageTitleDisplayLabel = undefined;
      component.facilitiesRequiredToCompare = [];
      component.caseAdditionalSecurityFlagChanged = false;
      component.facilitiesChanged = false;

      // Reset service state
      hearingsService.propertiesUpdatedOnPageVisit = {
        hearingId: 'h000001',
        caseFlags: initialState.hearings.hearingValues.serviceHearingValuesModel.caseFlags,
        parties: initialState.hearings.hearingValues.serviceHearingValuesModel.parties,
        hearingWindow: initialState.hearings.hearingValues.serviceHearingValuesModel.hearingWindow,
        afterPageVisit: {
          reasonableAdjustmentChangesRequired: false,
          nonReasonableAdjustmentChangesRequired: false,
          nonReasonableAdjustmentChangesConfirmed: false,
          participantAttendanceChangesRequired: false,
          hearingWindowChangesRequired: false,
          hearingFacilitiesChangesRequired: false,
          hearingFacilitiesChangesConfirmed: false,
          hearingUnavailabilityDatesChanged: false
        }
      };
    });

    it('should set EMPTY label when no changes are detected', () => {
      // Set identical models to ensure no changes
      component.hearingRequestMainModel = { ...initialState.hearings.hearingRequest.hearingRequestMainModel };
      component.hearingRequestToCompareMainModel = { ...initialState.hearings.hearingRequest.hearingRequestMainModel };

      // Call ngOnInit which will trigger setAmendmentLabels()
      component.ngOnInit();

      expect(component.caseAdditionalSecurityFlagChanged).toBeFalse();
      expect(component.facilitiesChanged).toBeFalse();
      expect(component.pageTitleDisplayLabel).toEqual(AmendmentLabelStatus.EMPTY);
    });

    it('should set AMENDED label when security flag has changed', () => {
      // Change security flag in main model
      component.hearingRequestMainModel = {
        ...initialState.hearings.hearingRequest.hearingRequestMainModel,
        caseDetails: {
          ...initialState.hearings.hearingRequest.hearingRequestMainModel.caseDetails,
          caseAdditionalSecurityFlag: true
        }
      };

      component.hearingRequestToCompareMainModel = {
        ...initialState.hearings.hearingRequest.hearingRequestMainModel,
        caseDetails: {
          ...initialState.hearings.hearingRequest.hearingRequestMainModel.caseDetails,
          caseAdditionalSecurityFlag: false
        }
      };

      component.ngOnInit();

      expect(component.caseAdditionalSecurityFlagChanged).toBeTrue();
      expect(component.pageTitleDisplayLabel).toEqual(AmendmentLabelStatus.AMENDED);
    });

    it('should set AMENDED label when facilities have changed', () => {
      // Change facilities in main model
      component.hearingRequestMainModel = {
        ...initialState.hearings.hearingRequest.hearingRequestMainModel,
        hearingDetails: {
          ...initialState.hearings.hearingRequest.hearingRequestMainModel.hearingDetails,
          facilitiesRequired: ['newFacility', 'inCameraCourt']
        }
      };

      component.ngOnInit();

      expect(component.facilitiesChanged).toBeTrue();
      expect(component.pageTitleDisplayLabel).toEqual(AmendmentLabelStatus.AMENDED);
    });

    it('should set ACTION_NEEDED label when nonReasonableAdjustmentChangesRequired but not confirmed', () => {
      hearingsService.propertiesUpdatedOnPageVisit.afterPageVisit.nonReasonableAdjustmentChangesRequired = true;
      hearingsService.propertiesUpdatedOnPageVisit.afterPageVisit.nonReasonableAdjustmentChangesConfirmed = false;

      component.ngOnInit();

      expect(component.pageTitleDisplayLabel).toEqual(AmendmentLabelStatus.ACTION_NEEDED);
    });

    it('should set ACTION_NEEDED label when hearingFacilitiesChangesRequired but not confirmed', () => {
      hearingsService.propertiesUpdatedOnPageVisit.afterPageVisit.hearingFacilitiesChangesRequired = true;
      hearingsService.propertiesUpdatedOnPageVisit.afterPageVisit.hearingFacilitiesChangesConfirmed = false;

      component.ngOnInit();

      expect(component.pageTitleDisplayLabel).toEqual(AmendmentLabelStatus.ACTION_NEEDED);
    });

    it('should prioritize ACTION_NEEDED over AMENDED', () => {
      // Make changes that would normally result in AMENDED
      component.hearingRequestMainModel = {
        ...initialState.hearings.hearingRequest.hearingRequestMainModel,
        caseDetails: {
          ...initialState.hearings.hearingRequest.hearingRequestMainModel.caseDetails,
          caseAdditionalSecurityFlag: true
        }
      };

      // But also set conditions for ACTION_NEEDED
      hearingsService.propertiesUpdatedOnPageVisit.afterPageVisit.nonReasonableAdjustmentChangesRequired = true;
      hearingsService.propertiesUpdatedOnPageVisit.afterPageVisit.nonReasonableAdjustmentChangesConfirmed = false;

      component.ngOnInit();

      expect(component.caseAdditionalSecurityFlagChanged).toBeTrue();
      expect(component.pageTitleDisplayLabel).toEqual(AmendmentLabelStatus.ACTION_NEEDED);
    });

    it('should set facilitiesRequiredToCompare from the compare model', () => {
      // Set some specific facilities in the compare model
      component.hearingRequestToCompareMainModel = {
        ...initialState.hearings.hearingRequest.hearingRequestMainModel,
        hearingDetails: {
          ...initialState.hearings.hearingRequest.hearingRequestMainModel.hearingDetails,
          facilitiesRequired: ['inCameraCourt', 'secureDock']
        }
      };

      component.ngOnInit();

      // Check if the facilitiesRequiredToCompare was populated correctly
      expect(component.facilitiesRequiredToCompare).toContain('in camera court');
      expect(component.facilitiesRequiredToCompare).toContain('secure dock');
    });

    it('should identify when specific facilities have been added or removed', () => {
      // Main model has one facility that compare model doesn't have
      component.hearingRequestMainModel = {
        ...initialState.hearings.hearingRequest.hearingRequestMainModel,
        hearingDetails: {
          ...initialState.hearings.hearingRequest.hearingRequestMainModel.hearingDetails,
          facilitiesRequired: ['inCameraCourt', 'witnessScreen']
        }
      };

      component.hearingRequestToCompareMainModel = {
        ...initialState.hearings.hearingRequest.hearingRequestMainModel,
        hearingDetails: {
          ...initialState.hearings.hearingRequest.hearingRequestMainModel.hearingDetails,
          facilitiesRequired: ['inCameraCourt']
        }
      };

      component.ngOnInit();

      // The facility "witness screen" should be marked as amended (not in compare list)
      expect(component.showAmendedForFacilitiesRequired('witness screen')).toBeTrue();
      // The facility "in camera court" should not be marked as amended (in both lists)
      expect(component.showAmendedForFacilitiesRequired('in camera court')).toBeFalse();
    });
  });
});
