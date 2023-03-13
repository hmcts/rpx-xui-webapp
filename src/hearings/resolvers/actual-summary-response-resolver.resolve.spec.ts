import { APP_BASE_HREF } from '@angular/common';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { initialState } from '../hearing.test.data';
import { ActualSummaryResponseResolver } from './actual-summary-response-resolver.resolve';

describe('ActualSummaryResponseResolver', () => {

  beforeEach(() => {
    TestBed.configureTestingModule({
        imports: [
          RouterTestingModule.withRoutes([]),
          HttpClientTestingModule,
        ],
        providers: [
          provideMockStore({initialState}),
          ActualSummaryResponseResolver,
          {provide: APP_BASE_HREF, useValue: '/'}
        ]
      }
    );
  });

  it('should be created', () => {
    const service: ActualSummaryResponseResolver = TestBed.inject(ActualSummaryResponseResolver);
    expect(service).toBeTruthy();
  });

});
