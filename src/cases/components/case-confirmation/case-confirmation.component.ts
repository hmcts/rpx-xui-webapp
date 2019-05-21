import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import * as fromCaseCreate from '../../store';
import {Store} from '@ngrx/store';
import * as fromCasesFeature from '../../../cases/store';
import {ActionBindingModel} from '../../models/create-case-actions.model';
/**
 * Entry component
 * Dumb Component
 * param TBC
 */
@Component({
  selector: 'exui-case-confirmation',
  template: `
    <h1>Case Confirmation</h1>
<!--    <exui-confirmation></exui-confirmation>-->
  `
})
export class CaseConfirmationComponent {

  constructor() {}

}
