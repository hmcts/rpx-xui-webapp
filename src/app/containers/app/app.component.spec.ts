import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { LoggerService } from '../../services/logger/logger.service';
import { RouterModule } from '@angular/router';
import { ROUTES } from '../../app.routes';
import { RouterTestingModule } from '@angular/router/testing';
import { Store, StoreModule } from '@ngrx/store';
import { AuthGuard } from '../../services/auth/auth.guard';
import { AuthService } from '../../services/auth/auth.service';
import { ProvidersModule } from '../../providers/providers.module';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        StoreModule.forRoot({}),
        ProvidersModule
      ],
      declarations: [
        AppComponent
      ],
      providers: [
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
    expect(app.signOut).toBeTruthy();
  });


});
