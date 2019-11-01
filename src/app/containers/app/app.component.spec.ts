import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { LoggerService } from '../../services/logger/logger.service';
import { RouterTestingModule } from '@angular/router/testing';
import { StoreModule, Store } from '@ngrx/store';
import { ProvidersModule } from 'src/app/providers/providers.module';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import {SharedModule} from '../../shared/shared.module';
import {LoggerConfig, LoggerModule} from 'ngx-logger';
import { AppConstants } from 'src/app/app.constants';
import * as fromActions from '../../store';
import { WindowToken } from 'src/app/shared/services/window';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let store: Store<fromActions.State>;

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
        },
        {
          provide: WindowToken,
          useValue: {}
        },
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    store = TestBed.get(Store);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should update parameter on ngOnInit', () => {
    const dummyAppHeaderTitle = {name: 'Dummy', url: '/'};
    const dummyNavItems = [{
      text: 'dummy',
      href: '/dummy',
      active: false
    }];
    const dummyUserNav = {
      label: 'dummy',
      items: [{
        text: 'Sign out',
        emit: 'sign-out'
      }]
    };
    AppConstants.APP_HEADER_TITLE = dummyAppHeaderTitle;
    AppConstants.NAV_ITEMS = dummyNavItems;
    AppConstants.USER_NAV = dummyUserNav;
    component.ngOnInit();
    expect(component.appHeaderTitle).toBe(dummyAppHeaderTitle);
    expect(component.navItems).toBe(dummyNavItems);
    expect(component.userNav).toBe(dummyUserNav);
  });

  it('should logout when onNavigate sign-out is called ', () => {
    const spyOnDispatchToStore = spyOn(store, 'dispatch').and.callThrough();
    component.onNavigate('anything');
    expect(spyOnDispatchToStore).toHaveBeenCalledTimes(0);
    component.onNavigate('sign-out');
    expect(spyOnDispatchToStore).toHaveBeenCalledWith(new fromActions.Logout());
  });
});
