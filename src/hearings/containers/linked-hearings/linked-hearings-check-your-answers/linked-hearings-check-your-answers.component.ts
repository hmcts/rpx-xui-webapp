import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { HearingLinksStateData } from 'src/hearings/models/hearingLinksStateData.model';
import { GroupLinkType } from '../../../models/hearings.enum';
import { HearingDetailModel, LinkedHearingGroupMainModel, LinkedHearingsDetailModel, ServiceLinkedCasesModel } from '../../../models/linkHearings.model';
import { HearingsService } from '../../../services/hearings.service';
import * as fromHearingStore from '../../../store';

@Component({
  selector: 'exui-check-your-answers',
  templateUrl: './linked-hearings-check-your-answers.component.html',
  styleUrls: ['./linked-hearings-check-your-answers.component.scss']
})
export class LinkedHearingsCheckYourAnswersComponent implements OnInit {
  public caseId: string;
  public caseName: string;
  public hearingId: string;
  public hearingLinks: HearingLinksStateData;
  public showPositionColumn: boolean;
  public linkedCases: LinkedHearingsCheckYourAnswersPageResult[] = [];
  public hearingsInGroup: LinkedHearingsDetailModel[];
  public linkedHearingGroup: LinkedHearingGroupMainModel;

  constructor(private readonly hearingStore: Store<fromHearingStore.State>,
              private readonly hearingsService: HearingsService,
              private readonly route: ActivatedRoute) {
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
    if (this.hearingLinks) {
      this.showPositionColumn = this.canDisplayPositionColumn();
      if (this.hearingLinks && this.hearingLinks.linkedHearingGroup) {
        this.linkedHearingGroup = this.hearingLinks.linkedHearingGroup;
        this.hearingsInGroup = this.hearingLinks.linkedHearingGroup.hearingsInGroup;
        this.hearingLinks.serviceLinkedCases.forEach(linkedCase => {
          const selectedHearings = linkedCase.hearings && linkedCase.hearings.filter(hearing => hearing.isSelected);
          this.setDisplayRow(linkedCase, selectedHearings);
        });
      }
    }
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

  public onLinkHearings(): void {
    this.hearingStore.dispatch(new fromHearingStore.SubmitLinkedHearingGroup({
      linkedHearingGroup: this.linkedHearingGroup, caseId: this.caseId, hearingId: this.hearingId}));
  }
}

interface LinkedHearingsCheckYourAnswersPageResult {
  caseReference: string;
  caseName: string;
  hearingStage: string;
  position?: number;
}
