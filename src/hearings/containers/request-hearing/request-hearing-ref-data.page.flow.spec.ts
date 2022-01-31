import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { serviceHearingValuesModel } from '../../hearing.store.state.test';
import { HearingRequestMainModel } from '../../models/hearingRequestMain.model';
import { ACTION } from '../../models/hearings.enum';
import { HearingsService } from '../../services/hearings.service';
import * as fromHearingStore from '../../store';
import { RequestHearingRefDataPageFlow } from './request-hearing-ref-data.page.flow';

class RequestHearingRefDataPageFlowSpec extends RequestHearingRefDataPageFlow {
  public executeAction(action: ACTION): void {
    super.navigateAction(action);
  }
}

describe('RequestHearingRefDataPageFlow', () => {
  const hearingState = {
    hearingList: {
      hearingListMainModel: [
        {
          hmctsServiceID: 'SSCS'
        }
      ]
    },
    hearingValues: {
      serviceHearingValuesModel: {
        autoListFlag: false,
        hearingType: 'Final',
        lastError: null,
      },
      lastError: null,
    },
    hearingRequest: {
      hearingRequestMainModel: {
        requestDetails: null,
        hearingDetails: {
          duration: 1,
          hearingType: '',
          hearingLocations: [],
          hearingWindow: null,
          panelRequirements: null,
          autolistFlag: false,
          hearingPriorityType: '',
          hearingInWelshFlag: true,
        },
        partyDetails: []
      },
    },
    hearingConditions: null,
  };
  let requestHearingPageFlow: RequestHearingRefDataPageFlowSpec;
  const mockStore = jasmine.createSpyObj('Store', ['pipe', 'dispatch']);
  const mockRoute = jasmine.createSpyObj('ActivateRoute', ['snapshot']);
  const mockedHttpClient = jasmine.createSpyObj('HttpClient', ['get', 'post']);
  const hearingsService = new HearingsService(mockedHttpClient);
  hearingsService.navigateAction$ = of(ACTION.CONTINUE);

  beforeEach(() => {
    mockStore.pipe.and.returnValue(of(hearingState));
    mockRoute.snapshot.and.returnValue({
      data: of({
        caseFlags: serviceHearingValuesModel.caseFlags,
      }),
    });
    const route = ({ snapshot: { data: of({ caseFlags: serviceHearingValuesModel.caseFlags }) } } as any) as ActivatedRoute;
    requestHearingPageFlow = new RequestHearingRefDataPageFlowSpec(mockStore, hearingsService, route);
    spyOn(requestHearingPageFlow, 'assignPartyFlagToFlagId').and.callThrough();
  });


  it('should navigate continue', () => {
    requestHearingPageFlow.navigateAction(ACTION.CONTINUE);
    expect(mockStore.dispatch).toHaveBeenCalledWith(new fromHearingStore.UpdateHearingRequest(hearingState.hearingRequest.hearingRequestMainModel as HearingRequestMainModel));
  });

  it('should navigate continue', () => {
    requestHearingPageFlow.navigateAction(ACTION.BACK);
    expect(mockStore.dispatch).toHaveBeenCalledWith(new fromHearingStore.NavigateBackHearingRequest());
  });

  it('should navigate submit', () => {
    requestHearingPageFlow.navigateAction(ACTION.SUBMIT);
    expect(mockStore.dispatch).toHaveBeenCalledWith(new fromHearingStore.SubmitHearingRequest(hearingState.hearingRequest.hearingRequestMainModel as HearingRequestMainModel));
  });

  afterEach(() => {
    requestHearingPageFlow = null;
  });
});
