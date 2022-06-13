import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { ACTION, HearingLinkMessages } from '../../../models/hearings.enum';
import { ServiceLinkedCasesModel } from '../../../models/linkHearings.model';
import { HearingsService } from '../../../services/hearings.service';
import * as fromHearingStore from '../../../store';
import { RequestHearingPageFlow } from '../request-hearing.page.flow';

@Component({
  selector: 'exui-hearing-link',
  templateUrl: './hearing-link.component.html'
})
export class HearingLinkComponent extends RequestHearingPageFlow implements OnInit, AfterViewInit, OnDestroy {
  public caseId: string;
  public linkedCases: ServiceLinkedCasesModel[];
  public hearingLinkForm: FormGroup;
  public validationErrors: { id: string, message: string }[] = [];
  public caseTitle: string;
  constructor(protected readonly hearingStore: Store<fromHearingStore.State>,
              protected readonly hearingsService: HearingsService,
              protected readonly route: ActivatedRoute,
              private readonly formBuilder: FormBuilder) {
    super(hearingStore, hearingsService);
    this.hearingStore.pipe(select(fromHearingStore.getHearingsFeatureState)).subscribe(
      state => {
        this.caseId = state.hearingList.hearingListMainModel ? state.hearingList.hearingListMainModel.caseRef : '';
        const caseName = state.hearingValues.serviceHearingValuesModel ? state.hearingValues.serviceHearingValuesModel.publicCaseName : '';
        this.caseTitle = `${caseName} ${this.caseId}`;
      }
    );
  }

  public ngOnInit(): void {
    this.hearingLinkForm = this.formBuilder.group({
      hearingLink: ['', Validators.required],
    });
    this.initialiseFromHearingValues();
    this.hearingStore.dispatch(new fromHearingStore.LoadServiceLinkedCases({caseReference: this.caseId, hearingId: ''}));
    this.hearingStore.pipe(select(fromHearingStore.getHearingLinks)).subscribe(
      hearingLinks => {
        this.linkedCases = hearingLinks.serviceLinkedCases;
      }
    );
  }

  public initialiseFromHearingValues(): void {
    const hearingLinkDefaultValue = this.hearingRequestMainModel.hearingDetails.hearingIsLinkedFlag ? 'yes' : 'no';
    this.hearingLinkForm.get('hearingLink').setValue(hearingLinkDefaultValue);
  }

  public executeAction(action: ACTION): void {
    if (action === ACTION.CONTINUE) {
      if (this.isFormValid()) {
        this.hearingRequestMainModel = {
          ...this.hearingRequestMainModel,
          hearingDetails: {
            ...this.hearingRequestMainModel.hearingDetails,
            hearingIsLinkedFlag: this.hearingLinkForm.get('hearingLink').value === 'yes'
          }
        };
        super.navigateAction(action);
      }
    } else if (action === ACTION.BACK) {
      super.navigateAction(action);
    }
  }

  public isFormValid(): boolean {
    this.validationErrors = [];
    if (!this.hearingLinkForm.controls['hearingLink'].valid) {
      this.validationErrors.push({
        id: 'yes',
        message: HearingLinkMessages.SELECT_HEARING_LINK_OPTION
      });
      window.scrollTo({left: 0, top: 0, behavior: 'smooth'});
      return false;
    }
    return true;
  }

  public onHearingLink(value: string): void {
    this.hearingLinkForm.get('hearingLink').setValue(value);
  }

  public ngAfterViewInit(): void {
    this.fragmentFocus();
  }

  public ngOnDestroy(): void {
    super.unsubscribe();
  }
}
