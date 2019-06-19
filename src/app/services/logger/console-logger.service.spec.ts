import { TestBed, async } from '@angular/core/testing';
import { ConsoleLoggerService } from './console-logger.service';
import { NGXLogger } from 'ngx-logger';
import { CookieService } from 'ngx-cookie';
import {StoreModule} from '@ngrx/store';

let mockNGXLogger;
describe('ConsoleLoggerService', () => {
  mockNGXLogger = jasmine.createSpyObj('mockNGXLogger', ['trace', 'debug', 'info', 'log', 'warn', 'error', 'fatal', 'setCustomHttpHeaders',
'setCustomParams', 'registerMonitor', 'updateConfig', 'getConfigSnapshot']);
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [StoreModule.forRoot({})],
      providers : [
        { provide: NGXLogger, useValue: mockNGXLogger },
      { provide: CookieService,
        useValue: {
          get(key) {
            return 'some value for key';
          }
        }
      }]
    }).compileComponents();
  }));

  it('should be created', () => {
    const service: ConsoleLoggerService = TestBed.get(ConsoleLoggerService);
    expect(service).toBeTruthy();
  });

  it('should have called NGX Logger Debug', () => {
    const service: ConsoleLoggerService = TestBed.get(ConsoleLoggerService);
    service.debug('some message');
    expect(mockNGXLogger.debug).toHaveBeenCalled();
  });
  it('should have called NGX Logger Info', () => {
    const service: ConsoleLoggerService = TestBed.get(ConsoleLoggerService);
    service.info('some message');
    expect(mockNGXLogger.info).toHaveBeenCalled();
  });
  it('should have called NGX Logger fatal', () => {
    const service: ConsoleLoggerService = TestBed.get(ConsoleLoggerService);
    service.fatal('some message');
    expect(mockNGXLogger.fatal).toHaveBeenCalled();
  });
  it('should have called NGX Logger trace', () => {
    const service: ConsoleLoggerService = TestBed.get(ConsoleLoggerService);
    service.trace('some message');
    expect(mockNGXLogger.trace).toHaveBeenCalled();
  });
  it('should have called NGX Logger warn', () => {
    const service: ConsoleLoggerService = TestBed.get(ConsoleLoggerService);
    service.warn('some message');
    expect(mockNGXLogger.warn).toHaveBeenCalled();
  });
  it('should have called NGX Logger error', () => {
    const service: ConsoleLoggerService = TestBed.get(ConsoleLoggerService);
    service.error('some message');
    expect(mockNGXLogger.error).toHaveBeenCalled();
  });
});
