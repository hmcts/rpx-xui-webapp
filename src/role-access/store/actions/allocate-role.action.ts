import { Action } from '@ngrx/store';
import { AllocateRoleState, AllocateTo, TypeOfRole } from '../../models';

export enum AllocateRoleActionTypes {
  CHANGE_NAVIGATION = '[ALLOCATE ROLE] Change Navigation',
  RESET = '[ALLOCATE ROLE] Reset',
  CHOOSE_ROLE_AND_GO = '[ALLOCATE ROLE] Choose A Role And Go',
  CHOOSE_ALLOCATE_TO_AND_GO = '[ALLOCATE ROLE] Choose Allocate To And Go',
}

export class AllocateRoleReset implements Action {
  public readonly type = AllocateRoleActionTypes.RESET;
}

export class AllocateRoleChangeNavigation implements Action {
  public readonly type = AllocateRoleActionTypes.CHANGE_NAVIGATION;

  constructor(public payload: AllocateRoleState) {
  }
}

export class ChooseRoleAndGo implements Action {
  public readonly type = AllocateRoleActionTypes.CHOOSE_ROLE_AND_GO;

  constructor(public payload: { typeOfRole: TypeOfRole, allocateRoleState: AllocateRoleState }) {
  }
}

export class ChooseAllocateToAndGo implements Action {
  public readonly type = AllocateRoleActionTypes.CHOOSE_ALLOCATE_TO_AND_GO;

  constructor(public payload: { allocateTo: AllocateTo, allocateRoleState: AllocateRoleState }) {
  }
}

export type AllocateRoleAction =
  | AllocateRoleChangeNavigation
  | AllocateRoleReset
  | ChooseRoleAndGo
  | ChooseAllocateToAndGo;
