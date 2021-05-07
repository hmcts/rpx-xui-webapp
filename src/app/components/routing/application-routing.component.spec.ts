import { of } from 'rxjs';
import { ApplicationRoutingComponent } from './application-routing.component';

describe('ApplicationRoutingComponent', () => {
  let component: ApplicationRoutingComponent;
  let router;
  let waFeatureService;
  let mockStore;

  beforeEach(() => {
    router = jasmine.createSpyObj('router', ['navigate']);
    waFeatureService = jasmine.createSpyObj('service', ['getActiveWAFeature']);
    mockStore = jasmine.createSpyObj('store', ['pipe']);
    component = new ApplicationRoutingComponent(router, waFeatureService, mockStore);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should navigateUrlBasedOnFeatureToggle WorkAllocationRelease1', () => {
    component.navigateUrlBasedOnFeatureToggle('WorkAllocationRelease1');
    expect(router.navigate).toHaveBeenCalledWith(['/cases']);
  });

  it('should navigateUrlBasedOnFeatureToggle WorkAllocationRelease2', () => {
    mockStore.pipe.and.returnValue(of({userInfo: {roles: ['caseworker-ia-iacjudge']}}));
    component.navigateUrlBasedOnFeatureToggle('WorkAllocationRelease2');
    expect(router.navigate).toHaveBeenCalledWith(['/mywork']);
  });

  it('should navigateBasedOnUserRole judge role', () => {
    mockStore.pipe.and.returnValue(of({userInfo: {roles: ['caseworker-ia-iacjudge']}}));
    component.navigateBasedOnUserRole();
    expect(router.navigate).toHaveBeenCalledWith(['/mywork']);
  });

  it('should navigateBasedOnUserRole judge role', () => {
    mockStore.pipe.and.returnValue(of({userInfo: {roles: ['caseworker-ia-caseofficer']}}));
    component.navigateBasedOnUserRole();
    expect(router.navigate).toHaveBeenCalledWith(['/mywork']);
  });

  it('should navigateBasedOnUserRole non judge role', () => {
    mockStore.pipe.and.returnValue(of({userInfo: {roles: ['somerole']}}));
    component.navigateBasedOnUserRole();
    expect(router.navigate).toHaveBeenCalledWith(['/cases']);
  });
});
