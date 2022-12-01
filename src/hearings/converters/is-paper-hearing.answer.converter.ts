import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HearingChannelEnum } from '../../hearings/models/hearings.enum';
import { State } from '../store';
import { AnswerConverter } from './answer.converter';

export class IsPaperHearingAnswerConverter implements AnswerConverter {
  public transformAnswer(hearingState$: Observable<State>): Observable<string> {
    return hearingState$.pipe(
      map(state => state.hearingRequest.hearingRequestMainModel.hearingDetails.hearingChannels.includes(HearingChannelEnum.ONPPR) ? 'Yes' : 'No')
    );
  }
}
