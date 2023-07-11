import { InfoMessage } from '../enums/info-message';
import { InfoMessageType } from '../enums/info-message-type';

export interface InformationMessage {
  type: InfoMessageType;
  message: InfoMessage;
}
