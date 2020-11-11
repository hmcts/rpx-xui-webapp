import { TaskListComponent } from './task-list/task-list.component';
import { TaskManagerComponent } from './task-manager/task-manager.component';
import { TaskHomeComponent } from './task-home/task-home.component';

export const containers: any[] = [ TaskManagerComponent, TaskListComponent, TaskHomeComponent ];

export * from './task-list/task-list.component';
export * from './task-home/task-home.component';
export * from './task-manager/task-manager.component';
