import { Reset } from './../../store/actions/case-search.action';
import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {ActionBindingModel} from '../../models/create-case-actions.model';
import {Store, select} from '@ngrx/store';
import * as fromCasesFeature from '../../store';
import * as fromCaseCreate from '../../store/reducers';
import { Jurisdiction, CaseType, CaseState, SearchResultView, PaginationMetadata, SearchService } from '@hmcts/ccd-case-ui-toolkit';
import { FormGroup } from '@angular/forms';
import { AppConfig } from 'src/app/services/ccd-config/ccd-case.config';

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

  jurisdiction: Jurisdiction;
  caseType: CaseType;
  caseState: CaseState;
  resultView: SearchResultView;
  paginationMetadata: PaginationMetadata;
  metadataFields: string[];
  fg: FormGroup;

  resultsArr: any[] = [];

  constructor(public store: Store<fromCasesFeature.State>,
              private appConfig: AppConfig,
              private searchService: SearchService) {

    const state = this.store.pipe(select(fromCasesFeature.getSearchState));

    state.subscribe(st => {
      if (typeof st !== 'undefined' ) {
        this.jurisdiction = st.jurisdiction.value as Jurisdiction;
        this.caseType = st.caseType.value as CaseType;
        this.metadataFields = st.metadataFields.value as Array<string>;
        this.caseState = this.caseType.states[0];
        this.resultView = {
          hasDrafts: () => false,
          columns: JSON.parse(`[
            {
              "label": "Appellant Surname",
              "order": 2,
              "metadata": false,
              "case_field_id": "generatedSurname",
              "case_field_type": {
                "id": "Text",
                "type": "Text",
                "min": null,
                "max": null,
                "regular_expression": null,
                "fixed_list_items": [],
                "complex_fields": [],
                "collection_field_type": null
              }
            },
            {
              "label": "Appellant Date of Birth",
              "order": 3,
              "metadata": false,
              "case_field_id": "generatedDOB",
              "case_field_type": {
                "id": "Date",
                "type": "Date",
                "min": null,
                "max": null,
                "regular_expression": null,
                "fixed_list_items": [],
                "complex_fields": [],
                "collection_field_type": null
              }
            },
            {
              "label": "SC Case Number",
              "order": 4,
              "metadata": false,
              "case_field_id": "caseReference",
              "case_field_type": {
                "id": "Text",
                "type": "Text",
                "min": null,
                "max": null,
                "regular_expression": null,
                "fixed_list_items": [],
                "complex_fields": [],
                "collection_field_type": null
              }
            },
            {
              "label": "Evidence Present",
              "order": 5,
              "metadata": false,
              "case_field_id": "evidencePresent",
              "case_field_type": {
                "id": "YesOrNo",
                "type": "YesOrNo",
                "min": null,
                "max": null,
                "regular_expression": null,
                "fixed_list_items": [],
                "complex_fields": [],
                "collection_field_type": null
              }
            },
            {
              "label": "Case Ref",
              "order": 1,
              "metadata": true,
              "case_field_id": "[CASE_REFERENCE]",
              "case_field_type": {
                "id": "Number",
                "type": "Number",
                "min": null,
                "max": null,
                "regular_expression": null,
                "fixed_list_items": [],
                "complex_fields": [],
                "collection_field_type": null
              }
            }
          ]`),
          results: this.resultsArr.slice(0, this.appConfig.getPaginationPageSize()),
          result_error: null
        };
      }
    });
  }

  ngOnInit(): void {
    this.fromCasesFeature = fromCasesFeature;
    this.caseSearchEventsBindings = [
      {type: 'onJurisdiction', action: 'JurisdictionSelected'},
      {type: 'onApply', action: 'Applied'},
      {type: 'onReset', action: 'Reset'}
    ];
  }
}
