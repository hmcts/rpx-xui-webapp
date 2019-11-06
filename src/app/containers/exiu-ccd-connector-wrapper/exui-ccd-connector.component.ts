import { AfterContentInit, Component, ContentChild, ElementRef, HostBinding, Input, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { Collection } from 'src/app/models/collection.model';
import { ActionBindingModel } from 'src/cases/models/create-case-actions.model';

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
  @ContentChild('ccdComponent') public ccdComponent: any;
  @ContentChild('ccdComponent', {read: ElementRef}) public ccdComponentElementRef: ElementRef;
  @Input() public eventsBindings: ActionBindingModel[];
  @Input() public store: Store<any>; // generic store
  @Input() public fromFeatureStore: any; // specific feature store
  @HostBinding('attr.data-selector') public  hostBindingValue: string;

  private readonly subscriptions: Collection<Subscription> = {};
  public dispatcherContainer: Collection<(obj: any) => void> = {};

  constructor() { }

  public ngAfterContentInit() {
    if (this.ccdComponent) {
      this.eventsBindings.forEach((event) => {
        this.subscriptions[event.type] =
          this.ccdComponent[event.type].subscribe((obj: any = {}) => this.dispatcherContainer[event.type](obj));
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

  public deepClone<T = any>(obj: T): T {
    return JSON.parse(JSON.stringify(this.simplifyFormGroup(obj)));
  }

  public simplifyFormGroup<T = Collection<any>>(obj: T): T {
    Object.keys(obj).forEach((key) => {
      if (key === 'formGroup') {
        const copiedValue: any = (obj as any)[key].value;
        delete (obj as any)[key];
        (obj as any)[key] = {
          value: copiedValue
        };

      } else if ((obj as any)[key] && typeof (obj as any)[key] === 'object') {
        this.simplifyFormGroup((obj as any)[key]);
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
