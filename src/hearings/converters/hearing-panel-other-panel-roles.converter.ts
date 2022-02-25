import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { LovRefDataModel } from '../models/lovRefData.model';
import { State } from '../store';
import { AnswerConverter } from './answer.converter';

export class HearingPanelOtherPanelRolesConverter implements AnswerConverter {
  constructor(protected readonly route: ActivatedRoute) {}

  public transformAnswer(hearingState$: Observable<State>): Observable<string> {
    return hearingState$.pipe(
      map((state) => {
        if (
          !state.hearingRequest.hearingRequestMainModel.hearingDetails ||
          !state.hearingRequest.hearingRequestMainModel.hearingDetails
            .panelRequirements
        )
          return;

        let selectedPanelRoles = '<ul>';
        const panelDetailsResolverData =
          this.route.snapshot.data.otherPanelRoles;
        if (
          state.hearingRequest.hearingRequestMainModel.hearingDetails
            .panelRequirements.panelSpecialisms
        ) {
          state.hearingRequest.hearingRequestMainModel.hearingDetails.panelRequirements.panelSpecialisms.forEach(
            (panelSpecialism) => {
              const data = panelDetailsResolverData.find(
                (panelRoles) => panelRoles.key === panelSpecialism
              );
              if (data) {
                selectedPanelRoles += `<li>${data.value_en}</li>`;
              } else {
                  let shouldSkip = false;
                  panelDetailsResolverData.forEach((role) => {
                    if (!shouldSkip) {
                      const transformedRoleText = this.getPanelRoleByKey(role, panelSpecialism)
                      if (transformedRoleText) {
                        selectedPanelRoles += transformedRoleText
                        shouldSkip = true;
                      }
                    }
                  });
                }
            }
          );
        }
        return selectedPanelRoles + '</ul>';
      })
    );
  }

  public getPanelRoleByKey(panelDetailsResolverData: LovRefDataModel, panelSpecialism: string): string {
    let skip = false;
    let transformedText = ''
    console.log(panelDetailsResolverData.key + panelSpecialism)
    if (panelDetailsResolverData.child_nodes && panelDetailsResolverData.child_nodes.length) {
      panelDetailsResolverData.child_nodes.forEach(childNode => {
        if (childNode.key.toLowerCase().trim() === panelSpecialism.toLocaleLowerCase().trim() && !skip) {
          skip = true
          transformedText = `<li>${panelDetailsResolverData.value_en} - ${childNode.value_en}</li>`;
        }
      });
    } else {
      transformedText = ''
    }
    return transformedText
  }
}
