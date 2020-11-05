import {Component, OnInit} from '@angular/core';
import {BehaviorSubject, Observable, of} from 'rxjs';
import { map } from 'rxjs/operators';
import { Task, TaskFieldConfig } from '../../models/tasks';
import {TaskFieldType, TaskView} from '../../enums';
// import { TaskFieldType, TaskView } from '../../enums';

const columnNames = [
  'id',
  'caseReference',
  'caseName',
  'caseCategory',
  'location',
  'taskName',
  'dueDate',
  'actions',
];

/**
 * Fields is the property of the TaskFieldConfig[], containing the configuration
 * for the fields as returned by the API.
 *
 * TODO: Fields should be an Input into this component.
 * TODO: I believe that the parent component will take in TaskServiceConfig,
 * and this component will receive TaskFieldConfig[], to set the fields.
 *
 * I believe that sorting will handled by the parent component, via the
 * WP api as this component should only be responsible for the displaying
 * of the task list.
 *
 * TODO: Having a strange issue here where the compiler can't resolve,
 * TaskFieldType.STRING & TaskView.TASK_LIST
 */
const fields: TaskFieldConfig[] = [
  {
    name: 'id',
    type: 'id' as TaskFieldType.STRING,
    columnLabel: 'Id',
    views: 0x01,
  },
  {
    name: 'caseReference',
    type: 'caseReference' as TaskFieldType.STRING,
    columnLabel: 'Case reference',
    views: 0x01,
  },
  {
    name: 'caseName',
    type: 'caseName' as TaskFieldType.STRING,
    columnLabel: 'Case name',
    views: 0x01,
  },
  {
    name: 'caseCategory',
    type: 'caseCategory' as TaskFieldType.STRING,
    columnLabel: 'Case category',
    views: 0x01,
  },
  {
    name: 'location',
    type: 'location' as TaskFieldType.STRING,
    columnLabel: 'Location',
    views: 0x01,
  },
  {
    name: 'taskName',
    type: 'taskName' as TaskFieldType.STRING,
    columnLabel: 'Task',
    views: 0x01,
  },
  {
    name: 'dueDate',
    type: 'dueDate' as TaskFieldType.STRING,
    columnLabel: 'Due Date',
    views: 0x01,
  },
  {
    name: 'actions',
    type: 'actions' as TaskFieldType.STRING,
    columnLabel: 'Actions',
    views: 0x01,
  }
]

/**
 * TODO: Should take in tasks from outside datasource.
 * TODO: Should be passed into this Task List Component
 *
 * Not part of EUI-2844
 */
const tasks: Task[] = [
  {
    id: '1549476532065586',
    caseReference: '1549 4765 3206 5586',
    caseName: 'Kili Muso',
    caseCategory: 'Protection',
    location: 'Taylor House',
    taskName: 'Review respondent evidence',
    dueDate: new Date(628021800000),
    actions: [
      {
        id: 'actionId',
        title: 'actionTitle',
      }
    ]
  },
  {
    id: '1549476532065586',
    caseReference: '1549 4765 3206 5586',
    caseName: 'Mankai Lit',
    caseCategory: 'Revocation',
    location: 'Taylor House',
    taskName: 'Review appellant case',
    dueDate: new Date(628021800000),
    actions: [
      {
        id: 'actionId',
        title: 'actionTitle',
      }
    ]
  }
];

@Component({
    selector: 'exui-task-list',
    templateUrl: './task-list.component.html',
    styleUrls: ['task-list.component.scss']
  })
  export class TaskListComponent implements OnInit {

    // You can use this as a single source of truth that gets mapped to other obserables.
    // Use a single data source using BehavoirSubject
    private tasks$ = new BehaviorSubject(tasks);

    // TODO: SHould we use a BehaviorSubject for fields?

    /**
     * The datasource is an Observable of data to be displayed, as per LLD.
     */
    public dataSource$: Observable<Task[]>;

    // array of column names
    public displayedColumns = columnNames;

    public fields = fields;

    constructor() {
    }

    public ngOnInit() {
      // TODO: Consider renaming dataSource$
      this.dataSource$ = this.tasks$;
    }

    public levelUp(heroName: string) {
      // const updatedHero = this.heros$.value[heroName];
      //
      // updatedHero.attack++;
      // updatedHero.defence++;
      // updatedHero.speed++;
      // updatedHero.healing++;
      // updatedHero.recovery++;
      // updatedHero.health++;
      //
      // const newHeroData = { ...this.heros$.value, [heroName]: updatedHero };
      //
      // this.heros$.next(newHeroData);
    }
  }
