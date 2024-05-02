import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { EnvironmentService } from './environment.service';
import { DeploymentEnvironmentEnum } from '../../enums/deployment-environment-enum';

const dummyWindowProd = { location: new URL('https://manage-case.platform.hmcts.net') };
const dummyWindowAat = { location: new URL('https://manage-case.aat.platform.hmcts.net') };

describe('EnvironmentService', () => {
  it('should be created', () => {
    TestBed.configureTestingModule({
      providers: [
        { provide: Window, useValue: dummyWindowAat },
        EnvironmentService
      ],
      imports: [HttpClientTestingModule]
    });
    const service = TestBed.inject(EnvironmentService);
    expect(service).toBeTruthy();
  });

  it('should detect the aat environment correctly', () => {
    TestBed.configureTestingModule({
      providers: [
        { provide: Window, useValue: dummyWindowAat },
        EnvironmentService
      ],
      imports: [HttpClientTestingModule]
    });
    const service = TestBed.inject(EnvironmentService);
    expect(service.getDeploymentEnv()).toBe(DeploymentEnvironmentEnum.AAT);
  });

  it('should detect the prod environment correctly', () => {
    TestBed.configureTestingModule({
      providers: [
        { provide: Window, useValue: dummyWindowProd },
        EnvironmentService
      ],
      imports: [HttpClientTestingModule]
    });
    const service = TestBed.inject(EnvironmentService);
    expect(service.getDeploymentEnv()).toBe(DeploymentEnvironmentEnum.PROD);
  });
});
