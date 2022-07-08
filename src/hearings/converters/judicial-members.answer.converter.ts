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
        const hearingJudgeId = state.hearingRequest.hearingRequestMainModel.hearingResponse
          && state.hearingRequest.hearingRequestMainModel.hearingResponse.hearingDaySchedule
          && state.hearingRequest.hearingRequestMainModel.hearingResponse.hearingDaySchedule.length
          && state.hearingRequest.hearingRequestMainModel.hearingResponse.hearingDaySchedule[index]
          && state.hearingRequest.hearingRequestMainModel.hearingResponse.hearingDaySchedule[index].hearingJudgeId;
        const judgeInfo = judicialUsersList.find(judgeInfo => judgeInfo.personalCode === hearingJudgeId);
        return judgeInfo ? judgeInfo.knownAs : '';
      })
    );
  }
}
