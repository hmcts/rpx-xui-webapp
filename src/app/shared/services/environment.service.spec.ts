import { HttpClientTestingModule } from '@angular/common/http/testing';
import { inject, TestBed } from '@angular/core/testing';
import { EnvironmentService } from './environment.service';
import { EnvironmentConfig } from '../../../models/environmentConfig.model';
import { Observable } from 'rxjs';

describe('EnvironmentService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EnvironmentService],
      imports: [HttpClientTestingModule]
    });
  });

  it('should be created', inject([EnvironmentService], (service: EnvironmentService) => {
    expect(service).toBeTruthy();
  }));

  it('should detect the production environment correctly', inject([EnvironmentService], (service: EnvironmentService) => {
    const dummyWithData = {
      data: {
        ccdGatewayUrl: ''
      },
      isProd: () => {
        return false;
      }
    };

    dummyWithData.isProd = service.isProd.bind(dummyWithData);

    dummyWithData.data.ccdGatewayUrl = 'https://gateway.ccd.AAT.platform.hmcts.net';
    expect(dummyWithData.isProd()).toBe(false);

    dummyWithData.data.ccdGatewayUrl = '';
    expect(dummyWithData.isProd()).toBe(true);

    dummyWithData.data.ccdGatewayUrl = null;
    expect(dummyWithData.isProd()).toBe(true);

    dummyWithData.data.ccdGatewayUrl = 'https://gateway.ccd.platform.hmcts.net';
    expect(dummyWithData.isProd()).toBe(true);
  }));

  it('should return correct values from getTimeoutsForCaseRetrieval', inject([EnvironmentService], (service: EnvironmentService) => {
    expect(service.getTimeoutsForCaseRetrieval()).toBe(null);

    const dummyWithData = {
      data: {
        timeoutsCaseRetrieval: [33]
      },
      isProd: () => {
        return false;
      }
    };
    const getTimeoutsForCaseRetrieval = service.getTimeoutsForCaseRetrieval.bind(dummyWithData);
    expect(getTimeoutsForCaseRetrieval()).toEqual([33]);
  }));

  it('should return correct values from getTimeoutsCaseRetrievalArtificialDelay', inject([EnvironmentService], (service: EnvironmentService) => {
    expect(service.getTimeoutsCaseRetrievalArtificialDelay()).toBe(-1);

    const dummyWithData = {
      data: {
        timeoutsCaseRetrievalArtificialDelay: 5
      },
      isProd: () => {
        return false;
      }
    };
    const getTimeoutsCaseRetrievalArtificialDelay = service.getTimeoutsCaseRetrievalArtificialDelay.bind(dummyWithData);
    expect(getTimeoutsCaseRetrievalArtificialDelay()).toBe(5);
  }));
});
