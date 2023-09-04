import { State, StateMachine } from '@edium/fsm';
import { EventStartStateMachineContext } from '../models';
import * as i0 from "@angular/core";
export declare class EventStartStateMachineService {
    stateCheckForMatchingTasks: State;
    stateNoTask: State;
    stateOneTask: State;
    stateOneOrMoreTasks: State;
    stateTaskAssignedToUser: State;
    stateOneTaskAssignedToUser: State;
    stateMultipleTasksAssignedToUser: State;
    stateTaskUnassigned: State;
    stateFinal: State;
    initialiseStateMachine(context: EventStartStateMachineContext): StateMachine;
    createStates(stateMachine: StateMachine): void;
    addTransitions(): void;
    startStateMachine(stateMachine: StateMachine): void;
    /**
     * Initial entry action for state check for matching tasks, decided based on the number of tasks
     */
    entryActionForStateCheckForMatchingTasks(state: State, context: EventStartStateMachineContext): void;
    entryActionForStateNoTask(state: State, context: EventStartStateMachineContext): void;
    entryActionForStateOneOrMoreTasks(state: State, context: EventStartStateMachineContext): void;
    entryActionForStateMultipleTasks(state: State, context: EventStartStateMachineContext): void;
    entryActionForStateTaskAssignedToUser(state: State, context: EventStartStateMachineContext): void;
    entryActionForStateTaskUnAssigned(state: State, context: EventStartStateMachineContext): void;
    entryActionForStateOneTaskAssignedToUser(state: State, context: EventStartStateMachineContext): void;
    entryActionForStateMultipleTasksAssignedToUser(state: State, context: EventStartStateMachineContext): void;
    finalAction(state: State): void;
    addTransitionsForStateCheckForMatchingTasks(): void;
    addTransitionsForStateNoTask(): void;
    addTransitionsForStateOneOrMoreTasks(): void;
    addTransitionsForStateTaskUnassigned(): void;
    addTransitionsForStateTaskAssignedToUser(): void;
    addTransitionsForStateOneTaskAssignedToUser(): void;
    addTransitionsForStateMultipleTasksAssignedToUser(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<EventStartStateMachineService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<EventStartStateMachineService>;
}
//# sourceMappingURL=event-start-state-machine.service.d.ts.map