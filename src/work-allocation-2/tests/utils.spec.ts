import { NavigationExtras } from '@angular/router';
import { Observable, of } from 'rxjs';

import { RoleCategory } from '../../role-access/models';
import { ConfigConstants } from '../components/constants';
import { CaseService, SortOrder, TaskService } from '../enums';
import { Case, CaseServiceConfig } from '../models/cases';
import { FieldConfig } from '../models/common';
import { Caseworker, Location } from '../models/dtos';
import { Task, TaskServiceConfig } from '../models/tasks';

const LOCATION_A: Location = { id: 'a', locationName: 'Taylor House', services: ['a'] };
const LOCATION_B: Location = { id: 'b', locationName: 'Taylor Swift', services: ['a', 'b'] };
export function getMockLocations(): Location[] {
  return [LOCATION_A, LOCATION_B];
}

export function getMockCaseworkers(): Caseworker[] {
  return [
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
}

/**
 * Mock cases
 */
export function getMockCases(): Case[] {
  return [
    {
      id: '1549476532065586',
      case_id: '1549476532065586',
      taskId: '1549476532065586',
      caseName: 'Kili Muso',
      caseCategory: 'Protection',
      location: 'Taylor House',
      taskName: 'Review respondent evidence',
      dueDate: new Date(628021800000),
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
}

/**
 * Mock tasks
 */
export function getMockTasks(): Task[] {
  return [
    {
      assignee: null,
      assigneeName: null,
      id: '1549476532065586',
      description: null,
      case_id: '1549476532065586',
      taskId: '1549476532065586',
      caseName: 'Kili Muso',
      caseCategory: 'Protection',
      location: 'Taylor House',
      taskName: 'Review respondent evidence',
      dueDate: new Date(628021800000),
      warnings: true,
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
}

/**
 * Mock fields
 */

export function getMockCaseFieldConfig(): FieldConfig[] {
  return ConfigConstants.MyCases;
}

export function getMockTaskFieldConfig(): FieldConfig[] {
  return ConfigConstants.AvailableTasksForJudicial;
}

/**
 * Mock CaseServiceConfig.
 */
export function getMockCaseServiceConfig(): CaseServiceConfig {
  return {
    service: CaseService.IAC,
    defaultSortDirection: SortOrder.ASC,
    defaultSortFieldName: 'dueDate',
    fields: getMockCaseFieldConfig()
  };
}

/**
 * Mock TaskServiceConfig.
 */
export function getMockTaskServiceConfig(): TaskServiceConfig {
  return {
    service: TaskService.IAC,
    defaultSortDirection: SortOrder.ASC,
    defaultSortFieldName: 'dueDate',
    fields: getMockTaskFieldConfig()
  };
}

export class MockRouter {
  private pUrl: string = 'bob';
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
