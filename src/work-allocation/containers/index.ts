import { TaskAssignmentContainerComponent } from './task-assignment/task-assignment-container.component';
import { TaskHomeComponent } from './task-home/task-home.component';
import { TaskListComponent } from './task-list/task-list.component';
import { TaskManagerComponent } from './task-manager/task-manager.component';

export const containers: any[] = [ TaskHomeComponent, TaskListComponent, TaskManagerComponent, TaskAssignmentContainerComponent ];

export * from './task-home/task-home.component';
export * from './task-list/task-list.component';
export * from './task-manager/task-manager.component';
export * from './task-assignment/task-assignment-container.component';
