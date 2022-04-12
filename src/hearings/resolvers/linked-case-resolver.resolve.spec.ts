import { HttpClientTestingModule } from '@angular/common/http/testing';
import { inject, TestBed } from '@angular/core/testing';
import { ActivatedRouteSnapshot } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { Store, StoreModule } from '@ngrx/store';
import { of } from 'rxjs';
import { metaReducers } from '../../app/app.module';
import { reducers } from '../../app/store';
import { HearingLinksStateData } from '../models/hearingLinksStateData.model';
import * as fromHearingStore from '../store';
import { LinkedCaseResolver } from './linked-case-resolver.resolve';

describe('LinkedCaseResolver', () => {
  let store: Store<fromHearingStore.State>;
  const mockStore = jasmine.createSpyObj('Store', ['pipe', 'dispatch']);
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot(reducers, { metaReducers }),
        RouterTestingModule.withRoutes([]),
        HttpClientTestingModule,
      ],
    }
    );
    store = TestBed.get(Store) as Store<fromHearingStore.State>;
  });

  it('should be created', () => {
    const service: LinkedCaseResolver = TestBed.get(LinkedCaseResolver);
    expect(service).toBeTruthy();
  });

  it('resolves reference data', inject([LinkedCaseResolver], (service: LinkedCaseResolver) => {
    spyOn(store, 'pipe').and.returnValue(of('serviceName'));
    const route = new ActivatedRouteSnapshot();
    route.params = {
      caseReference: '8254902572336147',
      hearingId: 'h10010'
    };
    service.resolve(route).subscribe((refData: HearingLinksStateData) => {
      expect(route.params.hearingId).toEqual('h10010');
    });
  }));
});
