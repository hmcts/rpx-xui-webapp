import { HttpRequest } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { inject, TestBed } from '@angular/core/testing';
import { StoreModule } from '@ngrx/store';
import { LovRefDataModel } from '../models/lovRefData.model';
import { HearingsService } from './hearings.service';

describe('HearingsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        StoreModule.forRoot({}),
      ],
      providers: [
        HearingsService,
      ]
    });
  });

  it('should be created', inject([HearingsService], (service: HearingsService) => {
    expect(service).toBeTruthy();
  }));

  describe('getAllHearings', () => {
    it('should get all hearings list', inject([HttpTestingController, HearingsService], (httpMock: HttpTestingController, service: HearingsService) => {
      service.getAllHearings('1111222233334444').subscribe(response => {
        expect(response).toBeNull();
      });

      const req = httpMock.expectOne('api/hearings/getHearings?caseId=1111222233334444');
      expect(req.request.method).toEqual('GET');
      req.flush(null);
    }));
  });

  describe('loadHearingValues', () => {
    it('should load hearing values', inject([HttpTestingController, HearingsService], (httpMock: HttpTestingController, service: HearingsService) => {
      service.loadHearingValues('1111222233334444').subscribe(response => {
        expect(response).toBeNull();
      });

      const req = httpMock.expectOne('api/hearings/loadServiceHearingValues');
      expect(req.request.method).toEqual('POST');
      req.flush(null);
    }));
  });

  describe('loadHearingRequest', () => {
    const payload = 'h100000';
    it('should load hearing request', inject([HttpTestingController, HearingsService], (httpMock: HttpTestingController, service: HearingsService) => {
      service.loadHearingRequest(payload).subscribe(response => {
        expect(response).toBeNull();
      });

      const req = httpMock.expectOne('api/hearings/getHearing?hearingId=h100000');
      expect(req.request.method).toEqual('GET');
      req.flush(null);
    }));
  });

  describe('submitHearingRequest', () => {
    const payload = {
      requestDetails: null,
      hearingDetails: null,
      partyDetails: null,
    };
    it('should submit hearing request', inject([HttpTestingController, HearingsService], (httpMock: HttpTestingController, service: HearingsService) => {
      service.submitHearingRequest(payload).subscribe(response => {
        expect(response).toBeNull();
      });

      const req = httpMock.expectOne('api/hearings/submitHearingRequest');
      expect(req.request.method).toEqual('POST');
      req.flush(null);
    }));
  });

  describe('updateHearingRequest', () => {
    const payload = {
      requestDetails: null,
      hearingDetails: null,
      partyDetails: null,
    };
    it('should update hearing request', inject([HttpTestingController, HearingsService], (httpMock: HttpTestingController, service: HearingsService) => {
      service.updateHearingRequest(payload).subscribe(response => {
        expect(response).toBeNull();
      });

      const req = httpMock.expectOne('api/hearings/updateHearingRequest');
      expect(req.request.method).toEqual('PUT');
      req.flush(null);
    }));
  });

  describe('cancelHearingRequest', () => {
    const payload: LovRefDataModel[] = [
      {
        key: 'reasonone',
        value_en: 'Reason 1',
        value_cy: '',
        hintText_EN: 'Reason 1',
        hintTextCY: '',
        order: 1,
        parentKey: null,
      }];

    it('should cancel hearing request', inject([HttpTestingController, HearingsService], (httpMock: HttpTestingController, service: HearingsService) => {
      const cancellationReasonCode: string = payload.map(reason => reason.key).toString();
      service.cancelHearingRequest('h0002', payload).subscribe(response => {
        expect(response).toBeNull();
      });

      httpMock.expectOne((req: HttpRequest<any>) => {
        expect(req.url).toBe('api/hearings/cancelHearings?hearingId=h0002');
        expect(req.method).toBe('DELETE');
        expect(req.params.get('cancellationReasonCode')).toEqual(cancellationReasonCode);
        return true;
      })
        .flush(null);
    }));
  });

  describe('getHearingActuals', () => {
    it('should hearing actuals by id', inject([HttpTestingController, HearingsService], (httpMock: HttpTestingController, service: HearingsService) => {
      service.getHearingActuals('1111222233334444').subscribe(response => {
        expect(response).toBeNull();
      });

      const req = httpMock.expectOne('api/hearings/hearingActuals/1111222233334444');
      expect(req.request.method).toEqual('GET');
      req.flush(null);
    }));
  });

  describe('updateHearingActuals', () => {
    const payload = {
      hearingOutcome: null,
      actualHearingDays: []
    };
    it('should update hearing actuals', inject([HttpTestingController, HearingsService], (httpMock: HttpTestingController, service: HearingsService) => {
      service.updateHearingActuals('1111222233334444', payload).subscribe(response => {
        expect(response).toBeNull();
      });

      const req = httpMock.expectOne('api/hearings/hearingActuals/1111222233334444');
      expect(req.request.method).toEqual('PUT');
      req.flush(null);
    }));
  });

  describe('submitHearingActuals', () => {
    it('should submit hearing actuals', inject([HttpTestingController, HearingsService], (httpMock: HttpTestingController, service: HearingsService) => {
      service.submitHearingActuals('1111222233334444').subscribe(response => {
        expect(response).toBeNull();
      });

      const req = httpMock.expectOne('api/hearings/hearingActualsCompletion/1111222233334444');
      expect(req.request.method).toEqual('POST');
      req.flush(null);
    }));
  });
});
