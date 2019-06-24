import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import { Router } from '@angular/router';
import { ActionBindingModel } from 'src/cases/models/create-case-actions.model';
import * as fromCasesFeature from '../../store';
import {Store} from '@ngrx/store';
import * as fromCaseList from '../../store/reducers';

@Component({
  selector: 'exui-case-list-filters-consumer',
  encapsulation: ViewEncapsulation.None,
  templateUrl: 'case-list-filter.component.html',
})
export class CaseListFilterComponent implements OnInit {
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
