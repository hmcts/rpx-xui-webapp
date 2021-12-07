import { Person } from '@hmcts/rpx-xui-common-lib/lib/models/person.model';
import { Action } from '@ngrx/store';
import { AllocateRoleState, AllocateRoleStateData, AllocateTo, DurationOfRole, Period, RoleCategory, SpecificRole } from '../../models';

export enum AllocateRoleActionTypes {
  CHANGE_NAVIGATION = '[ALLOCATE ROLE] Change Navigation',
  RESET = '[ALLOCATE ROLE] Reset',
  SET_INITIAL_DATA = '[ALLOCATE ROLE] Set Initial Data',
  ALLOCATE_ROLE_INSTANTIATE = '[ALLOCATE ROLE] Instantiate State',
  CHOOSE_ROLE_AND_GO = '[ALLOCATE ROLE] Choose A Role And Go',
  CHOOSE_ALLOCATE_TO_AND_GO = '[ALLOCATE ROLE] Choose Allocate To And Go',
  CHOOSE_PERSON_AND_GO = '[ALLOCATE ROLE] Choose Person And Go',
  CHOOSE_DURATION_AND_GO = '[ALLOCATE ROLE] Choose Duration And Go',
  CONFIRM_ALLOCATION = '[ALLOCATE ROLE] Confirm Allocation',
}

export class ChooseDurationAndGo implements Action {
  public readonly type = AllocateRoleActionTypes.CHOOSE_DURATION_AND_GO;
  constructor(public payload: { durationOfRole: DurationOfRole, period: Period, allocateRoleState: AllocateRoleState }) {
  }
}

export class AllocateRoleReset implements Action {
  public readonly type = AllocateRoleActionTypes.RESET;
}

export class AllocateRoleSetInitData implements Action {
  public readonly type = AllocateRoleActionTypes.SET_INITIAL_DATA;
  constructor(public payload: { caseId: string, roleCategory: RoleCategory }) {
  }
}

export class AllocateRoleInstantiate implements Action {
  public readonly type = AllocateRoleActionTypes.ALLOCATE_ROLE_INSTANTIATE;
  constructor(public payload: AllocateRoleStateData) {
  }
}

export class AllocateRoleChangeNavigation implements Action {
  public readonly type = AllocateRoleActionTypes.CHANGE_NAVIGATION;
  constructor(public payload: AllocateRoleState) {
  }
}

export class ChooseRoleAndGo implements Action {
  public readonly type = AllocateRoleActionTypes.CHOOSE_ROLE_AND_GO;
  constructor(public payload: { typeOfRole: SpecificRole, allocateRoleState: AllocateRoleState }) {
  }
}

export class ChooseAllocateToAndGo implements Action {
  public readonly type = AllocateRoleActionTypes.CHOOSE_ALLOCATE_TO_AND_GO;
  constructor(public payload: { allocateTo: AllocateTo, allocateRoleState: AllocateRoleState }) {
  }
}

export class ChoosePersonAndGo implements Action {
  public readonly type = AllocateRoleActionTypes.CHOOSE_PERSON_AND_GO;
  constructor(public payload: { person: Person, allocateRoleState: AllocateRoleState }) {
  }
}

export class ConfirmAllocation implements Action {
  public readonly type = AllocateRoleActionTypes.CONFIRM_ALLOCATION;
  constructor(public payload: AllocateRoleStateData) {
  }
}

export type AllocateRoleAction =
  | AllocateRoleChangeNavigation
  | AllocateRoleSetInitData
  | AllocateRoleInstantiate
  | AllocateRoleReset
  | ChooseRoleAndGo
  | ChooseAllocateToAndGo
  | ChoosePersonAndGo
  | ChooseDurationAndGo;
