import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { of, Subscription } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';
import { ACTION, HearingLinkMessages } from '../../../models/hearings.enum';
import { ServiceLinkedCasesModel } from '../../../models/linkHearings.model';
import { LovRefDataModel } from '../../../models/lovRefData.model';
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
  public caseLinkingReasonCodes: LovRefDataModel[] = [];
  public hearingLinkForm: FormGroup;
  public validationErrors: { id: string, message: string }[] = [];
  public caseName: string;
  public showSpinner: boolean = true;
  public hearingLinksSub: Subscription;

  constructor(protected readonly hearingStore: Store<fromHearingStore.State>,
              protected readonly hearingsService: HearingsService,
              protected readonly route: ActivatedRoute,
              private readonly formBuilder: FormBuilder) {
    super(hearingStore, hearingsService, route);
    this.caseId = this.hearingListMainModel.caseRef || '';
    this.caseName = this.serviceHearingValuesModel.publicCaseName || '';
  }

  public ngOnInit(): void {
    // this.caseLinkingReasonCodes = this.route.snapshot.data.caseLinkingReasonCodes;
    this.hearingLinkForm = this.formBuilder.group({
      hearingLink: ['', Validators.required],
    });
    this.initialiseFromHearingValues();
    this.hearingStore.dispatch(new fromHearingStore.LoadServiceLinkedCases({
      caseReference: this.caseId,
      hearingId: ''
    }));

    this.hearingsService.loadCaseLinkingReasonCodes().pipe(
      switchMap((caseLinkingReasonCodes: LovRefDataModel[]) => {
        return of(caseLinkingReasonCodes)
      }),
      tap(caseLinkingReasonCodes => {
        console.log(caseLinkingReasonCodes);
      }),
      switchMap((caseLinkingReasonCodes) => {
        return caseLinkingReasonCodes.map(x => x.value_en);
      })
    ).subscribe(result => {
      console.log('RESULT', result);
    });

    this.hearingLinksSub = this.hearingStore.pipe(select(fromHearingStore.getHearingLinks)).subscribe(
      hearingLinks => {
        if (hearingLinks.serviceLinkedCases) {
          this.linkedCases = hearingLinks.serviceLinkedCases;
          this.parseCaseLinkReasonCodes();
          this.showSpinner = false;
        }
      }
    );
  }

  public parseCaseLinkReasonCodes(): void {
    this.linkedCases.forEach(linkedCase => {
      linkedCase.reasonsForLink.forEach(code => {
        const caseLinkingReason = this.caseLinkingReasonCodes.find(reasonCode => reasonCode.key === code);
        console.log(caseLinkingReason);
        if (caseLinkingReason) {
          code = caseLinkingReason.value_en;
        }
      });
    });
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
    if (this.hearingLinksSub) {
      this.hearingLinksSub.unsubscribe();
    }
  }
}
