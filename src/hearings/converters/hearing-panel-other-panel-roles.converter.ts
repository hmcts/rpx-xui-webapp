import {ActivatedRoute} from '@angular/router';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {State} from '../store';
import {AnswerConverter} from './answer.converter';

export class HearingPanelOtherPanelRolesConverter implements AnswerConverter {

  constructor(protected readonly route: ActivatedRoute) {
  }

  public transformAnswer(hearingState$: Observable<State>): Observable<string> {
    return hearingState$.pipe(
      map(state => {
        console.log(this.route.snapshot.data.otherPanelRoles)
        let selectedPanelRoles = '<ul>'
        const panelDetailsResolverData = this.route.snapshot.data.otherPanelRoles 
        if (
          state.hearingRequest.hearingRequestMainModel.hearingDetails &&
          state.hearingRequest.hearingRequestMainModel.hearingDetails.panelRequirements &&
          state.hearingRequest.hearingRequestMainModel.hearingDetails.panelRequirements.panelSpecialisms) {
          state.hearingRequest.hearingRequestMainModel.hearingDetails.panelRequirements.panelSpecialisms.forEach(panelSpecialism => {
            const data = panelDetailsResolverData.find(panelRoles => panelRoles.key === panelSpecialism)
            if (!data) {
              let shouldSkip = false;
              !shouldSkip && panelDetailsResolverData.forEach(roles => {
                  const childNodesData = roles.child_nodes && roles.child_nodes.find(childNode => childNode.key === panelSpecialism)
                  if (!shouldSkip && childNodesData) {
                    selectedPanelRoles+=`<li>${roles.value_en} - ${childNodesData.value_en}</li>`
                    shouldSkip = true;
                  }
                  return; 
                })
              }
            else if (data) {
              selectedPanelRoles+=`<li>${data.value_en}</li>`
            }
          })
          }
        return selectedPanelRoles + "</ul>"
      })
    );
  }
}
