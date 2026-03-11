import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { provideMockStore } from '@ngrx/store/testing';
import { initialState } from '../../../../hearing.test.data';
import { HearingsService } from '../../../../services/hearings.service';
import { AdditionalInstructionsSectionComponent } from './additional-instructions-section.component';

describe('AdditionalInstructionsSectionComponent', () => {
  let component: AdditionalInstructionsSectionComponent;
  let fixture: ComponentFixture<AdditionalInstructionsSectionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [AdditionalInstructionsSectionComponent],
      providers: [provideMockStore({ initialState }), HearingsService],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(AdditionalInstructionsSectionComponent);
    component = fixture.componentInstance;
    component.hearingRequestMainModel = initialState.hearings.hearingRequest.hearingRequestMainModel;
    component.hearingRequestToCompareMainModel = initialState.hearings.hearingRequestToCompare.hearingRequestMainModel;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set additional instructions and display amended label', () => {
    component.hearingRequestMainModel = {
      ...initialState.hearings.hearingRequest.hearingRequestMainModel,
      hearingDetails: {
        ...initialState.hearings.hearingRequest.hearingRequestMainModel.hearingDetails,
        listingComments: 'This is a test comment.',
      },
    };
    component.ngOnInit();
    expect(component.additionalInstructions).toEqual('This is a test comment.');
    expect(component.showAmmended).toEqual(true);
  });

  it('should set additional instructions and not display amended label', () => {
    component.hearingRequestMainModel = {
      ...initialState.hearings.hearingRequest.hearingRequestMainModel,
      hearingDetails: {
        ...initialState.hearings.hearingRequest.hearingRequestMainModel.hearingDetails,
        listingComments: 'This is a test comment.',
      },
    };
    component.hearingRequestToCompareMainModel = {
      ...initialState.hearings.hearingRequestToCompare.hearingRequestMainModel,
      hearingDetails: {
        ...initialState.hearings.hearingRequestToCompare.hearingRequestMainModel.hearingDetails,
        listingComments: 'This is a test comment.',
      },
    };
    component.ngOnInit();
    expect(component.additionalInstructions).toEqual('This is a test comment.');
    expect(component.showAmmended).toEqual(false);
  });

  it('should verify onChange', () => {
    spyOn(component.changeEditHearing, 'emit');
    component.onChange('additionalInstruction');
    expect(component.changeEditHearing.emit).toHaveBeenCalledWith({
      fragmentId: 'additionalInstruction',
      changeLink: '/hearings/request/hearing-additional-instructions#additionalInstructionsTextarea',
    });
  });

  describe('setAmendmentLabels', () => {
    it('should set pageTitleDisplayLabel to ACTION_NEEDED when additionalInstructionsChangesRequired is true and not confirmed', () => {
      const hearingsService = TestBed.inject(HearingsService);
      hearingsService.propertiesUpdatedOnPageVisit = {
        hearingId: 'h000001',
        caseFlags: null,
        parties: null,
        hearingWindow: null,
        afterPageVisit: {
          reasonableAdjustmentChangesRequired: false,
          nonReasonableAdjustmentChangesRequired: false,
          participantAttendanceChangesRequired: false,
          hearingWindowChangesRequired: false,
          hearingFacilitiesChangesRequired: false,
          hearingUnavailabilityDatesChanged: false,
          additionalInsructionsChangesRequired: false,
          additionalInstructionsChangesRequired: true,
          additionalInstructionsChangesConfirmed: false,
        },
      } as any;

      component.hearingRequestMainModel = {
        ...initialState.hearings.hearingRequest.hearingRequestMainModel,
        hearingDetails: {
          ...initialState.hearings.hearingRequest.hearingRequestMainModel.hearingDetails,
          listingComments: 'New comment',
        },
      };

      component.hearingRequestToCompareMainModel = {
        ...initialState.hearings.hearingRequestToCompare.hearingRequestMainModel,
        hearingDetails: {
          ...initialState.hearings.hearingRequestToCompare.hearingRequestMainModel.hearingDetails,
          listingComments: 'Old comment',
        },
      };

      component.ngOnInit();

      expect(component.pageTitleDisplayLabel).toEqual('ACTION NEEDED');
    });

    it('should set pageTitleDisplayLabel to AMENDED when additionalInstructionsChangesRequired is true but confirmed', () => {
      const hearingsService = TestBed.inject(HearingsService);
      hearingsService.propertiesUpdatedOnPageVisit = {
        hearingId: 'h000001',
        caseFlags: null,
        parties: null,
        hearingWindow: null,
        afterPageVisit: {
          reasonableAdjustmentChangesRequired: false,
          nonReasonableAdjustmentChangesRequired: false,
          participantAttendanceChangesRequired: false,
          hearingWindowChangesRequired: false,
          hearingFacilitiesChangesRequired: false,
          hearingUnavailabilityDatesChanged: false,
          additionalInsructionsChangesRequired: false,
          additionalInstructionsChangesRequired: true,
          additionalInstructionsChangesConfirmed: true,
        },
      } as any;

      component.hearingRequestMainModel = {
        ...initialState.hearings.hearingRequest.hearingRequestMainModel,
        hearingDetails: {
          ...initialState.hearings.hearingRequest.hearingRequestMainModel.hearingDetails,
          listingComments: 'New comment',
        },
      };

      component.hearingRequestToCompareMainModel = {
        ...initialState.hearings.hearingRequestToCompare.hearingRequestMainModel,
        hearingDetails: {
          ...initialState.hearings.hearingRequestToCompare.hearingRequestMainModel.hearingDetails,
          listingComments: 'Old comment',
        },
      };

      component.ngOnInit();

      expect(component.pageTitleDisplayLabel).toEqual('AMENDED');
    });

    it('should set pageTitleDisplayLabel to AMENDED when comments differ and no page visit changes required', () => {
      const hearingsService = TestBed.inject(HearingsService);
      hearingsService.propertiesUpdatedOnPageVisit = {
        hearingId: 'h000001',
        caseFlags: null,
        parties: null,
        hearingWindow: null,
        afterPageVisit: {
          reasonableAdjustmentChangesRequired: false,
          nonReasonableAdjustmentChangesRequired: false,
          participantAttendanceChangesRequired: false,
          hearingWindowChangesRequired: false,
          hearingFacilitiesChangesRequired: false,
          hearingUnavailabilityDatesChanged: false,
          additionalInsructionsChangesRequired: false,
          additionalInstructionsChangesRequired: false,
          additionalInstructionsChangesConfirmed: false,
        },
      } as any;

      component.hearingRequestMainModel = {
        ...initialState.hearings.hearingRequest.hearingRequestMainModel,
        hearingDetails: {
          ...initialState.hearings.hearingRequest.hearingRequestMainModel.hearingDetails,
          listingComments: 'New comment',
        },
      };

      component.hearingRequestToCompareMainModel = {
        ...initialState.hearings.hearingRequestToCompare.hearingRequestMainModel,
        hearingDetails: {
          ...initialState.hearings.hearingRequestToCompare.hearingRequestMainModel.hearingDetails,
          listingComments: 'Old comment',
        },
      };

      component.ngOnInit();

      expect(component.pageTitleDisplayLabel).toEqual('AMENDED');
    });

    it('should set pageTitleDisplayLabel to EMPTY when comments are the same', () => {
      const hearingsService = TestBed.inject(HearingsService);
      hearingsService.propertiesUpdatedOnPageVisit = {
        hearingId: 'h000001',
        caseFlags: null,
        parties: null,
        hearingWindow: null,
        afterPageVisit: {
          reasonableAdjustmentChangesRequired: false,
          nonReasonableAdjustmentChangesRequired: false,
          participantAttendanceChangesRequired: false,
          hearingWindowChangesRequired: false,
          hearingFacilitiesChangesRequired: false,
          hearingUnavailabilityDatesChanged: false,
          additionalInsructionsChangesRequired: false,
          additionalInstructionsChangesRequired: false,
          additionalInstructionsChangesConfirmed: false,
        },
      } as any;

      component.hearingRequestMainModel = {
        ...initialState.hearings.hearingRequest.hearingRequestMainModel,
        hearingDetails: {
          ...initialState.hearings.hearingRequest.hearingRequestMainModel.hearingDetails,
          listingComments: 'Same comment',
        },
      };

      component.hearingRequestToCompareMainModel = {
        ...initialState.hearings.hearingRequestToCompare.hearingRequestMainModel,
        hearingDetails: {
          ...initialState.hearings.hearingRequestToCompare.hearingRequestMainModel.hearingDetails,
          listingComments: 'Same comment',
        },
      };

      component.ngOnInit();

      expect(component.pageTitleDisplayLabel).toEqual('');
    });

    it('should set pageTitleDisplayLabel to ACTION_NEEDED when propertiesUpdatedOnPageVisit is undefined but additionalInstructionsChangesRequired exists', () => {
      const hearingsService = TestBed.inject(HearingsService);
      hearingsService.propertiesUpdatedOnPageVisit = undefined;

      component.hearingRequestMainModel = {
        ...initialState.hearings.hearingRequest.hearingRequestMainModel,
        hearingDetails: {
          ...initialState.hearings.hearingRequest.hearingRequestMainModel.hearingDetails,
          listingComments: 'New comment',
        },
      };

      component.hearingRequestToCompareMainModel = {
        ...initialState.hearings.hearingRequestToCompare.hearingRequestMainModel,
        hearingDetails: {
          ...initialState.hearings.hearingRequestToCompare.hearingRequestMainModel.hearingDetails,
          listingComments: 'Old comment',
        },
      };

      component.ngOnInit();

      expect(component.pageTitleDisplayLabel).toEqual('AMENDED');
    });

    it('should handle null listingComments in hearingRequestMainModel', () => {
      const hearingsService = TestBed.inject(HearingsService);
      hearingsService.propertiesUpdatedOnPageVisit = {
        hearingId: 'h000001',
        caseFlags: null,
        parties: null,
        hearingWindow: null,
        afterPageVisit: {
          reasonableAdjustmentChangesRequired: false,
          nonReasonableAdjustmentChangesRequired: false,
          participantAttendanceChangesRequired: false,
          hearingWindowChangesRequired: false,
          hearingFacilitiesChangesRequired: false,
          hearingUnavailabilityDatesChanged: false,
          additionalInsructionsChangesRequired: false,
          additionalInstructionsChangesRequired: false,
          additionalInstructionsChangesConfirmed: false,
        },
      } as any;

      component.hearingRequestMainModel = {
        ...initialState.hearings.hearingRequest.hearingRequestMainModel,
        hearingDetails: {
          ...initialState.hearings.hearingRequest.hearingRequestMainModel.hearingDetails,
          listingComments: null,
        },
      };

      component.hearingRequestToCompareMainModel = {
        ...initialState.hearings.hearingRequestToCompare.hearingRequestMainModel,
        hearingDetails: {
          ...initialState.hearings.hearingRequestToCompare.hearingRequestMainModel.hearingDetails,
          listingComments: 'Old comment',
        },
      };

      component.ngOnInit();

      expect(component.pageTitleDisplayLabel).toEqual('AMENDED');
      expect(component.additionalInstructions).toEqual('');
    });

    it('should handle both listingComments being null', () => {
      const hearingsService = TestBed.inject(HearingsService);
      hearingsService.propertiesUpdatedOnPageVisit = {
        hearingId: 'h000001',
        caseFlags: null,
        parties: null,
        hearingWindow: null,
        afterPageVisit: {
          reasonableAdjustmentChangesRequired: false,
          nonReasonableAdjustmentChangesRequired: false,
          participantAttendanceChangesRequired: false,
          hearingWindowChangesRequired: false,
          hearingFacilitiesChangesRequired: false,
          hearingUnavailabilityDatesChanged: false,
          additionalInsructionsChangesRequired: false,
          additionalInstructionsChangesRequired: false,
          additionalInstructionsChangesConfirmed: false,
        },
      } as any;

      component.hearingRequestMainModel = {
        ...initialState.hearings.hearingRequest.hearingRequestMainModel,
        hearingDetails: {
          ...initialState.hearings.hearingRequest.hearingRequestMainModel.hearingDetails,
          listingComments: null,
        },
      };

      component.hearingRequestToCompareMainModel = {
        ...initialState.hearings.hearingRequestToCompare.hearingRequestMainModel,
        hearingDetails: {
          ...initialState.hearings.hearingRequestToCompare.hearingRequestMainModel.hearingDetails,
          listingComments: null,
        },
      };

      component.ngOnInit();

      expect(component.pageTitleDisplayLabel).toEqual('');
      expect(component.additionalInstructions).toEqual('');
    });
  });
});
