import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { JudicialUserModel } from '../models/judicialUser.model';
import { State } from '../store';
import { AnswerConverter } from './answer.converter';

export class PanelMembersAnswerConverter implements AnswerConverter {
  constructor(protected readonly route: ActivatedRoute) {}

  public transformAnswer(hearingState$: Observable<State>): Observable<string> {
    const panelMembers: JudicialUserModel[] = this.route.snapshot.data.panelMemberResponseUsers || [];

    return hearingState$.pipe(
      map(() => {
        const panelMemberNames: string[] = [];
        panelMembers.forEach((panelMemberInfo) => {
          panelMemberNames.push(panelMemberInfo.fullName);
        });
        return panelMemberNames.join('<br>');
      })
    );
  }
}
