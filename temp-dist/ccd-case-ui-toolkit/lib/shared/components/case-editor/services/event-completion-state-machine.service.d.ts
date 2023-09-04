import { State, StateMachine } from '@edium/fsm';
import { EventCompletionStateMachineContext } from '../domain/event-completion-state-machine-context.model';
import * as i0 from "@angular/core";
export declare class EventCompletionStateMachineService {
    stateCheckTasksCanBeCompleted: State;
    stateCompleteEventAndTask: State;
    stateCancelEvent: State;
    stateCompleteEventNotTask: State;
    stateTaskCompletedOrCancelled: State;
    stateTaskAssignedToAnotherUser: State;
    stateTaskReassignToUser: State;
    stateTaskAssignToUser: State;
    stateTaskUnassigned: State;
    stateFinal: State;
    initialiseStateMachine(context: EventCompletionStateMachineContext): StateMachine;
    startStateMachine(stateMachine: StateMachine): void;
    createStates(stateMachine: StateMachine): void;
    addTransitions(): void;
    entryActionForStateCheckTasksCanBeCompleted(state: State, context: EventCompletionStateMachineContext): void;
    entryActionForStateTaskCompletedOrCancelled(state: State, context: EventCompletionStateMachineContext): void;
    entryActionForStateCompleteEventAndTask(state: State, context: EventCompletionStateMachineContext): void;
    entryActionForStateTaskAssignedToAnotherUser(state: State, context: EventCompletionStateMachineContext): void;
    entryActionForStateTaskUnassigned(state: State, context: EventCompletionStateMachineContext): void;
    entryActionForStateFinal(state: State, context: EventCompletionStateMachineContext): void;
    addTransitionsForStateCheckTasksCanBeCompleted(): void;
    addTransitionsForStateTaskCompletedOrCancelled(): void;
    addTransitionsForStateCompleteEventAndTask(): void;
    addTransitionsForStateTaskAssignedToAnotherUser(): void;
    addTransitionsForStateTaskUnassigned(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<EventCompletionStateMachineService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<EventCompletionStateMachineService>;
}
//# sourceMappingURL=event-completion-state-machine.service.d.ts.map