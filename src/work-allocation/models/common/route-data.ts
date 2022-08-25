import { InfoMessage, TaskActionType } from '../../enums';

export interface RouteData {
  verb: TaskActionType;
  successMessage: InfoMessage;
  description?: string;
  actionTitle?: string;
}
