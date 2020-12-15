import { InfoMessage, InfoMessageType } from '../enums';
import { InformationMessage } from '../models/comms/infomation-message.model';
import { InfoMessageCommService } from './info-message-comms.service';

describe('WorkAllocation: InfoMessageCommService', () => {

  describe('addMessage()', () => {

    it('should add an information message, and pass it to the Subjects next() function, so that any subscribers' +
      'to infoMessageChangeEmitted$ can be updated with the correct information message.', () => {

      const service = new InfoMessageCommService();

      const mockInfoMessageSource = spyOn(service.infoMessageSource, 'next');

      const message: InformationMessage = {
        type: InfoMessageType.SUCCESS,
        message: InfoMessage.ASSIGNED_TASK_AVAILABLE_IN_MY_TASKS,
      };

      service.addMessage(message);

      expect(mockInfoMessageSource).toHaveBeenCalledWith(message);
    });
  });
});
