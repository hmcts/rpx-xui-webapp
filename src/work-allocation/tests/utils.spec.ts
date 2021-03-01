import { NavigationExtras } from '@angular/router';
import { Observable, of } from 'rxjs';
import { ConfigConstants } from '../components/constants';
import { TaskService, TaskSort } from '../enums';
import { Caseworker, Location } from '../models/dtos';
import { Task, TaskFieldConfig, TaskServiceConfig } from '../models/tasks';

const LOCATION_A: Location = { id: 'a', locationName: 'Taylor House', services: [ 'a' ] };
const LOCATION_B: Location = { id: 'b', locationName: 'Taylor Swift', services: [ 'a', 'b' ] };
export function getMockLocations(): Location[] {
  return [ LOCATION_A, LOCATION_B ];
}

export function getMockCaseworkers(): Caseworker[] {
  return [
    {
      firstName: 'John',
      lastName: 'Smith',
      idamId: '1',
      email: 'j.s@caseworkers.gov.uk',
      location: LOCATION_A
    },
    {
      firstName: 'Jane',
      lastName: 'Doe',
      idamId: '2',
      email: 'j.doe@caseworkers.gov.uk',
      location: LOCATION_B
    }
  ];
}

/**
 * Mock tasks
 */
export function getMockTasks(): Task[] {
  return [
    {
      id: '1549476532065586',
      caseReference: '1549476532065586',
      caseName: 'Kili Muso',
      caseCategory: 'Protection',
      location: 'Taylor House',
      taskName: 'Review respondent evidence',
      dueDate: new Date(628021800000),
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
      id: '1549476532065587',
      caseReference: '1549476532065587',
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
export function getMockTaskFieldConfig(): TaskFieldConfig[] {
  return ConfigConstants.AvailableTasks;
}

/**
 * Mock TaskServiceConfig.
 */
export function getMockTaskServiceConfig(): TaskServiceConfig {
  return {
    service: TaskService.IAC,
    defaultSortDirection: TaskSort.ASC,
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
