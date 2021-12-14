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
  const hearingRequestMainModel = {
    hearingRequestMainModel: {
      requestDetails: null,
      hearingDetails: null,
      partyDetails: null,
    }
  };
  let requestHearingPageFlow;
  const mockStore = jasmine.createSpyObj('Store', ['pipe', 'dispatch']);

  const mockedHttpClient = jasmine.createSpyObj('HttpClient', ['get', 'post']);
  const hearingsService = new HearingsService(mockedHttpClient);
  hearingsService.navigateAction$ = of(ACTION.CONTINUE);

  beforeEach(() => {
    mockStore.pipe.and.returnValue(of(hearingRequestMainModel));
    requestHearingPageFlow = new RequestHearingPageFlowSpec(mockStore, hearingsService);
  });

  it('should navigate continue', () => {
    requestHearingPageFlow.navigateAction(ACTION.CONTINUE);
    expect(mockStore.dispatch).toHaveBeenCalledWith(new fromHearingStore.UpdateHearingRequest(hearingRequestMainModel.hearingRequestMainModel));
  });

  it('should navigate continue', () => {
    requestHearingPageFlow.navigateAction(ACTION.BACK);
    expect(mockStore.dispatch).toHaveBeenCalledWith(new fromHearingStore.NavigateBackHearingRequest());
  });

  it('should navigate submit', () => {
    requestHearingPageFlow.navigateAction(ACTION.SUBMIT);
    expect(mockStore.dispatch).toHaveBeenCalledWith(new fromHearingStore.SubmitHearingRequest(hearingRequestMainModel.hearingRequestMainModel));
  });

  afterEach(() => {
    requestHearingPageFlow = null;
  });
});
