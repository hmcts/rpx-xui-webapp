import {AfterContentInit, Component, ContentChild, Input, OnDestroy} from '@angular/core';
import {Subscription} from 'rxjs';
import {Store} from '@ngrx/store';
/**
 * CCD Connector
 * Smart Components responsible for connecting CCD components to ExUI App
 * @Input store - passing on generic store used to dispatch actions
 * @Input fromFeatureStore - specific store actions
 * @Input eventsBindings - bind CCD event to ExUI actions
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
  @Input() eventsBindings;
  @Input() store: Store<any>; // generic store
  @Input() fromFeatureStore: any; // specific feature store

  subscriptions: Subscription[] = [];
  dispatcherContainer: {type: string} | {};

  constructor() { }

  ngAfterContentInit() {
    this.eventsBindings.forEach((event) => {
      this.subscriptions[event.type] =
        this.ccdComponent[event.type].subscribe((obj) => this.dispatcherContainer[event.type](obj));
    });

    this.createDispatchers();
  };
  /**
   * Creates dispatchers functions based on CCD events array
   */
  createDispatchers() {
    this.dispatcherContainer = {};
    this.eventsBindings.forEach(event => {
      this.dispatcherContainer[event.type] = (obj) => {
        this.store.dispatch(new this.fromFeatureStore[event.action](obj));
      };
    });
  }

  ngOnDestroy(): void {
    this.eventsBindings.forEach((event ) => {
      this.subscriptions[event.type].unsubscribe();
    });
  }

}
