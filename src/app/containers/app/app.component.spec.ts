import {TestBed, async, inject} from '@angular/core/testing';
import { AppComponent } from './app.component';
import { StoreModule, Store } from '@ngrx/store';
import {GetUserDetails, Logout, reducers, SetModal} from 'src/app/store';
import * as fromStore from '../../store'
import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import { cold } from 'jasmine-marbles';
import { RouterTestingModule } from '@angular/router/testing';
import {ManageSessionServices, windowToken} from '@hmcts/rpx-xui-common-lib';
import {HeaderComponent} from '../../components';
import {Idle, LocalStorageExpiry} from '@ng-idle/core';
import { HttpClientModule} from '@angular/common/http';
import {Keepalive} from '@ng-idle/keepalive';

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
        ManageSessionServices,
        Keepalive,
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

  it('should have modalData$ Observable the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    fixture.detectChanges();

    const expected = cold('a', { a: { isVisible: false, countdown: '' } });
    expect(app.modalData$).toBeObservable(expected);

  }));

  it('should dispatch a setmodal action', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    app.onStaySignedIn();
    fixture.detectChanges();
    const payload = {
      session : {
        isVisible: false
      }
    };
    expect(store.dispatch).toHaveBeenCalledWith(new SetModal(payload));

  }));

  it('should dispatch a onNavigate logout action', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    app.onNavigate('signed-out');
    fixture.detectChanges();
    expect(store.dispatch).toHaveBeenCalledWith(new Logout());
  }));

  it('should dispatch a ngOnInit', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    app.ngOnInit();
    fixture.detectChanges();
    expect(store.dispatch).toHaveBeenCalledWith(new GetUserDetails());
  }));

});
