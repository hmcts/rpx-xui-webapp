import { ApplicationRoutingComponent } from './application-routing.component';
import { FeatureToggleService } from '@hmcts/rpx-xui-common-lib';
import { of } from 'rxjs';
import { TestBed } from '@angular/core/testing';

describe('ApplicationRoutingComponent', () => {
  let component: ApplicationRoutingComponent;
  let router;
  let waFeatureService;
  let mockStore;
  const featureToggleMock = jasmine.createSpyObj('featureToggleService', ['isEnabled', 'getValueOnce']);
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: FeatureToggleService, useValue: featureToggleMock }
      ]
    }).compileComponents();
    router = jasmine.createSpyObj('router', ['navigate']);
    waFeatureService = jasmine.createSpyObj('service', ['getActiveWAFeature']);
    mockStore = jasmine.createSpyObj('store', ['pipe']);
    router.url = '/';
    featureToggleMock.isEnabled.and.returnValue(of(true));
    component = new ApplicationRoutingComponent(router, waFeatureService, mockStore, featureToggleMock);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should navigateUrlBasedOnFeatureToggle WorkAllocationRelease1', () => {
    component.navigateUrlBasedOnFeatureToggle('WorkAllocationRelease1');
    expect(router.navigate).toHaveBeenCalledWith([ApplicationRoutingComponent.defaultPage]);
  });

  it('should navigateUrlBasedOnFeatureToggle booking Url', async () => {
    featureToggleMock.getValueOnce.and.returnValue(of(true));
    mockStore.pipe.and.returnValue( of( { userInfo: { roles: ['caseworker-ia-iacjudge'], roleCategory: 'JUDICIAL' },
    roleAssignmentInfo: [
      {
          bookable: true,
          substantive: 'N',
          jurisdiction: 'IA',
          isCaseAllocator: true
      }
    ]}));
    component.navigateUrlBasedOnFeatureToggle('WorkAllocationRelease2');
    expect(router.navigate).toHaveBeenCalledWith([ApplicationRoutingComponent.bookingUrl]);
  });

  it('should navigateUrlBasedOnFeatureToggle WorkAllocationRelease2', async () => {
    featureToggleMock.getValueOnce.and.returnValue(of(true));
    mockStore.pipe.and.returnValue(of({userInfo: {roles: ['caseworker-ia-iacjudge']}}));
    component.navigateUrlBasedOnFeatureToggle('WorkAllocationRelease2');
    expect(router.navigate).toHaveBeenCalledWith([ApplicationRoutingComponent.defaultWAPage]);
  });

  it('should navigateBasedOnUserRole caseworker-ia-iacjudge', async () => {
    featureToggleMock.getValueOnce.and.returnValue(of(true));
    mockStore.pipe.and.returnValue(of({userInfo: {roles: ['caseworker-ia-iacjudge']}}));
    component.navigateBasedOnUserRole();
    expect(router.navigate).toHaveBeenCalledWith([ApplicationRoutingComponent.defaultWAPage]);
  });

  it('should navigateBasedOnUserRole caseworker-civil', () => {
    featureToggleMock.getValueOnce.and.returnValue(of(true));
    mockStore.pipe.and.returnValue(of({userInfo: {roles: ['caseworker-civil']}}));
    component.navigateBasedOnUserRole();
    expect(router.navigate).toHaveBeenCalledWith([ApplicationRoutingComponent.defaultWAPage]);
  });

  it('should navigateBasedOnUserRole caseworker-ia-caseofficer', async () => {
    featureToggleMock.getValueOnce.and.returnValue(of(true));
    mockStore.pipe.and.returnValue(of({userInfo: {roles: ['caseworker-ia-caseofficer']}}));
    component.navigateBasedOnUserRole();
    expect(router.navigate).toHaveBeenCalledWith([ApplicationRoutingComponent.defaultWAPage]);
  });

  it('should navigateBasedOnUserRole non judge role', () => {
    mockStore.pipe.and.returnValue(of({userInfo: {roles: ['somerole']}}));
    component.navigateBasedOnUserRole();
    expect(router.navigate).toHaveBeenCalledWith([ApplicationRoutingComponent.defaultPage]);
  });
});
