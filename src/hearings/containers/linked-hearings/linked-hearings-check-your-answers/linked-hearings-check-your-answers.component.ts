import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpError } from '../../../../models/httpError.model';
import { HearingLinksStateData } from '../../../models/hearingLinksStateData.model';
import { HearingListModel } from '../../../models/hearingList.model';
import { GroupLinkType, Mode } from '../../../models/hearings.enum';
import { HearingDetailModel, LinkedHearingGroupMainModel, LinkedHearingsDetailModel, ServiceLinkedCasesModel } from '../../../models/linkHearings.model';
import { HearingsService } from '../../../services/hearings.service';
import * as fromHearingStore from '../../../store';

@Component({
  selector: 'exui-check-your-answers',
  templateUrl: './linked-hearings-check-your-answers.component.html',
  styleUrls: ['./linked-hearings-check-your-answers.component.scss']
})
export class LinkedHearingsCheckYourAnswersComponent implements OnInit {
  public isManageLink: boolean;
  public mode: Mode = Mode.LINK_HEARINGS;
  public caseId: string;
  public caseName: string;
  public hearingId: string;
  public hearingLinks: HearingLinksStateData;
  public showPositionColumn: boolean;
  public linkedCases: LinkedHearingsCheckYourAnswersPageResult[] = [];
  public hearingsInGroup: LinkedHearingsDetailModel[];
  public linkedHearingGroup: LinkedHearingGroupMainModel;
  public casesLinkedInfo: ServiceLinkedCasesModel[] = [];
  public sub: Subscription;
  public serverErrors: { id: string, message: string }[] = [
    { id: 'serverError', message: 'There was a system error and your request could not be processed. Please try again.' }
  ];
  public error$: Observable<HttpError>;

  constructor(private readonly hearingStore: Store<fromHearingStore.State>,
              private readonly hearingsService: HearingsService,
              private readonly route: ActivatedRoute,
              private readonly router: Router) {
    this.isManageLink = this.route.snapshot.data.mode === Mode.MANAGE_HEARINGS;
    this.caseId = this.route.snapshot.params.caseId;
    this.hearingId = this.route.snapshot.params.hearingId;
    this.hearingStore.pipe(select(fromHearingStore.getHearingsFeatureState)).subscribe(
      state => {
        this.caseName = state.hearingValues.serviceHearingValuesModel ? state.hearingValues.serviceHearingValuesModel.caseName : '';
        this.hearingLinks = state.hearingLinks;
      }
    );
  }

  public ngOnInit(): void {
    if (this.isManageLink) {
      this.sub = this.hearingsService.getAllCaseInformation(this.hearingLinks, this.isManageLink).subscribe((casesLinkedInfo) => {
        this.setHearingLinkedGroup(casesLinkedInfo);
        this.hearingStore.dispatch(new fromHearingStore.LoadServiceLinkedCasesSuccess(casesLinkedInfo));
      });
    } else {
      this.setHearingLinkedGroup(this.hearingLinks.serviceLinkedCases);
    }
  }

  public setHearingLinkedGroup(serviceLinkedCases) {
    this.error$ = this.hearingStore.select(fromHearingStore.getHearingLinksLastError);
    if (this.hearingLinks && this.hearingLinks.linkedHearingGroup) {
      this.linkedHearingGroup = this.hearingLinks.linkedHearingGroup;
      this.hearingsInGroup = this.hearingLinks.linkedHearingGroup.hearingsInGroup;
      this.showPositionColumn = this.canDisplayPositionColumn();
      serviceLinkedCases.forEach(linkedCase => {
        const selectedHearings = linkedCase.hearings && linkedCase.hearings.filter(hearing => hearing.isSelected);
        this.setDisplayRow(linkedCase, selectedHearings);
      });
    }
  }

  public getHearingLinkState$(): Observable<HearingLinksStateData> {
    return this.hearingStore.pipe(select(fromHearingStore.getHearingLinks)).pipe(
      map(hearingLinks => hearingLinks
      ));
  }

  public getHearingSelectedValue(caseInfo: ServiceLinkedCasesModel, hearing: HearingListModel, linkedHearingGroup: LinkedHearingGroupMainModel): boolean {
    return this.isManageLink ? !!linkedHearingGroup.hearingsInGroup.find((hearingInfo) => hearingInfo.caseRef === caseInfo.caseReference && hearingInfo.hearingId === hearing.hearingID) : false;
  }

  public setDisplayRow(linkedCase: ServiceLinkedCasesModel, selectedHearings: HearingDetailModel[]): void {
    if (selectedHearings && selectedHearings.length > 0) {
      selectedHearings.forEach(hearing => {
        this.linkedCases.push({
          caseName: linkedCase.caseName,
          caseReference: linkedCase.caseReference,
          hearingStage: hearing.hearingStage,
          position: this.getPosition(hearing)
        });
      });
    }
  }

  public getPosition(hearing: HearingDetailModel): number {
    if (this.showPositionColumn) {
      const linkedHearings: LinkedHearingsDetailModel[] = this.hearingsInGroup.filter(x => x.hearingId === hearing.hearingId);
      if (linkedHearings && linkedHearings.length > 0) {
        return linkedHearings[0].hearingOrder;
      }
    }
    return null;
  }

  public canDisplayPositionColumn(): boolean {
    return this.linkedHearingGroup
      && this.linkedHearingGroup.groupDetails
      && this.linkedHearingGroup.groupDetails.groupLinkType === GroupLinkType.ORDERED;
  }

  public onChange(): void {
    this.hearingStore.dispatch(new fromHearingStore.ResetLinkedHearingLastError());
    this.router.navigate(['/', 'hearings', 'link', this.caseId, this.hearingId]);
  }

  public onLinkHearings(): void {
    if (this.isManageLink) {
      this.router.navigate(['/', 'hearings', 'manage-links', this.caseId, this.hearingId, 'selected-hearings']);
    } else {
      this.hearingStore.dispatch(new fromHearingStore.SubmitLinkedHearingGroup({
        linkedHearingGroup: this.linkedHearingGroup, caseId: this.caseId, hearingId: this.hearingId
      }));
    }
  }

  public onBack(): void {
    this.hearingStore.dispatch(new fromHearingStore.ResetLinkedHearingLastError());
    this.router.navigate(['/', 'hearings', 'link', this.caseId, this.hearingId, 'group-selection']);
  }
}

interface LinkedHearingsCheckYourAnswersPageResult {
  caseReference: string;
  caseName: string;
  hearingStage: string;
  position?: number;
}
