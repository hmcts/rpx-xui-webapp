import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { LoggerService } from '../../services/logger/logger.service';
import { RouterModule } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { Store, StoreModule } from '@ngrx/store';
import { AuthGuard } from '../../services/auth/auth.guard';
import { AuthService } from '../../services/auth/auth.service';
import { ProvidersModule } from '../../providers/providers.module';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';


let mockLoggerService;
describe('AppComponent', () => {
  mockLoggerService = jasmine.createSpyObj('mockLoggerService', ['debug', 'trace', 'info', 'warn', 'error', 'fatal']);
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        StoreModule.forRoot({}),
        ProvidersModule
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      declarations: [
        AppComponent
      ],
      providers: [
        {
          provide: LoggerService, useValue: mockLoggerService
        }
      ]
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
    expect(app.signOut).toBeTruthy();
    expect(mockLoggerService.info).toHaveBeenCalled();
    expect(mockLoggerService.debug).toHaveBeenCalled();
    expect(mockLoggerService.trace).toHaveBeenCalled();
    expect(mockLoggerService.warn).toHaveBeenCalled();
    expect(mockLoggerService.error).toHaveBeenCalled();
    expect(mockLoggerService.fatal).toHaveBeenCalled();
  });


});
