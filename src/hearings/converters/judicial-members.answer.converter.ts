import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { RequirementType } from '../models/hearings.enum';
import { JudicialUserModel } from '../models/judicialUser.model';
import { State } from '../store';
import { AnswerConverter } from './answer.converter';

export class JudicialMembersAnswerConverter implements AnswerConverter {
  constructor(protected readonly route: ActivatedRoute) { }

  public transformAnswer(hearingState$: Observable<State>): Observable<string> {
    const judicialUsersList: JudicialUserModel[] = this.route.snapshot.data.judicialUsers;

    return hearingState$.pipe(
      map(state => {
        const panelRequirements = state.hearingRequest.hearingRequestMainModel.hearingDetails.panelRequirements;
        const includedJudicials: string[] = panelRequirements && panelRequirements.panelPreferences.filter(preferences => preferences.requirementType === RequirementType.MUSTINC).map(preferences => preferences.memberID);
        const judicialNames: string[] = [];
        includedJudicials.forEach(judicialID => {
          const judgeInfo = judicialUsersList.find((judge) => judge.personal_code === judicialID);
          judicialNames.push(judgeInfo.known_as ? judgeInfo.known_as : judgeInfo.full_name);
        });
        return judicialNames.join('<br>');
      })
    );
  }
}
