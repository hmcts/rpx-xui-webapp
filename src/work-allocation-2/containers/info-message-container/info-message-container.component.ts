import { Component, OnInit } from '@angular/core';
import { NavigationEnd, NavigationStart, Router } from '@angular/router';

import { InformationMessage } from '../../models/comms';
import { InfoMessageCommService } from '../../services';

@Component({
  selector: 'exui-info-message-container',
  templateUrl: './info-message-container.component.html'
})
export class InfoMessageContainerComponent implements OnInit {

  public showInfoMessage: boolean = false;
  public infoMessages: InformationMessage[];
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
  ) { }

  public ngOnInit(): void {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        // keep the current url the navigation started from
        this.currentUrl = this.router.url;
      }
      if (event instanceof NavigationEnd) {
        // check whether manage link is open
        // messages should not be cleared when following action via manage link
        if (!this.currentUrl.includes('#manage')) {
          // remove current messages when not redirected to other page and not part of action
          this.resetMessages();
        }
      }
    });

    this.getInfoMessages();
  }

  public getInfoMessages(): void {
    // subscribe to the info message communication service
    this.messageService.infoMessageChangeEmitted$.subscribe(messages => {
      this.infoMessages = messages;

      // add any additional information messages that have been passed in the state (i.e. role access exclusion)
      if (window && window.history && window.history.state.showMessage && window.history.state.message) {
        this.infoMessages.push(window.history.state.message);
      }
      this.showInfoMessage = (this.infoMessages || []).length > 0;
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
