import { AddExclusionHomeComponent } from './add-exclusion/add-exclusion-home/add-exclusion-home.component';
import { CheckAnswersComponent } from './add-exclusion/check-answers/check-answers.component';
import { ChooseExclusionComponent } from './add-exclusion/choose-exclusion/choose-exclusion.component';
import { ChoosePersonRoleComponent } from './add-exclusion/choose-person-role/choose-person-role.component';
import { DescribeExclusionComponent } from './add-exclusion/describe-exclusion/describe-exclusion.component';
import { ExclusionNavigationComponent } from './add-exclusion/exclusion-navigation/exclusion-navigation.component';
import { SearchPersonComponent } from './add-exclusion/search-person/search-person.component';
import { RoleAccessComponent } from './role-and-access/role-access.component';

export const containers: any[] = [
  AddExclusionHomeComponent,
  ExclusionNavigationComponent,
  ChooseExclusionComponent,
  ChoosePersonRoleComponent,
  SearchPersonComponent,
  DescribeExclusionComponent,
  CheckAnswersComponent,
  RoleAccessComponent
];

export * from './add-exclusion/check-answers/check-answers.component';
export * from './add-exclusion/choose-exclusion/choose-exclusion.component';
export * from './add-exclusion/choose-person-role/choose-person-role.component';
export * from './add-exclusion/describe-exclusion/describe-exclusion.component';
export * from './add-exclusion/add-exclusion-home/add-exclusion-home.component';
export * from './add-exclusion/exclusion-navigation/exclusion-navigation.component';
export * from './add-exclusion/search-person/search-person.component';
export * from './role-and-access/role-access.component';
