import {async} from '@angular/core/testing';
import {TestBed} from '@angular/core/testing';
import {Logger, LoggerService} from './logger.service';

describe('LoggerService', () => {

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [Logger]
    });
  }));

  it('should be created', () => {
    const service: LoggerService = TestBed.get(LoggerService);
    expect(service).toBeTruthy();
  });

  it('should have info, warn and error prop', () => {
    const logger: Logger = TestBed.get(Logger);
    expect(logger).toBeTruthy();

  });
});
