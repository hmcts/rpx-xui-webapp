import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {CreateCaseFiltersSelection, HttpError} from '@hmcts/ccd-case-ui-toolkit';
import {Store} from '@ngrx/store';
import * as fromCaseCreate from '../../store/reducers';
import {ActionBindingModel} from '../../models/create-case-actions.model';
import * as fromCasesFeature from '../../store';

/**
 * Entry component wrapper for CCD-CASE-CREATE
 * Smart Component
 * param TBC
 */
@Component({
  selector: 'exui-filter-case',
  template: `
    <exui-page-wrapper [title]="'Create Case'">
      <exui-ccd-connector 
        *exuiFeatureToggle="'ccdCaseCreate'"
        [eventsBindings]="caseCreatFilteerBindings"
        [store]="store"
        [fromFeatureStore]="fromCasesFeature">
        <ccd-create-case-filters #ccdComponent
          [isDisabled]="hasErrors()"
          [startButtonText]="startButtonText"
        ></ccd-create-case-filters>
      </exui-ccd-connector>
      <a routerLink="/cases/case-create" class="button">Create case</a>
    </exui-page-wrapper>`,
  encapsulation: ViewEncapsulation.None
})
export class CaseFilterComponent implements OnInit {
  error: HttpError;
  startButtonText: string;
  caseCreatFilteerBindings: ActionBindingModel[];
  fromCasesFeature: any;
  constructor(private store: Store<fromCaseCreate.State>) {
  }

  ngOnInit(): void {
    this.fromCasesFeature = fromCasesFeature;
    this.startButtonText = 'Start';
    this.caseCreatFilteerBindings = [
      {type: 'selectionSubmitted', action: 'CaseCreateFilterApply'},
      {type: 'selectionChanged', action: 'CaseCreateFilterChanged'}
    ];
  }

  hasErrors() {
    return this.error;
  }

}
