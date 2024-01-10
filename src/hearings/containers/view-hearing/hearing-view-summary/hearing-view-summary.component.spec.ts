import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { FeatureToggleService } from '@hmcts/rpx-xui-common-lib';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { UserDetails } from '../../../../app/models';
import * as fromAppStore from '../../../../app/store';
import { HEARING_REQUEST_VIEW_SUMMARY_TEMPLATE } from '../../../../hearings/templates/hearing-request-view-summary.template';
import { HEARING_VIEW_ONLY_SUMMARY_TEMPLATE } from '../../../../hearings/templates/hearing-view-only-summary.template';
import { HearingsService } from '../../../services/hearings.service';
import { HearingViewSummaryComponent } from './hearing-view-summary.component';

describe('HearingViewSummaryComponent', () => {
  let component: HearingViewSummaryComponent;
  let fixture: ComponentFixture<HearingViewSummaryComponent>;
  let storeMock: jasmine.SpyObj<Store<fromAppStore.State>>;
  let featureToggleServiceMock: any;
  let routerMock: any;

  const USER: UserDetails = {
    canShareCases: true,
    sessionTimeout: {
      idleModalDisplayTime: 10,
      totalIdleTime: 50
    },
    userInfo: {
      id: '41a90c39-d756-4eba-8e85-5b5bf56b31f5',
      forename: 'Luke',
      surname: 'Wilson',
      email: 'lukesuperuserxui@mailnesia.com',
      active: true,
      roles: [
        'caseworker',
        'caseworker-sscs'
      ]
    }
  };

  const httpClientMock = jasmine.createSpyObj('HttpClient', ['get', 'post', 'delete']);
  const hearingsService = new HearingsService(httpClientMock);

  beforeEach(() => {
    storeMock = jasmine.createSpyObj<Store<fromAppStore.State>>('store', ['pipe']);
    featureToggleServiceMock = jasmine.createSpyObj('featureToggleService', ['isEnabled']);
    routerMock = jasmine.createSpyObj('Router', ['navigateByUrl']);
    TestBed.configureTestingModule({
      declarations: [HearingViewSummaryComponent],
      imports: [RouterTestingModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [
        {
          provide: Store,
          useValue: storeMock
        },
        {
          provide: Router,
          useValue: routerMock
        },
        {
          provide: FeatureToggleService,
          useValue: featureToggleServiceMock
        },
        {
          provide: HearingsService,
          useValue: hearingsService
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(HearingViewSummaryComponent);
    component = fixture.componentInstance;
    storeMock.pipe.and.returnValue(of(USER));
    featureToggleServiceMock.isEnabled.and.returnValue(of(false));
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set new template if the feature toggle is off and user is not hearing manager', () => {
    component.ngOnInit();
    expect(component.template).toBe(HEARING_VIEW_ONLY_SUMMARY_TEMPLATE);
  });

  it('should set new template if the feature toggle is on and user is hearing manager', () => {
    USER.userInfo.roles.push('hearing-manager');
    featureToggleServiceMock.isEnabled.and.returnValue(of(true));
    fixture.detectChanges();
    component.ngOnInit();
    expect(component.template).toBe(HEARING_REQUEST_VIEW_SUMMARY_TEMPLATE);
  });

  it('should navigate to edit hearing page', () => {
    component.onEdit();
    expect(routerMock.navigateByUrl).toHaveBeenCalled();
  });

  afterEach(() => {
    fixture.destroy();
  });
});
