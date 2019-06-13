import { TestBed, async } from '@angular/core/testing';
import { ConsoleLoggerService } from './console-logger.service';
import { NGXLogger } from 'ngx-logger';
import { CookieService } from 'ngx-cookie';
import {StoreModule} from '@ngrx/store';

describe('ConsoleLoggerService', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [StoreModule.forRoot({})],
      providers : [
        { provide: NGXLogger,
          useValue: {
            info(message) {
              return 'test info';
            },
            warn(message) {
              return 'test warning';
            },
            error(message) {
              return 'test error';
            }
          }
        },
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
});
