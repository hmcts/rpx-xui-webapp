import { Component, OnInit } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { RouterTestingHarness } from '@angular/router/testing';
import { Actions } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { Subject, Subscription, of } from 'rxjs';
import { UserDetails } from '../../app/models/user-details.model';
import { State, getUserDetails } from '../../app/store';
import { LoadOrganisation, LoadOrganisationSuccess } from '../../organisation/store/actions';
import { OrganisationEffects } from '../../organisation/store/effects/organisation.effects';
import { ROUTES } from '../case-feature.routes';
import { CreateCaseOrganisationResolver } from './create-case-organisation.resolver';

@Component({ template: '', standalone: true })
class OrganisationEditorStub implements OnInit {
  public static organisation: string | null | undefined;

  public ngOnInit(): void {
    OrganisationEditorStub.organisation = sessionStorage.getItem('organisationDetails');
  }
}

describe('CreateCaseOrganisationResolver', () => {
  let store: MockStore<State>;
  let resolver: CreateCaseOrganisationResolver;
  let actions$: Subject<Action>;
  let subscriptions: Subscription;
  let dispatch: jasmine.Spy;

  beforeEach(() => {
    actions$ = new Subject<Action>();
    subscriptions = new Subscription();
    const createRoute = ROUTES[0].children.find((route) => route.path === 'case-create');
    const editorRoute = createRoute.children.find((route) => route.path === ':jid/:ctid/:eid');
    TestBed.configureTestingModule({
      providers: [
        provideMockStore({
          selectors: [{ selector: getUserDetails, value: { userInfo: { roles: ['pui-case-manager'] } } }],
        }),
        { provide: Actions, useValue: new Actions(actions$) },
        provideRouter([
          {
            path: 'case-create',
            children: [
              {
                ...editorRoute,
                component: OrganisationEditorStub,
                children: [],
                resolve: { ...editorRoute.resolve, eventTrigger: () => of({}) },
              },
            ],
          },
        ]),
      ],
    });
    store = TestBed.inject(MockStore);
    resolver = TestBed.inject(CreateCaseOrganisationResolver);
    dispatch = spyOn(store, 'dispatch');
  });

  afterEach(() => {
    subscriptions.unsubscribe();
    actions$.complete();
  });

  it('should subscribe to the outcome before dispatching the lookup', () => {
    dispatch.and.callFake(() => actions$.next(new LoadOrganisationSuccess({ organisationIdentifier: 'TEST123' })));
    const resolved = jasmine.createSpy('resolved');

    subscriptions.add(resolver.resolve().subscribe(resolved));

    expect(resolved).toHaveBeenCalledOnceWith(true);
  });

  ['pui-organisation-manager', 'pui-finance-manager', 'pui-case-manager', 'pui-caa', 'pui-user-manager'].forEach((role) => {
    it(`should wait for an organisation lookup for ${role}`, () => {
      store.overrideSelector(getUserDetails, { userInfo: { roles: [role] } } as UserDetails);
      const resolved = jasmine.createSpy('resolved');

      subscriptions.add(resolver.resolve().subscribe(resolved));

      expect(dispatch).toHaveBeenCalledOnceWith(new LoadOrganisation());
      expect(resolved).not.toHaveBeenCalled();
      actions$.next({ type: 'unrelated action' });
      expect(resolved).not.toHaveBeenCalled();
      actions$.next(new LoadOrganisationSuccess({ organisationIdentifier: 'TEST123' }));
      expect(resolved).toHaveBeenCalledOnceWith(true);
    });
  });

  [['caseworker'], ['judge'], []].forEach((roles) => {
    it(`should proceed without a lookup for roles ${JSON.stringify(roles)}`, () => {
      store.overrideSelector(getUserDetails, { userInfo: { roles, roleCategories: ['PROFESSIONAL'] } } as UserDetails);
      const resolved = jasmine.createSpy('resolved');

      subscriptions.add(resolver.resolve().subscribe(resolved));

      expect(dispatch).not.toHaveBeenCalled();
      expect(resolved).toHaveBeenCalledOnceWith(true);
    });
  });

  it('should wait for user details before checking eligibility', () => {
    const selector = store.overrideSelector(getUserDetails, { userInfo: null } as UserDetails);
    const resolved = jasmine.createSpy('resolved');
    subscriptions.add(resolver.resolve().subscribe(resolved));
    expect(dispatch).not.toHaveBeenCalled();

    selector.setResult({ userInfo: { roles: ['pui-case-manager'] } } as UserDetails);
    store.refreshState();

    expect(dispatch).toHaveBeenCalledOnceWith(new LoadOrganisation());
    expect(resolved).not.toHaveBeenCalled();
    actions$.next(new LoadOrganisationSuccess({ organisationIdentifier: 'TEST123' }));
    expect(resolved).toHaveBeenCalledOnceWith(true);
  });

  it('should release its completion subscription when navigation is cancelled', () => {
    const resolved = jasmine.createSpy('resolved');
    const subscription = resolver.resolve().subscribe(resolved);
    subscription.unsubscribe();

    actions$.next(new LoadOrganisationSuccess({ organisationIdentifier: 'TEST123' }));

    expect(resolved).not.toHaveBeenCalled();
    expect(actions$.observed).toBeFalse();
  });

  [true, false].forEach((successful) => {
    it(`should initialise the editor only after lookup ${successful ? 'success and persistence' : 'failure'}`, async () => {
      const originalValue = sessionStorage.getItem('organisationDetails');
      sessionStorage.removeItem('organisationDetails');
      OrganisationEditorStub.organisation = undefined;
      const response$ = new Subject();
      let requestStarted: () => void;
      const requested = new Promise<void>((resolve) => {
        requestStarted = resolve;
      });
      const organisationService = jasmine.createSpyObj('OrganisationService', ['fetchOrganisation']);
      organisationService.fetchOrganisation.and.callFake(() => {
        requestStarted();
        return response$;
      });
      const logger = jasmine.createSpyObj('LoggerService', ['error']);
      const effects = new OrganisationEffects(new Actions(actions$), organisationService, logger, store);
      subscriptions.add(effects.loadOrganisation$.subscribe((action) => actions$.next(action)));
      dispatch.and.callFake((action) => actions$.next(action));

      try {
        const harness = await RouterTestingHarness.create();
        const navigation = harness.navigateByUrl('/case-create/TEST/TYPE/CREATE', OrganisationEditorStub);
        await requested;
        expect(OrganisationEditorStub.organisation).toBeUndefined();

        const organisation = { name: 'Test organisation', organisationIdentifier: 'TEST123' };
        if (successful) {
          response$.next(organisation);
        } else {
          response$.error(new Error('Organisation lookup failed'));
        }
        await navigation;

        expect(OrganisationEditorStub.organisation).toBe(successful ? JSON.stringify(organisation) : null);
      } finally {
        if (originalValue === null) {
          sessionStorage.removeItem('organisationDetails');
        } else {
          sessionStorage.setItem('organisationDetails', originalValue);
        }
      }
    });
  });
});
