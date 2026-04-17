import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { MemoizedSelector, Store } from '@ngrx/store';
import { BehaviorSubject, Observable, lastValueFrom, of } from 'rxjs';
import { HeaderConfigService } from '../../services/header-config/header-config.service';
import * as fromAppStore from '../../store';
import { NavigationAccessGuard } from './navigation-access.guard';

describe('NavigationAccessGuard', () => {
  let guard: NavigationAccessGuard;
  let routerMock: jasmine.SpyObj<Router>;
  let storeMock: jasmine.SpyObj<Store<fromAppStore.State>>;
  let headerConfigServiceMock: jasmine.SpyObj<HeaderConfigService>;
  let userDetailsSelector: MemoizedSelector<fromAppStore.State, any>;

  const createState = (userDetails: any) =>
    ({
      routerReducer: undefined,
      appConfig: { userDetails },
    }) as unknown as fromAppStore.State;

  const createRoute = (requiredNavigationHref: string, accessDeniedRedirectUrl: string): ActivatedRouteSnapshot =>
    ({
      data: {
        accessDeniedRedirectUrl,
        requiredNavigationHref,
      },
    }) as unknown as ActivatedRouteSnapshot;

  const mockStoreState = (state$: Observable<fromAppStore.State>) => {
    storeMock.pipe.and.callFake((...operators: any[]) => operators.reduce((source, operator) => operator(source), state$));
  };

  beforeEach(() => {
    routerMock = jasmine.createSpyObj<Router>('router', ['navigateByUrl']);
    storeMock = jasmine.createSpyObj<Store<fromAppStore.State>>('store', ['pipe']);
    headerConfigServiceMock = jasmine.createSpyObj<HeaderConfigService>('headerConfigService', ['constructHeaderConfig']);
    userDetailsSelector = fromAppStore.getUserDetails as MemoizedSelector<fromAppStore.State, any>;
    userDetailsSelector.clearResult();
    guard = new NavigationAccessGuard(routerMock, storeMock, headerConfigServiceMock);
  });

  afterEach(() => {
    userDetailsSelector.clearResult();
  });

  it('allows access when the visible header config contains the required nav item', async () => {
    mockStoreState(of(createState({ userInfo: { roles: ['caseworker-civil'] } })));
    headerConfigServiceMock.constructHeaderConfig.and.returnValue(
      of([
        {
          href: '/work/my-work/list',
          active: false,
          roles: ['caseworker-civil'],
          text: 'My work',
        },
      ])
    );

    const allowed = await lastValueFrom(guard.canActivate(createRoute('/work/my-work/list', '/cases')));

    expect(allowed).toBeTrue();
    expect(routerMock.navigateByUrl).not.toHaveBeenCalled();
  });

  it('denies access and redirects to the route-specific fallback when the resolved header config has no matching item', async () => {
    mockStoreState(of(createState({ userInfo: { roles: ['caseworker-civil'] } })));
    headerConfigServiceMock.constructHeaderConfig.and.returnValue(
      of([
        {
          href: '/cases',
          active: false,
          roles: ['caseworker-civil'],
          text: 'Case list',
        },
      ])
    );

    const allowed = await lastValueFrom(guard.canActivate(createRoute('/search', '/')));

    expect(allowed).toBeFalse();
    expect(routerMock.navigateByUrl).toHaveBeenCalledWith('/');
  });

  it('denies access and redirects when the required item is filtered out by roles', async () => {
    mockStoreState(of(createState({ userInfo: { roles: ['caseworker-civil'] } })));
    headerConfigServiceMock.constructHeaderConfig.and.returnValue(
      of([
        {
          href: '/work/my-work/list',
          active: false,
          roles: ['task-supervisor'],
          text: 'My work',
        },
      ])
    );

    const allowed = await lastValueFrom(guard.canActivate(createRoute('/work/my-work/list', '/cases')));

    expect(allowed).toBeFalse();
    expect(routerMock.navigateByUrl).toHaveBeenCalledWith('/cases');
  });

  it('denies access and redirects when the required item is filtered out by flags', async () => {
    mockStoreState(of(createState({ userInfo: { roles: ['caseworker-civil'] } })));
    headerConfigServiceMock.constructHeaderConfig.and.returnValue(
      of([
        {
          href: '/search',
          active: false,
          roles: ['caseworker-civil'],
          notFlags: ['feature-global-search'],
          text: 'Search',
        },
      ])
    );

    const allowed = await lastValueFrom(guard.canActivate(createRoute('/search', '/')));

    expect(allowed).toBeFalse();
    expect(routerMock.navigateByUrl).toHaveBeenCalledWith('/');
  });

  it('waits for userInfo before deciding and passes the resolved roles into the header config service', async () => {
    const storeState$ = new BehaviorSubject<any>(createState({}));
    mockStoreState(storeState$.asObservable());
    headerConfigServiceMock.constructHeaderConfig.and.returnValue(
      of([
        {
          href: '/search',
          active: false,
          roles: ['caseworker-civil'],
          flags: ['feature-global-search'],
          text: 'Search',
        },
      ])
    );

    const canActivatePromise = lastValueFrom(guard.canActivate(createRoute('/search', '/')));

    expect(headerConfigServiceMock.constructHeaderConfig).not.toHaveBeenCalled();
    expect(routerMock.navigateByUrl).not.toHaveBeenCalled();

    storeState$.next(createState({ userInfo: { roles: ['caseworker-civil'] } }));

    const allowed = await canActivatePromise;

    expect(allowed).toBeTrue();
    expect(headerConfigServiceMock.constructHeaderConfig).toHaveBeenCalledWith(['caseworker-civil']);
  });
});
