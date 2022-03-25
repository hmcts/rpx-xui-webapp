import { APP_BASE_HREF } from '@angular/common';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Store, StoreModule } from '@ngrx/store';
import { metaReducers } from '../../app/app.module';
import { reducers } from '../../app/store';
import * as fromHearingStore from '../store';
import { ActualSummaryResponseResolver } from './actual-summary-response-resolver.resolve';

describe('ActualSummaryResponseResolver', () => {
  let store: Store<fromHearingStore.State>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot(reducers, { metaReducers }),
        RouterTestingModule.withRoutes([]),
        HttpClientTestingModule,
      ],
      providers: [
        ActualSummaryResponseResolver,
        { provide: APP_BASE_HREF, useValue: '/' }
      ]
    }
    );
    store = TestBed.get(Store) as Store<fromHearingStore.State>;
  });

  it('should be created', () => {
    const service: ActualSummaryResponseResolver = TestBed.get(ActualSummaryResponseResolver);
    expect(service).toBeTruthy();
  });

});
