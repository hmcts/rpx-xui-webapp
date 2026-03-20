import { APP_BASE_HREF } from '@angular/common';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { ActivatedRouteSnapshot } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { firstValueFrom } from 'rxjs';
import { GetHearingActuals } from '../store/actions/hearing-actuals.action';
import * as fromHearingStore from '../store';
import { ActualSummaryResponseResolver } from './actual-summary-response-resolver.resolve';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe('ActualSummaryResponseResolver', () => {
  let store: MockStore;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule.withRoutes([])],
      providers: [
        provideMockStore(),
        ActualSummaryResponseResolver,
        { provide: APP_BASE_HREF, useValue: '/' },
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting(),
      ],
    });

    store = TestBed.inject(MockStore);
  });

  it('should be created', () => {
    const service: ActualSummaryResponseResolver = TestBed.inject(ActualSummaryResponseResolver);
    expect(service).toBeTruthy();
  });

  it('should dispatch hearing actuals request with case reference from hearingValues store', async () => {
    const service: ActualSummaryResponseResolver = TestBed.inject(ActualSummaryResponseResolver);
    const dispatchSpy = spyOn(store, 'dispatch');
    const route = { params: { id: 'h100001' } } as unknown as ActivatedRouteSnapshot;
    store.overrideSelector(fromHearingStore.getHearingValuesCaseInfo, { caseReference: '1111222233334444' });
    store.refreshState();

    await firstValueFrom(service.resolve(route));

    expect(dispatchSpy).toHaveBeenCalledWith(
      new GetHearingActuals({
        id: 'h100001',
        caseRef: '1111222233334444',
      })
    );
  });
});
