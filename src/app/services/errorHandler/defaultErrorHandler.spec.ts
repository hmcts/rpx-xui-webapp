import { DefaultErrorHandler } from './defaultErrorHandler';
import { HearingsTelemetryService } from '../../../hearings/services/hearings-telemetry.service';

describe('Default Error Handler', () => {
  const mockedLoggerService = jasmine.createSpyObj('mockedLoggerService', ['error']);
  beforeEach(() => mockedLoggerService.error.calls.reset());

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
  });
});
