import {AfterContentInit, Component, ContentChild, Input, ViewChild} from '@angular/core';
/**
 * CCD Connector
 * Smart Components responsible for connecting CCD components to ExUI App
 */
@Component({
  selector: 'exui-ccd-connector',
  template: `
    <div>
      <ng-content></ng-content>
    </div>
  `
})
export class ExuiCcdConnectorWrapperComponent implements AfterContentInit {

  @ContentChild('ccdComponent') ccdComponent;

  constructor() { }
  // create actions
  // create selectors
  // create reducers
  // create dispatchers

  ngAfterContentInit() {
    console.log(this.ccdComponent);
  };

  selectionChanged(): void {}

  applyChanges(): void {}

  resetCcd(): void {}


}
