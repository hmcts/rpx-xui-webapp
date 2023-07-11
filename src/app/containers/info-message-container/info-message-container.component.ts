import { Component, OnInit } from '@angular/core';
import { NavigationEnd, NavigationStart, Router } from '@angular/router';
import { InformationMessage } from '../../../app/shared/models';
import { InfoMessageCommService } from '../../../app/shared/services/info-message-comms.service';
@Component({
  selector: 'exui-info-message-container',
  templateUrl: './info-message-container.component.html'
})
export class InfoMessageContainerComponent implements OnInit {
  public showInfoMessage: boolean = false;
  public infoMessages: InformationMessage[];
  public lastMessage: InformationMessage;
  private currentUrl: string;
  private readonly excludeUrls = ['#manage', 'role-access', '/staff/add-user/check-your-answers'];

  constructor(
    private readonly router: Router,
    private readonly messageService: InfoMessageCommService
  ) {}

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

  public ngOnInit(): void {
    this.router.events
      .subscribe((event) => {
        if (event instanceof NavigationStart) {
          // keep the current url the navigation started from
          this.currentUrl = this.router.url;
        }
        if (event instanceof NavigationEnd) {
          // check whether manage link is open
          // messages should not be cleared when following action via manage link
          if (!this.excludeUrls.includes(this.currentUrl)) {
            // remove current messages when redirected to other page or not part of action
            this.resetMessages();
          }
        }
      });

    this.getInfoMessages();
  }

  public getInfoMessages(): void {
    // subscribe to the info message communication service
    this.messageService.infoMessageChangeEmitted$.subscribe((messages) => {
      this.infoMessages = messages;

      // add any additional information messages that have been passed in the state (i.e. role access exclusion)
      if (window && window.history && window.history.state.showMessage && window.history.state.message) {
        if (this.lastMessage !== window.history.state.message) {
          // ensure that messages are not duplicated by state
          this.infoMessages.push(window.history.state.message);
          this.lastMessage = window.history.state.message;
        }
      }
      this.removeDuplicateMessages();
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

  private removeDuplicateMessages(): void {
    // EUI-4754 - intermittent instances of duplicate messages being accumulated
    // this will stop this from occuring again
    const refinedMessages = [];
    this.infoMessages.forEach((infoMessage) => {
      if (!refinedMessages.includes(infoMessage)) {
        refinedMessages.push(infoMessage);
      }
    });
    this.infoMessages = refinedMessages;
  }
}
