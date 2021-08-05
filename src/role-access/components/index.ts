import { RolesAndAccessComponent } from '../../cases/components/roles-and-access/roles-and-access.component';
import { AnswersComponent } from './answers/answers.component';
import { CaseRolesTableComponent } from './case-roles-table/case-roles-table.component';
import { ChooseRadioOptionComponent } from './choose-radio-option/choose-radio-option.component';
import { RoleExclusionsComponent } from './role-exclusions/role-exclusions.component';

export const components: any[] = [AnswersComponent, ChooseRadioOptionComponent, RoleExclusionsComponent];

export * from './answers/answers.component';
export * from './choose-radio-option/choose-radio-option.component';
export * from './role-exclusions/role-exclusions.component';
