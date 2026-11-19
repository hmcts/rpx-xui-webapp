import { ErrorHandler } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { Store, StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { DefaultErrorHandler } from '../../app/services/errorHandler/defaultErrorHandler';
import { LoggerService } from '../../app/services/logger/logger.service';
import { MonitoringService } from '../../app/services/logger/monitoring.service';
import { HearingsTelemetryService } from './hearings-telemetry.service';

describe('Hearings telemetry application bootstrap', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [StoreModule.forRoot({}), StoreDevtoolsModule.instrument({ logOnly: true })],
      providers: [
        { provide: ErrorHandler, useClass: DefaultErrorHandler },
        { provide: Window, useValue: window },
        { provide: LoggerService, useValue: jasmine.createSpyObj('LoggerService', ['error']) },
        {
          provide: MonitoringService,
          useValue: jasmine.createSpyObj('MonitoringService', ['logEvent', 'logException', 'captureOperationContext']),
        },
      ],
    });
  });

  it('initializes the real store/devtools and error handler without a circular dependency', () => {
    expect(TestBed.inject(ErrorHandler)).toBeInstanceOf(DefaultErrorHandler);
    const store = TestBed.inject(Store);
    expect(() => store.dispatch({ type: '[Test] Bootstrap completed' })).not.toThrow();
    expect(() =>
      TestBed.inject(HearingsTelemetryService).enterStep('/hearings/request/hearing-stage', { caseId: 'case-a' })
    ).not.toThrow();
  });
});
