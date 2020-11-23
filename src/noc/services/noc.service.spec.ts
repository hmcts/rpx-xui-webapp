import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import { inject, TestBed } from '@angular/core/testing';
import { StoreModule } from '@ngrx/store';
import { NocService } from './noc.service';

describe('NocService', () => {

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [
          HttpClientTestingModule,
          StoreModule.forRoot({}),
        ],
        providers: [
            NocService,
        ]
      });
    });

    it('should be created', inject([NocService], (service: NocService) => {
      expect(service).toBeTruthy();
    }));

    describe('getNoCQuestions', () => {
        it('should get getNoCQuestions', inject([HttpTestingController, NocService], (httpMock: HttpTestingController, service: NocService) => {
          service.getNoCQuestions('123456').subscribe( response => {
            expect(response).toBeNull();
          });

          const req = httpMock.expectOne('api/nocQuestions?caseId=123456');
          expect(req.request.method).toEqual('GET');
          req.flush(null);
        }));

      });

    describe('validateNoCAnswers', () => {
        it('should validateNoCAnswers', inject([HttpTestingController, NocService], (httpMock: HttpTestingController, service: NocService) => {
          service.validateNoCAnswers({caseReference: '123', nocAnswers: []}).subscribe( response => {
            expect(response).toBeNull();
          });

          const req = httpMock.expectOne('api/validateNoCQuestions');
          expect(req.request.method).toEqual('POST');
          req.flush(null);
        }));

      });

    describe('submitNoCEvent', () => {
        it('should submitNoCEvent', inject([HttpTestingController, NocService], (httpMock: HttpTestingController, service: NocService) => {
          service.submitNoCEvent({caseReference: '123', nocAnswers: []}).subscribe( response => {
            expect(response).toBeNull();
          });

          const req = httpMock.expectOne('api/submitNoCEvents');
          expect(req.request.method).toEqual('POST');
          req.flush(null);
        }));

      });
});
