import { ActivatedRoute, ActivatedRouteSnapshot, convertToParamMap, Params } from '@angular/router';
import { CaseHearingsComponent } from './case-hearings.component';
import { HearingListingStatusEnum, HearingsSectionStatusEnum } from 'src/hearings/models/hearings.enum';
import { Observable, of } from 'rxjs';

export class ActivatedRouteMock {
  public paramMap = Observable.of(convertToParamMap({
      cid: '1234567890123456'
  }));
}

describe('CaseHearingsComponent', () => {
  let component: CaseHearingsComponent;
  let mockStore: any;

  const initialState = {
    caseHearingsMainModel: {
        hmctsServiceID: undefined,
        caseRef: undefined,
        caseHearings: [{
        hearingID: 'h555555',
        hearingType: 'Directions hearing',
        hmcStatus: HearingsSectionStatusEnum.PAST_AND_CANCELLED,
        lastResponseReceivedDateTime: '2021-08-05T16:00:00.000+0000',
        responseVersion: 'rv5',
        hearingListingStatus: HearingListingStatusEnum.CANCELLED,
        listAssistCaseStatus: '',
        hearingDaySchedule: [],
      }, {
        hearingID: 'h555555',
        hearingType: 'Directions hearing',
        hmcStatus: HearingsSectionStatusEnum.UPCOMING,
        lastResponseReceivedDateTime: '2021-08-05T16:00:00.000+0000',
        responseVersion: 'rv5',
        hearingListingStatus: HearingListingStatusEnum.CANCELLED,
        listAssistCaseStatus: '',
        hearingDaySchedule: [],
      }]
    }
  };

  beforeEach(() => {
    const mockActivatedRoute = new ActivatedRouteMock();
      mockStore = jasmine.createSpyObj('Store', ['dispatch', 'pipe']);
      mockStore.pipe.and.returnValue(of(initialState));
      const activate = mockActivatedRoute as ActivatedRoute;
      activate.snapshot = {
        params : {
          cid : '1234567890123456'
        } as Params
      } as ActivatedRouteSnapshot;
      component = new CaseHearingsComponent(mockStore, activate);
      component.ngOnInit();
  });

  it('should have a defined component', () => {
    expect(component).toBeDefined();
  });

  it('should list hearings with status off past and cancelled', async (done) => {
    component.pastAndCancelledHearings$.subscribe(result => {
        expect(result[0].hmcStatus).toEqual(HearingsSectionStatusEnum.PAST_AND_CANCELLED);
      done();
    });
  });

  it('should list hearings with status off upcoming', async (done) => {
    component.upcomingHearings$.subscribe(result => {
      console.log(result);
        expect(result[0].hmcStatus).toEqual(HearingsSectionStatusEnum.UPCOMING);
      done();
    });
  });
});
