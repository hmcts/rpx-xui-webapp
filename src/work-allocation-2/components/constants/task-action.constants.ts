import { InfoMessage, TaskActionType } from '../../enums';

export const TASK_ACTION_CONSTANTS = {
  Assign: { verb: TaskActionType.Assign, successMessage: InfoMessage.ASSIGNED_TASK },
  Cancel: {
    actionTitle: 'Cancel a task',
    verb: TaskActionType.Cancel, successMessage: InfoMessage.CANCELLED_TASK,
    description: 'Cancel a task if it\'s no longer required.'
  },
  MarkAsDone: {
    actionTitle: 'Mark the task as done',
    verb: TaskActionType.MarkAsDone, successMessage: InfoMessage.MARKED_TASK_AS_DONE,
    description: 'Mark a task as done if something has gone wrong and it has already been completed.'
  },
  Reassign: { verb: TaskActionType.Reassign, successMessage: InfoMessage.REASSIGNED_TASK },
  Unassign: {
    verb: TaskActionType.Unassign, successMessage: InfoMessage.UNASSIGNED_TASK,
    description: 'Unassign this task. This will send it back to the available task list for someone to pick up.'
  },
  UnassignNonManager: {
    verb: TaskActionType.Unassign, successMessage: InfoMessage.UNASSIGNED_TASK_NOW_IN_AVAILABLE_TASKS,
    description: 'Unassign this task. This will send it back to the available task list for someone to pick up.'
  }
};
