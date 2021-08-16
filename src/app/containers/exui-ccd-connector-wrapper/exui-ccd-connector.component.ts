import {
  AfterContentInit,
  Component,
  ContentChild,
  ElementRef, HostBinding,
  Input,
  OnDestroy
} from '@angular/core';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';

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
  @ContentChild('ccdComponent', {read: ElementRef}) ccdComponentElementRef: ElementRef;
  @Input() eventsBindings;
  @Input() store: Store<any>; // generic store
  @Input() fromFeatureStore: any; // specific feature store
  @HostBinding('attr.data-selector') hostBindingValue: string;

  subscriptions: Subscription[] = [];
  dispatcherContainer: { type: string } | {};

  constructor() { }

  ngAfterContentInit() {
    if (this.ccdComponent) {
      this.eventsBindings.forEach((event) => {
        this.subscriptions[event.type] =
          this.ccdComponent[event.type].subscribe((obj = {}) => this.dispatcherContainer[event.type](obj));
      });
      this.createDispatchers();
      this.hostBindingValue = this.ccdComponentElementRef.nativeElement.tagName;
    }
  }

  /**
   * Creates dispatchers functions based on CCD events array
   */
  createDispatchers() {
    this.dispatcherContainer = {};
    this.eventsBindings.forEach(event => {
      this.dispatcherContainer[event.type] = (obj) => {
        this.store.dispatch(new this.fromFeatureStore[event.action](this.deepClone(obj)));
      };
    });
  }

  deepClone(obj) {
    return JSON.parse(JSON.stringify(this.simplifyFormGroup(obj)));
  }

  simplifyFormGroup(obj) {
    Object.keys(obj).forEach((key) => {
      if (key === 'formGroup') {
        const copiedValue = obj[key].value;
        delete obj[key];
        obj[key] = {
          value: copiedValue
        };

      } else if (obj[key] && typeof obj[key] === 'object') {
        this.simplifyFormGroup(obj[key]);
      }
    });
    return obj;
  }

  ngOnDestroy(): void {
    if (this.subscriptions.length) {
      this.eventsBindings.forEach((event) => {
        this.subscriptions[event.type].unsubscribe();
      });
    }
  }

}
