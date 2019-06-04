import { Reset } from './../../store/actions/case-search.action';
import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {ActionBindingModel} from '../../models/create-case-actions.model';
import {Store} from '@ngrx/store';
import * as fromCasesFeature from '../../store';
import * as fromCaseCreate from '../../store/reducers';
/**
 * Entry component wrapper for CCD-CASE-CREATE
 * Smart Component
 * param TBC
 */
@Component({
  selector: 'exui-search-case',
  templateUrl: 'case-search.component.html',
  encapsulation: ViewEncapsulation.None
})
export class CaseSearchComponent implements OnInit {
  caseSearchEventsBindings: ActionBindingModel[];
  fromCasesFeature; any;
  constructor(public store: Store<fromCaseCreate.State>) {}

  ngOnInit(): void {
    this.fromCasesFeature = fromCasesFeature;
    this.caseSearchEventsBindings = [
      {type: 'onJurisdiction', action: 'JurisdictionSelected'},
      {type: 'onApply', action: 'Applied'},
      {type: 'onReset', action: 'Reset'}
    ];
  }

}
