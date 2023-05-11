import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Store } from '@ngrx/store';
import { ActionBindingModel } from '../../models/create-case-actions.model';
import * as fromCasesFeature from '../../store';
import * as fromCaseCreate from '../../store/reducers';
/**
 * Entry component wrapper for CCD-CASE-FILTER component
 * Smart Component
 * injected by the root
 */
@Component({
  selector: 'exui-filter-case',
  template: `
    <exui-page-wrapper [title]="'Create Case'">
      <div class="width-50">
        <exui-ccd-connector
          *exuiFeatureToggle="'ccdCaseCreate'"
          [eventsBindings]="caseCreatFilterBindings"
          [store]="store"
          [fromFeatureStore]="fromCasesFeature">
          <ccd-create-case-filters
            #ccdComponent
            [attr.isDisabled]="false"
            [startButtonText]="startButtonText"
          ></ccd-create-case-filters>
        </exui-ccd-connector>
      </div>
    </exui-page-wrapper>`,
  encapsulation: ViewEncapsulation.None
})
export class CaseFilterComponent implements OnInit {
  public startButtonText: string;
  public caseCreatFilterBindings: ActionBindingModel[];
  public fromCasesFeature: any;
  constructor(private readonly store: Store<fromCaseCreate.State>) {}

  public ngOnInit(): void {
    this.fromCasesFeature = fromCasesFeature;
    this.startButtonText = 'Start'; // TODO add this to some config file.
    /**
     * Mapping CCD components eventsBindings to ExUI Actions
     */
    this.caseCreatFilterBindings = [
      { type: 'selectionSubmitted', action: 'CaseCreateFilterApply' },
      { type: 'selectionChanged', action: 'CaseCreateFilterChanged' }
    ];
  }
}
