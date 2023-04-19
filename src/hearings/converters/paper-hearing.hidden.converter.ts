import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HearingChannelEnum } from '../models/hearings.enum';
import { State } from '../store';
import { HiddenConverter } from './hidden.converter';

export class PaperHearingHiddenConverter implements HiddenConverter {
  public transformHidden(hearingState$: Observable<State>): Observable<boolean> {
    return hearingState$.pipe(map((state) => {
      return state.hearingRequest.hearingRequestMainModel.hearingDetails.hearingChannels.includes(HearingChannelEnum.ONPPR);
    }
    ));
  }
}
