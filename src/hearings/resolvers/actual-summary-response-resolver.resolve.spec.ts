import { APP_BASE_HREF } from '@angular/common';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ActivatedRouteSnapshot } from '@angular/router';
import { Store } from '@ngrx/store';
import { provideMockStore } from '@ngrx/store/testing';
import { initialState } from '../hearing.test.data';
import * as actions from '../store/actions/hearing-actuals.action';
import { ActualSummaryResponseResolver } from './actual-summary-response-resolver.resolve';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe('ActualSummaryResponseResolver', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule.withRoutes([])],
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
    const service: ActualSummaryResponseResolver = TestBed.inject(ActualSummaryResponseResolver);
    const store = TestBed.inject(Store);
    const dispatchSpy = spyOn(store, 'dispatch');
    const route = {
      params: { id: 'hearing-123' },
      queryParams: { caseRef: 'case-456' },
    } as unknown as ActivatedRouteSnapshot;

    service.resolve(route);

    expect(dispatchSpy).toHaveBeenCalledWith(new actions.GetHearingActuals({ id: 'hearing-123', caseRef: 'case-456' }));
  });
});
