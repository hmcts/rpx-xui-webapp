import {HearingResponseModel} from './hearingResponse.model';
import {HearingRequestMainModel} from './hearingRequestMain.model';

export interface HearingResponseMainModel extends HearingRequestMainModel {
  hearingResponse: HearingResponseModel;
}
