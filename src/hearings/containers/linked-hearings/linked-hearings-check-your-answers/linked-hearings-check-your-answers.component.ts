import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { GroupLinkType } from '../../../models/hearings.enum';
import { HearingDetailModel, LinkedHearingGroupMainModel, LinkedHearingsDetailModel, ServiceLinkedCasesModel } from '../../../models/linkHearings.model';
import { HearingsService } from '../../../services/hearings.service';
import * as fromHearingStore from '../../../store';
import { LoadLinkedHearingGroup, LoadServiceLinkedCases, SubmitLinkedHearingGroup } from '../../../store';

@Component({
  selector: 'exui-linked-hearings-check-your-answers',
  templateUrl: './linked-hearings-check-your-answers.component.html',
  styleUrls: ['./linked-hearings-check-your-answers.component.scss']
})
export class LinkedHearingsCheckYourAnswersComponent implements OnInit {
  public caseId: string;
  public caseTitle: string;
  public showPositionColumn: boolean;
  public linkedCases: LinkedHearingsCheckYourAnswersPageResult[];
  public linkedHearingGroup: LinkedHearingGroupMainModel;
  public hearingsInGroup: LinkedHearingsDetailModel[];

  constructor(private readonly hearingStore: Store<fromHearingStore.State>,
              private readonly hearingsService: HearingsService,
              private readonly router: Router) {
    this.hearingStore.pipe(select(fromHearingStore.getHearingsFeatureState)).subscribe(
      state => {
        this.caseId = state.hearingList.hearingListMainModel ? state.hearingList.hearingListMainModel.caseRef : '';
        const caseName = state.hearingValues.serviceHearingValuesModel ? state.hearingValues.serviceHearingValuesModel.caseName : '';
        this.caseTitle = `${caseName} ${this.caseId}`;
      }
    )
  }

  public ngOnInit(): void {
    this.hearingStore.dispatch(new LoadServiceLinkedCases({caseReference: this.caseId, hearingId: ''}));
    this.hearingStore.dispatch(new LoadLinkedHearingGroup({caseReference: this.caseId, hearingId: ''}));
    this.hearingStore.pipe(select(fromHearingStore.getHearingLinks)).subscribe(
      hearingLinks => {
        this.linkedCases = [];
        this.linkedHearingGroup = hearingLinks.linkedHearingGroup;
        this.showPositionColumn = this.canDisplayPositionColumn();
        if (hearingLinks && hearingLinks.linkedHearingGroup) {
          this.hearingsInGroup = hearingLinks.linkedHearingGroup.hearingsInGroup;
          hearingLinks.serviceLinkedCases.forEach(linkedCase => {
            const selectedHearings = linkedCase.hearings && linkedCase.hearings.filter(hearing => hearing.isSelected);
            this.setDisplayRow(linkedCase, selectedHearings);
          });
        }
      }
    )
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
    this.router.navigate(['/hearings', 'link', 'h100002']);
  }

  public onLinkHearings(): void {
    this.hearingStore.dispatch(new SubmitLinkedHearingGroup(this.linkedHearingGroup));
  }
}

interface LinkedHearingsCheckYourAnswersPageResult {
  caseReference: string;
  caseName: string;
  hearingStage: string;
  position?: number;
}
