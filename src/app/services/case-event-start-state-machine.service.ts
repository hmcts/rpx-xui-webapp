import { Injectable } from '@angular/core';
import { AbstractAppConfig, EventStartStateMachineService } from '@hmcts/ccd-case-ui-toolkit';

const FINAL_EVENT_START_STATE = 'final';

@Injectable()
export class CaseEventStartStateMachineService extends EventStartStateMachineService {
  public constructor(abstractConfig: AbstractAppConfig) {
    super(abstractConfig);
  }

  public override entryActionForStateNoTask(state: any, context: any): void {
    const routeSnapshot = context?.route?.snapshot;
    const caseRouteData = routeSnapshot?.data?.case ?? routeSnapshot?.parent?.data?.case;
    const jurisdiction =
      routeSnapshot?.params?.jid ??
      routeSnapshot?.parent?.params?.jid ??
      caseRouteData?.case_type?.jurisdiction?.id ??
      context?.tasks?.[0]?.jurisdiction;
    const caseType =
      routeSnapshot?.params?.ctid ??
      routeSnapshot?.parent?.params?.ctid ??
      caseRouteData?.case_type?.id ??
      context?.tasks?.[0]?.case_type_id;

    state.trigger(FINAL_EVENT_START_STATE);
    context.router.navigate([`/cases/case-details/${jurisdiction}/${caseType}/${context.caseId}/no-tasks-available`], {
      relativeTo: context.route,
    });
  }
}
