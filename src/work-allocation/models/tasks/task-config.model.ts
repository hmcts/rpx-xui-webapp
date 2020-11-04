import { Task, TaskServiceConfig } from '.';

export default class TaskConfig { 
  services: TaskServiceConfig[]

  /**
   * Turns a JSON object, typically received from an api call,
   * into a strongly-typed Task object.
   * */
  public static fromJson(json: Object): Task {
     // TODO: This possible needs more than simple coercion.
    return json as Task;
  }  
};