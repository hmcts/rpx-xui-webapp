import { throwError } from 'rxjs';
import { CancelHearingComponent } from '../containers/cancel-hearing/cancel-hearing.component';
import { HearingActualsTimingComponent } from '../containers/hearing-actuals/hearing-actuals-timing/hearing-actuals-timing.component';
import { HearingActualsViewEditPartiesComponent } from '../containers/hearing-actuals/hearing-actuals-view-edit-parties/hearing-actuals-view-edit-parties.component';
import { HowLinkedHearingsBeHeardComponent } from '../containers/linked-hearings/linked-hearings-how-to-heard/linked-hearings-how-to-heard.component';
import { RequestHearingComponent } from '../containers/request-hearing/request-hearing.component';
import { ACTION } from '../models/hearings.enum';
import { HearingsUtils } from '../utils/hearings.utils';
import { HearingsService } from './hearings.service';
import { HearingsTelemetryService } from './hearings-telemetry.service';

// Exercise the real handlers without rendering unrelated shared-library widgets.
describe('Hearings action telemetry handlers', () => {
  let bridge: HearingsService;
  let telemetry: jasmine.SpyObj<HearingsTelemetryService>;

  beforeEach(() => {
    telemetry = jasmine.createSpyObj('telemetry', ['recordAction', 'recordValidationFailure']);
    bridge = new HearingsService(jasmine.createSpyObj('http', ['post']), telemetry);
  });

  it('should keep cancellation blocked on invalid input and record one safe validation event', () => {
    const component = Object.create(CancelHearingComponent.prototype) as CancelHearingComponent;
    Object.assign(component, {
      hearingsService: bridge,
      validationErrors: [{ id: 'private-case', message: 'private-name' }],
      isFormValid: () => false,
    });
    const api = spyOn(bridge, 'cancelHearingRequest');
    component.executeContinue();
    expect(api).not.toHaveBeenCalled();
    expect(telemetry.recordAction).toHaveBeenCalledOnceWith('submit');
    expect(telemetry.recordValidationFailure).toHaveBeenCalledOnceWith('form', 1);
    expect(JSON.stringify(telemetry.recordValidationFailure.calls.allArgs())).not.toContain('private-');
  });

  it('should keep cancellation payloads and API error handling unchanged, without a false validation event', () => {
    const component = Object.create(CancelHearingComponent.prototype) as CancelHearingComponent;
    const reasons = [
      {
        key: 'private-reason',
        value_en: 'private-form-value',
        category_key: '',
        value_cy: '',
        hint_text_en: '',
        hint_text_cy: '',
        lov_order: 1,
        parent_category: '',
        parent_key: '',
        active_flag: 'Y',
      },
    ];
    Object.assign(component, {
      hearingsService: bridge,
      hearingId: 'private-hearing',
      caseId: 'private-case',
      validationErrors: [],
      cancelActioned: true,
      isFormValid: () => true,
      getChosenReasons: () => reasons,
    });
    const api = spyOn(bridge, 'cancelHearingRequest').and.returnValue(throwError(() => new Error('private-response')));
    component.executeContinue();
    expect(api).toHaveBeenCalledOnceWith('private-hearing', 'private-case', reasons);
    expect(component.cancelActioned).toBeFalse();
    expect(component.validationErrors[0].id).toBe('cancel-request-error');
    expect(telemetry.recordAction).toHaveBeenCalledOnceWith('submit');
    expect(telemetry.recordValidationFailure).not.toHaveBeenCalled();
  });

  it('should not dispatch linked-hearing data when grouping validation fails', () => {
    const component = Object.create(HowLinkedHearingsBeHeardComponent.prototype) as HowLinkedHearingsBeHeardComponent;
    const store = jasmine.createSpyObj('store', ['dispatch']);
    Object.assign(component, {
      hearingsService: bridge,
      hearingStore: store,
      validationErrors: [{ message: 'private-form-value' }],
      isFormValid: () => false,
    });
    component.onSubmit();
    expect(store.dispatch).not.toHaveBeenCalled();
    expect(telemetry.recordAction).toHaveBeenCalledOnceWith('continue');
    expect(telemetry.recordValidationFailure).toHaveBeenCalledOnceWith('form', 1);
  });

  it('should retain actuals timing validation while never forwarding the form value or error message', () => {
    const component = Object.create(HearingActualsTimingComponent.prototype) as HearingActualsTimingComponent;
    Object.assign(component, {
      hearingsService: bridge,
      formGroup: { errors: { private: 'private-form-value' } },
      setErrors: () => {
        component.errors = [{ message: 'private-message' }];
      },
    });
    component.onSubmit({ startTime: 'private-time' }, false);
    expect(component.submitted).toBeTrue();
    expect(telemetry.recordAction).toHaveBeenCalledOnceWith('continue');
    expect(telemetry.recordValidationFailure).toHaveBeenCalledOnceWith('form', 1);
    expect(JSON.stringify(telemetry.recordValidationFailure.calls.allArgs())).not.toContain('private-');
  });

  it('should block invalid parties without logging party details', () => {
    const component = Object.create(HearingActualsViewEditPartiesComponent.prototype) as HearingActualsViewEditPartiesComponent;
    const store = jasmine.createSpyObj('store', ['dispatch']);
    Object.assign(component, {
      hearingsService: bridge,
      hearingStore: store,
      displayErrors: () => {
        component.errors = [{ message: 'private-party-name' }];
      },
    });
    component.submitForm({ parties: [] }, false);
    expect(store.dispatch).not.toHaveBeenCalled();
    expect(component.submitted).toBeTrue();
    expect(telemetry.recordValidationFailure).toHaveBeenCalledOnceWith('form', 1);
  });

  it('should record a rejected submission once while preserving the mismatch guard', () => {
    const component = Object.create(RequestHearingComponent.prototype) as RequestHearingComponent;
    Object.assign(component, { hearingsService: bridge });
    spyOn(HearingsUtils, 'checkHearingConsistency').and.returnValue(false);
    const received = jasmine.createSpy('received');
    const subscription = bridge.navigateAction$.subscribe(received);
    component.submitRequest(ACTION.SUBMIT);
    expect(received).not.toHaveBeenCalled();
    expect(component.showMismatchErrorMessage).toBeTrue();
    expect(telemetry.recordAction).toHaveBeenCalledOnceWith('submit');
    expect(telemetry.recordValidationFailure).toHaveBeenCalledOnceWith('case-context-mismatch', 1);
    subscription.unsubscribe();
  });
});
