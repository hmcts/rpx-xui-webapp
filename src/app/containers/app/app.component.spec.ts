import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { LoggerService } from '../../services/logger/logger.service';
import { RouterModule } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { StoreModule } from '@ngrx/store';
import { ProvidersModule } from 'src/app/providers/providers.module';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import {SharedModule} from '../../shared/shared.module';
import {LoggerConfig, LoggerModule} from 'ngx-logger';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        StoreModule.forRoot({}),
        ProvidersModule,
        SharedModule,
        LoggerModule
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      declarations: [
        AppComponent
      ],
      providers: [
        LoggerConfig,
        {
          provide: LoggerService,
          useValue: {
            info: () => {
              return 'test info';
            },
            warn: () => {
              return 'test warning';
            },
            error: () => {
              return 'test error';
            }
          }
        }
      ]
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should have on navigate', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.onNavigate).toBeTruthy();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.componentName).toBe('App Component');
  });


});
