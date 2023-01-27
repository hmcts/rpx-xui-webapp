import { APP_BASE_HREF } from '@angular/common';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { inject, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Store, StoreModule } from '@ngrx/store';
import { of } from 'rxjs/internal/observable/of';

import { metaReducers } from '../../app/app.module';
import { UserDetails } from '../../app/models';
import { reducers } from '../../app/store';
import * as fromCaseList from '../../app/store/reducers';
import { AllocateRoleService } from '../../role-access/services';
import { CaseworkerDataService } from '../services';
import { LocationResolver } from './location-resolver.service';

describe('LocationResolver', () => {

  let caseworkerDataService: CaseworkerDataService;
  let judicialWorkerDataService: AllocateRoleService;
  let store: Store<fromCaseList.State>;

  const CASE_WORKER: UserDetails = {
    sessionTimeout: {
      idleModalDisplayTime: 10,
      totalIdleTime: 10,
    },
    canShareCases: true,
    userInfo: {
      id: '998db99b-08aa-43d4-bc6b-0aabbb0e3c6f',
      forename: 'IAC',
      surname: 'CW1',
      email: 'CWR-func-test-user1-#s@justice.gov.uk',
      active: true,
      roles: [
        'caseworker',
        'caseworker-ia',
        'caseworker-ia-caseofficer',
        'cwd-user'
      ]
    },
    roleAssignmentInfo: [{
      jurisdiction: 'IA',
      isCaseAllocator: false,
      baseLocation: '12345',
      primaryLocation: '54321',
      roleType: 'ORGANISATION',
      substantive: 'y'
    }]
  };

  const JUDICIAL_WORKER: UserDetails = {
    sessionTimeout: {
      idleModalDisplayTime: 10,
      totalIdleTime: 10,
    },
    canShareCases: true,
    userInfo: {
      id: '998db99b-08aa-43d4-bc6b-0aabbb0e3c6f',
      forename: 'IAC',
      surname: 'CW1',
      email: 'JWR-func-test-user1-#s@justice.gov.uk',
      active: true,
      roles: [
        'judicialworker'
      ]
    },
    roleAssignmentInfo: [{
      jurisdiction: 'IA',
      isCaseAllocator: false,
      baseLocation: '12345',
      primaryLocation: '54321',
      roleType: 'ORGANISATION',
      substantive: 'y'
    }]
  };

  const JUDICIAL_WORKERS = [
    {
      email: 'JWR-func-test-user1-#s@justice.gov.uk',
      firstName: 'IAC',
      idamId: '998db99b-08aa-43d4-bc6b-0aabbb0e3c6f',
      lastName: 'CW2',
      location: {
        id: 231596,
        locationName: 'Birmingham'
      }
    }
  ];

  const CASE_WORKERS = [
    {
      email: 'CWR-func-test-user1-#s@justice.gov.uk',
      firstName: 'IAC',
      idamId: '998db99b-08aa-43d4-bc6b-0aabbb0e3c6f',
      lastName: 'CW2',
      location: {
        id: 231596,
        locationName: 'Birmingham'
      },
      roleCategory: ''
    }
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
        imports: [
          StoreModule.forRoot(reducers, {metaReducers}),
          RouterTestingModule.withRoutes([]),
          HttpClientTestingModule,
        ],
        providers: [
          LocationResolver,
          CaseworkerDataService,
          AllocateRoleService,
          {provide: APP_BASE_HREF, useValue: '/'}
        ]
      }
    );
    caseworkerDataService = TestBed.inject(CaseworkerDataService) as CaseworkerDataService;
    judicialWorkerDataService = TestBed.inject(AllocateRoleService) as AllocateRoleService;
    store = TestBed.inject(Store) as Store<fromCaseList.State>;

  });

  it('should be created', () => {
    const service: LocationResolver = TestBed.inject(LocationResolver);
    expect(service).toBeTruthy();
  });

  it('should get base location for the user', inject([LocationResolver], (service: LocationResolver) => {
    const expectedLocationList = [{id: '12345', userId: '998db99b-08aa-43d4-bc6b-0aabbb0e3c6f', locationId: '12345', locationName: '', services: [ 'IA' ]}];
    expect(service.getJudicialWorkersOrCaseWorkers({service: 'IA', serviceCode: ['BFA1']}, CASE_WORKER)).toEqual(expectedLocationList);
  }));

  it('should get base location for the judicial user', inject([LocationResolver], (service: LocationResolver) => {
    const expectedLocationList = [{id: '12345', userId: '998db99b-08aa-43d4-bc6b-0aabbb0e3c6f', locationId: '12345', locationName: '', services: [ 'IA' ]}];
    expect(service.getJudicialWorkersOrCaseWorkers({service: 'IA', serviceCode: ['BFA1']}, JUDICIAL_WORKER)).toEqual(expectedLocationList);
  }));
});
