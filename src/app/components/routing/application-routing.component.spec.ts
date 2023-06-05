import { fakeAsync, TestBed } from '@angular/core/testing';
import { FeatureToggleService } from '@hmcts/rpx-xui-common-lib';
import { of } from 'rxjs';
import { ApplicationRoutingComponent } from './application-routing.component';

describe('ApplicationRoutingComponent', () => {
  let component: ApplicationRoutingComponent;
  let router;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  let waFeatureService;
  let mockStore: any;
  const featureToggleMock = jasmine.createSpyObj('featureToggleService', ['isEnabled', 'getValueOnce', 'getValue']);

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

  it('should call navigateBasedOnUserRole on ngOnInit and return nothing', () => {
    featureToggleMock.getValueOnce.and.returnValue(of(true));
    featureToggleMock.getValue.and.returnValue(of({ roles: ['caseworker-ia'] }));
    mockStore.pipe.and.returnValue(of({ userInfo: { roles: ['caseworker-civil'] } }));
    router.url = '/something';
    component.ngOnInit();
    expect(router.navigate).not.toHaveBeenCalled();
  });

  it('should call navigateBasedOnUserRole on ngOnInit and call booking url', () => {
    featureToggleMock.getValueOnce.and.returnValue(of(true));
    featureToggleMock.getValue.and.returnValue(of({ roles: ['caseworker-ia'] }));
    mockStore.pipe.and.returnValue(of({ userInfo: { roleCategory: 'JUDICIAL' }, roleAssignmentInfo: [{ bookable: true }] }));
    component.ngOnInit();
    expect(router.navigate).toHaveBeenCalledWith([ApplicationRoutingComponent.bookingUrl]);
  });

  it('should navigateBasedOnUserRole caseworker-civil', () => {
    featureToggleMock.getValueOnce.and.returnValue(of(true));
    featureToggleMock.getValue.and.returnValue(of({ roles: ['caseworker-ia'] }));
    mockStore.pipe.and.returnValue(of({ userInfo: { roles: ['caseworker-civil'] } }));
    component.navigateBasedOnUserRole();
    expect(router.navigate).toHaveBeenCalledWith([ApplicationRoutingComponent.defaultPage]);
  });

  it('should navigateBasedOnUserRole caseworker-ia-iacjudge', fakeAsync(async () => {
    featureToggleMock.getValueOnce.and.returnValue(of(true));
    featureToggleMock.getValue.and.returnValue(of({ roles: ['caseworker-ia-iacjudge'] }));
    mockStore.pipe.and.returnValue(of({ userInfo: { roles: ['caseworker-ia-iacjudge'] } }));
    component.navigateBasedOnUserRole();
    expect(router.navigate).toHaveBeenCalledWith([ApplicationRoutingComponent.defaultWAPage]);
  }));

  it('should navigateBasedOnUserRole caseworker-civil', () => {
    featureToggleMock.getValueOnce.and.returnValue(of(true));
    mockStore.pipe.and.returnValue(of({ userInfo: { roles: ['caseworker-civil'] } }));
    component.navigateBasedOnUserRole();
    expect(router.navigate).toHaveBeenCalledWith([ApplicationRoutingComponent.defaultPage]);
  });

  it('should navigateBasedOnUserRole caseworker-ia-caseofficer', fakeAsync(async () => {
    featureToggleMock.getValueOnce.and.returnValue(of(true));
    featureToggleMock.getValue.and.returnValue(of({ roles: ['caseworker-ia', 'caseworker-civil'] }));
    mockStore.pipe.and.returnValue(of({ userInfo: { roles: ['caseworker-civil'] } }));
    component.navigateBasedOnUserRole();
    expect(router.navigate).toHaveBeenCalledWith([ApplicationRoutingComponent.defaultWAPage]);
  }));

  it('should navigateBasedOnUserRole caseworker-ia-caseofficer', fakeAsync(async () => {
    featureToggleMock.getValueOnce.and.returnValue(of(true));
    featureToggleMock.getValue.and.returnValue(of({ roles: ['caseworker-ia-caseofficer'] }));
    mockStore.pipe.and.returnValue(of({ userInfo: { roles: ['caseworker-ia-caseofficer'] } }));
    component.navigateBasedOnUserRole();
    expect(router.navigate).toHaveBeenCalledWith([ApplicationRoutingComponent.defaultWAPage]);
  }));

  it('should navigateBasedOnUserRole non judge role', () => {
    featureToggleMock.getValue.and.returnValue(of({ roles: ['caseworker-is'] }));
    mockStore.pipe.and.returnValue(of({ userInfo: { roles: ['somerole'] } }));
    component.navigateBasedOnUserRole();
    expect(router.navigate).toHaveBeenCalledWith([ApplicationRoutingComponent.defaultPage]);
  });

  it('should navigateBasedOnUserRole pui-case-manager', fakeAsync(async () => {
    mockStore.pipe.and.returnValue(of({ userInfo: { roles: ['pui-case-manager'] } }));
    component.navigateBasedOnUserRole();
    expect(router.navigate).toHaveBeenCalledWith([ApplicationRoutingComponent.defaultPage]);
  }));
});
