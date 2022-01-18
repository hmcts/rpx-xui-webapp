import {of} from 'rxjs';
import {ACTION} from '../../models/hearings.enum';
import {HearingsService} from '../../services/hearings.service';
import * as fromHearingStore from '../../store';
import {RequestHearingPageFlow} from './request-hearing.page.flow';

class RequestHearingPageFlowSpec extends RequestHearingPageFlow {
  public executeAction(action: ACTION): void {
    super.navigateAction(action);
  }
}

describe('RequestHearingPageFlow', () => {
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
  let requestHearingPageFlow;
  const mockStore = jasmine.createSpyObj('Store', ['pipe', 'dispatch']);

  const mockedHttpClient = jasmine.createSpyObj('HttpClient', ['get', 'post']);
  const hearingsService = new HearingsService(mockedHttpClient);
  hearingsService.navigateAction$ = of(ACTION.CONTINUE);

  beforeEach(() => {
    mockStore.pipe.and.returnValue(of(hearingState));
    requestHearingPageFlow = new RequestHearingPageFlowSpec(mockStore, hearingsService);
  });

  it('should navigate continue', () => {
    requestHearingPageFlow.navigateAction(ACTION.CONTINUE);
    expect(mockStore.dispatch).toHaveBeenCalledWith(new fromHearingStore.UpdateHearingRequest(hearingState.hearingRequest.hearingRequestMainModel));
  });

  it('should navigate continue', () => {
    requestHearingPageFlow.navigateAction(ACTION.BACK);
    expect(mockStore.dispatch).toHaveBeenCalledWith(new fromHearingStore.NavigateBackHearingRequest());
  });

  it('should navigate submit', () => {
    requestHearingPageFlow.navigateAction(ACTION.SUBMIT);
    expect(mockStore.dispatch).toHaveBeenCalledWith(new fromHearingStore.SubmitHearingRequest(hearingState.hearingRequest.hearingRequestMainModel));
  });

  afterEach(() => {
    requestHearingPageFlow = null;
  });
});
