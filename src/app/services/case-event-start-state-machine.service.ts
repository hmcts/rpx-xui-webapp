import { Injectable } from '@angular/core';
import { AbstractAppConfig, EventStartComponent, EventStartStateMachineService } from '@hmcts/ccd-case-ui-toolkit';

const FINAL_EVENT_START_STATE = 'final';
const EVENT_START_NO_TASK_PATCH_FLAG = Symbol.for('exui.event-start.no-task-route-patched');
const EVENT_START_COMPONENT_PATCH_FLAG = Symbol.for('exui.event-start.component.no-task-route-patched');

type EventStartComponentContext = {
  tasks: any[];
  caseId: string;
  eventId: string;
  taskId: string;
  router: any;
  route: any;
  sessionStorageService: any;
  cookieService: any;
  caseDetails?: any;
  jurisdiction?: string;
  caseType?: string;
};

type EventStartComponentLike = {
  service: EventStartStateMachineService;
  router: any;
  route: any;
  sessionStorageService: any;
  cookieService: any;
  abstractConfig: AbstractAppConfig;
  stateMachine: any;
  context: EventStartComponentContext;
};

const extractCaseRouteParamsFromUrl = (url?: string) => {
  if (!url) {
    return {};
  }

  const routeMatch = /\/cases\/case-details\/([^/]+)\/([^/]+)\/[^/?#]+/.exec(url);
  if (!routeMatch) {
    return {};
  }

  return {
    jurisdiction: decodeURIComponent(routeMatch[1]),
    caseType: decodeURIComponent(routeMatch[2]),
  };
};

const resolveNoTaskRouteParams = (context: any) => {
  const routeSnapshot = context?.route?.snapshot;
  const contextCaseDetails = context?.caseDetails;
  const caseRouteData = routeSnapshot?.data?.case ?? routeSnapshot?.parent?.data?.case;
  const firstTask = context?.tasks?.[0];
  const routeParamsFromUrl = extractCaseRouteParamsFromUrl(context?.router?.url);

  return {
    jurisdiction:
      context?.jurisdiction ??
      contextCaseDetails?.case_type?.jurisdiction?.id ??
      routeSnapshot?.params?.jurisdiction ??
      routeSnapshot?.params?.jid ??
      routeSnapshot?.parent?.params?.jurisdiction ??
      routeSnapshot?.parent?.params?.jid ??
      routeParamsFromUrl.jurisdiction ??
      caseRouteData?.case_type?.jurisdiction?.id ??
      firstTask?.jurisdiction,
    caseType:
      context?.caseType ??
      contextCaseDetails?.case_type?.id ??
      routeSnapshot?.params?.caseType ??
      routeSnapshot?.params?.ctid ??
      routeSnapshot?.parent?.params?.caseType ??
      routeSnapshot?.parent?.params?.ctid ??
      routeParamsFromUrl.caseType ??
      caseRouteData?.case_type?.id ??
      firstTask?.case_type_id,
  };
};

const navigateToNoTaskPage = (state: any, context: any): void => {
  const { jurisdiction, caseType } = resolveNoTaskRouteParams(context);

  state.trigger(FINAL_EVENT_START_STATE);
  context.router.navigate([`/cases/case-details/${jurisdiction}/${caseType}/${context.caseId}/no-tasks-available`], {
    relativeTo: context.route,
  });
};

const buildEventStartContext = (component: EventStartComponentLike): EventStartComponentContext => {
  const caseDetails = component.route?.snapshot?.data?.case;

  return {
    tasks: component.route?.snapshot?.data?.tasks ?? [],
    caseId: caseDetails?.case_id,
    eventId: component.route?.snapshot?.queryParams?.eventId,
    taskId: component.route?.snapshot?.queryParams?.taskId,
    router: component.router,
    route: component.route,
    sessionStorageService: component.sessionStorageService,
    cookieService: component.cookieService,
    caseDetails,
    jurisdiction: caseDetails?.case_type?.jurisdiction?.id,
    caseType: caseDetails?.case_type?.id,
  };
};

const installNoTaskRouteHandler = (service: EventStartStateMachineService): void => {
  service.entryActionForStateNoTask = function entryActionForStateNoTask(state: any, context: any): void {
    navigateToNoTaskPage(state, context);
  };
};

const eventStartStateMachinePrototype = EventStartStateMachineService.prototype as EventStartStateMachineService & {
  [EVENT_START_NO_TASK_PATCH_FLAG]?: boolean;
};

if (!eventStartStateMachinePrototype[EVENT_START_NO_TASK_PATCH_FLAG]) {
  installNoTaskRouteHandler(eventStartStateMachinePrototype);
  eventStartStateMachinePrototype[EVENT_START_NO_TASK_PATCH_FLAG] = true;
}

const eventStartComponentPrototype = EventStartComponent.prototype as EventStartComponent & {
  [EVENT_START_COMPONENT_PATCH_FLAG]?: boolean;
};

if (!eventStartComponentPrototype[EVENT_START_COMPONENT_PATCH_FLAG]) {
  eventStartComponentPrototype.ngOnInit = function ngOnInit(this: EventStartComponentLike): void {
    this.context = buildEventStartContext(this);
    this.service = new EventStartStateMachineService(this.abstractConfig);
    installNoTaskRouteHandler(this.service);
    this.stateMachine = this.service.initialiseStateMachine(this.context);
    this.service.createStates(this.stateMachine);
    this.service.addTransitions();
    this.service.startStateMachine(this.stateMachine);
  };
  eventStartComponentPrototype[EVENT_START_COMPONENT_PATCH_FLAG] = true;
}

@Injectable()
export class CaseEventStartStateMachineService extends EventStartStateMachineService {
  public constructor(abstractConfig: AbstractAppConfig) {
    super(abstractConfig);
  }

  public override entryActionForStateNoTask(state: any, context: any): void {
    navigateToNoTaskPage(state, context);
  }
}
