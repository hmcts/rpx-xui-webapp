import { inject, TestBed } from '@angular/core/testing';
import {StoreModule, Store} from '@ngrx/store';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { IdleService } from './idle.services';
import {Idle, IdleExpiry} from '@ng-idle/core';
import {Keepalive} from '@ng-idle/keepalive';
import { of } from 'rxjs';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import * as fromRoot from '../../store';
import {IdleConfigModel} from '../../models/idle-config.model';

describe('Idle Services', () => {

  const mockIdle = jasmine.createSpyObj('Idle', [
    'setIdleName',
    'setTimeout',
    'setInterrupts',
    'setIdle',
    'watch'
  ]);

  mockIdle.onIdleEnd = { pipe: (param) => of('something') };
  mockIdle.onTimeout = of('something');
  mockIdle.onIdleStart = of('something');
  mockIdle.onTimeoutWarning = { pipe: (param) => of('something') };

  let store: MockStore<fromRoot.State>;
  let spyOnDispatchToStore = jasmine.createSpy();
  let spyOnPipeToStore = jasmine.createSpy();

  const mockKeepAlive = jasmine.createSpyObj('KeepInterval', [
    'interval'
  ]);

  mockKeepAlive.onPing = { pipe: (param) => of('something') };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({}),
        HttpClientTestingModule
      ],
      providers: [
        { provide: Idle, useValue: mockIdle },
        { provide: Keepalive, useValue: mockKeepAlive },
        IdleService,
        provideMockStore(),
      ]
    });

    store = TestBed.get(Store);
    spyOnDispatchToStore = spyOn(store, 'dispatch').and.callThrough();
    spyOnPipeToStore = spyOn(store, 'pipe').and.returnValue(of('something'));

  });


  describe('init', () => {
    it('should setup values', inject([IdleService], (service: IdleService) => {
      const idleConfig: IdleConfigModel = {
        timeout: 10 * 60, // 10 min
        idleMilliseconds: 3000,
        keepAliveInSeconds: 5 * 60 * 60, // 5 hrs
        idleServiceName: 'idleSession'
      };
      service.init(idleConfig);
      expect(mockIdle.setIdleName).toHaveBeenCalledWith('idleSession');
      expect(mockIdle.setTimeout).toHaveBeenCalled();
    }));
  });

});
