import { HttpClient } from '@angular/common/http';
import { of, throwError } from 'rxjs';
import { LoggerService } from '../../app/services/logger/logger.service';
import { CaseworkerDataService } from './caseworker-data.service';

describe('CaseworkerDataService', () => {
  let mockHttpService: jasmine.SpyObj<HttpClient>;
  let mockLoggerService: jasmine.SpyObj<LoggerService>;
  let service: CaseworkerDataService;

  beforeEach(() => {
    mockHttpService = jasmine.createSpyObj('mockHttpService', ['post']);
    mockLoggerService = jasmine.createSpyObj('LoggerService', ['warn']);
    mockHttpService.post.and.returnValue(of({}));
    service = new CaseworkerDataService(mockHttpService, mockLoggerService);
  });

  it('getUsersByIdamIds should log and rethrow downstream failure', (done) => {
    const downstreamError = { status: 503 };
    mockHttpService.post.and.returnValue(throwError(() => downstreamError));

    service.getUsersByIdamIds(['user1', 'user2'], ['IA', 'CIVIL']).subscribe({
      next: () => done.fail('expected error'),
      error: (error) => {
        expect(error).toEqual(downstreamError);
        expect(mockLoggerService.warn).toHaveBeenCalledWith(
          'CaseworkerDataService.getUsersByIdamIds downstream failure; idamIdsCount=2; services=IA,CIVIL; endpoint=/workallocation/caseworker/getUsersByIdamIds; status=503',
          downstreamError
        );
        done();
      },
    });
  });

  it('getUserByIdamId should log and rethrow downstream failure', (done) => {
    const downstreamError = { status: 404 };
    mockHttpService.post.and.returnValue(throwError(() => downstreamError));

    service.getUserByIdamId('user1', true).subscribe({
      next: () => done.fail('expected error'),
      error: (error) => {
        expect(error).toEqual(downstreamError);
        expect(mockLoggerService.warn).toHaveBeenCalledWith(
          'CaseworkerDataService.getUserByIdamId downstream failure; idamIdPresent=true; silentNotFound=true; endpoint=/workallocation/caseworker/getUserByIdamId; status=404',
          downstreamError
        );
        done();
      },
    });
  });

  it('getUserByIdamId should make correct api call', () => {
    service.getUserByIdamId('123456');
    expect(mockHttpService.post).toHaveBeenCalledWith(`${CaseworkerDataService.caseWorkerUrl}/getUserByIdamId`, {
      idamId: '123456',
      silentNotFound: false,
    });
  });

  it('getUserByIdamId should support silent not found', () => {
    service.getUserByIdamId('123456', true);
    expect(mockHttpService.post).toHaveBeenCalledWith(`${CaseworkerDataService.caseWorkerUrl}/getUserByIdamId`, {
      idamId: '123456',
      silentNotFound: true,
    });
  });
});
