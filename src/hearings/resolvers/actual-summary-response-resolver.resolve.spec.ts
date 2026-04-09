import { APP_BASE_HREF } from '@angular/common';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { ActivatedRouteSnapshot } from '@angular/router';
import { Store } from '@ngrx/store';
import { provideMockStore } from '@ngrx/store/testing';
import { initialState } from '../hearing.test.data';
import * as fromHearingStore from '../store';
import * as actions from '../store/actions/hearing-actuals.action';
import { ActualSummaryResponseResolver } from './actual-summary-response-resolver.resolve';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe('ActualSummaryResponseResolver', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideMockStore({ initialState }),
        ActualSummaryResponseResolver,
        { provide: APP_BASE_HREF, useValue: '/' },
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting(),
      ],
    });
  });

  it('should be created', () => {
    const service: ActualSummaryResponseResolver = TestBed.inject(ActualSummaryResponseResolver);
    expect(service).toBeTruthy();
  });

  it('should dispatch hearing actuals request with route params and query params', () => {
    const store = jasmine.createSpyObj('Store', ['dispatch']) as jasmine.SpyObj<Store<fromHearingStore.State>>;
    const service = new ActualSummaryResponseResolver(store);
    const route = {
      params: { id: 'hearing-123' },
      queryParams: { caseRef: 'case-456' },
    } as unknown as ActivatedRouteSnapshot;
    const expectedAction = new actions.GetHearingActuals({ id: 'hearing-123', caseRef: 'case-456' });

    service.resolve(route);

    expect(store.dispatch).toHaveBeenCalledWith(expectedAction);
  });
});
