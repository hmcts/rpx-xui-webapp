import { Task, TaskServiceConfig } from '.';

export default class TaskConfig {
  public services: TaskServiceConfig[];

  /**
   * Turns a JSON object, typically received from an api call,
   * into a strongly-typed Task object.
   */
  public static fromJson(json: object): Task {
     // TODO: This possible needs more than simple coercion.
    return json as Task;
  }
}
