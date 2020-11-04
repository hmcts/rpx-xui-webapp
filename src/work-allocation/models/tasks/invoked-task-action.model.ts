import { Task, TaskAction } from '.';

export default interface InvokedTaskAction {
  task: Task;
  action: TaskAction;
}
