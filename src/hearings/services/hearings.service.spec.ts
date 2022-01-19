import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { inject, TestBed } from '@angular/core/testing';
import { StoreModule } from '@ngrx/store';
import { HearingListModel } from '../../../api/hearings/models/hearingList.model';
import { HearingListingStatusEnum, HMCStatus } from '../models/hearings.enum';
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

  describe('cancelHearingRequest', () => {
    const payload = {
      hearingID: 'h100010',
      hearingRequestDateTime: '2021-09-01T14:00:00.000+0000',
      hearingType: 'Case management preliminary hearing - open',
      hmcStatus: HMCStatus.COMPLETED,
      lastResponseReceivedDateTime: '',
      responseVersion: 'rv10',
      hearingListingStatus: HearingListingStatusEnum.COMPLETED,
      listAssistCaseStatus: '',
      hearingDaySchedule: [],
    } as HearingListModel;

    it('should cancel hearing request', inject([HttpTestingController, HearingsService], (httpMock: HttpTestingController, service: HearingsService) => {
      service.cancelHearingRequest('1111222233334444', payload).subscribe(response => {
        expect(response).toBeNull();
      });

      const req = httpMock.expectOne('api/hearings/cancelHearings?caseId=1111222233334444');
      expect(req.request.method).toEqual('PUT');
      req.flush(null);
    }));
  });
});
