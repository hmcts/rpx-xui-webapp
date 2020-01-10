import {TestBed, async, inject} from '@angular/core/testing';
import { AppComponent } from './app.component';
import { StoreModule, Store } from '@ngrx/store';
import { reducers} from 'src/app/store';
import * as fromStore from '../../store'
import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import { cold } from 'jasmine-marbles';
import { RouterTestingModule } from '@angular/router/testing';
import { windowToken } from '@hmcts/rpx-xui-common-lib';
import {HeaderComponent} from '../../components';
import {IdleService} from '../../services/idle/idle.services';
import {Idle, LocalStorageExpiry} from '@ng-idle/core';
import {HttpClient, HttpClientModule} from '@angular/common/http';

const mockedServoces = { init: () => {}}
const windowMock: Window = { gtag: () => {}} as any;
describe('AppComponent', () => {
  let store: Store<fromStore.State>;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        HeaderComponent
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      imports: [
        RouterTestingModule,
        HttpClientModule,
        StoreModule.forRoot(
          {
            ...reducers,
          })
      ],
      providers: [
        {
          provide: IdleService,
          useValue: mockedServoces
        },
        {
          provide: Idle,
          useValue: mockedServoces
        },
        {
          provide: windowToken,
          useValue: windowMock
        },
        {
          provide: LocalStorageExpiry,
          useValue: windowMock
        },
      ],
    }).compileComponents();
    store = TestBed.get(Store);

    spyOn(store, 'dispatch').and.callThrough();
  }));

  it('should create the app', async(inject([Idle, LocalStorageExpiry], (idle: Idle, exp: LocalStorageExpiry)  => {
    const fixture = TestBed.createComponent(AppComponent);

    const app = fixture.debugElement.componentInstance;
    fixture.detectChanges();
    expect(app).toBeTruthy();
  })));

  // it('should have pageTitle$ Observable the app', async(() => {
  //   const fixture = TestBed.createComponent(AppComponent);
  //   const app = fixture.componentInstance;
  //   fixture.detectChanges();
  //
  //   const expected = cold('a', { a: '' });
  //   expect(app.pageTitle$).toBeObservable(expected);
  //
  // }));
  //
  //
  // it('should have appHeaderTitle$ Observable the app', async(() => {
  //   const fixture = TestBed.createComponent(AppComponent);
  //   const app = fixture.componentInstance;
  //   fixture.detectChanges();
  //
  //   const expected = cold('a', { a: undefined });
  //   expect(app.appHeaderTitle$).toBeObservable(expected);
  //
  // }));
  //
  // it('should have userNav$ Observable the app', async(() => {
  //   const fixture = TestBed.createComponent(AppComponent);
  //   const app = fixture.componentInstance;
  //   fixture.detectChanges();
  //
  //   const expected = cold('a', { a: [] });
  //   expect(app.userNav$).toBeObservable(expected);
  //
  // }));
  //
  //
  // it('should have navItems$ Observable the app', async(() => {
  //   const fixture = TestBed.createComponent(AppComponent);
  //   const app = fixture.componentInstance;
  //   fixture.detectChanges();
  //   const navItems = [
  //     {
  //       text: 'Organisation',
  //       href: '/organisation',
  //       active: true
  //     },
  //     {
  //       text: 'Users',
  //       href: '/users',
  //       active: false
  //     }];
  //   const expected = cold('a', { a: { navItems: [] } });
  //   expect(app.navItems$).toBeObservable(expected);
  //
  // }));
  //
  // it('should dispatch a logout action', async(() => {
  //   const fixture = TestBed.createComponent(AppComponent);
  //   const app = fixture.componentInstance;
  //   app.onNavigate('signed-out');
  //   fixture.detectChanges();
  //
  //   expect(store.dispatch).toHaveBeenCalledWith(new Logout());
  //
  // }));

});
