import {HttpRequest} from '@angular/common/http';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {inject, TestBed} from '@angular/core/testing';
import {StoreModule} from '@ngrx/store';
import * as _ from 'lodash';
import {initialState} from '../hearing.test.data';
import {HearingLinksStateData} from '../models/hearingLinksStateData.model';
import {HearingRequestMainModel} from '../models/hearingRequestMain.model';
import {HMCStatus} from '../models/hearings.enum';
import {LinkedHearingGroupMainModel, ServiceLinkedCasesModel} from '../models/linkHearings.model';
import {LovRefDataModel} from '../models/lovRefData.model';
import {HearingsService} from './hearings.service';

const source: ServiceLinkedCasesModel[] = [
  {
    caseReference: '4652724902696213',
    caseName: 'Smith vs Peterson',
    reasonsForLink: [
      'Linked for a hearing'
    ],
    hearings: [
      {
        hearingId: 'h10001',
        hearingStage: 'Final',
        isSelected: true,
        hearingStatus: 'Awaiting',
        hearingIsInLinkedGroup: false
      }
    ]
  },
  {
    caseReference: '5283819672542864',
    caseName: 'Smith vs Peterson',
    reasonsForLink: [
      'Linked for a hearing',
      'Progressed as part of lead case'
    ],
    hearings: [
      {
        hearingId: 'h10001',
        hearingStage: 'Final',
        isSelected: true,
        hearingStatus: 'Awaiting',
        hearingIsInLinkedGroup: false
      }
    ]
  },
  {
    caseReference: '8254902572336147',
    caseName: 'Smith vs Peterson',
    reasonsForLink: [
      'Familial',
      'Guardian',
      'Linked for a hearing'
    ],
    hearings: [{
      hearingId: 'h100010',
      hearingStage: HMCStatus.UPDATE_REQUESTED,
      isSelected: false,
      hearingStatus: HMCStatus.AWAITING_LISTING,
      hearingIsInLinkedGroup: false
    }, {
      hearingId: 'h100012',
      hearingStage: HMCStatus.UPDATE_REQUESTED,
      isSelected: false,
      hearingStatus: HMCStatus.AWAITING_LISTING,
      hearingIsInLinkedGroup: false
    }]
  }
];


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
      service.loadHearingValues('SSCS', '1111222233334444').subscribe(response => {
        expect(response).toBeNull();
      });

      const req = httpMock.expectOne('api/hearings/loadServiceHearingValues?jurisdictionId=SSCS');
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
    const hearingRequest: HearingRequestMainModel = _.cloneDeep(initialState.hearings.hearingRequest);
    const payload = {
      ...hearingRequest,
      requestDetails: {
        ...hearingRequest.requestDetails,
        hearingRequestID: 'h100000'
      }
    };
    it('should update hearing request', inject([HttpTestingController, HearingsService], (httpMock: HttpTestingController, service: HearingsService) => {
      service.updateHearingRequest(payload).subscribe(response => {
        expect(response).toBeNull();
      });
      httpMock.expectOne((req: HttpRequest<any>) => {
        expect(req.url).toBe('api/hearings/updateHearingRequest');
        expect(req.method).toBe('PUT');
        expect(req.params.get('hearingId')).toEqual('h100000');
        return true;
      })
        .flush(null);
    }));
  });

  describe('cancelHearingRequest', () => {
    const payload: LovRefDataModel[] = [
      {
        key: 'reasonOne',
        value_en: 'Reason 1',
        value_cy: '',
        hint_text_en: 'reason 1',
        hint_text_cy: '',
        lov_order: 1,
        parent_key: null,
        category_key: 'CancelHearingReason',
        parent_category: '',
        active_flag: 'Y',
        child_nodes: null,
      },
      {
        key: 'reasonTwo',
        value_en: 'Reason 2',
        value_cy: '',
        hint_text_en: 'Reason 2',
        hint_text_cy: '',
        lov_order: 2,
        parent_key: null,
        category_key: 'CancelHearingReason',
        parent_category: '',
        active_flag: 'Y',
        child_nodes: null,
      },
      {
        key: 'reasonThree',
        value_en: 'Reason 3',
        value_cy: '',
        hint_text_en: 'Reason 3',
        hint_text_cy: '',
        lov_order: 4,
        parent_key: null,
        category_key: 'CancelHearingReason',
        parent_category: '',
        active_flag: 'Y',
        child_nodes: null,
      },
    ];

    it('should cancel hearing request', inject([HttpTestingController, HearingsService], (httpMock: HttpTestingController, service: HearingsService) => {
      const cancellationReasonCode: string = payload.map(reason => reason.key)[0];
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

      const req = httpMock.expectOne('api/hearings/hearingActuals?hearingId=1111222233334444');
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

  describe('link hearing services', () => {
    it('should call loadServiceLinkedCases', inject([HttpTestingController, HearingsService], (httpMock: HttpTestingController, service: HearingsService) => {
      service.loadServiceLinkedCases('SSCS', '1111222233334444', 'h1000000').subscribe(response => {
        expect(response).toBeNull();
      });

      const req = httpMock.expectOne('api/hearings/loadServiceLinkedCases?jurisdictionId=SSCS');
      expect(req.request.method).toEqual('POST');
      req.flush(null);
    }));

    it('should call getLinkedHearingGroup', inject([HttpTestingController, HearingsService], (httpMock: HttpTestingController, service: HearingsService) => {
      service.getLinkedHearingGroup('1').subscribe(response => {
        expect(response).toBeNull();
      });

      const req = httpMock.expectOne('api/hearings/getLinkedHearingGroup?groupId=1');
      expect(req.request.method).toEqual('GET');
      req.flush(null);
    }));

    it('should call postLinkedHearingGroup', inject([HttpTestingController, HearingsService], (httpMock: HttpTestingController, service: HearingsService) => {
      service.postLinkedHearingGroup(null).subscribe(response => {
        expect(response).toBeNull();
      });

      const req = httpMock.expectOne('api/hearings/postLinkedHearingGroup');
      expect(req.request.method).toEqual('POST');
      req.flush(null);
    }));

    it('should call putLinkedHearingGroup', inject([HttpTestingController, HearingsService], (httpMock: HttpTestingController, service: HearingsService) => {
      service.putLinkedHearingGroup(null).subscribe(response => {
        expect(response).toBeNull();
      });

      const req = httpMock.expectOne('api/hearings/putLinkedHearingGroup');
      expect(req.request.method).toEqual('PUT');
      req.flush(null);
    }));

    it('should call getAllCaseInformation', inject([HttpTestingController, HearingsService], (httpMock: HttpTestingController, service: HearingsService) => {
      const linkedState: HearingLinksStateData = {
        serviceLinkedCases: source,
        linkedHearingGroup: {} as LinkedHearingGroupMainModel
      };
      const isManageLink: boolean = false;
      const currentCase: ServiceLinkedCasesModel = {
        caseReference: '4652724902696213',
        caseName: 'test',
        reasonsForLink: [],
      };
      service.getAllCaseInformation(currentCase, linkedState, isManageLink).subscribe(response => {
        expect(response).toBeNull();
      });
      const req = httpMock.expectOne('api/hearings/getHearings?caseId=4652724902696213');
      expect(req.request.method).toEqual('GET');
      req.flush(null);
    }));


    it('should call getAllCaseInformation', inject([HttpTestingController, HearingsService], (httpMock: HttpTestingController, service: HearingsService) => {
      const linkedState: HearingLinksStateData = {
        serviceLinkedCases: null,
        linkedHearingGroup: {} as LinkedHearingGroupMainModel
      };
      const isManageLink: boolean = false;
      const currentCase: ServiceLinkedCasesModel = {
        caseReference: '4652724902696213',
        caseName: 'test',
        reasonsForLink: [],
      };
      service.getAllCaseInformation(currentCase, linkedState, isManageLink).subscribe(response => {
        expect(response).toBeNull();
      });
    }));

    it('should call deleteLinkedHearingGroup', inject([HttpTestingController, HearingsService], (httpMock: HttpTestingController, service: HearingsService) => {
      service.deleteLinkedHearingGroup('g100000').subscribe(response => {
        expect(response).toBeNull();
      });

      httpMock.expectOne((req: HttpRequest<any>) => {
        expect(req.url).toBe('api/hearings/deleteLinkedHearingGroup');
        expect(req.method).toBe('DELETE');
        expect(req.params.get('hearingGroupId')).toEqual('g100000');
        return true;
      })
        .flush(null);
    }));
  });

});
