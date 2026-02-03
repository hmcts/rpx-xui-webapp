import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { of } from 'rxjs';
import { MockRpxTranslatePipe } from '../../../../app/shared/test/mock-rpx-translate.pipe';
import { initialState } from '../../../hearing.test.data';
import { ACTION } from '../../../models/hearings.enum';
import { HearingsService } from '../../../services/hearings.service';
import { HearingAdditionalInstructionsComponent } from './hearing-additional-instructions.component';

describe('HearingAdditionalInstructionsComponent', () => {
  let component: HearingAdditionalInstructionsComponent;
  let fixture: ComponentFixture<HearingAdditionalInstructionsComponent>;
  const mockedHttpClient = jasmine.createSpyObj('HttpClient', ['get', 'post']);
  const hearingsService = new HearingsService(mockedHttpClient);
  hearingsService.navigateAction$ = of(ACTION.CONTINUE);

  // Factory function to create mock AfterPageVisitProperties with defaults
  function createMockAfterPageVisit(overrides: any = {}): any {
    return {
      reasonableAdjustmentChangesRequired: false,
      nonReasonableAdjustmentChangesRequired: false,
      participantAttendanceChangesRequired: false,
      hearingWindowChangesRequired: false,
      hearingFacilitiesChangesRequired: false,
      hearingUnavailabilityDatesChanged: false,
      additionalInsructionsChangesRequired: false, // Using typo from interface
      additionalInstructionsChangesRequired: false, // Also add correct spelling for component check
      ...overrides
    };
  }

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, RouterTestingModule],
      declarations: [HearingAdditionalInstructionsComponent, MockRpxTranslatePipe],
      providers: [
        provideMockStore({ initialState }),
        { provide: HearingsService, useValue: hearingsService },
        {
          provide: ActivatedRoute,
          useValue: {
            fragment: of('point-to-me')
          }
        }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(HearingAdditionalInstructionsComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should check form validity', () => {
    fixture.detectChanges();
    spyOn<HearingsService>(hearingsService, 'navigateAction$' as never);
    component.instructionsForm.controls.instructions.setValue('instructions');
    component.executeAction(ACTION.CONTINUE);
    expect(component.isFormValid()).toBeTruthy();
  });

  it('should check AutoListFlag', () => {
    fixture.detectChanges();
    component.initForm();
    component.instructionsForm.controls.instructions.setValue(null);
    component.serviceHearingValuesModel.autoListFlag = true;
    expect(component.getAutoListFlag()).toBeTruthy();
    component.instructionsForm.controls.instructions.setValue('instructions');
    expect(component.getAutoListFlag()).toBeFalsy();
  });

  it('should getListingAutoChangeReasonCode', () => {
    fixture.detectChanges();
    component.initForm();
    component.instructionsForm.controls.instructions.setValue(null);
    component.serviceHearingValuesModel.autoListFlag = true;
    expect(component.getListingAutoChangeReasonCode()).toBeNull();
    component.instructionsForm.controls.instructions.setValue('instructions');
    expect(component.getListingAutoChangeReasonCode()).toBe('user-added-comments');
  });

  it('should sanitise HTML strings', () => {
    const sanitisedString = component.santiseHTML('<h1>this is a test</h1>');
    expect(sanitisedString).toBe('this is a test');
  });

  describe('initForm with VIEW_EDIT mode and additionalInsructionsChangesRequired', () => {
    it('should set showReviewBox to true when in VIEW_EDIT mode with additionalInsructionsChangesRequired', () => {
      // Set up the service properties BEFORE component initialization
      hearingsService.propertiesUpdatedOnPageVisit = {
        hearingId: 'h000001',
        caseFlags: null,
        parties: null,
        hearingWindow: null,
        afterPageVisit: createMockAfterPageVisit({ additionalInstructionsChangesRequired: true })
      } as any;

      console.log('Test - hearingsService.propertiesUpdatedOnPageVisit:', hearingsService.propertiesUpdatedOnPageVisit);
      console.log('Test - additionalInstructionsChangesRequired:', hearingsService.propertiesUpdatedOnPageVisit?.afterPageVisit?.additionalInstructionsChangesRequired);

      component.hearingCondition = { mode: 'view-edit' };
      component.serviceHearingValuesModel = {
        ...component.serviceHearingValuesModel,
        listingComments: 'Service hearing comments'
      };
      component.hearingRequestMainModel = {
        ...component.hearingRequestMainModel,
        hearingDetails: {
          ...component.hearingRequestMainModel.hearingDetails,
          listingComments: 'Main model comments'
        }
      };

      // Initialize component after setting up service and models
      component.ngOnInit();

      console.log('Test - showReviewBox:', component.showReviewBox);
      expect(component.showReviewBox).toBe(true);
    });

    it('should create instructionsForm with serviceHearingValuesModel listingComments when additionalInsructionsChangesRequired', () => {
      // Set up the service properties BEFORE component initialization
      hearingsService.propertiesUpdatedOnPageVisit = {
        hearingId: 'h000001',
        caseFlags: null,
        parties: null,
        hearingWindow: null,
        afterPageVisit: createMockAfterPageVisit({ additionalInstructionsChangesRequired: true })
      } as any;

      component.hearingCondition = { mode: 'view-edit' };
      component.serviceHearingValuesModel = {
        ...component.serviceHearingValuesModel,
        listingComments: 'Service hearing comments'
      };
      component.hearingRequestMainModel = {
        ...component.hearingRequestMainModel,
        hearingDetails: {
          ...component.hearingRequestMainModel.hearingDetails,
          listingComments: 'Main model comments'
        }
      };

      component.ngOnInit();

      expect(component.instructionsForm.value.instructions).toBe('Service hearing comments');
    });

    it('should create instructionsFormViewOnly with hearingRequestMainModel listingComments when additionalInsructionsChangesRequired', () => {
      // Set up the service properties BEFORE component initialization
      hearingsService.propertiesUpdatedOnPageVisit = {
        hearingId: 'h000001',
        caseFlags: null,
        parties: null,
        hearingWindow: null,
        afterPageVisit: createMockAfterPageVisit({ additionalInstructionsChangesRequired: true })
      } as any;

      component.hearingCondition = { mode: 'view-edit' };
      component.serviceHearingValuesModel = {
        ...component.serviceHearingValuesModel,
        listingComments: 'Service hearing comments'
      };
      component.hearingRequestMainModel = {
        ...component.hearingRequestMainModel,
        hearingDetails: {
          ...component.hearingRequestMainModel.hearingDetails,
          listingComments: 'Main model comments'
        }
      };

      component.ngOnInit();

      expect(component.instructionsFormViewOnly).toBeDefined();
      expect(component.instructionsFormViewOnly.value.instructionsViewOnly).toBe('Main model comments');
    });

    it('should set showReviewBox to false when not in VIEW_EDIT mode', () => {
      component.hearingCondition = { mode: 'create' };
      component.hearingRequestMainModel = {
        ...component.hearingRequestMainModel,
        hearingDetails: {
          ...component.hearingRequestMainModel.hearingDetails,
          listingComments: 'Main model comments'
        }
      };

      component.initForm();

      expect(component.showReviewBox).toBe(false);
    });

    it('should set showReviewBox to false when additionalInsructionsChangesRequired is false', () => {
      // Set up the service properties BEFORE component initialization
      hearingsService.propertiesUpdatedOnPageVisit = {
        hearingId: 'h000001',
        caseFlags: null,
        parties: null,
        hearingWindow: null,
        afterPageVisit: createMockAfterPageVisit({ additionalInstructionsChangesRequired: false })
      } as any;

      component.hearingCondition = { mode: 'view-edit' };
      component.hearingRequestMainModel = {
        ...component.hearingRequestMainModel,
        hearingDetails: {
          ...component.hearingRequestMainModel.hearingDetails,
          listingComments: 'Main model comments'
        }
      };

      component.initForm();

      expect(component.showReviewBox).toBe(false);
    });

    it('should only create instructionsForm when not in VIEW_EDIT mode with additionalInsructionsChangesRequired', () => {
      component.hearingCondition = { mode: 'create' };
      component.hearingRequestMainModel = {
        ...component.hearingRequestMainModel,
        hearingDetails: {
          ...component.hearingRequestMainModel.hearingDetails,
          listingComments: 'Main model comments'
        }
      };

      component.initForm();

      expect(component.instructionsForm).toBeDefined();
      expect(component.instructionsForm.value.instructions).toBe('Main model comments');
      expect(component.instructionsFormViewOnly).toBeUndefined();
    });

    it('should handle null serviceHearingValuesModel listingComments when additionalInsructionsChangesRequired', () => {
      // Set up the service properties BEFORE component initialization
      hearingsService.propertiesUpdatedOnPageVisit = {
        hearingId: 'h000001',
        caseFlags: null,
        parties: null,
        hearingWindow: null,
        afterPageVisit: createMockAfterPageVisit({ additionalInstructionsChangesRequired: true })
      } as any;

      component.hearingCondition = { mode: 'view-edit' };
      component.serviceHearingValuesModel = {
        ...component.serviceHearingValuesModel,
        listingComments: null
      };
      component.hearingRequestMainModel = {
        ...component.hearingRequestMainModel,
        hearingDetails: {
          ...component.hearingRequestMainModel.hearingDetails,
          listingComments: 'Main model comments'
        }
      };

      component.initForm();

      expect(component.instructionsForm.value.instructions).toBeNull();
      expect(component.instructionsFormViewOnly.value.instructionsViewOnly).toBe('Main model comments');
    });

    it('should handle undefined propertiesUpdatedOnPageVisit', () => {
      component.hearingCondition = { mode: 'view-edit' };
      hearingsService.propertiesUpdatedOnPageVisit = undefined;
      component.hearingRequestMainModel = {
        ...component.hearingRequestMainModel,
        hearingDetails: {
          ...component.hearingRequestMainModel.hearingDetails,
          listingComments: 'Main model comments'
        }
      };

      component.initForm();

      expect(component.showReviewBox).toBe(false);
      expect(component.instructionsForm.value.instructions).toBe('Main model comments');
      expect(component.instructionsFormViewOnly).toBeUndefined();
    });
  });

  describe('prepareHearingRequestData', () => {
    it('should set additionalInstructionsChangesConfirmed to true when in VIEW_EDIT mode and additionalInstructionsChangesRequired is true', () => {
      hearingsService.propertiesUpdatedOnPageVisit = {
        hearingId: 'h000001',
        caseFlags: null,
        parties: null,
        hearingWindow: null,
        afterPageVisit: createMockAfterPageVisit({ additionalInstructionsChangesRequired: true })
      } as any;

      fixture.detectChanges();

      component.hearingCondition = { mode: 'view-edit' };
      component.serviceHearingValuesModel = {
        ...component.serviceHearingValuesModel,
        autoListFlag: false
      };
      component.instructionsForm.controls.instructions.setValue('Test instructions');

      component.prepareHearingRequestData();

      expect(hearingsService.propertiesUpdatedOnPageVisit.afterPageVisit.additionalInstructionsChangesConfirmed).toBe(true);
      expect(component.hearingRequestMainModel.hearingDetails.listingComments).toBe('Test instructions');
      expect(component.hearingRequestMainModel.hearingDetails.autolistFlag).toBe(false);
      expect(component.hearingRequestMainModel.hearingDetails.listingAutoChangeReasonCode).toBe('user-added-comments');
    });

    it('should not set additionalInstructionsChangesConfirmed when additionalInstructionsChangesRequired is false', () => {
      hearingsService.propertiesUpdatedOnPageVisit = {
        hearingId: 'h000001',
        caseFlags: null,
        parties: null,
        hearingWindow: null,
        afterPageVisit: createMockAfterPageVisit({ additionalInstructionsChangesRequired: false })
      } as any;

      fixture.detectChanges();

      component.hearingCondition = { mode: 'view-edit' };
      component.serviceHearingValuesModel = {
        ...component.serviceHearingValuesModel,
        autoListFlag: false
      };
      component.instructionsForm.controls.instructions.setValue('Test instructions');

      const originalConfirmedValue = hearingsService.propertiesUpdatedOnPageVisit.afterPageVisit.additionalInstructionsChangesConfirmed;

      component.prepareHearingRequestData();

      expect(hearingsService.propertiesUpdatedOnPageVisit.afterPageVisit.additionalInstructionsChangesConfirmed).toBe(originalConfirmedValue);
      expect(component.hearingRequestMainModel.hearingDetails.listingComments).toBe('Test instructions');
    });

    it('should not set additionalInstructionsChangesConfirmed when not in VIEW_EDIT mode', () => {
      hearingsService.propertiesUpdatedOnPageVisit = {
        hearingId: 'h000001',
        caseFlags: null,
        parties: null,
        hearingWindow: null,
        afterPageVisit: createMockAfterPageVisit({ additionalInstructionsChangesRequired: true })
      } as any;

      fixture.detectChanges();

      component.hearingCondition = { mode: 'create' };
      component.serviceHearingValuesModel = {
        ...component.serviceHearingValuesModel,
        autoListFlag: false
      };
      component.instructionsForm.controls.instructions.setValue('Test instructions');

      const originalConfirmedValue = hearingsService.propertiesUpdatedOnPageVisit.afterPageVisit.additionalInstructionsChangesConfirmed;

      component.prepareHearingRequestData();

      expect(hearingsService.propertiesUpdatedOnPageVisit.afterPageVisit.additionalInstructionsChangesConfirmed).toBe(originalConfirmedValue);
      expect(component.hearingRequestMainModel.hearingDetails.listingComments).toBe('Test instructions');
    });
  });

  afterEach(() => {
    fixture.destroy();
  });
});
