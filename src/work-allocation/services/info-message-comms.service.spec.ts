import { InfoMessage, InfoMessageType } from '../enums';
import { InformationMessage } from '../models/comms/infomation-message.model';
import { InfoMessageCommService } from './info-message-comms.service';

describe('WorkAllocation: InfoMessageCommService', () => {

  /**
   * Helper function to remove all previous messages, and add a new message.
   */
  describe('nextMessage()', () => {

    it('Should make a call to removeAllMessages().', () => {

      const service = new InfoMessageCommService();

      const mockRemoveAllMessages = spyOn(service, 'removeAllMessages');

      const message = {
        type: InfoMessageType.SUCCESS,
        message: InfoMessage.ASSIGNED_TASK_AVAILABLE_IN_MY_TASKS,
      };

      service.nextMessage(message);

      expect(mockRemoveAllMessages).toHaveBeenCalled();
    });

    it('Should make a call to addMessage()', () => {

      const service = new InfoMessageCommService();

      const mockAddMessage = spyOn(service, 'addMessage');

      const message = {
        type: InfoMessageType.SUCCESS,
        message: InfoMessage.ASSIGNED_TASK_AVAILABLE_IN_MY_TASKS,
      };

      service.nextMessage(message);

      expect(mockAddMessage).toHaveBeenCalled();
    });
  });

  describe('removeAllMessages()', () => {

    it('Should remove all the information messages from the message queue.', () => {

      const service = new InfoMessageCommService();

      const message: InformationMessage = {
        type: InfoMessageType.SUCCESS,
        message: InfoMessage.ASSIGNED_TASK_AVAILABLE_IN_MY_TASKS,
      };

      service.addMessage(message);

      expect(service.getMessages()).toEqual([ message ]);

      service.removeAllMessages();

      expect(service.getMessages()).toEqual([]);
    });
  });

  describe('addMessage()', () => {

    it('Should add an information message into the message queue.', () => {

      const service = new InfoMessageCommService();

      const message: InformationMessage = {
        type: InfoMessageType.SUCCESS,
        message: InfoMessage.ASSIGNED_TASK_AVAILABLE_IN_MY_TASKS,
      };

      service.addMessage(message);

      expect(service.getMessages()).toEqual([ message ]);
    });

    it('Should add an information messages into the message queue.', () => {

      const service = new InfoMessageCommService();

      const warningMessage: InformationMessage = {
        type: InfoMessageType.WARNING,
        message: InfoMessage.TASK_NO_LONGER_AVAILABLE,
      };

      const refreshMessage: InformationMessage = {
        type: InfoMessageType.INFO,
        message: InfoMessage.LIST_OF_TASKS_REFRESHED,
      };

      service.addMessage(warningMessage);
      service.addMessage(refreshMessage);

      expect(service.getMessages()).toEqual([ warningMessage, refreshMessage ]);
    });
  });

  describe('emitMessages()', () => {

    it('should pass messages to the Subjects next() function, so that any subscribers' +
      'to infoMessageChangeEmitted$ can be updated with the correct information messages.', () => {

      const service = new InfoMessageCommService();

      const mockInfoMessageSource = spyOn(service.infoMessageSource, 'next');

      const messages: InformationMessage[] = [{
        type: InfoMessageType.SUCCESS,
        message: InfoMessage.ASSIGNED_TASK_AVAILABLE_IN_MY_TASKS,
      }];

      service.emitMessages(messages);

      expect(mockInfoMessageSource).toHaveBeenCalledWith(messages);
    });
  });
});
