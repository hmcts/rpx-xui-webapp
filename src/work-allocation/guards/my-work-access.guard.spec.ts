import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { BehaviorSubject, Observable, lastValueFrom, of } from 'rxjs';
import { HeaderConfigService } from '../../app/services/header-config/header-config.service';
import * as fromAppStore from '../../app/store';
import { MyWorkAccessGuard } from './my-work-access.guard';

describe('MyWorkAccessGuard', () => {
  let guard: MyWorkAccessGuard;
  let routerMock: jasmine.SpyObj<Router>;
  let storeMock: jasmine.SpyObj<Store<fromAppStore.State>>;
  let headerConfigServiceMock: jasmine.SpyObj<HeaderConfigService>;
  const createState = (userDetails: any) =>
    ({
      routerReducer: undefined,
      appConfig: { userDetails },
    }) as unknown as fromAppStore.State;
  const mockStoreState = (state$: Observable<fromAppStore.State>) => {
    storeMock.pipe.and.callFake((...operators: any[]) => operators.reduce((source, operator) => operator(source), state$));
  };

  beforeEach(() => {
    routerMock = jasmine.createSpyObj<Router>('router', ['navigateByUrl']);
    storeMock = jasmine.createSpyObj<Store<fromAppStore.State>>('store', ['pipe']);
    headerConfigServiceMock = jasmine.createSpyObj<HeaderConfigService>('headerConfigService', ['constructHeaderConfig']);

    guard = new MyWorkAccessGuard(routerMock, storeMock, headerConfigServiceMock);
  });

  it('allows access when the visible header config contains the my work nav item', async () => {
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

    const allowed = await lastValueFrom(guard.canActivate());

    expect(allowed).toBeTrue();
    expect(routerMock.navigateByUrl).not.toHaveBeenCalled();
  });

  it('denies access and redirects when the resolved header config has no my work item', async () => {
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

    const allowed = await lastValueFrom(guard.canActivate());

    expect(allowed).toBeFalse();
    expect(routerMock.navigateByUrl).toHaveBeenCalledWith('/cases');
  });

  it('denies access and redirects when the my work item is filtered out by roles', async () => {
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

    const allowed = await lastValueFrom(guard.canActivate());

    expect(allowed).toBeFalse();
    expect(routerMock.navigateByUrl).toHaveBeenCalledWith('/cases');
  });

  it('waits for userInfo before deciding', async () => {
    const storeState$ = new BehaviorSubject<any>(createState({}));
    mockStoreState(storeState$.asObservable());
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

    const canActivatePromise = lastValueFrom(guard.canActivate());

    expect(headerConfigServiceMock.constructHeaderConfig).not.toHaveBeenCalled();
    expect(routerMock.navigateByUrl).not.toHaveBeenCalled();

    storeState$.next(createState({ userInfo: { roles: ['caseworker-civil'] } }));

    const allowed = await canActivatePromise;

    expect(allowed).toBeTrue();
    expect(headerConfigServiceMock.constructHeaderConfig).toHaveBeenCalledWith(['caseworker-civil']);
  });
});
