import { inject, TestBed } from '@angular/core/testing';
import {StoreModule} from '@ngrx/store';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { IdleService } from './idle.services';
import {Idle, IdleExpiry} from '@ng-idle/core';
import {Keepalive} from '@ng-idle/keepalive';

class MockConfigService {
  config;
  caseEditorConfig = {};
  getEditorConfiguration() {}
  constructor() {
    this.config = {
      login_url: 'test'
    };
  }
}

describe('Idle Services', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({}),
        HttpClientTestingModule
      ],
      providers: [
        Idle,
        IdleExpiry,
        Keepalive,
        IdleService,
      ]
    });
  });

  it('should be created', inject([IdleService], (service: IdleService) => {
    expect(service).toBeTruthy();
  }));

  it('should have init method', inject([IdleService], (service: IdleService) => {
    expect(service.init).toBeTruthy();
  }));

  it('should have init dispatchModal', inject([IdleService], (service: IdleService) => {
    expect(service.dispatchModal).toBeTruthy();
  }));

  it('should have init dispatchSignedOut', inject([IdleService], (service: IdleService) => {
    expect(service.dispatchSignedOut).toBeTruthy();
  }));

  it('should have init initWatch', inject([IdleService], (service: IdleService) => {
    expect(service.initWatch).toBeTruthy();
  }));

});
