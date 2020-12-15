import { AvailableTasksComponent } from './available-tasks/available-tasks.component';
import { MyTasksComponent } from './my-tasks/my-tasks.component';
import { TaskAssignmentContainerComponent } from './task-assignment/task-assignment-container.component';
import { TaskHomeComponent } from './task-home/task-home.component';
import { TaskListWrapperComponent } from './task-list-wrapper/task-list-wrapper.component';
import { TaskListComponent } from './task-list/task-list.component';
import { TaskManagerListComponent } from './task-manager-list/task-manager-list.component';
import { TaskManagerComponent } from './task-manager/task-manager.component';
import { WorkAllocationHomeComponent } from './work-allocation-home/work-allocation-home.component';

export const containers: any[] = [
  AvailableTasksComponent, MyTasksComponent, TaskAssignmentContainerComponent,
  TaskHomeComponent, TaskListComponent, TaskListWrapperComponent, TaskManagerComponent,
  TaskManagerListComponent, WorkAllocationHomeComponent
];

export * from './available-tasks/available-tasks.component';
export * from './my-tasks/my-tasks.component';
export * from './task-assignment/task-assignment-container.component';
export * from './task-home/task-home.component';
export * from './task-list/task-list.component';
export * from './task-list-wrapper/task-list-wrapper.component';
export * from './task-manager/task-manager.component';
export * from './task-manager-list/task-manager-list.component';
export * from './work-allocation-home/work-allocation-home.component';
