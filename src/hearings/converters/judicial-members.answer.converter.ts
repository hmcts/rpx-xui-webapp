import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { JudicialUserModel } from '../models/judicialUser.model';
import { State } from '../store';
import { AnswerConverter } from './answer.converter';

export class JudicialMembersAnswerConverter implements AnswerConverter {
  constructor(protected readonly route: ActivatedRoute) { }

  public transformAnswer(hearingState$: Observable<State>): Observable<string> {
    const judicialUsersList: JudicialUserModel[] = this.route.snapshot.data.judicialResponseUsers || [];

    return hearingState$.pipe(
      map(() => {
        const judicialNames: string[] = [];
        judicialUsersList.forEach(judgeInfo => {
          judicialNames.push(judgeInfo.fullName);
        });
        return judicialNames.join('<br>');
      })
    );
  }
}
