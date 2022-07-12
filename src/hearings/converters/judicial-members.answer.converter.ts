import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { JudicialUserModel } from '../models/judicialUser.model';
import { State } from '../store';
import { AnswerConverter } from './answer.converter';

export class JudicialMembersAnswerConverter implements AnswerConverter {
  constructor(protected readonly route: ActivatedRoute) { }

  public transformAnswer(hearingState$: Observable<State>, index: number): Observable<string> {
    const judicialUsersList: JudicialUserModel[] = this.route.snapshot.data.judicialResponseUsers || [];
    return hearingState$.pipe(
      map(state => {
        const hearingResponse = state.hearingRequest.hearingRequestMainModel.hearingResponse;
        const hearingJudgeId = hearingResponse
          && hearingResponse.hearingDaySchedule
          && hearingResponse.hearingDaySchedule.length
          && hearingResponse.hearingDaySchedule[index || 0]
          && hearingResponse.hearingDaySchedule[index || 0].hearingJudgeId;
        const judicialUserInfo = judicialUsersList.find(judicialUser => judicialUser.personalCode === hearingJudgeId);
        return judicialUserInfo ? judicialUserInfo.knownAs : '';
      })
    );
  }
}
