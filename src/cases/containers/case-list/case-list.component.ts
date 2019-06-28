import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import { ActionBindingModel } from 'src/cases/models/create-case-actions.model';
import * as fromCasesFeature from '../../store';
import * as fromCaseList from '../../store/reducers';
import { Store } from '@ngrx/store';

/**
 * Entry component wrapper for Case List
 * Smart Component
 * param TBC
 */
@Component({
  selector: 'exui-create-case',
  templateUrl: 'case-list.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['case-list-filter.component.scss']
})
export class CaseListComponent implements OnInit {
  defaults: any;
  caseListFilterEventsBindings: ActionBindingModel[];
  fromCasesFeature; any;
  constructor(
    public store: Store<fromCaseList.State>
  ) { }

  ngOnInit() {
    this.fromCasesFeature = fromCasesFeature;
    this.caseListFilterEventsBindings = [
       {type: 'onApply', action: 'ApplyFilter'},
       {type: 'onReset', action: 'ResetFilter'}
     ];
  }
}

