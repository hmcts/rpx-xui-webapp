import { Component, OnInit } from '@angular/core';
import { NavigationEnd, NavigationStart, Router } from '@angular/router';
import { Observable } from 'rxjs';

import { InfoMessageCommService } from '../../services';
import { InformationMessage } from '../../models/comms';

@Component({
  selector: 'exui-info-message-container',
  templateUrl: './info-message-container.component.html'
})
export class InfoMessageContainerComponent implements OnInit {

  public showInfoMessage: boolean = false;
  public infoMessages: InformationMessage[];
  public infoMessageChangeEmitted$: Observable<InformationMessage[]> = this.messageService.infoMessageChangeEmitted$;

  private currentUrl: string;

  /**
   * Flag to indicate whether or not messages should be retained at
   * this point, having been set on another route. The flag is passed
   * through the router and so is held in window.history.state.
   */
  private get retainMessages(): boolean {
    if (window && window.history && window.history.state) {
      return !!window.history.state.retainMessages;
    }
    return false;
  }

  constructor(
    private readonly router: Router,
    private readonly messageService: InfoMessageCommService
  ) {}

  public ngOnInit(): void {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        // keep the current url the navigation started from
        this.currentUrl = this.router.url;
      }
      if (event instanceof NavigationEnd) {
        // EUI-3950 - if the current url includes the manage link, do not allow removal of messages
        // this is to ensure the spinner does not remove the messages shown to the user
        if (!this.currentUrl.includes('#manage')) {
          this.resetMessages();
        }
      }
    });

    this.subscribeToInfoMessageCommService();
  }

  public subscribeToInfoMessageCommService(): void {
    this.infoMessageChangeEmitted$.subscribe(messages => {
      this.infoMessages = messages;
      this.showInfoMessage = (messages || []).length > 0;
    });
  }

  public resetMessages(): void {
    // Remove all the messages unless they've been specifically flagged
    // to be retained this one time.
    if (!this.retainMessages) {
      this.messageService.removeAllMessages();
    }
  }
}
