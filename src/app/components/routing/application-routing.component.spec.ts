import { fakeAsync, TestBed, tick } from '@angular/core/testing';
import { FeatureToggleService } from '@hmcts/rpx-xui-common-lib';
import { of } from 'rxjs';
import { AppTestConstants } from '../../../app/app.test-constants.spec';
import { ApplicationRoutingComponent } from './application-routing.component';
import { WALandingPageRoles } from 'src/work-allocation/models/common/service-config.model';

describe('ApplicationRoutingComponent', () => {
  let component: ApplicationRoutingComponent;
  let router;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  let waFeatureService;
  let mockStore: any;
  const featureToggleMock = jasmine.createSpyObj('featureToggleService', ['isEnabled', 'getValueOnce', 'getValue']);

  const setLandingRoles = (roles: string[]) => {
    (component as any).waLandingPageRoles$ = of({ roles } as WALandingPageRoles);
  };

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
    // default roles (empty) unless a test overrides
    setLandingRoles([]);
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
    setLandingRoles(['caseworker-ia']);
    mockStore.pipe.and.returnValue(of({ userInfo: { roles: ['caseworker-civil'] } }));
    router.url = '/something';
    component.ngOnInit();
    expect(router.navigate).not.toHaveBeenCalled();
  });

  it('should call navigateBasedOnUserRole on ngOnInit and call booking url', () => {
    featureToggleMock.getValueOnce.and.returnValue(of(true));
    setLandingRoles(['caseworker-ia']);
    mockStore.pipe.and.returnValue(of({ userInfo: { roleCategory: 'JUDICIAL' }, roleAssignmentInfo: [{ bookable: true }] }));
    component.ngOnInit();
    expect(router.navigate).toHaveBeenCalledWith([ApplicationRoutingComponent.bookingUrl]);
  });

  it('should navigateBasedOnUserRole caseworker-civil', () => {
    featureToggleMock.getValueOnce.and.returnValue(of(true));
    setLandingRoles(['caseworker-ia']); // no civil
    mockStore.pipe.and.returnValue(of({ userInfo: { roles: ['caseworker-civil'] } }));
    component.navigateBasedOnUserRole();
    expect(router.navigate).toHaveBeenCalledWith([ApplicationRoutingComponent.defaultPage]);
  });

  it('should navigateBasedOnUserRole caseworker-ia-iacjudge', fakeAsync(async () => {
    featureToggleMock.getValueOnce.and.returnValue(of(true));
    setLandingRoles([AppTestConstants.IA_JUDGE_ROLE]);
    mockStore.pipe.and.returnValue(of({ userInfo: { roles: [AppTestConstants.IA_JUDGE_ROLE] } }));
    component.navigateBasedOnUserRole();
    tick();
    expect(router.navigate).toHaveBeenCalledWith([ApplicationRoutingComponent.defaultWAPage]);
  }));

  it('should navigateBasedOnUserRole caseworker-civil', () => {
    featureToggleMock.getValueOnce.and.returnValue(of(true));
    setLandingRoles(['caseworker-civil']);
    mockStore.pipe.and.returnValue(of({ userInfo: { roles: ['caseworker-civil'] } }));
    component.navigateBasedOnUserRole();
    expect(router.navigate).toHaveBeenCalledWith([ApplicationRoutingComponent.defaultWAPage]);
  });

  it('should navigateBasedOnUserRole caseworker-ia-caseofficer', fakeAsync(async () => {
    featureToggleMock.getValueOnce.and.returnValue(of(true));
    setLandingRoles(['caseworker-ia', 'caseworker-civil']);
    mockStore.pipe.and.returnValue(of({ userInfo: { roles: ['caseworker-civil'] } }));
    component.navigateBasedOnUserRole();
    expect(router.navigate).toHaveBeenCalledWith([ApplicationRoutingComponent.defaultWAPage]);
  }));

  it('should navigateBasedOnUserRole caseworker-ia-caseofficer', fakeAsync(async () => {
    featureToggleMock.getValueOnce.and.returnValue(of(true));
    setLandingRoles([AppTestConstants.IA_LEGAL_OPS_ROLE]);
    mockStore.pipe.and.returnValue(of({ userInfo: { roles: [AppTestConstants.IA_LEGAL_OPS_ROLE] } }));
    component.navigateBasedOnUserRole();
    tick();
    expect(router.navigate).toHaveBeenCalledWith([ApplicationRoutingComponent.defaultWAPage]);
  }));

  it('should navigateBasedOnUserRole non judge role', () => {
    setLandingRoles(['caseworker-is']);
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
