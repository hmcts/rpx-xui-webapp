import {AfterContentInit, Component, ContentChild, Input, OnDestroy, ViewChild} from '@angular/core';
import {Subscription} from 'rxjs';
/**
 * CCD Connector
 * Smart Components responsible for connecting CCD components to ExUI App
 */
@Component({
  selector: 'exui-ccd-connector',
  template: `
    <ng-container>
      <ng-content></ng-content>
    </ng-container>
  `
})
export class ExuiCcdConnectorWrapperComponent implements AfterContentInit, OnDestroy {

  @ContentChild('ccdComponent') ccdComponent;
  @Input() events: string[];

  subscriptions: Subscription[] = [];

  constructor() { }
  // create actions
  // create selectors
  // create reducers
  // create dispatchers

  ngAfterContentInit() {
    this.events.forEach((event: string) => {
      this.subscriptions[event] = this.ccdComponent[event].subscribe((events) => this.applyChanges(events));
    });
  };

  selectionChanged(): void {}

  applyChanges(event): void {
    console.log('CaseCreateConsumerComponent submit event=', event);
  }

  resetCcd(): void {}

  ngOnDestroy(): void {
    this.events.forEach((event: string) => {
      this.subscriptions[event].unsubscribe();
    });
  }


}
