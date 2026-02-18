import { Router } from '@angular/router';
import { FeatureToggleService } from '@hmcts/rpx-xui-common-lib';
import { of } from 'rxjs';
import { WorkAllocationAccessGuard } from './wa-access-guard';

describe('WorkAllocationAccessGuard', () => {
  let featureToggleMock: jasmine.SpyObj<FeatureToggleService>;
  let guard: WorkAllocationAccessGuard;
  let routerMock: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    routerMock = jasmine.createSpyObj<Router>('router', ['navigate']);
    guard = new WorkAllocationAccessGuard(featureToggleMock, routerMock);
  });

  it('can activate with feature toggle on', () => {
    const canActivate = guard.canActivate();
    canActivate.subscribe((activate) => expect(activate).toBeTruthy());
  });

  it('navigateUrl false', () => {
    WorkAllocationAccessGuard.navigateUrl(true, routerMock, 'someURL');
    expect(routerMock.navigate).not.toHaveBeenCalled();
  });

  it('navigateUrl true', () => {
    WorkAllocationAccessGuard.navigateUrl(false, routerMock, 'someURL');
    expect(routerMock.navigate).toHaveBeenCalledWith(['someURL']);
  });
});
