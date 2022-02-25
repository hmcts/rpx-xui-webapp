import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { MemberType, RequirementType } from '../models/hearings.enum';
import { JudicialUserModel } from '../models/judicialUser.model';
import { State } from '../store';
import { AnswerConverter } from './answer.converter';

export class HearingPanelMemberDisplayConverter implements AnswerConverter {
  constructor(protected readonly route: ActivatedRoute, protected readonly requirementType: RequirementType) {}

  public transformAnswer(hearingState$: Observable<State>): Observable<string> {
    return hearingState$.pipe(
      map((state) => {
        if (
          !state.hearingRequest.hearingRequestMainModel.hearingDetails ||
          !state.hearingRequest.hearingRequestMainModel.hearingDetails.panelRequirements
        )
          return;
        const panelRequirementsState =
          state.hearingRequest.hearingRequestMainModel.hearingDetails
            .panelRequirements;
        const panelDetailsResolverData = this.route.snapshot.data.panelDetails;
        let result = '<ul>';
        const personalCodes = panelRequirementsState.panelPreferences
          .filter((ref) => ref.requirementType === RequirementType[this.requirementType] && ref.memberType === MemberType.PANEL_MEMBER)
          .map((ref) => ref.memberID);

        (panelDetailsResolverData as JudicialUserModel[])
          .filter((routeData) =>
            personalCodes.includes(routeData.personal_code)
          )
          .forEach((data) => {
              result += `<li>${data.full_name}</li>`;
          });
        return result + '</ul>';
      })
    );
  }
}
