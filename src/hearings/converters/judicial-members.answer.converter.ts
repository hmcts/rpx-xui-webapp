import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { JudicialUserModel } from '../models/judicialUser.model';
import { State } from '../store';
import { AnswerConverter } from './answer.converter';

export class JudicialMembersAnswerConverter implements AnswerConverter {
  constructor(protected readonly route: ActivatedRoute) { }

  public transformAnswer(hearingState$: Observable<State>): Observable<string> {
    const judicialUsersList: JudicialUserModel[] = this.route.snapshot.data.judicialUsers || [];

    return hearingState$.pipe(
      map(() => {
        const judicialNames: string[] = [];
        judicialUsersList.forEach(judgeInfo => {
          judicialNames.push(judgeInfo.known_as ? judgeInfo.known_as : judgeInfo.full_name);
        });
        return judicialNames.join('<br>');
      })
    );
  }
}
