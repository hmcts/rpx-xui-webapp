import { NavigationExtras } from '@angular/router';
import { Observable, of } from 'rxjs';
import { ConfigConstants } from '../components/constants';
import { TaskService, TaskSort } from '../enums';
import { Caseworker, Location } from '../models/dtos';
import { Task, TaskFieldConfig, TaskServiceConfig } from '../models/tasks';

const LOCATION_A: Location = { location_id: 'a', location: 'Taylor House', is_primary: true, services: [ 'a' ] };
const LOCATION_B: Location = { location_id: 'b', location: 'Taylor Swift', services: [ 'a', 'b' ] };
const LOCATION_C: Location = { location_id: 'c', location: 'Taylor Swift', is_primary: false, services: [ 'a', 'b' ] };
export function getMockLocations(): Location[] {
  return [ LOCATION_A, LOCATION_B ];
}

export function getMockCaseworkers(): Caseworker[] {
  return [
    {
      first_name: 'John',
      last_name: 'Smith',
      id: '1',
      email_id: 'j.s@caseworkers.gov.uk',
      base_location: [LOCATION_A, LOCATION_C]
    },
    {
      first_name: 'Jane',
      last_name: 'Doe',
      id: '2',
      email_id: 'j.doe@caseworkers.gov.uk',
      base_location: [LOCATION_B]
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
      case_id: '1549476532065586',
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
      case_id: '1549476532065587',
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
