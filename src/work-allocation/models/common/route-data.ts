import { InfoMessage } from 'src/app/shared/enums/info-message';
import { TaskActionType } from '../../enums';

export interface RouteData {
  verb: TaskActionType;
  successMessage: InfoMessage;
  description?: string;
  actionTitle?: string;
}
