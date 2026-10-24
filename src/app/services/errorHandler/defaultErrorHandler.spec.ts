import { DefaultErrorHandler } from './defaultErrorHandler';
import { HearingsTelemetryService } from '../../../hearings/services/hearings-telemetry.service';

describe('Default Error Handler', () => {
  const mockedLoggerService = jasmine.createSpyObj('mockedLoggerService', ['error']);
  let consoleError: jasmine.Spy;
  let previousConsoleError: typeof console.error;
  beforeEach(() => {
    mockedLoggerService.error.calls.reset();
    previousConsoleError = console.error;
    consoleError = jasmine.createSpy('console.error');
    console.error = consoleError;
  });
  afterEach(() => {
    console.error = previousConsoleError;
  });

  it('Should call Default Error Handler and be returned a DEH instance', () => {
    const errorHandler = new DefaultErrorHandler(mockedLoggerService);
    expect(errorHandler).toBeTruthy();
  });

  it('should be able to call error', () => {
    const errorHandler = new DefaultErrorHandler(mockedLoggerService);
    errorHandler.handleError(new Error('Some Error Message'));
    expect(mockedLoggerService.error).toHaveBeenCalledWith(new Error('Some Error Message'));
  });

  it('should send the original Hearings browser exception without duplicate legacy logging', () => {
    const report = jasmine.createSpy('report');
    const telemetry: jasmine.SpyObj<HearingsTelemetryService> = jasmine.createSpyObj('telemetry', ['captureException'], {
      currentJourney: { journeyId: 'anonymous', journeyType: 'request', currentStep: '/hearings/request', actionCount: 0 },
    });
    telemetry.captureException.and.returnValue(report);
    const error = new TypeError('original');
    const stack = error.stack;
    new DefaultErrorHandler(mockedLoggerService, telemetry).handleError(error);
    expect(telemetry.captureException).toHaveBeenCalledOnceWith('browser');
    expect(report).toHaveBeenCalledOnceWith(error);
    expect(report.calls.first().args[0]).toBe(error);
    expect(error.stack).toBe(stack);
    expect(mockedLoggerService.error).not.toHaveBeenCalled();
    expect(consoleError).not.toHaveBeenCalled();
  });

  it('does not dump resolver errors or navigation state before the Hearings page is entered', () => {
    const report = jasmine.createSpy('report');
    const telemetry = jasmine.createSpyObj<HearingsTelemetryService>('telemetry', ['captureException'], {
      currentJourney: null,
      requestJourneyId: 'a'.repeat(32),
    });
    telemetry.captureException.and.returnValue(report);
    const error = Object.assign(new Error('private-message'), {
      error: { caseName: 'private-name', formValue: 'private-form' },
      navigationState: { caseId: 'private-case', hearingId: 'private-hearing' },
    });
    const stack = error.stack;
    new DefaultErrorHandler(mockedLoggerService, telemetry).handleError(error);
    expect(report).toHaveBeenCalledOnceWith(error);
    expect(report.calls.first().args[0]).toBe(error);
    expect(error.stack).toBe(stack);
    expect(consoleError).not.toHaveBeenCalled();
    expect(mockedLoggerService.error).not.toHaveBeenCalled();
  });

  ['initialization', 'reporting'].forEach((failure) => {
    it(`does not fall back to raw console or legacy logging when Hearings telemetry ${failure} fails`, () => {
      const telemetry = jasmine.createSpyObj<HearingsTelemetryService>('telemetry', ['captureException'], {
        currentJourney: null,
        requestJourneyId: 'a'.repeat(32),
      });
      if (failure === 'initialization') {
        telemetry.captureException.and.throwError('Telemetry unavailable');
      } else {
        telemetry.captureException.and.returnValue(() => {
          throw new Error('Reporting failed');
        });
      }
      const handler = new DefaultErrorHandler(mockedLoggerService, telemetry);
      expect(() => handler.handleError(new Error('private-error'))).not.toThrow();
      expect(consoleError).not.toHaveBeenCalled();
      expect(mockedLoggerService.error).not.toHaveBeenCalled();
    });
  });

  it('preserves the original non-Hearings logging when there is no active or prepared journey', () => {
    const telemetry = jasmine.createSpyObj<HearingsTelemetryService>('telemetry', ['captureException'], {
      currentJourney: null,
      requestJourneyId: null,
    });
    const error = new Error('Original non-Hearings error');
    new DefaultErrorHandler(mockedLoggerService, telemetry).handleError(error);
    expect(consoleError.calls.allArgs()).toEqual([['Handling error with DefaultErrorHandler.'], [error]]);
    expect(mockedLoggerService.error).toHaveBeenCalledOnceWith(error);
    expect(telemetry.captureException).not.toHaveBeenCalled();
  });
});
