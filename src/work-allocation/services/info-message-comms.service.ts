import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { InformationMessage } from '../models/comms/infomation-message.model';

@Injectable()
export class InfoMessageCommService {
  public constructor() {}

  private infoMessageSource = new Subject<InformationMessage>();

  public infoMessageChangeEmitted$ = this.infoMessageSource.asObservable();

  public emitInfoMessageChange(message: InformationMessage) {

    this.infoMessageSource.next(message);
  }
}
