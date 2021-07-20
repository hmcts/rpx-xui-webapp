import { AllocateRoleContainerComponent } from './allocate-role-container/allocate-role-container.component';
import { CheckAnswersComponent } from './exclusion/check-answers/check-answers.component';
import { ChooseExclusionComponent } from './exclusion/choose-exclusion/choose-exclusion.component';
import { ChoosePersonRoleComponent } from './exclusion/choose-person-role/choose-person-role.component';
import { DescribeExclusionContainerComponent } from './exclusion/describe-exclusion-container/describe-exclusion-container.component';
import { ExclusionHomeComponent } from './exclusion/exclusion-home/exclusion-home.component';
import { ExclusionNavigationComponent } from './exclusion/exclusion-navigation/exclusion-navigation.component';
import { FindPersonComponent } from './exclusion/find-person/find-person.component';
import { RoleAccessComponent } from './role-and-access/role-access.component';

export const containers: any[] = [
  AllocateRoleContainerComponent,
  ExclusionHomeComponent,
  ExclusionNavigationComponent,
  ChooseExclusionComponent,
  ChoosePersonRoleComponent,
  FindPersonComponent,
  DescribeExclusionContainerComponent,
  CheckAnswersComponent,
  RoleAccessComponent
];

export * from './allocate-role-container/allocate-role-container.component';
export * from './exclusion/check-answers/check-answers.component';
export * from './exclusion/choose-exclusion/choose-exclusion.component';
export * from './exclusion/choose-person-role/choose-person-role.component';
export * from './exclusion/describe-exclusion-container/describe-exclusion-container.component';
export * from './exclusion/exclusion-home/exclusion-home.component';
export * from './exclusion/exclusion-navigation/exclusion-navigation.component';
export * from './exclusion/find-person/find-person.component';
export * from './role-and-access/role-access.component';
