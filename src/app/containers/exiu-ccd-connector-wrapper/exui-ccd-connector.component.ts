import {AfterContentInit, Component, ContentChild, Input, OnDestroy} from '@angular/core';
import {Subscription} from 'rxjs';
import {Store} from '@ngrx/store';
/**
 * CCD Connector
 * Smart Components responsible for connecting CCD components to ExUI App
 * @Input store - passing on generic store used to dispatch actions
 * @Input fromFeature - specific store actions
 */
@Component({
  selector: 'exui-ccd-connector',
  template: `
    <ng-container>
      <ng-content></ng-content>
    </ng-container>
  `
})
export class ExuiCcdConnectorComponent implements AfterContentInit, OnDestroy {

  @ContentChild('ccdComponent') ccdComponent;
  @Input() events;
  @Input() store: Store<any>; // generic store
  @Input() fromFeature: any; // specific store

  subscriptions: Subscription[] = [];
  dispatcherContainer: {type: string} | {};

  constructor() { }

  ngAfterContentInit() {
    this.events.forEach((event) => {
      this.subscriptions[event.type] =
        this.ccdComponent[event.type].subscribe((obj) => this.dispatcherContainer[event.type](obj));
    });

    this.createDispatchers();
  };

  createDispatchers() {
    this.dispatcherContainer = {};
    this.events.forEach(event => {
      this.dispatcherContainer[event.type] = (obj) => {
        this.store.dispatch(new this.fromFeature[event.action](obj));
      }
    })
  }

  ngOnDestroy(): void {
    this.events.forEach((event ) => {
      this.subscriptions[event.type].unsubscribe();
    });
  }

}
