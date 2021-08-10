import { APP_BASE_HREF } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { ActivatedRouteSnapshot } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { StoreModule } from '@ngrx/store';
import { CaseRole } from '../../../api/workAllocation2/interfaces/caseRole';
import { metaReducers } from '../../app/app.module';
import { reducers } from '../../app/store';

import { CaseRolesResolverService } from './case-roles-resolver.service';
import { of } from 'rxjs';

describe('CaseRolesResolverService', () => {
  let httpClient: HttpClient;
  const CASEROLES: CaseRole[] = [
    {
      actions: [
        {id: 'reallocate', title: 'Reallocate'},
        {id: 'remove', title: 'Remove Allocation'},
      ],
      end: null,
      id: 'd90ae606-98e8-47f8-b53c-a7ab77fde22b',
      location: 'Taylor House',
      name: 'Judge Beech',
      role: 'Lead Judge',
      start: '2021-07-13T00:29:10.656Z',
    },
    {
      actions: [
        {id: 'reallocate', title: 'Reallocate'},
        {id: 'remove', title: 'Remove Allocation'},
      ],
      end: null,
      id: 'd90ah606-98e8-47f8-b53c-a7ab77fde22b',
      location: 'Milton Keynes',
      name: 'Kuda Nyamainashe',
      role: 'Lead Judge',
      start: '2021-05-19T00:29:10.656Z',
    },
  ];
  beforeEach(() => {
    TestBed.configureTestingModule({
        imports: [
          StoreModule.forRoot(reducers, {metaReducers}),
          RouterTestingModule.withRoutes([]),
          HttpClientTestingModule,
        ],
        providers: [
          CaseRolesResolverService,
          {provide: APP_BASE_HREF, useValue: '/'}
        ]
      }
    );
    httpClient = TestBed.get(HttpClient) as HttpClient;
  });

  it('should return a list of case roles', (done) => {
    spyOn(httpClient, 'get').and.returnValue(of(CASEROLES));
    const service: CaseRolesResolverService = TestBed.get(CaseRolesResolverService);
    const activatedRoute = new ActivatedRouteSnapshot();
    activatedRoute.params = {
      cid: '1546883526751282'
    };
    service.resolve(activatedRoute, null).subscribe((roles: CaseRole[]) => {
      expect(roles.length).toBe(2);
      expect(roles[0].name).toBe('Judge Beech');
      expect(roles[1].name).toBe('Kuda Nyamainashe');
      done();
    });
  });
});
