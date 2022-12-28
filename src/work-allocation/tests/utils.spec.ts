import { NavigationExtras, RouterEvent } from '@angular/router';
import { Observable, of } from 'rxjs';
import { CaseRoleDetails } from 'src/role-access/models/case-role-details.interface';

import { RoleCategory } from '../../role-access/models';
import { ConfigConstants } from '../components/constants';
import { CaseService, SortOrder, TaskService } from '../enums';
import { Case, CaseServiceConfig } from '../models/cases';
import { FieldConfig } from '../models/common';
import { Caseworker, Location } from '../models/dtos';
import { Task, TaskServiceConfig } from '../models/tasks';

const LOCATION_A: Location = { id: 'a', locationName: 'Taylor House', services: ['a'] };
const LOCATION_B: Location = { id: 'b', locationName: 'Taylor Swift', services: ['a', 'b'] };

export const getMockLocations = (): Location[] => [LOCATION_A, LOCATION_B];
export const getMockCaseworkers = (): Caseworker[] => [
  {
    firstName: 'John',
    lastName: 'Smith',
    idamId: '1',
    email: 'j.s@caseworkers.gov.uk',
    location: LOCATION_A,
    roleCategory: RoleCategory.LEGAL_OPERATIONS
  },
  {
    firstName: 'Jane',
    lastName: 'Doe',
    idamId: '2',
    email: 'j.doe@caseworkers.gov.uk',
    location: LOCATION_B,
    roleCategory: RoleCategory.LEGAL_OPERATIONS
  }
];

export const getMockCaseRoles = (): CaseRoleDetails[] => [
  {
    sidam_id: '123456789',
    known_as: 'Test',
    full_name: 'Mr Test',
    surname: 'Test',
    idam_id: null,
    email_id: 'test@test.com'
  },
  {
    sidam_id: null,
    known_as: 'Extra Testing',
    full_name: 'Sir Testing',
    surname: 'Testing',
    idam_id: '023456780',
    email_id: 'test@test.com'
  }
];

/**
 * Mock cases
 */
export const getMockCases = (): Case[] => [
  {
    id: '1549476532065586',
    case_id: '1549476532065586',
    taskId: '1549476532065586',
    caseName: 'Kili Muso',
    caseCategory: 'Protection',
    location: 'Taylor House',
    taskName: 'Review respondent evidence',
    dueDate: new Date(628021800000),
    role_category: 'JUDICIAL',
    assignee: '123456789',
    actions: [
      {
        id: 'reallocate',
        title: 'Reallocate',
      },
      {
        id: 'remove',
        title: 'Remove Allocation',
      }
    ]
  },
  {
    id: '1549476532065587',
    case_id: '1549476532065587',
    taskId: '1549476532065587',
    caseName: 'Mankai Lit',
    caseCategory: 'Revocation',
    location: 'Taylor House',
    taskName: 'Review appellant case',
    dueDate: new Date(628021800000),
    role_category: 'LEGAL_OPERATIONS',
    actions: [
      {
        id: 'reallocate',
        title: 'Reallocate',
      },
      {
        id: 'remove',
        title: 'Remove Allocation',
      }
    ]
  }
];

/**
 * Mock tasks
 */
export const getMockTasks = (): Task[] => [
  {
    assignee: null,
    assigneeName: null,
    id: '1549476532065586',
    jurisdiction: 'IA',
    description: null,
    case_id: '1549476532065586',
    taskId: '1549476532065586',
    caseName: 'Kili Muso',
    caseCategory: 'Protection',
    location: 'Taylor House',
    taskName: 'Review respondent evidence',
    dueDate: new Date(628021800000),
    warnings: true,
    warning_list: {
      values: [
        {
          code: '125',
          text: 'this is a warning message 3'
        }
      ]
    },
    actions: [
      {
        id: 'actionId1',
        title: 'Reassign task',
      },
      {
        id: 'actionId2',
        title: 'Release this task',
      }
    ]
  },
  {
    assignee: null,
    assigneeName: null,
    description: null,
    id: '1549476532065587',
    jurisdiction: 'IA',
    case_id: '1549476532065587',
    taskId: '1549476532065587',
    caseName: 'Mankai Lit',
    caseCategory: 'Revocation',
    location: 'Taylor House',
    taskName: 'Review appellant case',
    dueDate: new Date(628021800000),
    actions: [
      {
        id: 'actionId2',
        title: 'Release this task',
      }
    ]
  }
];

/**
 * Mock fields
 */

export const getMockCaseFieldConfig = (): FieldConfig[] => ConfigConstants.MyCases;
export const getMockTaskFieldConfig = (): FieldConfig[] => ConfigConstants.AvailableTasksForJudicial;

/**
 * Mock CaseServiceConfig.
 */
export const getMockCaseServiceConfig = (): CaseServiceConfig => ({
  service: CaseService.IAC,
  defaultSortDirection: SortOrder.ASC,
  defaultSortFieldName: 'dueDate',
  fields: getMockCaseFieldConfig()
});

/**
 * Mock TaskServiceConfig.
 */
export const getMockTaskServiceConfig = (): TaskServiceConfig => ({
  service: TaskService.IAC,
  defaultSortDirection: SortOrder.ASC,
  defaultSortFieldName: 'dueDate',
  fields: getMockTaskFieldConfig()
});

export class MockRouter {
  public navigateByUrl = jasmine.createSpy();
  public events = {
    subscribe: () => of(null)
  };
  private pUrl = 'bob';
  public get url(): string {
    return this.pUrl;
  }
  public set url(value: string) {
    this.pUrl = value;
  }
  private readonly pNavigateCalls: any[] = [];
  public get navigateCalls(): any[] {
    return this.pNavigateCalls;
  }
  public navigate(commands: any[], extras?: NavigationExtras): Observable<boolean> {
    this.pNavigateCalls.push({ commands, extras });
    return of(true);
  }
}
