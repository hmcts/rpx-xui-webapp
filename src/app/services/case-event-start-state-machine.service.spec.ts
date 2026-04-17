import { AbstractAppConfig, EventStartComponent, EventStartStateMachineService } from '@hmcts/ccd-case-ui-toolkit';
import { CaseEventStartStateMachineService } from './case-event-start-state-machine.service';

describe('CaseEventStartStateMachineService', () => {
  const abstractConfig = {} as AbstractAppConfig;

  const createState = () => ({
    trigger: jasmine.createSpy('trigger'),
  });

  const createContext = (overrides: any = {}) => {
    const route = overrides.route ?? {
      snapshot: {
        params: {},
        data: {},
        queryParams: {},
        parent: {
          params: {},
          data: {},
        },
      },
    };

    const router = overrides.router ?? {
      navigate: jasmine.createSpy('navigate'),
      url: overrides.routerUrl,
    };

    return {
      tasks: [],
      caseId: '1620409659381330',
      eventId: 'submit',
      taskId: 'task-id',
      route,
      router,
      sessionStorageService: {},
      cookieService: {},
      ...overrides,
    };
  };

  it('navigates with the jurisdiction and case type already present in the context', () => {
    const service = new CaseEventStartStateMachineService(abstractConfig);
    const state = createState();
    const context = createContext({
      jurisdiction: 'IA',
      caseType: 'Asylum',
    });

    service.entryActionForStateNoTask(state as any, context as any);

    expect(state.trigger).toHaveBeenCalledWith('final');
    expect(context.router.navigate).toHaveBeenCalledWith(['/cases/case-details/IA/Asylum/1620409659381330/no-tasks-available'], {
      relativeTo: context.route,
    });
  });

  it('falls back to jid and ctid route params when case metadata is missing', () => {
    const service = new CaseEventStartStateMachineService(abstractConfig);
    const state = createState();
    const context = createContext({
      route: {
        snapshot: {
          params: {
            jid: 'WA',
            ctid: 'TaskCase',
          },
          data: {},
          queryParams: {},
          parent: {
            params: {},
            data: {},
          },
        },
      },
    });

    service.entryActionForStateNoTask(state as any, context as any);

    expect(context.router.navigate).toHaveBeenCalledWith(
      ['/cases/case-details/WA/TaskCase/1620409659381330/no-tasks-available'],
      { relativeTo: context.route }
    );
  });

  it('falls back to parent route params when the current snapshot does not include them', () => {
    const service = new CaseEventStartStateMachineService(abstractConfig);
    const state = createState();
    const context = createContext({
      route: {
        snapshot: {
          params: {},
          data: {},
          queryParams: {},
          parent: {
            params: {
              jurisdiction: 'SSCS',
              caseType: 'Benefit',
            },
            data: {},
          },
        },
      },
    });

    service.entryActionForStateNoTask(state as any, context as any);

    expect(context.router.navigate).toHaveBeenCalledWith(
      ['/cases/case-details/SSCS/Benefit/1620409659381330/no-tasks-available'],
      { relativeTo: context.route }
    );
  });

  it('falls back to decoded jurisdiction and case type parsed from the router url', () => {
    const service = new CaseEventStartStateMachineService(abstractConfig);
    const state = createState();
    const context = createContext({
      router: {
        navigate: jasmine.createSpy('navigate'),
        url: '/cases/case-details/IA%20Civil/Asylum%20Case/1620409659381330/tasks',
      },
    });

    service.entryActionForStateNoTask(state as any, context as any);

    expect(context.router.navigate).toHaveBeenCalledWith(
      ['/cases/case-details/IA Civil/Asylum Case/1620409659381330/no-tasks-available'],
      { relativeTo: context.route }
    );
  });

  it('falls back to case data on the resolved route when the current url does not match case-details', () => {
    const service = new CaseEventStartStateMachineService(abstractConfig);
    const state = createState();
    const context = createContext({
      router: {
        navigate: jasmine.createSpy('navigate'),
        url: '/work/my-work/list',
      },
      route: {
        snapshot: {
          params: {},
          data: {
            case: {
              case_type: {
                id: 'Probate',
                jurisdiction: {
                  id: 'PRLAPPS',
                },
              },
            },
          },
          queryParams: {},
          parent: {
            params: {},
            data: {},
          },
        },
      },
    });

    service.entryActionForStateNoTask(state as any, context as any);

    expect(context.router.navigate).toHaveBeenCalledWith(
      ['/cases/case-details/PRLAPPS/Probate/1620409659381330/no-tasks-available'],
      { relativeTo: context.route }
    );
  });

  it('falls back to the first task metadata when there is no route metadata at all', () => {
    const service = new CaseEventStartStateMachineService(abstractConfig);
    const state = createState();
    const context = createContext({
      tasks: [
        {
          jurisdiction: 'PublicLaw',
          case_type_id: 'CareSupervision',
        },
      ],
      router: {
        navigate: jasmine.createSpy('navigate'),
      },
    });

    service.entryActionForStateNoTask(state as any, context as any);

    expect(context.router.navigate).toHaveBeenCalledWith(
      ['/cases/case-details/PublicLaw/CareSupervision/1620409659381330/no-tasks-available'],
      { relativeTo: context.route }
    );
  });

  it('patches EventStartComponent ngOnInit to build context and install the no-task handler', () => {
    const stateMachine = { id: 'state-machine' };
    const initialiseStateMachine = spyOn(EventStartStateMachineService.prototype, 'initialiseStateMachine').and.returnValue(
      stateMachine as any
    );
    const createStates = spyOn(EventStartStateMachineService.prototype, 'createStates').and.stub();
    const addTransitions = spyOn(EventStartStateMachineService.prototype, 'addTransitions').and.stub();
    const startStateMachine = spyOn(EventStartStateMachineService.prototype, 'startStateMachine').and.stub();

    const route = {
      snapshot: {
        params: {},
        queryParams: {
          eventId: 'makeDecision',
          taskId: 'task-123',
        },
        data: {
          case: {
            case_id: '1234567890123456',
            case_type: {
              id: 'Asylum',
              jurisdiction: {
                id: 'IA',
              },
            },
          },
          tasks: [
            {
              jurisdiction: 'ShouldNotBeUsed',
              case_type_id: 'IgnoredByCaseDetails',
            },
          ],
        },
        parent: {
          params: {},
          data: {},
        },
      },
    };

    const component = {
      abstractConfig,
      cookieService: {},
      context: undefined,
      route,
      router: {
        navigate: jasmine.createSpy('navigate'),
      },
      service: undefined,
      sessionStorageService: {},
      stateMachine: undefined,
    };

    EventStartComponent.prototype.ngOnInit.call(component as any);

    expect(component.context).toEqual({
      tasks: route.snapshot.data.tasks,
      caseId: '1234567890123456',
      eventId: 'makeDecision',
      taskId: 'task-123',
      router: component.router,
      route,
      sessionStorageService: component.sessionStorageService,
      cookieService: component.cookieService,
      caseDetails: route.snapshot.data.case,
      jurisdiction: 'IA',
      caseType: 'Asylum',
    });
    expect(initialiseStateMachine).toHaveBeenCalledWith(component.context);
    expect(component.stateMachine).toBe(stateMachine);
    expect(createStates).toHaveBeenCalledWith(stateMachine as any);
    expect(addTransitions).toHaveBeenCalled();
    expect(startStateMachine).toHaveBeenCalledWith(stateMachine as any);

    const state = createState();
    (component.service as EventStartStateMachineService).entryActionForStateNoTask(state as any, component.context as any);

    expect(component.router.navigate).toHaveBeenCalledWith(
      ['/cases/case-details/IA/Asylum/1234567890123456/no-tasks-available'],
      { relativeTo: route }
    );
  });
});
