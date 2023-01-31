import { TestBed, fakeAsync } from '@angular/core/testing';
import { FeatureToggleService } from '@hmcts/rpx-xui-common-lib';
import { of } from 'rxjs';
import { ApplicationRoutingComponent } from './application-routing.component';

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
    component = new ApplicationRoutingComponent(router, mockStore, featureToggleMock);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call navigateBasedOnUserRole on ngOnInit', () => {
    spyOn(component, 'navigateBasedOnUserRole');
    component.ngOnInit();
    expect(component.navigateBasedOnUserRole).toHaveBeenCalled();
  });

  it('should navigateBasedOnUserRole caseworker-civil', () => {
    featureToggleMock.getValueOnce.and.returnValue(of(true));
    mockStore.pipe.and.returnValue(of({userInfo: {roles: ['caseworker-civil']}}));
    component.navigateBasedOnUserRole();
    expect(router.navigate).toHaveBeenCalledWith([ApplicationRoutingComponent.defaultWAPage]);
  });

  it('should navigateBasedOnUserRole caseworker-ia-iacjudge', fakeAsync(async () => {
    featureToggleMock.getValueOnce.and.returnValue(of(true));
    mockStore.pipe.and.returnValue(of({userInfo: {roles: ['caseworker-ia-iacjudge']}}));
    component.navigateBasedOnUserRole();
    expect(router.navigate).toHaveBeenCalledWith([ApplicationRoutingComponent.defaultWAPage]);
  }));

  it('should navigateBasedOnUserRole caseworker-civil', () => {
    featureToggleMock.getValueOnce.and.returnValue(of(true));
    mockStore.pipe.and.returnValue(of({userInfo: {roles: ['caseworker-civil']}}));
    component.navigateBasedOnUserRole();
    expect(router.navigate).toHaveBeenCalledWith([ApplicationRoutingComponent.defaultWAPage]);
  });

  it('should navigateBasedOnUserRole caseworker-ia-caseofficer', fakeAsync(async ()  => {
    featureToggleMock.getValueOnce.and.returnValue(of(true));
    mockStore.pipe.and.returnValue(of({userInfo: {roles: ['caseworker-ia-caseofficer']}}));
    component.navigateBasedOnUserRole();
    expect(router.navigate).toHaveBeenCalledWith([ApplicationRoutingComponent.defaultWAPage]);
  }));

  it('should navigateBasedOnUserRole non judge role', () => {
    mockStore.pipe.and.returnValue(of({userInfo: {roles: ['somerole']}}));
    component.navigateBasedOnUserRole();
    expect(router.navigate).toHaveBeenCalledWith([ApplicationRoutingComponent.defaultPage]);
  });

  it('should navigateBasedOnUserRole pui-case-manager', fakeAsync(async ()  => {
    mockStore.pipe.and.returnValue(of({userInfo: {roles: ['pui-case-manager']}}));
    component.navigateBasedOnUserRole();
    expect(router.navigate).toHaveBeenCalledWith([ApplicationRoutingComponent.defaultPage]);
  }));
});
