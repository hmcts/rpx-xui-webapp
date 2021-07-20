import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

import { InformationMessage } from '../models/comms';

@Injectable()
export class InfoMessageCommService {

  public infoMessageSource: BehaviorSubject<InformationMessage[]> = new BehaviorSubject<InformationMessage[]>([]);

  public infoMessageChangeEmitted$: Observable<InformationMessage[]> = this.infoMessageSource.asObservable();

  /**
   * Note that we use an array of messages, so that messages can be stacked on top
   * of each other in the view, as they are added.
   *
   * This comes into play for a business requirement, that requires both a 400 message,
   * and a 'Your task list has been refreshed' message to be shown one after the other.
   *
   * Use case:
   * The 400 error message is shown first, we then automatically refresh the
   * Available Tasks list, if the ATL has been refreshed, we then show the 'Your task list has been refreshed'
   * message under the 400 error message.
   *
   */
  private infoMessages: InformationMessage[] = [];

  /**
   * Helper function to remove all previous messages, and add a new message.
   */
  public nextMessage(message: InformationMessage): void {

    this.removeAllMessages();
    this.addMessage(message);
  }

  public removeAllMessages(): void {

    this.infoMessages = [];

    this.emitMessages(this.infoMessages);
  }

  public addMessage(message: InformationMessage): void {

    this.infoMessages.push(message);

    this.emitMessages(this.infoMessages);
  }

  public emitMessages(messages: InformationMessage[]): void {

    this.infoMessageSource.next(messages);
  }

  public getMessages(): InformationMessage[] {

    return this.infoMessages;
  }
}
