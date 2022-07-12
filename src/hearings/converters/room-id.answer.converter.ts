import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { State } from '../store';
import { AnswerConverter } from './answer.converter';

export class RoomIdAnswerConverter implements AnswerConverter {

  public transformAnswer(hearingState$: Observable<State>, index: number): Observable<string> {
    return hearingState$.pipe(
      map(state => {
        const hearingResponse = state.hearingRequest.hearingRequestMainModel.hearingResponse;
        return hearingResponse && hearingResponse.hearingDaySchedule[index || 0] && hearingResponse.hearingDaySchedule[index || 0].hearingRoomId;
      })
    );
  }
}
