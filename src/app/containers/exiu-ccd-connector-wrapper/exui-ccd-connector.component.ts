import {
  AfterContentInit,
  Component,
  ContentChild,
  ElementRef, HostBinding,
  Input,
  OnDestroy
} from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';

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
  @ContentChild('ccdComponent') public ccdComponent;
  @ContentChild('ccdComponent', {read: ElementRef}) public ccdComponentElementRef: ElementRef;
  @Input() public eventsBindings;
  @Input() public store: Store<any>; // generic store
  @Input() public fromFeatureStore: any; // specific feature store
  @HostBinding('attr.data-selector') public hostBindingValue: string;

  public subscriptions: Subscription[] = [];
  public dispatcherContainer: { type: string } | {};

  constructor() { }

  public ngAfterContentInit() {
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
  public createDispatchers() {
    this.dispatcherContainer = {};
    this.eventsBindings.forEach(event => {
      this.dispatcherContainer[event.type] = (obj) => {
        this.store.dispatch(new this.fromFeatureStore[event.action](this.deepClone(obj)));
      };
    });
  }

  public deepClone(obj) {
    return JSON.parse(JSON.stringify(this.simplifyFormGroup(obj)));
  }

  public simplifyFormGroup(obj) {
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

  public ngOnDestroy(): void {
    if (this.subscriptions.length) {
      this.eventsBindings.forEach((event) => {
        this.subscriptions[event.type].unsubscribe();
      });
    }
  }

}
