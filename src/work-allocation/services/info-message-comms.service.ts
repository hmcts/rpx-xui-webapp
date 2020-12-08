import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { InfoMessage, InfoMessageType } from '../enums';

@Injectable()
export class InfoMessageCommService {
  public constructor() {}

  // TODO: type
  private emitChangeSource = new Subject<any>();

  public changeEmitted$ = this.emitChangeSource.asObservable();

  // TODO: emitInfoMessageChange

  public emitInfoMessageChange(type: InfoMessageType, message: InfoMessage) {

    // TODO: Check if this is the right way to send a payload in NG.
    this.emitChangeSource.next({type, message});
  }
}
